import { i as inflate_1 } from "./pako.esm-68f84e2a.js";
import { aP as BaseDecoder } from "./index-b7e476f3.js";
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
