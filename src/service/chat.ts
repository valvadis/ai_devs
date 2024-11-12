import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/src/resources/chat/completions";

export class Chat {
    protected openai = new OpenAI();

    public async send(messages: ChatCompletionMessageParam[]): Promise<string> {
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
        });

        if (completion.choices[0].message.content === undefined || completion.choices[0].message.content === null) {
            throw new Error("No content in the response");
        }

        return completion.choices[0].message.content;
    }

    public getOpenai(): OpenAI {
        return this.openai;
    }
}

