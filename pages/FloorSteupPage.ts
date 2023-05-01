
import {Locator, Page, test} from "@playwright/test"
export class FloorSteupPage {

    ruler:Locator
    scaleFactor:Locator
    saveButton:Locator
    cancelButton:Locator
    
    constructor(page:Page){

        this.ruler = page.locator("button[type='button'] i[class='fa fa-ruler-combined']")
        this.scaleFactor = page.locator("input[value='0']")
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.cancelButton = page.getByText("Cancel")
    
    }

    getSaveButton(){
        return this.saveButton
    }

    getCancelButton(){
        return this.cancelButton
    }

    getScaleFactor(){
        return this.scaleFactor
    }

    getRuler(){
        return this.ruler
    }


}