import { Config } from "../../service/config.js";
import { FileAnalyzer } from "./strategy.js";
import { Poligon } from "../../service/poligon.js";
import { Chat } from "../../service/chat.js";
import fs from "fs";
import { categorizeFile } from "../9/prompt.js";

const chat = new Chat();
const pathToCache = Config.getDirname() + "/../../data/cache/";
const pathToFiles = Config.getDirname() + "/../../data/factory/";

const fileAnalyzer = new FileAnalyzer();
const sourceData: {people: string[], hardware: string[]} = {
    people: [],
    hardware: []
};

for (const file of fs.readdirSync(pathToFiles)) {
    const cachedRecord = pathToCache + file.substring(0, file.lastIndexOf(".")) + ".txt";

    if (!fs.existsSync(cachedRecord)) {
        const content = await fileAnalyzer.read(pathToFiles + file);

        fs.writeFileSync(cachedRecord, content);
    }

    const text: string = fs.readFileSync(cachedRecord, 'utf8');
    const result: string = await chat.send([
        { role: "system", content: categorizeFile(text) }
    ]);

    if (result.toUpperCase() === 'PEOPLE') {
        sourceData.people.push(file);
    } else if (result.toUpperCase() === 'HARDWARE') {
        sourceData.hardware.push(file);
    }
}

console.log(sourceData);
(new Poligon()).sendReport('kategorie', sourceData);
