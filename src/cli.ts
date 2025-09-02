import { CommandFactory } from 'nest-commander';
import { CommandsModule } from './database/commands.module';

async function bootstrap() {
  await CommandFactory.run(CommandsModule);
}

bootstrap();