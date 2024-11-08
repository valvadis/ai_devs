import axios, { AxiosResponse } from 'axios';
import OpenAI from "openai";
import { Config } from "../../service/config.js";
import { solveTheTest } from "./prompt.js";
import { entry, file } from "./interface.js";
import { Message } from '../../model/poligon.js';

const openai = new OpenAI();
const domain: string = Config.get('centrala');
const apikey: string = Config.get('auth_token');
const source = domain + '/data/' + apikey + '/json.txt';

const file: file = await axios.get(source)
    .then(({ data }: AxiosResponse) => {
        return data;
    })

file.apikey = apikey;

const correctedFile: entry[] = [];

for (const chunk of file['test-data']) {
    const correctEntry: entry = {
        question: chunk.question,
        answer: eval(chunk.question)
    };

    if (chunk.test !== undefined) {
        const testCompletion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: solveTheTest },
                {
                    role: "user",
                    content: JSON.stringify(chunk.test.q)
                },
            ],
        });

        if (testCompletion.choices[0].message.content === undefined || testCompletion.choices[0].message.content === null) {
            throw new Error("No content in the response");
        }

        correctEntry.test = {
            q: chunk.test.q,
            a: testCompletion.choices[0].message.content,
        }
    }

    correctedFile.push(correctEntry);
}
file['test-data'] = correctedFile;

const message = new Message(
    'JSON',
    Config.get('auth_token'),
    file
)

axios.post(Config.getReportUrl(), message)
    .then(({data}: AxiosResponse) => {
        console.log('Response:', data);
    })
    .catch((error: string) => {
        console.error('Error:', error);
    });


