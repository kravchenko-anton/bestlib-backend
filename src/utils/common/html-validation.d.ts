export declare const postProcessingHtml: (html: string) => string;
export declare const checkHtmlValid: (html: string) => Promise<{
    messages: any;
    isValid: boolean;
}>;
