import axios, { AxiosError, AxiosResponse } from 'axios';
import { Config } from "../../service/config.js";
import { Chat } from "../../service/chat.js";
import { Poligon } from "../../service/poligon.js";
import { solveTheTest } from "./prompt.js";
import { entry, file } from "./interface.js";

const chat = new Chat();
const domain: string = Config.get('centrala');
const apikey: string = Config.get('auth_token');
const source = domain + '/data/' + apikey + '/json.txt';

const file: file = await axios.get(source)
    .then(({ data }: AxiosResponse) => {
        return data;
    })
    .catch((error: AxiosError) => {
        console.error('Error:', error.message);
    });

file.apikey = apikey;

const correctedFile: entry[] = [];

for (const chunk of file['test-data']) {
    const correctEntry: entry = {
        question: chunk.question,
        answer: eval(chunk.question)
    };

    if (chunk.test !== undefined) {
        const result = await chat.send([
            { role: "system", content: solveTheTest },
            {
                role: "user",
                content: JSON.stringify(chunk.test.q)
            },
        ])

        correctEntry.test = {
            q: chunk.test.q,
            a: result,
        }
    }

    correctedFile.push(correctEntry);
}
file['test-data'] = correctedFile;

(new Poligon()).sendReport('JSON', file);
