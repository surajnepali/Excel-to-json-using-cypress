/// <reference types="Cypress" />
let path = require('path')

describe('convert data to Json', () => { 
    it('read data from Excel', () =>{ 
        cy.parseXlsx('cypress/fixtures/excelDataaa.xlsx').then( (x) =>
        { 
            let allArray = x[0].data
            let colNameArray=x[0].data[0]
            let i=1
            let arr = [];
            // console.log({x: x[0].data})
            while(allArray[i]?.length != 0){
                let obj = {}
                // console.log({i})
                // console.log({allArraylen:allArray[i]?.length })
                    colNameArray.forEach(element => {
                        // console.log({colNameArray : colNameArray.indexOf(element)})
                        obj[element] = allArray[i][colNameArray.indexOf(element)]
                    });
                    // console.log({obj});
                    arr.push(obj);
                    i++
                }
            // console.log(arr);
            cy.writeFile("cypress/fixtures/xlsxDataaa.json", {HomeStay : arr})
        })
    })
}) 
        
describe("Reading Data from newly created json file",function()
{
    it("Sample test case of login", function()
    {
        cy.viewport(1920, 1080)
        cy.visit("https://myselfadmin.merohomestay.com")
        cy.get("h1").should('exist').contains('Welcome')
        cy.get('.mt-2').should('exist').contains('Login to continue')
        cy.get(':nth-child(1) > .input').should('exist').type('admin@gmail.com')
        cy.get(':nth-child(2) > .input').should('exist').type('admin12345')
        cy.get('button').should('exist').should('contain', 'Login').click()
        cy.xpath('//*[@id="root"]/div[2]').should('exist').should('have.text','Successfully Login.')
        cy.get('[href="/hotel"]').should('exist').and('contain', 'Hotel').click()
        cy.url().should('contain', '/hotel')
        cy.fixture('xlsxDataaa').then((user) =>
        {
            for(let j = 0; j < user.HomeStay.length; j++){
                cy.get('.primary-btn').should('exist').and('contain', 'Add Hotel').click()
                cy.get(':nth-child(1) > :nth-child(1) > .input').type(user.HomeStay[j].hotelName)
                cy.get(':nth-child(1) > :nth-child(2) > .cursor-pointer').click()
                // cy.xpath('//*[@id="headlessui-dialog-panel-:r2:"]').should('exist')
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[1]/select').select(user.HomeStay[j].place)
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[2]/input').type(user.HomeStay[j].latitude)
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[3]/input').type(user.HomeStay[j].longitude)
                cy.get('button').contains('Add Location').click()
                cy.get('[placeholder="Enter primary number"]').type(user.HomeStay[j].contactNumberOne)
                cy.get('[placeholder="Enter secondary number"]').type(user.HomeStay[j].contactNumberTwo)
                cy.get(':nth-child(4) > .input').type(user.HomeStay[j].hotelEmail)
                cy.get('input[type="radio"]').check(user.HomeStay[j].breakfast)
                if(user.HomeStay[j].parking == 'Yes(Paid)'){
                    cy.get(':nth-child(7) > .space-x-5 > :nth-child(2) > .cursor-pointer').check()
                }else if(user.HomeStay[j].parking == 'Yes(Free)'){
                    cy.get(':nth-child(7) > .space-x-5 > :nth-child(1) > .cursor-pointer').check()
                }else if(user.HomeStay[j].parking == 'No'){
                    cy.get(':nth-child(3) > .cursor-pointer').check()
                }
                cy.get('div.flex.items-center.space-x-1').contains(user.HomeStay[j].parking).click() //user.HomeStay[j].parking
                // cy.get(':nth-child(6) > .space-x-5 > :nth-child(2) > .cursor-pointer').click()
                // cy.get(':nth-child(7) > .space-x-5 > :nth-child(2) > .cursor-pointer').click()
                cy.get(':nth-child(8) > .cursor-pointer').click()
                // cy.xpath('//*[@id="headlessui-dialog-panel-:r4:"]').should('exist')
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[1]/select').should('exist').select(user.HomeStay[j].roomType)
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[2]/input').should('exist').type(user.HomeStay[j].noOfRoom)
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[3]/input').should('exist').type(user.HomeStay[j].pricePerRoom)
                cy.get('div.grid:nth-child(2) > div:nth-child(1) > input:nth-child(1)').should('exist').check().should('be.checked')
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[4]/div/div[4]/input').should('exist').check().should('be.checked')
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[4]/div/div[5]/input').should('exist').check().should('be.checked')
                cy.xpath('/html/body/div[2]/div/div/div/div[2]/div/div/form/div[5]/textarea').should('exist').type(user.HomeStay[j].roomDescription)
                cy.get('button').contains('Save').should('exist').click()
                cy.get(':nth-child(10) > .input').should('exist').select(user.HomeStay[j].package)
                cy.get('.gap-5 > :nth-child(1) > .input').should('exist').click().type(user.HomeStay[j].timeCheckIn)
                cy.get(':nth-child(2) > .input').should('exist').click().type(user.HomeStay[j].timeCheckOut)
                cy.get(':nth-child(13) > .input').should('exist').type(user.HomeStay[j].description)
                cy.get('.relative > :nth-child(1) > .label').should('exist').selectFile('sirubari1.png')
                cy.get('.grid > .flex > div > .label').should('exist').selectFile('sirubari2.png')
                cy.get('.grid > .flex > div > .label').should('exist').selectFile('sirubari3.png')
                cy.get('button').should('exist').contains('Add Hotel').click()
                cy.wait(3000)
                cy.xpath('//*[@id="root"]/div[2]').should('exist').should('have.text','New Hotel successfully created.')
            }
        })
    })
})