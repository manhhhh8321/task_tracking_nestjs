import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './shared/config/config.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectModule } from './modules/projects/projects.module';
import { DatabaseModule } from './modules/database/database.module';
import { PrioritiesModule } from './modules/priority/priorities.module';
import { TypeModule } from './modules/type/type.module';

@Module({
  imports: [AuthModule, ConfigModule, UsersModule, DatabaseModule, ProjectModule, PrioritiesModule, TypeModule],
})
export class AppModule {}
