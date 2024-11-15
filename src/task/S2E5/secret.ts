let encoded: string = "GhUiPj1fKTM3NCY1KSUmNxkP";

// Algorithmically

encoded = base64_encode(encoded);
console.log(encoded);

function base64_encode(encoded: string): string {
    return Buffer.from(encoded, 'base64').toString('utf-8');
}
