import { registrationPage } from "./registrationPage";

// That class is manager to mantain all pages object initialization

export class POManager {

    regPage: any
    page: any

    constructor(page){
        this.page = page
        this.regPage = new registrationPage(this.page);
    }

    getRegistrationPage() : registrationPage {
        return this.regPage
    }

}