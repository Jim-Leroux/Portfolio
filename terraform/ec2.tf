# Définir le VPC par défaut
data "aws_vpc" "default" {
  default = true
}

# Créer un sous-réseau public dans le VPC existant
resource "aws_subnet" "public_subnet" {
  vpc_id                  = data.aws_vpc.default.id
  cidr_block              = "172.31.1.0/24"   
  availability_zone       = "eu-west-3a"       
  map_public_ip_on_launch = true               

  tags = {
    Name = "PublicSubnet"
  }
}

# Créer une passerelle Internet pour permettre l'accès à Internet
resource "aws_internet_gateway" "igw" {
  vpc_id = data.aws_vpc.default.id

  tags = {
    Name = "MyInternetGateway"
  }
}

# Créer une table de routage pour le sous-réseau public
resource "aws_route_table" "public_rt" {
  vpc_id = data.aws_vpc.default.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "PublicRouteTable"
  }
}

# Associer la table de routage au sous-réseau public
resource "aws_route_table_association" "public_rta" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# Création de l'instance EC2 dans le sous-réseau public
resource "aws_instance" "portfolio" {
  ami                    = data.aws_ami.amazon-linux-2.id
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.public_subnet.id   # Référence au sous-réseau public
  vpc_security_group_ids = [aws_security_group.portfolio-sg.id]
  key_name               = "portfolio"  # Nom de la clé SSH pour se connecter

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum install -y docker
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ec2-user
              sudo reboot
              EOF


  tags = {
    "Name" = "Portfolio"
  }
}

# Définir l'AMI pour Amazon Linux 2
data "aws_ami" "amazon-linux-2" {
  most_recent = true

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }

  owners = ["amazon"]
}
