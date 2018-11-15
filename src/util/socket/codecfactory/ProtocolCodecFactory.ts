import ProtocolEncoder from "./ProtocolEncoder";
import ProtocolDecoder from "./ProtocolDecoder";
import IoSession from "../session/IoSession";
export default interface ProtocolCodecFactory {
    getEncoder(session: IoSession): ProtocolEncoder;
    getDecoder(session: IoSession): ProtocolDecoder;
}