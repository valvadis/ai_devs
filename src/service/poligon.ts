import axios, {AxiosError, AxiosResponse} from 'axios';
import {Config} from "./config.js";

export class Message {
    public task: string
    public apikey: string
    public answer: string[]

    constructor(task: string, apikey: string, answer: any) {
        this.task = task
        this.apikey = apikey
        this.answer = answer
    }
}

export class Poligon {
    public async sendReport(task: string, request: any): Promise<string> {
        const message: Message = new Message(
            task,
            Config.get('auth_token'),
            request
        )

        return axios.post(Config.getReportUrl(), message)
            .then(({data}: AxiosResponse) => {
                console.log('Response:', data);
                return data.message;
            })
            .catch((error: AxiosError) => {
                console.error('Error:', error.response);
                return error.message;
            });
    }

    public static extractDataFromTags(input: string, tag: string = 'RESULT'): string | null {
        const regex: RegExp = new RegExp(`<${tag}>(.*?)</${tag}>`, 's');
        const match: string[]|null = input.match(regex);

        return match ? match[1].trim() : null;
    }
}

