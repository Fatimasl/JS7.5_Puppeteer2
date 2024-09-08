const { expect } = require("chai");
const {
  clickElement,
  getText,
} = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultTimeout(10000);
});

afterEach(() => {
  page.close();
});

describe("Movie tests", () => {
  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("First happy path test", async () => {
    //проверим, что открылась начальная страница. Заголовок совпадает с "ИдёмВКино"
    const actual_0 = await page.title();
    await expect(actual_0).contain("ИдёмВКино");
    debugger;
    // выберем завтрашний день
    await clickElement(page, "nav > a:nth-child(2)");
    
    /*//Выберем сеанс на кино "Сталкер"
    await clickElement(
      page,
      "body > main:nth-child(3) > section:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(1)"
    );*/

    //выберем первый сеанс из доступных
    await clickElement(
      page,
      ".movie-seances__time:not(.acceptin-button-disabled)"
    );  
    //проверим, что открылась страница для выбора билетов
    const actual_1 = await getText(page, ".buying__info-start");
    expect(actual_1).contain("Начало сеанса");

    /*//выберем в 6-том ряду 7-ое место
    await clickElement(
      page,
      "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(7)"
    );*/

    //выберем первое место из стандартных и доступных
    await clickElement(
      page,
      ".buying-scheme__chair.buying-scheme__chair_standart:not(buying-scheme__chair_taken)"
    );

    //кликнем по кнопке Забронировать
    await clickElement(page, ".acceptin-button");
    //проверим, что открылась страница для получения кода бронирования
    const actual_2 = await getText(page, ".ticket__check-title");
    expect(actual_2).contain("Вы выбрали билеты:");
  });

  test("Second happy path test", async () => {
    // выберем послезавтрашний день
    await clickElement(page, "nav > a:nth-child(3)");
    //Выберем сеанс на кино "Унесенные ветром"
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='190']"
    );
    //проверим, что открылась страница для выбора билетов
    const actual_1 = await getText(page, ".buying__info-start");
    expect(actual_1).contain("Начало сеанса");

    //выберем в 5-том ряду 5-ое место
    await clickElement(
      page,
      "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(5)"
    );
    //выберем в 5-том ряду 6-ое место
    await clickElement(
      page,
      "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(6)"
    );

    //кликнем по кнопке Забронировать
    await clickElement(page, ".acceptin-button");
    //проверим, что открылась страница для получения кода бронирования
    const actual_2 = await getText(page, ".ticket__check-title");
    expect(actual_2).contain("Вы выбрали билеты:");
  });

  test ("First sad path test", async () => {
    // выберем день через 2 дня
    await clickElement(page, "nav > a:nth-child(4)");
    //Выберем сеанс на кино "Микки Маус" на 11:00
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='198']"
    );
    //проверим, что открылась страница для выбора билетов
    const actual_1 = await getText(page, ".buying__info-start");
    expect(actual_1).contain("Начало сеанса");

    //выберем во 2-том ряду 8-ое место
    await clickElement(
      page,
      //"section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(8)"
      ".buying-scheme__chair.buying-scheme__chair_disabled"
    );

    //проверим, что кнопка Забронировать осталась некликабельной
    const actual_2 = await getText(page, ".acceptin-button[disabled='true']");
    expect(actual_2).contain("Забронировать");

  }); 


  test ("Second sad path test", async () => {
    const selector = ".movie-seances__time.acceptin-button-disabled";
    // кликнем по кнопке сеанса, которая не доступна
    debugger;
    const buttonsToPress = await page.$$(selector);
    expect(buttonsToPress).not.equal([]);
    if (buttonsToPress.length > 0) {
      await buttonsToPress[0].clickElement;
    } else {
      throw new Error('Did not found selector: ${selector}')
    }
       
    //проверим, что мы остались на начальной странице
    const actual_2 = await getText(
      page,
      "body main section:nth-child(1) div:nth-child(1) div:nth-child(2) h2:nth-child(1)"
    );
    expect(actual_2).contain("Сталкер");
  }); 
});
// test("Should look for a course", async () => {
//   await page.goto("https://netology.ru/navigation");
//   await putText(page, "input", "тестировщик");
//   const actual = await page.$eval("a[data-name]", (link) => link.textContent);
//   const expected = "Тестировщик ПО";
//   expect(actual).toContain(expected);
// });

// test("Should show warning if login is not email", async () => {
//   await page.goto("https://netology.ru/?modal=sign_in");
//   await putText(page, 'input[type="email"]', generateName(5));
// });
