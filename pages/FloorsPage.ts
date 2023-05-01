
import {Locator, Page, test} from "@playwright/test"
export class FloorsPage {

    addBtn:Locator
    floorName:Locator
    floorLevel:Locator
    description:Locator
    floorAddButton:Locator
    dragDrop:Locator
    label:Locator
    worldMap:Locator
    floorsGridView:Locator
    floorDelete:Locator
    deleteFloorYesButton:Locator
    floorValidationText:Locator
    uploadInvalidText:Locator
    cancelButton:Locator
    errorNameAlreadyExist:Locator
    errorFloorAlreadyExist:Locator
    
    constructor(page:Page){

        this.addBtn = page.locator("div[class='Floors__actionControls'] button[type='button']")
        this.floorName = page.getByPlaceholder('Enter floor name')
        this.floorLevel= page.locator('div').filter({ hasText: /^Floor Level$/ }).getByRole('textbox')
        this.description = page.locator('textarea')
        this.floorAddButton = page.locator("(//button[normalize-space()='Add Floor'])[1]")
        this.dragDrop = page.getByText("Drag or upload the map image")
        this.label = page.getByPlaceholder('Enter Label')
        this.worldMap = page.locator('div').filter({ hasText: /^Align to world map$/ }).locator('i')
        this.floorsGridView = page.locator("img.FloorCard__image")
        this.floorDelete = page.locator("div.FloorCard__tools")
        this.deleteFloorYesButton = page.getByRole('button', { name: 'Yes' })
        this.floorValidationText = page.locator("section.FloorCard__infoSection")
        this.uploadInvalidText = page.locator(".ValidationText.ValidationText--danger")
        this.cancelButton = page.getByRole('button', { name: 'cancel' })
        this.errorNameAlreadyExist = page.getByText("This name already exists")
        this.errorFloorAlreadyExist = page.getByText("This level already exists")
       
      
    }

    getErrorFloorAlreadyExist(){
        return this.errorFloorAlreadyExist
    }
    

    getErrorNameAlreadyExist(){
        return this.errorNameAlreadyExist
    }

    getCancelButton(){
        return this.cancelButton
    }

    getUploadInvalidErrorText(){
        return this.uploadInvalidText
    }

    getFloorValidationText(){
        return this.floorValidationText
    }

    getDeleteFloorYesButton(){
        return this.deleteFloorYesButton
    }

    getFloorDeleteButton(){
        return this.floorDelete
    }

    getFloorsGridView(){
        return this.floorsGridView
    }

    getWorldMapCheckbox(){
        return this.worldMap
    }

    getLabelField(){
        return this.label
    }

    getDragDropImage(){
        return this.dragDrop
    }

    getFloorAddButton(){
        return this.floorAddButton
    }
    
    getDescriptionTextArea(){
        return this.description
    }

    getFloorLevel(){
        return this.floorLevel
    }

    getFloorNameField(){
        return this.floorName
    }

    getAddButton(){
        return this.addBtn
    }

  
}