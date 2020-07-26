resource "google_storage_bucket" "reg" {
  count         = var.environment == "main" ? 1 : 0
  name          = "sentrei-${var.environment}-reg"
  location      = "US"
  force_destroy = true

  lifecycle_rule {
    condition {
      age = "3"
    }
    action {
      type = "Delete"
    }
  }
}

resource "google_storage_bucket_iam_member" "reg" {
  count  = var.environment == "main" ? 1 : 0
  bucket = google_storage_bucket.reg[count.index].name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}
