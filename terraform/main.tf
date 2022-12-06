terraform {
  backend "gcs" {
    bucket = "psyched-silicon-360916-terraform"
    prefix = "/state/offered"
  }
}
