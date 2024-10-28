export const jwtConstants = {
    secret: 'yourSecretKey', // 应在环境变量中安全存储
    signOptions: {
        expiresIn: '24h', //失效时间
    },
};

export const mongodbDevConstants = {
    host: '127.0.0.1',
    port: 27017,
    db: 'test',
    user: '',
    pass: '',
};

export const mongodbProdConstants = {
    host: '127.0.0.1',
    port: 27017,
    db: 'test',
    user: '',
    pass: '',
};

export const redisConstants = {
    host: '127.0.0.1',
    port: 6379,
    password: '', // 如果有密码的话
    db: 0,
};
