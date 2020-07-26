NODE_ENV_VERSION = 14.4.0

gcr-clean-alpha:
	gcloud container images list-tags gcr.io/sentrei-alpha/sentrei --filter='-tags:*' --format='get(digest)' --limit=unlimited | \
	xargs -I {arg} gcloud container images delete "gcr.io/sentrei-alpha/sentrei@{arg}" --quiet

gcr-clean-beta:
	gcloud container images list-tags gcr.io/sentrei-beta/sentrei --filter='-tags:*' --format='get(digest)' --limit=unlimited | \
	xargs -I {arg} gcloud container images delete "gcr.io/sentrei-beta/sentrei@{arg}" --quiet

gcr-clean-main:
	gcloud container images list-tags gcr.io/sentrei-main/sentrei --filter='-tags:*' --format='get(digest)' --limit=unlimited | \
	xargs -I {arg} gcloud container images delete "gcr.io/sentrei-main/sentrei@{arg}" --quiet

git-ls-files-mod:
	git ls-files --stage

git-ls-files-755:
	git ls-files --stage | grep 100755

git-ls-files-120:
	git ls-files --stage | grep 120000

dvc-fetch:
	pipenv run dvc fetch

dvc-pull:
	pipenv run dvc pull

dvc-push:
	pipenv run dvc push

dvc-status:
	pipenv run dvc status

functions-data-add:
	pipenv run dvc add packages/functions/data

pixelmator-add:
	pipenv run dvc add design/pixelmator

pipenv:
	pipenv install --dev
	. .venv/bin/activate

nodeenv:
	nodeenv --node=$(NODE_ENV_VERSION) -p

tmuxinator:
	tmuxinator sentrei

yarn-eslint:
	yarn add -D -W eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-prettier

yarn-husky:
	yarn add -D -W git-cz husky

yarn-upgrade:
	yarn install --dev --upgrade latest
	yarn run bootstrap

vercel-preview:
	yarn run vercel alias sentrei-git-beta.sentrei.vercel.app preview.sentrei.com
