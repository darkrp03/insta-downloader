import axios from "axios";

export class FileApi {
    static async getFileSizeFromUrl(url: string) {
        const response = await axios.get(url);
        const length = response.headers["content-length"];

        return Number(length);
    }

    static convertToMegabytes(bytes: number) {
        return bytes / 1024 / 1024;
    }
}