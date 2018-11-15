import IoSession from "./IoSession";
export default class SessionHandler {
    private sesionidStart: number = 1;
    private sessionMap: Map<any, IoSession> = new Map();
    private static _sessionHandler: SessionHandler = new SessionHandler();
    public static getMyWebSocketByWs(socket: any): IoSession {
        return SessionHandler._sessionHandler.sessionMap.get(socket);
    }
    public static pushWebSocket(socket: any, mySession: IoSession): IoSession {
        //let myWebSocket: MyWebSocket = new MyWebSocket(websocket, WebSocketSessionHandler._webSocketSessionHandler.sesionidStart, request.headers);
        SessionHandler._sessionHandler.sessionMap.set(socket, mySession);
        return mySession;
    }
    public static remove(socket: any) {
        SessionHandler._sessionHandler.sessionMap.delete(socket);
    }
    public static getSessionId(): number {
        SessionHandler._sessionHandler.sesionidStart = SessionHandler._sessionHandler.sesionidStart + 1;
        return SessionHandler._sessionHandler.sesionidStart;
    }
}