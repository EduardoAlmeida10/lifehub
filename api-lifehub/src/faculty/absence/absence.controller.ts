import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import type { RequestUser } from 'src/common/interfaces/request-user.interface';
import { AbsenceEntity } from './entities/absence.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @Post()
  create(
    @Body() createAbsenceDto: CreateAbsenceDto,
    @CurrentUser() user: RequestUser,
  ): Promise<AbsenceEntity> {
    return this.absenceService.create(createAbsenceDto, user.userId);
  }

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.absenceService.findAll(user.userId);
  }

  @Get('course/:courseId/statistics')
  findStatistics(
    @Param('courseId') courseId: string,
    @CurrentUser() user: RequestUser,
  ) {
    return this.absenceService.findStatistics(courseId, user.userId);
  }

  @Get('course/:courseId')
  findByCourse(
    @Param('courseId') courseId: string,
    @CurrentUser() user: RequestUser,
  ) {
    return this.absenceService.findByCourse(courseId, user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.absenceService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAbsenceDto: UpdateAbsenceDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.absenceService.update(id, updateAbsenceDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.absenceService.remove(id, user.userId);
  }
}
