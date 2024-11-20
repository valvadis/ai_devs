import { Poligon } from "../../service/poligon.js";
import { Chat } from "../../service/chat.js";
import { FileAnalyzer } from "../../service/strategy.js";
import { Config } from "../../service/config.js";
import fs from "fs";

const chat = new Chat();
const fileAnalyzer = new FileAnalyzer();

const pathToWeapons = Config.getDirname() + "/../../data/weapons/";
const question: string = 'W raporcie, z którego dnia znajduje się wzmianka o kradzieży prototypu broni?';

const questionVector: number[] = await chat.vector(question);

let responseDate: string = '';
let responseSimilarity: number = 0;

for (const weaponFile of fs.readdirSync(pathToWeapons)) {
    const weaponContent: string = await fileAnalyzer.read(pathToWeapons, weaponFile);
    const similarity = cosineSimilarity(questionVector, await chat.vector(weaponContent));

    if (similarity > responseSimilarity) {
        responseSimilarity = similarity;
        responseDate = weaponFile.replaceAll('_', '-').replace('.txt', '');
    }

    console.log(responseDate);
}

(new Poligon()).sendReport('wektory', responseDate);

function cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}
