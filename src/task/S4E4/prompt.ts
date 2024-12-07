export const findLocalisation = `      
    Pomóż pilotowi drona zbadać teren i podpowiedz mu, co znajduje się pod nim, podczas gdy on 
    będzie latał po okolicy. Opis mapy znajduje się w sekcji <information>.
    
    <rules>
        - Wykonaj dokładnie polecenie z instrukcji.
        - Opisz krok po kroku, jak doszedłeś do odpowiedzi.
        - Odpowiedź składającą się z maksymalnie dwóch słów umieść w tagach <RESULT</RESULT>.
        - Posłuż się opisami pól zawartymi w sekcji <information>.
    </rules>

    <information>
        - Jesteś na mapie 4×4 o współrzędnych [x, y]:
            [1,4][2,4][3,4][4,4]
            [1,3][2,3][3,3][4,3]
            [1,2][2,2][3,2][4,2]
            [1,1][2,1][3,1][4,1]
        - ZAWSZE zaczynasz od pola [1,4]
        - Na polu [3,4] jest "jedno drzewo".
        - Na polu [4,4] jest "dom jednorodzinny".
        - Na polu [2,3] jest "wiatrak".
        - Na polu [4,2] są "dwa drzewa".
        - Na polach [1,1], [2,1] i [3,2] są "skały".
        - Na polu [3,1] jest "auto".
        - Na polu [4,1] jest "jaskinia".
        - Na pozostałych polach jest "łąka".
    </information>
    
    <objective>
        Maksymalnie w dwóch słowach napisz, co znajduje się na polu, na które wskazuje przekazana 
        przez użytkownika instrukcja.
    </objective>
`;
