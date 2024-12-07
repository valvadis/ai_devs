import express, { Request, Response } from 'express';
import { findLocalisation } from "./prompt.js";
import { Poligon } from "../../service/poligon.js";
import { Chat } from "../../service/chat.js";

const app = express();
const port = 3002;
const chat = new Chat();

app.use(express.json());

app.post('/', async (req: Request, res: Response) => {
    console.log(req.body);

    const data: { instruction: string } = req.body;
    const response: string = await chat.send([
        {
            role: "system",
            content: findLocalisation
        },
        { role: "user", content: data.instruction },
    ])

    console.log(response);
    res.send({description: Poligon.extractDataFromTags(response)});
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// ssh -R 51529:localhost:3002 agent11529@azyl.ag3nts.org -p 5022