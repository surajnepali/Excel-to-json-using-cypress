class HotelPage{

    constructor(){
        this.addHotelBtn = '.primary-btn'
    }

    getAddHotelBtn(){
        return cy.get(this.addHotelBtn);
    }

}

export default HotelPage;