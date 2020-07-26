resource "google_dns_record_set" "auth_sentrei_com_CNAME" {
  name         = "auth.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["sentrei-main.firebaseapp.com."]
}

resource "google_dns_record_set" "auth_alpha_sentrei_com_CNAME" {
  name         = "auth.alpha.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["sentrei-alpha.firebaseapp.com."]
}

resource "google_dns_record_set" "auth_beta_sentrei_com_CNAME" {
  name         = "auth.beta.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["sentrei-beta.firebaseapp.com."]
}

resource "google_dns_record_set" "auth_main_sentrei_com_CNAME" {
  name         = "auth.main.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["sentrei-main.firebaseapp.com."]
}
