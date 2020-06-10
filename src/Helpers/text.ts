export enum TextStyle {
    NO_STYLE,
    UPPERCASE,
    LOWERCASE,
    CAMELCASE
}

export const camelCase = (text: string): string => {
    return text.replace(/(\w+)|(\s)/g, (_, p1: string, p2: string) => {
        if (p1) {
            return p1.charAt(0).toUpperCase() + p1.substring(1).toLowerCase();
        }
        if (p2) {
            return (p2 = ' ');
        }
    });
};
