import { Poligon } from "../../service/poligon.js";
import { Chat } from "../../service/chat.js";
import { FileAnalyzer } from "../../service/strategy.js";
import { Config } from "../../service/config.js";
import { prepareKeywords } from "./prompt.js";
import fs from "fs";

const chat = new Chat();
const fileAnalyzer = new FileAnalyzer();

const pathToReports = Config.getDirname() + "/../../data/reports/";

const keywords: Map<string, string> = new Map<string, string>();
for (const file of fs.readdirSync(pathToReports)) {
    const article: string = await fileAnalyzer.read(pathToReports, file);

    const result: string = await chat.send([
        { role: "user", content: prepareKeywords(file, article) }
    ]);

    keywords.set(file, Poligon.extractDataFromTags(result) as string);
}

console.log(Object.fromEntries(keywords));

(new Poligon()).sendReport('dokumenty', Object.fromEntries(keywords));
