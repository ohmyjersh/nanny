import isJSON from 'is-json';

export function MapEditorContenet(raw, text) {
    return {
        rawContent: raw,
        textContenet: text,
        isValid: isJSON.strict(text),
    }
}