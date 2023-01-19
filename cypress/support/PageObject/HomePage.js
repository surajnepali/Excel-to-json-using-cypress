class HomePage{

    constructor(){
        this.homeTitle = 'p.grow.transition-all.duration-300.overflow-hidden.whitespace-nowrap.w-[160px]'
        this.hotelModule = '[href="/hotel"]'
    }

    getHomeTitle(){
        return cy.get(this.title);
    }

    getHotelModule(){
        return cy.get(this.hotelModule);
    }

}

export default HomePage