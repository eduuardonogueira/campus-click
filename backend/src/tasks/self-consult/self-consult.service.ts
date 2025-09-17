import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import configuration from 'src/config/configuration';

@Injectable()
export class SelfConsultService {
  private readonly logger = new Logger(SelfConsultService.name);

  // Executa a cada minuto
  @Cron(CronExpression.EVERY_MINUTE)
  // fetch pra manter o backend ativo no render
  async keepAlivePing() {
    try {
      const config = configuration(); // Pega as variáveis do configuration.ts
      
      let url = '';
      // Caso eu tenha uma URL externa (Render)
      if (config.externalUrl) {
        url = config.externalUrl;

        // Caso eu tenha o hostname interno (Render)
      } else if (config.internalHostname) {
        // Monta a URL completa com o hostname ex: http://<internalHostname>:<port>
        url = `http://${config.internalHostname}:${config.port || 3001}`;

        // Caso eu tenha uma URL de host completa
      } else if (config.hostUrl) {
        url = config.hostUrl;

        // Senão usa localhost
      } else {
        url = 'http://localhost:3001';
      }

      const res = await fetch(url);
      this.logger.log(`Keep-alive ping sent to ${url} - status: ${res.status}`);
    } catch (err) {
      this.logger.warn('Keep-alive ping failed: ' + err?.message);
    }
  }
}