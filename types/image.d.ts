import {Image as PrismaImage} from '@prisma/client';

export type Image = Pick<PrismaImage, 'id' | 'label' | 'url'>

export type CreateImageDto = Omit<Image, 'id'>

export type UpdateImageDto = Partial<CreateImageDto>

export type Pagination = {
  limit: number;
  offset: number;
}