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
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import type { RequestUser } from 'src/common/interfaces/request-user.interface';

@UseGuards(JwtAuthGuard)
@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  create(@Body() dto: CreateGradeDto, @CurrentUser() user: RequestUser) {
    return this.gradeService.create(dto, user.userId);
  }

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.gradeService.findAll(user.userId);
  }

  @Get('course/:courseId/statistics')
  findStatistics(
    @Param('courseId') courseId: string,
    @CurrentUser() user: RequestUser,
  ) {
    return this.gradeService.findStatistics(courseId, user.userId);
  }

  @Get('course/:courseId')
  findByCourse(
    @Param('courseId') courseId: string,
    @CurrentUser() user: RequestUser,
  ) {
    return this.gradeService.findByCourse(courseId, user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.gradeService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGradeDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.gradeService.update(id, dto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.gradeService.remove(id, user.userId);
  }
}
