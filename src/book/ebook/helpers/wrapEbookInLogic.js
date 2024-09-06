"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapEbookInLogic = void 0;
const get_file_url_1 = require("../../../utils/common/get-file-url");
const wrapEbookInLogic = (file, picture, title) => `
			<div style="margin-bottom: 40px; user-select: none;">
				<img style='width:100%; height: 300px; object-fit: contain; object-position: center; padding-top: 40px'
					 src="${(0, get_file_url_1.getFileUrl)(picture)}" alt="${title}"
					onerror="this.style.display='none';"
					  />
			</div>
			<div id="scroll-container">
				${file}
			</div>
`;
exports.wrapEbookInLogic = wrapEbookInLogic;
//# sourceMappingURL=wrapEbookInLogic.js.map