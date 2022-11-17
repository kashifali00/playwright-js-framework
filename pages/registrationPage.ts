export class registrationPage {
    firstName : any
    lastName : any
    address : any
    email : any
    tel : any
    gender : any
    skills : any

    constructor(page){
        this.firstName = page.locator("input[placeholder='First Name']")
        this.lastName = page.locator("input[placeholder='Last Name']")
        this.address = page.locator("textarea[ng-model='Adress']")
        this.email = page.locator("input[type='email']")
        this.tel = page.locator("input[type='tel']")
        this.gender = page.locator("input[value='Male']")
        this.skills = page.locator("select[ng-model='Skill']")
    }

    async validLogin(username, password){
        await this.firstName.fill("kashif")
        
    }


}