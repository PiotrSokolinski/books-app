// TODO: F5 - Add the required infrastructure code for frontend
terraform {
  backend "s3" {
  }

  required_providers {
    datadog = {
      source = "DataDog/datadog"
    }
  }
}

provider "aws" {
  region = var.primary_region

  assume_role {
    role_arn = "arn:aws:iam::${var.account_id}:role/role-to-assume"
    duration = "1h"
  }

  default_tags {
    tags = {
      service = local.service_name
      component = local.component
    }
  }
}

provider "aws" {
  alias  = "secondary"
  region = var.secondary_region

  assume_role {
    role_arn = "arn:aws:iam::${var.account_id}:role/role-to-assume"
    duration = "1h"
  }

  default_tags {
    tags = {
      service = local.service_name
      component = local.component
    }
  }
}
