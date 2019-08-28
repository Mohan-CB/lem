import * as redis from 'redis';
import { isNullOrUndefined } from 'util';

interface IRouteConfig {
  include: { [s: string]: number },
  exclude: [string],
}

export class lem {
  public rConPub: redis.RedisClient;
  public rConSub: redis.RedisClient;
  public routeConfig: IRouteConfig;

  constructor(redisConnectConfig: string | redis.RedisClient,
    config: IRouteConfig,
    cb: (errorMessage: string) => any
  ) {
    if (isNullOrUndefined(redisConnectConfig)) {
      this.rConPub = redis.createClient();
      this.rConSub = redis.createClient();
    } else if (typeof redisConnectConfig == 'string') {
      this.rConPub = redis.createClient(redisConnectConfig);
      this.rConSub = redis.createClient(redisConnectConfig);
    } else {
      // TODO: fix creation for pub/sub client
      this.rConPub = redisConnectConfig;
      this.rConSub = redisConnectConfig;
    }

    this.rConPub.ping((err, reply) => {
      if (err !== null) {
        console.log('Redis initialization error', `${JSON.stringify(err)}`);
        process.exit(1);
      }
    });

    this.rConSub.on("ready", () => {
      this.rConSub.config("SET", "notify-keyspace-events", "Ex");
      this.rConSub.SUBSCRIBE("__keyevent@0__:expired");
      this.rConSub.on("message", async (channel, message) => {
        if (!cb)
          throw new Error(`route ${message} has no activity for 5 secs`);
        else
          cb(`route ${message} has no activity for 5 secs`);
      });
    });

    // TODO: construct the b+ tree fo routeConfig
    this.routeConfig = config;

    console.log('lem is at your service, sir');
  }

  public register(): any {
    return (request: any, response: any, next: any) => {
      const url = request.path;
      if (this.routeConfig) {
        this.checkRoute(url);
      } else {
        console.log(`lem logged ${url} for you sir`);
        this.rConPub.setex(url, 5, Date.now().toString());
      }
      if (next) next();
    }
  }

  public checkRoute(url: string) {
    if (this.routeConfig.include && this.routeConfig.include[url]) {
      console.log(`include ${url} in lem`);
      this.rConPub.setex(url, 5, Date.now().toString());
    } else if (this.routeConfig.exclude && this.routeConfig.exclude.indexOf(url) >= 0) {
      console.log(`exclude ${url} from lem`);
      return;
    }
  }
}
