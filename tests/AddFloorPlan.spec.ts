import {BrowserContext, Page, expect, test} from "@playwright/test"
import { POManager} from "../pages/POManager"
import { UiUtils } from "../utils/UiUtils"
const data = require("../testdata/credentials.json")

let context:BrowserContext
let page:Page


test.describe("Facility -> Floor Plan ", () => {
    test.describe.configure({retries:1})
    let pageObjectManager:POManager
    let uiUtils:UiUtils

    // Running all tests under the same browser context to improve the performance 

    test.beforeAll(async({browser}) => {
        context = await browser.newContext()
        page = await context.newPage()
        pageObjectManager = new POManager(page)
        uiUtils = new UiUtils()

        // login into app

        page.goto('/QA1')
        await pageObjectManager.getLoginPage().getEmailField().waitFor({state:'visible', timeout:20000})
        await pageObjectManager.getLoginPage().getEmailField().fill(JSON.parse(JSON.stringify(data.VALID_USER)))
        await pageObjectManager.getLoginPage().getPassField().fill(JSON.parse(JSON.stringify(data.VALID_PASS)))
        await pageObjectManager.getLoginPage().getLoginButton().nth(0).click()
        await pageObjectManager.getDashboardPage().getUserInfo().waitFor({state:'visible', timeout:9000})
        let text = await pageObjectManager.getDashboardPage().getUserInfo().textContent()
        console.log(`text : ${text}`)
        expect(text).toContain("Majd Alzghoul")
        await pageObjectManager.getDashboardPage().getFacilityMenu().click()
       
    })

    // clean up the test data after test execution

    test.afterEach(async () => {
        
        await pageObjectManager.getFacilityPage().getFloorLink().click()
        await pageObjectManager.getFloorsPage().getFloorDeleteButton().last().locator("i").nth(0).click()
        await pageObjectManager.getFloorsPage().getDeleteFloorYesButton().waitFor({state:'visible', timeout:9000})
        await pageObjectManager.getFloorsPage().getDeleteFloorYesButton().click()
        await page.waitForTimeout(1000)

    })

    // close the page after all test execution
    test.afterAll(async () => {
        await page.close()
    })


    test("Verify that user is able to add floor plan from JPG image", async() => {

        
        await pageObjectManager.getFacilityPage().getFloorLink().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFacilityPage().getFloorLink()).toBeVisible()
        await pageObjectManager.getFacilityPage().getFloorLink().click()
        await pageObjectManager.getFloorsPage().getAddButton().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFloorsPage().getAddButton()).toBeVisible()
        await pageObjectManager.getFloorsPage().getAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().fill(uiUtils.getFloorName())
        await pageObjectManager.getFloorsPage().getFloorLevel().fill(uiUtils.getFloorLevel())
        await pageObjectManager.getFloorsPage().getLabelField().fill(uiUtils.getFloorLabel())
        await pageObjectManager.getFloorsPage().getDescriptionTextArea().fill("Being created through automation script :-)")

        // upload floor map 
        await uiUtils.uploadFile(page, "testdata/FloorPlan.jpg")
        await pageObjectManager.getFloorsPage().getWorldMapCheckbox().click()
        await page.waitForTimeout(1000)
        await pageObjectManager.getFloorsPage().getFloorAddButton().scrollIntoViewIfNeeded()
        await pageObjectManager.getFloorsPage().getFloorAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorValidationText().last().waitFor({state:'visible', timeout:9000})
        let floorDetail = await pageObjectManager.getFloorsPage().getFloorValidationText().last().textContent()
        console.log(`floorDetails: ${floorDetail}`)
        expect(floorDetail).toContain("Second FloorLevel: 2")
        await pageObjectManager.getFloorsPage().getFloorsGridView().last().click()
        await pageObjectManager.getFloorSetupPage().getRuler().waitFor({state:'visible', timeout:9000})
        await pageObjectManager.getFloorSetupPage().getRuler().click()
        await pageObjectManager.getFloorSetupPage().getScaleFactor().fill("1")
        await pageObjectManager.getFloorSetupPage().getSaveButton().click()
       
    })

    test("Verify that user is able to add floor plan from PNG image", async() => {

        await pageObjectManager.getFacilityPage().getFloorLink().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFacilityPage().getFloorLink()).toBeVisible()
        await pageObjectManager.getFacilityPage().getFloorLink().click()
        await pageObjectManager.getFloorsPage().getAddButton().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFloorsPage().getAddButton()).toBeVisible()
        await pageObjectManager.getFloorsPage().getAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().fill(uiUtils.getFloorName())
        await pageObjectManager.getFloorsPage().getFloorLevel().fill(uiUtils.getFloorLevel())
        await pageObjectManager.getFloorsPage().getLabelField().fill(uiUtils.getFloorLabel())
        await pageObjectManager.getFloorsPage().getDescriptionTextArea().fill("Being created through automation script :-)")

        // upload floor map 
        await uiUtils.uploadFile(page, "testdata/png-floorplan.png")
        await pageObjectManager.getFloorsPage().getWorldMapCheckbox().click()
        await page.waitForTimeout(1000)
        await pageObjectManager.getFloorsPage().getFloorAddButton().scrollIntoViewIfNeeded()
        await pageObjectManager.getFloorsPage().getFloorAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorValidationText().last().waitFor({state:'visible', timeout:9000})
        let floorDetail = await pageObjectManager.getFloorsPage().getFloorValidationText().last().textContent()
        console.log(`floorDetails: ${floorDetail}`)
        expect(floorDetail).toContain("Second FloorLevel: 2")
        await pageObjectManager.getFloorsPage().getFloorsGridView().last().click()
        await pageObjectManager.getFloorSetupPage().getRuler().waitFor({state:'visible', timeout:9000})
        await pageObjectManager.getFloorSetupPage().getRuler().click()
        await pageObjectManager.getFloorSetupPage().getScaleFactor().fill("1")
        await pageObjectManager.getFloorSetupPage().getSaveButton().click()
       
    })

    test("Verify that user is able to add floor plan from JPEG image", async() => {
      
        await pageObjectManager.getFacilityPage().getFloorLink().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFacilityPage().getFloorLink()).toBeVisible()
        await pageObjectManager.getFacilityPage().getFloorLink().click()
        await pageObjectManager.getFloorsPage().getAddButton().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFloorsPage().getAddButton()).toBeVisible()
        await pageObjectManager.getFloorsPage().getAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().fill(uiUtils.getFloorName())
        await pageObjectManager.getFloorsPage().getFloorLevel().fill(uiUtils.getFloorLevel())
        await pageObjectManager.getFloorsPage().getLabelField().fill(uiUtils.getFloorLabel())
        await pageObjectManager.getFloorsPage().getDescriptionTextArea().fill("Being created through automation script :-)")

        // upload floor map 
        await uiUtils.uploadFile(page, "testdata/Floor_Plans.jpeg")
        await pageObjectManager.getFloorsPage().getWorldMapCheckbox().click()
        await page.waitForTimeout(1000)
        await pageObjectManager.getFloorsPage().getFloorAddButton().scrollIntoViewIfNeeded()
        await pageObjectManager.getFloorsPage().getFloorAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorValidationText().last().waitFor({state:'visible', timeout:9000})
        let floorDetail = await pageObjectManager.getFloorsPage().getFloorValidationText().last().textContent()
        console.log(`floorDetails: ${floorDetail}`)
        expect(floorDetail).toContain("Second FloorLevel: 2")
        await pageObjectManager.getFloorsPage().getFloorsGridView().last().click()
        await pageObjectManager.getFloorSetupPage().getRuler().waitFor({state:'visible', timeout:9000})
        await pageObjectManager.getFloorSetupPage().getRuler().click()
        await pageObjectManager.getFloorSetupPage().getScaleFactor().fill("1")
        await pageObjectManager.getFloorSetupPage().getSaveButton().click()
       
    })

    test("Verify error message if user upload image other than JPG, PNG & JPEG", async() => {
       
        await pageObjectManager.getFacilityPage().getFloorLink().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFacilityPage().getFloorLink()).toBeVisible()
        await pageObjectManager.getFacilityPage().getFloorLink().click()
        await pageObjectManager.getFloorsPage().getAddButton().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFloorsPage().getAddButton()).toBeVisible()
        await pageObjectManager.getFloorsPage().getAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().fill(uiUtils.getFloorName())
        await pageObjectManager.getFloorsPage().getFloorLevel().fill(uiUtils.getFloorLevel())
        await pageObjectManager.getFloorsPage().getLabelField().fill(uiUtils.getFloorLabel())
        await pageObjectManager.getFloorsPage().getDescriptionTextArea().fill("Being created through automation script :-)")

        // upload floor map 
        await uiUtils.uploadFile(page, "testdata/color.webp")
        const errMsg = await pageObjectManager.getFloorsPage().getUploadInvalidErrorText().textContent()
        console.log(`errMsg: ${errMsg}`)
        expect(errMsg).toContain("There is something wrong with the file extension, allowed extensions: (.jpg/.jpeg/.png)")

        await uiUtils.uploadFile(page, "testdata/Floor_Plans.jpeg")
        await pageObjectManager.getFloorsPage().getWorldMapCheckbox().click()
        await page.waitForTimeout(1000)
        await pageObjectManager.getFloorsPage().getFloorAddButton().scrollIntoViewIfNeeded()
        await pageObjectManager.getFloorsPage().getFloorAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorValidationText().last().waitFor({state:'visible', timeout:9000})
        let floorDetail = await pageObjectManager.getFloorsPage().getFloorValidationText().last().textContent()
        console.log(`floorDetails: ${floorDetail}`)
        expect(floorDetail).toContain("Second FloorLevel: 2")
        await pageObjectManager.getFloorsPage().getFloorsGridView().last().click()
        await pageObjectManager.getFloorSetupPage().getRuler().waitFor({state:'visible', timeout:9000})
        await pageObjectManager.getFloorSetupPage().getRuler().click()
        await pageObjectManager.getFloorSetupPage().getScaleFactor().fill("1")
        await pageObjectManager.getFloorSetupPage().getSaveButton().click()
        
    })

    test("Verify that user is able to cancel floor plan and re-create again", async() => {
      
        await pageObjectManager.getFacilityPage().getFloorLink().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFacilityPage().getFloorLink()).toBeVisible()
        await pageObjectManager.getFacilityPage().getFloorLink().click()
        await pageObjectManager.getFloorsPage().getAddButton().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFloorsPage().getAddButton()).toBeVisible()
        await pageObjectManager.getFloorsPage().getAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().fill(uiUtils.getFloorName())
        await pageObjectManager.getFloorsPage().getFloorLevel().fill(uiUtils.getFloorLevel())
        await pageObjectManager.getFloorsPage().getLabelField().fill(uiUtils.getFloorLabel())
        await pageObjectManager.getFloorsPage().getDescriptionTextArea().fill("Being created through automation script :-)")

        // upload floor map 
        await uiUtils.uploadFile(page, "testdata/Floor_Plans.jpeg")
        await pageObjectManager.getFloorsPage().getWorldMapCheckbox().click()
        await page.waitForTimeout(1000)
        await pageObjectManager.getFloorsPage().getCancelButton().scrollIntoViewIfNeeded()
        await pageObjectManager.getFloorsPage().getCancelButton().click()
        await pageObjectManager.getFloorsPage().getAddButton().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFloorsPage().getAddButton()).toBeVisible()

        await pageObjectManager.getFloorsPage().getAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().fill(uiUtils.getFloorName())
        await pageObjectManager.getFloorsPage().getFloorLevel().fill(uiUtils.getFloorLevel())
        await pageObjectManager.getFloorsPage().getLabelField().fill(uiUtils.getFloorLabel())
        await pageObjectManager.getFloorsPage().getDescriptionTextArea().fill("Being created through automation script :-)")

        // upload floor map 
        await uiUtils.uploadFile(page, "testdata/color.webp")
        const errMsg = await pageObjectManager.getFloorsPage().getUploadInvalidErrorText().textContent()
        console.log(`errMsg: ${errMsg}`)
        expect(errMsg).toContain("There is something wrong with the file extension, allowed extensions: (.jpg/.jpeg/.png)")

        await uiUtils.uploadFile(page, "testdata/Floor_Plans.jpeg")
        await pageObjectManager.getFloorsPage().getWorldMapCheckbox().click()
        await page.waitForTimeout(1000)
        await pageObjectManager.getFloorsPage().getFloorAddButton().scrollIntoViewIfNeeded()
        await pageObjectManager.getFloorsPage().getFloorAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorValidationText().last().waitFor({state:'visible', timeout:9000})
        let floorDetail = await pageObjectManager.getFloorsPage().getFloorValidationText().last().textContent()
        console.log(`floorDetails: ${floorDetail}`)
        expect(floorDetail).toContain("Second FloorLevel: 2")
        await pageObjectManager.getFloorsPage().getFloorsGridView().last().click()
        await pageObjectManager.getFloorSetupPage().getRuler().waitFor({state:'visible', timeout:9000})
        await pageObjectManager.getFloorSetupPage().getRuler().click()
        await pageObjectManager.getFloorSetupPage().getScaleFactor().fill("1")
        await pageObjectManager.getFloorSetupPage().getSaveButton().click()       
       
    })

    test("Verify that user is not able to add floor plan which already exists", async() => {

        
        await pageObjectManager.getFacilityPage().getFloorLink().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFacilityPage().getFloorLink()).toBeVisible()
        await pageObjectManager.getFacilityPage().getFloorLink().click()
        await pageObjectManager.getFloorsPage().getAddButton().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFloorsPage().getAddButton()).toBeVisible()
        await pageObjectManager.getFloorsPage().getAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().fill(uiUtils.getFloorName())
        await pageObjectManager.getFloorsPage().getFloorLevel().fill(uiUtils.getFloorLevel())
        await pageObjectManager.getFloorsPage().getLabelField().fill(uiUtils.getFloorLabel())
        await pageObjectManager.getFloorsPage().getDescriptionTextArea().fill("Being created through automation script :-)")

        // upload floor map 
        await uiUtils.uploadFile(page, "testdata/FloorPlan.jpg")
        await pageObjectManager.getFloorsPage().getWorldMapCheckbox().click()
        await page.waitForTimeout(1000)
        await pageObjectManager.getFloorsPage().getFloorAddButton().scrollIntoViewIfNeeded()
        await pageObjectManager.getFloorsPage().getFloorAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorValidationText().last().waitFor({state:'visible', timeout:9000})
        let floorDetail = await pageObjectManager.getFloorsPage().getFloorValidationText().last().textContent()
        console.log(`floorDetails: ${floorDetail}`)
        expect(floorDetail).toContain("Second FloorLevel: 2")
        await pageObjectManager.getFloorsPage().getFloorsGridView().last().click()
        await pageObjectManager.getFloorSetupPage().getRuler().waitFor({state:'visible', timeout:9000})
        await pageObjectManager.getFloorSetupPage().getRuler().click()
        await pageObjectManager.getFloorSetupPage().getScaleFactor().fill("1")
        await pageObjectManager.getFloorSetupPage().getSaveButton().click()
        
        // add the same floor plan and validate the error message

        await pageObjectManager.getFacilityPage().getFloorLink().click()
        await pageObjectManager.getFloorsPage().getAddButton().waitFor({state:'visible', timeout:9000})
        await expect(pageObjectManager.getFloorsPage().getAddButton()).toBeVisible()
        await pageObjectManager.getFloorsPage().getAddButton().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().click()
        await pageObjectManager.getFloorsPage().getFloorNameField().fill(uiUtils.getFloorName())
        await pageObjectManager.getFloorsPage().getFloorLevel().fill(uiUtils.getFloorLevel())
        await pageObjectManager.getFloorsPage().getLabelField().fill(uiUtils.getFloorLabel())
        await pageObjectManager.getFloorsPage().getDescriptionTextArea().fill("Being created through automation script :-)")

        // upload floor map 
        await uiUtils.uploadFile(page, "testdata/FloorPlan.jpg")
        await pageObjectManager.getFloorsPage().getWorldMapCheckbox().click()
        await page.waitForTimeout(1000)
        await pageObjectManager.getFloorsPage().getFloorAddButton().scrollIntoViewIfNeeded()
        await pageObjectManager.getFloorsPage().getFloorAddButton().click()
        

        //validate error messages

        const errorFloorName = await pageObjectManager.getFloorsPage().getErrorNameAlreadyExist().textContent()
        const errorFloorLevel = await pageObjectManager.getFloorsPage().getErrorFloorAlreadyExist().textContent()

        console.log(`errorName: ${errorFloorName} : errorLevel: ${errorFloorLevel}`)

        expect(errorFloorName).toContain("This name already exists")
        expect(errorFloorLevel).toContain("This level already exists")
 
    })

})