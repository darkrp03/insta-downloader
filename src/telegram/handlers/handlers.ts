import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { InstagramService } from "../../instagram/instagram.service";
import { FileApi } from "../../file/fileApi";

export class TelegramBotHandlers {
    constructor(private readonly bot: Telegraf) { }

    private initStartHandler() {
        this.bot.start(async (ctx) => {
            const botInfo = await ctx.telegram.getMe();
            const firstName = ctx.message.from.first_name;

            const text = `Greetings, <b>${firstName}</b>!\n\nMy name is <b>${botInfo.first_name}</b> and I can download the reels from instagram.`
                + "\nJust enter the reel url to download it."
                + "\nFor more, info use /help"

            ctx.reply(text, { parse_mode: 'HTML' });
        });
    }

    private initHelpHandler() {
        this.bot.help((ctx) => {
            const text = "Help center\n\nHere you can see the most popular questions with answers."
            + "\n1.I send the reel and get the message"
            + "<blockquote>Something went wrong! Please try again!</blockquote>"
            + "\n\n<b>Possible problems:</b>\n"
            +"1)The problem with reel. Your reel is too large to load. Try to download other reels!\n"
            +"2)The problem on server side. Just wait until the problem is solved. We apologize in advance for this!"

            ctx.reply(text, { parse_mode: 'HTML' });
        });
    }

    private initMessageHandler() {
        this.bot.on(message('text'), async (ctx) => {
            try {
                const instagramService = new InstagramService();
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

                const fileSizeInBytes = await FileApi.getFileSizeFromUrl(videoUrl);
                const fileSizeInMegabytes = FileApi.convertToMegabytes(fileSizeInBytes);

                if (fileSizeInMegabytes > 20) {
                    ctx.reply('The file is too big!');

                    return;
                }

                await ctx.replyWithVideo(videoUrl, { caption: 'Your insta reel!', supports_streaming: true });
            }
            catch (err) {
                console.log(err);
                ctx.reply('Something went wrong! Please try again!');
            }
        })
    }

    initHandlers() {
        this.initStartHandler();
        this.initHelpHandler();
        this.initMessageHandler();
    }
}