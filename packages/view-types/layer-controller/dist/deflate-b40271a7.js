import { i as inflate_1 } from "./pako.esm-68f84e2a.js";
import { B as BaseDecoder } from "./index-521b4503.js";
import "react";
import "@vitessce/vit-s";
import "react-dom";
class DeflateDecoder extends BaseDecoder {
  decodeBlock(buffer) {
    return inflate_1(new Uint8Array(buffer)).buffer;
  }
}
export {
  DeflateDecoder as default
};
