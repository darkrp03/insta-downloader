interface Item {
    video_versions?: Reel[]
}

interface ShortCodeMedia {
    video_url: string;
}

export interface Reel {
    url: string;
}

export interface InstagramCookiesResponse {
    items: Item[];
}

export interface InstagramGraphQlResponse {
    data: {
        xdt_shortcode_media: ShortCodeMedia;
    }
}