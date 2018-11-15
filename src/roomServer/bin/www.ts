import * as commander from "commander"
import LoggerFactory from "../../util/log/LoggerFactory";
import App from "../App";
import WebSocketHandler from "../websocket/WebSocketHandler";
import FbProtocolCodecFactory from "../websocket/FbProtocolCodecFactory";
const logger = LoggerFactory.getLogger("www");
process.on("uncaughtException", function (error) {
    logger.info("抓到了一个未捕获的异常", error);
})
commander
    .version('1.0.0.0')
    .usage('www')
    .option('-P, --port <n>', 'http端口', "parseInt")
    .option('-H, --host []', 'http端口', "0.0.0.0")
    .option('-L, --loglv []', 'log级别', "debug")
 commander.parse(process.argv)
LoggerFactory.setLogLv(commander.loglv)
function start(port: number, hostname: string) {
    (async () => {
        let result = await App.startServer(port, hostname);
        logger.info(result)
        if (result) {
            App.getApp().startWebSocket(new WebSocketHandler(), new FbProtocolCodecFactory());
        }
    })()
}
let port = 3000;
if (commander.port) {
    port = commander.port;
}
logger.info(`roomServer bengingStart  ${commander.host}:${port}`)
start(port, commander.host)
