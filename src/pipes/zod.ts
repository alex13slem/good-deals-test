import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log(value);

    const result = this.schema.safeParse(value);
    console.log(result);

    if (!result.success) {
      throw new BadRequestException(result.error.issues);
    }
    return result.data;
  }
}
