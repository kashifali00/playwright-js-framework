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

    test("Verify that user is able to login with valid credentails & logout", async() => {
        page.goto('/QA1')
        await pageObjectManager.getLoginPage().getEmailField().waitFor({state:'visible', timeout:20000})
        await pageObjectManager.getLoginPage().getEmailField().fill(JSON.parse(JSON.stringify(data.VALID_USER)))
        await pageObjectManager.getLoginPage().getPassField().fill(JSON.parse(JSON.stringify(data.VALID_PASS)))
        await pageObjectManager.getLoginPage().getLoginButton().nth(0).click()
        await pageObjectManager.getDashboardPage().getUserInfo().waitFor({state:'visible', timeout:9000})
        let text = await pageObjectManager.getDashboardPage().getUserInfo().textContent()
        console.log(`text : ${text}`)
        expect(text).toContain("Majd Alzghoul")
        await pageObjectManager.getDashboardPage().getUserInfo().click()
        await pageObjectManager.getDashboardPage().getLogOut().waitFor({state:'visible', timeout:12000})
        await pageObjectManager.getDashboardPage().getLogOut().click()
        await pageObjectManager.getLoginPage().getEmailField().waitFor({state:'visible', timeout:20000})
       
     
    })
})