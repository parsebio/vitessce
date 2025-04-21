import { i as inflate_1 } from "./pako.esm-68f84e2a.js";
import { B as BaseDecoder } from "./index-5b330d29.js";
import "@vitessce/vit-s";
import "react";
class DeflateDecoder extends BaseDecoder {
  decodeBlock(buffer) {
    return inflate_1(new Uint8Array(buffer)).buffer;
  }
}
export {
  DeflateDecoder as default
};
