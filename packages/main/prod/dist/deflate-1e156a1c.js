import { i as r } from "./pako.esm-a0be47a3.js";
import { aQ as o } from "./index-91e3ed45.js";
import "react";
import "react-dom";
class d extends o {
  decodeBlock(e) {
    return r(new Uint8Array(e)).buffer;
  }
}
export {
  d as default
};
