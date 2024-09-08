import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { AuthorDto, CreateAuthorDto } from '@/src/author/dto/author.dto';

@Injectable()
export class AuthorService {
	constructor(private readonly prisma: PrismaService) {}

	create(dto: Required<CreateAuthorDto>) {
		console.log('try to create author', dto);
		return this.prisma.author.create({
			data: dto
		});
	}
	update(dto: AuthorDto) {
		console.log('try to update author', dto);
		return this.prisma.author.update({
			where: {
				id: dto.id
			},
			data: dto
		});
	}
	async delete(id: string) {
		console.log('try to delete author', id);
		return this.prisma.author.delete({
			where: {
				id
			}
		});
	}
	catalog(searchTerm: string, page: number) {
		console.log('try to get author catalog', searchTerm, page);
		return this.prisma.author.findMany({
			select: {
				id: true,
				name: true,
				picture: true,
				description: true
			},
			...(searchTerm && {
				where: {
					OR: [
						{
							name: {
								contains: searchTerm
							}
						},
						{
							description: {
								contains: searchTerm
							}
						}
					]
				}
			}),
			skip: (page - 1) * 10,
			take: 10
		});
	}
}
