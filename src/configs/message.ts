const startBotMessage = "Greetings, <b>{0}</b>!\n\nMy name is <b>{1}</b> and I can download the reels from instagram."
    + "\nJust enter the reel url to download it."
    + "\nFor more, info use /help";

const helpBotMessage = "Help center\n\nHere you can see the most popular questions with answers."
    + "\n1.I send the reel and get the message"
    + "<blockquote>Something went wrong! Please try again!</blockquote>"
    + "\n\n<b>Possible problems:</b>\n"
    + "1)The problem with reel. Your reel is too large to load. Try to download other reels!\n"
    + "2)You are trying to download the other types of media (carousel, photos or stories). Bot can download only instagram reels!\n"
    + "3)The problem on server side. Just wait until the problem is solved. We apologize in advance for this!";

export const messagesConfig = {
    messages: {
        start: startBotMessage,
        help: helpBotMessage
    }
};