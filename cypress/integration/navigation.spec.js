describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday , click it and css check", () => {
    cy.contains('[data-testid = day]',"Tuesday")
    .click()
    .should("have.class","day-list__item--selected")
  });
  
});
