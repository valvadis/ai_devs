import { Chat } from "../../service/chat.js";
import axios, { AxiosResponse } from 'axios';
import { askAboutQuestion, proveYouAreNotHuman } from "./prompt.js";
import { Config } from '../../service/config.js';

const chat = new Chat();
const endpoint = Config.get('xyz');

const question: string = await axios.get(endpoint)
    .then(({data}: AxiosResponse) => {
        return chat.send([
            { role: "system", content: askAboutQuestion },
            { role: "user", content: data }
        ]);
    });

const answer: number = Number(chat.send([
    { role: "system", content: proveYouAreNotHuman },
    {
        role: "user",
        content: question,
    },
]));

axios({
    method: "post",
    url: endpoint,
    data: { username: 'tester', password: '574e112a', answer: answer },
    headers: { "Content-Type": "multipart/form-data" },
}).then(({data}: AxiosResponse) => {
    console.log(data);
})