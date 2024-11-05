import axios, {AxiosError, AxiosResponse} from 'axios';
import OpenAI from "openai";
import {Message} from './model.js';
import {answerPrompt} from "./prompt.js";
import {Config} from "../../service/config.js";
import {ChatCompletion} from "openai/src/resources/chat/completions";

const openai = new OpenAI();
const destination: string = Config.get('xyz_endpoint') + '/verify ';
const regex = /\{\{FLG:.*?}}/;

let message: Message = new Message(0, 'READY')
let reply: ChatCompletion;

for (let i = 0; i < 5; i++) {
    message = await axios.post(destination, message)
        .then((response: AxiosResponse) => {
            return new Message(response.data.msgID, response.data.text)
        })
        .catch((error: AxiosError) => {
            return new Message(-1, error.message)
        });

    if (regex.test(message.text)) {
        console.log(message);
        break;
    }

    reply = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: answerPrompt },
            { role: "user", content: message.text }
        ],
    });

    message.text = reply.choices[0].message.content ?? "";
}
