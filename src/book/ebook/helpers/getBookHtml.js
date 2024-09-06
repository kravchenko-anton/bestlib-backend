"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerBookHtml = void 0;
const tslib_1 = require("tslib");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const getServerBookHtml = ({ name, text, sectionId, readingTime, romanNumber }) => `<section id="${sectionId}" data-title="${name}">
<div style="width: 100%; user-select: none !important; margin-bottom: 30px; margin-top: 30px;">
	<h4 style="padding: 0; font-size: 18px; margin: 0 0 4px;">${name}</h4>
	<div style=" gap: 10px; display: flex; align-items: center;">
	<h6 style="margin: 0; padding: 0;">${romanNumber}</h6>
	<em style="margin: 0; padding: 0;">${(0, dayjs_1.default)()
    .minute(readingTime)
    .format('HH:mm')}</em>
</div>
</div>
 ${text}
</section>`;
exports.getServerBookHtml = getServerBookHtml;
//# sourceMappingURL=getBookHtml.js.map