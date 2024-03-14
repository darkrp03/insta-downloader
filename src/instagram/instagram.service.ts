import axios from "axios";
import { InstaCredentials } from "./credentials";
import { FileApi } from "../file/fileApi";

export class InstagramService {
    async getVideoUrl(postId: string): Promise<string | undefined> {
        const instagramUrl = `https://www.instagram.com/p/${postId}/?__a=1&__d=dis`;
        const headers = InstaCredentials.getHeaders();

        const response = await axios.get(instagramUrl, {
            headers: headers
        });

        const items = response.data["items"];
        const item = items[0];
        const videoVersions = item["video_versions"];

        if (!videoVersions) {
            return;
        }

        const promises: Promise<number>[] = [];

        for (const videoVersion of videoVersions) {
            const url = videoVersion["url"];
            promises.push(FileApi.getFileSizeFromUrl(url));
        }

        const videoSizes = await Promise.all(promises);
        const maxFileSize = 50;

        for (const index in videoSizes) {
            const videoSize = videoSizes[index];

            const megabytes = FileApi.convertToMegabytes(videoSize);

            if (megabytes < maxFileSize) {
                return videoVersions[index]["url"];
            }
        }
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