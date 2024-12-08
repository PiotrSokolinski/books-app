variable "account_id" {
  type        = string
  description = "AWS account number."

  validation {
    condition     = can(regex("^[0-9]+$", var.account_id))
    error_message = "'account_id' can consist of only numbers."
  }
}

variable "environment" {
  type        = string
  description = "The environment being deployed to."

  validation {
    condition     = contains(["dev", "sandbox", "phi-test", "prod"], var.environment)
    error_message = "'environment' variable must be one of: 'dev', 'sandbox', 'phi-test' or 'prod'."
  }
}

variable "primary_region" {
  type        = string
  description = "Primary region to deploy."

  validation {
    condition     = can(regex("(us(-gov)?|ap|ca|cn|eu|sa)-(central|(north|south)?(east|west)?)-[0-9]", var.primary_region))
    error_message = "'primary_region' must be one of AWS regions."
  }
}

variable "secondary_region" {
  type        = string
  description = "Secondary region to deploy."

  validation {
    condition     = can(regex("(us(-gov)?|ap|ca|cn|eu|sa)-(central|(north|south)?(east|west)?)-[0-9]", var.secondary_region))
    error_message = "'secondary_region' must be one of AWS regions."
  }
}