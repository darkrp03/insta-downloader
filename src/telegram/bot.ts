import { Telegraf } from "telegraf";
import { TelegramBotHandlers } from "./handlers/handlers";

export class TelegramBot {
    private readonly bot: Telegraf;

    constructor() {
        const token = process.env.TELEGRAM_TOKEN;

        if (!token) {
            throw new Error('Empty telegram bot token!');
        }

        this.bot = new Telegraf(token);
        this.initialize();
    }

    private initialize() {
        const handlers = new TelegramBotHandlers(this.bot);
        handlers.initHandlers();
    }

    async update(body: any) {
        await this.bot.handleUpdate(body);
    }
}