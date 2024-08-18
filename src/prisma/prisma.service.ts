import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }

  handleDatabaseError(error: any): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          // Unique constraint failed
          throw new ConflictException('Unique constraint violation');
        case 'P2003':
          // Foreign key constraint failed
          throw new BadRequestException(
            'Foreign key constraint violation'
          );
        case 'P2025':
          // Record not found
          throw new NotFoundException('Record not found');
        case 'P2016':
          // Query returned an unexpected number of results
          throw new BadRequestException(
            'Query returned unexpected results'
          );
        case 'P2004':
          // Constraint failed on the database
          throw new ForbiddenException('Constraint violation');
        // Add more cases as needed for specific error codes
        default:
          // Unknown Prisma error
          throw new BadRequestException('Database request error');
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      // Validation error (e.g., incorrect schema)
      throw new BadRequestException('Validation error');
    } else if (
      error instanceof Prisma.PrismaClientInitializationError
    ) {
      // Prisma initialization error (e.g., connection issues)
      throw new InternalServerErrorException(
        'Database initialization error'
      );
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
      // Prisma runtime error (unexpected crash)
      throw new InternalServerErrorException(
        'Unexpected database error'
      );
    }

    // Catch any other unhandled errors
    throw new InternalServerErrorException(
      'Unexpected error occurred'
    );
  }
}
