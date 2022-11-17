import {registrationPage} from "../pages/registrationPage";
import {test, expect} from "@playwright/test";
import { POManager } from "../pages/POManager";

test.beforeAll( () => {
    
})

test("Registration test",async ({page}) => {
    const POManagerObject = new POManager(page)
    await page.goto("https://demo.automationtesting.in/Register.html")
    await POManagerObject.getRegistrationPage().firstName.type("Kashif")
    await POManagerObject.getRegistrationPage().lastName.type("Ali")
    await POManagerObject.getRegistrationPage().address.type("Javed shaheed road, house cb 50, jinnahabad mandian abbottabad")

})