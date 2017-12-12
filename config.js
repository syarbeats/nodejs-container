var config = {
    port: 8585,
    secret: 'secret',
    redisUrl: 'redis://localhost',
    redisServer: {
        host: 'localhost',
        port: 6379
        },
    routes: {
        login: '/login',
        logout: '/logout'
    }
};

module.exports = config;
