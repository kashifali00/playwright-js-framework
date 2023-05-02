
import {Locator, Page, test} from "@playwright/test"
export class FloorSteupPage {

    ruler:Locator
    scaleFactor:Locator
    saveButton:Locator
    cancelButton:Locator
    normalNode:Locator
    nodeConnector:Locator
    
    constructor(page:Page){

        this.ruler = page.locator("button[type='button'] i[class='fa fa-ruler-combined']")
        this.scaleFactor = page.locator("input[value='0']")
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.cancelButton = page.getByText("Cancel")
        this.normalNode = page.locator('#Ellipse_353')
        this.nodeConnector = page.locator('section').filter({ hasText: /^Add Path EdgesEdge$/ }).getByRole('img')
    
    }

    getNodeConnector(){
        return this.nodeConnector
    }

    getNormalNodeCheckbox(){
        return this.normalNode
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