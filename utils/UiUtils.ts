import {test,Page} from "@playwright/test"

export class UiUtils {

    async uploadFile(page:Page, path:string){

        await page.setInputFiles("input[type='file']", path)

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