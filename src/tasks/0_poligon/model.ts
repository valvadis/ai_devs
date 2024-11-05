export class Message {
    public task: string
    public apikey: string
    public answer: string[]

    constructor(task: string, apikey: string, answer: string[]) {
        this.task = task
        this.apikey = apikey
        this.answer = answer
    }
}