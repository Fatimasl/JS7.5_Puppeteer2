const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, getText, putText } = require("../../lib/commands.js");

//setDefaultTimeout(10000);
setDefaultTimeout(10000);
Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://netology.ru${string}`, {
    setTimeout: 20000,
  });
});

When("user search by {string}", async function (string) {
  return await putText(this.page, "input", string);
});

Then("user sees the course suggested {string}", async function (string) {
  const actual = await getText(this.page, "a[data-name]");
  const expected = await string;
  expect(actual).contains(expected);
});

Given("user is on go_to_the_movie page", async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When("user chooses the day {string}", async function (string) {
  return await clickElement(this.page, `nav > a:nth-child(${string})`);
});

When("user chooses first abled seances_time", async function () {
  return await clickElement(
    this.page,
    ".movie-seances__time:not(.acceptin-button-disabled)"
  ); 
});

When("user chooses specific seances_time {string}", async function (string) {
  return await clickElement(
    this.page,
    `.movie-seances__time[href='#'][data-seance-id='${string}']`
  );
});

When("user chooses disabled seances_time", async function () {
  const selector = ".movie-seances__time.acceptin-button-disabled";
  
  const buttonsToPress = await this.page.$$(selector);
  
  if (buttonsToPress.length > 0) {
    return await buttonsToPress[0].clickElement;
  } 
    return;
});

When("user chooses first abled {string} seat", async function (string) {
  return await clickElement(
    this.page,
    `.buying-scheme__chair.buying-scheme__chair_${string}:not(buying-scheme__chair_taken)`
  );
});

When(
  "user chooses on {string} row {string} seat",  async function (string, string2) {
    return await clickElement(
      this.page,
      `section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${string}) > span:nth-child(${string2})`
    );
  }
);
When("user chooses first disabled seat", async function () {
  return await clickElement(
    this.page,
    `.buying-scheme__chair.buying-scheme__chair_disabled`
  );
});

When("user clicks book button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then("user sees notice {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("book button {string} is unclickable", async function (string) {
  const actual = await getText(this.page, ".acceptin-button[disabled='true']");
  const expected = await string;
  expect(actual).contains(expected);
});

Then(
  "user is on the same page and sees seans to the movie {string}",
  async function (string) {
    const actual = await getText(
      this.page,
      "body main section:nth-child(1) div:nth-child(1) div:nth-child(2) h2:nth-child(1)"
    );
    const expected = await string;
    expect(actual).contains(expected);
  }
);