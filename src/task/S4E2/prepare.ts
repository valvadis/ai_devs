import fs from "fs";
import { Config } from "../../service/config.js";
import {Poligon} from "../../service/poligon.js";

class Message {
    private role: string;
    private content: string;

    constructor(role: string, content: string) {
        this.role = role;
        this.content = content;
    }
}

class Messages {
    private messages: Message[] = [];

    constructor(messages: Message[]) {
        this.messages.push(
            new Message('system', 'Decide whether the data is correct or incorrect')
        )

        this.messages.push(...messages);
    }
}

const messageCollection: Messages[] = [];

const pathToResearch: string = Config.getDirname() + "/../../data/research/";

const correct: Buffer = fs.readFileSync(pathToResearch + 'correct.txt');
for (const entry of correct.toString().split('\n')) {
    const messages: Messages = new Messages([
        new Message('user', entry),
        new Message('assistant', 'correct'),
    ]);

    messageCollection.push(messages);
}

const incorrect: Buffer = fs.readFileSync(pathToResearch + 'incorrect.txt');
for (const entry of incorrect.toString().split('\n')) {
    const messages: Messages = new Messages([
        new Message('user', entry),
        new Message('assistant', 'incorrect'),
    ]);

    messageCollection.push(messages);
}

fs.writeFileSync(pathToResearch + 'data.jsonl', '');
for (const messages of messageCollection) {
    fs.appendFileSync(pathToResearch + 'data.jsonl', JSON.stringify(messages) + '\n');
}
