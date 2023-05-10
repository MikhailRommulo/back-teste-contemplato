import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      description: 'back criado para o teste técnico da contemplato',
      version: '1.0',
    };
  }
}
