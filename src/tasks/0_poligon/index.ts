import axios, {AxiosResponse} from 'axios';
import {readFileSync} from 'node:fs';
import {Message} from './model.js';

const config: {[index: string]: string} = JSON.parse(readFileSync('./config/config.json', 'utf-8'));
const source: string = 'https://poligon.aidevs.pl/dane.txt';
const destination: string = 'https://poligon.aidevs.pl/verify';

const result: string[] = await axios.get(source)
    .then((response: AxiosResponse) => {
        return response.data.trim().split('\n')
    })

const message = new Message(
    'POLIGON',
    config['auth_token'],
    result
)

axios.post(destination, message)
  .then((response: AxiosResponse) => {
      console.log('Response:', response.data);
  })
  .catch((error: string) => {
    console.error('Error:', error);
  });