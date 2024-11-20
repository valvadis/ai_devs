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
    public sendReport(task: string, request: any): void {
        const message: Message = new Message(
            task,
            Config.get('auth_token'),
            request
        )

        axios.post(Config.getReportUrl(), message)
            .then(({data}: AxiosResponse) => {
                console.log('Response:', data);
            })
            .catch((error: AxiosError) => {
                console.error('Error:', error.message);
                console.error('Error:', error.response?.data);
            });
    }

    public static extractDataFromTags(input: string): string | null {
        const regex: RegExp = /<RESULT>(.*?)<\/RESULT>/s;
        const match: string[]|null = input.match(regex);

        return match ? match[1].trim() : null;
    }
}

