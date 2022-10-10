import { PrismaClient} from '@prisma/client';
import { Image, CreateImageDto, Pagination, UpdateImageDto } from '../../types/image';

export class ImageService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient;
  }

  async findAll({limit, offset}: Pagination): Promise<Image[]> {
    return await this.prisma.image.findMany({select: {id: true, url: true, label: true}, take: limit, skip: offset, orderBy: {id: 'desc'}});
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.prisma.image.findUnique({where: {id}});
    if (!image) {
      throw new Error('Image not found');
    }
    return image;
  }

  async findByLabel(label: string): Promise<Image[]> {
    const images = await this.prisma.image.findMany({where: {label: {contains: label}}});
    return images;
  }

  async create(image: CreateImageDto): Promise<Image> {
    return await this.prisma.image.create({data: image});
  }

  async update(id: number, image: UpdateImageDto): Promise<Image> {
    const updatedImage = await this.prisma.image.update({where: {id}, data: image});
    if (!updatedImage) {
      throw new Error('Image not found');
    }
    return updatedImage;
  }

  async remove(id: number) {
    const image = await this.prisma.image.delete({where: {id}});
    if (!image) {
      throw new Error('Image not found');
    }
    return image;
  }
}