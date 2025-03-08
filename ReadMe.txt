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
              dest:
               .
kubectl get secrets
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_jwt_key
kubectl apply -f /d:/Microservices_Node_React/tickets/infra/k8s/auth-depl.yaml

//npm udpdate --save @your_org_name/common

OR
npm install @your_org_name/common@latest
