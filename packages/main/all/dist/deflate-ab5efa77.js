import { i as inflate_1 } from "./pako.esm-68f84e2a.js";
import { aP as BaseDecoder } from "./index-fed1aab3.js";
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
