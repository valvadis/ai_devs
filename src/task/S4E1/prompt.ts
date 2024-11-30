export const getPhotos = `      
    Z przesłanego opisu wyciągnij proszę nazwy zdjęć i wyślij je jako lista nazw oddzielona przecinkami (tablica)
    w formacie json. Odpowiedź umieść w tagach <RESULT></RESULT> i niech nie zawiera żadnego dodatkowego tekstu.
`;

export const fixPhotos = `      
    Otrzymasz zdjęcie, które powinno przedstawiać rysopis osoby, sprawdź proszę czy jest ono czytelne,
    jeśli nie jest to spróbuj je naprawić.
    
    <rules>
        Jeśli zdjęcie zawiera szumy lub glitche wyślij komendę REPAIR
        Jeśli zdjęcie jest za ciemne wyślij komendę BRIGHTEN
        Jeśli zdjęcie jest za jasne wyślij komendę DARKEN
        Jeśli zdjęcie jest w porządku wyślij komendę OK
        
        Wysyłaj dokładnie jedną komendą bez żadnego dodatkowego tekstu.
    </rules>
`;

export const prepareDescription = `      
    Dostaniesz teraz kilka opisów, niekoniecznie wszystkie z nich przedstawiają Barbarę i nie wszystkie z nich 
    zawierają istotne dla nas szczegóły.
    
    <goal>
        Twoim zadaniem jest stworzenie rysopisu Barbary na podstawie przesłanych opisów.
    </goal>
`;

