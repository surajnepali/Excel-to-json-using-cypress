class LoginPage{

    constructor(){
        this.title = 'h1';
        this.semiTitle = '.mt-2'
        this.emailField = '[placeholder="Your email"]';
        this.passwordField = '[placeholder="Your password"]';
        this.btn = 'button';
        this.toastMessage = '//*[@id="root"]/div[2]'
    }

    getTitle(){
        return cy.get(this.title);
    }

    getSemiTitle(){
        return cy.get(this.semiTitle);
    }

    getEmailField(){
        return cy.get(this.emailField);
    }

    getPasswordField(){
        return cy.get(this.passwordField);
    }

    getBtn(){
        return cy.get(this.btn);
    }

    getToastMessage(){
        return cy.xpath(this.toastMessage);
    }

}

export default LoginPage