import {test,Page} from "@playwright/test"

export class UiUtils {

    async uploadFile(page:Page){

        await page.setInputFiles("input[type='file']", "testdata/FloorPlan.jpg")

    }

    getFloorName(){
        return "Second Floor"
    }

    getFloorLevel(){
        return "2"
    }

    getFloorLabel(){
        return "SND"
    }


}