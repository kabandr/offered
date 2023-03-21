# Offered

## What is this about?

Offered is Job Offers Management Application that aims to streamline the process of offer making on the side of the recruiter and for the candidates to accept or decline offers with a single click. The app features an offer contract in form of a web page with a chat feature to enable both the employer and candidate to continue their negotiations in the chat if they so wish or simply for the candidate to accept the offer by clicking on "accept" or "decline" buttons at the bottom of the contract. Once the candidate has made a decision, the recruiter is notified and the status of the candidate's application is updated.

Warning: This application is still in active development.

## Running Application in development

### 1. Clone and install the necessary packages
```
git clone https://github.com/kabandr/offered.git
cd offered
npm install / yarn install / pnpm install (depending on your preferred package manager).
```

### 2. Set up a database
Once you've cloned and installed the necessary packages, you need to setup an instance of Postgres database. Your instance can be local or remote.

### 3. Add the necessary environment variables
In the project's root folder I've provided an example of an .env file which you can copy using the command below then add your dev environment variables.
```
cp .env.example .env
```
### 4. Running the App

```
npm run dev
``` 
The script above will stand up both the server and client applications.


## Running Application in Docker 

The quickest way to run this application to simulate a production enviroment is with Docker.

You need Docker and Docker Compose installed on your machine.

- If you need to install Docker, you can follow this [guide](https://docs.docker.com/get-docker/)
- And for the Docker Compose, [this](https://docs.docker.com/compose/install/).


Then carry on with commands below:

    ```
    git clone https://github.com/kabandr/offered.git
    cd offered
    cp .env.example .env (of course in production, you would need the prod envs)
    docker compose up -d
    ```

## Github Actions CI/CD

`.github/workflows/build-push-deploy.yaml` contains a workflow which deploys to a staging environment on pushes to the `main` branch and to a production environment on pushes of tags of the form `v#.#.#`.

## Terraform

The terraform configuration provisions:
- GCP Compute Engine Virtual Machine
- PostgreSQL Cluster
- Cloudflare DNS "A" Record

Using the terraform config requires:
1) Creating a GCP project (+ service account key for Terraform to use)
2) Creating a PostreSQL database (+ API key for Terraform to use)
3) Creating a Cloudflare account (+ API token for Terraform to use)
