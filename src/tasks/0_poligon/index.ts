import axios, {AxiosResponse} from 'axios';
import {Message} from './model.js';
import {Config} from '../../service/config.js';

const source: string = Config.get('poligon_endpoint') + '/dane.txt';
const destination: string = Config.get('poligon_endpoint') + '/verify';

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
  .then((response: AxiosResponse) => {
      console.log('Response:', response.data);
  })
  .catch((error: string) => {
    console.error('Error:', error);
  });