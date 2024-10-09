import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminLoginDto } from '../dto/admin-login.dto';
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  @Post('auth/login')
  @UseGuards()
  async logIn(@Body() adminLoginDto: AdminLoginDto) {
    return {
      success: true,
    };
  }
}
