import { sendMessage, DIST_REQ } from "./telegram/telegraf.js";
const objArrayPayout = [
    { crash_id: 2, round_max: 23, dist_temp: 0 },
    { crash_id: 2.3, round_max: 26, dist_temp: 0 },
    { crash_id: 3.2, round_max: 35, dist_temp: 0 },
    { crash_id: 4, round_max: 49, dist_temp: 0 },
    { crash_id: 5, round_max: 65, dist_temp: 0 },
];
const array_crash = [];

export function setProbRounds(last_round) {
    if (last_round[2] >= 10) return array_crash.splice(0, array_crash.length);

    array_crash.unshift(last_round[2]);

    const payouts_filtered = objArrayPayout.filter((element) => {
        let dist_temp = array_crash.findIndex((crash) => crash >= element.crash_id);
        element.dist_temp = dist_temp < 0 ? array_crash.length : dist_temp;
        //console.log(`DIST_TEMP: ${element.dist_temp} | MAX: ${element.round_max}`);
        return element.round_max - element.dist_temp <= DIST_REQ;
    });

    if (payouts_filtered.length !== 0) setMessage(payouts_filtered, last_round);
    console.count("# Rounds");
}

function setMessage(payouts, last_round) {
    let message = getMessage(`✨ ⭐️  You <b>GAIN</b>  💵\n`, payouts);

    message += `\n📌 Round: <a href="https://faucetpay.io/crashes">${
        last_round[0]
    }</a> - Crash: <b>${last_round[2].toFixed(2)}x</b> 🔻`;

    sendMessage(message);
}

function getMessage(msg, payouts) {
    let message = msg;
    for (const obj of payouts) {
        const dist = obj.round_max - obj.dist_temp;
        const prob = (1 / dist) * 100;
        message += `\n☑️ Payout: <b>${obj.crash_id.toFixed(
            2
        )}x</b>\n✅ Probability: <b>1/${dist}</b>  |  <b>${parseFloat(prob.toFixed(2))}</b>%\n`;
    }
    return message;
}
