import IoSession from "../session/IoSession";
export default interface ProtocolEncoder {
    encode(session: IoSession, message: any): any;
}