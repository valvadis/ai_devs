import axios, { AxiosResponse } from "axios";
import OpenAI from "openai";
import { Config } from "../../service/config.js";
import { generateImage } from "./prompt.js";
import { Poligon } from "../../service/poligon.js";

const domain: string = Config.get('centrala');
const apikey: string = Config.get('auth_token');
const source = domain + '/data/' + apikey + '/robotid.json';

const recording: string = await axios.get(source)
    .then(({ data: { description } }: AxiosResponse) => {
        return description;
    })

console.log(recording);

const response = await (new OpenAI()).images.generate({
    model: "dall-e-3",
    prompt: generateImage(recording),
    n: 1,
    size: "1024x1024",
});

if (response.data[0].url === undefined) {
    throw new Error("No image URL in the response");
}

const imageUrl: string = response.data[0].url;
console.log(imageUrl);

(new Poligon()).sendReport('robotid', imageUrl);
