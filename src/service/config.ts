import { readFileSync } from 'node:fs';

export class Config {
    private static config: {[index: string]: string} = JSON.parse(readFileSync('./config/config.json', 'utf-8'));

    public static get(key: string): string {
        return this.config[key];
    }

    public static getReportUrl(): string {
        return this.config['centrala'] + '/report';
    }
}

