import { i as inflate_1 } from "./pako.esm-68f84e2a.js";
import { B as BaseDecoder } from "./index-a85b4812.js";
import "react";
class DeflateDecoder extends BaseDecoder {
  decodeBlock(buffer) {
    return inflate_1(new Uint8Array(buffer)).buffer;
  }
}
export {
  DeflateDecoder as default
};
