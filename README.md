# Offered

Job Offers Management Application

## Running Application in Docker 

- You need Docker and Docker Compose installed on your machine.

    ```
    git clone https://github.com/kabandr/offered.git
    cd offered
    docker compose up -d
    ```

## Github Actions CI/CD

`.github/workflows/build-push-deploy.yaml` contains a workflow which deploys to a staging environment on pushes to the `master` branch and to a production environment on pushes of tags of the form `v#.#.#`.

## Terraform

The terraform configuration provisions:
- GCP Compute Engine Virtual Machine
- PostgreSQL Cluster
- Cloudflare DNS "A" Record

Using the terraform config requires:
1) Creating a GCP project (+ service account key for Terraform to use)
2) Creating a PostreSQL database (+ API key for Terraform to use)
3) Creating a Cloudflare account (+ API token for Terraform to use)
