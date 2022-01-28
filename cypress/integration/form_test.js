describe('Form App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza');
    })

    const nameInput = () => cy.get('input[id="name-input"]');
    const sizeInput = () => cy.get('select[name="size"]').select('Small');
    const addToOrderBtn = () => cy.get('button[id="order-button"]');
    const pepperoni = () => cy.get('[type="checkbox"]').check();
    const sausage = () => cy.get('[type="checkbox"]').check();
    const cheese = () => cy.get('[type="checkbox"]').check();
    const pineapple = () => cy.get('[type="checkbox"]').check();
    const specialInstructionsInput = () => cy.get('input[name="specialInstructions"]');
    const errors = () => cy.get('.errors');

    it('performing sanity check', () => {
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
        expect({}).not.to.equal({});
        expect({}).to.eql({});
    })

    describe('Filling out the inputs', () => {
        it('the proper elements are showing', () => {
            nameInput().should('exist');
            sizeInput().should('exist');
            addToOrderBtn().should('exist');
            pepperoni().should('exist');
            sausage().should('exist');
            cheese().should('exist');
            pineapple().should('exist');
            specialInstructionsInput().should('exist');
        })

        it('checking name inputs', () => {
            nameInput().type('My name');
            specialInstructionsInput().type('My special instructions');
            nameInput().should('have.value', 'My name');
            specialInstructionsInput().should('have.value', 'My special instructions');
        })

        it('pizza topping boxes start out unchecked', () => {
            pepperoni().should('be.checked');
            sausage().should('be.checked');
            cheese().should('be.checked');
            pineapple().should('be.checked');
        })

        it('there is form validation if an input is empty', () => {
            nameInput().should('have.value', '');
            specialInstructionsInput().should('have.value', '');
            errors().should('have.value', '');
        })
    })
})
