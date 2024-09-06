"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHtmlValid = exports.postProcessingHtml = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const postProcessingHtml = (html) => `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<title>Test</title>
			</head>
			<body>
				${html}
			</body>
		</html>
	
	`;
exports.postProcessingHtml = postProcessingHtml;
const checkHtmlValid = async (html) => {
    const request = await axios_1.default
        .request({
        method: 'POST',
        // do extract more than 20 words
        url: 'https://validator.w3.org/nu/?out=json',
        data: (0, exports.postProcessingHtml)(html),
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    })
        .catch(error => {
        console.log('html-validation error', error);
        throw new Error('Html validation error');
    });
    const skippedErrors = [
        'Element “dl” is missing a required child element',
        'Section lacks heading',
        'This document appears to be written in Russian'
    ];
    const messages = request.data.messages
        .filter((message) => !skippedErrors.some(error => message.message.toLowerCase().includes(error.toLowerCase())))
        .map((message) => `${message.message} at line ${message.lastLine} column ${message.lastColumn}:\n${message.extract}`);
    console.log('html-validation', request);
    return {
        messages: messages,
        isValid: messages.length === 0
    };
};
exports.checkHtmlValid = checkHtmlValid;
//# sourceMappingURL=html-validation.js.map