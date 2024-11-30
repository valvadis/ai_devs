import { Poligon } from "../../service/poligon.js";
import { getPhotos, fixPhotos, prepareDescription } from "./prompt.js";
import { Chat } from "../../service/chat.js";
import { Config } from "../../service/config.js";

const chat = new Chat();

// FETCH PHOTOS
const startResponse: string = await (new Poligon()).sendReport('photos', 'START');

const photosResponse: string = Poligon.extractDataFromTags(await chat.send([
    { role: "system", content: getPhotos },
    { role: "user", content: startResponse },
])) ?? 'ERR';

const photos: string[] = JSON.parse(photosResponse);

// FIX PHOTOS
const urlToPhoto = Config.get('centrala') + "/dane/barbara/";
const descriptions: string[] = [];

for (const photo of photos) {
    const result: string = await chat.send([
        { role: "system", content: fixPhotos},
        { role: "user", content: [
            { "type": "image_url", "image_url": { "url": urlToPhoto + photo} },
        ]},
    ]);

    if (['REPAIR', 'DARKEN', 'BRIGHTEN'].includes(result)) {
        const response: string = await (new Poligon()).sendReport('photos', result + ' ' + photo);

        const newPhoto: string|null = Poligon.extractDataFromTags(await chat.send([
            { role: "system", content: getPhotos },
            { role: "user", content: response },
        ]));

        if (newPhoto) {
            photos.push(JSON.parse(newPhoto)[0]);
        }
    } else {
        const description: string = await chat.send([
            { role: "system", content: "Opisz osobą, którą widzisz na zdjęciu."},
            { role: "user", content: [
                { "type": "image_url", "image_url": { "url": urlToPhoto + photo} },
            ]},
        ]);

        descriptions.push(description);
    }
}

// MAKE DESCRIPTION
const result: string = await chat.send([
    { role: "system", content: prepareDescription},
    { role: "user", content: descriptions.join('\r\n') },
]);

console.log(result);

// SEND REPORT
await (new Poligon()).sendReport('photos', result);