resource "google_dns_record_set" "preview_sentrei_com_CNAME" {
  name         = "preview.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["cname.vercel-dns.com."]
}

resource "google_dns_record_set" "main_preview_sentrei_com_CNAME" {
  name         = "main.preview.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["cname.vercel-dns.com."]
}

resource "google_dns_record_set" "alpha_preview_sentrei_com_CNAME" {
  name         = "alpha.preview.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["cname.vercel-dns.com."]
}

resource "google_dns_record_set" "beta_preview_sentrei_com_CNAME" {
  name         = "beta.preview.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["cname.vercel-dns.com."]
}
