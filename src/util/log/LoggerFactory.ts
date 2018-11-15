import { configure, getLogger, Logger } from 'log4js';
import * as path from "path"

export default class LoggerFactory {
    public static getLogger(category?: string): Logger {
        let logger = getLogger(category);
        return logger;
    }
    public static setLogLv(loglv: string): void {
        let temploglv = "ERROR";
        switch (loglv) {
            case "debug": temploglv = "DEBUG"; break;
            case "info": temploglv = "INFO"; break;
            case "warn": temploglv = "WARN"; break;
            case "error": temploglv = "ERROR"; break;
            default: temploglv = "ERROR"; break;
        }
        configure({
            appenders: {
                sys: { type: 'file', filename: path.dirname(process.argv[1]) + '/logs/sys.log', alwaysIncludePattern: true, pattern: "-yyyy-MM-dd.log", encoding: 'utf-8' },
                console: { type: "console" }
            },
            categories: { default: { appenders: ['sys', "console"], level: temploglv } }
        });
    }
}