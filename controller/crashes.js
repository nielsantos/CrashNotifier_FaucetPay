import { sendMessage, DIST_REQ } from "./telegraf/index.js";
const objArrayRounds = [
    { crash_id: 2, round_max: 23, dist_temp: 0 },
    { crash_id: 2.3, round_max: 26, dist_temp: 0 },
    { crash_id: 3.2, round_max: 35, dist_temp: 0 },
    { crash_id: 4, round_max: 49, dist_temp: 0 },
    { crash_id: 5, round_max: 65, dist_temp: 0 },
];
const array_crash = [];

export function setProbRounds(last_rounds) {
    if (!sortArrayCrash(last_rounds)) return;

    const arr_filtered = objArrayRounds.filter((element) => {
        let dist_temp = array_crash.findIndex((crash) => crash >= element.crash_id);
        element.dist_temp = dist_temp < 0 ? array_crash.length : dist_temp;
        //console.log(`DIST_TEMP: ${element.dist_temp} | MAX: ${element.round_max}`);
        return element.round_max - element.dist_temp <= DIST_REQ;
    });

    if (arr_filtered.length !== 0) sendMessage(arr_filtered);
}

function sortArrayCrash(last_rounds) {
    for (let i = 0; i < last_rounds.length; i++) {
        if (last_rounds[i] >= 100 && i != last_rounds.length - 1) {
            array_crash.splice(0, array_crash.length);
            //console.log("splice");
            return false;
        }
        if (array_crash.length < last_rounds.length) {
            array_crash.push(last_rounds[i]);
            //console.log("push");
            continue;
        }
        if (last_rounds[i] !== array_crash[i]) {
            array_crash.unshift(last_rounds[i]);
            console.count("# Rounds");
            return true;
        }
    }
    return false;
}
