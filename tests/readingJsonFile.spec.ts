import {test, expect} from "@playwright/test"
const dataset = JSON.parse(JSON.stringify(require("../testdata/credentials.json")))


test("testing reading json file",async () => {

    console.log(dataset.username)
    console.log(dataset.password)
    
})