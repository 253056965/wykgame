import IOhandler from "../../util/socket/handler/IOHandler";
import IoSession from "../../util/socket/session/IoSession";
import LoggerFactory from "../../util/log/LoggerFactory";
const logger = LoggerFactory.getLogger("WebSocketHandler")
export default class WebSocketHandler implements IOhandler {
    sessionClosed(session: IoSession): void {
        logger.info("连接断开了", session)
    }
    sessionIdle(session: IoSession): void {
        throw new Error("Method not implemented.");
    }
    exceptionCaught(session: IoSession, err: Error): void {
        logger.error("报异常了", err)
    }
    sessionOpened(session: any) {
        logger.info("有人 成功建立连接了")
    }
    messageSent(session: IoSession, message: any): void {

    }
    messageReceived(session: IoSession, message: any): void {
        logger.info("接收到数据", message);
        session.write("我是服务器:" + message);
    }
}