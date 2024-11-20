import { Poligon } from "../../service/poligon.js";
import { Config } from "../../service/config.js";
import axios, { AxiosResponse } from "axios";
import { Chat } from "../../service/chat.js";
import { prepareQuery } from "./prompt.js";

const chat = new Chat();
const database = Config.get('centrala') + "/apidb";

class Request {
    public task: string = 'database'
    public apikey: string = Config.get('auth_token')
    public query: string

    constructor(query: any) {
        this.query = query
    }
}

const tables: string[] = [];
await axios.post(database, new Request('show tables'))
    .then(({ data: { reply } }: AxiosResponse) => {
        for (const value of reply) {
            tables.push(value['Tables_in_banan']);
        }
    })
    .catch((error: string) => {
        console.error('Error:', error);
    });

const descriptions: string[] = [];
for (const table of tables) {
    descriptions.push(
        await axios.post(database, new Request('show create table ' + table))
            .then(({ data: { reply } }: AxiosResponse) => {
                    return reply[0]['Create Table'];
            })
            .catch((error: string) => {
                console.error('Error:', error);
            })
    );
}

const query: string = await chat.send([
    { role: "user", content: prepareQuery(descriptions) }
]);

axios.post(database, new Request(query))
    .then(({ data: { reply } }: AxiosResponse) => {
        const result: string[] = [];
        for (const value of reply) {
            result.push(value.dc_id);
        }

        (new Poligon()).sendReport('database', result);
    })
    .catch((error: string) => {
        console.error('Error:', error);
    });
