import type { ChapterType } from 'src/utils/validation/ebook/chapter.schema';

export interface GetChapterStructureType
	extends Pick<ChapterType, 'title' | 'content'> {
	sectionId: string;
	id: string;
	romanNumber: string;
	readingTime: string;
}
export const getChapterStructure = ({
	title,
	content,
	sectionId,
	readingTime,
	romanNumber
}: GetChapterStructureType) => `<section id="${sectionId}" data-title="${title}">
<div style="width: 100%; user-select: none !important; margin-bottom: 30px; margin-top: 30px;">
	<h4 style="padding: 0; font-size: 18px; margin: 0 0 4px;">${title}</h4>
	<div style=" gap: 10px; display: flex; align-items: center;">
	<h6 style="margin: 0; padding: 0;">${romanNumber}</h6>
	<em style="margin: 0; padding: 0;">${readingTime}</em>
</div>
</div>
 ${content}
</section>`;
