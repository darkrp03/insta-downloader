import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import dotenv from "dotenv";
import { InstagramService } from "./instagram/instagram.service";

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;

if (!token) {
    throw new Error('Empty telegram bot token!');
}

const bot = new Telegraf(token);

bot.start((ctx) => {
    ctx.reply('Hello!');
})

bot.on(message('text'), async (ctx) => {
    try {
        const instagramService = new InstagramService();
        const id = instagramService.getPostId(ctx.text);

        if (!id) {
            ctx.reply('Instagram post/reel ID was not found!');

            return;
        }

        const path = await instagramService.downloadReel(id);

        if (!path) {
            ctx.reply('Something went wrong! Please try again!');

            return;
        }

        await ctx.replyWithVideo(path, { caption: 'Your video' });
    } 
    catch (err) {
        console.log(err);
        ctx.reply('Something went wrong! Please try again!');
    }
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))