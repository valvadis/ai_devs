import axios, { AxiosError, AxiosResponse } from 'axios';
import { Chat } from "../../service/chat.js";
import { Message } from '../../service/model.js';
import { answerPrompt } from "./prompt.js";
import { Config } from "../../service/config.js";

const chat = new Chat();
const destination: string = Config.get('xyz') + '/verify ';
const regex = /\{\{FLG:.*?}}/;

let message: Message = new Message(0, 'READY');
for (let i = 0; i < 5; i++) {
    message = await axios.post(destination, message)
        .then(({ data: { msgID, text }}: AxiosResponse) => {
            return new Message(msgID, text)
        })
        .catch((error: AxiosError) => {
            return new Message(-1, error.message)
        });

    if (regex.test(message.text)) {
        console.log(message);
        break;
    }

    message.text = await chat.send([
        {role: "system", content: answerPrompt},
        {role: "user", content: message.text}
    ]);
}
