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
                ctx.reply('Instagram post/reel ID was not found!');

                return;
            }

            ctx.reply('Loading...');
            const videoUrl = await instagramService.getVideoUrl(id);

            if (!videoUrl) {
                ctx.reply('Something went wrong! Please try again!');

                return;
            }
            
            await ctx.replyWithVideo(videoUrl, { caption: 'Your insta reel!', supports_streaming: true });
        }
        catch (err) {
            console.log(err);
            ctx.reply('Something went wrong! Please try again!');
        }
    }
}