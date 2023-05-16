const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = new Builder().forBrowser(Browser.CHROME).build();
  await driver.get("http://localhost:3000")
  await driver.findElement(By.css("#add-movie-input")).sendKeys("Children of Men", Key.RETURN)
});

afterEach(async () => {
  await driver.quit();
});

test("crossing off a movie", async () => {
  await driver.findElement(By.css("#movie-0")).click()
  await driver.wait(until.elementLocated(By.css("#movie-0:checked")))
});

test("deleting a movie", async () => {
  await driver.findElement(By.css(".delete-btn")).click()
  expect(await driver.wait(until.elementLocated(By.css("#movies-list"))).getText()).toBe("")
});

test("notifications are displayed", async () => {
  await driver.findElement(By.css("#movie-0")).click()
  expect(await driver.wait(until.elementLocated(By.css("#message"))).getText()).toBe("Watched Children of Men")
});
