terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "sentrei"
    workspaces {
      name = "sentrei-beta"
    }
  }
}
