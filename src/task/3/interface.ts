export interface entry {
    question: string;
    answer: number;
    test?: {q: string, a: string};
}

export interface file {
    apikey: string;
    description: string;
    copyright: string;
    'test-data': entry[];
}
