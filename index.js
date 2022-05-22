/**
 * Crash Notifier - FaucetPay is an automated application that will notify you of the probability of winning at a given Crash Point.
 */
import "dotenv/config";
import { getLastRounds } from "./controller/puppeteer/index.js";
import { setProbRounds } from "./controller/crashes.js";

(function loop() {
    const id = setTimeout(() => {
        getLastRounds().then((last_rounds) => {
            if (!last_rounds) return clearTimeout(id);
            loop();
            setProbRounds(last_rounds.reverse());
        });
    }, 3000);
})();
