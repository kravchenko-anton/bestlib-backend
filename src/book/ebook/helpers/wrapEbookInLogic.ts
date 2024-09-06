import { getFileUrl } from '@/src/utils/common/get-file-url';

export const wrapEbookInLogic = (
	file: string,
	picture: string,
	title: string
) => `
			<div style="margin-bottom: 40px; user-select: none;">
				<img style='width:100%; height: 300px; object-fit: contain; object-position: center; padding-top: 40px'
					 src="${getFileUrl(picture)}" alt="${title}"
					onerror="this.style.display='none';"
					  />
			</div>
			<div id="scroll-container">
				${file}
			</div>
`;
