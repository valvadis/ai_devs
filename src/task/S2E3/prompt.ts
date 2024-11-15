export const generateImage = (recording: string) => `      
    ${recording}

    <rules>
        - Image must be in PNG format.
        - Image must have a resolution of 1024×1024px
    </rules>
    
    <objective>
        Generate an image of the robot based on the given recordings.
    </objective>
`;