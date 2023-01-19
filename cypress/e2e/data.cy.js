/// <reference types="Cypress" />
let path = require('path')

const AddHotelPage = require('../support/PageObject/AddHotelPage')
const LoginPage = require('../support/PageObject/LoginPage')
const HomePage = require('../support/PageObject/HomePage')
const HotelPage = require('../support/PageObject/HotelPage')

const addHotelPage = new AddHotelPage()
const loginPage = new LoginPage()
const homePage = new HomePage()
const hotelPage = new HotelPage()

describe('convert data to Json', () => { 
    it('read data from Excel', () =>{ 
        cy.parseXlsx('cypress/fixtures/excelDataaa.xlsx').then( (x) =>
        { 
            let allArray = x[0].data
            let colNameArray=x[0].data[0]
            let i=1
            let arr = [];
            while(allArray[i]?.length != 0){
                let obj = {}
                    colNameArray.forEach(element => {
                        obj[element] = allArray[i][colNameArray.indexOf(element)]
                    });
                    arr.push(obj);
                    i++
                }
            cy.writeFile("cypress/fixtures/xlsxDataaa.json", {HomeStay : arr})
        })
    })
}) 
        
describe("Reading Data from newly created json file",function()
{
    it("Test case to add four Homestays through MeroHomeStay Admin Side", function()
    {
        cy.viewport(1920, 1080)
        cy.visit("https://myselfadmin.merohomestay.com")
        loginPage.getTitle().should('exist').contains('Welcome')
        loginPage.getSemiTitle().should('exist').contains('Login to continue')

        //login credentials are invalid, you should use valid email and password to run this code without any errrors
        loginPage.getEmailField().should('exist').type('*************') 
        loginPage.getPasswordField().should('exist').type('*********')
        loginPage.getBtn().should('exist').should('contain', 'Login').click()
        loginPage.getToastMessage().should('exist').should('have.text','Successfully Login.')
        homePage.getHotelModule().should('exist').and('have.text', 'Hotel').click()
        cy.url().should('contain', '/hotel')

        cy.fixture('xlsxDataaa').then((user) =>
        {

            for(let j = 0; j < user.HomeStay.length; j++){

                hotelPage.getAddHotelBtn().should('exist').and('contain', 'Add Hotel').click()
                addHotelPage.getHotelNameField().type(user.HomeStay[j].hotelName)
                addHotelPage.getAddLocation().click()
                addHotelPage.getLocationDropdown().select(user.HomeStay[j].place)
                addHotelPage.getLatitudeField().type(user.HomeStay[j].latitude)
                addHotelPage.getLongitudeField().type(user.HomeStay[j].longitude)
                addHotelPage.getAddBtn().contains('Add Location').click()
                addHotelPage.getPrimaryNumberField().type(user.HomeStay[j].contactNumberOne)
                addHotelPage.getSecondaryNumberField().type(user.HomeStay[j].contactNumberTwo)
                addHotelPage.getEmailField().type(user.HomeStay[j].hotelEmail)
                addHotelPage.getBreakfastRadio().check(user.HomeStay[j].breakfast)

                if(user.HomeStay[j].parking == 'Yes(Paid)'){
                    addHotelPage.getYesPaidRadio().check()
                }else if(user.HomeStay[j].parking == 'Yes(Free)'){
                    addHotelPage.getYesFreeRadio().check()
                }else if(user.HomeStay[j].parking == 'No'){
                    addHotelPage.getNoRadio().check()
                }

                addHotelPage.getAddRoom().click()
                addHotelPage.getRoomDropdown().should('exist').select(user.HomeStay[j].roomType)
                addHotelPage.getNoOfRoomsField().should('exist').type(user.HomeStay[j].noOfRoom)
                addHotelPage.getRoomPriceField().should('exist').type(user.HomeStay[j].pricePerRoom)

                cy.get('div.grid:nth-child(2) > div:nth-child(1) > input:nth-child(1)').should('exist').check().should('be.checked')
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[4]/div/div[4]/input').should('exist').check().should('be.checked')
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[4]/div/div[5]/input').should('exist').check().should('be.checked')
                
                addHotelPage.getRoomDescriptionField().should('exist').type(user.HomeStay[j].roomDescription)
                addHotelPage.getAddBtn().contains('Save').should('exist').click()
                addHotelPage.getPackageDropdown().should('exist').select(user.HomeStay[j].package)
                addHotelPage.getCheckInTime().should('exist').click().type(user.HomeStay[j].timeCheckIn)
                addHotelPage.getCheckOutTime().should('exist').click().type(user.HomeStay[j].timeCheckOut)
                addHotelPage.getHotelDescription().should('exist').type(user.HomeStay[j].description)
                addHotelPage.getSelectFirstImg().should('exist').selectFile('sirubari1.png')
                addHotelPage.getSelectAnotherImg().should('exist').selectFile('sirubari2.png')
                addHotelPage.getSelectAnotherImg().should('exist').selectFile('sirubari3.png')
                addHotelPage.getAddBtn().should('exist').contains('Add Hotel').click()
                cy.wait(3000)
                addHotelPage.getToastMessage().should('exist').should('have.text','New Hotel successfully created.')
                hotelPage.getFirstHotel().should('exist').and('have.text', user.HomeStay[j].hotelName)
            }
        })

    })
})