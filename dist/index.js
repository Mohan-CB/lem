"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis = __importStar(require("redis"));
var util_1 = require("util");
var lem = /** @class */ (function () {
    function lem(redisConnectConfig, config) {
        var _this = this;
        if (util_1.isUndefined(redisConnectConfig)) {
            console.log('ckpt1');
            this.rConPub = redis.createClient();
            this.rConSub = redis.createClient();
        }
        else if (typeof redisConnectConfig == 'string') {
            console.log('ckpt2');
            this.rConPub = redis.createClient(redisConnectConfig);
            this.rConSub = redis.createClient(redisConnectConfig);
        }
        else {
            console.log('ckpt3');
            this.rConPub = redisConnectConfig;
            this.rConSub = redisConnectConfig;
        }
        // make sure the redis connection is actually alive
        this.rConPub.ping(function (err, reply) {
            if (err !== null) {
                console.log('Redis initialization error', "" + JSON.stringify(err));
                process.exit(1);
            }
            else {
                console.log('Redis initialization success', "" + reply);
            }
        });
        this.rConSub.on("ready", function () {
            _this.rConSub.config("SET", "notify-keyspace-events", "Ex");
            _this.rConSub.SUBSCRIBE("__keyevent@0__:expired");
            _this.rConSub.on("message", function (channel, message) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // TODO:
                    console.log(channel + ", " + message);
                    return [2 /*return*/];
                });
            }); });
        });
        // TODO: construct the b+ tree fo routeConfig
        this.routeConfig = config;
        console.log('lem is at your service, sir');
    }
    lem.prototype.createInstance = function () {
        var _this = this;
        return function (request, response, next) {
            var url = request.path;
            console.log("lem logged " + url + " for you sir");
            if (_this.routeConfig) {
                // compare with the routeConfig
            }
            else {
                _this.rConPub.setex(url, 5, Date.now().toString());
            }
            if (next)
                next();
        };
    };
    return lem;
}());
exports.lem = lem;
