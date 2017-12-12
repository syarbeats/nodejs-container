var config = {
    port: 8585,
    secret: 'secret',
    redisUrl: 'redis://localhost',
    redisServer: {
        host: 'redis',
        port: 6379
        },
    routes: {
        login: '/login',
        logout: '/logout'
    }
};

module.exports = config;
