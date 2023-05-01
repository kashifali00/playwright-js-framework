
import {Locator, Page, test} from "@playwright/test"
export class DashboardPage {

    userInfo:Locator
    logout:Locator
    facility:Locator

    constructor(page:Page){
        this.userInfo = page.locator(".UserMenu__userInfo")   
        this.logout = page.getByText("Logout") 
        this.facility = page.getByText("Facility")
    }

    getFacilityMenu(){
        return this.facility
    }
    
    getLogOut(){
        return this.logout
    }

    getUserInfo(){
        return this.userInfo
    }

  
}