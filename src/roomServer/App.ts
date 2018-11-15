import * as Koa from 'koa';
import LoggerFactory from '../util/log/LoggerFactory';
import * as websockify from 'koa-websocket'
import * as  route from 'koa-route'
import * as WebSocket from "ws";
import SessionHandler from '../util/socket/session/SessionHandler';
import IoSession from '../util/socket/session/IoSession';
import WebSocketSession from '../util/socket/session/WebSocketSession';
import IOhandler from '../util/socket/handler/IOhandler';
import ProtocolCodecFactory from '../util/socket/codecfactory/ProtocolCodecFactory';
const logger = LoggerFactory.getLogger("App")
export default class App {
    private _koa: Koa = null;
    private static _app: App = null;
    constructor() {
        this._koa = websockify(new Koa());
        this._koa.on("error",(error)=>{
            logger.error("报错了", error)
        })
    }
    public static startServer(port: number, hostname?: string): Promise<boolean> {
        if (!App._app) {
            App._app = new App();
        }
        let self = App._app;
        return new Promise((re, rj) => {
            try {
                let server = self._koa.listen(port, hostname);
                server.on("error", (err: Error) => {
                    logger.error("启动失败了", err)
                    re(false);
                })
                server.on("listening", () => {
                    logger.info("启动成功了")
                    re(true)
                })
            } catch (error) {
                logger.error("启动失败了", error)
                re(false);
            }
        })
    }

    public startWebSocket(_iOhandler: IOhandler, _protocolCodecFactory: ProtocolCodecFactory) {
        let ws = (<any>(this._koa)).ws;
        ws.use(route.all('/', (ctx) => {
            logger.info(ctx.headers)
            let ioSession: IoSession = new WebSocketSession(_iOhandler, ctx.websocket, _protocolCodecFactory, SessionHandler.getSessionId());
            SessionHandler.pushWebSocket(ctx.websocket, ioSession)
            _iOhandler.sessionOpened(ioSession);
            ctx.websocket.onclose = (event: { wasClean: boolean; code: number; reason: string; target: WebSocket }) => {

            }
            ctx.websocket.onerror = (event: { error: any, message: string, type: string, target: WebSocket }) => {
                let session = SessionHandler.getMyWebSocketByWs(event.target);
                if (session) {
                    _iOhandler.exceptionCaught(session, event.error)
                }
            }
            ctx.websocket.onmessage = (event: { data: WebSocket.Data; type: string; target: WebSocket }) => {
                let session = SessionHandler.getMyWebSocketByWs(event.target);
                if (session) {
                    session.read(event.data);
                }
            }
        }));
    }
    public static getApp(): App {
        return App._app;
    }
}
