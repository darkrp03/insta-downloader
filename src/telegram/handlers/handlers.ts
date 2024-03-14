import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { TelegramCommandService } from "../services/command.service";
import { TelegramMessageService } from "../services/message.service";

export class TelegramBotHandlers {
    private readonly commandService: TelegramCommandService;
    private readonly messageService: TelegramMessageService;

    constructor(private readonly bot: Telegraf) {
        this.commandService = new TelegramCommandService();
        this.messageService = new TelegramMessageService();
    }

    private initStartHandler() {
        this.bot.start(this.commandService.start);
    }

    private initHelpHandler() {
        this.bot.help(this.commandService.help);
    }

    private initMessageHandler() {
        this.bot.on(message('text'), this.messageService.processMessage);
    }

    initHandlers() {
        this.initStartHandler();
        this.initHelpHandler();
        this.initMessageHandler();
    }
}