import OpenAI from "openai";
import {ChatCompletion, ChatCompletionMessageParam} from "openai/src/resources/chat/completions";
import {CreateEmbeddingResponse} from "openai/src/resources/embeddings";

export class Chat {
    protected openai = new OpenAI();

    public async send(messages: ChatCompletionMessageParam[]): Promise<string> {
        const completion: ChatCompletion = await this.openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
        });

        if (completion.choices[0].message.content === undefined || completion.choices[0].message.content === null) {
            throw new Error("No content in the response");
        }

        return completion.choices[0].message.content;
    }

    public async vector(message: string): Promise<number[]> {
        const embedding: CreateEmbeddingResponse = await this.openai.embeddings.create({
            model: "text-embedding-3-small",
            input: message,
            encoding_format: "float",
        });

        return embedding.data[0].embedding;
    }
}

