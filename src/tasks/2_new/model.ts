export class Message {
    public msgID: number
    public text: string

    constructor(msgID: number, text: string) {
        this.msgID = msgID
        this.text = text
    }
}