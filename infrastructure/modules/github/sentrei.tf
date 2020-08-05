resource "github_repository" "sentrei" {
  name           = "sentrei"
  description    = "Official sentrei app"
  homepage_url   = "https://sentrei.com"
  default_branch = "main"

  private                = false
  has_issues             = true
  has_projects           = false
  has_wiki               = false
  is_template            = false
  allow_merge_commit     = true
  allow_squash_merge     = true
  allow_rebase_merge     = false
  delete_branch_on_merge = true

  topics = ["ios", "android", "nextjs", "react", "material-ui", "monorepo", "typescript", "firebase", "webapp", "saas", "serverless", "oss"]
}

resource "github_branch_protection" "alpha" {
  repository = github_repository.sentrei.name
  branch     = "alpha"

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "cla", "functions", "labeler", "terraform (alpha)", "terraform (beta)", "terraform (main)", "ui", "yarn", "video", "web", "Terraform Cloud/sentrei/sentrei-alpha", "WIP"]
  }

  restrictions {
    users = ["shunkakinoki"]
  }
}

resource "github_branch_protection" "beta" {
  repository = github_repository.sentrei.name
  branch     = "beta"

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "cla", "functions", "labeler", "terraform (alpha)", "terraform (beta)", "terraform (main)", "ui", "yarn", "video", "web", "Terraform Cloud/sentrei/sentrei-beta", "WIP"]
  }

  restrictions {
    users = ["shunkakinoki"]
  }
}

resource "github_branch_protection" "main" {
  repository     = github_repository.sentrei.name
  branch         = "main"
  enforce_admins = true

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "cla", "functions", "labeler", "terraform (alpha)", "terraform (beta)", "terraform (main)", "ui", "yarn", "video", "web", "Terraform Cloud/sentrei/sentrei-main", "WIP"]
  }
}
