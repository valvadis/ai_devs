export const prepareKeywords = (name: string, content: string) => `   
    Nazwa dokumentu: ${name}
    
    Zawartość dokumentu: ${content}
    
    <information>
        **Aleksander Ragowski:** nauczyciel, język angielski, kreatywność, społeczność, krytyka, rząd robotów, aresztowanie, ucieczka, programowanie, Java, opozycja.
        
        **Barbara Zawadzka:** frontend, developement, IT, automatyzacja, trauma, ruch oporu, umiejętności, JavaScript, Python, sztuczna inteligencja, edukacja, krav maga, broń palna, koktajle Mołotowa, związek, pizza, spokojność, sabotaż.
        
        **Azazel:** tajemnica, podróż w czasie, technologia, przyszłość, systemy operacyjne, teleportacja, Zygfryd, władza, eksperymenty, znikanie, ruch oporu.
        
        **Rafał Bomba:** laborant, badania, sztuczna inteligencja, nanotechnologia, zaufanie, tajne eksperymenty, zaginięcie, fałszywe nazwisko, zdrowie psychiczne, eksperymenty, manipulacja umysłowa.
        
        **Adam Gospodarczyk:** programowanie, rekrutacja, ruch oporu, technologia, Azazel, hackowanie, agent, szkolenie, bypassing, sabotaż, wpływy, tajemnica.
    </information>
    
    <important>
        W nazwie pliku znajduje się nazwa sektora, który zawsze powinien być dodany jako tag:
        
        "2024-11-12_report-01-sektor_A3.txt" sektorem jest A3 i wygeneruj tag "A3".
        "2024-11-12_report-01-sektor_C5.txt" sektorem jest C5 i wygeneruj tag "C5".
        "2024-11-12_report-01-sektor_D4.txt" sektorem jest D4 i wygeneruj tag "D4".
    </important>
    
    <rules>
        - Słowa kluczowe MUSZĄ być napisane w języku polskim i opisywać dany raport oraz powiązane z nim fakty.
        - Słowa kluczowe ZAWSZE muszą być pisane w mianowniku.
        - Słowa kluczowe ZAWSZE muszą być oddzielone od siebie przecinkiem.
        - ZAWSZE dołączaj słowa kluczowe danej osoby gdy wystąpi w raporcie.
        - Wygeneruj jak najwięcej słów kluczowych.
        - Listę słów kluczowych bez żadnego dodatkowego komentarza umieść w tagach <RESULT></RESULT>.
    </rules>
    
    <objective>
        Na podstawie przesłanego dokumentu, jego tytułu, faktów oraz informacji wygeneruj listę słów kluczowych zgodnie z zasadami.
    </objective>
`;