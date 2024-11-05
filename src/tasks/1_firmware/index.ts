import OpenAI from "openai";
import axios, {AxiosResponse} from 'axios';
import {askAboutQuestion, proveYouAreNotHuman} from "./prompt.js";

const openai = new OpenAI();

const webpageCompletion: any = await axios.get('https://xyz.ag3nts.org/')
    .then((response: AxiosResponse) => {
        return openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: askAboutQuestion },
                { role: "user", content: response.data }
            ],
        });
    });

const question: string = webpageCompletion.choices[0].message.content;

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
    url: 'https://xyz.ag3nts.org',
    data: { username: 'tester', password: '574e112a', answer: answer },
    headers: { "Content-Type": "multipart/form-data" },
}).then((response: AxiosResponse) => {
    console.log(response.data);
})