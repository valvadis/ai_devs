import { Poligon } from "../../service/poligon.js";
import { Chat } from "../../service/chat.js";
import { FileAnalyzer } from "../../service/strategy.js";
import { Config } from "../../service/config.js";
import { answerQuestions } from "./prompt.js";
import axios, {AxiosError, AxiosResponse} from "axios";
import fs from "fs";
import path from 'path';

const chat = new Chat();
const fileAnalyzer = new FileAnalyzer();

const domain: string = Config.get('centrala');
const apikey: string = Config.get('auth_token');
const pathToArticle = Config.getDirname() + "/../../data/article/";

let article: string = await axios.get(domain + '/dane/arxiv-draft.html')
    .then(({ data }: AxiosResponse) => {
        return data;
    });

const extractedFiles: string[] = extractFilesFromHtml(article);

for (const file of extractedFiles) {
    await axios({
        url: Config.get('centrala') + '/dane/' + file,
        method: 'GET',
        responseType: 'arraybuffer',
    })
    .then((response) => {
        fs.writeFileSync(pathToArticle + path.basename(file), response.data);
    })
    .catch((error: AxiosError) => {
        console.error('Error:', error.message);
    });

    const text = await fileAnalyzer.read(pathToArticle, path.basename(file));

    if (text) {
        article = article.replace(file, text);
    }
}

const questions: string = await axios.get(domain + '/data/' + apikey + '/arxiv.txt')
    .then(({ data }: AxiosResponse) => {
        return data;
    });

const result: string = await chat.send([
    { role: "system", content: article },
    { role: "user", content: answerQuestions(questions) }
]);

(new Poligon()).sendReport('arxiv', JSON.parse(<string>Poligon.extractDataFromTags(result)));

function extractFilesFromHtml(html: string): string[] {
    const pngRegex = /<img[^>]+src="([^">]+\.png)"/g;
    const mp3Regex = /<source[^>]+src="([^">]+\.mp3)"/g;

    const files: string[] = [];

    let match: RegExpExecArray | null;

    while ((match = pngRegex.exec(html)) !== null) {
        files.push(match[1]);
    }

    while ((match = mp3Regex.exec(html)) !== null) {
        files.push(match[1]);
    }

    return files;
}
