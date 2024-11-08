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