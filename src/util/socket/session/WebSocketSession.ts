import IoSession from "./IoSession";
import * as WebSocket from "ws";
import IOhandler from "../handler/IOHandler";
import ProtocolCodecFactory from "../codecfactory/ProtocolCodecFactory";
export default class WebSocketSession implements IoSession {
    private dataMap: Map<string, any> = new Map();
    private _sessionId: number;
    private _websocket: WebSocket;
    private _iOhandler: IOhandler;
    private _protocolCodecFactory: ProtocolCodecFactory;
    constructor(_iOhandler: IOhandler, _websocket: WebSocket, _protocolCodecFactory: ProtocolCodecFactory, _sessionId: number) {
        this._sessionId = _sessionId;
        this._iOhandler = _iOhandler;
        this._websocket = _websocket;
        this._protocolCodecFactory = _protocolCodecFactory;
    }
    setData(key: string, value: any): void {
        this.dataMap.set(key, value);
    }
    getId(): number {
        return this._sessionId
    }
    write(message: any): void {
        let data = this._protocolCodecFactory.getEncoder(this).encode(this, message);
        let self = this;
        this._websocket.send(data, (err) => {
            if (err) {
                self._iOhandler.exceptionCaught(this, err);
            } else {
                self._iOhandler.messageSent(this, data);
            }
        })
    }
    getDataForkey(key: string): any {
        return this.dataMap.get(key);
    }
    getHandler(): IOhandler {
        return this._iOhandler;
    }
    removeDataForKey(key: string): void {
        this.dataMap.delete(key);
    }
    close(): void {
        this._websocket.close();
    }
    getRemotAddr(): string {
        return ""
    }
    read(message: any): void {
        let data = this._protocolCodecFactory.getDecoder(this).decode(this, message);
        let self = this;
        try {
            self._iOhandler.messageReceived(this, data);
        } catch (error) {
            self._iOhandler.exceptionCaught(this, error);
        }
    }
   public toString():string{
       return `sessionId:${this._sessionId}`
   }
}