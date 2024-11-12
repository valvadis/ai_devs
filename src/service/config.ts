import { readFileSync } from 'node:fs';

export class Config {
    private static config: {[index: string]: string} = JSON.parse(readFileSync('./config/config.json', 'utf-8'));

    private static dirname: string = import.meta.dirname;

    public static get(key: string): string {
        return this.config[key];
    }

    public static getDirname(): string {
        return this.dirname;
    }

    public static getReportUrl(): string {
        return this.config['centrala'] + '/report';
    }
}

