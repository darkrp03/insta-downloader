import axios from "axios";
import { InstaCredentials } from "./credentials";

export class InstagramService {
    async getVideoUrl(postId: string): Promise<string | undefined> {
        const instagramUrl = `https://www.instagram.com/p/${postId}/?__a=1&__d=dis`;
        const headers = InstaCredentials.getHeaders();
    
        const response = await axios.get(instagramUrl, {
            headers: headers
        });

        const items = response.data["items"];
        const item = items[0];
        const video_versions = item["video_versions"];
        const video_version = video_versions[video_versions.length - 1];
        const url = video_version["url"];

        return url;
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