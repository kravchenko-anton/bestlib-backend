import { ChapterType } from '@/src/book/ebook/dto/chapter.schema';
import dayjs from 'dayjs';

export interface GetServerBookHtmlType
	extends Pick<ChapterType, 'romanNumber' | 'readingTime' | 'name' | 'text'> {
	sectionId: string;
	id: string;
}
export const getServerBookHtml = ({
	name,
	text,
	sectionId,
	readingTime,
	romanNumber
}: GetServerBookHtmlType) => `<section id="${sectionId}" data-title="${name}">
<div style="width: 100%; user-select: none !important; margin-bottom: 30px; margin-top: 30px;">
	<h4 style="padding: 0; font-size: 18px; margin: 0 0 4px;">${name}</h4>
	<div style=" gap: 10px; display: flex; align-items: center;">
	<h6 style="margin: 0; padding: 0;">${romanNumber}</h6>
	<em style="margin: 0; padding: 0;">${dayjs()
		.minute(readingTime)
		.format('HH:mm')}</em>
</div>
</div>
 ${text}
</section>`;
