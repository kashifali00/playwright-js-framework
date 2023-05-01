pipeline {
    agent any
    tools {nodejs "nodejs"}
    stages {
        stage('Clone Repository'){
            steps{
                git branch: 'main', credentialsId: '2dc2d8bf-0442-4adf-aaac-2f04e35c10f2', url: 'https://github.com/kashifali00/playwright-js-framework.git'
        }
            }
            
        stage('Test'){
            steps{
                bat 'npm run test'
            }
        }

        stage('Report'){
            steps{
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: "index.html",
                    reportName: "e2e",
                    reportTitles: "e2e"
                    ])
            }
        }
    }
}