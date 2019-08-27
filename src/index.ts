import * as redis from 'redis';
import { isUndefined } from 'util';
export class lem {
  public rConPub: redis.RedisClient;
  public rConSub: redis.RedisClient;
  public routeConfig: any;
  constructor(redisConnectConfig: string | redis.RedisClient,
    config: any
  ) {
    if (isUndefined(redisConnectConfig)) {
      console.log('ckpt1');
      this.rConPub = redis.createClient();
      this.rConSub = redis.createClient();
    } else if (typeof redisConnectConfig == 'string') {
      console.log('ckpt2');
      this.rConPub = redis.createClient(redisConnectConfig);
      this.rConSub = redis.createClient(redisConnectConfig);
    } else {
      console.log('ckpt3');
      this.rConPub = redisConnectConfig;
      this.rConSub = redisConnectConfig;
    }

    // make sure the redis connection is actually alive
    this.rConPub.ping((err, reply) => {
      if (err !== null) {
        console.log('Redis initialization error', `${JSON.stringify(err)}`);
        process.exit(1);
      } else {
        console.log('Redis initialization success', `${reply}`);
      }
    });

    this.rConSub.on("ready", () => {
      this.rConSub.config("SET", "notify-keyspace-events", "Ex");
      this.rConSub.SUBSCRIBE("__keyevent@0__:expired");
      this.rConSub.on("message", async (channel, message) => {
        // TODO:
        console.log(`${channel}, ${message}`);
      });
    });

    // TODO: construct the b+ tree fo routeConfig
    this.routeConfig = config;

    console.log('lem is at your service, sir');
  }

  public createInstance(): any {
    return (request: any, response: any, next: any) => {
      const url = request.path;
      console.log(`lem logged ${url} for you sir`);
      if (this.routeConfig) {
        // compare with the routeConfig
      } else {
        this.rConPub.setex(url, 5, Date.now().toString());
      }
      if (next) next();
    }
  }
}
