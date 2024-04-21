import { TelegramBot } from "./telegram/bot";
import dotenv from "dotenv";

dotenv.config();
const bot = new TelegramBot();

export async function webhook(event: any) {
    try {
        if (event.body) {
            const requestBody = JSON.parse(event.body);
            await bot.update(requestBody);
        }

        return { statusCode: 200, body: "" };
    }
    catch (err) {
        console.log(err);
        return { statusCode: 500, body: "Internal server error" };
    }
}