import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from '../../config/constants';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.register(jwtConstants), UserModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
