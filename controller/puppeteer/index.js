import puppeteer from "puppeteer";

let browser, page;

export async function getLastRounds() {
    if (!browser) browser = await puppeteer.launch({ headless: false });
    if (!page) {
        page = await browser.newPage();
        await page.goto("https://faucetpay.io/crashes");
    }
    if (!browser.isConnected() || page.isClosed()) {
        console.log("PÁGINA FECHADA ou NAVEGADOR DESCONECTADO!");
        return await browser.close();
    }
    return await page.$$eval(".last_rounds span", (rounds) =>
        rounds.map((round) => parseFloat(round.innerText))
    );
}
