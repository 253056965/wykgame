import IoSession from "../session/IoSession";
export default interface ProtocolDecoder {
    decode(session: IoSession, message: any): any;
}