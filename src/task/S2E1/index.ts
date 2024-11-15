import fs from "fs";
import { Config } from "../../service/config.js";
import { Chat } from "../../service/chat.js";
import { FileAnalyzer } from "../../service/strategy.js";
import { Poligon } from "../../service/poligon.js";
import { streetNameSearch } from "../6/prompt.js";

const chat = new Chat();
const fileAnalyzer = new FileAnalyzer();
const pathToRecordings = Config.getDirname() + "/../../data/recordings/"

const recordings: string[] = fs.readdirSync(pathToRecordings);
const recordingTranscriptions: string[] = [];
for (const record of recordings) {
    recordingTranscriptions.push(removeExtension(record) + ': ' + fileAnalyzer.read(pathToRecordings, record));
}

const result: string = await chat.send([
    { role: "user", content: streetNameSearch(recordingTranscriptions.join('\r\n')) }
]);

console.log(result);
console.log(Poligon.extractDataFromTags(result));

(new Poligon()).sendReport('MP3', Poligon.extractDataFromTags(result));

function removeExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return fileName;
    return fileName.substring(0, lastDotIndex);
}