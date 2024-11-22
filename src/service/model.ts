import {Config} from "./config.js";

export class Message {
    public msgID: number
    public text: string

    constructor(msgID: number, text: string) {
        this.msgID = msgID
        this.text = text
    }
}

export class Database {
    public task: string = 'database'
    public apikey: string = Config.get('auth_token')
    public query: string

    constructor(query: any) {
        this.query = query
    }
}

export class Query {
    public apikey: string
    public query: string

    constructor(apikey: string, query: string) {
        this.apikey = apikey
        this.query = query
    }
}