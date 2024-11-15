import axios, {AxiosResponse} from 'axios';
import { Chat } from "../../service/chat.js";
import { Poligon } from "../../service/poligon.js";
import { Config } from "../../service/config.js";
import { anonymizeData } from "./prompt.js";

const chat = new Chat();
const domain: string = Config.get('centrala');
const apikey: string = Config.get('auth_token');
const source = domain + '/data/' + apikey + '/cenzura.txt';

const text: string = await axios.get(source)
    .then(({ data }: AxiosResponse) => {
        return data;
    })

const anonymisedText = await chat.send([
    { role: "system", content: anonymizeData },
    {
        role: "user",
        content: text
    },
])

console.log("ORIGINAL: " + text);
console.log("RESPONSE: " + anonymisedText);

(new Poligon()).sendReport('CENZURA', anonymisedText);
