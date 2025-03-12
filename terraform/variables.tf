variable "aws_region" {
  description = "The AWS region to create things in."
  default     = "eu-west-3"
}

variable "aws_profile" {
  description = "AWS profile"
}

variable "ingressports" {
  type    = list(number)
  default = [8080, 22]
}
