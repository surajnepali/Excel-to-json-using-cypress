class AddHotelPage{

    constructor(){
        this.hotelNameField = ':nth-child(1) > :nth-child(1) > .input';
        this.addLocation = ':nth-child(1) > :nth-child(2) > .cursor-pointer';
        this.locationDropdown = '/html/body/div[2]/div/div/div/div[2]/div/div/form/div[1]/select';
        this.latitudeField = '/html/body/div[2]/div/div/div/div[2]/div/div/form/div[2]/input';
        this.longitudeField = '/html/body/div[2]/div/div/div/div[2]/div/div/form/div[3]/input';
        this.addBtn = 'button'
        this.primaryNumberField = '[placeholder="Enter primary number"]';
        this.secondaryNumberField = '[placeholder="Enter secondary number"]';
        this.emailField = ':nth-child(4) > .input';
        this.breakfastRadio = 'input[type="radio"]'
        this.yesPaidRadio = ':nth-child(7) > .space-x-5 > :nth-child(2) > .cursor-pointer'
        this.yesFreeRadio = ':nth-child(7) > .space-x-5 > :nth-child(1) > .cursor-pointer'
        this.noRadio = ':nth-child(3) > .cursor-pointer'
        this.addRoom = ':nth-child(8) > .cursor-pointer'
        this.roomDropdown = '/html/body/div[2]/div/div/div/div[2]/div/div/form/div[1]/select'
        this.noOfRoomsField = '/html/body/div[2]/div/div/div/div[2]/div/div/form/div[2]/input'
        this.roomPriceField = '/html/body/div[2]/div/div/div/div[2]/div/div/form/div[3]/input'
        this.roomDescriptionField = '/html/body/div[2]/div/div/div/div[2]/div/div/form/div[5]/textarea'
        this.packageDropdown = ':nth-child(10) > .input'
        this.checkInTime = '.gap-5 > :nth-child(1) > .input'
        this.checkOutTime = ':nth-child(2) > .input'
        this.hotelDescription = ':nth-child(13) > .input'
        this.selectFirstImg = '.relative > :nth-child(1) > .label'
        this.selectAnotherImg = '.grid > .flex > div > .label'
        this.toastMessage = '//*[@id="root"]/div[2]'
    }

    getHotelNameField(){
        return cy.get(this.hotelNameField);
    }

    getAddLocation(){
        return cy.get(this.addLocation);
    }

    getLocationDropdown(){
        return cy.xpath(this.locationDropdown);
    }

    getLatitudeField(){
        return cy.xpath(this.latitudeField);
    }

    getLongitudeField(){
        return cy.xpath(this.longitudeField);
    }

    getAddBtn(){
        return cy.get(this.addBtn);
    }

    getPrimaryNumberField(){
        return cy.get(this.primaryNumberField);
    }

    getSecondaryNumberField(){
        return cy.get(this.secondaryNumberField);
    }

    getEmailField(){
        return cy.get(this.emailField);
    }

    getBreakfastRadio(){
        return cy.get(this.breakfastRadio);
    }

    getYesPaidRadio(){
        return cy.get(this.yesPaidRadio);
    }

    getYesFreeRadio(){
        return cy.get(this.yesFreeRadio);
    }

    getNoRadio(){
        return cy.get(this.noRadio);
    }

    getAddRoom(){
        return cy.get(this.addRoom);
    }

    getRoomDropdown(){
        return cy.xpath(this.roomDropdown);
    }

    getNoOfRoomsField(){
        return cy.xpath(this.noOfRoomsField);
    }

    getRoomPriceField(){
        return cy.xpath(this.roomPriceField);
    }

    getRoomDescriptionField(){
        return cy.xpath(this.roomDescriptionField);
    }

    getPackageDropdown(){
        return cy.get(this.packageDropdown);
    }

    getCheckInTime(){
        return cy.get(this.checkInTime);
    }

    getCheckOutTime(){
        return cy.get(this.checkOutTime);
    }

    getHotelDescription(){
        return cy.get(this.hotelDescription);
    }

    getSelectFirstImg(){
        return cy.get(this.selectFirstImg);
    }

    getSelectAnotherImg(){
        return cy.get(this.selectAnotherImg);
    }

    getToastMessage(){
        return cy.xpath(this.toastMessage);
    }

}

export default AddHotelPage;