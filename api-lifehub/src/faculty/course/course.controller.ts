import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { type RequestUser } from 'src/common/interfaces/request-user.interface';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UpdateCourseDto } from './dto/update-course.dto';

@UseGuards(JwtAuthGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() dto: CreateCourseDto, @CurrentUser() user: RequestUser) {
    return this.courseService.create(dto, user);
  }

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.courseService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.courseService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.courseService.update(id, dto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.courseService.remove(id, user.userId);
  }
}
