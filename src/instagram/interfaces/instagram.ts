interface Item {
    video_versions?: Reel[]
}

export interface Reel {
    url: string;
}

export interface InstagramResponse {
    items: Item[];
}