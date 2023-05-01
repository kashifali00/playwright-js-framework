
import {Locator, Page, test} from "@playwright/test"
export class LoginPage {

    email:Locator
    pass:Locator
    LoginBtn:Locator
    errMsg:Locator

    constructor(page:Page){

        this.email = page.locator("input[placeholder='Email']")
        this.pass =  page.locator("input[placeholder='Password']")
        this.LoginBtn = page.locator("button[type='submit']")
        this.errMsg = page.locator(".ValidationText ")
        
    }

    getErrorMsgUponInvaidCredentials(){
        return this.errMsg
    }

    getEmailField(){
        return this.email
    }

    getPassField(){
        return this.pass
    }

    getLoginButton(){
        return this.LoginBtn
    }

  


}