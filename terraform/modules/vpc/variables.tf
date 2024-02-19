variable "environment" {
  type = string
}

variable "availability_zone_names" {
  type    = list(string)
  default = ["eu-west-2a", "eu-west-2b"]
}

variable "vpc_cidr" {
  type    = string
  default = "172.17.0.0/16"
}

variable "public_subnets" {
  type    = list(string)
  default = ["172.17.0.0/19", "172.17.32.0/19"]
}

variable "private_subnets" {
  type = list(string)
  //default = ["172.17.96.0/19", "172.17.128.0/19"]
  default = ["172.17.96.0/19"]
}
