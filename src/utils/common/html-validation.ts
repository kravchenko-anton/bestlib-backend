import axios from 'axios'

type HtmlValidationMessageType = {
	message: string
	extract: string
	lastLine: number
	lastColumn: number
	firstColumn: number
	hiliteStart: number
	hiliteLength: number
}
export const postProcessingHtml = (html: string) => `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<title>Test</title>
			</head>
			<body>
				${html}
			</body>
		</html>
	
	`
export const checkHtmlValid = async (html: string) => {
	const request = await axios
		.request({
			method: 'POST',
			// do extract more than 20 words
			url: 'https://validator.w3.org/nu/?out=json',
			data: postProcessingHtml(html),
			headers: {
				'Content-Type': 'text/html; charset=utf-8'
			}
		})
		.catch(error => {
			console.log('html-validation error', error)
			throw new Error('Html validation error')
		})

	const skippedErrors = [
		'Element “dl” is missing a required child element',
		'Section lacks heading',
		'This document appears to be written in Russian'
	]
	const messages = request.data.messages
		.filter(
			(message: HtmlValidationMessageType) =>
				!skippedErrors.some(error =>
					message.message.toLowerCase().includes(error.toLowerCase())
				)
		)
		.map(
			(message: HtmlValidationMessageType) =>
				`${message.message} at line ${message.lastLine} column ${message.lastColumn}:\n${message.extract}`
		)
	console.log('html-validation', request)
	return {
		messages: messages,
		isValid: messages.length === 0
	}
}
