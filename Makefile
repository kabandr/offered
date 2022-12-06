PROJECT_ID=offered
ZONE=us-central1-a

run-local:
	docker-compose up 
###

create-tf-backend-bucket:
	gsutil mb -p $(PROJECT_ID) gs://$(PROJECT_ID)-terraform

### 

check-env:
ifndef ENV
	$(error Please set ENV=[staging|prod])
endif

# This cannot be indented or else make will include spaces in front of secret
define get-secret
$(shell gcloud secrets versions access latest --secret=$(1) --project=$(PROJECT_ID))
endef

###

terraform-create-workspace: check-env
	cd terraform && \
		terraform workspace new $(ENV)

terraform-init: check-env
	cd terraform && \
		terraform workspace select $(ENV) && \
		terraform init

TF_ACTION?=plan
terraform-action: check-env
	@cd terraform && \
		terraform workspace select $(ENV) && \
		terraform $(TF_ACTION) \
		-var-file="./environments/common.tfvars" \
		-var-file="./environments/$(ENV)/config.tfvars" \
		-var="cloudflare_api_token=$(call get-secret,cloudflare_api_token)"

###

SSH_STRING=kabandr@offered-vm-$(ENV)
OAUTH_CLIENT_ID=$(OAUTH_CLIENT_ID)

GITHUB_SHA?=latest
LOCAL_TAG=offered-app:$(GITHUB_SHA)
REMOTE_TAG=gcr.io/$(PROJECT_ID)/$(LOCAL_TAG)

CONTAINER_NAME=offered-server
DB_NAME=offered-db

ssh: check-env
	gcloud compute ssh $(SSH_STRING) \
		--project=$(PROJECT_ID) \
		--zone=$(ZONE)

ssh-cmd: check-env
	@gcloud compute ssh $(SSH_STRING) \
		--project=$(PROJECT_ID) \
		--zone=$(ZONE) \
		--command="$(CMD)"

build:
	docker build -t $(LOCAL_TAG) .

push:
	docker tag $(LOCAL_TAG) $(REMOTE_TAG)
	docker push $(REMOTE_TAG)

deploy: check-env
	$(MAKE) ssh-cmd CMD='docker-credential-gcr configure-docker'
	@echo "pulling new container image..."
	$(MAKE) ssh-cmd CMD='docker pull $(REMOTE_TAG)'
	@echo "removing old container..."
	-$(MAKE) ssh-cmd CMD='docker container stop $(CONTAINER_NAME)'
	-$(MAKE) ssh-cmd CMD='docker container rm $(CONTAINER_NAME)'
	@echo "starting new container..."
	@$(MAKE) ssh-cmd CMD='\
		docker run -d --name=$(CONTAINER_NAME) \
			--restart=unless-stopped \
			-p 80:3000 \
			-e PORT=3000 \
			-e POSTGRES_PASSWORD=$(PG_PASSWORD) -p 5432:5432 postgres \
			-e GOOGLE_CLIENT_ID=$(OAUTH_CLIENT_ID) \
			-e GOOGLE_CLIENT_SECRET=$(call get-secret,google_oauth_client_secret) \
			$(REMOTE_TAG) \
			'
