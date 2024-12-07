import { Chat } from "../../service/chat.js";
import {Config} from "../../service/config.js";
import axios, {AxiosResponse} from "axios";
import {askQuestions} from "./prompt.js";
import {Poligon} from "../../service/poligon.js";

const chat = new Chat();
const source = Config.get('centrala') + '/data/' + Config.get('auth_token') + '/notes.json';

interface Questions {
    '01': string;
    '02': string;
    '03': string;
    '04': string;
    '05': string;
}

class Answers implements Questions {
    '01': string = '';
    '02': string = '';
    '03': string = '';
    '04': string = '';
    '05': string = '';
}

const answers: Questions = new Answers();
const questions: Questions = await axios.get(source)
    .then(({ data }: AxiosResponse) => {
        return data;
    })

console.log(questions);

const indexes: string[] = ['01', '02', '03', '04', '05'];

for (const index of indexes) {
    const key = index as keyof Questions;

    answers[key] = await chat.send([
        {
            role: "system",
            content: askQuestions
        },
        { role: "user", content: questions[key] },
    ]);
}

console.log(answers);

await (new Poligon()).sendReport('notes', answers);