"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EbookService = void 0;
const tslib_1 = require("tslib");
const wrapEbookInLogic_1 = require("./helpers/wrapEbookInLogic");
const common_1 = require("@nestjs/common");
const jsdom_1 = require("jsdom");
const zod_1 = require("zod");
const server_error_1 = require("../../utils/helpers/server-error");
const prisma_service_1 = require("../../utils/services/prisma.service");
const ebook_schema_1 = require("./dto/ebook.schema");
const slugify_1 = require("../../utils/helpers/slugify");
const get_file_url_1 = require("../../utils/common/get-file-url");
const getBookHtml_1 = require("./helpers/getBookHtml");
let EbookService = class EbookService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async storedEbook(slug) {
        const book = await this.prisma.book.findUnique({
            where: { slug },
            select: {
                id: true,
                ebook: true
            }
        });
        if (!book) {
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Something's wrong, try again");
        }
        const ebook = await fetch((0, get_file_url_1.getFileUrl)(book.ebook))
            .then(result => result.json())
            .catch(() => null);
        if (!ebook) {
            console.log('error', 'not found ebook' + slug);
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Something's wrong, try again");
        }
        const errors = zod_1.z.array(ebook_schema_1.StoredEBookSchema).safeParse(ebook);
        if (!errors.success) {
            console.log('error', 'not valid ebook' + slug, errors.error);
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Something's wrong, try again");
        }
        return ebook;
    }
    async ebookBySlug(slug) {
        //TODO: сделать получение твоих цытат и сразу проверку на существование + gold цытаты
        const book = await this.prisma.book.findUnique({
            where: { slug },
            select: {
                id: true,
                title: true,
                ebook: true,
                picture: true
            }
        });
        if (!book) {
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Something's wrong, try again");
        }
        const ebook = await this.storedEbook(slug);
        const ebookString = ebook
            .map(({ chapters, title }) => chapters
            .map(({ text, name, romanNumber, readingTime, id }) => (0, getBookHtml_1.getServerBookHtml)({
            name,
            id,
            sectionId: `${(0, slugify_1.slugify)(name + ' ' + title)}_${id}`,
            text,
            readingTime,
            romanNumber
        }))
            .join(' '))
            .join(' ');
        const dom = new jsdom_1.JSDOM(ebookString);
        const images = dom.window.document.querySelectorAll('img');
        for (const image of images) {
            const sourcePath = image.getAttribute('src');
            if (sourcePath) {
                image.src = (0, get_file_url_1.getFileUrl)(sourcePath);
            }
            else {
                image.remove();
            }
        }
        const file = dom.window.document.documentElement.outerHTML.toString();
        return {
            ...book,
            file: (0, wrapEbookInLogic_1.wrapEbookInLogic)(file, book.picture, book.title),
            chapters: ebook.map(({ title, chapters }) => ({
                title,
                children: chapters.map(({ name, id }) => ({
                    name,
                    link: `${(0, slugify_1.slugify)(name + ' ' + title)}_${id}`
                }))
            }))
        };
    }
};
exports.EbookService = EbookService;
exports.EbookService = EbookService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EbookService);
//# sourceMappingURL=ebook.service.js.map