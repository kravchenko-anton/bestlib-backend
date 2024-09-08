import { JSDOM } from 'jsdom';

export const imageProcessing = (
	text: string,
	imagesData: {
		id: string;
		href: string;
		data: Buffer;
	}[]
) => {
	const dom = new JSDOM(text);
	const images = dom.window.document.querySelectorAll('img');
	for (const img of images) {
		const imgData = imagesData.find(data => '/images/' + data.href === img.src);

		if (!imgData) {
			console.log(imagesData, 'no imgData');
			img.remove();
		}
		if (imgData?.id.startsWith('cover')) {
			console.log('cover');
			img.remove();
		}

		console.log(imgData, 'imgData');
		img.setAttribute('id', imgData?.id || '');
		img.setAttribute('alt', img.src);
		img.removeAttribute('src');
	}
	return dom.window.document.body?.innerHTML || '';
};
