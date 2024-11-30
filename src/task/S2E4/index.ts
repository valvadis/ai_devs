import fs from "fs";
import { Config } from "../../service/config.js";
import { Chat } from "../../service/chat.js";
import { FileAnalyzer } from "../../service/strategy.js";
import { Poligon } from "../../service/poligon.js";
import { categorizeFile } from "./prompt.js";

const chat = new Chat();
const pathToFiles = Config.getDirname() + "/../../data/factory/";

const fileAnalyzer = new FileAnalyzer();
const sourceData: {people: string[], hardware: string[]} = {
    people: [],
    hardware: []
};

for (const file of fs.readdirSync(pathToFiles)) {
    const text = await fileAnalyzer.read(pathToFiles, file);

    const result: string = await chat.send([
        { role: "system", content: categorizeFile },
        { role: "user", content: text }
    ]);

    if (result.toUpperCase() === 'PEOPLE') {
        sourceData.people.push(file);
    } else if (result.toUpperCase() === 'HARDWARE') {
        sourceData.hardware.push(file);
    }
}

(new Poligon()).sendReport('kategorie', sourceData);
