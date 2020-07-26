SECRETS_VERSION = 1

secrets-get: secrets-get-alpha secrets-get-beta secrets-get-main secrets-get-local-beta

secrets-get-alpha:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=web_alpha_env > .env

secrets-get-beta:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=web_beta_env > .env

secrets-get-main:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=web_main_env > .env

secrets-get-local-beta:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=web_local_beta_env > .env.local

secrets-list: secrets-list-alpha secrets-list-beta secrets-list-main

secrets-list-alpha:
	gcloud secrets versions list web_alpha_env --limit=1

secrets-list-beta:
	gcloud secrets versions list web_beta_env --limit=1

secrets-list-main:
	gcloud secrets versions list web_main_env --limit=1
