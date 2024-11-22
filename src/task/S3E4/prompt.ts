export const getQuery = `      
    Masz do dyspozycji dwa systemy, które pomogą Ci w ustaleniu miejsca pobytu Barbary Zawadzkiej:

    1. Wyszukiwarka osób, gdzie możesz wprowadzić imię osoby lub pseudonim (np. AZAZEL), 
        a system zwróci listę miejsc, w których dana osoba była widziana.
    2. Wyszukiwarka miejsc, gdzie możesz wprowadzić nazwę miasta,
        na system zwróci listę osób, które były widziane w tym mieście.
   
    <rules>
        - ZAWSZE, kiedy chcesz zapytać o jakieś miejsce lub osobę umieść jej nazwę w odpowiednim tagu.
        - NIGDY nie używaj kilku słów w jednym tagu, w tagu ZAWSZE musi być tylko jedno słowo.
        - ZAWSZE nazwa musi być napisana w mianowniku.
        - Preferuj wybieranie nowych miast i osób, jeśli to możliwe.
        - Jeśli chcesz zapytać o osobę umieść jej imię lub pseudonim w tagach <PEOPLE></PEOPLE>.
        - Jeśli chcesz zapytać o miasto umieść jego nazwę w tagach <PLACES></PLACES>.
        - Jeśli znajdziesz miasto, w którym przebywa Barbara Zawadzka umieść jego nazwę w tagach <RESULT></RESULT>.
    </rules>
    
    <information>
        Podczas pobytu w Krakowie w 2019 roku, Barbara Zawadzka poznała swojego ówczesnego narzeczonego, a obecnie męża, Aleksandra Ragowskiego. Tam też poznali osobę prawdopodobnie powiązaną z ruchem oporu, której dane nie są nam znane. Istnieje podejrzenie, że już wtedy pracowali oni nad planami ograniczenia rozwoju sztucznej inteligencji, tłumacząc to względami bezpieczeństwa. Tajemniczy osobnik zajmował się także organizacją spotkań mających na celu podnoszenie wiedzy na temat wykorzystania sztucznej inteligencji przez programistów. Na spotkania te uczęszczała także Barbara.
        
        W okolicach 2021 roku Rogowski udał się do Warszawy celem spotkania z profesorem Andrzejem Majem. Prawdopodobnie nie zabrał ze sobą żony, a cel ich spotkania nie jest do końca jasny.
        
        Podczas pobytu w Warszawie, w instytucie profesora doszło do incydentu, w wyniku którego, jeden z laborantów - Rafał Bomba - zaginął. Niepotwierdzone źródła informacji podają jednak, że Rafał spędził około 2 lata, wynajmując pokój w pewnym hotelu. Dlaczego zniknął?  Przed kim się ukrywał? Z kim kontaktował się przez ten czas i dlaczego ujawnił się po tym czasie? Na te pytania nie znamy odpowiedzi, ale agenci starają się uzupełnić brakujące informacje.
        
        Istnieje podejrzenie, że Rafał mógł być powiązany z ruchem oporu. Prawdopodobnie przekazał on notatki profesora Maja w ręce Ragowskiego, a ten po powrocie do Krakowa mógł przekazać je swojej żonie. Z tego powodu uwaga naszej jednostki skupia się na odnalezieniu Barbary.
        
        Aktualne miejsce pobytu Barbary Zawadzkiej nie jest znane. Przypuszczamy jednak, że nie opuściła ona kraju.
    </information>
    
    <objective>
        Na podstawie dostępnych informacji i wcześniejszych wyników wyszukiwania znajdź miasto, w którym aktualnie 
        przebywa BARBARY. Opisuj swój proces rozumowania. Nie skupiaj się na domysłach. Jeżeli nie jesteś pewien 
        odpowiedzi poproś o uzyskanie informacji o kolejnej osobie lub mieście.
    </objective>
`;

