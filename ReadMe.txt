C:\Windows\system32\Drivers\etc\hosts


apiVersion: skaffold/v4beta3
kind: Config
manifests:
  rawYaml:
    - ./infra/k8s/*
deploy: 
  kubectl: {}
build:
  local:
    push: false
  # googleCloudBuild:
  #   projectId: tickets-dev-452111
  artifacts:
      - image: us.gcr.io/tickets-dev-452111/auth
        context: auth
        docker:
          dockerfile: Dockerfile
        sync:
          manual:
            - src: 'src/**/*.ts'
              dest: .
