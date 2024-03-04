import axios from "axios";
import * as fs from "fs";
import { Credentials } from "../credentials";
import path from "path";
import { InstagramVideo } from "./interfaces/instagram.interface";

export class InstagramService {
    private async downloadVideo(video: InstagramVideo): Promise<string | undefined> {
        if (!video.url || !video.name) {
            return;
        }

        const response = await axios.get(video.url, {
            responseType: 'stream'
        });

        const videoPath = path.resolve(path.join('data', video.name));

        const writer = fs.createWriteStream(videoPath);
        response.data.pipe(writer);

        return new Promise<string>((resolve, reject) => {
            writer.on('finish', () => resolve(videoPath));
            writer.on('error', reject);
        });
    }

    private async getVideoInfo(postId: string): Promise<InstagramVideo | undefined> {
        const instagramUrl = `https://www.instagram.com/p/${postId}/?__a=1&__d=dis`;
        const headers = Credentials.getHeaders();
    
        const response = await axios.get(instagramUrl, {
            headers: headers
        });

        const obj = response.data;
        const videoUrl = obj["graphql"]["shortcode_media"]["video_url"] as string;

        if (!videoUrl) {
            return;
        }

        const splittedUrl = videoUrl.split('?');
        const extname = path.extname(splittedUrl[0]);
        const videoName = obj["graphql"]["shortcode_media"]["id"] + extname;

        const videoInfo: InstagramVideo = {
            name: videoName,
            url: videoUrl
        }

        return videoInfo;
    }

    async downloadReel(postId: string) {
        const video = await this.getVideoInfo(postId);

        if (!video) {
            return;
        }

        const path = await this.downloadVideo(video);

        return path;
    }

    getPostId(url: string) {
        const postRegex = /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
        const reelRegex = /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

        let id;

        const postCheck = url.match(postRegex);

        if (postCheck) {
            id = postCheck.at(-1);
        }

        const reelCheck = url.match(reelRegex);

        if (reelCheck) {
            id = reelCheck.at(-1);
        }

        return id;
    }
}