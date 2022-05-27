/**
 * https://api.telegram.org/bot${process.env.TOKEN_BOT_TELEGRAM}/getUpdates
 */
import { Telegraf, Markup } from "telegraf";

const id_chats = [1385277284];
const bot = new Telegraf(process.env.TOKEN_BOT_TELEGRAM);
export const DIST_REQ = 15;

export function sendMessage(message) {
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

bot.command("settings", (ctx) => {
    ctx.reply(`Hi, ${ctx.chat.first_name}! Come to for configurations`);
});

bot.command("help", (ctx) => {
    ctx.reply(`Oh, sorry ${ctx.chat.first_name}! Need Help?`);
});

bot.launch();
