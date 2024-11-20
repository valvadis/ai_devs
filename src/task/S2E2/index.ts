import fs from "fs";
import { Buffer } from "buffer";
import { Chat } from "../../service/chat.js";
import { findLocationOnMap } from "./prompt.js";
import {Config} from "../../service/config.js";

const chat = new Chat();

const result: string = await chat.send([
    { role: "user", content: [
        { "type": "image_url", "image_url": { "url": "data:image/jpeg;base64," +  base64_encode('first.png')} },
        { "type": "image_url", "image_url": { "url": "data:image/jpeg;base64," +  base64_encode('second.png')} },
        // { "type": "image_url", "image_url": { "url": "data:image/jpeg;base64," +  base64_encode('third.png')} },
        { "type": "image_url", "image_url": { "url": "data:image/jpeg;base64," +  base64_encode('fourth.png')} },
    ]},
    { role: "user", content: findLocationOnMap },
]);

console.log(result);

function base64_encode(file: string): string {
    const pathToMaps = Config.getDirname() + "/../../data/maps/"
    const bitmap: Buffer = fs.readFileSync(pathToMaps + file);

    return bitmap.toString('base64');
}