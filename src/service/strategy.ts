import OpenAI from "openai";
import fs, {ReadStream} from "fs";
import {Transcription} from "openai/src/resources/audio/transcriptions";
import {Buffer} from "buffer";
import {ChatCompletion} from "openai/src/resources/chat/completions";
import {Config} from "./config.js";

interface FormatStrategy {
    read(path: string): Promise<string>;
}

class TextFormat implements FormatStrategy {
    public async read(path: string): Promise<string> {

        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

class ImageFormat implements FormatStrategy {
    public async read(path: string): Promise<string> {
        const completion: ChatCompletion = await (new OpenAI()).chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "user", content: [
                        { "type": "image_url", "image_url": { "url": "data:image/png;base64," +  base64_encode(path)} },
                    ]},
                { role: "user", content: "Describe exactly this picture" },
            ],
        })

        if (completion.choices[0].message.content === undefined || completion.choices[0].message.content === null) {
            throw new Error("No content in the response");
        }

        return completion.choices[0].message.content;
    }
}

class AudioFormat implements FormatStrategy {
    public async read(path: string): Promise<string> {
        const audioFile: ReadStream = fs.createReadStream(path)
        const transcription: Transcription = await (new OpenAI()).audio.transcriptions.create({
            model: "whisper-1",
            file: audioFile
        })

        return transcription.text;
    }
}

export class FileAnalyzer {
    private strategies = new Map<string, FormatStrategy>();

    private pathToCache = Config.getDirname() + "/../../data/cache/";

    constructor() {
        this.strategies.set("txt", new TextFormat());
        this.strategies.set("png", new ImageFormat());
        this.strategies.set("mp3", new AudioFormat());
    }

    public async read(path: string, filename: string): Promise<string> {
        const cachedRecord = this.pathToCache + filename.substring(0, filename.lastIndexOf(".")) + ".txt";

        if (fs.existsSync(cachedRecord)) {
            return fs.readFileSync(cachedRecord, 'utf8');
        }

        const fileExtension = filename.split(".").pop();

        if (fileExtension === undefined) {
            throw new Error("Path not lead to proper file (no extension)");
        }

        const strategy = this.strategies.get(fileExtension);

        if (strategy === undefined) {
            throw new Error("No strategy for the file format");
        }

        const content: string = await strategy.read(path + filename);

        fs.writeFileSync(cachedRecord, content);

        return content;
    }
}

function base64_encode(path: string): string {
    const bitmap: Buffer = fs.readFileSync(path);

    return bitmap.toString('base64');
}