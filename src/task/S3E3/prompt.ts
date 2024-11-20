export const prepareQuery = (tables: string[]) => `       
    <rules>
        - Niech wynikiem będzie zapytanie SQL bez żadnych dodatkowych komentarzy.
        - Nie otaczaj zapytania żadnymi znakami specjalnymi.
    </rules>
    
    <information>
        Poniżej znajduje się struktury dostępnych tabel:
        
        ${tables.join('\n\n')}
    </information>
    
    <objective>
        Przygotuj zapytanie SQL które wyciągnie informacje o tym, które aktywne datacenter (DC_ID) są zarządzane przez 
            pracowników, którzy są na urlopie (is_active=0)
    </objective>
`;