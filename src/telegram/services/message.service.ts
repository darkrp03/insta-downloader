import { Context } from "telegraf";
import { InstagramService } from "../../instagram/instagram.service";

export class TelegramMessageService {
    async processMessage(ctx: Context) {
        try {
            const instagramService = new InstagramService();

            if (!ctx.text) {
                return;
            }

            const id = instagramService.getPostId(ctx.text);

            if (!id) {
                await ctx.reply('Instagram post/reel ID was not found!');

                return;
            }

            await ctx.reply('Loading...');
            const url = await instagramService.getVideoUrl(id);
            
            await ctx.replyWithVideo(url, { supports_streaming: true });
        }
        catch (err) {
            console.log(err);
            await ctx.reply('Something went wrong! Please try again!');
        }
    }
}