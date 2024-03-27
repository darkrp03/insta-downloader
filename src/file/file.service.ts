import axios from "axios";

const BYTES = 1024;

export class FileService {
    static async getFileSizeFromUrl(url: string): Promise<number> {
        const response = await axios.get(url);
        
        const length = response.headers["content-length"];
        const lengthInMegabytes = Number(length) / BYTES / BYTES;

        return lengthInMegabytes;
    }
}