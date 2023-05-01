import { Page } from "playwright";
import { LoginPage } from "../pages/LoginPage"
import { DashboardPage } from "./DashboardPage";
import { FacilityPage } from "./FacilityPage";
import { FloorsPage } from "./FloorsPage";
import { FloorSteupPage } from "./FloorSteupPage";

// That class is manager to mantain all pages object initialization

export class POManager {

    loginPage:LoginPage
    dashboardPage:DashboardPage
    facility:FacilityPage
    floors:FloorsPage
    floorStep:FloorSteupPage

    constructor(page:Page){
        this.loginPage = new LoginPage(page)
        this.dashboardPage = new DashboardPage(page)
        this.facility = new FacilityPage(page)
        this.floors = new FloorsPage(page)
        this.floorStep = new FloorSteupPage(page)
       
    }

    getFloorSetupPage(){
        return this.floorStep
    }

    getFloorsPage(){
        return this.floors
    }

    getFacilityPage(){
        return this.facility
    }

    getDashboardPage(){
        return this.dashboardPage
    }

    getLoginPage(){
        return this.loginPage
    }

}