export const categorizeFile = `
    <rules>
        - ONLY three categories from information section are allowed.
        - Response MUST contain only one word without any additional description.
        - DO NOT provide any additional information.
    </rules>
    
    <information>
        PEOPLE category contains information about captured people or people whose traces were found.
            
        HARDWARE category contains information about repaired hardware defects.
            
        OTHERS should be assigned to any other files.
    </information>
    
    <objective>
        Assign a category to the inputs provided by users.
    </objective>
`;