import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBody, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { error: 'Credenciais inválidas' };
    }
    return this.authService.login(user);
  }

  @Post('signup')
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso.',
  })
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('profile')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado retornado com sucesso.',
  })
  @UseGuards(JwtAuthGuard)
  async me(@Request() req, @Body() body?: any) {
    const user = await this.userService.findByEmail(req.user.email);
    return {
      ...req.user,
      name: user?.name,
    };
  }
}
