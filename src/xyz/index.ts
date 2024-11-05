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

const answer: string|null = captchaCompletion.choices[0].message.content;

console.log(question, answer);