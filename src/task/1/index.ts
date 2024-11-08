import OpenAI from "openai";
import axios, { AxiosResponse } from 'axios';
import { askAboutQuestion, proveYouAreNotHuman } from "./prompt.js";
import { Config } from '../../service/config.js';
import { ChatCompletion } from "openai/src/resources/chat/completions";

const openai = new OpenAI();
const endpoint = Config.get('xyz');

const webpageCompletion: ChatCompletion = await axios.get(endpoint)
    .then(({data}: AxiosResponse) => {
        return openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: askAboutQuestion },
                { role: "user", content: data }
            ],
        });
    });

const question: string = webpageCompletion.choices[0].message.content ?? "";

const captchaCompletion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: proveYouAreNotHuman },
        {
            role: "user",
            content: question,
        },
    ],
});

const answer: number = Number(captchaCompletion.choices[0].message.content?.trim());

axios({
    method: "post",
    url: endpoint,
    data: { username: 'tester', password: '574e112a', answer: answer },
    headers: { "Content-Type": "multipart/form-data" },
}).then(({data}: AxiosResponse) => {
    console.log(data);
})