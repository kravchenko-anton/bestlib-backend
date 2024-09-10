import { serverError } from '@/src/utils/helpers/server-error';
import { HttpStatus } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import prettify from '@liquify/prettify';

const textTags = new Set(['A', 'H2', 'H1', 'H3', 'H4', 'H5', 'H6', 'P']);
const removedTags = new Set([
	'svg',
	'iframe',
	'script',
	'style',
	'table',
	'TABLE',
	'SUP',
	'SUB',
	'hr',
	'IMAGE',
	'IMG',
	'HR'
]);
export const clearHtmlTree = (element: Element): Element => {
	const attributes = element.getAttributeNames();
	for (const attribute of attributes) {
		if (attribute === 'src') continue;
		element.removeAttribute(attribute);
	}

	if (textTags.has(element.tagName) && element.textContent === '')
		element.remove();
	if (removedTags.has(element.tagName)) element.remove();
	return element;
};

export const prettifyHtmlContent = async (text: string) => {
	const dom = new JSDOM(String(text));

	const clearElements = dom.window.document.querySelectorAll('*');
	const elements = [...clearElements].map(element => clearHtmlTree(element));
	for (const element of elements) {
		if (
			(element.tagName === 'a' ||
				element.tagName === 'A' ||
				element.tagName === 'p' ||
				element.tagName === 'P') &&
			element.childElementCount > 1
		) {
			const div = dom.window.document.createElement('div');
			div.innerHTML = element.innerHTML;
			element.replaceWith(div);
		}
	}
	if (!prettify.format) {
		throw serverError(
			HttpStatus.BAD_REQUEST,
			"Some components aren't available"
		);
	}
	return prettify
		.format(dom.window.document.body?.innerHTML || '', {
			language: 'html',
			indentSize: 2,
			endNewline: true
		})
		.then((formatted: string) => formatted);
};
