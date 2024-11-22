export class Message {
    public msgID: number
    public text: string

    constructor(msgID: number, text: string) {
        this.msgID = msgID
        this.text = text
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