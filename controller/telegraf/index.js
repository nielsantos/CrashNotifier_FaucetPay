/**
 * https://api.telegram.org/bot${process.env.TOKEN_BOT_TELEGRAM}/getUpdates
 */
import { Telegraf } from "telegraf";

const id_chats = [1385277284];
const bot = new Telegraf(process.env.TOKEN_BOT_TELEGRAM);
export const DIST_REQ = 15;

export function sendMessage(array_filtered) {
    //create levels of opportunity
    //new, golden, legendary, unmissable, unbeliveble
    let message = `🔹🔷🔵     <b>NEW CHANCE</b>     🔵🔷🔹\n`;
    for (const element of array_filtered) {
        let prob = (1 / (element.round_max - element.dist_temp)) * 100;
        message += `\n✔️ Crash: <b>${element.crash_id.toFixed(2)}x</b>\n✅ Probability: <b>1/${
            element.round_max - element.dist_temp
        }</b>  |  <b>${parseFloat(prob.toFixed(2))}</b>%\n`;
    }
    id_chats.forEach((element) =>
        bot.telegram.sendMessage(element, message, { parse_mode: "HTML" })
    );
}

bot.command("start", (ctx) => {
    if (!id_chats.includes(ctx.chat.id)) {
        id_chats.push(ctx.chat.id);
        console.log(id_chats);
        ctx.reply(`Hi, ${ctx.chat.first_name}! Welcome to Crash Notifier.`);
    } else console.log("Usuário já registrado!");
});

bot.launch();
