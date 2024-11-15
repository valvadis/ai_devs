let encoded: string = "GhUiPj1fKTM3NCY1KSUmNxkP";

// Algorithmically

encoded = base64_encode(encoded);
console.log(encoded);

function base64_encode(encoded: string): string {
    return Buffer.from(encoded, 'base64').toString('utf-8');
}

// Crosswise

function crosswiseTransform(input: string): string {
    let result = '';

    for (let i = 0; i < input.length; i += 2) {
        if (i + 1 < input.length) {
            result += input[i + 1];
        }
        result += input[i];
    }

    return result;
}

const transformedString = crosswiseTransform(encoded);
console.log(transformedString);

// Logically
