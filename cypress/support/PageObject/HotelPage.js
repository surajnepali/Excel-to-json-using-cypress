class HotelPage{

    constructor(){
        this.addHotelBtn = '.primary-btn'
        this.firstHotel = '/html/body/div/div[1]/div[2]/div/table/tbody/tr[2]/td[1]'
    }

    getAddHotelBtn(){
        return cy.get(this.addHotelBtn);
    }

    getFirstHotel(){
        return cy.xpath(this.firstHotel);
    }

}

export default HotelPage;