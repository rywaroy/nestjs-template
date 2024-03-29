import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    async login(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.login(createUserDto);
        const token = await this.authService.createToken(user);
        return {
            access_token: token,
        };
    }

    @UseGuards(AuthGuard)
    @Post('profile')
    async getProfile(@Request() req) {
        return req.user;
    }
}
