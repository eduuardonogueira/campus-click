import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Um endpoint para verificar se o backend está ativo (usado pelo self-consult)
  @Get()
  healthCheck() {
    return this.appService.getHealthStatus();
  }
}
