import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { redisConstants } from '../../config/constants';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly redis: Redis;

    constructor() {
        this.redis = new Redis({
            host: redisConstants.host,
            port: redisConstants.port,
            password: redisConstants.password,
            db: redisConstants.db,
        });
    }

    getClient(): Redis {
        return this.redis;
    }

    async onModuleDestroy() {
        await this.redis.quit();
    }

    // 封装一些常用的方法
    async set(key: string, value: string, ttl?: number): Promise<'OK'> {
        if (ttl) {
            return await this.redis.set(key, value, 'EX', ttl);
        }
        return await this.redis.set(key, value);
    }

    async get(key: string): Promise<string | null> {
        return await this.redis.get(key);
    }

    async del(key: string): Promise<number> {
        return await this.redis.del(key);
    }
}
