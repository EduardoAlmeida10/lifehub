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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { RequestUser } from 'src/common/interfaces/request-user.interface';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.taskService.create(createTaskDto, user.userId);
  }

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.taskService.findAll(user.userId);
  }

  @Get('course/:courseId')
  findByCourse(
    @Param('courseId') courseId: string,
    @CurrentUser() user: RequestUser,
  ) {
    return this.taskService.findByCourse(courseId, user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.taskService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.taskService.update(id, updateTaskDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.taskService.remove(id, user.userId);
  }
}
