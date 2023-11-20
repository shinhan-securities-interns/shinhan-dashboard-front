pipeline {
    agent {
        kubernetes {
            yaml """
kind: Pod
metadata:
  name: demoPod
spec:
  nodeName: k8s-worker01
  dnsPolicy: Default
  containers:
  - name: docker
    image: docker:latest
    command:
      - cat
    tty: true
    volumeMounts:
    - name: dockersock
      mountPath: /var/run/docker.sock
  - name: kubectl
    namespace: jenkins
    image: bitnami/kubectl:latest
    imagePullPolicy: Always
    command:
    - /bin/sh
    tty: true
    securityContext:
      runAsUser: 0
  volumes:
  - name: dockersock
    hostPath:
      path: /var/run/docker.sock
  - name: jenkins-docker-cfg
    namespace: jenkins
    projected:
      sources:
      - secret:
          name: registry-credentials
          items:
            - key: .dockerconfigjson
              path: config.json
"""
        }
    }
    environment {
        REPOSITORY  = 'jang1023'
        IMAGE       = 'fastapi-front'
        DOCKERHUB_CREDENTIALS = credentials('docker_cre')
    }
    stages {
        stage('Build Docker image') {
            steps {
                script {
                    container('docker'){
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    sh "docker build -t ${REPOSITORY}/${IMAGE}:${GIT_COMMIT} -f Dockerfile . --platform=linux/amd64"
                    sh "docker push ${REPOSITORY}/${IMAGE}:${GIT_COMMIT}"
            }
        }
    }
  }
 }
}
