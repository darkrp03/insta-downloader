import { Context } from "telegraf";
import { helpMessage, startMessage } from "../message";

export class TelegramCommandService {
    async start(ctx: Context) {
        const botInfo = await ctx.telegram.getMe();
        const firstName = ctx.message?.from.first_name || '';

        const text = startMessage.replace('{0}', firstName)
            .replace('{1}', botInfo.first_name);

        ctx.reply(text, { parse_mode: 'HTML' });
    }

    help(ctx: Context) {
        ctx.reply(helpMessage, { parse_mode: 'HTML' });
    }
}