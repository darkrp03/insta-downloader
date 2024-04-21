import axios from "axios";
import { InstagramCookie } from "../configs/cookies";
import { InstagramGraphql } from "../configs/graphql";
import { InstagramCookiesResponse, InstagramGraphQlResponse } from "./interfaces/instagram";

export class InstagramService {
    private async getVideoUrlUsingCookies(postId: string): Promise<string> {
        const instagramUrl = `https://www.instagram.com/p/${postId}/?__a=1&__d=dis`;
        const instagramCookie = new InstagramCookie();
        instagramCookie.load();

        const headers = instagramCookie.getHeaders();

        const response = await axios.get(instagramUrl, {
            headers: headers
        });

        const data = response.data as InstagramCookiesResponse;
        const item = data.items[0];
        
        if (!item.video_versions) {
            throw new Error('Empty video_versions property!');
        }

        const videoUrl = item.video_versions[0].url

        if (!videoUrl) {
            throw new Error('Empty url property!');
        }

        return videoUrl;
    }

    private async getVideoUrlUsingGraphQl(postId: string): Promise<string> {
        const instagramUrl = `https://www.instagram.com/api/graphql`;
        const instagramGraphQl = new InstagramGraphql();

        const headers = instagramGraphQl.getGraphqlHeaders();
        const graphqlData = instagramGraphQl.getGraphqlQueryString(postId);

        const response = await axios.post(instagramUrl, graphqlData, {
            headers: headers
        })

        const data = response.data as InstagramGraphQlResponse;
        const videoUrl = data.data.xdt_shortcode_media.video_url;

        if (!videoUrl) {
            throw new Error('Empty video_url property!');
        }

        return videoUrl;
    }

    async getVideoUrl(postId: string): Promise<string> {
        const useGraphQl = process.env.USE_GRAPHQL;

        if (!useGraphQl) {
            return await this.getVideoUrlUsingCookies(postId);
        }

        return await this.getVideoUrlUsingGraphQl(postId);
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