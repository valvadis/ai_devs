export const answerQuestions = (questions: string) => `
    ${questions}

    <rules>
        - Udzielaj bardzo precyzyjnej odpowiedzi, czasami będziesz musiał przeanalizować zamieszczone zdjęcia i nagrania.
        - Każda odpowiedź na czątkowe pytanie MUSI być jednym zdaniem umieszczonym w odpowiednim miejscu.
        - Odpowiedź na pytania musi być w formacie JSON ze strukturą taką jak w sekcji <result></result> 
            z kluczem jako identyfikatorem pytania i wartością jako jednozdaniową odpowiedzią.
        - Przygotowany JSON musi być otoczony w tagach <RESULT></RESULT>
    </rules>
    
    <result>
    {
        "01": "Krótka odpowiedź w 1 zdaniu",
        "02": "Krótka odpowiedź w 1 zdaniu",
        "03": "Krótka odpowiedź w 1 zdaniu",
        "NN": "Krótka odpowiedź w 1 zdaniu"
    }
    </result>
    
    <objective>
        Na podstawie informacji zawartych w artykule odpowiedz na załączone pytania.
        Odpowiedź przygotuj według przesłanych wytycznych.
    </objective>
`;