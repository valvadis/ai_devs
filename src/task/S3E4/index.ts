import { Poligon } from "../../service/poligon.js";
import { Config } from "../../service/config.js";
import { Chat } from "../../service/chat.js";
import { Query } from "../../service/model.js";
import { getQuery } from "./prompt.js";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ChatCompletionMessageParam } from "openai/src/resources/chat/completions";

const chat: Chat = new Chat();
const peopleEndpoint = Config.get('centrala') + '/people';
const placesEndpoint = Config.get('centrala') + '/places';

const queries: ChatCompletionMessageParam[] = [{
    role: "system",
    content: getQuery
}];

let place: string|null = "WARSZAWA";
let person: string|null = "BARBARA";

for (let i = 0; i < 40; i++) {
    console.log('-----------------------');
    console.log(queries);

    if (place) {
        const query: ChatCompletionMessageParam = {
            role: "user",
            content: "Wyniki zapytania o miasto " + place + " : "
                + await request(placesEndpoint, normalizeOutput(place))
        };
        console.log('MIASTO: ' + place);
        queries.push(query);
    }

    if (person) {
        const query: ChatCompletionMessageParam = {
            role: "user",
            content: "Wyniki zapytania o osobę " + person + " : "
                + await request(peopleEndpoint, normalizeOutput(person))
        };
        console.log('OSOBA: ' + person);
        queries.push(query);
    }

    const response: string = await chat.send(queries);

    place = Poligon.extractDataFromTags(response, 'PLACES');
    person = Poligon.extractDataFromTags(response, 'PEOPLE');

    const result: string|null = Poligon.extractDataFromTags(response);
    if (result) {
        const resultResponse: string = await (new Poligon()).sendReport('loop', normalizeOutput(result));

        const query: ChatCompletionMessageParam = {
            role: "user",
            content: resultResponse
        };
        queries.push(query);
    }
}
console.log('#######################');

function normalizeOutput(response: string): string {
    return response
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[Ł]/g, "L")
        .replace(/[Ą]/g, "A")
        .replace(/[Ś]/g, "S")
        .replace(/[ŻŹ]/g, "Z")
        .replace(/[Ó]/g, "O")
        .replace(/[Ć]/g, "C")
        .replace(/[Ę]/g, "E")
        .replace(/[Ń]/g, "N")
        .trim();
}

async function request(endpoint: string, query: string): Promise<string|null> {
    return axios.post(endpoint, new Query(Config.get('auth_token'), query))
        .then(({ data: { message } }: AxiosResponse) => {
            return message;
        })
        .catch((error: AxiosError) => {
            return error.response?.data;
        });
}
