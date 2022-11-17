import {expect, test} from '@playwright/test'

test("Browser context test",async ({browser}) => {

   
    // it will create new browser context in congnito mode
    // browser information will come from playwright.config.ts
    let context = await browser.newContext()

    // Now create a new page/tab in browser context we created at step 7
    // we will be doing all automation on that page

    let page = await context.newPage();

    // now navigate to site using page context

    await page.goto("https://practice.automationtesting.in/")
    await expect(page).toHaveTitle("Automation Practice Site")

    
})

 // This one is by default configuration, if we don't modify the browser context we don't pass browser fixture just page fixture
 // and playwright will do default browsercontext configuration itself 

test("Without browser context test",async ({page}) => {

    await page.goto("https://demo.automationtesting.in/Register.html")
    await expect(page).toHaveTitle("Register")
    await expect(page.locator("input[placeholder='First Name']")).toBeHidden
    await page.locator("input[placeholder='First Name']").type("kashif")
    await page.locator("input[placeholder='Last Name']").type("ali")
    await page.locator("textarea[ng-model='Adress']").type('Javed shaheed road, house cb 50, jinnahabad mandian abbottabad')
    await page.locator("input[type='email']").type("kashifali9829@gmail.com")
    await page.locator("input[type='tel']").type("03219829007")

    // Radio button 
    await page.locator("input[value='Male']").click()
    expect(await page.locator("input[value='Male']")).toBeChecked()
    

    // Get the text from 6 element 
    //console.log(await page.locator(".col-md-4.col-xs-4.col-sm-4 label").nth(5).textContent())

    // print of elements text as an array if matching locator is > 1 element

    console.log(await page.locator(".col-md-4.col-xs-4.col-sm-4 label").allTextContents())

    // handle select method

    // display all dropdrop options

    console.log(await page.locator("select[ng-model=Skill] option").allTextContents())
    let dropdownList = await page.locator("select[ng-model=Skill] option").allTextContents()

    await expect(dropdownList.length).toBe(78)

    let dropdown = page.locator("select[ng-model='Skill']");
    //await dropdown.selectOption("Android")
     expect(await dropdown.selectOption("Android")).toContain("Android")

     expect(await page.locator("#checkbox1").isChecked).toBeTruthy()

     

})

test("Homepage of automation testing",async ({page}) => {
    await page.goto("https://demo.automationtesting.in/Index.html")
    await page.locator("#btn1").click()
    // type is used to enter the text into the field
    await page.locator("input[placeholder='E mail']").type("kashifali9829@gmail.com")
    // fill is used to enter text into field as well to clear old content
    await page.locator("input[placeholder='E mail']").fill("")
    await page.locator("input[placeholder='E mail']").fill("kashifali9829@gmail.com")

    await page.locator("input[placeholder='Password']").type("kashifali9829@gmail.com")
    await page.locator("#enterbtn").click()
    console.log(await page.locator("#errormsg").textContent())
    expect(await page.locator("#errormsg").textContent()).toContain(" Invalid User Name or PassWord ")

    
})

test("handle alert or popup on certain click methiod",async ({page}) => {


    // promise.all is used to avoid the race condition because of javascript in async in nature
    // That technique is useful when there is no microservices architecture and data is directly coming from http server.
    // allTextContent doesn't have auto wait so to make that method smartly we use that technique. Either to use 
    // page.waitForLoadState('networkidle') if we are using microservices because we are waiting for all calls to be completed
    await Promise.all([

        page.goto("https://demo.automationtesting.in/Index.html"),

        // here we are telling when we will click then there will be alert for waitfor that navigation, so 77 step will execute first then 76
        page.waitForNavigation(),
        await page.locator("#btn1").click()

    ])
    
})

test("handling multiple windows tests",async ({browser}) => {

    let context =  await browser.newContext();
    let page = await context.newPage();

    await page.goto("https://demo.automationtesting.in/Register.html")
    await page.locator("[href*='SwitchTo']").nth(0).click()
    await page.locator("[href='Windows.html']").click()
    await page.locator("[href*='#Seperate']").click()
    const clickButton = await page.locator(".btn.btn-primary")


    // handling new window here
    let [newPage] =  await Promise.all([

        // wait for new page to be opened on new window once user click on the link below
        context.waitForEvent('page'),
        clickButton.click(),

    ])

    await expect(newPage).toHaveTitle("Selenium")
    expect(await newPage.locator(".text-center h1").textContent()).toBe("Selenium automates browsers. That's it!")
    
})

test("getting radio button", async ({page}) => {

    let gender = "Male"
    let hobbies = "Hockey"

    const selectRadioButton = "Male"
    await page.goto("https://demo.automationtesting.in/Register.html")
    const radioButton = await page.locator(".col-md-4.col-xs-4.col-sm-4 label")
    console.log(await radioButton.count())

    for(let iter=0; iter < await radioButton.count(); iter++){
        if( await radioButton.nth(iter).textContent() === gender){
            await radioButton.nth(iter).getByText(`${gender}`).click();
        }
        
        else if (await radioButton.nth(iter).textContent() === hobbies) {
            await radioButton.nth(iter).getByText(`${hobbies}`).click();

        }
    }

    
})

test("alert handlig test",async ({page}) => {
    await page.goto("https://demo.automationtesting.in/Register.html")
    await page.locator("[href*='SwitchTo']").nth(0).click()
    await page.locator("[href='Alerts.html']").click()
    await page.locator("text=Alert with OK & Cancel ").click()
    page.on('dialog', dialog => dialog.accept())
    await page.locator("text=click the button to display a confirm box ").click()
    expect(await page.locator("#demo").textContent()).toBe("You pressed Ok")
    await page.pause()


    
})


test("hover over element test",async ({page}) => {
    await page.goto("https://demo.automationtesting.in/Register.html")
    await page.locator("[href*='SwitchTo']").nth(0).click()
    await page.locator("[href='Alerts.html']").click()
    
    await page.pause()


    
})

test.only("iframe test",async ({page}) => {
    await page.goto("https://demo.automationtesting.in/Register.html")
    await page.locator("[href*='SwitchTo']").nth(0).click()
    await page.locator("[href='Frames.html']").click()

    const framePage = page.frameLocator("#singleframe")
    framePage.locator("input[type='text']").type("This is iframe text")
    
    await page.pause()


    
})

