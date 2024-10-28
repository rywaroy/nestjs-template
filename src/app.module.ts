import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { mongodbDevConstants, mongodbProdConstants } from './config/constants';
import { FileModule } from './modules/file/file.module';
import { RedisModule } from './modules/redis/redis.module';

const dbConfig =
    process.env.NODE_ENV === 'online'
        ? mongodbProdConstants
        : mongodbDevConstants;

@Module({
    imports: [
        UserModule,
        MongooseModule.forRoot(
            `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`,
            {
                user: dbConfig.user,
                pass: dbConfig.pass,
            },
        ),
        AuthModule,
        FileModule,
        RedisModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
