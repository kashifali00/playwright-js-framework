
import {Locator, Page, test} from "@playwright/test"
export class FacilityPage {

    floor:Locator;
    
    constructor(page:Page){

        this.floor = page.getByRole('link', { name: 'Floors' }).first()

      
    }

    getFloorLink(){
        return this.floor
    }

 
    
  

  
}