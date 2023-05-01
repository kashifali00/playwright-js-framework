pipeline {
    agent any
    tools {nodejs "nodejs"}
    stages {
        stage('Fetch'){
            steps{
                git branch: 'main', credentialsId: '2dc2d8bf-0442-4adf-aaac-2f04e35c10f2', url: 'https://github.com/kashifali00/playwright-js-framework.git'
        }
            }
            

        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }

        }

        stage('Test'){
            steps{
                bat 'npm run test'
            }
        }
    }
}