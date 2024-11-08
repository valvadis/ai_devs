import axios, { AxiosResponse } from 'axios';
import { Message } from '../../model/poligon.js';
import { Config } from '../../service/config.js';

const source: string = Config.get('poligon') + '/dane.txt';
const destination: string = Config.get('poligon') + '/verify';

const result: string[] = await axios.get(source)
    .then((response: AxiosResponse) => {
        return response.data.trim().split('\n')
    })

const message = new Message(
    'POLIGON',
    Config.get('auth_token'),
    result
)

axios.post(destination, message)
  .then(({data}: AxiosResponse) => {
      console.log('Response:', data);
  })
  .catch((error: string) => {
    console.error('Error:', error);
  });