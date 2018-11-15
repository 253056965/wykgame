import ProtocolEncoder from "../../util/socket/codecfactory/ProtocolEncoder";
import IoSession from "../../util/socket/session/IoSession";
export default class FbProtocolEncoder implements ProtocolEncoder {
    encode(session: IoSession, message: any): any {
        return message;
    }
}