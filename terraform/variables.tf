### GENERAL
variable "app_name" {
  type = string
}

### GCP
variable "gcp_project_id" {
  type = string
}

variable "gcp_machine_type" {
  type = string
}

### CLOUDFLARE
variable "cloudflare_api_token" {
  type = string
}

variable "domain" {
  type = string
}
