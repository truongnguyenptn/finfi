import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SocialsModule } from './socials/socials.module';
import { WalletsModule } from './wallets/wallets.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({}),
        UsersModule,
        ProfilesModule,
        SocialsModule,
        WalletsModule,
        PrismaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
