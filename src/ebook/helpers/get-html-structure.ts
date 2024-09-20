import { finishBookButton } from '@/src/ebook/helpers/ebook-structure/elements/finish-book';
import { selectMenuHtml } from '@/src/ebook/helpers/ebook-structure/elements/select-menu';
import {
	calculateProgress,
	scrollCalculateProgress
} from '@/src/ebook/helpers/ebook-structure/scripts/calculate-progress';
import { markSelectScript } from '@/src/ebook/helpers/ebook-structure/scripts/mark-select';
import {
	onSelectTextScript,
	selectMenuActions,
	textSelectMenu
} from '@/src/ebook/helpers/ebook-structure/scripts/text-selection-scripts';
import { utilsScripts } from '@/src/ebook/helpers/ebook-structure/scripts/utils-scripts';
import { getFileUrl } from '@/src/utils/common/get-file-url';

export const getHtmlStructure = (
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
			${finishBookButton}
			${selectMenuHtml}
			<script src="https://cdn.jsdelivr.net/npm/mark.js@8.11.1/dist/mark.min.js"  type="text/javascript" charset="utf-8" ></script>
			<script>
				${markSelectScript}
				${utilsScripts}
			</script>
`;

export const onLoadScript = `
						${calculateProgress}
						${onSelectTextScript}
						${textSelectMenu}
						${selectMenuActions}
						${scrollCalculateProgress}
`;
