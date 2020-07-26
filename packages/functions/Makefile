SECRETS_VERSION = 8

secrets-get: secrets-get-alpha secrets-get-beta secrets-get-main

secrets-get-alpha:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=functions_alpha_env > alpha.env.json

secrets-get-beta:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=functions_beta_env > beta.env.json

secrets-get-main:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=functions_main_env > main.env.json

secrets-list: secrets-list-alpha secrets-list-beta secrets-list-main

secrets-list-alpha:
	gcloud secrets versions list functions_alpha_env --limit=1

secrets-list-beta:
	gcloud secrets versions list functions_beta_env --limit=1

secrets-list-main:
	gcloud secrets versions list functions_main_env --limit=1

secrets-set: secrets-set-alpha secrets-set-beta secrets-set-main

secrets-set-alpha:
	gcloud secrets versions add "functions_alpha_env" --data-file="alpha.env.json"

secrets-set-beta:
	gcloud secrets versions add "functions_beta_env" --data-file="beta.env.json"

secrets-set-main:
	gcloud secrets versions add "functions_main_env" --data-file="main.env.json"
