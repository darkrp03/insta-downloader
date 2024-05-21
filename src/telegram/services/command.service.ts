import { Context } from "telegraf";
import { messagesConfig } from "../../configs/message";

export class TelegramCommandService {
    async start(ctx: Context) {
        const botInfo = await ctx.telegram.getMe();
        const firstName = ctx.message?.from.first_name || 'user';

        const text = messagesConfig.messages.start.replace('{0}', firstName)
            .replace('{1}', botInfo.first_name);

        ctx.reply(text, { parse_mode: 'HTML' });
    }

    help(ctx: Context) {
        ctx.reply(messagesConfig.messages.help, { parse_mode: 'HTML' });
    }
}