export const streetNameSearch = (recordings: string) => `   
    Mamy transkrypcje kilku nagrań od różnych osób:
   
    ${recordings}
    
    Twoim zadaniem jest przeanalizowanie tych nagrań w celu zidentyfikowania konkretnej nazwy ulicy.
    
    <information>
        - Nazwa ulicy nie jest bezpośrednio podana w żadnej transkrypcji.
        - Zeznania mogą być sprzeczne; niektórzy świadkowie mogą się mylić.
        - Rafał to najbardziej wiarygodne źródło informacji.
        - Istotna jest nazwa ulicy, przy której znajduje się wydział, na którym pracuje profesor.
    </information>
    
    <rules>
        - Podaj jedynie nazwę ulicy, bez numerów ani dodatkowych informacji.
        - Nazwę ulicy umieść w tagach <RESULT></RESULT> w formacie: <RESULT>Nazwa Ulicy</RESULT>.
    </rules>
    
    <objective>
        1. Zidentyfikuj nazwę uczelni oraz nazwę wydziału, na którym wykłada profesor Andrzej. Opisz dokładnie swoje rozumowanie.
        2. Następnie podaj nazwę ulicy, na której znajduje się ten wydział.
    </objective>
`;