import axios from "axios";
import { InstaCredentials } from "./credentials";
import { FileService } from "../file/file.service";
import { InstagramResponse, Reel } from "./interfaces/instagram";

export class InstagramService {
    private getReelVersions(response: InstagramResponse): Reel[] | undefined {
        const item = response.items[0];
        const reelVersions = item.video_versions;

        return reelVersions;
    }

    private async getOptimalReel(reels: Reel[]): Promise<Reel | undefined> {
        const promises: Promise<number>[] = [];
        reels.forEach(reel => promises.push(FileService.getFileSizeFromUrl(reel.url)));

        const results = await Promise.allSettled(promises);
        const maxTelegramVideoSize = 50;

        for (const index in results) {
            const result = results[index];

            if (result.status === 'fulfilled') {
                const videoSize = result.value;

                if (videoSize < maxTelegramVideoSize) {
                    return reels[index];
                }
            }
        }
    }

    async getVideoUrl(postId: string): Promise<string> {
        const instagramUrl = `https://www.instagram.com/p/${postId}/?__a=1&__d=dis`;
        const headers = InstaCredentials.getHeaders();

        const response = await axios.get(instagramUrl, {
            headers: headers
        });

        const reelVersions = this.getReelVersions(response.data);

        if (!reelVersions) {
            throw new Error('Empty video_versions property!');
        }

        const reel = await this.getOptimalReel(reelVersions);

        if (!reel) {
            throw new Error('Empty reel object!');
        }

        return reel.url;
    }

    getPostId(url: string): string | undefined {
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