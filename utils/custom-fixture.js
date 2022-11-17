import test from "@playwright/test"

// create a new test property that add a new fixture to test
exports.customtest = test.extend({
    testData: {
        username: "kashifali",
        password: "password"
    }

})