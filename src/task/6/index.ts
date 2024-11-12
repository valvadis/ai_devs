import fs, {ReadStream} from "fs";
import { Chat } from "../../service/chat.js";
import { Config } from "../../service/config.js";
import { Transcription } from "openai/src/resources/audio/transcriptions";
import { streetNameSearch } from "../6/prompt.js";
import {Poligon} from "../../service/poligon.js";

const chat = new Chat();
const pathToCache = Config.getDirname() + "/../../data/cache/"
const pathToRecordings = Config.getDirname() + "/../../data/recordings/"

const recordings = fs.readdirSync(pathToRecordings);
const recordingTranscriptions: string[] = [];
for (const record of recordings) {
    const cachedRecord = pathToCache + record.substring(0, record.lastIndexOf(".")) + ".txt";

    if (!fs.existsSync(cachedRecord)) {
        const audioFile : ReadStream = fs.createReadStream(pathToRecordings + record)
        const transcription: Transcription = await chat.getOpenai().audio.transcriptions.create({
            model: "whisper-1",
            file: audioFile
        })

        fs.writeFileSync(cachedRecord, transcription.text);
    }

    recordingTranscriptions.push(removeExtension(record) + ': ' + fs.readFileSync(cachedRecord, 'utf8'));
}

const result: string = await chat.send([
    { role: "user", content: streetNameSearch(recordingTranscriptions.join('\r\n')) }
]);

console.log(result);
console.log(extractDataFromTags(result));

(new Poligon()).sendReport('MP3', extractDataFromTags(result));

function extractDataFromTags(input: string): string | null {
    const regex = /<RESULT>(.*?)<\/RESULT>/;
    const match = input.match(regex);
    return match ? match[1] : null;
}

function removeExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return fileName;
    return fileName.substring(0, lastDotIndex);
}