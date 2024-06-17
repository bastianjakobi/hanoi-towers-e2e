import { getURL } from "../constants";

const URL = getURL(Cypress.env("ENVIRONMENT_NAME"));

const removeCookieBanner = () => {
  cy.get("div").contains("h3", "Cookie Richtlinie").parent().get("button").contains("Ok").click();
};

describe("Smoke Tests", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  it("successfully loads the applications home page", () => {
    // Remove the cookie banner before testing the page
    removeCookieBanner();
    // Check if page headings are present
    cy.get("h1").contains("Die Türme von Hanoi").should("be.visible");
    cy.get("h2").contains("Spielregeln").should("be.visible");
    cy.get("h2").contains("Spiel Modi").should("be.visible");
    cy.get("h3").contains("Spielen").should("be.visible");
    cy.get("h3").contains("Schummeln").should("be.visible");
    cy.get("h3").contains("Automatisch").should("be.visible");

    // Check if navigation buttons are present
    cy.get("button").contains("Home").should("be.visible");
    cy.get("button").contains("Game").should("be.visible");
  });

  it("shows a cookie consent banner", () => {
    // Check if the cookie banner and close button are present
    const cookieBanner = cy.get("div").contains("h3", "Cookie Richtlinie").parent();
    const closeButton = cookieBanner.get("button").contains("Ok");
    cookieBanner.should("be.visible");
    closeButton.should("be.visible");

    // Close the cookie banner
    closeButton.click();

    // Check if the cookie banner is not present anymore
    cookieBanner.should("not.exist");
  });

  it("navigates to the correct pages when clicking on the navigation buttons", () => {
    // Remove the cookie banner before testing the navigation
    removeCookieBanner();
    // Check if the game button navigates to the game page
    cy.get("button").contains("Game").click();
    cy.url().should("eq", `${URL}/game`);

    // Check if the home button navigates to the home page
    cy.get("button").contains("Home").click();
    cy.url().should("eq", `${URL}/`);
  });

  it("shows the correct content when navigating to the game page", () => {
    // Remove the cookie banner before testing the game page
    removeCookieBanner();

    // Navigate to the game page
    cy.get("button").contains("Game").click();
    cy.url().should("eq", `${URL}/game`);

    // Check if game page content is present
    cy.get("h1").contains("Die Türme von Hanoi").should("be.visible");

    cy.get("label").contains("Turmhöhe").should("be.visible");
    cy.get("input#tower-height").should("be.visible").should("have.value", "0");

    cy.get("h3").contains("Visualisierung").should("be.visible");
  });
});
