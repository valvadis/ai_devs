import { Poligon } from "../../service/poligon.js";
import { Chat } from "../../service/chat.js";
import { Config } from "../../service/config.js";
import { findAnswerFor, findLinkFor } from "./prompt.js";
import axios, { AxiosResponse } from "axios";

const chat = new Chat();

// PREPARE STRUCTURES
interface Questions {
    '01': string;
    '02': string;
    '03': string;
}

class Answers implements Questions {
    '01': string = '';
    '02': string = '';
    '03': string = '';
}

// FETCH QUESTIONS
const domain: string = Config.get('centrala');
const apikey: string = Config.get('auth_token');

const questions: Questions = await axios.get(domain + '/data/' + apikey + '/softo.json')
    .then(({ data }: AxiosResponse) => {
        return data;
    });

console.log(questions);

// FIND ANSWERS
const answers: Answers = new Answers();
const softo: string = Config.get('softo');
const indexes = ['01', '02', '03'];

for (const index of indexes) {
    console.log('START LOOKING FOR ANSWER FOR QUESTION: ', index);
    let previous: string = '';
    const key: keyof Answers & keyof Questions = index as keyof Answers & keyof Questions;

    let page: string = await axios.get(softo)
        .then(({ data }: AxiosResponse) => {
            return data;
        });

    while(answers[key] === '') {
        const answer: string = await chat.send([
            {
                role: "user",
                content: findAnswerFor(questions[key])
            },
            { role: "user", content: page },
        ])
        const response: string|null = Poligon.extractDataFromTags(answer, 'RESPONSE');

        if (response) {
            answers[key] = response;
        } else {
            let redirect: string = await chat.send([
                {
                    role: "user",
                    content: findLinkFor(questions[key], previous)
                },
                { role: "user", content: page },
            ])

            redirect = Poligon.extractDataFromTags(redirect, 'REDIRECT') ?? '';

            if (!redirect.startsWith('http')) {
                redirect = softo + redirect;
            }

            page = await axios.get(redirect)
                .then(({ data }: AxiosResponse) => {
                    return data;
                });

            previous = redirect;
        }
    }
}

// SEND REPORT
console.log(answers);

await (new Poligon()).sendReport('softo', answers);