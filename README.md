# Insta Downloader
**Insta Downloader** - telegram bot that can download a media from instagram. You only need to send a link to the media, and bot will return the downloaded content (currently, it supports the reels).<br> 
<div align="center">
  <img src="https://github.com/darkrp03/insta-downloader/assets/65673865/9b886009-a001-47a3-a0ea-a785e720ce7f" alt="Insta Downloader Logo">
</div>

# Limitations
Insta Downloader requires your credentials, such as:<br>
* User-Agent
* Cookies
* X_IG_APP_ID

All credentials you can get from graphl request in Network tab.
<div align="center">
  <img src="https://github.com/darkrp03/insta-downloader/assets/65673865/1f2a737f-8537-4502-88c8-a87c1c10106e" alt="Insta Downloader Logo">
</div><br>

> [!CAUTION]
> Your credentials will be inactive if you log out of your instagram account or switch to another one!

# Installation
## Offline
1.Clone this project using git clone https://github.com/darkrp03/insta-downloader.git<br>
2.Open cmd and navigate to the project folder.<br>
3.Run this command
```
npm install
```
4.You need to fill your env file. You should look at the **env.example** file to understand what you need to fill in!<br>
5.Run this command 

```
npm start
```

You've just launched a bot on your local machine!

## Online (AWS Lambda)
1.Clone this project using git clone https://github.com/darkrp03/insta-downloader.git<br>
2.Open cmd and navigate to the project folder.<br>
3.Run this command
```
npm install
```
4.You need to fill your env file. You should look at the **env.example** file to understand what you need to fill in!<br>
5.You need to create the IAM user with Administrator Access. (See this https://kloudle.com/academy/how-to-create-an-iam-admin-user-in-aws)<br>
6.You need to add the credentials to aws config (See this https://medium.com/nerd-for-tech/configuration-and-credential-file-settings-in-aws-cli-61c7ff0a1cd6)<br>
7.Run this command<br>
### Windows
```
npm run deploy-win --profile=[Your aws profile]
```

### Linux, Mac OS X
```
npm run deploy-bash --profile=[Your aws profile]
```

Wait for the project to load.

8.After successfull loading you need to setup your webhook with telegram. Make this request:

```
https://api.telegram.org/bot[PASTE TELEGRAM BOT TOKEN HERE]/setWebhook?url=https://aws-your-webhook-url.com
```

That's all! You've just launched a bot on AWS Labmda!
