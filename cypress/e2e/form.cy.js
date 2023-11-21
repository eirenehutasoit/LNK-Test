describe('Form Testing', () => {
    it('should fill out and submit the form', () => {
      // Visit the website
      cy.visit('https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u');
  

    // declare variable with input value
    const values = ['Eirene', '081231231312']
    // fill input value
    cy.get('input[aria-label="Single line text"]').each(($input, index) => {
        const value = values[index] || ''; 
        cy.wrap($input).type(value);
      });
  
    //   choose radio button
    const radioValues = ['Affordable', 'Expensive', '']
    const textInputValueForOption3 = 'test'
      cy.get('input[name="r8bc17b753f0048ecb03794ef45037bb7"]').each(($radio, index) => {
        const expectedValue = radioValues[index] || '';
        cy.wrap($radio).should('have.value', expectedValue);

        if (expectedValue === '' && index === 2) {
          // If the expected value is an empty string and it's the third radio button (Option3)
          cy.get('input[aria-label="Other answer"]').eq(1).type(textInputValueForOption3);
        }else {
            cy.wrap($radio).check(expectedValue)
        }
      
      });


      // select rate
    const randomNumber = Cypress._.random(1, 5);

    cy.get(`[aria-label="${randomNumber} Star"][role="radio"]`).click()
   
    // calendar
    const currentDate = new Date();

    // Format the current date in the desired format (e.g., 'YYYY-MM-DD')
    const formattedDate = currentDate.toISOString().split('T')[0];
     cy.get('#DatePicker0-label').invoke('val', formattedDate).type('{enter}')
  
      // Submit the form
      cy.get('[data-automation-id="submitButton"]').click();
  

    });
  });
  