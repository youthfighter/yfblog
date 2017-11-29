var Redis = require('ioredis');
var redis = new Redis();
redis.set('key', 100, 'EX', 10);