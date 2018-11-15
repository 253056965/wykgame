import ProtocolDecoder from "../../util/socket/codecfactory/ProtocolDecoder";
import IoSession from "../../util/socket/session/IoSession";

export default class FbProtocolDecoder implements ProtocolDecoder {
    decode(session: IoSession, message: any) {
        return message;
    }
}