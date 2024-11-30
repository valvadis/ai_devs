import OpenAI from "openai";
import fs from "fs";
import { Config } from "../../service/config.js";
import {Poligon} from "../../service/poligon.js";

const openai = new OpenAI();
const pathToResearch: string = Config.getDirname() + "/../../data/research/";
const tasks: string[] = [];

const tests: Buffer = fs.readFileSync(pathToResearch + 'verify.txt');
for (const test of tests.toString().split('\n')) {
    const [task, data] = test.split('=');

    const completion = await openai.chat.completions.create({
        model: "ft:gpt-4o-mini-2024-07-18:personal:task:AYwIMUR7",
        messages: [
            { role: "system", content: 'Decide whether the data is correct or incorrect' },
            { role: "user", content: data },
        ],
    });

    if (completion.choices[0].message.content === undefined || completion.choices[0].message.content === null) {
        throw new Error("No content in the response");
    }

    const response: string = completion.choices[0].message.content;

    if (response == 'correct') {
        tasks.push(task);
    }
}

(new Poligon()).sendReport('research', tasks);