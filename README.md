
# Playwright Automation Framework with Page Oject Model

Any browser • Any platform • One API
Cross-browser. Playwright automation framework supports all modern rendering engines including Chromium, WebKit, and Firefox.

Cross-platform. Test on Windows, Linux, and macOS, locally or on CI, headless or headed.

Cross-language. Use the Playwright API in TypeScript, JavaScript, Python, .NET, Java but we will be using TypeScript as binding language here
    
## Documentation

[Playwright Documentation](https://playwright.dev/docs/intro)



## Tools require to work with framework
- Install Nodejs
    `v16.17.0`
- Install npm
    `6.14.17`

## Install framework dependencies

After cloning the repository, navigate to project folder where package.json resides
and run the folllowing command from command

`npm install`

cool! we all set to work either running the existing tests or developing new ones


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Writing new UI test

```typescript
Before writing new test we have to develop respective page object under Pages directory then instantiate that page into POManager class such as,

import {BrowserContext, Page, expect, test} from "@playwright/test"
import { POManager} from "../pages/POManager"
const data = require("../testdata/credentials.json")

let context:BrowserContext
let page:Page


test.describe("Login scenarios", () => {
    test.describe.configure({retries:1})
    let pageObjectManager:POManager

    test.beforeAll(async({browser}) => {
        context = await browser.newContext()
        page = await context.newPage()
        pageObjectManager = new POManager(page)
       
    })

    test.afterAll(async () => {    
        context.clearCookies()
        page.close()
    })



    test("Validate error message upon invalid credentails", async() => {
        page.goto('/QA1')
        await pageObjectManager.getLoginPage().getEmailField().waitFor({state:'visible', timeout:20000})
        await pageObjectManager.getLoginPage().getEmailField().fill(JSON.parse(JSON.stringify(data.INVALID_USER)))
        await pageObjectManager.getLoginPage().getPassField().fill(JSON.parse(JSON.stringify(data.VALID_USER_PASS)))
        await pageObjectManager.getLoginPage().getLoginButton().nth(0).click()
        await pageObjectManager.getLoginPage().getErrorMsgUponInvaidCredentials().nth(0).waitFor({state:'visible', timeout:12000})
        let errMsg = await pageObjectManager.getLoginPage().getErrorMsgUponInvaidCredentials().nth(0).textContent()
        console.log(errMsg)
        expect(errMsg).toContain("User not found or incorrect password")


    })
})


```

## Tech Stack
**Playwright Automation Framework:** Node, Typescript


## Continuous Integration
- Docker
- Github Actions
[CI Github Actions](https://playwright.dev/docs/ci-intro)
-Jenkins

For the demo purpose, I'm going with Jenkins pipeline with Nodejs 

```JenkinsFile
pipeline {
    agent any
    tools {nodejs "nodejs"}
    stages {
        stage('Fetch'){
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

```

Suggested configuration

Using --ipc=host is also recommended when using Chromium—without it Chromium can run out of memory and crash. Learn more about this option in Docker docs.
Seeing other weird errors when launching Chromium? Try running your container with docker run --cap-add=SYS_ADMIN when developing locally.
Using --init Docker flag or dumb-init is recommended to avoid special treatment for processes with PID=1. This is a common reason for zombie processes.

- Jenkins
Jenkins supports Docker agents for pipelines.

pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.28.0-focal' } }
   stages {
      stage('e2e-tests') {
         steps {
            // Depends on your language / test framework
            sh 'npm install'
            sh 'npx playwright test'
         }
      }
   }
}
## Authors

- [@KashifAli](https://ka091480@bitbucket.org/fm_ebiz/poc-testing-playwright.git)


## License

[MIT](https://choosealicense.com/licenses/mit/)


