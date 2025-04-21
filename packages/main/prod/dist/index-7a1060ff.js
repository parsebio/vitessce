import { g as kf, R as Ff, O as Wr, P as Xr, S as fa, a as kl, N as Bp, A as jp, V as ye, b as V, c as xo, L as Fl, T as da, d as Up, U as Hp, W as Vp, C as Gp, B as Wp, e as Xp, f as Kp, h as Da, M as po, i as _n, j as Yp, _ as Gn, k as Qp, G as lr, l as $e, m as qp, n as pa, o as Bf, p as jf, q as Uf, r as ba, E as Zp, s as Mr, t as Lr, Q as go, u as zc, v as Jp, w as ar, F as Hf, x as $p, y as eh, D as th, z as sr, H as Tn, I as nh, J as ka, K as rh, X as ih, Y as ki, Z as sh, $ as vo, a0 as Vf, a1 as ha, a2 as oh, a3 as lh, a4 as Fa, a5 as Gf, a6 as ah, a7 as uh, a8 as Wn, a9 as ch, aa as fh, ab as dh, ac as ph, ad as Wf, ae as hh, af as Xf, ag as mh, ah as gh, ai as vh, aj as yh, ak as xh, al as wh, am as Sh, an as _h, ao as Eh, ap as qr, aq as or, ar as Th, as as Oc, at as Ah, au as Ye, av as Jr, aw as Ph, ax as Ch, ay as Dc, az as ma, aA as Mh, aB as Lh, aC as ga, aD as bc, aE as Ui, aF as dn, aG as Rh, aH as Di, aI as Kf, aJ as re, aK as Nh, aL as Ft, aM as Ih, aN as zh, aO as Oh, aP as Dh } from "./index-91e3ed45.js";
import * as B from "react";
import bh, { useState as ht, useRef as pn, useEffect as Sn, useMemo as kh, forwardRef as Fh } from "react";
import "react-dom";
var Yf = { exports: {} }, fr = {};
/**
 * @license React
 * react-reconciler-constants.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
fr.ConcurrentRoot = 1;
fr.ContinuousEventPriority = 4;
fr.DefaultEventPriority = 16;
fr.DiscreteEventPriority = 1;
fr.IdleEventPriority = 536870912;
fr.LegacyRoot = 0;
Yf.exports = fr;
var Kr = Yf.exports, Qf = { exports: {} }, qf = { exports: {} }, Zf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(o) {
  function n(W, J) {
    var Z = W.length;
    W.push(J);
    e:
      for (; 0 < Z; ) {
        var te = Z - 1 >>> 1, ge = W[te];
        if (0 < l(ge, J))
          W[te] = J, W[Z] = ge, Z = te;
        else
          break e;
      }
  }
  function r(W) {
    return W.length === 0 ? null : W[0];
  }
  function i(W) {
    if (W.length === 0)
      return null;
    var J = W[0], Z = W.pop();
    if (Z !== J) {
      W[0] = Z;
      e:
        for (var te = 0, ge = W.length, xe = ge >>> 1; te < xe; ) {
          var Fe = 2 * (te + 1) - 1, it = W[Fe], gt = Fe + 1, se = W[gt];
          if (0 > l(it, Z))
            gt < ge && 0 > l(se, it) ? (W[te] = se, W[gt] = Z, te = gt) : (W[te] = it, W[Fe] = Z, te = Fe);
          else if (gt < ge && 0 > l(se, Z))
            W[te] = se, W[gt] = Z, te = gt;
          else
            break e;
        }
    }
    return J;
  }
  function l(W, J) {
    var Z = W.sortIndex - J.sortIndex;
    return Z !== 0 ? Z : W.id - J.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var u = performance;
    o.unstable_now = function() {
      return u.now();
    };
  } else {
    var a = Date, d = a.now();
    o.unstable_now = function() {
      return a.now() - d;
    };
  }
  var f = [], g = [], p = 1, m = null, v = 3, x = !1, _ = !1, P = !1, T = typeof setTimeout == "function" ? setTimeout : null, w = typeof clearTimeout == "function" ? clearTimeout : null, S = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function E(W) {
    for (var J = r(g); J !== null; ) {
      if (J.callback === null)
        i(g);
      else if (J.startTime <= W)
        i(g), J.sortIndex = J.expirationTime, n(f, J);
      else
        break;
      J = r(g);
    }
  }
  function A(W) {
    if (P = !1, E(W), !_)
      if (r(f) !== null)
        _ = !0, ae(M);
      else {
        var J = r(g);
        J !== null && Se(A, J.startTime - W);
      }
  }
  function M(W, J) {
    _ = !1, P && (P = !1, w(z), z = -1), x = !0;
    var Z = v;
    try {
      for (E(J), m = r(f); m !== null && (!(m.expirationTime > J) || W && !k()); ) {
        var te = m.callback;
        if (typeof te == "function") {
          m.callback = null, v = m.priorityLevel;
          var ge = te(m.expirationTime <= J);
          J = o.unstable_now(), typeof ge == "function" ? m.callback = ge : m === r(f) && i(f), E(J);
        } else
          i(f);
        m = r(f);
      }
      if (m !== null)
        var xe = !0;
      else {
        var Fe = r(g);
        Fe !== null && Se(A, Fe.startTime - J), xe = !1;
      }
      return xe;
    } finally {
      m = null, v = Z, x = !1;
    }
  }
  var L = !1, R = null, z = -1, b = 5, I = -1;
  function k() {
    return !(o.unstable_now() - I < b);
  }
  function j() {
    if (R !== null) {
      var W = o.unstable_now();
      I = W;
      var J = !0;
      try {
        J = R(!0, W);
      } finally {
        J ? G() : (L = !1, R = null);
      }
    } else
      L = !1;
  }
  var G;
  if (typeof S == "function")
    G = function() {
      S(j);
    };
  else if (typeof MessageChannel < "u") {
    var Y = new MessageChannel(), ee = Y.port2;
    Y.port1.onmessage = j, G = function() {
      ee.postMessage(null);
    };
  } else
    G = function() {
      T(j, 0);
    };
  function ae(W) {
    R = W, L || (L = !0, G());
  }
  function Se(W, J) {
    z = T(function() {
      W(o.unstable_now());
    }, J);
  }
  o.unstable_IdlePriority = 5, o.unstable_ImmediatePriority = 1, o.unstable_LowPriority = 4, o.unstable_NormalPriority = 3, o.unstable_Profiling = null, o.unstable_UserBlockingPriority = 2, o.unstable_cancelCallback = function(W) {
    W.callback = null;
  }, o.unstable_continueExecution = function() {
    _ || x || (_ = !0, ae(M));
  }, o.unstable_forceFrameRate = function(W) {
    0 > W || 125 < W ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : b = 0 < W ? Math.floor(1e3 / W) : 5;
  }, o.unstable_getCurrentPriorityLevel = function() {
    return v;
  }, o.unstable_getFirstCallbackNode = function() {
    return r(f);
  }, o.unstable_next = function(W) {
    switch (v) {
      case 1:
      case 2:
      case 3:
        var J = 3;
        break;
      default:
        J = v;
    }
    var Z = v;
    v = J;
    try {
      return W();
    } finally {
      v = Z;
    }
  }, o.unstable_pauseExecution = function() {
  }, o.unstable_requestPaint = function() {
  }, o.unstable_runWithPriority = function(W, J) {
    switch (W) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        W = 3;
    }
    var Z = v;
    v = W;
    try {
      return J();
    } finally {
      v = Z;
    }
  }, o.unstable_scheduleCallback = function(W, J, Z) {
    var te = o.unstable_now();
    switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? te + Z : te) : Z = te, W) {
      case 1:
        var ge = -1;
        break;
      case 2:
        ge = 250;
        break;
      case 5:
        ge = 1073741823;
        break;
      case 4:
        ge = 1e4;
        break;
      default:
        ge = 5e3;
    }
    return ge = Z + ge, W = { id: p++, callback: J, priorityLevel: W, startTime: Z, expirationTime: ge, sortIndex: -1 }, Z > te ? (W.sortIndex = Z, n(g, W), r(f) === null && W === r(g) && (P ? (w(z), z = -1) : P = !0, Se(A, Z - te))) : (W.sortIndex = ge, n(f, W), _ || x || (_ = !0, ae(M))), W;
  }, o.unstable_shouldYield = k, o.unstable_wrapCallback = function(W) {
    var J = v;
    return function() {
      var Z = v;
      v = J;
      try {
        return W.apply(this, arguments);
      } finally {
        v = Z;
      }
    };
  };
})(Zf);
qf.exports = Zf;
var va = qf.exports;
/**
 * @license React
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bh = function(n) {
  var r = {}, i = bh, l = va, u = Object.assign;
  function a(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, s = 1; s < arguments.length; s++)
      t += "&args[]=" + encodeURIComponent(arguments[s]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var d = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, f = Symbol.for("react.element"), g = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), _ = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), w = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), A = Symbol.for("react.offscreen"), M = Symbol.iterator;
  function L(e) {
    return e === null || typeof e != "object" ? null : (e = M && e[M] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  function R(e) {
    if (e == null)
      return null;
    if (typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case p:
        return "Fragment";
      case g:
        return "Portal";
      case v:
        return "Profiler";
      case m:
        return "StrictMode";
      case T:
        return "Suspense";
      case w:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case _:
          return (e.displayName || "Context") + ".Consumer";
        case x:
          return (e._context.displayName || "Context") + ".Provider";
        case P:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case S:
          return t = e.displayName || null, t !== null ? t : R(e.type) || "Memo";
        case E:
          t = e._payload, e = e._init;
          try {
            return R(e(t));
          } catch {
          }
      }
    return null;
  }
  function z(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return R(t);
      case 8:
        return t === m ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function")
          return t.displayName || t.name || null;
        if (typeof t == "string")
          return t;
    }
    return null;
  }
  function b(e) {
    var t = e, s = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      e = t;
      do
        t = e, t.flags & 4098 && (s = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? s : null;
  }
  function I(e) {
    if (b(e) !== e)
      throw Error(a(188));
  }
  function k(e) {
    var t = e.alternate;
    if (!t) {
      if (t = b(e), t === null)
        throw Error(a(188));
      return t !== e ? null : e;
    }
    for (var s = e, c = t; ; ) {
      var h = s.return;
      if (h === null)
        break;
      var y = h.alternate;
      if (y === null) {
        if (c = h.return, c !== null) {
          s = c;
          continue;
        }
        break;
      }
      if (h.child === y.child) {
        for (y = h.child; y; ) {
          if (y === s)
            return I(h), e;
          if (y === c)
            return I(h), t;
          y = y.sibling;
        }
        throw Error(a(188));
      }
      if (s.return !== c.return)
        s = h, c = y;
      else {
        for (var C = !1, N = h.child; N; ) {
          if (N === s) {
            C = !0, s = h, c = y;
            break;
          }
          if (N === c) {
            C = !0, c = h, s = y;
            break;
          }
          N = N.sibling;
        }
        if (!C) {
          for (N = y.child; N; ) {
            if (N === s) {
              C = !0, s = y, c = h;
              break;
            }
            if (N === c) {
              C = !0, c = y, s = h;
              break;
            }
            N = N.sibling;
          }
          if (!C)
            throw Error(a(189));
        }
      }
      if (s.alternate !== c)
        throw Error(a(190));
    }
    if (s.tag !== 3)
      throw Error(a(188));
    return s.stateNode.current === s ? e : t;
  }
  function j(e) {
    return e = k(e), e !== null ? G(e) : null;
  }
  function G(e) {
    if (e.tag === 5 || e.tag === 6)
      return e;
    for (e = e.child; e !== null; ) {
      var t = G(e);
      if (t !== null)
        return t;
      e = e.sibling;
    }
    return null;
  }
  function Y(e) {
    if (e.tag === 5 || e.tag === 6)
      return e;
    for (e = e.child; e !== null; ) {
      if (e.tag !== 4) {
        var t = Y(e);
        if (t !== null)
          return t;
      }
      e = e.sibling;
    }
    return null;
  }
  var ee = Array.isArray, ae = n.getPublicInstance, Se = n.getRootHostContext, W = n.getChildHostContext, J = n.prepareForCommit, Z = n.resetAfterCommit, te = n.createInstance, ge = n.appendInitialChild, xe = n.finalizeInitialChildren, Fe = n.prepareUpdate, it = n.shouldSetTextContent, gt = n.createTextInstance, se = n.scheduleTimeout, fe = n.cancelTimeout, le = n.noTimeout, Me = n.isPrimaryRenderer, Pe = n.supportsMutation, Ve = n.supportsPersistence, ue = n.supportsHydration, Ie = n.getInstanceFromNode, st = n.preparePortalMount, vt = n.getCurrentEventPriority, Vi = n.detachDeletedInstance, Gi = n.supportsMicrotasks, _o = n.scheduleMicrotask, Kn = n.supportsTestSelectors, Wi = n.findFiberRoot, ei = n.getBoundingRect, ti = n.getTextContent, An = n.isHiddenSubtree, Eo = n.matchAccessibilityRole, To = n.setFocusIfFocusable, Xi = n.setupIntersectionObserver, ni = n.appendChild, Ao = n.appendChildToContainer, Po = n.commitTextUpdate, Ki = n.commitMount, Co = n.commitUpdate, Yi = n.insertBefore, Qi = n.insertInContainerBefore, ri = n.removeChild, D = n.removeChildFromContainer, K = n.resetTextContent, ce = n.hideInstance, _e = n.hideTextInstance, Ge = n.unhideInstance, Wt = n.unhideTextInstance, $t = n.clearContainer, qa = n.cloneInstance, ii = n.createContainerChildSet, Lt = n.appendChildToContainerChildSet, Xt = n.finalizeContainerChildren, Pn = n.replaceContainerChildren, Cn = n.cloneHiddenInstance, Mn = n.cloneHiddenTextInstance, pr = n.canHydrateInstance, Nd = n.canHydrateTextInstance, Id = n.canHydrateSuspenseInstance, Za = n.isSuspenseInstancePending, Mo = n.isSuspenseInstanceFallback, zd = n.registerSuspenseInstanceRetry, si = n.getNextHydratableSibling, Od = n.getFirstHydratableChild, Dd = n.getFirstHydratableChildWithinContainer, bd = n.getFirstHydratableChildWithinSuspenseInstance, kd = n.hydrateInstance, Fd = n.hydrateTextInstance, Bd = n.hydrateSuspenseInstance, jd = n.getNextHydratableInstanceAfterSuspenseInstance, Ja = n.commitHydratedContainer, Ud = n.commitHydratedSuspenseInstance, Hd = n.clearSuspenseBoundary, Vd = n.clearSuspenseBoundaryFromContainer, Gd = n.shouldDeleteUnhydratedTailInstances, Wd = n.didNotMatchHydratedContainerTextInstance, Xd = n.didNotMatchHydratedTextInstance, Lo;
  function oi(e) {
    if (Lo === void 0)
      try {
        throw Error();
      } catch (s) {
        var t = s.stack.trim().match(/\n( *(at )?)/);
        Lo = t && t[1] || "";
      }
    return `
` + Lo + e;
  }
  var Ro = !1;
  function No(e, t) {
    if (!e || Ro)
      return "";
    Ro = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (t = function() {
          throw Error();
        }, Object.defineProperty(t.prototype, "props", { set: function() {
          throw Error();
        } }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(t, []);
          } catch (X) {
            var c = X;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (X) {
            c = X;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (X) {
          c = X;
        }
        e();
      }
    } catch (X) {
      if (X && c && typeof X.stack == "string") {
        for (var h = X.stack.split(`
`), y = c.stack.split(`
`), C = h.length - 1, N = y.length - 1; 1 <= C && 0 <= N && h[C] !== y[N]; )
          N--;
        for (; 1 <= C && 0 <= N; C--, N--)
          if (h[C] !== y[N]) {
            if (C !== 1 || N !== 1)
              do
                if (C--, N--, 0 > N || h[C] !== y[N]) {
                  var H = `
` + h[C].replace(" at new ", " at ");
                  return e.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", e.displayName)), H;
                }
              while (1 <= C && 0 <= N);
            break;
          }
      }
    } finally {
      Ro = !1, Error.prepareStackTrace = s;
    }
    return (e = e ? e.displayName || e.name : "") ? oi(e) : "";
  }
  var Kd = Object.prototype.hasOwnProperty, Io = [], hr = -1;
  function Ln(e) {
    return { current: e };
  }
  function Re(e) {
    0 > hr || (e.current = Io[hr], Io[hr] = null, hr--);
  }
  function Le(e, t) {
    hr++, Io[hr] = e.current, e.current = t;
  }
  var Rn = {}, ot = Ln(Rn), yt = Ln(!1), Yn = Rn;
  function mr(e, t) {
    var s = e.type.contextTypes;
    if (!s)
      return Rn;
    var c = e.stateNode;
    if (c && c.__reactInternalMemoizedUnmaskedChildContext === t)
      return c.__reactInternalMemoizedMaskedChildContext;
    var h = {}, y;
    for (y in s)
      h[y] = t[y];
    return c && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = h), h;
  }
  function xt(e) {
    return e = e.childContextTypes, e != null;
  }
  function qi() {
    Re(yt), Re(ot);
  }
  function $a(e, t, s) {
    if (ot.current !== Rn)
      throw Error(a(168));
    Le(ot, t), Le(yt, s);
  }
  function eu(e, t, s) {
    var c = e.stateNode;
    if (t = t.childContextTypes, typeof c.getChildContext != "function")
      return s;
    c = c.getChildContext();
    for (var h in c)
      if (!(h in t))
        throw Error(a(108, z(e) || "Unknown", h));
    return u({}, s, c);
  }
  function Zi(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Rn, Yn = ot.current, Le(ot, e), Le(yt, yt.current), !0;
  }
  function tu(e, t, s) {
    var c = e.stateNode;
    if (!c)
      throw Error(a(169));
    s ? (e = eu(e, t, Yn), c.__reactInternalMemoizedMergedChildContext = e, Re(yt), Re(ot), Le(ot, e)) : Re(yt), Le(yt, s);
  }
  var Kt = Math.clz32 ? Math.clz32 : qd, Yd = Math.log, Qd = Math.LN2;
  function qd(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Yd(e) / Qd | 0) | 0;
  }
  var Ji = 64, $i = 4194304;
  function li(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function es(e, t) {
    var s = e.pendingLanes;
    if (s === 0)
      return 0;
    var c = 0, h = e.suspendedLanes, y = e.pingedLanes, C = s & 268435455;
    if (C !== 0) {
      var N = C & ~h;
      N !== 0 ? c = li(N) : (y &= C, y !== 0 && (c = li(y)));
    } else
      C = s & ~h, C !== 0 ? c = li(C) : y !== 0 && (c = li(y));
    if (c === 0)
      return 0;
    if (t !== 0 && t !== c && !(t & h) && (h = c & -c, y = t & -t, h >= y || h === 16 && (y & 4194240) !== 0))
      return t;
    if (c & 4 && (c |= s & 16), t = e.entangledLanes, t !== 0)
      for (e = e.entanglements, t &= c; 0 < t; )
        s = 31 - Kt(t), h = 1 << s, c |= e[s], t &= ~h;
    return c;
  }
  function Zd(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Jd(e, t) {
    for (var s = e.suspendedLanes, c = e.pingedLanes, h = e.expirationTimes, y = e.pendingLanes; 0 < y; ) {
      var C = 31 - Kt(y), N = 1 << C, H = h[C];
      H === -1 ? (!(N & s) || N & c) && (h[C] = Zd(N, t)) : H <= t && (e.expiredLanes |= N), y &= ~N;
    }
  }
  function zo(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Oo(e) {
    for (var t = [], s = 0; 31 > s; s++)
      t.push(e);
    return t;
  }
  function ai(e, t, s) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Kt(t), e[t] = s;
  }
  function $d(e, t) {
    var s = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var c = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var h = 31 - Kt(s), y = 1 << h;
      t[h] = 0, c[h] = -1, e[h] = -1, s &= ~y;
    }
  }
  function Do(e, t) {
    var s = e.entangledLanes |= t;
    for (e = e.entanglements; s; ) {
      var c = 31 - Kt(s), h = 1 << c;
      h & t | e[c] & t && (e[c] |= t), s &= ~h;
    }
  }
  var Ee = 0;
  function nu(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var bo = l.unstable_scheduleCallback, ru = l.unstable_cancelCallback, ep = l.unstable_shouldYield, tp = l.unstable_requestPaint, qe = l.unstable_now, ko = l.unstable_ImmediatePriority, np = l.unstable_UserBlockingPriority, Fo = l.unstable_NormalPriority, rp = l.unstable_IdlePriority, ts = null, en = null;
  function ip(e) {
    if (en && typeof en.onCommitFiberRoot == "function")
      try {
        en.onCommitFiberRoot(ts, e, void 0, (e.current.flags & 128) === 128);
      } catch {
      }
  }
  function sp(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var tn = typeof Object.is == "function" ? Object.is : sp, hn = null, ns = !1, Bo = !1;
  function iu(e) {
    hn === null ? hn = [e] : hn.push(e);
  }
  function op(e) {
    ns = !0, iu(e);
  }
  function nn() {
    if (!Bo && hn !== null) {
      Bo = !0;
      var e = 0, t = Ee;
      try {
        var s = hn;
        for (Ee = 1; e < s.length; e++) {
          var c = s[e];
          do
            c = c(!0);
          while (c !== null);
        }
        hn = null, ns = !1;
      } catch (h) {
        throw hn !== null && (hn = hn.slice(e + 1)), bo(ko, nn), h;
      } finally {
        Ee = t, Bo = !1;
      }
    }
    return null;
  }
  var lp = d.ReactCurrentBatchConfig;
  function rs(e, t) {
    if (tn(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var s = Object.keys(e), c = Object.keys(t);
    if (s.length !== c.length)
      return !1;
    for (c = 0; c < s.length; c++) {
      var h = s[c];
      if (!Kd.call(t, h) || !tn(e[h], t[h]))
        return !1;
    }
    return !0;
  }
  function ap(e) {
    switch (e.tag) {
      case 5:
        return oi(e.type);
      case 16:
        return oi("Lazy");
      case 13:
        return oi("Suspense");
      case 19:
        return oi("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = No(e.type, !1), e;
      case 11:
        return e = No(e.type.render, !1), e;
      case 1:
        return e = No(e.type, !0), e;
      default:
        return "";
    }
  }
  function Yt(e, t) {
    if (e && e.defaultProps) {
      t = u({}, t), e = e.defaultProps;
      for (var s in e)
        t[s] === void 0 && (t[s] = e[s]);
      return t;
    }
    return t;
  }
  var is = Ln(null), ss = null, gr = null, jo = null;
  function Uo() {
    jo = gr = ss = null;
  }
  function su(e, t, s) {
    Me ? (Le(is, t._currentValue), t._currentValue = s) : (Le(is, t._currentValue2), t._currentValue2 = s);
  }
  function Ho(e) {
    var t = is.current;
    Re(is), Me ? e._currentValue = t : e._currentValue2 = t;
  }
  function Vo(e, t, s) {
    for (; e !== null; ) {
      var c = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, c !== null && (c.childLanes |= t)) : c !== null && (c.childLanes & t) !== t && (c.childLanes |= t), e === s)
        break;
      e = e.return;
    }
  }
  function vr(e, t) {
    ss = e, jo = gr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Pt = !0), e.firstContext = null);
  }
  function Rt(e) {
    var t = Me ? e._currentValue : e._currentValue2;
    if (jo !== e)
      if (e = { context: e, memoizedValue: t, next: null }, gr === null) {
        if (ss === null)
          throw Error(a(308));
        gr = e, ss.dependencies = { lanes: 0, firstContext: e };
      } else
        gr = gr.next = e;
    return t;
  }
  var rn = null, Nn = !1;
  function Go(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function ou(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function mn(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function In(e, t) {
    var s = e.updateQueue;
    s !== null && (s = s.shared, We !== null && e.mode & 1 && !(ve & 2) ? (e = s.interleaved, e === null ? (t.next = t, rn === null ? rn = [s] : rn.push(s)) : (t.next = e.next, e.next = t), s.interleaved = t) : (e = s.pending, e === null ? t.next = t : (t.next = e.next, e.next = t), s.pending = t));
  }
  function os(e, t, s) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (s & 4194240) !== 0)) {
      var c = t.lanes;
      c &= e.pendingLanes, s |= c, t.lanes = s, Do(e, s);
    }
  }
  function lu(e, t) {
    var s = e.updateQueue, c = e.alternate;
    if (c !== null && (c = c.updateQueue, s === c)) {
      var h = null, y = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var C = { eventTime: s.eventTime, lane: s.lane, tag: s.tag, payload: s.payload, callback: s.callback, next: null };
          y === null ? h = y = C : y = y.next = C, s = s.next;
        } while (s !== null);
        y === null ? h = y = t : y = y.next = t;
      } else
        h = y = t;
      s = { baseState: c.baseState, firstBaseUpdate: h, lastBaseUpdate: y, shared: c.shared, effects: c.effects }, e.updateQueue = s;
      return;
    }
    e = s.lastBaseUpdate, e === null ? s.firstBaseUpdate = t : e.next = t, s.lastBaseUpdate = t;
  }
  function ls(e, t, s, c) {
    var h = e.updateQueue;
    Nn = !1;
    var y = h.firstBaseUpdate, C = h.lastBaseUpdate, N = h.shared.pending;
    if (N !== null) {
      h.shared.pending = null;
      var H = N, X = H.next;
      H.next = null, C === null ? y = X : C.next = X, C = H;
      var $ = e.alternate;
      $ !== null && ($ = $.updateQueue, N = $.lastBaseUpdate, N !== C && (N === null ? $.firstBaseUpdate = X : N.next = X, $.lastBaseUpdate = H));
    }
    if (y !== null) {
      var pe = h.baseState;
      C = 0, $ = X = H = null, N = y;
      do {
        var oe = N.lane, Ce = N.eventTime;
        if ((c & oe) === oe) {
          $ !== null && ($ = $.next = {
            eventTime: Ce,
            lane: 0,
            tag: N.tag,
            payload: N.payload,
            callback: N.callback,
            next: null
          });
          e: {
            var ie = e, ct = N;
            switch (oe = t, Ce = s, ct.tag) {
              case 1:
                if (ie = ct.payload, typeof ie == "function") {
                  pe = ie.call(Ce, pe, oe);
                  break e;
                }
                pe = ie;
                break e;
              case 3:
                ie.flags = ie.flags & -65537 | 128;
              case 0:
                if (ie = ct.payload, oe = typeof ie == "function" ? ie.call(Ce, pe, oe) : ie, oe == null)
                  break e;
                pe = u({}, pe, oe);
                break e;
              case 2:
                Nn = !0;
            }
          }
          N.callback !== null && N.lane !== 0 && (e.flags |= 64, oe = h.effects, oe === null ? h.effects = [N] : oe.push(N));
        } else
          Ce = { eventTime: Ce, lane: oe, tag: N.tag, payload: N.payload, callback: N.callback, next: null }, $ === null ? (X = $ = Ce, H = pe) : $ = $.next = Ce, C |= oe;
        if (N = N.next, N === null) {
          if (N = h.shared.pending, N === null)
            break;
          oe = N, N = oe.next, oe.next = null, h.lastBaseUpdate = oe, h.shared.pending = null;
        }
      } while (1);
      if ($ === null && (H = pe), h.baseState = H, h.firstBaseUpdate = X, h.lastBaseUpdate = $, t = h.shared.interleaved, t !== null) {
        h = t;
        do
          C |= h.lane, h = h.next;
        while (h !== t);
      } else
        y === null && (h.shared.lanes = 0);
      Pr |= C, e.lanes = C, e.memoizedState = pe;
    }
  }
  function au(e, t, s) {
    if (e = t.effects, t.effects = null, e !== null)
      for (t = 0; t < e.length; t++) {
        var c = e[t], h = c.callback;
        if (h !== null) {
          if (c.callback = null, c = s, typeof h != "function")
            throw Error(a(191, h));
          h.call(c);
        }
      }
  }
  var uu = new i.Component().refs;
  function Wo(e, t, s, c) {
    t = e.memoizedState, s = s(c, t), s = s == null ? t : u({}, t, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var as = { isMounted: function(e) {
    return (e = e._reactInternals) ? b(e) === e : !1;
  }, enqueueSetState: function(e, t, s) {
    e = e._reactInternals;
    var c = pt(), h = Dn(e), y = mn(c, h);
    y.payload = t, s != null && (y.callback = s), In(e, y), t = Dt(e, h, c), t !== null && os(t, e, h);
  }, enqueueReplaceState: function(e, t, s) {
    e = e._reactInternals;
    var c = pt(), h = Dn(e), y = mn(c, h);
    y.tag = 1, y.payload = t, s != null && (y.callback = s), In(e, y), t = Dt(e, h, c), t !== null && os(t, e, h);
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var s = pt(), c = Dn(e), h = mn(
      s,
      c
    );
    h.tag = 2, t != null && (h.callback = t), In(e, h), t = Dt(e, c, s), t !== null && os(t, e, c);
  } };
  function cu(e, t, s, c, h, y, C) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(c, y, C) : t.prototype && t.prototype.isPureReactComponent ? !rs(s, c) || !rs(h, y) : !0;
  }
  function fu(e, t, s) {
    var c = !1, h = Rn, y = t.contextType;
    return typeof y == "object" && y !== null ? y = Rt(y) : (h = xt(t) ? Yn : ot.current, c = t.contextTypes, y = (c = c != null) ? mr(e, h) : Rn), t = new t(s, y), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = as, e.stateNode = t, t._reactInternals = e, c && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = h, e.__reactInternalMemoizedMaskedChildContext = y), t;
  }
  function du(e, t, s, c) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(s, c), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(s, c), t.state !== e && as.enqueueReplaceState(t, t.state, null);
  }
  function Xo(e, t, s, c) {
    var h = e.stateNode;
    h.props = s, h.state = e.memoizedState, h.refs = uu, Go(e);
    var y = t.contextType;
    typeof y == "object" && y !== null ? h.context = Rt(y) : (y = xt(t) ? Yn : ot.current, h.context = mr(e, y)), h.state = e.memoizedState, y = t.getDerivedStateFromProps, typeof y == "function" && (Wo(e, t, y, s), h.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (t = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), t !== h.state && as.enqueueReplaceState(h, h.state, null), ls(e, s, h, c), h.state = e.memoizedState), typeof h.componentDidMount == "function" && (e.flags |= 4194308);
  }
  var yr = [], xr = 0, us = null, cs = 0, Nt = [], It = 0, Qn = null, gn = 1, vn = "";
  function qn(e, t) {
    yr[xr++] = cs, yr[xr++] = us, us = e, cs = t;
  }
  function pu(e, t, s) {
    Nt[It++] = gn, Nt[It++] = vn, Nt[It++] = Qn, Qn = e;
    var c = gn;
    e = vn;
    var h = 32 - Kt(c) - 1;
    c &= ~(1 << h), s += 1;
    var y = 32 - Kt(t) + h;
    if (30 < y) {
      var C = h - h % 5;
      y = (c & (1 << C) - 1).toString(32), c >>= C, h -= C, gn = 1 << 32 - Kt(t) + h | s << h | c, vn = y + e;
    } else
      gn = 1 << y | s << h | c, vn = e;
  }
  function Ko(e) {
    e.return !== null && (qn(e, 1), pu(e, 1, 0));
  }
  function Yo(e) {
    for (; e === us; )
      us = yr[--xr], yr[xr] = null, cs = yr[--xr], yr[xr] = null;
    for (; e === Qn; )
      Qn = Nt[--It], Nt[It] = null, vn = Nt[--It], Nt[It] = null, gn = Nt[--It], Nt[It] = null;
  }
  var Tt = null, At = null, ze = !1, ui = !1, Qt = null;
  function hu(e, t) {
    var s = bt(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = t, s.return = e, t = e.deletions, t === null ? (e.deletions = [s], e.flags |= 16) : t.push(s);
  }
  function mu(e, t) {
    switch (e.tag) {
      case 5:
        return t = pr(t, e.type, e.pendingProps), t !== null ? (e.stateNode = t, Tt = e, At = Od(t), !0) : !1;
      case 6:
        return t = Nd(t, e.pendingProps), t !== null ? (e.stateNode = t, Tt = e, At = null, !0) : !1;
      case 13:
        if (t = Id(t), t !== null) {
          var s = Qn !== null ? { id: gn, overflow: vn } : null;
          return e.memoizedState = { dehydrated: t, treeContext: s, retryLane: 1073741824 }, s = bt(18, null, null, 0), s.stateNode = t, s.return = e, e.child = s, Tt = e, At = null, !0;
        }
        return !1;
      default:
        return !1;
    }
  }
  function Qo(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function qo(e) {
    if (ze) {
      var t = At;
      if (t) {
        var s = t;
        if (!mu(e, t)) {
          if (Qo(e))
            throw Error(a(418));
          t = si(s);
          var c = Tt;
          t && mu(e, t) ? hu(c, s) : (e.flags = e.flags & -4097 | 2, ze = !1, Tt = e);
        }
      } else {
        if (Qo(e))
          throw Error(a(418));
        e.flags = e.flags & -4097 | 2, ze = !1, Tt = e;
      }
    }
  }
  function gu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
      e = e.return;
    Tt = e;
  }
  function ci(e) {
    if (!ue || e !== Tt)
      return !1;
    if (!ze)
      return gu(e), ze = !0, !1;
    if (e.tag !== 3 && (e.tag !== 5 || Gd(e.type) && !it(e.type, e.memoizedProps))) {
      var t = At;
      if (t) {
        if (Qo(e)) {
          for (e = At; e; )
            e = si(e);
          throw Error(a(418));
        }
        for (; t; )
          hu(e, t), t = si(t);
      }
    }
    if (gu(e), e.tag === 13) {
      if (!ue)
        throw Error(a(316));
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
        throw Error(a(317));
      At = jd(e);
    } else
      At = Tt ? si(e.stateNode) : null;
    return !0;
  }
  function wr() {
    ue && (At = Tt = null, ui = ze = !1);
  }
  function Zo(e) {
    Qt === null ? Qt = [e] : Qt.push(e);
  }
  function fi(e, t, s) {
    if (e = s.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (s._owner) {
        if (s = s._owner, s) {
          if (s.tag !== 1)
            throw Error(a(309));
          var c = s.stateNode;
        }
        if (!c)
          throw Error(a(147, e));
        var h = c, y = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === y ? t.ref : (t = function(C) {
          var N = h.refs;
          N === uu && (N = h.refs = {}), C === null ? delete N[y] : N[y] = C;
        }, t._stringRef = y, t);
      }
      if (typeof e != "string")
        throw Error(a(284));
      if (!s._owner)
        throw Error(a(290, e));
    }
    return e;
  }
  function fs(e, t) {
    throw e = Object.prototype.toString.call(t), Error(a(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function vu(e) {
    var t = e._init;
    return t(e._payload);
  }
  function yu(e) {
    function t(F, O) {
      if (e) {
        var U = F.deletions;
        U === null ? (F.deletions = [O], F.flags |= 16) : U.push(O);
      }
    }
    function s(F, O) {
      if (!e)
        return null;
      for (; O !== null; )
        t(F, O), O = O.sibling;
      return null;
    }
    function c(F, O) {
      for (F = /* @__PURE__ */ new Map(); O !== null; )
        O.key !== null ? F.set(O.key, O) : F.set(O.index, O), O = O.sibling;
      return F;
    }
    function h(F, O) {
      return F = kn(F, O), F.index = 0, F.sibling = null, F;
    }
    function y(F, O, U) {
      return F.index = U, e ? (U = F.alternate, U !== null ? (U = U.index, U < O ? (F.flags |= 2, O) : U) : (F.flags |= 2, O)) : (F.flags |= 1048576, O);
    }
    function C(F) {
      return e && F.alternate === null && (F.flags |= 2), F;
    }
    function N(F, O, U, q) {
      return O === null || O.tag !== 6 ? (O = Ol(U, F.mode, q), O.return = F, O) : (O = h(O, U), O.return = F, O);
    }
    function H(F, O, U, q) {
      var ne = U.type;
      return ne === p ? $(F, O, U.props.children, q, U.key) : O !== null && (O.elementType === ne || typeof ne == "object" && ne !== null && ne.$$typeof === E && vu(ne) === O.type) ? (q = h(O, U.props), q.ref = fi(F, O, U), q.return = F, q) : (q = Hs(U.type, U.key, U.props, null, F.mode, q), q.ref = fi(F, O, U), q.return = F, q);
    }
    function X(F, O, U, q) {
      return O === null || O.tag !== 4 || O.stateNode.containerInfo !== U.containerInfo || O.stateNode.implementation !== U.implementation ? (O = Dl(U, F.mode, q), O.return = F, O) : (O = h(O, U.children || []), O.return = F, O);
    }
    function $(F, O, U, q, ne) {
      return O === null || O.tag !== 7 ? (O = rr(U, F.mode, q, ne), O.return = F, O) : (O = h(O, U), O.return = F, O);
    }
    function pe(F, O, U) {
      if (typeof O == "string" && O !== "" || typeof O == "number")
        return O = Ol("" + O, F.mode, U), O.return = F, O;
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case f:
            return U = Hs(O.type, O.key, O.props, null, F.mode, U), U.ref = fi(F, null, O), U.return = F, U;
          case g:
            return O = Dl(O, F.mode, U), O.return = F, O;
          case E:
            var q = O._init;
            return pe(F, q(O._payload), U);
        }
        if (ee(O) || L(O))
          return O = rr(O, F.mode, U, null), O.return = F, O;
        fs(F, O);
      }
      return null;
    }
    function oe(F, O, U, q) {
      var ne = O !== null ? O.key : null;
      if (typeof U == "string" && U !== "" || typeof U == "number")
        return ne !== null ? null : N(F, O, "" + U, q);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case f:
            return U.key === ne ? H(F, O, U, q) : null;
          case g:
            return U.key === ne ? X(F, O, U, q) : null;
          case E:
            return ne = U._init, oe(
              F,
              O,
              ne(U._payload),
              q
            );
        }
        if (ee(U) || L(U))
          return ne !== null ? null : $(F, O, U, q, null);
        fs(F, U);
      }
      return null;
    }
    function Ce(F, O, U, q, ne) {
      if (typeof q == "string" && q !== "" || typeof q == "number")
        return F = F.get(U) || null, N(O, F, "" + q, ne);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case f:
            return F = F.get(q.key === null ? U : q.key) || null, H(O, F, q, ne);
          case g:
            return F = F.get(q.key === null ? U : q.key) || null, X(O, F, q, ne);
          case E:
            var me = q._init;
            return Ce(F, O, U, me(q._payload), ne);
        }
        if (ee(q) || L(q))
          return F = F.get(U) || null, $(O, F, q, ne, null);
        fs(O, q);
      }
      return null;
    }
    function ie(F, O, U, q) {
      for (var ne = null, me = null, he = O, Te = O = 0, Je = null; he !== null && Te < U.length; Te++) {
        he.index > Te ? (Je = he, he = null) : Je = he.sibling;
        var Ae = oe(F, he, U[Te], q);
        if (Ae === null) {
          he === null && (he = Je);
          break;
        }
        e && he && Ae.alternate === null && t(F, he), O = y(Ae, O, Te), me === null ? ne = Ae : me.sibling = Ae, me = Ae, he = Je;
      }
      if (Te === U.length)
        return s(F, he), ze && qn(F, Te), ne;
      if (he === null) {
        for (; Te < U.length; Te++)
          he = pe(F, U[Te], q), he !== null && (O = y(he, O, Te), me === null ? ne = he : me.sibling = he, me = he);
        return ze && qn(F, Te), ne;
      }
      for (he = c(F, he); Te < U.length; Te++)
        Je = Ce(he, F, Te, U[Te], q), Je !== null && (e && Je.alternate !== null && he.delete(Je.key === null ? Te : Je.key), O = y(Je, O, Te), me === null ? ne = Je : me.sibling = Je, me = Je);
      return e && he.forEach(function(Fn) {
        return t(F, Fn);
      }), ze && qn(F, Te), ne;
    }
    function ct(F, O, U, q) {
      var ne = L(U);
      if (typeof ne != "function")
        throw Error(a(150));
      if (U = ne.call(U), U == null)
        throw Error(a(151));
      for (var me = ne = null, he = O, Te = O = 0, Je = null, Ae = U.next(); he !== null && !Ae.done; Te++, Ae = U.next()) {
        he.index > Te ? (Je = he, he = null) : Je = he.sibling;
        var Fn = oe(F, he, Ae.value, q);
        if (Fn === null) {
          he === null && (he = Je);
          break;
        }
        e && he && Fn.alternate === null && t(F, he), O = y(Fn, O, Te), me === null ? ne = Fn : me.sibling = Fn, me = Fn, he = Je;
      }
      if (Ae.done)
        return s(
          F,
          he
        ), ze && qn(F, Te), ne;
      if (he === null) {
        for (; !Ae.done; Te++, Ae = U.next())
          Ae = pe(F, Ae.value, q), Ae !== null && (O = y(Ae, O, Te), me === null ? ne = Ae : me.sibling = Ae, me = Ae);
        return ze && qn(F, Te), ne;
      }
      for (he = c(F, he); !Ae.done; Te++, Ae = U.next())
        Ae = Ce(he, F, Te, Ae.value, q), Ae !== null && (e && Ae.alternate !== null && he.delete(Ae.key === null ? Te : Ae.key), O = y(Ae, O, Te), me === null ? ne = Ae : me.sibling = Ae, me = Ae);
      return e && he.forEach(function(Fp) {
        return t(F, Fp);
      }), ze && qn(F, Te), ne;
    }
    function kt(F, O, U, q) {
      if (typeof U == "object" && U !== null && U.type === p && U.key === null && (U = U.props.children), typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case f:
            e: {
              for (var ne = U.key, me = O; me !== null; ) {
                if (me.key === ne) {
                  if (ne = U.type, ne === p) {
                    if (me.tag === 7) {
                      s(F, me.sibling), O = h(me, U.props.children), O.return = F, F = O;
                      break e;
                    }
                  } else if (me.elementType === ne || typeof ne == "object" && ne !== null && ne.$$typeof === E && vu(ne) === me.type) {
                    s(F, me.sibling), O = h(me, U.props), O.ref = fi(F, me, U), O.return = F, F = O;
                    break e;
                  }
                  s(F, me);
                  break;
                } else
                  t(F, me);
                me = me.sibling;
              }
              U.type === p ? (O = rr(U.props.children, F.mode, q, U.key), O.return = F, F = O) : (q = Hs(U.type, U.key, U.props, null, F.mode, q), q.ref = fi(F, O, U), q.return = F, F = q);
            }
            return C(F);
          case g:
            e: {
              for (me = U.key; O !== null; ) {
                if (O.key === me)
                  if (O.tag === 4 && O.stateNode.containerInfo === U.containerInfo && O.stateNode.implementation === U.implementation) {
                    s(F, O.sibling), O = h(O, U.children || []), O.return = F, F = O;
                    break e;
                  } else {
                    s(F, O);
                    break;
                  }
                else
                  t(F, O);
                O = O.sibling;
              }
              O = Dl(U, F.mode, q), O.return = F, F = O;
            }
            return C(F);
          case E:
            return me = U._init, kt(F, O, me(U._payload), q);
        }
        if (ee(U))
          return ie(F, O, U, q);
        if (L(U))
          return ct(F, O, U, q);
        fs(F, U);
      }
      return typeof U == "string" && U !== "" || typeof U == "number" ? (U = "" + U, O !== null && O.tag === 6 ? (s(F, O.sibling), O = h(O, U), O.return = F, F = O) : (s(F, O), O = Ol(U, F.mode, q), O.return = F, F = O), C(F)) : s(F, O);
    }
    return kt;
  }
  var Sr = yu(!0), xu = yu(!1), di = {}, zt = Ln(di), pi = Ln(di), _r = Ln(di);
  function sn(e) {
    if (e === di)
      throw Error(a(174));
    return e;
  }
  function Jo(e, t) {
    Le(_r, t), Le(pi, e), Le(zt, di), e = Se(t), Re(zt), Le(zt, e);
  }
  function Er() {
    Re(zt), Re(pi), Re(_r);
  }
  function wu(e) {
    var t = sn(_r.current), s = sn(zt.current);
    t = W(s, e.type, t), s !== t && (Le(pi, e), Le(zt, t));
  }
  function $o(e) {
    pi.current === e && (Re(zt), Re(pi));
  }
  var De = Ln(0);
  function ds(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var s = t.memoizedState;
        if (s !== null && (s = s.dehydrated, s === null || Za(s) || Mo(s)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128)
          return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e)
        break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var el = [];
  function tl() {
    for (var e = 0; e < el.length; e++) {
      var t = el[e];
      Me ? t._workInProgressVersionPrimary = null : t._workInProgressVersionSecondary = null;
    }
    el.length = 0;
  }
  var ps = d.ReactCurrentDispatcher, Ot = d.ReactCurrentBatchConfig, Tr = 0, Be = null, lt = null, Ze = null, hs = !1, hi = !1, mi = 0, up = 0;
  function at() {
    throw Error(a(321));
  }
  function nl(e, t) {
    if (t === null)
      return !1;
    for (var s = 0; s < t.length && s < e.length; s++)
      if (!tn(e[s], t[s]))
        return !1;
    return !0;
  }
  function rl(e, t, s, c, h, y) {
    if (Tr = y, Be = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ps.current = e === null || e.memoizedState === null ? pp : hp, e = s(c, h), hi) {
      y = 0;
      do {
        if (hi = !1, mi = 0, 25 <= y)
          throw Error(a(301));
        y += 1, Ze = lt = null, t.updateQueue = null, ps.current = mp, e = s(c, h);
      } while (hi);
    }
    if (ps.current = xs, t = lt !== null && lt.next !== null, Tr = 0, Ze = lt = Be = null, hs = !1, t)
      throw Error(a(300));
    return e;
  }
  function il() {
    var e = mi !== 0;
    return mi = 0, e;
  }
  function yn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ze === null ? Be.memoizedState = Ze = e : Ze = Ze.next = e, Ze;
  }
  function on() {
    if (lt === null) {
      var e = Be.alternate;
      e = e !== null ? e.memoizedState : null;
    } else
      e = lt.next;
    var t = Ze === null ? Be.memoizedState : Ze.next;
    if (t !== null)
      Ze = t, lt = e;
    else {
      if (e === null)
        throw Error(a(310));
      lt = e, e = { memoizedState: lt.memoizedState, baseState: lt.baseState, baseQueue: lt.baseQueue, queue: lt.queue, next: null }, Ze === null ? Be.memoizedState = Ze = e : Ze = Ze.next = e;
    }
    return Ze;
  }
  function Zn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ms(e) {
    var t = on(), s = t.queue;
    if (s === null)
      throw Error(a(311));
    s.lastRenderedReducer = e;
    var c = lt, h = c.baseQueue, y = s.pending;
    if (y !== null) {
      if (h !== null) {
        var C = h.next;
        h.next = y.next, y.next = C;
      }
      c.baseQueue = h = y, s.pending = null;
    }
    if (h !== null) {
      y = h.next, c = c.baseState;
      var N = C = null, H = null, X = y;
      do {
        var $ = X.lane;
        if ((Tr & $) === $)
          H !== null && (H = H.next = { lane: 0, action: X.action, hasEagerState: X.hasEagerState, eagerState: X.eagerState, next: null }), c = X.hasEagerState ? X.eagerState : e(c, X.action);
        else {
          var pe = {
            lane: $,
            action: X.action,
            hasEagerState: X.hasEagerState,
            eagerState: X.eagerState,
            next: null
          };
          H === null ? (N = H = pe, C = c) : H = H.next = pe, Be.lanes |= $, Pr |= $;
        }
        X = X.next;
      } while (X !== null && X !== y);
      H === null ? C = c : H.next = N, tn(c, t.memoizedState) || (Pt = !0), t.memoizedState = c, t.baseState = C, t.baseQueue = H, s.lastRenderedState = c;
    }
    if (e = s.interleaved, e !== null) {
      h = e;
      do
        y = h.lane, Be.lanes |= y, Pr |= y, h = h.next;
      while (h !== e);
    } else
      h === null && (s.lanes = 0);
    return [t.memoizedState, s.dispatch];
  }
  function gs(e) {
    var t = on(), s = t.queue;
    if (s === null)
      throw Error(a(311));
    s.lastRenderedReducer = e;
    var c = s.dispatch, h = s.pending, y = t.memoizedState;
    if (h !== null) {
      s.pending = null;
      var C = h = h.next;
      do
        y = e(y, C.action), C = C.next;
      while (C !== h);
      tn(y, t.memoizedState) || (Pt = !0), t.memoizedState = y, t.baseQueue === null && (t.baseState = y), s.lastRenderedState = y;
    }
    return [y, c];
  }
  function Su() {
  }
  function _u(e, t) {
    var s = Be, c = on(), h = t(), y = !tn(c.memoizedState, h);
    if (y && (c.memoizedState = h, Pt = !0), c = c.queue, vi(Au.bind(null, s, c, e), [e]), c.getSnapshot !== t || y || Ze !== null && Ze.memoizedState.tag & 1) {
      if (s.flags |= 2048, gi(9, Tu.bind(null, s, c, h, t), void 0, null), We === null)
        throw Error(a(349));
      Tr & 30 || Eu(s, t, h);
    }
    return h;
  }
  function Eu(e, t, s) {
    e.flags |= 16384, e = { getSnapshot: t, value: s }, t = Be.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Be.updateQueue = t, t.stores = [e]) : (s = t.stores, s === null ? t.stores = [e] : s.push(e));
  }
  function Tu(e, t, s, c) {
    t.value = s, t.getSnapshot = c, Pu(t) && Dt(e, 1, -1);
  }
  function Au(e, t, s) {
    return s(function() {
      Pu(t) && Dt(e, 1, -1);
    });
  }
  function Pu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var s = t();
      return !tn(e, s);
    } catch {
      return !0;
    }
  }
  function sl(e) {
    var t = yn();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Zn, lastRenderedState: e }, t.queue = e, e = e.dispatch = dp.bind(null, Be, e), [t.memoizedState, e];
  }
  function gi(e, t, s, c) {
    return e = { tag: e, create: t, destroy: s, deps: c, next: null }, t = Be.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Be.updateQueue = t, t.lastEffect = e.next = e) : (s = t.lastEffect, s === null ? t.lastEffect = e.next = e : (c = s.next, s.next = e, e.next = c, t.lastEffect = e)), e;
  }
  function Cu() {
    return on().memoizedState;
  }
  function vs(e, t, s, c) {
    var h = yn();
    Be.flags |= e, h.memoizedState = gi(1 | t, s, void 0, c === void 0 ? null : c);
  }
  function ys(e, t, s, c) {
    var h = on();
    c = c === void 0 ? null : c;
    var y = void 0;
    if (lt !== null) {
      var C = lt.memoizedState;
      if (y = C.destroy, c !== null && nl(c, C.deps)) {
        h.memoizedState = gi(t, s, y, c);
        return;
      }
    }
    Be.flags |= e, h.memoizedState = gi(1 | t, s, y, c);
  }
  function ol(e, t) {
    return vs(8390656, 8, e, t);
  }
  function vi(e, t) {
    return ys(2048, 8, e, t);
  }
  function Mu(e, t) {
    return ys(4, 2, e, t);
  }
  function Lu(e, t) {
    return ys(4, 4, e, t);
  }
  function Ru(e, t) {
    if (typeof t == "function")
      return e = e(), t(e), function() {
        t(null);
      };
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Nu(e, t, s) {
    return s = s != null ? s.concat([e]) : null, ys(4, 4, Ru.bind(null, t, e), s);
  }
  function ll() {
  }
  function Iu(e, t) {
    var s = on();
    t = t === void 0 ? null : t;
    var c = s.memoizedState;
    return c !== null && t !== null && nl(t, c[1]) ? c[0] : (s.memoizedState = [e, t], e);
  }
  function zu(e, t) {
    var s = on();
    t = t === void 0 ? null : t;
    var c = s.memoizedState;
    return c !== null && t !== null && nl(t, c[1]) ? c[0] : (e = e(), s.memoizedState = [e, t], e);
  }
  function cp(e, t) {
    var s = Ee;
    Ee = s !== 0 && 4 > s ? s : 4, e(!0);
    var c = Ot.transition;
    Ot.transition = {};
    try {
      e(!1), t();
    } finally {
      Ee = s, Ot.transition = c;
    }
  }
  function Ou() {
    return on().memoizedState;
  }
  function fp(e, t, s) {
    var c = Dn(e);
    s = { lane: c, action: s, hasEagerState: !1, eagerState: null, next: null }, Du(e) ? bu(t, s) : (ku(e, t, s), s = pt(), e = Dt(e, c, s), e !== null && Fu(e, t, c));
  }
  function dp(e, t, s) {
    var c = Dn(e), h = { lane: c, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Du(e))
      bu(t, h);
    else {
      ku(e, t, h);
      var y = e.alternate;
      if (e.lanes === 0 && (y === null || y.lanes === 0) && (y = t.lastRenderedReducer, y !== null))
        try {
          var C = t.lastRenderedState, N = y(C, s);
          if (h.hasEagerState = !0, h.eagerState = N, tn(N, C))
            return;
        } catch {
        } finally {
        }
      s = pt(), e = Dt(e, c, s), e !== null && Fu(e, t, c);
    }
  }
  function Du(e) {
    var t = e.alternate;
    return e === Be || t !== null && t === Be;
  }
  function bu(e, t) {
    hi = hs = !0;
    var s = e.pending;
    s === null ? t.next = t : (t.next = s.next, s.next = t), e.pending = t;
  }
  function ku(e, t, s) {
    We !== null && e.mode & 1 && !(ve & 2) ? (e = t.interleaved, e === null ? (s.next = s, rn === null ? rn = [t] : rn.push(t)) : (s.next = e.next, e.next = s), t.interleaved = s) : (e = t.pending, e === null ? s.next = s : (s.next = e.next, e.next = s), t.pending = s);
  }
  function Fu(e, t, s) {
    if (s & 4194240) {
      var c = t.lanes;
      c &= e.pendingLanes, s |= c, t.lanes = s, Do(e, s);
    }
  }
  var xs = { readContext: Rt, useCallback: at, useContext: at, useEffect: at, useImperativeHandle: at, useInsertionEffect: at, useLayoutEffect: at, useMemo: at, useReducer: at, useRef: at, useState: at, useDebugValue: at, useDeferredValue: at, useTransition: at, useMutableSource: at, useSyncExternalStore: at, useId: at, unstable_isNewReconciler: !1 }, pp = { readContext: Rt, useCallback: function(e, t) {
    return yn().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: Rt, useEffect: ol, useImperativeHandle: function(e, t, s) {
    return s = s != null ? s.concat([e]) : null, vs(
      4194308,
      4,
      Ru.bind(null, t, e),
      s
    );
  }, useLayoutEffect: function(e, t) {
    return vs(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return vs(4, 2, e, t);
  }, useMemo: function(e, t) {
    var s = yn();
    return t = t === void 0 ? null : t, e = e(), s.memoizedState = [e, t], e;
  }, useReducer: function(e, t, s) {
    var c = yn();
    return t = s !== void 0 ? s(t) : t, c.memoizedState = c.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, c.queue = e, e = e.dispatch = fp.bind(null, Be, e), [c.memoizedState, e];
  }, useRef: function(e) {
    var t = yn();
    return e = { current: e }, t.memoizedState = e;
  }, useState: sl, useDebugValue: ll, useDeferredValue: function(e) {
    var t = sl(e), s = t[0], c = t[1];
    return ol(function() {
      var h = Ot.transition;
      Ot.transition = {};
      try {
        c(e);
      } finally {
        Ot.transition = h;
      }
    }, [e]), s;
  }, useTransition: function() {
    var e = sl(!1), t = e[0];
    return e = cp.bind(null, e[1]), yn().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, s) {
    var c = Be, h = yn();
    if (ze) {
      if (s === void 0)
        throw Error(a(407));
      s = s();
    } else {
      if (s = t(), We === null)
        throw Error(a(349));
      Tr & 30 || Eu(c, t, s);
    }
    h.memoizedState = s;
    var y = { value: s, getSnapshot: t };
    return h.queue = y, ol(Au.bind(null, c, y, e), [e]), c.flags |= 2048, gi(9, Tu.bind(null, c, y, s, t), void 0, null), s;
  }, useId: function() {
    var e = yn(), t = We.identifierPrefix;
    if (ze) {
      var s = vn, c = gn;
      s = (c & ~(1 << 32 - Kt(c) - 1)).toString(32) + s, t = ":" + t + "R" + s, s = mi++, 0 < s && (t += "H" + s.toString(32)), t += ":";
    } else
      s = up++, t = ":" + t + "r" + s.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, hp = {
    readContext: Rt,
    useCallback: Iu,
    useContext: Rt,
    useEffect: vi,
    useImperativeHandle: Nu,
    useInsertionEffect: Mu,
    useLayoutEffect: Lu,
    useMemo: zu,
    useReducer: ms,
    useRef: Cu,
    useState: function() {
      return ms(Zn);
    },
    useDebugValue: ll,
    useDeferredValue: function(e) {
      var t = ms(Zn), s = t[0], c = t[1];
      return vi(function() {
        var h = Ot.transition;
        Ot.transition = {};
        try {
          c(e);
        } finally {
          Ot.transition = h;
        }
      }, [e]), s;
    },
    useTransition: function() {
      var e = ms(Zn)[0], t = on().memoizedState;
      return [e, t];
    },
    useMutableSource: Su,
    useSyncExternalStore: _u,
    useId: Ou,
    unstable_isNewReconciler: !1
  }, mp = {
    readContext: Rt,
    useCallback: Iu,
    useContext: Rt,
    useEffect: vi,
    useImperativeHandle: Nu,
    useInsertionEffect: Mu,
    useLayoutEffect: Lu,
    useMemo: zu,
    useReducer: gs,
    useRef: Cu,
    useState: function() {
      return gs(Zn);
    },
    useDebugValue: ll,
    useDeferredValue: function(e) {
      var t = gs(Zn), s = t[0], c = t[1];
      return vi(function() {
        var h = Ot.transition;
        Ot.transition = {};
        try {
          c(e);
        } finally {
          Ot.transition = h;
        }
      }, [e]), s;
    },
    useTransition: function() {
      var e = gs(Zn)[0], t = on().memoizedState;
      return [e, t];
    },
    useMutableSource: Su,
    useSyncExternalStore: _u,
    useId: Ou,
    unstable_isNewReconciler: !1
  };
  function al(e, t) {
    try {
      var s = "", c = t;
      do
        s += ap(c), c = c.return;
      while (c);
      var h = s;
    } catch (y) {
      h = `
Error generating stack: ` + y.message + `
` + y.stack;
    }
    return { value: e, source: t, stack: h };
  }
  function ul(e, t) {
    try {
      console.error(t.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var gp = typeof WeakMap == "function" ? WeakMap : Map;
  function Bu(e, t, s) {
    s = mn(-1, s), s.tag = 3, s.payload = { element: null };
    var c = t.value;
    return s.callback = function() {
      Ds || (Ds = !0, Cl = c), ul(e, t);
    }, s;
  }
  function ju(e, t, s) {
    s = mn(-1, s), s.tag = 3;
    var c = e.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var h = t.value;
      s.payload = function() {
        return c(h);
      }, s.callback = function() {
        ul(e, t);
      };
    }
    var y = e.stateNode;
    return y !== null && typeof y.componentDidCatch == "function" && (s.callback = function() {
      ul(e, t), typeof c != "function" && (zn === null ? zn = /* @__PURE__ */ new Set([this]) : zn.add(this));
      var C = t.stack;
      this.componentDidCatch(t.value, { componentStack: C !== null ? C : "" });
    }), s;
  }
  function Uu(e, t, s) {
    var c = e.pingCache;
    if (c === null) {
      c = e.pingCache = new gp();
      var h = /* @__PURE__ */ new Set();
      c.set(t, h);
    } else
      h = c.get(t), h === void 0 && (h = /* @__PURE__ */ new Set(), c.set(t, h));
    h.has(s) || (h.add(s), e = Rp.bind(null, e, t, s), t.then(e, e));
  }
  function Hu(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Vu(e, t, s, c, h) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = h, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (t = mn(-1, 1), t.tag = 2, In(s, t))), s.lanes |= 1), e);
  }
  function ln(e) {
    e.flags |= 4;
  }
  function Gu(e, t) {
    if (e !== null && e.child === t.child)
      return !0;
    if (t.flags & 16)
      return !1;
    for (e = t.child; e !== null; ) {
      if (e.flags & 12854 || e.subtreeFlags & 12854)
        return !1;
      e = e.sibling;
    }
    return !0;
  }
  var yi, xi, ws, Ss;
  if (Pe)
    yi = function(e, t) {
      for (var s = t.child; s !== null; ) {
        if (s.tag === 5 || s.tag === 6)
          ge(e, s.stateNode);
        else if (s.tag !== 4 && s.child !== null) {
          s.child.return = s, s = s.child;
          continue;
        }
        if (s === t)
          break;
        for (; s.sibling === null; ) {
          if (s.return === null || s.return === t)
            return;
          s = s.return;
        }
        s.sibling.return = s.return, s = s.sibling;
      }
    }, xi = function() {
    }, ws = function(e, t, s, c, h) {
      if (e = e.memoizedProps, e !== c) {
        var y = t.stateNode, C = sn(zt.current);
        s = Fe(y, s, e, c, h, C), (t.updateQueue = s) && ln(t);
      }
    }, Ss = function(e, t, s, c) {
      s !== c && ln(t);
    };
  else if (Ve) {
    yi = function(e, t, s, c) {
      for (var h = t.child; h !== null; ) {
        if (h.tag === 5) {
          var y = h.stateNode;
          s && c && (y = Cn(y, h.type, h.memoizedProps, h)), ge(e, y);
        } else if (h.tag === 6)
          y = h.stateNode, s && c && (y = Mn(y, h.memoizedProps, h)), ge(e, y);
        else if (h.tag !== 4) {
          if (h.tag === 22 && h.memoizedState !== null)
            y = h.child, y !== null && (y.return = h), yi(e, h, !0, !0);
          else if (h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
        }
        if (h === t)
          break;
        for (; h.sibling === null; ) {
          if (h.return === null || h.return === t)
            return;
          h = h.return;
        }
        h.sibling.return = h.return, h = h.sibling;
      }
    };
    var Wu = function(e, t, s, c) {
      for (var h = t.child; h !== null; ) {
        if (h.tag === 5) {
          var y = h.stateNode;
          s && c && (y = Cn(y, h.type, h.memoizedProps, h)), Lt(e, y);
        } else if (h.tag === 6)
          y = h.stateNode, s && c && (y = Mn(y, h.memoizedProps, h)), Lt(e, y);
        else if (h.tag !== 4) {
          if (h.tag === 22 && h.memoizedState !== null)
            y = h.child, y !== null && (y.return = h), Wu(e, h, !0, !0);
          else if (h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
        }
        if (h === t)
          break;
        for (; h.sibling === null; ) {
          if (h.return === null || h.return === t)
            return;
          h = h.return;
        }
        h.sibling.return = h.return, h = h.sibling;
      }
    };
    xi = function(e, t) {
      var s = t.stateNode;
      if (!Gu(e, t)) {
        e = s.containerInfo;
        var c = ii(e);
        Wu(c, t, !1, !1), s.pendingChildren = c, ln(t), Xt(e, c);
      }
    }, ws = function(e, t, s, c, h) {
      var y = e.stateNode, C = e.memoizedProps;
      if ((e = Gu(e, t)) && C === c)
        t.stateNode = y;
      else {
        var N = t.stateNode, H = sn(zt.current), X = null;
        C !== c && (X = Fe(N, s, C, c, h, H)), e && X === null ? t.stateNode = y : (y = qa(y, X, s, C, c, t, e, N), xe(y, s, c, h, H) && ln(t), t.stateNode = y, e ? ln(t) : yi(y, t, !1, !1));
      }
    }, Ss = function(e, t, s, c) {
      s !== c ? (e = sn(_r.current), s = sn(zt.current), t.stateNode = gt(c, e, s, t), ln(t)) : t.stateNode = e.stateNode;
    };
  } else
    xi = function() {
    }, ws = function() {
    }, Ss = function() {
    };
  function wi(e, t) {
    if (!ze)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var s = null; t !== null; )
            t.alternate !== null && (s = t), t = t.sibling;
          s === null ? e.tail = null : s.sibling = null;
          break;
        case "collapsed":
          s = e.tail;
          for (var c = null; s !== null; )
            s.alternate !== null && (c = s), s = s.sibling;
          c === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : c.sibling = null;
      }
  }
  function ut(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, s = 0, c = 0;
    if (t)
      for (var h = e.child; h !== null; )
        s |= h.lanes | h.childLanes, c |= h.subtreeFlags & 14680064, c |= h.flags & 14680064, h.return = e, h = h.sibling;
    else
      for (h = e.child; h !== null; )
        s |= h.lanes | h.childLanes, c |= h.subtreeFlags, c |= h.flags, h.return = e, h = h.sibling;
    return e.subtreeFlags |= c, e.childLanes = s, t;
  }
  function vp(e, t, s) {
    var c = t.pendingProps;
    switch (Yo(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ut(t), null;
      case 1:
        return xt(t.type) && qi(), ut(t), null;
      case 3:
        return c = t.stateNode, Er(), Re(yt), Re(ot), tl(), c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), (e === null || e.child === null) && (ci(t) ? ln(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Qt !== null && (Rl(Qt), Qt = null))), xi(e, t), ut(t), null;
      case 5:
        $o(t), s = sn(_r.current);
        var h = t.type;
        if (e !== null && t.stateNode != null)
          ws(e, t, h, c, s), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!c) {
            if (t.stateNode === null)
              throw Error(a(166));
            return ut(t), null;
          }
          if (e = sn(zt.current), ci(t)) {
            if (!ue)
              throw Error(a(175));
            e = kd(t.stateNode, t.type, t.memoizedProps, s, e, t, !ui), t.updateQueue = e, e !== null && ln(t);
          } else {
            var y = te(h, c, s, e, t);
            yi(y, t, !1, !1), t.stateNode = y, xe(y, h, c, s, e) && ln(t);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return ut(t), null;
      case 6:
        if (e && t.stateNode != null)
          Ss(e, t, e.memoizedProps, c);
        else {
          if (typeof c != "string" && t.stateNode === null)
            throw Error(a(166));
          if (e = sn(_r.current), s = sn(zt.current), ci(t)) {
            if (!ue)
              throw Error(a(176));
            if (e = t.stateNode, c = t.memoizedProps, (s = Fd(e, c, t, !ui)) && (h = Tt, h !== null))
              switch (y = (h.mode & 1) !== 0, h.tag) {
                case 3:
                  Wd(h.stateNode.containerInfo, e, c, y);
                  break;
                case 5:
                  Xd(h.type, h.memoizedProps, h.stateNode, e, c, y);
              }
            s && ln(t);
          } else
            t.stateNode = gt(c, e, s, t);
        }
        return ut(t), null;
      case 13:
        if (Re(De), c = t.memoizedState, ze && At !== null && t.mode & 1 && !(t.flags & 128)) {
          for (e = At; e; )
            e = si(e);
          return wr(), t.flags |= 98560, t;
        }
        if (c !== null && c.dehydrated !== null) {
          if (c = ci(t), e === null) {
            if (!c)
              throw Error(a(318));
            if (!ue)
              throw Error(a(344));
            if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e)
              throw Error(a(317));
            Bd(e, t);
          } else
            wr(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          return ut(t), null;
        }
        return Qt !== null && (Rl(Qt), Qt = null), t.flags & 128 ? (t.lanes = s, t) : (c = c !== null, s = !1, e === null ? ci(t) : s = e.memoizedState !== null, c && !s && (t.child.flags |= 8192, t.mode & 1 && (e === null || De.current & 1 ? Qe === 0 && (Qe = 3) : Il())), t.updateQueue !== null && (t.flags |= 4), ut(t), null);
      case 4:
        return Er(), xi(e, t), e === null && st(t.stateNode.containerInfo), ut(t), null;
      case 10:
        return Ho(t.type._context), ut(t), null;
      case 17:
        return xt(t.type) && qi(), ut(t), null;
      case 19:
        if (Re(De), h = t.memoizedState, h === null)
          return ut(t), null;
        if (c = (t.flags & 128) !== 0, y = h.rendering, y === null)
          if (c)
            wi(h, !1);
          else {
            if (Qe !== 0 || e !== null && e.flags & 128)
              for (e = t.child; e !== null; ) {
                if (y = ds(e), y !== null) {
                  for (t.flags |= 128, wi(h, !1), e = y.updateQueue, e !== null && (t.updateQueue = e, t.flags |= 4), t.subtreeFlags = 0, e = s, c = t.child; c !== null; )
                    s = c, h = e, s.flags &= 14680066, y = s.alternate, y === null ? (s.childLanes = 0, s.lanes = h, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = y.childLanes, s.lanes = y.lanes, s.child = y.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = y.memoizedProps, s.memoizedState = y.memoizedState, s.updateQueue = y.updateQueue, s.type = y.type, h = y.dependencies, s.dependencies = h === null ? null : { lanes: h.lanes, firstContext: h.firstContext }), c = c.sibling;
                  return Le(De, De.current & 1 | 2), t.child;
                }
                e = e.sibling;
              }
            h.tail !== null && qe() > Pl && (t.flags |= 128, c = !0, wi(h, !1), t.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = ds(y), e !== null) {
              if (t.flags |= 128, c = !0, e = e.updateQueue, e !== null && (t.updateQueue = e, t.flags |= 4), wi(h, !0), h.tail === null && h.tailMode === "hidden" && !y.alternate && !ze)
                return ut(t), null;
            } else
              2 * qe() - h.renderingStartTime > Pl && s !== 1073741824 && (t.flags |= 128, c = !0, wi(h, !1), t.lanes = 4194304);
          h.isBackwards ? (y.sibling = t.child, t.child = y) : (e = h.last, e !== null ? e.sibling = y : t.child = y, h.last = y);
        }
        return h.tail !== null ? (t = h.tail, h.rendering = t, h.tail = t.sibling, h.renderingStartTime = qe(), t.sibling = null, e = De.current, Le(De, c ? e & 1 | 2 : e & 1), t) : (ut(t), null);
      case 22:
      case 23:
        return Nl(), c = t.memoizedState !== null, e !== null && e.memoizedState !== null !== c && (t.flags |= 8192), c && t.mode & 1 ? Ct & 1073741824 && (ut(t), Pe && t.subtreeFlags & 6 && (t.flags |= 8192)) : ut(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(a(156, t.tag));
  }
  var yp = d.ReactCurrentOwner, Pt = !1;
  function dt(e, t, s, c) {
    t.child = e === null ? xu(t, null, s, c) : Sr(t, e.child, s, c);
  }
  function Xu(e, t, s, c, h) {
    s = s.render;
    var y = t.ref;
    return vr(t, h), c = rl(e, t, s, c, y, h), s = il(), e !== null && !Pt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~h, xn(e, t, h)) : (ze && s && Ko(t), t.flags |= 1, dt(e, t, c, h), t.child);
  }
  function Ku(e, t, s, c, h) {
    if (e === null) {
      var y = s.type;
      return typeof y == "function" && !zl(y) && y.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (t.tag = 15, t.type = y, Yu(e, t, y, c, h)) : (e = Hs(s.type, null, c, t, t.mode, h), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (y = e.child, !(e.lanes & h)) {
      var C = y.memoizedProps;
      if (s = s.compare, s = s !== null ? s : rs, s(C, c) && e.ref === t.ref)
        return xn(e, t, h);
    }
    return t.flags |= 1, e = kn(y, c), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Yu(e, t, s, c, h) {
    if (e !== null && rs(e.memoizedProps, c) && e.ref === t.ref)
      if (Pt = !1, (e.lanes & h) !== 0)
        e.flags & 131072 && (Pt = !0);
      else
        return t.lanes = e.lanes, xn(e, t, h);
    return cl(e, t, s, c, h);
  }
  function Qu(e, t, s) {
    var c = t.pendingProps, h = c.children, y = e !== null ? e.memoizedState : null;
    if (c.mode === "hidden")
      if (!(t.mode & 1))
        t.memoizedState = { baseLanes: 0, cachePool: null }, Le(Ar, Ct), Ct |= s;
      else if (s & 1073741824)
        t.memoizedState = { baseLanes: 0, cachePool: null }, c = y !== null ? y.baseLanes : s, Le(Ar, Ct), Ct |= c;
      else
        return e = y !== null ? y.baseLanes | s : s, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null }, t.updateQueue = null, Le(Ar, Ct), Ct |= e, null;
    else
      y !== null ? (c = y.baseLanes | s, t.memoizedState = null) : c = s, Le(Ar, Ct), Ct |= c;
    return dt(e, t, h, s), t.child;
  }
  function qu(e, t) {
    var s = t.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (t.flags |= 512, t.flags |= 2097152);
  }
  function cl(e, t, s, c, h) {
    var y = xt(s) ? Yn : ot.current;
    return y = mr(t, y), vr(t, h), s = rl(e, t, s, c, y, h), c = il(), e !== null && !Pt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~h, xn(e, t, h)) : (ze && c && Ko(t), t.flags |= 1, dt(e, t, s, h), t.child);
  }
  function Zu(e, t, s, c, h) {
    if (xt(s)) {
      var y = !0;
      Zi(t);
    } else
      y = !1;
    if (vr(t, h), t.stateNode === null)
      e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2), fu(t, s, c), Xo(t, s, c, h), c = !0;
    else if (e === null) {
      var C = t.stateNode, N = t.memoizedProps;
      C.props = N;
      var H = C.context, X = s.contextType;
      typeof X == "object" && X !== null ? X = Rt(X) : (X = xt(s) ? Yn : ot.current, X = mr(t, X));
      var $ = s.getDerivedStateFromProps, pe = typeof $ == "function" || typeof C.getSnapshotBeforeUpdate == "function";
      pe || typeof C.UNSAFE_componentWillReceiveProps != "function" && typeof C.componentWillReceiveProps != "function" || (N !== c || H !== X) && du(t, C, c, X), Nn = !1;
      var oe = t.memoizedState;
      C.state = oe, ls(t, c, C, h), H = t.memoizedState, N !== c || oe !== H || yt.current || Nn ? (typeof $ == "function" && (Wo(t, s, $, c), H = t.memoizedState), (N = Nn || cu(t, s, N, c, oe, H, X)) ? (pe || typeof C.UNSAFE_componentWillMount != "function" && typeof C.componentWillMount != "function" || (typeof C.componentWillMount == "function" && C.componentWillMount(), typeof C.UNSAFE_componentWillMount == "function" && C.UNSAFE_componentWillMount()), typeof C.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof C.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = c, t.memoizedState = H), C.props = c, C.state = H, C.context = X, c = N) : (typeof C.componentDidMount == "function" && (t.flags |= 4194308), c = !1);
    } else {
      C = t.stateNode, ou(e, t), N = t.memoizedProps, X = t.type === t.elementType ? N : Yt(t.type, N), C.props = X, pe = t.pendingProps, oe = C.context, H = s.contextType, typeof H == "object" && H !== null ? H = Rt(H) : (H = xt(s) ? Yn : ot.current, H = mr(t, H));
      var Ce = s.getDerivedStateFromProps;
      ($ = typeof Ce == "function" || typeof C.getSnapshotBeforeUpdate == "function") || typeof C.UNSAFE_componentWillReceiveProps != "function" && typeof C.componentWillReceiveProps != "function" || (N !== pe || oe !== H) && du(t, C, c, H), Nn = !1, oe = t.memoizedState, C.state = oe, ls(t, c, C, h);
      var ie = t.memoizedState;
      N !== pe || oe !== ie || yt.current || Nn ? (typeof Ce == "function" && (Wo(t, s, Ce, c), ie = t.memoizedState), (X = Nn || cu(t, s, X, c, oe, ie, H) || !1) ? ($ || typeof C.UNSAFE_componentWillUpdate != "function" && typeof C.componentWillUpdate != "function" || (typeof C.componentWillUpdate == "function" && C.componentWillUpdate(
        c,
        ie,
        H
      ), typeof C.UNSAFE_componentWillUpdate == "function" && C.UNSAFE_componentWillUpdate(c, ie, H)), typeof C.componentDidUpdate == "function" && (t.flags |= 4), typeof C.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof C.componentDidUpdate != "function" || N === e.memoizedProps && oe === e.memoizedState || (t.flags |= 4), typeof C.getSnapshotBeforeUpdate != "function" || N === e.memoizedProps && oe === e.memoizedState || (t.flags |= 1024), t.memoizedProps = c, t.memoizedState = ie), C.props = c, C.state = ie, C.context = H, c = X) : (typeof C.componentDidUpdate != "function" || N === e.memoizedProps && oe === e.memoizedState || (t.flags |= 4), typeof C.getSnapshotBeforeUpdate != "function" || N === e.memoizedProps && oe === e.memoizedState || (t.flags |= 1024), c = !1);
    }
    return fl(e, t, s, c, y, h);
  }
  function fl(e, t, s, c, h, y) {
    qu(e, t);
    var C = (t.flags & 128) !== 0;
    if (!c && !C)
      return h && tu(t, s, !1), xn(e, t, y);
    c = t.stateNode, yp.current = t;
    var N = C && typeof s.getDerivedStateFromError != "function" ? null : c.render();
    return t.flags |= 1, e !== null && C ? (t.child = Sr(t, e.child, null, y), t.child = Sr(t, null, N, y)) : dt(e, t, N, y), t.memoizedState = c.state, h && tu(t, s, !0), t.child;
  }
  function Ju(e) {
    var t = e.stateNode;
    t.pendingContext ? $a(e, t.pendingContext, t.pendingContext !== t.context) : t.context && $a(e, t.context, !1), Jo(e, t.containerInfo);
  }
  function $u(e, t, s, c, h) {
    return wr(), Zo(h), t.flags |= 256, dt(e, t, s, c), t.child;
  }
  var _s = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Es(e) {
    return { baseLanes: e, cachePool: null };
  }
  function ec(e, t, s) {
    var c = t.pendingProps, h = De.current, y = !1, C = (t.flags & 128) !== 0, N;
    if ((N = C) || (N = e !== null && e.memoizedState === null ? !1 : (h & 2) !== 0), N ? (y = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (h |= 1), Le(De, h & 1), e === null)
      return qo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? Mo(e) ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (h = c.children, e = c.fallback, y ? (c = t.mode, y = t.child, h = { mode: "hidden", children: h }, !(c & 1) && y !== null ? (y.childLanes = 0, y.pendingProps = h) : y = Vs(h, c, 0, null), e = rr(e, c, s, null), y.return = t, e.return = t, y.sibling = e, t.child = y, t.child.memoizedState = Es(s), t.memoizedState = _s, e) : dl(t, h));
    if (h = e.memoizedState, h !== null) {
      if (N = h.dehydrated, N !== null) {
        if (C)
          return t.flags & 256 ? (t.flags &= -257, Ts(e, t, s, Error(a(422)))) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (y = c.fallback, h = t.mode, c = Vs({ mode: "visible", children: c.children }, h, 0, null), y = rr(y, h, s, null), y.flags |= 2, c.return = t, y.return = t, c.sibling = y, t.child = c, t.mode & 1 && Sr(
            t,
            e.child,
            null,
            s
          ), t.child.memoizedState = Es(s), t.memoizedState = _s, y);
        if (!(t.mode & 1))
          t = Ts(e, t, s, null);
        else if (Mo(N))
          t = Ts(e, t, s, Error(a(419)));
        else if (c = (s & e.childLanes) !== 0, Pt || c) {
          if (c = We, c !== null) {
            switch (s & -s) {
              case 4:
                y = 2;
                break;
              case 16:
                y = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                y = 32;
                break;
              case 536870912:
                y = 268435456;
                break;
              default:
                y = 0;
            }
            c = y & (c.suspendedLanes | s) ? 0 : y, c !== 0 && c !== h.retryLane && (h.retryLane = c, Dt(e, c, -1));
          }
          Il(), t = Ts(e, t, s, Error(a(421)));
        } else
          Za(N) ? (t.flags |= 128, t.child = e.child, t = Np.bind(null, e), zd(N, t), t = null) : (s = h.treeContext, ue && (At = bd(N), Tt = t, ze = !0, Qt = null, ui = !1, s !== null && (Nt[It++] = gn, Nt[It++] = vn, Nt[It++] = Qn, gn = s.id, vn = s.overflow, Qn = t)), t = dl(t, t.pendingProps.children), t.flags |= 4096);
        return t;
      }
      return y ? (c = nc(e, t, c.children, c.fallback, s), y = t.child, h = e.child.memoizedState, y.memoizedState = h === null ? Es(s) : { baseLanes: h.baseLanes | s, cachePool: null }, y.childLanes = e.childLanes & ~s, t.memoizedState = _s, c) : (s = tc(e, t, c.children, s), t.memoizedState = null, s);
    }
    return y ? (c = nc(e, t, c.children, c.fallback, s), y = t.child, h = e.child.memoizedState, y.memoizedState = h === null ? Es(s) : { baseLanes: h.baseLanes | s, cachePool: null }, y.childLanes = e.childLanes & ~s, t.memoizedState = _s, c) : (s = tc(e, t, c.children, s), t.memoizedState = null, s);
  }
  function dl(e, t) {
    return t = Vs({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function tc(e, t, s, c) {
    var h = e.child;
    return e = h.sibling, s = kn(h, { mode: "visible", children: s }), !(t.mode & 1) && (s.lanes = c), s.return = t, s.sibling = null, e !== null && (c = t.deletions, c === null ? (t.deletions = [e], t.flags |= 16) : c.push(e)), t.child = s;
  }
  function nc(e, t, s, c, h) {
    var y = t.mode;
    e = e.child;
    var C = e.sibling, N = { mode: "hidden", children: s };
    return !(y & 1) && t.child !== e ? (s = t.child, s.childLanes = 0, s.pendingProps = N, t.deletions = null) : (s = kn(e, N), s.subtreeFlags = e.subtreeFlags & 14680064), C !== null ? c = kn(C, c) : (c = rr(c, y, h, null), c.flags |= 2), c.return = t, s.return = t, s.sibling = c, t.child = s, c;
  }
  function Ts(e, t, s, c) {
    return c !== null && Zo(c), Sr(t, e.child, null, s), e = dl(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function rc(e, t, s) {
    e.lanes |= t;
    var c = e.alternate;
    c !== null && (c.lanes |= t), Vo(e.return, t, s);
  }
  function pl(e, t, s, c, h) {
    var y = e.memoizedState;
    y === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: c, tail: s, tailMode: h } : (y.isBackwards = t, y.rendering = null, y.renderingStartTime = 0, y.last = c, y.tail = s, y.tailMode = h);
  }
  function ic(e, t, s) {
    var c = t.pendingProps, h = c.revealOrder, y = c.tail;
    if (dt(e, t, c.children, s), c = De.current, c & 2)
      c = c & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && e.flags & 128)
        e:
          for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && rc(e, s, t);
            else if (e.tag === 19)
              rc(e, s, t);
            else if (e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t)
              break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break e;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
      c &= 1;
    }
    if (Le(De, c), !(t.mode & 1))
      t.memoizedState = null;
    else
      switch (h) {
        case "forwards":
          for (s = t.child, h = null; s !== null; )
            e = s.alternate, e !== null && ds(e) === null && (h = s), s = s.sibling;
          s = h, s === null ? (h = t.child, t.child = null) : (h = s.sibling, s.sibling = null), pl(t, !1, h, s, y);
          break;
        case "backwards":
          for (s = null, h = t.child, t.child = null; h !== null; ) {
            if (e = h.alternate, e !== null && ds(e) === null) {
              t.child = h;
              break;
            }
            e = h.sibling, h.sibling = s, s = h, h = e;
          }
          pl(t, !0, s, null, y);
          break;
        case "together":
          pl(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function xn(e, t, s) {
    if (e !== null && (t.dependencies = e.dependencies), Pr |= t.lanes, !(s & t.childLanes))
      return null;
    if (e !== null && t.child !== e.child)
      throw Error(a(153));
    if (t.child !== null) {
      for (e = t.child, s = kn(e, e.pendingProps), t.child = s, s.return = t; e.sibling !== null; )
        e = e.sibling, s = s.sibling = kn(e, e.pendingProps), s.return = t;
      s.sibling = null;
    }
    return t.child;
  }
  function xp(e, t, s) {
    switch (t.tag) {
      case 3:
        Ju(t), wr();
        break;
      case 5:
        wu(t);
        break;
      case 1:
        xt(t.type) && Zi(t);
        break;
      case 4:
        Jo(t, t.stateNode.containerInfo);
        break;
      case 10:
        su(t, t.type._context, t.memoizedProps.value);
        break;
      case 13:
        var c = t.memoizedState;
        if (c !== null)
          return c.dehydrated !== null ? (Le(De, De.current & 1), t.flags |= 128, null) : s & t.child.childLanes ? ec(e, t, s) : (Le(De, De.current & 1), e = xn(e, t, s), e !== null ? e.sibling : null);
        Le(De, De.current & 1);
        break;
      case 19:
        if (c = (s & t.childLanes) !== 0, e.flags & 128) {
          if (c)
            return ic(
              e,
              t,
              s
            );
          t.flags |= 128;
        }
        var h = t.memoizedState;
        if (h !== null && (h.rendering = null, h.tail = null, h.lastEffect = null), Le(De, De.current), c)
          break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Qu(e, t, s);
    }
    return xn(e, t, s);
  }
  function wp(e, t) {
    switch (Yo(t), t.tag) {
      case 1:
        return xt(t.type) && qi(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Er(), Re(yt), Re(ot), tl(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return $o(t), null;
      case 13:
        if (Re(De), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(a(340));
          wr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Re(De), null;
      case 4:
        return Er(), null;
      case 10:
        return Ho(t.type._context), null;
      case 22:
      case 23:
        return Nl(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var As = !1, Jn = !1, Sp = typeof WeakSet == "function" ? WeakSet : Set, Q = null;
  function Ps(e, t) {
    var s = e.ref;
    if (s !== null)
      if (typeof s == "function")
        try {
          s(null);
        } catch (c) {
          _t(e, t, c);
        }
      else
        s.current = null;
  }
  function hl(e, t, s) {
    try {
      s();
    } catch (c) {
      _t(e, t, c);
    }
  }
  var sc = !1;
  function _p(e, t) {
    for (J(e.containerInfo), Q = t; Q !== null; )
      if (e = Q, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, Q = t;
      else
        for (; Q !== null; ) {
          e = Q;
          try {
            var s = e.alternate;
            if (e.flags & 1024)
              switch (e.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (s !== null) {
                    var c = s.memoizedProps, h = s.memoizedState, y = e.stateNode, C = y.getSnapshotBeforeUpdate(e.elementType === e.type ? c : Yt(e.type, c), h);
                    y.__reactInternalSnapshotBeforeUpdate = C;
                  }
                  break;
                case 3:
                  Pe && $t(e.stateNode.containerInfo);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(a(163));
              }
          } catch (N) {
            _t(e, e.return, N);
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, Q = t;
            break;
          }
          Q = e.return;
        }
    return s = sc, sc = !1, s;
  }
  function $n(e, t, s) {
    var c = t.updateQueue;
    if (c = c !== null ? c.lastEffect : null, c !== null) {
      var h = c = c.next;
      do {
        if ((h.tag & e) === e) {
          var y = h.destroy;
          h.destroy = void 0, y !== void 0 && hl(t, s, y);
        }
        h = h.next;
      } while (h !== c);
    }
  }
  function Si(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var s = t = t.next;
      do {
        if ((s.tag & e) === e) {
          var c = s.create;
          s.destroy = c();
        }
        s = s.next;
      } while (s !== t);
    }
  }
  function ml(e) {
    var t = e.ref;
    if (t !== null) {
      var s = e.stateNode;
      switch (e.tag) {
        case 5:
          e = ae(s);
          break;
        default:
          e = s;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function oc(e, t, s) {
    if (en && typeof en.onCommitFiberUnmount == "function")
      try {
        en.onCommitFiberUnmount(ts, t);
      } catch {
      }
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (e = t.updateQueue, e !== null && (e = e.lastEffect, e !== null)) {
          var c = e = e.next;
          do {
            var h = c, y = h.destroy;
            h = h.tag, y !== void 0 && (h & 2 || h & 4) && hl(t, s, y), c = c.next;
          } while (c !== e);
        }
        break;
      case 1:
        if (Ps(t, s), e = t.stateNode, typeof e.componentWillUnmount == "function")
          try {
            e.props = t.memoizedProps, e.state = t.memoizedState, e.componentWillUnmount();
          } catch (C) {
            _t(
              t,
              s,
              C
            );
          }
        break;
      case 5:
        Ps(t, s);
        break;
      case 4:
        Pe ? dc(e, t, s) : Ve && Ve && (t = t.stateNode.containerInfo, s = ii(t), Pn(t, s));
    }
  }
  function lc(e, t, s) {
    for (var c = t; ; )
      if (oc(e, c, s), c.child === null || Pe && c.tag === 4) {
        if (c === t)
          break;
        for (; c.sibling === null; ) {
          if (c.return === null || c.return === t)
            return;
          c = c.return;
        }
        c.sibling.return = c.return, c = c.sibling;
      } else
        c.child.return = c, c = c.child;
  }
  function ac(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ac(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Vi(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function uc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function cc(e) {
    e:
      for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || uc(e.return))
            return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.flags & 2 || e.child === null || e.tag === 4)
            continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2))
          return e.stateNode;
      }
  }
  function fc(e) {
    if (Pe) {
      e: {
        for (var t = e.return; t !== null; ) {
          if (uc(t))
            break e;
          t = t.return;
        }
        throw Error(a(160));
      }
      var s = t;
      switch (s.tag) {
        case 5:
          t = s.stateNode, s.flags & 32 && (K(t), s.flags &= -33), s = cc(e), vl(e, s, t);
          break;
        case 3:
        case 4:
          t = s.stateNode.containerInfo, s = cc(e), gl(e, s, t);
          break;
        default:
          throw Error(a(161));
      }
    }
  }
  function gl(e, t, s) {
    var c = e.tag;
    if (c === 5 || c === 6)
      e = e.stateNode, t ? Qi(s, e, t) : Ao(s, e);
    else if (c !== 4 && (e = e.child, e !== null))
      for (gl(e, t, s), e = e.sibling; e !== null; )
        gl(e, t, s), e = e.sibling;
  }
  function vl(e, t, s) {
    var c = e.tag;
    if (c === 5 || c === 6)
      e = e.stateNode, t ? Yi(s, e, t) : ni(s, e);
    else if (c !== 4 && (e = e.child, e !== null))
      for (vl(e, t, s), e = e.sibling; e !== null; )
        vl(e, t, s), e = e.sibling;
  }
  function dc(e, t, s) {
    for (var c = t, h = !1, y, C; ; ) {
      if (!h) {
        h = c.return;
        e:
          for (; ; ) {
            if (h === null)
              throw Error(a(160));
            switch (y = h.stateNode, h.tag) {
              case 5:
                C = !1;
                break e;
              case 3:
                y = y.containerInfo, C = !0;
                break e;
              case 4:
                y = y.containerInfo, C = !0;
                break e;
            }
            h = h.return;
          }
        h = !0;
      }
      if (c.tag === 5 || c.tag === 6)
        lc(e, c, s), C ? D(y, c.stateNode) : ri(y, c.stateNode);
      else if (c.tag === 18)
        C ? Vd(y, c.stateNode) : Hd(y, c.stateNode);
      else if (c.tag === 4) {
        if (c.child !== null) {
          y = c.stateNode.containerInfo, C = !0, c.child.return = c, c = c.child;
          continue;
        }
      } else if (oc(e, c, s), c.child !== null) {
        c.child.return = c, c = c.child;
        continue;
      }
      if (c === t)
        break;
      for (; c.sibling === null; ) {
        if (c.return === null || c.return === t)
          return;
        c = c.return, c.tag === 4 && (h = !1);
      }
      c.sibling.return = c.return, c = c.sibling;
    }
  }
  function yl(e, t) {
    if (Pe) {
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          $n(3, t, t.return), Si(3, t), $n(5, t, t.return);
          return;
        case 1:
          return;
        case 5:
          var s = t.stateNode;
          if (s != null) {
            var c = t.memoizedProps;
            e = e !== null ? e.memoizedProps : c;
            var h = t.type, y = t.updateQueue;
            t.updateQueue = null, y !== null && Co(s, y, h, e, c, t);
          }
          return;
        case 6:
          if (t.stateNode === null)
            throw Error(a(162));
          s = t.memoizedProps, Po(t.stateNode, e !== null ? e.memoizedProps : s, s);
          return;
        case 3:
          ue && e !== null && e.memoizedState.isDehydrated && Ja(t.stateNode.containerInfo);
          return;
        case 12:
          return;
        case 13:
          Cs(t);
          return;
        case 19:
          Cs(t);
          return;
        case 17:
          return;
      }
      throw Error(a(163));
    }
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        $n(3, t, t.return), Si(3, t), $n(5, t, t.return);
        return;
      case 12:
        return;
      case 13:
        Cs(t);
        return;
      case 19:
        Cs(t);
        return;
      case 3:
        ue && e !== null && e.memoizedState.isDehydrated && Ja(t.stateNode.containerInfo);
        break;
      case 22:
      case 23:
        return;
    }
    e:
      if (Ve) {
        switch (t.tag) {
          case 1:
          case 5:
          case 6:
            break e;
          case 3:
          case 4:
            t = t.stateNode, Pn(t.containerInfo, t.pendingChildren);
            break e;
        }
        throw Error(a(163));
      }
  }
  function Cs(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var s = e.stateNode;
      s === null && (s = e.stateNode = new Sp()), t.forEach(function(c) {
        var h = Ip.bind(null, e, c);
        s.has(c) || (s.add(c), c.then(h, h));
      });
    }
  }
  function Ep(e, t) {
    for (Q = t; Q !== null; ) {
      t = Q;
      var s = t.deletions;
      if (s !== null)
        for (var c = 0; c < s.length; c++) {
          var h = s[c];
          try {
            var y = e;
            Pe ? dc(y, h, t) : lc(y, h, t);
            var C = h.alternate;
            C !== null && (C.return = null), h.return = null;
          } catch (ne) {
            _t(h, t, ne);
          }
        }
      if (s = t.child, t.subtreeFlags & 12854 && s !== null)
        s.return = t, Q = s;
      else
        for (; Q !== null; ) {
          t = Q;
          try {
            var N = t.flags;
            if (N & 32 && Pe && K(t.stateNode), N & 512) {
              var H = t.alternate;
              if (H !== null) {
                var X = H.ref;
                X !== null && (typeof X == "function" ? X(null) : X.current = null);
              }
            }
            if (N & 8192)
              switch (t.tag) {
                case 13:
                  if (t.memoizedState !== null) {
                    var $ = t.alternate;
                    ($ === null || $.memoizedState === null) && (Al = qe());
                  }
                  break;
                case 22:
                  var pe = t.memoizedState !== null, oe = t.alternate, Ce = oe !== null && oe.memoizedState !== null;
                  if (s = t, Pe) {
                    e:
                      if (c = s, h = pe, y = null, Pe)
                        for (var ie = c; ; ) {
                          if (ie.tag === 5) {
                            if (y === null) {
                              y = ie;
                              var ct = ie.stateNode;
                              h ? ce(ct) : Ge(ie.stateNode, ie.memoizedProps);
                            }
                          } else if (ie.tag === 6) {
                            if (y === null) {
                              var kt = ie.stateNode;
                              h ? _e(kt) : Wt(kt, ie.memoizedProps);
                            }
                          } else if ((ie.tag !== 22 && ie.tag !== 23 || ie.memoizedState === null || ie === c) && ie.child !== null) {
                            ie.child.return = ie, ie = ie.child;
                            continue;
                          }
                          if (ie === c)
                            break;
                          for (; ie.sibling === null; ) {
                            if (ie.return === null || ie.return === c)
                              break e;
                            y === ie && (y = null), ie = ie.return;
                          }
                          y === ie && (y = null), ie.sibling.return = ie.return, ie = ie.sibling;
                        }
                  }
                  if (pe && !Ce && s.mode & 1) {
                    Q = s;
                    for (var F = s.child; F !== null; ) {
                      for (s = Q = F; Q !== null; ) {
                        c = Q;
                        var O = c.child;
                        switch (c.tag) {
                          case 0:
                          case 11:
                          case 14:
                          case 15:
                            $n(4, c, c.return);
                            break;
                          case 1:
                            Ps(c, c.return);
                            var U = c.stateNode;
                            if (typeof U.componentWillUnmount == "function") {
                              var q = c.return;
                              try {
                                U.props = c.memoizedProps, U.state = c.memoizedState, U.componentWillUnmount();
                              } catch (ne) {
                                _t(
                                  c,
                                  q,
                                  ne
                                );
                              }
                            }
                            break;
                          case 5:
                            Ps(c, c.return);
                            break;
                          case 22:
                            if (c.memoizedState !== null) {
                              mc(s);
                              continue;
                            }
                        }
                        O !== null ? (O.return = c, Q = O) : mc(s);
                      }
                      F = F.sibling;
                    }
                  }
              }
            switch (N & 4102) {
              case 2:
                fc(t), t.flags &= -3;
                break;
              case 6:
                fc(t), t.flags &= -3, yl(t.alternate, t);
                break;
              case 4096:
                t.flags &= -4097;
                break;
              case 4100:
                t.flags &= -4097, yl(t.alternate, t);
                break;
              case 4:
                yl(t.alternate, t);
            }
          } catch (ne) {
            _t(t, t.return, ne);
          }
          if (s = t.sibling, s !== null) {
            s.return = t.return, Q = s;
            break;
          }
          Q = t.return;
        }
    }
  }
  function Tp(e, t, s) {
    Q = e, pc(e);
  }
  function pc(e, t, s) {
    for (var c = (e.mode & 1) !== 0; Q !== null; ) {
      var h = Q, y = h.child;
      if (h.tag === 22 && c) {
        var C = h.memoizedState !== null || As;
        if (!C) {
          var N = h.alternate, H = N !== null && N.memoizedState !== null || Jn;
          N = As;
          var X = Jn;
          if (As = C, (Jn = H) && !X)
            for (Q = h; Q !== null; )
              C = Q, H = C.child, C.tag === 22 && C.memoizedState !== null ? gc(h) : H !== null ? (H.return = C, Q = H) : gc(h);
          for (; y !== null; )
            Q = y, pc(y), y = y.sibling;
          Q = h, As = N, Jn = X;
        }
        hc(e);
      } else
        h.subtreeFlags & 8772 && y !== null ? (y.return = h, Q = y) : hc(e);
    }
  }
  function hc(e) {
    for (; Q !== null; ) {
      var t = Q;
      if (t.flags & 8772) {
        var s = t.alternate;
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Jn || Si(5, t);
                break;
              case 1:
                var c = t.stateNode;
                if (t.flags & 4 && !Jn)
                  if (s === null)
                    c.componentDidMount();
                  else {
                    var h = t.elementType === t.type ? s.memoizedProps : Yt(t.type, s.memoizedProps);
                    c.componentDidUpdate(h, s.memoizedState, c.__reactInternalSnapshotBeforeUpdate);
                  }
                var y = t.updateQueue;
                y !== null && au(t, y, c);
                break;
              case 3:
                var C = t.updateQueue;
                if (C !== null) {
                  if (s = null, t.child !== null)
                    switch (t.child.tag) {
                      case 5:
                        s = ae(t.child.stateNode);
                        break;
                      case 1:
                        s = t.child.stateNode;
                    }
                  au(t, C, s);
                }
                break;
              case 5:
                var N = t.stateNode;
                s === null && t.flags & 4 && Ki(N, t.type, t.memoizedProps, t);
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (ue && t.memoizedState === null) {
                  var H = t.alternate;
                  if (H !== null) {
                    var X = H.memoizedState;
                    if (X !== null) {
                      var $ = X.dehydrated;
                      $ !== null && Ud($);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
                break;
              default:
                throw Error(a(163));
            }
          Jn || t.flags & 512 && ml(t);
        } catch (pe) {
          _t(t, t.return, pe);
        }
      }
      if (t === e) {
        Q = null;
        break;
      }
      if (s = t.sibling, s !== null) {
        s.return = t.return, Q = s;
        break;
      }
      Q = t.return;
    }
  }
  function mc(e) {
    for (; Q !== null; ) {
      var t = Q;
      if (t === e) {
        Q = null;
        break;
      }
      var s = t.sibling;
      if (s !== null) {
        s.return = t.return, Q = s;
        break;
      }
      Q = t.return;
    }
  }
  function gc(e) {
    for (; Q !== null; ) {
      var t = Q;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var s = t.return;
            try {
              Si(4, t);
            } catch (H) {
              _t(t, s, H);
            }
            break;
          case 1:
            var c = t.stateNode;
            if (typeof c.componentDidMount == "function") {
              var h = t.return;
              try {
                c.componentDidMount();
              } catch (H) {
                _t(t, h, H);
              }
            }
            var y = t.return;
            try {
              ml(t);
            } catch (H) {
              _t(t, y, H);
            }
            break;
          case 5:
            var C = t.return;
            try {
              ml(t);
            } catch (H) {
              _t(t, C, H);
            }
        }
      } catch (H) {
        _t(t, t.return, H);
      }
      if (t === e) {
        Q = null;
        break;
      }
      var N = t.sibling;
      if (N !== null) {
        N.return = t.return, Q = N;
        break;
      }
      Q = t.return;
    }
  }
  var Ms = 0, Ls = 1, Rs = 2, Ns = 3, Is = 4;
  if (typeof Symbol == "function" && Symbol.for) {
    var _i = Symbol.for;
    Ms = _i("selector.component"), Ls = _i("selector.has_pseudo_class"), Rs = _i("selector.role"), Ns = _i("selector.test_id"), Is = _i("selector.text");
  }
  function xl(e) {
    var t = Ie(e);
    if (t != null) {
      if (typeof t.memoizedProps["data-testname"] != "string")
        throw Error(a(364));
      return t;
    }
    if (e = Wi(e), e === null)
      throw Error(a(362));
    return e.stateNode.current;
  }
  function wl(e, t) {
    switch (t.$$typeof) {
      case Ms:
        if (e.type === t.value)
          return !0;
        break;
      case Ls:
        e: {
          t = t.value, e = [e, 0];
          for (var s = 0; s < e.length; ) {
            var c = e[s++], h = e[s++], y = t[h];
            if (c.tag !== 5 || !An(c)) {
              for (; y != null && wl(c, y); )
                h++, y = t[h];
              if (h === t.length) {
                t = !0;
                break e;
              } else
                for (c = c.child; c !== null; )
                  e.push(c, h), c = c.sibling;
            }
          }
          t = !1;
        }
        return t;
      case Rs:
        if (e.tag === 5 && Eo(e.stateNode, t.value))
          return !0;
        break;
      case Is:
        if ((e.tag === 5 || e.tag === 6) && (e = ti(e), e !== null && 0 <= e.indexOf(t.value)))
          return !0;
        break;
      case Ns:
        if (e.tag === 5 && (e = e.memoizedProps["data-testname"], typeof e == "string" && e.toLowerCase() === t.value.toLowerCase()))
          return !0;
        break;
      default:
        throw Error(a(365));
    }
    return !1;
  }
  function Sl(e) {
    switch (e.$$typeof) {
      case Ms:
        return "<" + (R(e.value) || "Unknown") + ">";
      case Ls:
        return ":has(" + (Sl(e) || "") + ")";
      case Rs:
        return '[role="' + e.value + '"]';
      case Is:
        return '"' + e.value + '"';
      case Ns:
        return '[data-testname="' + e.value + '"]';
      default:
        throw Error(a(365));
    }
  }
  function vc(e, t) {
    var s = [];
    e = [e, 0];
    for (var c = 0; c < e.length; ) {
      var h = e[c++], y = e[c++], C = t[y];
      if (h.tag !== 5 || !An(h)) {
        for (; C != null && wl(h, C); )
          y++, C = t[y];
        if (y === t.length)
          s.push(h);
        else
          for (h = h.child; h !== null; )
            e.push(h, y), h = h.sibling;
      }
    }
    return s;
  }
  function _l(e, t) {
    if (!Kn)
      throw Error(a(363));
    e = xl(e), e = vc(e, t), t = [], e = Array.from(e);
    for (var s = 0; s < e.length; ) {
      var c = e[s++];
      if (c.tag === 5)
        An(c) || t.push(c.stateNode);
      else
        for (c = c.child; c !== null; )
          e.push(c), c = c.sibling;
    }
    return t;
  }
  var Ap = Math.ceil, zs = d.ReactCurrentDispatcher, El = d.ReactCurrentOwner, He = d.ReactCurrentBatchConfig, ve = 0, We = null, Xe = null, et = 0, Ct = 0, Ar = Ln(0), Qe = 0, Ei = null, Pr = 0, Os = 0, Tl = 0, Ti = null, wt = null, Al = 0, Pl = 1 / 0;
  function Cr() {
    Pl = qe() + 500;
  }
  var Ds = !1, Cl = null, zn = null, bs = !1, On = null, ks = 0, Ai = 0, Ml = null, Fs = -1, Bs = 0;
  function pt() {
    return ve & 6 ? qe() : Fs !== -1 ? Fs : Fs = qe();
  }
  function Dn(e) {
    return e.mode & 1 ? ve & 2 && et !== 0 ? et & -et : lp.transition !== null ? (Bs === 0 && (e = Ji, Ji <<= 1, !(Ji & 4194240) && (Ji = 64), Bs = e), Bs) : (e = Ee, e !== 0 ? e : vt()) : 1;
  }
  function Dt(e, t, s) {
    if (50 < Ai)
      throw Ai = 0, Ml = null, Error(a(185));
    var c = js(e, t);
    return c === null ? null : (ai(c, t, s), (!(ve & 2) || c !== We) && (c === We && (!(ve & 2) && (Os |= t), Qe === 4 && bn(c, et)), St(c, s), t === 1 && ve === 0 && !(e.mode & 1) && (Cr(), ns && nn())), c);
  }
  function js(e, t) {
    e.lanes |= t;
    var s = e.alternate;
    for (s !== null && (s.lanes |= t), s = e, e = e.return; e !== null; )
      e.childLanes |= t, s = e.alternate, s !== null && (s.childLanes |= t), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  function St(e, t) {
    var s = e.callbackNode;
    Jd(e, t);
    var c = es(e, e === We ? et : 0);
    if (c === 0)
      s !== null && ru(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = c & -c, e.callbackPriority !== t) {
      if (s != null && ru(s), t === 1)
        e.tag === 0 ? op(xc.bind(null, e)) : iu(xc.bind(null, e)), Gi ? _o(function() {
          ve === 0 && nn();
        }) : bo(ko, nn), s = null;
      else {
        switch (nu(c)) {
          case 1:
            s = ko;
            break;
          case 4:
            s = np;
            break;
          case 16:
            s = Fo;
            break;
          case 536870912:
            s = rp;
            break;
          default:
            s = Fo;
        }
        s = Mc(s, yc.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = s;
    }
  }
  function yc(e, t) {
    if (Fs = -1, Bs = 0, ve & 6)
      throw Error(a(327));
    var s = e.callbackNode;
    if (nr() && e.callbackNode !== s)
      return null;
    var c = es(e, e === We ? et : 0);
    if (c === 0)
      return null;
    if (c & 30 || c & e.expiredLanes || t)
      t = Us(e, c);
    else {
      t = c;
      var h = ve;
      ve |= 2;
      var y = _c();
      (We !== e || et !== t) && (Cr(), er(e, t));
      do
        try {
          Mp();
          break;
        } catch (N) {
          Sc(e, N);
        }
      while (1);
      Uo(), zs.current = y, ve = h, Xe !== null ? t = 0 : (We = null, et = 0, t = Qe);
    }
    if (t !== 0) {
      if (t === 2 && (h = zo(e), h !== 0 && (c = h, t = Ll(e, h))), t === 1)
        throw s = Ei, er(e, 0), bn(e, c), St(e, qe()), s;
      if (t === 6)
        bn(e, c);
      else {
        if (h = e.current.alternate, !(c & 30) && !Pp(h) && (t = Us(e, c), t === 2 && (y = zo(e), y !== 0 && (c = y, t = Ll(e, y))), t === 1))
          throw s = Ei, er(e, 0), bn(e, c), St(e, qe()), s;
        switch (e.finishedWork = h, e.finishedLanes = c, t) {
          case 0:
          case 1:
            throw Error(a(345));
          case 2:
            tr(e, wt);
            break;
          case 3:
            if (bn(e, c), (c & 130023424) === c && (t = Al + 500 - qe(), 10 < t)) {
              if (es(e, 0) !== 0)
                break;
              if (h = e.suspendedLanes, (h & c) !== c) {
                pt(), e.pingedLanes |= e.suspendedLanes & h;
                break;
              }
              e.timeoutHandle = se(tr.bind(null, e, wt), t);
              break;
            }
            tr(e, wt);
            break;
          case 4:
            if (bn(e, c), (c & 4194240) === c)
              break;
            for (t = e.eventTimes, h = -1; 0 < c; ) {
              var C = 31 - Kt(c);
              y = 1 << C, C = t[C], C > h && (h = C), c &= ~y;
            }
            if (c = h, c = qe() - c, c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * Ap(c / 1960)) - c, 10 < c) {
              e.timeoutHandle = se(tr.bind(null, e, wt), c);
              break;
            }
            tr(e, wt);
            break;
          case 5:
            tr(e, wt);
            break;
          default:
            throw Error(a(329));
        }
      }
    }
    return St(e, qe()), e.callbackNode === s ? yc.bind(null, e) : null;
  }
  function Ll(e, t) {
    var s = Ti;
    return e.current.memoizedState.isDehydrated && (er(e, t).flags |= 256), e = Us(e, t), e !== 2 && (t = wt, wt = s, t !== null && Rl(t)), e;
  }
  function Rl(e) {
    wt === null ? wt = e : wt.push.apply(wt, e);
  }
  function Pp(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var s = t.updateQueue;
        if (s !== null && (s = s.stores, s !== null))
          for (var c = 0; c < s.length; c++) {
            var h = s[c], y = h.getSnapshot;
            h = h.value;
            try {
              if (!tn(y(), h))
                return !1;
            } catch {
              return !1;
            }
          }
      }
      if (s = t.child, t.subtreeFlags & 16384 && s !== null)
        s.return = t, t = s;
      else {
        if (t === e)
          break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function bn(e, t) {
    for (t &= ~Tl, t &= ~Os, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var s = 31 - Kt(t), c = 1 << s;
      e[s] = -1, t &= ~c;
    }
  }
  function xc(e) {
    if (ve & 6)
      throw Error(a(327));
    nr();
    var t = es(e, 0);
    if (!(t & 1))
      return St(e, qe()), null;
    var s = Us(e, t);
    if (e.tag !== 0 && s === 2) {
      var c = zo(e);
      c !== 0 && (t = c, s = Ll(e, c));
    }
    if (s === 1)
      throw s = Ei, er(e, 0), bn(e, t), St(e, qe()), s;
    if (s === 6)
      throw Error(a(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, tr(e, wt), St(e, qe()), null;
  }
  function wc(e) {
    On !== null && On.tag === 0 && !(ve & 6) && nr();
    var t = ve;
    ve |= 1;
    var s = He.transition, c = Ee;
    try {
      if (He.transition = null, Ee = 1, e)
        return e();
    } finally {
      Ee = c, He.transition = s, ve = t, !(ve & 6) && nn();
    }
  }
  function Nl() {
    Ct = Ar.current, Re(Ar);
  }
  function er(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== le && (e.timeoutHandle = le, fe(s)), Xe !== null)
      for (s = Xe.return; s !== null; ) {
        var c = s;
        switch (Yo(c), c.tag) {
          case 1:
            c = c.type.childContextTypes, c != null && qi();
            break;
          case 3:
            Er(), Re(yt), Re(ot), tl();
            break;
          case 5:
            $o(c);
            break;
          case 4:
            Er();
            break;
          case 13:
            Re(De);
            break;
          case 19:
            Re(De);
            break;
          case 10:
            Ho(c.type._context);
            break;
          case 22:
          case 23:
            Nl();
        }
        s = s.return;
      }
    if (We = e, Xe = e = kn(e.current, null), et = Ct = t, Qe = 0, Ei = null, Tl = Os = Pr = 0, wt = Ti = null, rn !== null) {
      for (t = 0; t < rn.length; t++)
        if (s = rn[t], c = s.interleaved, c !== null) {
          s.interleaved = null;
          var h = c.next, y = s.pending;
          if (y !== null) {
            var C = y.next;
            y.next = h, c.next = C;
          }
          s.pending = c;
        }
      rn = null;
    }
    return e;
  }
  function Sc(e, t) {
    do {
      var s = Xe;
      try {
        if (Uo(), ps.current = xs, hs) {
          for (var c = Be.memoizedState; c !== null; ) {
            var h = c.queue;
            h !== null && (h.pending = null), c = c.next;
          }
          hs = !1;
        }
        if (Tr = 0, Ze = lt = Be = null, hi = !1, mi = 0, El.current = null, s === null || s.return === null) {
          Qe = 1, Ei = t, Xe = null;
          break;
        }
        e: {
          var y = e, C = s.return, N = s, H = t;
          if (t = et, N.flags |= 32768, H !== null && typeof H == "object" && typeof H.then == "function") {
            var X = H, $ = N, pe = $.tag;
            if (!($.mode & 1) && (pe === 0 || pe === 11 || pe === 15)) {
              var oe = $.alternate;
              oe ? ($.updateQueue = oe.updateQueue, $.memoizedState = oe.memoizedState, $.lanes = oe.lanes) : ($.updateQueue = null, $.memoizedState = null);
            }
            var Ce = Hu(C);
            if (Ce !== null) {
              Ce.flags &= -257, Vu(Ce, C, N, y, t), Ce.mode & 1 && Uu(y, X, t), t = Ce, H = X;
              var ie = t.updateQueue;
              if (ie === null) {
                var ct = /* @__PURE__ */ new Set();
                ct.add(H), t.updateQueue = ct;
              } else
                ie.add(H);
              break e;
            } else {
              if (!(t & 1)) {
                Uu(y, X, t), Il();
                break e;
              }
              H = Error(a(426));
            }
          } else if (ze && N.mode & 1) {
            var kt = Hu(C);
            if (kt !== null) {
              !(kt.flags & 65536) && (kt.flags |= 256), Vu(kt, C, N, y, t), Zo(H);
              break e;
            }
          }
          y = H, Qe !== 4 && (Qe = 2), Ti === null ? Ti = [y] : Ti.push(y), H = al(H, N), N = C;
          do {
            switch (N.tag) {
              case 3:
                N.flags |= 65536, t &= -t, N.lanes |= t;
                var F = Bu(N, H, t);
                lu(N, F);
                break e;
              case 1:
                y = H;
                var O = N.type, U = N.stateNode;
                if (!(N.flags & 128) && (typeof O.getDerivedStateFromError == "function" || U !== null && typeof U.componentDidCatch == "function" && (zn === null || !zn.has(U)))) {
                  N.flags |= 65536, t &= -t, N.lanes |= t;
                  var q = ju(N, y, t);
                  lu(N, q);
                  break e;
                }
            }
            N = N.return;
          } while (N !== null);
        }
        Tc(s);
      } catch (ne) {
        t = ne, Xe === s && s !== null && (Xe = s = s.return);
        continue;
      }
      break;
    } while (1);
  }
  function _c() {
    var e = zs.current;
    return zs.current = xs, e === null ? xs : e;
  }
  function Il() {
    (Qe === 0 || Qe === 3 || Qe === 2) && (Qe = 4), We === null || !(Pr & 268435455) && !(Os & 268435455) || bn(We, et);
  }
  function Us(e, t) {
    var s = ve;
    ve |= 2;
    var c = _c();
    We === e && et === t || er(e, t);
    do
      try {
        Cp();
        break;
      } catch (h) {
        Sc(e, h);
      }
    while (1);
    if (Uo(), ve = s, zs.current = c, Xe !== null)
      throw Error(a(261));
    return We = null, et = 0, Qe;
  }
  function Cp() {
    for (; Xe !== null; )
      Ec(Xe);
  }
  function Mp() {
    for (; Xe !== null && !ep(); )
      Ec(Xe);
  }
  function Ec(e) {
    var t = Cc(e.alternate, e, Ct);
    e.memoizedProps = e.pendingProps, t === null ? Tc(e) : Xe = t, El.current = null;
  }
  function Tc(e) {
    var t = e;
    do {
      var s = t.alternate;
      if (e = t.return, t.flags & 32768) {
        if (s = wp(s, t), s !== null) {
          s.flags &= 32767, Xe = s;
          return;
        }
        if (e !== null)
          e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Qe = 6, Xe = null;
          return;
        }
      } else if (s = vp(s, t, Ct), s !== null) {
        Xe = s;
        return;
      }
      if (t = t.sibling, t !== null) {
        Xe = t;
        return;
      }
      Xe = t = e;
    } while (t !== null);
    Qe === 0 && (Qe = 5);
  }
  function tr(e, t) {
    var s = Ee, c = He.transition;
    try {
      He.transition = null, Ee = 1, Lp(e, t, s);
    } finally {
      He.transition = c, Ee = s;
    }
    return null;
  }
  function Lp(e, t, s) {
    do
      nr();
    while (On !== null);
    if (ve & 6)
      throw Error(a(327));
    var c = e.finishedWork, h = e.finishedLanes;
    if (c === null)
      return null;
    if (e.finishedWork = null, e.finishedLanes = 0, c === e.current)
      throw Error(a(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var y = c.lanes | c.childLanes;
    if ($d(e, y), e === We && (Xe = We = null, et = 0), !(c.subtreeFlags & 2064) && !(c.flags & 2064) || bs || (bs = !0, Mc(Fo, function() {
      return nr(), null;
    })), y = (c.flags & 15990) !== 0, c.subtreeFlags & 15990 || y) {
      y = He.transition, He.transition = null;
      var C = Ee;
      Ee = 1;
      var N = ve;
      ve |= 4, El.current = null, _p(e, c), Ep(e, c), Z(e.containerInfo), e.current = c, Tp(c), tp(), ve = N, Ee = C, He.transition = y;
    } else
      e.current = c;
    if (bs && (bs = !1, On = e, ks = h), y = e.pendingLanes, y === 0 && (zn = null), ip(c.stateNode), St(e, qe()), t !== null)
      for (s = e.onRecoverableError, c = 0; c < t.length; c++)
        s(t[c]);
    if (Ds)
      throw Ds = !1, e = Cl, Cl = null, e;
    return ks & 1 && e.tag !== 0 && nr(), y = e.pendingLanes, y & 1 ? e === Ml ? Ai++ : (Ai = 0, Ml = e) : Ai = 0, nn(), null;
  }
  function nr() {
    if (On !== null) {
      var e = nu(ks), t = He.transition, s = Ee;
      try {
        if (He.transition = null, Ee = 16 > e ? 16 : e, On === null)
          var c = !1;
        else {
          if (e = On, On = null, ks = 0, ve & 6)
            throw Error(a(331));
          var h = ve;
          for (ve |= 4, Q = e.current; Q !== null; ) {
            var y = Q, C = y.child;
            if (Q.flags & 16) {
              var N = y.deletions;
              if (N !== null) {
                for (var H = 0; H < N.length; H++) {
                  var X = N[H];
                  for (Q = X; Q !== null; ) {
                    var $ = Q;
                    switch ($.tag) {
                      case 0:
                      case 11:
                      case 15:
                        $n(8, $, y);
                    }
                    var pe = $.child;
                    if (pe !== null)
                      pe.return = $, Q = pe;
                    else
                      for (; Q !== null; ) {
                        $ = Q;
                        var oe = $.sibling, Ce = $.return;
                        if (ac($), $ === X) {
                          Q = null;
                          break;
                        }
                        if (oe !== null) {
                          oe.return = Ce, Q = oe;
                          break;
                        }
                        Q = Ce;
                      }
                  }
                }
                var ie = y.alternate;
                if (ie !== null) {
                  var ct = ie.child;
                  if (ct !== null) {
                    ie.child = null;
                    do {
                      var kt = ct.sibling;
                      ct.sibling = null, ct = kt;
                    } while (ct !== null);
                  }
                }
                Q = y;
              }
            }
            if (y.subtreeFlags & 2064 && C !== null)
              C.return = y, Q = C;
            else
              e:
                for (; Q !== null; ) {
                  if (y = Q, y.flags & 2048)
                    switch (y.tag) {
                      case 0:
                      case 11:
                      case 15:
                        $n(9, y, y.return);
                    }
                  var F = y.sibling;
                  if (F !== null) {
                    F.return = y.return, Q = F;
                    break e;
                  }
                  Q = y.return;
                }
          }
          var O = e.current;
          for (Q = O; Q !== null; ) {
            C = Q;
            var U = C.child;
            if (C.subtreeFlags & 2064 && U !== null)
              U.return = C, Q = U;
            else
              e:
                for (C = O; Q !== null; ) {
                  if (N = Q, N.flags & 2048)
                    try {
                      switch (N.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Si(9, N);
                      }
                    } catch (ne) {
                      _t(N, N.return, ne);
                    }
                  if (N === C) {
                    Q = null;
                    break e;
                  }
                  var q = N.sibling;
                  if (q !== null) {
                    q.return = N.return, Q = q;
                    break e;
                  }
                  Q = N.return;
                }
          }
          if (ve = h, nn(), en && typeof en.onPostCommitFiberRoot == "function")
            try {
              en.onPostCommitFiberRoot(ts, e);
            } catch {
            }
          c = !0;
        }
        return c;
      } finally {
        Ee = s, He.transition = t;
      }
    }
    return !1;
  }
  function Ac(e, t, s) {
    t = al(s, t), t = Bu(e, t, 1), In(e, t), t = pt(), e = js(e, 1), e !== null && (ai(e, 1, t), St(e, t));
  }
  function _t(e, t, s) {
    if (e.tag === 3)
      Ac(e, e, s);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ac(t, e, s);
          break;
        } else if (t.tag === 1) {
          var c = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (zn === null || !zn.has(c))) {
            e = al(s, e), e = ju(t, e, 1), In(t, e), e = pt(), t = js(t, 1), t !== null && (ai(t, 1, e), St(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function Rp(e, t, s) {
    var c = e.pingCache;
    c !== null && c.delete(t), t = pt(), e.pingedLanes |= e.suspendedLanes & s, We === e && (et & s) === s && (Qe === 4 || Qe === 3 && (et & 130023424) === et && 500 > qe() - Al ? er(e, 0) : Tl |= s), St(e, t);
  }
  function Pc(e, t) {
    t === 0 && (e.mode & 1 ? (t = $i, $i <<= 1, !($i & 130023424) && ($i = 4194304)) : t = 1);
    var s = pt();
    e = js(e, t), e !== null && (ai(e, t, s), St(e, s));
  }
  function Np(e) {
    var t = e.memoizedState, s = 0;
    t !== null && (s = t.retryLane), Pc(e, s);
  }
  function Ip(e, t) {
    var s = 0;
    switch (e.tag) {
      case 13:
        var c = e.stateNode, h = e.memoizedState;
        h !== null && (s = h.retryLane);
        break;
      case 19:
        c = e.stateNode;
        break;
      default:
        throw Error(a(314));
    }
    c !== null && c.delete(t), Pc(e, s);
  }
  var Cc;
  Cc = function(e, t, s) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || yt.current)
        Pt = !0;
      else {
        if (!(e.lanes & s) && !(t.flags & 128))
          return Pt = !1, xp(e, t, s);
        Pt = !!(e.flags & 131072);
      }
    else
      Pt = !1, ze && t.flags & 1048576 && pu(t, cs, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var c = t.type;
        e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2), e = t.pendingProps;
        var h = mr(t, ot.current);
        vr(t, s), h = rl(null, t, c, e, h, s);
        var y = il();
        return t.flags |= 1, typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, xt(c) ? (y = !0, Zi(t)) : y = !1, t.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, Go(t), h.updater = as, t.stateNode = h, h._reactInternals = t, Xo(t, c, e, s), t = fl(null, t, c, !0, y, s)) : (t.tag = 0, ze && y && Ko(t), dt(null, t, h, s), t = t.child), t;
      case 16:
        c = t.elementType;
        e: {
          switch (e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2), e = t.pendingProps, h = c._init, c = h(c._payload), t.type = c, h = t.tag = Op(c), e = Yt(c, e), h) {
            case 0:
              t = cl(null, t, c, e, s);
              break e;
            case 1:
              t = Zu(
                null,
                t,
                c,
                e,
                s
              );
              break e;
            case 11:
              t = Xu(null, t, c, e, s);
              break e;
            case 14:
              t = Ku(null, t, c, Yt(c.type, e), s);
              break e;
          }
          throw Error(a(306, c, ""));
        }
        return t;
      case 0:
        return c = t.type, h = t.pendingProps, h = t.elementType === c ? h : Yt(c, h), cl(e, t, c, h, s);
      case 1:
        return c = t.type, h = t.pendingProps, h = t.elementType === c ? h : Yt(c, h), Zu(e, t, c, h, s);
      case 3:
        e: {
          if (Ju(t), e === null)
            throw Error(a(387));
          c = t.pendingProps, y = t.memoizedState, h = y.element, ou(e, t), ls(t, c, null, s);
          var C = t.memoizedState;
          if (c = C.element, ue && y.isDehydrated)
            if (y = {
              element: c,
              isDehydrated: !1,
              cache: C.cache,
              transitions: C.transitions
            }, t.updateQueue.baseState = y, t.memoizedState = y, t.flags & 256) {
              h = Error(a(423)), t = $u(e, t, c, s, h);
              break e;
            } else if (c !== h) {
              h = Error(a(424)), t = $u(e, t, c, s, h);
              break e;
            } else
              for (ue && (At = Dd(t.stateNode.containerInfo), Tt = t, ze = !0, Qt = null, ui = !1), s = xu(t, null, c, s), t.child = s; s; )
                s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (wr(), c === h) {
              t = xn(e, t, s);
              break e;
            }
            dt(e, t, c, s);
          }
          t = t.child;
        }
        return t;
      case 5:
        return wu(t), e === null && qo(t), c = t.type, h = t.pendingProps, y = e !== null ? e.memoizedProps : null, C = h.children, it(c, h) ? C = null : y !== null && it(c, y) && (t.flags |= 32), qu(e, t), dt(e, t, C, s), t.child;
      case 6:
        return e === null && qo(t), null;
      case 13:
        return ec(e, t, s);
      case 4:
        return Jo(t, t.stateNode.containerInfo), c = t.pendingProps, e === null ? t.child = Sr(t, null, c, s) : dt(e, t, c, s), t.child;
      case 11:
        return c = t.type, h = t.pendingProps, h = t.elementType === c ? h : Yt(c, h), Xu(e, t, c, h, s);
      case 7:
        return dt(e, t, t.pendingProps, s), t.child;
      case 8:
        return dt(e, t, t.pendingProps.children, s), t.child;
      case 12:
        return dt(e, t, t.pendingProps.children, s), t.child;
      case 10:
        e: {
          if (c = t.type._context, h = t.pendingProps, y = t.memoizedProps, C = h.value, su(t, c, C), y !== null)
            if (tn(y.value, C)) {
              if (y.children === h.children && !yt.current) {
                t = xn(e, t, s);
                break e;
              }
            } else
              for (y = t.child, y !== null && (y.return = t); y !== null; ) {
                var N = y.dependencies;
                if (N !== null) {
                  C = y.child;
                  for (var H = N.firstContext; H !== null; ) {
                    if (H.context === c) {
                      if (y.tag === 1) {
                        H = mn(-1, s & -s), H.tag = 2;
                        var X = y.updateQueue;
                        if (X !== null) {
                          X = X.shared;
                          var $ = X.pending;
                          $ === null ? H.next = H : (H.next = $.next, $.next = H), X.pending = H;
                        }
                      }
                      y.lanes |= s, H = y.alternate, H !== null && (H.lanes |= s), Vo(y.return, s, t), N.lanes |= s;
                      break;
                    }
                    H = H.next;
                  }
                } else if (y.tag === 10)
                  C = y.type === t.type ? null : y.child;
                else if (y.tag === 18) {
                  if (C = y.return, C === null)
                    throw Error(a(341));
                  C.lanes |= s, N = C.alternate, N !== null && (N.lanes |= s), Vo(C, s, t), C = y.sibling;
                } else
                  C = y.child;
                if (C !== null)
                  C.return = y;
                else
                  for (C = y; C !== null; ) {
                    if (C === t) {
                      C = null;
                      break;
                    }
                    if (y = C.sibling, y !== null) {
                      y.return = C.return, C = y;
                      break;
                    }
                    C = C.return;
                  }
                y = C;
              }
          dt(e, t, h.children, s), t = t.child;
        }
        return t;
      case 9:
        return h = t.type, c = t.pendingProps.children, vr(t, s), h = Rt(h), c = c(h), t.flags |= 1, dt(e, t, c, s), t.child;
      case 14:
        return c = t.type, h = Yt(c, t.pendingProps), h = Yt(c.type, h), Ku(e, t, c, h, s);
      case 15:
        return Yu(e, t, t.type, t.pendingProps, s);
      case 17:
        return c = t.type, h = t.pendingProps, h = t.elementType === c ? h : Yt(c, h), e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2), t.tag = 1, xt(c) ? (e = !0, Zi(t)) : e = !1, vr(t, s), fu(t, c, h), Xo(t, c, h, s), fl(null, t, c, !0, e, s);
      case 19:
        return ic(e, t, s);
      case 22:
        return Qu(e, t, s);
    }
    throw Error(a(156, t.tag));
  };
  function Mc(e, t) {
    return bo(e, t);
  }
  function zp(e, t, s, c) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function bt(e, t, s, c) {
    return new zp(e, t, s, c);
  }
  function zl(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Op(e) {
    if (typeof e == "function")
      return zl(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === P)
        return 11;
      if (e === S)
        return 14;
    }
    return 2;
  }
  function kn(e, t) {
    var s = e.alternate;
    return s === null ? (s = bt(e.tag, t, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = t, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, t = e.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function Hs(e, t, s, c, h, y) {
    var C = 2;
    if (c = e, typeof e == "function")
      zl(e) && (C = 1);
    else if (typeof e == "string")
      C = 5;
    else
      e:
        switch (e) {
          case p:
            return rr(s.children, h, y, t);
          case m:
            C = 8, h |= 8;
            break;
          case v:
            return e = bt(12, s, t, h | 2), e.elementType = v, e.lanes = y, e;
          case T:
            return e = bt(13, s, t, h), e.elementType = T, e.lanes = y, e;
          case w:
            return e = bt(19, s, t, h), e.elementType = w, e.lanes = y, e;
          case A:
            return Vs(s, h, y, t);
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case x:
                  C = 10;
                  break e;
                case _:
                  C = 9;
                  break e;
                case P:
                  C = 11;
                  break e;
                case S:
                  C = 14;
                  break e;
                case E:
                  C = 16, c = null;
                  break e;
              }
            throw Error(a(130, e == null ? e : typeof e, ""));
        }
    return t = bt(C, s, t, h), t.elementType = e, t.type = c, t.lanes = y, t;
  }
  function rr(e, t, s, c) {
    return e = bt(7, e, c, t), e.lanes = s, e;
  }
  function Vs(e, t, s, c) {
    return e = bt(22, e, c, t), e.elementType = A, e.lanes = s, e.stateNode = {}, e;
  }
  function Ol(e, t, s) {
    return e = bt(6, e, null, t), e.lanes = s, e;
  }
  function Dl(e, t, s) {
    return t = bt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = s, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Dp(e, t, s, c, h) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = le, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Oo(0), this.expirationTimes = Oo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Oo(0), this.identifierPrefix = c, this.onRecoverableError = h, ue && (this.mutableSourceEagerHydrationData = null);
  }
  function Lc(e, t, s, c, h, y, C, N, H) {
    return e = new Dp(e, t, s, N, H), t === 1 ? (t = 1, y === !0 && (t |= 8)) : t = 0, y = bt(3, null, null, t), e.current = y, y.stateNode = e, y.memoizedState = { element: c, isDehydrated: s, cache: null, transitions: null }, Go(y), e;
  }
  function Rc(e) {
    if (!e)
      return Rn;
    e = e._reactInternals;
    e: {
      if (b(e) !== e || e.tag !== 1)
        throw Error(a(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (xt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(a(171));
    }
    if (e.tag === 1) {
      var s = e.type;
      if (xt(s))
        return eu(e, s, t);
    }
    return t;
  }
  function Nc(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
    return e = j(t), e === null ? null : e.stateNode;
  }
  function Ic(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < t ? s : t;
    }
  }
  function bl(e, t) {
    Ic(e, t), (e = e.alternate) && Ic(e, t);
  }
  function bp(e) {
    return e = j(e), e === null ? null : e.stateNode;
  }
  function kp() {
    return null;
  }
  return r.attemptContinuousHydration = function(e) {
    if (e.tag === 13) {
      var t = pt();
      Dt(e, 134217728, t), bl(e, 134217728);
    }
  }, r.attemptHydrationAtCurrentPriority = function(e) {
    if (e.tag === 13) {
      var t = pt(), s = Dn(e);
      Dt(e, s, t), bl(e, s);
    }
  }, r.attemptSynchronousHydration = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var s = li(t.pendingLanes);
          s !== 0 && (Do(t, s | 1), St(t, qe()), !(ve & 6) && (Cr(), nn()));
        }
        break;
      case 13:
        var c = pt();
        wc(function() {
          return Dt(e, 1, c);
        }), bl(e, 1);
    }
  }, r.batchedUpdates = function(e, t) {
    var s = ve;
    ve |= 1;
    try {
      return e(t);
    } finally {
      ve = s, ve === 0 && (Cr(), ns && nn());
    }
  }, r.createComponentSelector = function(e) {
    return { $$typeof: Ms, value: e };
  }, r.createContainer = function(e, t, s, c, h, y, C) {
    return Lc(e, t, !1, null, s, c, h, y, C);
  }, r.createHasPseudoClassSelector = function(e) {
    return { $$typeof: Ls, value: e };
  }, r.createHydrationContainer = function(e, t, s, c, h, y, C, N, H) {
    return e = Lc(s, c, !0, e, h, y, C, N, H), e.context = Rc(null), s = e.current, c = pt(), h = Dn(s), y = mn(c, h), y.callback = t ?? null, In(s, y), e.current.lanes = h, ai(e, h, c), St(e, c), e;
  }, r.createPortal = function(e, t, s) {
    var c = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: g, key: c == null ? null : "" + c, children: e, containerInfo: t, implementation: s };
  }, r.createRoleSelector = function(e) {
    return { $$typeof: Rs, value: e };
  }, r.createTestNameSelector = function(e) {
    return { $$typeof: Ns, value: e };
  }, r.createTextSelector = function(e) {
    return { $$typeof: Is, value: e };
  }, r.deferredUpdates = function(e) {
    var t = Ee, s = He.transition;
    try {
      return He.transition = null, Ee = 16, e();
    } finally {
      Ee = t, He.transition = s;
    }
  }, r.discreteUpdates = function(e, t, s, c, h) {
    var y = Ee, C = He.transition;
    try {
      return He.transition = null, Ee = 1, e(t, s, c, h);
    } finally {
      Ee = y, He.transition = C, ve === 0 && Cr();
    }
  }, r.findAllNodes = _l, r.findBoundingRects = function(e, t) {
    if (!Kn)
      throw Error(a(363));
    t = _l(e, t), e = [];
    for (var s = 0; s < t.length; s++)
      e.push(ei(t[s]));
    for (t = e.length - 1; 0 < t; t--) {
      s = e[t];
      for (var c = s.x, h = c + s.width, y = s.y, C = y + s.height, N = t - 1; 0 <= N; N--)
        if (t !== N) {
          var H = e[N], X = H.x, $ = X + H.width, pe = H.y, oe = pe + H.height;
          if (c >= X && y >= pe && h <= $ && C <= oe) {
            e.splice(t, 1);
            break;
          } else if (c !== X || s.width !== H.width || oe < y || pe > C) {
            if (!(y !== pe || s.height !== H.height || $ < c || X > h)) {
              X > c && (H.width += X - c, H.x = c), $ < h && (H.width = h - X), e.splice(t, 1);
              break;
            }
          } else {
            pe > y && (H.height += pe - y, H.y = y), oe < C && (H.height = C - pe), e.splice(t, 1);
            break;
          }
        }
    }
    return e;
  }, r.findHostInstance = Nc, r.findHostInstanceWithNoPortals = function(e) {
    return e = k(e), e = e !== null ? Y(e) : null, e === null ? null : e.stateNode;
  }, r.findHostInstanceWithWarning = function(e) {
    return Nc(e);
  }, r.flushControlled = function(e) {
    var t = ve;
    ve |= 1;
    var s = He.transition, c = Ee;
    try {
      He.transition = null, Ee = 1, e();
    } finally {
      Ee = c, He.transition = s, ve = t, ve === 0 && (Cr(), nn());
    }
  }, r.flushPassiveEffects = nr, r.flushSync = wc, r.focusWithin = function(e, t) {
    if (!Kn)
      throw Error(a(363));
    for (e = xl(e), t = vc(e, t), t = Array.from(t), e = 0; e < t.length; ) {
      var s = t[e++];
      if (!An(s)) {
        if (s.tag === 5 && To(s.stateNode))
          return !0;
        for (s = s.child; s !== null; )
          t.push(s), s = s.sibling;
      }
    }
    return !1;
  }, r.getCurrentUpdatePriority = function() {
    return Ee;
  }, r.getFindAllNodesFailureDescription = function(e, t) {
    if (!Kn)
      throw Error(a(363));
    var s = 0, c = [];
    e = [xl(e), 0];
    for (var h = 0; h < e.length; ) {
      var y = e[h++], C = e[h++], N = t[C];
      if ((y.tag !== 5 || !An(y)) && (wl(y, N) && (c.push(Sl(N)), C++, C > s && (s = C)), C < t.length))
        for (y = y.child; y !== null; )
          e.push(y, C), y = y.sibling;
    }
    if (s < t.length) {
      for (e = []; s < t.length; s++)
        e.push(Sl(t[s]));
      return `findAllNodes was able to match part of the selector:
  ` + (c.join(" > ") + `

No matching component was found for:
  `) + e.join(" > ");
    }
    return null;
  }, r.getPublicRootInstance = function(e) {
    if (e = e.current, !e.child)
      return null;
    switch (e.child.tag) {
      case 5:
        return ae(e.child.stateNode);
      default:
        return e.child.stateNode;
    }
  }, r.injectIntoDevTools = function(e) {
    if (e = { bundleType: e.bundleType, version: e.version, rendererPackageName: e.rendererPackageName, rendererConfig: e.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: d.ReactCurrentDispatcher, findHostInstanceByFiber: bp, findFiberByHostInstance: e.findFiberByHostInstance || kp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.0.0-fc46dba67-20220329" }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      e = !1;
    else {
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled || !t.supportsFiber)
        e = !0;
      else {
        try {
          ts = t.inject(e), en = t;
        } catch {
        }
        e = !!t.checkDCE;
      }
    }
    return e;
  }, r.isAlreadyRendering = function() {
    return !1;
  }, r.observeVisibleRects = function(e, t, s, c) {
    if (!Kn)
      throw Error(a(363));
    e = _l(e, t);
    var h = Xi(e, s, c).disconnect;
    return { disconnect: function() {
      h();
    } };
  }, r.registerMutableSourceForHydration = function(e, t) {
    var s = t._getVersion;
    s = s(t._source), e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, s] : e.mutableSourceEagerHydrationData.push(t, s);
  }, r.runWithPriority = function(e, t) {
    var s = Ee;
    try {
      return Ee = e, t();
    } finally {
      Ee = s;
    }
  }, r.shouldError = function() {
    return null;
  }, r.shouldSuspend = function() {
    return !1;
  }, r.updateContainer = function(e, t, s, c) {
    var h = t.current, y = pt(), C = Dn(h);
    return s = Rc(s), t.context === null ? t.context = s : t.pendingContext = s, t = mn(y, C), t.payload = { element: e }, c = c === void 0 ? null : c, c !== null && (t.callback = c), In(h, t), e = Dt(h, C, y), e !== null && os(e, h, C), C;
  }, r;
};
Qf.exports = Bh;
var jh = Qf.exports;
const Uh = /* @__PURE__ */ kf(jh), Hh = (o) => typeof o == "object" && typeof o.then == "function", Gs = [];
function Vh(o, n, r = (i, l) => i === l) {
  if (o === n)
    return !0;
  if (!o || !n)
    return !1;
  const i = o.length;
  if (n.length !== i)
    return !1;
  for (let l = 0; l < i; l++)
    if (!r(o[l], n[l]))
      return !1;
  return !0;
}
function Gh(o, n = null, r = !1, i = {}) {
  n === null && (n = [o]);
  for (const u of Gs)
    if (Vh(n, u.keys, u.equal)) {
      if (r)
        return;
      if (Object.prototype.hasOwnProperty.call(u, "error"))
        throw u.error;
      if (Object.prototype.hasOwnProperty.call(u, "response"))
        return i.lifespan && i.lifespan > 0 && (u.timeout && clearTimeout(u.timeout), u.timeout = setTimeout(u.remove, i.lifespan)), u.response;
      if (!r)
        throw u.promise;
    }
  const l = {
    keys: n,
    equal: i.equal,
    remove: () => {
      const u = Gs.indexOf(l);
      u !== -1 && Gs.splice(u, 1);
    },
    promise: (
      // Execute the promise
      (Hh(o) ? o : o(...n)).then((u) => {
        l.response = u, i.lifespan && i.lifespan > 0 && (l.timeout = setTimeout(l.remove, i.lifespan));
      }).catch((u) => l.error = u)
    )
  };
  if (Gs.push(l), !r)
    throw l.promise;
}
const kc = (o, n, r) => Gh(o, n, !1, r), Ba = {}, ja = (o) => void Object.assign(Ba, o);
function Wh(o, n) {
  function r(p, {
    args: m = [],
    attach: v,
    ...x
  }, _) {
    let P = `${p[0].toUpperCase()}${p.slice(1)}`, T;
    if (p === "primitive") {
      if (x.object === void 0)
        throw new Error("R3F: Primitives without 'object' are invalid!");
      const w = x.object;
      T = Vr(w, {
        type: p,
        root: _,
        attach: v,
        primitive: !0
      });
    } else {
      const w = Ba[P];
      if (!w)
        throw new Error(`R3F: ${P} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);
      if (!Array.isArray(m))
        throw new Error("R3F: The args prop must be an array!");
      T = Vr(new w(...m), {
        type: p,
        root: _,
        attach: v,
        // Save args in case we need to reconstruct later for HMR
        memoizedProps: {
          args: m
        }
      });
    }
    return T.__r3f.attach === void 0 && (T instanceof Da ? T.__r3f.attach = "geometry" : T instanceof po && (T.__r3f.attach = "material")), P !== "inject" && Ul(T, x), T;
  }
  function i(p, m) {
    let v = !1;
    if (m) {
      var x, _;
      (x = m.__r3f) != null && x.attach ? jl(p, m, m.__r3f.attach) : m.isObject3D && p.isObject3D && (p.add(m), v = !0), v || (_ = p.__r3f) == null || _.objects.push(m), m.__r3f || Vr(m, {}), m.__r3f.parent = p, xa(m), Gr(m);
    }
  }
  function l(p, m, v) {
    let x = !1;
    if (m) {
      var _, P;
      if ((_ = m.__r3f) != null && _.attach)
        jl(p, m, m.__r3f.attach);
      else if (m.isObject3D && p.isObject3D) {
        m.parent = p, m.dispatchEvent({
          type: "added"
        });
        const T = p.children.filter((S) => S !== m), w = T.indexOf(v);
        p.children = [...T.slice(0, w), m, ...T.slice(w)], x = !0;
      }
      x || (P = p.__r3f) == null || P.objects.push(m), m.__r3f || Vr(m, {}), m.__r3f.parent = p, xa(m), Gr(m);
    }
  }
  function u(p, m, v = !1) {
    p && [...p].forEach((x) => a(m, x, v));
  }
  function a(p, m, v) {
    if (m) {
      var x, _, P;
      if (m.__r3f && (m.__r3f.parent = null), (x = p.__r3f) != null && x.objects && (p.__r3f.objects = p.__r3f.objects.filter((A) => A !== m)), (_ = m.__r3f) != null && _.attach)
        Hc(p, m, m.__r3f.attach);
      else if (m.isObject3D && p.isObject3D) {
        var T;
        p.remove(m), (T = m.__r3f) != null && T.root && Jh(ho(m), m);
      }
      const S = (P = m.__r3f) == null ? void 0 : P.primitive, E = !S && (v === void 0 ? m.dispose !== null : v);
      if (!S) {
        var w;
        u((w = m.__r3f) == null ? void 0 : w.objects, m, E), u(m.children, m, E);
      }
      if (delete m.__r3f, E && m.dispose && m.type !== "Scene") {
        const A = () => {
          try {
            m.dispose();
          } catch {
          }
        };
        typeof IS_REACT_ACT_ENVIRONMENT > "u" ? va.unstable_scheduleCallback(va.unstable_IdlePriority, A) : A();
      }
      Gr(p);
    }
  }
  function d(p, m, v, x) {
    var _;
    const P = (_ = p.__r3f) == null ? void 0 : _.parent;
    if (!P)
      return;
    const T = r(m, v, p.__r3f.root);
    if (p.children) {
      for (const w of p.children)
        w.__r3f && i(T, w);
      p.children = p.children.filter((w) => !w.__r3f);
    }
    p.__r3f.objects.forEach((w) => i(T, w)), p.__r3f.objects = [], p.__r3f.autoRemovedBeforeAppend || a(P, p), T.parent && (T.__r3f.autoRemovedBeforeAppend = !0), i(P, T), T.raycast && T.__r3f.eventCount && ho(T).getState().internal.interaction.push(T), [x, x.alternate].forEach((w) => {
      w !== null && (w.stateNode = T, w.ref && (typeof w.ref == "function" ? w.ref(T) : w.ref.current = T));
    });
  }
  const f = () => console.warn("Text is not allowed in the R3F tree! This could be stray whitespace or characters.");
  return {
    reconciler: Uh({
      createInstance: r,
      removeChild: a,
      appendChild: i,
      appendInitialChild: i,
      insertBefore: l,
      supportsMutation: !0,
      isPrimaryRenderer: !1,
      supportsPersistence: !1,
      supportsHydration: !1,
      noTimeout: -1,
      appendChildToContainer: (p, m) => {
        if (!m)
          return;
        const v = p.getState().scene;
        v.__r3f && (v.__r3f.root = p, i(v, m));
      },
      removeChildFromContainer: (p, m) => {
        m && a(p.getState().scene, m);
      },
      insertInContainerBefore: (p, m, v) => {
        if (!m || !v)
          return;
        const x = p.getState().scene;
        x.__r3f && l(x, m, v);
      },
      getRootHostContext: () => null,
      getChildHostContext: (p) => p,
      finalizeInitialChildren(p) {
        var m;
        return !!((m = p?.__r3f) != null ? m : {}).handlers;
      },
      prepareUpdate(p, m, v, x) {
        var _;
        if (((_ = p?.__r3f) != null ? _ : {}).primitive && x.object && x.object !== p)
          return [!0];
        {
          const {
            args: T = [],
            children: w,
            ...S
          } = x, {
            args: E = [],
            children: A,
            ...M
          } = v;
          if (!Array.isArray(T))
            throw new Error("R3F: the args prop must be an array!");
          if (T.some((R, z) => R !== E[z]))
            return [!0];
          const L = id(p, S, M, !0);
          return L.changes.length ? [!1, L] : null;
        }
      },
      commitUpdate(p, [m, v], x, _, P, T) {
        m ? d(p, x, P, T) : Ul(p, v);
      },
      commitMount(p, m, v, x) {
        var _;
        const P = (_ = p.__r3f) != null ? _ : {};
        p.raycast && P.handlers && P.eventCount && ho(p).getState().internal.interaction.push(p);
      },
      getPublicInstance: (p) => p,
      prepareForCommit: () => null,
      preparePortalMount: (p) => Vr(p.getState().scene),
      resetAfterCommit: () => {
      },
      shouldSetTextContent: () => !1,
      clearContainer: () => !1,
      hideInstance(p) {
        var m;
        const {
          attach: v,
          parent: x
        } = (m = p.__r3f) != null ? m : {};
        v && x && Hc(x, p, v), p.isObject3D && (p.visible = !1), Gr(p);
      },
      unhideInstance(p, m) {
        var v;
        const {
          attach: x,
          parent: _
        } = (v = p.__r3f) != null ? v : {};
        x && _ && jl(_, p, x), (p.isObject3D && m.visible == null || m.visible) && (p.visible = !0), Gr(p);
      },
      createTextInstance: f,
      hideTextInstance: f,
      unhideTextInstance: f,
      // https://github.com/pmndrs/react-three-fiber/pull/2360#discussion_r916356874
      // @ts-ignore
      getCurrentEventPriority: () => n ? n() : Kr.DefaultEventPriority,
      beforeActiveInstanceBlur: () => {
      },
      afterActiveInstanceBlur: () => {
      },
      detachDeletedInstance: () => {
      },
      now: typeof performance < "u" && Oe.fun(performance.now) ? performance.now : Oe.fun(Date.now) ? Date.now : () => 0,
      // https://github.com/pmndrs/react-three-fiber/pull/2360#discussion_r920883503
      scheduleTimeout: Oe.fun(setTimeout) ? setTimeout : void 0,
      cancelTimeout: Oe.fun(clearTimeout) ? clearTimeout : void 0
    }),
    applyProps: Ul
  };
}
var Fc, Bc;
const Bl = (o) => "colorSpace" in o || "outputColorSpace" in o, Jf = () => {
  var o;
  return (o = Ba.ColorManagement) != null ? o : null;
}, $f = (o) => o && o.isOrthographicCamera, Xh = (o) => o && o.hasOwnProperty("current"), Hi = typeof window < "u" && ((Fc = window.document) != null && Fc.createElement || ((Bc = window.navigator) == null ? void 0 : Bc.product) === "ReactNative") ? B.useLayoutEffect : B.useEffect;
function ed(o) {
  const n = B.useRef(o);
  return Hi(() => void (n.current = o), [o]), n;
}
function Kh({
  set: o
}) {
  return Hi(() => (o(new Promise(() => null)), () => o(!1)), [o]), null;
}
class td extends B.Component {
  constructor(...n) {
    super(...n), this.state = {
      error: !1
    };
  }
  componentDidCatch(n) {
    this.props.set(n);
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
}
td.getDerivedStateFromError = () => ({
  error: !0
});
const nd = "__default", jc = /* @__PURE__ */ new Map(), Yh = (o) => o && !!o.memoized && !!o.changes;
function rd(o) {
  var n;
  const r = typeof window < "u" ? (n = window.devicePixelRatio) != null ? n : 2 : 1;
  return Array.isArray(o) ? Math.min(Math.max(o[0], r), o[1]) : o;
}
const Pi = (o) => {
  var n;
  return (n = o.__r3f) == null ? void 0 : n.root.getState();
};
function ho(o) {
  let n = o.__r3f.root;
  for (; n.getState().previousRoot; )
    n = n.getState().previousRoot;
  return n;
}
const Oe = {
  obj: (o) => o === Object(o) && !Oe.arr(o) && typeof o != "function",
  fun: (o) => typeof o == "function",
  str: (o) => typeof o == "string",
  num: (o) => typeof o == "number",
  boo: (o) => typeof o == "boolean",
  und: (o) => o === void 0,
  arr: (o) => Array.isArray(o),
  equ(o, n, {
    arrays: r = "shallow",
    objects: i = "reference",
    strict: l = !0
  } = {}) {
    if (typeof o != typeof n || !!o != !!n)
      return !1;
    if (Oe.str(o) || Oe.num(o))
      return o === n;
    const u = Oe.obj(o);
    if (u && i === "reference")
      return o === n;
    const a = Oe.arr(o);
    if (a && r === "reference")
      return o === n;
    if ((a || u) && o === n)
      return !0;
    let d;
    for (d in o)
      if (!(d in n))
        return !1;
    if (u && r === "shallow" && i === "shallow") {
      for (d in l ? n : o)
        if (!Oe.equ(o[d], n[d], {
          strict: l,
          objects: "reference"
        }))
          return !1;
    } else
      for (d in l ? n : o)
        if (o[d] !== n[d])
          return !1;
    if (Oe.und(d)) {
      if (a && o.length === 0 && n.length === 0 || u && Object.keys(o).length === 0 && Object.keys(n).length === 0)
        return !0;
      if (o !== n)
        return !1;
    }
    return !0;
  }
};
function Qh(o) {
  o.dispose && o.type !== "Scene" && o.dispose();
  for (const n in o)
    n.dispose == null || n.dispose(), delete o[n];
}
function Vr(o, n) {
  const r = o;
  return r.__r3f = {
    type: "",
    root: null,
    previousAttach: null,
    memoizedProps: {},
    eventCount: 0,
    handlers: {},
    objects: [],
    parent: null,
    ...n
  }, o;
}
function ya(o, n) {
  let r = o;
  if (n.includes("-")) {
    const i = n.split("-"), l = i.pop();
    return r = i.reduce((u, a) => u[a], o), {
      target: r,
      key: l
    };
  } else
    return {
      target: r,
      key: n
    };
}
const Uc = /-\d+$/;
function jl(o, n, r) {
  if (Oe.str(r)) {
    if (Uc.test(r)) {
      const u = r.replace(Uc, ""), {
        target: a,
        key: d
      } = ya(o, u);
      Array.isArray(a[d]) || (a[d] = []);
    }
    const {
      target: i,
      key: l
    } = ya(o, r);
    n.__r3f.previousAttach = i[l], i[l] = n;
  } else
    n.__r3f.previousAttach = r(o, n);
}
function Hc(o, n, r) {
  var i, l;
  if (Oe.str(r)) {
    const {
      target: u,
      key: a
    } = ya(o, r), d = n.__r3f.previousAttach;
    d === void 0 ? delete u[a] : u[a] = d;
  } else
    (i = n.__r3f) == null || i.previousAttach == null || i.previousAttach(o, n);
  (l = n.__r3f) == null || delete l.previousAttach;
}
function id(o, {
  children: n,
  key: r,
  ref: i,
  ...l
}, {
  children: u,
  key: a,
  ref: d,
  ...f
} = {}, g = !1) {
  var p;
  const m = (p = o?.__r3f) != null ? p : {}, v = Object.entries(l), x = [];
  if (g) {
    const P = Object.keys(f);
    for (let T = 0; T < P.length; T++)
      l.hasOwnProperty(P[T]) || v.unshift([P[T], nd + "remove"]);
  }
  v.forEach(([P, T]) => {
    var w;
    if ((w = o.__r3f) != null && w.primitive && P === "object" || Oe.equ(T, f[P]))
      return;
    if (/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(P))
      return x.push([P, T, !0, []]);
    let S = [];
    P.includes("-") && (S = P.split("-")), x.push([P, T, !1, S]);
    for (const E in l) {
      const A = l[E];
      E.startsWith(`${P}-`) && x.push([E, A, !1, E.split("-")]);
    }
  });
  const _ = {
    ...l
  };
  return m.memoizedProps && m.memoizedProps.args && (_.args = m.memoizedProps.args), m.memoizedProps && m.memoizedProps.attach && (_.attach = m.memoizedProps.attach), {
    memoized: _,
    changes: x
  };
}
const qh = typeof process < "u" && !1;
function Ul(o, n) {
  var r, i, l;
  const u = (r = o.__r3f) != null ? r : {}, a = u.root, d = (i = a == null || a.getState == null ? void 0 : a.getState()) != null ? i : {}, {
    memoized: f,
    changes: g
  } = Yh(n) ? n : id(o, n), p = u.eventCount;
  o.__r3f && (o.__r3f.memoizedProps = f);
  for (let v = 0; v < g.length; v++) {
    let [x, _, P, T] = g[v];
    if (Bl(o)) {
      const A = "srgb", M = "srgb-linear";
      x === "encoding" ? (x = "colorSpace", _ = _ === 3001 ? A : M) : x === "outputEncoding" && (x = "outputColorSpace", _ = _ === 3001 ? A : M);
    }
    let w = o, S = w[x];
    if (T.length && (S = T.reduce((E, A) => E[A], o), !(S && S.set))) {
      const [E, ...A] = T.reverse();
      w = A.reverse().reduce((M, L) => M[L], o), x = E;
    }
    if (_ === nd + "remove")
      if (w.constructor) {
        let E = jc.get(w.constructor);
        E || (E = new w.constructor(), jc.set(w.constructor, E)), _ = E[x];
      } else
        _ = 0;
    if (P)
      _ ? u.handlers[x] = _ : delete u.handlers[x], u.eventCount = Object.keys(u.handlers).length;
    else if (S && S.set && (S.copy || S instanceof Fl)) {
      if (Array.isArray(_))
        S.fromArray ? S.fromArray(_) : S.set(..._);
      else if (S.copy && _ && _.constructor && // Some environments may break strict identity checks by duplicating versions of three.js.
      // Loosen to unminified names, ignoring descendents.
      // https://github.com/pmndrs/react-three-fiber/issues/2856
      // TODO: fix upstream and remove in v9
      (qh ? S.constructor.name === _.constructor.name : S.constructor === _.constructor))
        S.copy(_);
      else if (_ !== void 0) {
        const E = S instanceof _n;
        !E && S.setScalar ? S.setScalar(_) : S instanceof Fl && _ instanceof Fl ? S.mask = _.mask : S.set(_), !Jf() && !d.linear && E && S.convertSRGBToLinear();
      }
    } else if (w[x] = _, w[x] instanceof da && // sRGB textures must be RGBA8 since r137 https://github.com/mrdoob/three.js/pull/23129
    w[x].format === Up && w[x].type === Hp) {
      const E = w[x];
      Bl(E) && Bl(d.gl) ? E.colorSpace = d.gl.outputColorSpace : E.encoding = d.gl.outputEncoding;
    }
    Gr(o);
  }
  if (u.parent && o.raycast && p !== u.eventCount) {
    const v = ho(o).getState().internal, x = v.interaction.indexOf(o);
    x > -1 && v.interaction.splice(x, 1), u.eventCount && v.interaction.push(o);
  }
  return !(g.length === 1 && g[0][0] === "onUpdate") && g.length && (l = o.__r3f) != null && l.parent && xa(o), o;
}
function Gr(o) {
  var n, r;
  const i = (n = o.__r3f) == null || (r = n.root) == null || r.getState == null ? void 0 : r.getState();
  i && i.internal.frames === 0 && i.invalidate();
}
function xa(o) {
  o.onUpdate == null || o.onUpdate(o);
}
function sd(o, n) {
  o.manual || ($f(o) ? (o.left = n.width / -2, o.right = n.width / 2, o.top = n.height / 2, o.bottom = n.height / -2) : o.aspect = n.width / n.height, o.updateProjectionMatrix(), o.updateMatrixWorld());
}
function Ws(o) {
  return (o.eventObject || o.object).uuid + "/" + o.index + o.instanceId;
}
function Zh() {
  var o;
  const n = typeof self < "u" && self || typeof window < "u" && window;
  if (!n)
    return Kr.DefaultEventPriority;
  switch ((o = n.event) == null ? void 0 : o.type) {
    case "click":
    case "contextmenu":
    case "dblclick":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
      return Kr.DiscreteEventPriority;
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "pointerenter":
    case "pointerleave":
    case "wheel":
      return Kr.ContinuousEventPriority;
    default:
      return Kr.DefaultEventPriority;
  }
}
function od(o, n, r, i) {
  const l = r.get(n);
  l && (r.delete(n), r.size === 0 && (o.delete(i), l.target.releasePointerCapture(i)));
}
function Jh(o, n) {
  const {
    internal: r
  } = o.getState();
  r.interaction = r.interaction.filter((i) => i !== n), r.initialHits = r.initialHits.filter((i) => i !== n), r.hovered.forEach((i, l) => {
    (i.eventObject === n || i.object === n) && r.hovered.delete(l);
  }), r.capturedMap.forEach((i, l) => {
    od(r.capturedMap, n, i, l);
  });
}
function $h(o) {
  function n(f) {
    const {
      internal: g
    } = o.getState(), p = f.offsetX - g.initialClick[0], m = f.offsetY - g.initialClick[1];
    return Math.round(Math.sqrt(p * p + m * m));
  }
  function r(f) {
    return f.filter((g) => ["Move", "Over", "Enter", "Out", "Leave"].some((p) => {
      var m;
      return (m = g.__r3f) == null ? void 0 : m.handlers["onPointer" + p];
    }));
  }
  function i(f, g) {
    const p = o.getState(), m = /* @__PURE__ */ new Set(), v = [], x = g ? g(p.internal.interaction) : p.internal.interaction;
    for (let w = 0; w < x.length; w++) {
      const S = Pi(x[w]);
      S && (S.raycaster.camera = void 0);
    }
    p.previousRoot || p.events.compute == null || p.events.compute(f, p);
    function _(w) {
      const S = Pi(w);
      if (!S || !S.events.enabled || S.raycaster.camera === null)
        return [];
      if (S.raycaster.camera === void 0) {
        var E;
        S.events.compute == null || S.events.compute(f, S, (E = S.previousRoot) == null ? void 0 : E.getState()), S.raycaster.camera === void 0 && (S.raycaster.camera = null);
      }
      return S.raycaster.camera ? S.raycaster.intersectObject(w, !0) : [];
    }
    let P = x.flatMap(_).sort((w, S) => {
      const E = Pi(w.object), A = Pi(S.object);
      return !E || !A ? w.distance - S.distance : A.events.priority - E.events.priority || w.distance - S.distance;
    }).filter((w) => {
      const S = Ws(w);
      return m.has(S) ? !1 : (m.add(S), !0);
    });
    p.events.filter && (P = p.events.filter(P, p));
    for (const w of P) {
      let S = w.object;
      for (; S; ) {
        var T;
        (T = S.__r3f) != null && T.eventCount && v.push({
          ...w,
          eventObject: S
        }), S = S.parent;
      }
    }
    if ("pointerId" in f && p.internal.capturedMap.has(f.pointerId))
      for (let w of p.internal.capturedMap.get(f.pointerId).values())
        m.has(Ws(w.intersection)) || v.push(w.intersection);
    return v;
  }
  function l(f, g, p, m) {
    const v = o.getState();
    if (f.length) {
      const x = {
        stopped: !1
      };
      for (const _ of f) {
        const P = Pi(_.object) || v, {
          raycaster: T,
          pointer: w,
          camera: S,
          internal: E
        } = P, A = new V(w.x, w.y, 0).unproject(S), M = (I) => {
          var k, j;
          return (k = (j = E.capturedMap.get(I)) == null ? void 0 : j.has(_.eventObject)) != null ? k : !1;
        }, L = (I) => {
          const k = {
            intersection: _,
            target: g.target
          };
          E.capturedMap.has(I) ? E.capturedMap.get(I).set(_.eventObject, k) : E.capturedMap.set(I, /* @__PURE__ */ new Map([[_.eventObject, k]])), g.target.setPointerCapture(I);
        }, R = (I) => {
          const k = E.capturedMap.get(I);
          k && od(E.capturedMap, _.eventObject, k, I);
        };
        let z = {};
        for (let I in g) {
          let k = g[I];
          typeof k != "function" && (z[I] = k);
        }
        let b = {
          ..._,
          ...z,
          pointer: w,
          intersections: f,
          stopped: x.stopped,
          delta: p,
          unprojectedPoint: A,
          ray: T.ray,
          camera: S,
          // Hijack stopPropagation, which just sets a flag
          stopPropagation() {
            const I = "pointerId" in g && E.capturedMap.get(g.pointerId);
            if (
              // ...if this pointer hasn't been captured
              (!I || // ... or if the hit object is capturing the pointer
              I.has(_.eventObject)) && (b.stopped = x.stopped = !0, E.hovered.size && Array.from(E.hovered.values()).find((k) => k.eventObject === _.eventObject))
            ) {
              const k = f.slice(0, f.indexOf(_));
              u([...k, _]);
            }
          },
          // there should be a distinction between target and currentTarget
          target: {
            hasPointerCapture: M,
            setPointerCapture: L,
            releasePointerCapture: R
          },
          currentTarget: {
            hasPointerCapture: M,
            setPointerCapture: L,
            releasePointerCapture: R
          },
          nativeEvent: g
        };
        if (m(b), x.stopped === !0)
          break;
      }
    }
    return f;
  }
  function u(f) {
    const {
      internal: g
    } = o.getState();
    for (const p of g.hovered.values())
      if (!f.length || !f.find((m) => m.object === p.object && m.index === p.index && m.instanceId === p.instanceId)) {
        const v = p.eventObject.__r3f, x = v?.handlers;
        if (g.hovered.delete(Ws(p)), v != null && v.eventCount) {
          const _ = {
            ...p,
            intersections: f
          };
          x.onPointerOut == null || x.onPointerOut(_), x.onPointerLeave == null || x.onPointerLeave(_);
        }
      }
  }
  function a(f, g) {
    for (let p = 0; p < g.length; p++) {
      const m = g[p].__r3f;
      m == null || m.handlers.onPointerMissed == null || m.handlers.onPointerMissed(f);
    }
  }
  function d(f) {
    switch (f) {
      case "onPointerLeave":
      case "onPointerCancel":
        return () => u([]);
      case "onLostPointerCapture":
        return (g) => {
          const {
            internal: p
          } = o.getState();
          "pointerId" in g && p.capturedMap.has(g.pointerId) && requestAnimationFrame(() => {
            p.capturedMap.has(g.pointerId) && (p.capturedMap.delete(g.pointerId), u([]));
          });
        };
    }
    return function(p) {
      const {
        onPointerMissed: m,
        internal: v
      } = o.getState();
      v.lastEvent.current = p;
      const x = f === "onPointerMove", _ = f === "onClick" || f === "onContextMenu" || f === "onDoubleClick", T = i(p, x ? r : void 0), w = _ ? n(p) : 0;
      f === "onPointerDown" && (v.initialClick = [p.offsetX, p.offsetY], v.initialHits = T.map((E) => E.eventObject)), _ && !T.length && w <= 2 && (a(p, v.interaction), m && m(p)), x && u(T);
      function S(E) {
        const A = E.eventObject, M = A.__r3f, L = M?.handlers;
        if (M != null && M.eventCount)
          if (x) {
            if (L.onPointerOver || L.onPointerEnter || L.onPointerOut || L.onPointerLeave) {
              const R = Ws(E), z = v.hovered.get(R);
              z ? z.stopped && E.stopPropagation() : (v.hovered.set(R, E), L.onPointerOver == null || L.onPointerOver(E), L.onPointerEnter == null || L.onPointerEnter(E));
            }
            L.onPointerMove == null || L.onPointerMove(E);
          } else {
            const R = L[f];
            R ? (!_ || v.initialHits.includes(A)) && (a(p, v.interaction.filter((z) => !v.initialHits.includes(z))), R(E)) : _ && v.initialHits.includes(A) && a(p, v.interaction.filter((z) => !v.initialHits.includes(z)));
          }
      }
      l(T, p, w, S);
    };
  }
  return {
    handlePointer: d
  };
}
const em = ["set", "get", "setSize", "setFrameloop", "setDpr", "events", "invalidate", "advance", "size", "viewport"], ld = (o) => !!(o != null && o.render), Ua = /* @__PURE__ */ B.createContext(null), tm = (o, n) => {
  const r = xo((d, f) => {
    const g = new V(), p = new V(), m = new V();
    function v(w = f().camera, S = p, E = f().size) {
      const {
        width: A,
        height: M,
        top: L,
        left: R
      } = E, z = A / M;
      S instanceof V ? m.copy(S) : m.set(...S);
      const b = w.getWorldPosition(g).distanceTo(m);
      if ($f(w))
        return {
          width: A / w.zoom,
          height: M / w.zoom,
          top: L,
          left: R,
          factor: 1,
          distance: b,
          aspect: z
        };
      {
        const I = w.fov * Math.PI / 180, k = 2 * Math.tan(I / 2) * b, j = k * (A / M);
        return {
          width: j,
          height: k,
          top: L,
          left: R,
          factor: A / j,
          distance: b,
          aspect: z
        };
      }
    }
    let x;
    const _ = (w) => d((S) => ({
      performance: {
        ...S.performance,
        current: w
      }
    })), P = new ye();
    return {
      set: d,
      get: f,
      // Mock objects that have to be configured
      gl: null,
      camera: null,
      raycaster: null,
      events: {
        priority: 1,
        enabled: !0,
        connected: !1
      },
      xr: null,
      scene: null,
      invalidate: (w = 1) => o(f(), w),
      advance: (w, S) => n(w, S, f()),
      legacy: !1,
      linear: !1,
      flat: !1,
      controls: null,
      clock: new Yp(),
      pointer: P,
      mouse: P,
      frameloop: "always",
      onPointerMissed: void 0,
      performance: {
        current: 1,
        min: 0.5,
        max: 1,
        debounce: 200,
        regress: () => {
          const w = f();
          x && clearTimeout(x), w.performance.current !== w.performance.min && _(w.performance.min), x = setTimeout(() => _(f().performance.max), w.performance.debounce);
        }
      },
      size: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        updateStyle: !1
      },
      viewport: {
        initialDpr: 0,
        dpr: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        aspect: 0,
        distance: 0,
        factor: 0,
        getCurrentViewport: v
      },
      setEvents: (w) => d((S) => ({
        ...S,
        events: {
          ...S.events,
          ...w
        }
      })),
      setSize: (w, S, E, A, M) => {
        const L = f().camera, R = {
          width: w,
          height: S,
          top: A || 0,
          left: M || 0,
          updateStyle: E
        };
        d((z) => ({
          size: R,
          viewport: {
            ...z.viewport,
            ...v(L, p, R)
          }
        }));
      },
      setDpr: (w) => d((S) => {
        const E = rd(w);
        return {
          viewport: {
            ...S.viewport,
            dpr: E,
            initialDpr: S.viewport.initialDpr || E
          }
        };
      }),
      setFrameloop: (w = "always") => {
        const S = f().clock;
        S.stop(), S.elapsedTime = 0, w !== "never" && (S.start(), S.elapsedTime = 0), d(() => ({
          frameloop: w
        }));
      },
      previousRoot: void 0,
      internal: {
        active: !1,
        priority: 0,
        frames: 0,
        lastEvent: /* @__PURE__ */ B.createRef(),
        interaction: [],
        hovered: /* @__PURE__ */ new Map(),
        subscribers: [],
        initialClick: [0, 0],
        initialHits: [],
        capturedMap: /* @__PURE__ */ new Map(),
        subscribe: (w, S, E) => {
          const A = f().internal;
          return A.priority = A.priority + (S > 0 ? 1 : 0), A.subscribers.push({
            ref: w,
            priority: S,
            store: E
          }), A.subscribers = A.subscribers.sort((M, L) => M.priority - L.priority), () => {
            const M = f().internal;
            M != null && M.subscribers && (M.priority = M.priority - (S > 0 ? 1 : 0), M.subscribers = M.subscribers.filter((L) => L.ref !== w));
          };
        }
      }
    };
  }), i = r.getState();
  let l = i.size, u = i.viewport.dpr, a = i.camera;
  return r.subscribe(() => {
    const {
      camera: d,
      size: f,
      viewport: g,
      gl: p,
      set: m
    } = r.getState();
    if (f.width !== l.width || f.height !== l.height || g.dpr !== u) {
      var v;
      l = f, u = g.dpr, sd(d, f), p.setPixelRatio(g.dpr);
      const x = (v = f.updateStyle) != null ? v : typeof HTMLCanvasElement < "u" && p.domElement instanceof HTMLCanvasElement;
      p.setSize(f.width, f.height, x);
    }
    d !== a && (a = d, m((x) => ({
      viewport: {
        ...x.viewport,
        ...x.viewport.getCurrentViewport(d)
      }
    })));
  }), r.subscribe((d) => o(d)), r;
};
let Xs, nm = /* @__PURE__ */ new Set(), rm = /* @__PURE__ */ new Set(), im = /* @__PURE__ */ new Set();
function Hl(o, n) {
  if (o.size)
    for (const {
      callback: r
    } of o.values())
      r(n);
}
function Ci(o, n) {
  switch (o) {
    case "before":
      return Hl(nm, n);
    case "after":
      return Hl(rm, n);
    case "tail":
      return Hl(im, n);
  }
}
let Vl, Gl;
function Wl(o, n, r) {
  let i = n.clock.getDelta();
  for (n.frameloop === "never" && typeof o == "number" && (i = o - n.clock.elapsedTime, n.clock.oldTime = n.clock.elapsedTime, n.clock.elapsedTime = o), Vl = n.internal.subscribers, Xs = 0; Xs < Vl.length; Xs++)
    Gl = Vl[Xs], Gl.ref.current(Gl.store.getState(), i, r);
  return !n.internal.priority && n.gl.render && n.gl.render(n.scene, n.camera), n.internal.frames = Math.max(0, n.internal.frames - 1), n.frameloop === "always" ? 1 : n.internal.frames;
}
function sm(o) {
  let n = !1, r, i, l;
  function u(f) {
    i = requestAnimationFrame(u), n = !0, r = 0, Ci("before", f);
    for (const p of o.values()) {
      var g;
      l = p.store.getState(), l.internal.active && (l.frameloop === "always" || l.internal.frames > 0) && !((g = l.gl.xr) != null && g.isPresenting) && (r += Wl(f, l));
    }
    if (Ci("after", f), r === 0)
      return Ci("tail", f), n = !1, cancelAnimationFrame(i);
  }
  function a(f, g = 1) {
    var p;
    if (!f)
      return o.forEach((m) => a(m.store.getState(), g));
    (p = f.gl.xr) != null && p.isPresenting || !f.internal.active || f.frameloop === "never" || (f.internal.frames = Math.min(60, f.internal.frames + g), n || (n = !0, requestAnimationFrame(u)));
  }
  function d(f, g = !0, p, m) {
    if (g && Ci("before", f), p)
      Wl(f, p, m);
    else
      for (const v of o.values())
        Wl(f, v.store.getState());
    g && Ci("after", f);
  }
  return {
    loop: u,
    invalidate: a,
    advance: d
  };
}
function Ha() {
  const o = B.useContext(Ua);
  if (!o)
    throw new Error("R3F: Hooks can only be used within the Canvas component!");
  return o;
}
function rt(o = (r) => r, n) {
  return Ha()(o, n);
}
function dr(o, n = 0) {
  const r = Ha(), i = r.getState().internal.subscribe, l = ed(o);
  return Hi(() => i(l, n, r), [n, i, r]), null;
}
const Zr = /* @__PURE__ */ new Map(), {
  invalidate: Vc,
  advance: Gc
} = sm(Zr), {
  reconciler: ji,
  applyProps: Rr
} = Wh(Zr, Zh), Nr = {
  objects: "shallow",
  strict: !1
}, om = (o, n) => {
  const r = typeof o == "function" ? o(n) : o;
  return ld(r) ? r : new Vp({
    powerPreference: "high-performance",
    canvas: n,
    antialias: !0,
    alpha: !0,
    ...o
  });
};
function lm(o, n) {
  const r = typeof HTMLCanvasElement < "u" && o instanceof HTMLCanvasElement;
  if (n) {
    const {
      width: i,
      height: l,
      top: u,
      left: a,
      updateStyle: d = r
    } = n;
    return {
      width: i,
      height: l,
      top: u,
      left: a,
      updateStyle: d
    };
  } else if (typeof HTMLCanvasElement < "u" && o instanceof HTMLCanvasElement && o.parentElement) {
    const {
      width: i,
      height: l,
      top: u,
      left: a
    } = o.parentElement.getBoundingClientRect();
    return {
      width: i,
      height: l,
      top: u,
      left: a,
      updateStyle: r
    };
  } else if (typeof OffscreenCanvas < "u" && o instanceof OffscreenCanvas)
    return {
      width: o.width,
      height: o.height,
      top: 0,
      left: 0,
      updateStyle: r
    };
  return {
    width: 0,
    height: 0,
    top: 0,
    left: 0
  };
}
function am(o) {
  const n = Zr.get(o), r = n?.fiber, i = n?.store;
  n && console.warn("R3F.createRoot should only be called once!");
  const l = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : (
    // In older browsers and test environments, fallback to console.error.
    console.error
  ), u = i || tm(Vc, Gc), a = r || ji.createContainer(u, Kr.ConcurrentRoot, null, !1, null, "", l, null);
  n || Zr.set(o, {
    fiber: a,
    store: u
  });
  let d, f = !1, g;
  return {
    configure(p = {}) {
      let {
        gl: m,
        size: v,
        scene: x,
        events: _,
        onCreated: P,
        shadows: T = !1,
        linear: w = !1,
        flat: S = !1,
        legacy: E = !1,
        orthographic: A = !1,
        frameloop: M = "always",
        dpr: L = [1, 2],
        performance: R,
        raycaster: z,
        camera: b,
        onPointerMissed: I
      } = p, k = u.getState(), j = k.gl;
      k.gl || k.set({
        gl: j = om(m, o)
      });
      let G = k.raycaster;
      G || k.set({
        raycaster: G = new Ff()
      });
      const {
        params: Y,
        ...ee
      } = z || {};
      if (Oe.equ(ee, G, Nr) || Rr(G, {
        ...ee
      }), Oe.equ(Y, G.params, Nr) || Rr(G, {
        params: {
          ...G.params,
          ...Y
        }
      }), !k.camera || k.camera === g && !Oe.equ(g, b, Nr)) {
        g = b;
        const Z = b instanceof Gp, te = Z ? b : A ? new Wr(0, 0, 0, 0, 0.1, 1e3) : new Xr(75, 0, 0.1, 1e3);
        Z || (te.position.z = 5, b && Rr(te, b), !k.camera && !(b != null && b.rotation) && te.lookAt(0, 0, 0)), k.set({
          camera: te
        }), G.camera = te;
      }
      if (!k.scene) {
        let Z;
        x instanceof fa ? Z = x : (Z = new fa(), x && Rr(Z, x)), k.set({
          scene: Vr(Z)
        });
      }
      if (!k.xr) {
        var ae;
        const Z = (xe, Fe) => {
          const it = u.getState();
          it.frameloop !== "never" && Gc(xe, !0, it, Fe);
        }, te = () => {
          const xe = u.getState();
          xe.gl.xr.enabled = xe.gl.xr.isPresenting, xe.gl.xr.setAnimationLoop(xe.gl.xr.isPresenting ? Z : null), xe.gl.xr.isPresenting || Vc(xe);
        }, ge = {
          connect() {
            const xe = u.getState().gl;
            xe.xr.addEventListener("sessionstart", te), xe.xr.addEventListener("sessionend", te);
          },
          disconnect() {
            const xe = u.getState().gl;
            xe.xr.removeEventListener("sessionstart", te), xe.xr.removeEventListener("sessionend", te);
          }
        };
        typeof ((ae = j.xr) == null ? void 0 : ae.addEventListener) == "function" && ge.connect(), k.set({
          xr: ge
        });
      }
      if (j.shadowMap) {
        const Z = j.shadowMap.enabled, te = j.shadowMap.type;
        if (j.shadowMap.enabled = !!T, Oe.boo(T))
          j.shadowMap.type = kl;
        else if (Oe.str(T)) {
          var Se;
          const ge = {
            basic: Wp,
            percentage: Xp,
            soft: kl,
            variance: Kp
          };
          j.shadowMap.type = (Se = ge[T]) != null ? Se : kl;
        } else
          Oe.obj(T) && Object.assign(j.shadowMap, T);
        (Z !== j.shadowMap.enabled || te !== j.shadowMap.type) && (j.shadowMap.needsUpdate = !0);
      }
      const W = Jf();
      W && ("enabled" in W ? W.enabled = !E : "legacyMode" in W && (W.legacyMode = E)), f || Rr(j, {
        outputEncoding: w ? 3e3 : 3001,
        toneMapping: S ? Bp : jp
      }), k.legacy !== E && k.set(() => ({
        legacy: E
      })), k.linear !== w && k.set(() => ({
        linear: w
      })), k.flat !== S && k.set(() => ({
        flat: S
      })), m && !Oe.fun(m) && !ld(m) && !Oe.equ(m, j, Nr) && Rr(j, m), _ && !k.events.handlers && k.set({
        events: _(u)
      });
      const J = lm(o, v);
      return Oe.equ(J, k.size, Nr) || k.setSize(J.width, J.height, J.updateStyle, J.top, J.left), L && k.viewport.dpr !== rd(L) && k.setDpr(L), k.frameloop !== M && k.setFrameloop(M), k.onPointerMissed || k.set({
        onPointerMissed: I
      }), R && !Oe.equ(R, k.performance, Nr) && k.set((Z) => ({
        performance: {
          ...Z.performance,
          ...R
        }
      })), d = P, f = !0, this;
    },
    render(p) {
      return f || this.configure(), ji.updateContainer(/* @__PURE__ */ B.createElement(um, {
        store: u,
        children: p,
        onCreated: d,
        rootElement: o
      }), a, null, () => {
      }), u;
    },
    unmount() {
      ad(o);
    }
  };
}
function um({
  store: o,
  children: n,
  onCreated: r,
  rootElement: i
}) {
  return Hi(() => {
    const l = o.getState();
    l.set((u) => ({
      internal: {
        ...u.internal,
        active: !0
      }
    })), r && r(l), o.getState().events.connected || l.events.connect == null || l.events.connect(i);
  }, []), /* @__PURE__ */ B.createElement(Ua.Provider, {
    value: o
  }, n);
}
function ad(o, n) {
  const r = Zr.get(o), i = r?.fiber;
  if (i) {
    const l = r?.store.getState();
    l && (l.internal.active = !1), ji.updateContainer(null, i, null, () => {
      l && setTimeout(() => {
        try {
          var u, a, d, f;
          l.events.disconnect == null || l.events.disconnect(), (u = l.gl) == null || (a = u.renderLists) == null || a.dispose == null || a.dispose(), (d = l.gl) == null || d.forceContextLoss == null || d.forceContextLoss(), (f = l.gl) != null && f.xr && l.xr.disconnect(), Qh(l), Zr.delete(o), n && n(o);
        } catch {
        }
      }, 500);
    });
  }
}
function wa(o, n, r) {
  return /* @__PURE__ */ B.createElement(cm, {
    key: n.uuid,
    children: o,
    container: n,
    state: r
  });
}
function cm({
  state: o = {},
  children: n,
  container: r
}) {
  const {
    events: i,
    size: l,
    ...u
  } = o, a = Ha(), [d] = B.useState(() => new Ff()), [f] = B.useState(() => new ye()), g = B.useCallback(
    (m, v) => {
      const x = {
        ...m
      };
      Object.keys(m).forEach((P) => {
        // Some props should be off-limits
        (em.includes(P) || // Otherwise filter out the props that are different and let the inject layer take precedence
        // Unless the inject layer props is undefined, then we keep the root layer
        m[P] !== v[P] && v[P]) && delete x[P];
      });
      let _;
      if (v && l) {
        const P = v.camera;
        _ = m.viewport.getCurrentViewport(P, new V(), l), P !== m.camera && sd(P, l);
      }
      return {
        // The intersect consists of the previous root state
        ...x,
        // Portals have their own scene, which forms the root, a raycaster and a pointer
        scene: r,
        raycaster: d,
        pointer: f,
        mouse: f,
        // Their previous root is the layer before it
        previousRoot: a,
        // Events, size and viewport can be overridden by the inject layer
        events: {
          ...m.events,
          ...v?.events,
          ...i
        },
        size: {
          ...m.size,
          ...l
        },
        viewport: {
          ...m.viewport,
          ..._
        },
        ...u
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [o]
  ), [p] = B.useState(() => {
    const m = a.getState();
    return xo((x, _) => ({
      ...m,
      scene: r,
      raycaster: d,
      pointer: f,
      mouse: f,
      previousRoot: a,
      events: {
        ...m.events,
        ...i
      },
      size: {
        ...m.size,
        ...l
      },
      ...u,
      // Set and get refer to this root-state
      set: x,
      get: _,
      // Layers are allowed to override events
      setEvents: (P) => x((T) => ({
        ...T,
        events: {
          ...T.events,
          ...P
        }
      }))
    }));
  });
  return B.useEffect(() => {
    const m = a.subscribe((v) => p.setState((x) => g(v, x)));
    return () => {
      m(), p.destroy();
    };
  }, []), B.useEffect(() => {
    p.setState((m) => g(a.getState(), m));
  }, [g]), /* @__PURE__ */ B.createElement(B.Fragment, null, ji.createPortal(/* @__PURE__ */ B.createElement(Ua.Provider, {
    value: p
  }, n), p, null));
}
ji.injectIntoDevTools({
  bundleType: 0,
  rendererPackageName: "@react-three/fiber",
  version: B.version
});
function Sa(o, n, r) {
  var i, l, u, a, d;
  n == null && (n = 100);
  function f() {
    var p = Date.now() - a;
    p < n && p >= 0 ? i = setTimeout(f, n - p) : (i = null, r || (d = o.apply(u, l), u = l = null));
  }
  var g = function() {
    u = this, l = arguments, a = Date.now();
    var p = r && !i;
    return i || (i = setTimeout(f, n)), p && (d = o.apply(u, l), u = l = null), d;
  };
  return g.clear = function() {
    i && (clearTimeout(i), i = null);
  }, g.flush = function() {
    i && (d = o.apply(u, l), u = l = null, clearTimeout(i), i = null);
  }, g;
}
Sa.debounce = Sa;
var fm = Sa;
const Wc = /* @__PURE__ */ kf(fm);
function dm(o) {
  let {
    debounce: n,
    scroll: r,
    polyfill: i,
    offsetSize: l
  } = o === void 0 ? {
    debounce: 0,
    scroll: !1,
    offsetSize: !1
  } : o;
  const u = i || (typeof window > "u" ? class {
  } : window.ResizeObserver);
  if (!u)
    throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");
  const [a, d] = ht({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0
  }), f = pn({
    element: null,
    scrollContainers: null,
    resizeObserver: null,
    lastBounds: a
  }), g = n ? typeof n == "number" ? n : n.scroll : null, p = n ? typeof n == "number" ? n : n.resize : null, m = pn(!1);
  Sn(() => (m.current = !0, () => void (m.current = !1)));
  const [v, x, _] = kh(() => {
    const S = () => {
      if (!f.current.element)
        return;
      const {
        left: E,
        top: A,
        width: M,
        height: L,
        bottom: R,
        right: z,
        x: b,
        y: I
      } = f.current.element.getBoundingClientRect(), k = {
        left: E,
        top: A,
        width: M,
        height: L,
        bottom: R,
        right: z,
        x: b,
        y: I
      };
      f.current.element instanceof HTMLElement && l && (k.height = f.current.element.offsetHeight, k.width = f.current.element.offsetWidth), Object.freeze(k), m.current && !gm(f.current.lastBounds, k) && d(f.current.lastBounds = k);
    };
    return [S, p ? Wc(S, p) : S, g ? Wc(S, g) : S];
  }, [d, l, g, p]);
  function P() {
    f.current.scrollContainers && (f.current.scrollContainers.forEach((S) => S.removeEventListener("scroll", _, !0)), f.current.scrollContainers = null), f.current.resizeObserver && (f.current.resizeObserver.disconnect(), f.current.resizeObserver = null);
  }
  function T() {
    f.current.element && (f.current.resizeObserver = new u(_), f.current.resizeObserver.observe(f.current.element), r && f.current.scrollContainers && f.current.scrollContainers.forEach((S) => S.addEventListener("scroll", _, {
      capture: !0,
      passive: !0
    })));
  }
  const w = (S) => {
    !S || S === f.current.element || (P(), f.current.element = S, f.current.scrollContainers = ud(S), T());
  };
  return hm(_, !!r), pm(x), Sn(() => {
    P(), T();
  }, [r, _, x]), Sn(() => P, []), [w, a, v];
}
function pm(o) {
  Sn(() => {
    const n = o;
    return window.addEventListener("resize", n), () => void window.removeEventListener("resize", n);
  }, [o]);
}
function hm(o, n) {
  Sn(() => {
    if (n) {
      const r = o;
      return window.addEventListener("scroll", r, {
        capture: !0,
        passive: !0
      }), () => void window.removeEventListener("scroll", r, !0);
    }
  }, [o, n]);
}
function ud(o) {
  const n = [];
  if (!o || o === document.body)
    return n;
  const {
    overflow: r,
    overflowX: i,
    overflowY: l
  } = window.getComputedStyle(o);
  return [r, i, l].some((u) => u === "auto" || u === "scroll") && n.push(o), [...n, ...ud(o.parentElement)];
}
const mm = ["x", "y", "top", "bottom", "left", "right", "width", "height"], gm = (o, n) => mm.every((r) => o[r] === n[r]);
var vm = Object.defineProperty, ym = Object.defineProperties, xm = Object.getOwnPropertyDescriptors, Xc = Object.getOwnPropertySymbols, wm = Object.prototype.hasOwnProperty, Sm = Object.prototype.propertyIsEnumerable, Kc = (o, n, r) => n in o ? vm(o, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[n] = r, Yc = (o, n) => {
  for (var r in n || (n = {}))
    wm.call(n, r) && Kc(o, r, n[r]);
  if (Xc)
    for (var r of Xc(n))
      Sm.call(n, r) && Kc(o, r, n[r]);
  return o;
}, _m = (o, n) => ym(o, xm(n));
function cd(o, n, r) {
  if (!o)
    return;
  if (r(o) === !0)
    return o;
  let i = n ? o.return : o.child;
  for (; i; ) {
    const l = cd(i, n, r);
    if (l)
      return l;
    i = n ? null : i.sibling;
  }
}
function fd(o) {
  try {
    return Object.defineProperties(o, {
      _currentRenderer: {
        get() {
          return null;
        },
        set() {
        }
      },
      _currentRenderer2: {
        get() {
          return null;
        },
        set() {
        }
      }
    });
  } catch {
    return o;
  }
}
const Va = fd(B.createContext(null));
class dd extends B.Component {
  render() {
    return /* @__PURE__ */ B.createElement(Va.Provider, {
      value: this._reactInternals
    }, this.props.children);
  }
}
const { ReactCurrentOwner: Qc, ReactCurrentDispatcher: qc } = B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
function Em() {
  const o = B.useContext(Va);
  if (o === null)
    throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
  const n = B.useId();
  return B.useMemo(() => {
    for (const i of [Qc?.current, o, o?.alternate]) {
      if (!i)
        continue;
      const l = cd(i, !1, (u) => {
        let a = u.memoizedState;
        for (; a; ) {
          if (a.memoizedState === n)
            return !0;
          a = a.next;
        }
      });
      if (l)
        return l;
    }
  }, [o, n]);
}
function Tm() {
  var o, n;
  const r = Em(), [i] = B.useState(() => /* @__PURE__ */ new Map());
  i.clear();
  let l = r;
  for (; l; ) {
    const u = (o = l.type) == null ? void 0 : o._context;
    u && u !== Va && !i.has(u) && i.set(u, (n = qc?.current) == null ? void 0 : n.readContext(fd(u))), l = l.return;
  }
  return i;
}
function Am() {
  const o = Tm();
  return B.useMemo(
    () => Array.from(o.keys()).reduce(
      (n, r) => (i) => /* @__PURE__ */ B.createElement(n, null, /* @__PURE__ */ B.createElement(r.Provider, _m(Yc({}, i), {
        value: o.get(r)
      }))),
      (n) => /* @__PURE__ */ B.createElement(dd, Yc({}, n))
    ),
    [o]
  );
}
const Xl = {
  onClick: ["click", !1],
  onContextMenu: ["contextmenu", !1],
  onDoubleClick: ["dblclick", !1],
  onWheel: ["wheel", !0],
  onPointerDown: ["pointerdown", !0],
  onPointerUp: ["pointerup", !0],
  onPointerLeave: ["pointerleave", !0],
  onPointerMove: ["pointermove", !0],
  onPointerCancel: ["pointercancel", !0],
  onLostPointerCapture: ["lostpointercapture", !0]
};
function Pm(o) {
  const {
    handlePointer: n
  } = $h(o);
  return {
    priority: 1,
    enabled: !0,
    compute(r, i, l) {
      i.pointer.set(r.offsetX / i.size.width * 2 - 1, -(r.offsetY / i.size.height) * 2 + 1), i.raycaster.setFromCamera(i.pointer, i.camera);
    },
    connected: void 0,
    handlers: Object.keys(Xl).reduce((r, i) => ({
      ...r,
      [i]: n(i)
    }), {}),
    update: () => {
      var r;
      const {
        events: i,
        internal: l
      } = o.getState();
      (r = l.lastEvent) != null && r.current && i.handlers && i.handlers.onPointerMove(l.lastEvent.current);
    },
    connect: (r) => {
      var i;
      const {
        set: l,
        events: u
      } = o.getState();
      u.disconnect == null || u.disconnect(), l((a) => ({
        events: {
          ...a.events,
          connected: r
        }
      })), Object.entries((i = u.handlers) != null ? i : []).forEach(([a, d]) => {
        const [f, g] = Xl[a];
        r.addEventListener(f, d, {
          passive: g
        });
      });
    },
    disconnect: () => {
      const {
        set: r,
        events: i
      } = o.getState();
      if (i.connected) {
        var l;
        Object.entries((l = i.handlers) != null ? l : []).forEach(([u, a]) => {
          if (i && i.connected instanceof HTMLElement) {
            const [d] = Xl[u];
            i.connected.removeEventListener(d, a);
          }
        }), r((u) => ({
          events: {
            ...u.events,
            connected: void 0
          }
        }));
      }
    }
  };
}
const Cm = /* @__PURE__ */ B.forwardRef(function({
  children: n,
  fallback: r,
  resize: i,
  style: l,
  gl: u,
  events: a = Pm,
  eventSource: d,
  eventPrefix: f,
  shadows: g,
  linear: p,
  flat: m,
  legacy: v,
  orthographic: x,
  frameloop: _,
  dpr: P,
  performance: T,
  raycaster: w,
  camera: S,
  scene: E,
  onPointerMissed: A,
  onCreated: M,
  ...L
}, R) {
  B.useMemo(() => ja(Qp), []);
  const z = Am(), [b, I] = dm({
    scroll: !0,
    debounce: {
      scroll: 50,
      resize: 0
    },
    ...i
  }), k = B.useRef(null), j = B.useRef(null);
  B.useImperativeHandle(R, () => k.current);
  const G = ed(A), [Y, ee] = B.useState(!1), [ae, Se] = B.useState(!1);
  if (Y)
    throw Y;
  if (ae)
    throw ae;
  const W = B.useRef(null);
  Hi(() => {
    const Z = k.current;
    I.width > 0 && I.height > 0 && Z && (W.current || (W.current = am(Z)), W.current.configure({
      gl: u,
      events: a,
      shadows: g,
      linear: p,
      flat: m,
      legacy: v,
      orthographic: x,
      frameloop: _,
      dpr: P,
      performance: T,
      raycaster: w,
      camera: S,
      scene: E,
      size: I,
      // Pass mutable reference to onPointerMissed so it's free to update
      onPointerMissed: (...te) => G.current == null ? void 0 : G.current(...te),
      onCreated: (te) => {
        te.events.connect == null || te.events.connect(d ? Xh(d) ? d.current : d : j.current), f && te.setEvents({
          compute: (ge, xe) => {
            const Fe = ge[f + "X"], it = ge[f + "Y"];
            xe.pointer.set(Fe / xe.size.width * 2 - 1, -(it / xe.size.height) * 2 + 1), xe.raycaster.setFromCamera(xe.pointer, xe.camera);
          }
        }), M?.(te);
      }
    }), W.current.render(/* @__PURE__ */ B.createElement(z, null, /* @__PURE__ */ B.createElement(td, {
      set: Se
    }, /* @__PURE__ */ B.createElement(B.Suspense, {
      fallback: /* @__PURE__ */ B.createElement(Kh, {
        set: ee
      })
    }, n)))));
  }), B.useEffect(() => {
    const Z = k.current;
    if (Z)
      return () => ad(Z);
  }, []);
  const J = d ? "none" : "auto";
  return /* @__PURE__ */ B.createElement("div", Gn({
    ref: j,
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      pointerEvents: J,
      ...l
    }
  }, L), /* @__PURE__ */ B.createElement("div", {
    ref: b,
    style: {
      width: "100%",
      height: "100%"
    }
  }, /* @__PURE__ */ B.createElement("canvas", {
    ref: k,
    style: {
      display: "block"
    }
  }, r)));
}), Mm = /* @__PURE__ */ B.forwardRef(function(n, r) {
  return /* @__PURE__ */ B.createElement(dd, null, /* @__PURE__ */ B.createElement(Cm, Gn({}, n, {
    ref: r
  })));
});
class Lm extends lr {
  constructor(n, r) {
    super(), this.inputSource = null, this.xrControllerModel = null, this.index = n, this.controller = r.xr.getController(n), this.grip = r.xr.getControllerGrip(n), this.hand = r.xr.getHand(n), this.grip.userData.name = "grip", this.controller.userData.name = "controller", this.hand.userData.name = "hand", this.visible = !1, this.add(this.controller, this.grip, this.hand), this._onConnected = this._onConnected.bind(this), this._onDisconnected = this._onDisconnected.bind(this), this.controller.addEventListener("connected", this._onConnected), this.controller.addEventListener("disconnected", this._onDisconnected);
  }
  _onConnected(n) {
    n.fake || n.data && (this.visible = !0, this.inputSource = n.data, this.dispatchEvent(n));
  }
  _onDisconnected(n) {
    n.fake || (this.visible = !1, this.inputSource = null, this.dispatchEvent(n));
  }
  dispose() {
    this.controller.removeEventListener("connected", this._onConnected), this.controller.removeEventListener("disconnected", this._onDisconnected);
  }
}
var Zc, Jc;
const Rm = (o) => Array.from(new Set(o)), jt = typeof window < "u" && ((Zc = window.document) != null && Zc.createElement || ((Jc = window.navigator) == null ? void 0 : Jc.product) === "ReactNative") ? B.useLayoutEffect : B.useEffect;
function fn(o) {
  const n = B.useRef(o);
  return jt(() => void (n.current = o), [o]), n;
}
function Ir(o, n, { handedness: r } = {}) {
  const i = fn(n), l = Ue((u) => u.controllers);
  jt(() => {
    const u = l.map((a) => {
      if (r && a.inputSource && a.inputSource.handedness !== r)
        return;
      const d = (f) => i.current({ nativeEvent: f, target: a });
      return a.controller.addEventListener(o, d), () => a.controller.removeEventListener(o, d);
    });
    return () => u.forEach((a) => a?.());
  }, [l, r, o]);
}
const $c = new $e();
function Nm({ children: o }) {
  const n = rt((m) => m.events), r = rt((m) => m.get), i = rt((m) => m.raycaster), l = Ue((m) => m.controllers), u = Ue((m) => m.interactions), a = Ue((m) => m.hoverState), d = Ue((m) => m.hasInteraction), f = Ue((m) => m.getInteraction), g = B.useCallback(
    (m) => {
      const v = Array.from(u.keys());
      return $c.identity().extractRotation(m.matrixWorld), i.ray.origin.setFromMatrixPosition(m.matrixWorld), i.ray.direction.set(0, 0, -1).applyMatrix4($c), i.intersectObjects(v, !0);
    },
    [u, i]
  );
  dr(() => {
    var m;
    if (u.size !== 0)
      for (const v of l) {
        if (!((m = v.inputSource) != null && m.handedness))
          return;
        const x = a[v.inputSource.handedness], _ = /* @__PURE__ */ new Set();
        let P = g(v.controller);
        if (n.filter)
          P = n.filter(P, r());
        else {
          const T = P.find((w) => w?.object);
          T && (P = [T]);
        }
        for (const T of P) {
          let w = T.object;
          for (; w; ) {
            if (d(w, "onHover") && !x.has(w)) {
              const E = f(w, "onHover");
              for (const A of E)
                A({ target: v, intersection: T, intersections: P });
            }
            const S = f(w, "onMove");
            S?.forEach((E) => E({ target: v, intersection: T, intersections: P })), x.set(w, T), _.add(w.id), w = w.parent;
          }
        }
        for (const T of x.keys())
          if (!_.has(T.id)) {
            x.delete(T);
            const w = f(T, "onBlur");
            if (!w)
              continue;
            for (const S of w)
              S({ target: v, intersections: P });
          }
      }
  });
  const p = B.useCallback(
    (m) => (v) => {
      var x;
      if (!((x = v.target.inputSource) != null && x.handedness))
        return;
      const _ = a[v.target.inputSource.handedness], P = Array.from(new Set(_.values()));
      u.forEach((T, w) => {
        var S, E, A;
        if (_.has(w)) {
          if (!T[m])
            return;
          for (const M of T[m])
            (S = M.current) == null || S.call(M, { target: v.target, intersection: _.get(w), intersections: P });
        } else if (m === "onSelect" && T.onSelectMissed)
          for (const M of T.onSelectMissed)
            (E = M.current) == null || E.call(M, { target: v.target, intersections: P });
        else if (m === "onSqueeze" && T.onSqueezeMissed)
          for (const M of T.onSqueezeMissed)
            (A = M.current) == null || A.call(M, { target: v.target, intersections: P });
      });
    },
    [a, u]
  );
  return Ir("select", p("onSelect")), Ir("selectstart", p("onSelectStart")), Ir("selectend", p("onSelectEnd")), Ir("squeeze", p("onSqueeze")), Ir("squeezeend", p("onSqueezeEnd")), Ir("squeezestart", p("onSqueezeStart")), /* @__PURE__ */ B.createElement(B.Fragment, null, o);
}
function qt(o, n, r) {
  const i = Ue((a) => a.addInteraction), l = Ue((a) => a.removeInteraction), u = fn(r);
  jt(() => {
    const a = o.current;
    if (!(!a || !u.current))
      return i(a, n, u), () => l(a, n, u);
  }, [o, n, i, l]);
}
const Im = B.forwardRef(function({
  onHover: n,
  onBlur: r,
  onSelectStart: i,
  onSelectEnd: l,
  onSelectMissed: u,
  onSelect: a,
  onSqueezeStart: d,
  onSqueezeEnd: f,
  onSqueezeMissed: g,
  onSqueeze: p,
  onMove: m,
  children: v
}, x) {
  const _ = B.useRef(null);
  return B.useImperativeHandle(x, () => _.current), qt(_, "onHover", n), qt(_, "onBlur", r), qt(_, "onSelectStart", i), qt(_, "onSelectEnd", l), qt(_, "onSelectMissed", u), qt(_, "onSelect", a), qt(_, "onSqueezeStart", d), qt(_, "onSqueezeEnd", f), qt(_, "onSqueezeMissed", g), qt(_, "onSqueeze", p), qt(_, "onMove", m), /* @__PURE__ */ B.createElement("group", {
    ref: _
  }, v);
}), zm = B.forwardRef(function({ onSelectStart: n, onSelectEnd: r, children: i, ...l }, u) {
  const a = B.useRef(), d = B.useRef(null), f = B.useMemo(() => new $e(), []);
  return B.useImperativeHandle(u, () => d.current), dr(() => {
    const g = a.current, p = d.current;
    g && (p.applyMatrix4(f), p.applyMatrix4(g.matrixWorld), p.updateMatrixWorld(), f.copy(g.matrixWorld).invert());
  }), /* @__PURE__ */ B.createElement(Im, {
    ref: d,
    onSelectStart: (g) => {
      a.current = g.target.controller, f.copy(g.target.controller.matrixWorld).invert(), n?.(g);
    },
    onSelectEnd: (g) => {
      g.target.controller === a.current && (a.current = void 0), r?.(g);
    },
    ...l
  }, i);
}), pd = B.createContext(null), ur = xo((o, n) => ({ set: o, get: n, session: null, referenceSpaceType: null }));
function Om({
  foveation: o = 0,
  frameRate: n = void 0,
  referenceSpace: r = "local-floor",
  onSessionStart: i,
  onSessionEnd: l,
  onVisibilityChange: u,
  onInputSourcesChange: a,
  children: d
}) {
  const f = rt((E) => E.gl), g = rt((E) => E.camera), p = Ue((E) => E.player), m = Ue((E) => E.get), v = Ue((E) => E.set), x = Ue((E) => E.session), _ = Ue((E) => E.controllers), P = fn(i), T = fn(l), w = fn(u), S = fn(a);
  return jt(() => {
    const E = [0, 1].map((A) => {
      const M = new Lm(A, f), L = () => v((z) => ({ controllers: [...z.controllers, M] })), R = () => v((z) => ({ controllers: z.controllers.filter((b) => b !== M) }));
      return M.addEventListener("connected", L), M.addEventListener("disconnected", R), () => {
        M.removeEventListener("connected", L), M.removeEventListener("disconnected", R);
      };
    });
    return () => E.forEach((A) => A());
  }, [f, v]), jt(() => ur.subscribe(({ session: E }) => v(() => ({ session: E }))), [f.xr, v]), jt(() => {
    f.xr.setFoveation(o), v(() => ({ foveation: o }));
  }, [f.xr, o, v]), jt(() => {
    var E;
    try {
      n && ((E = x?.updateTargetFrameRate) == null || E.call(x, n));
    } catch {
    }
    v(() => ({ frameRate: n }));
  }, [x, n, v]), jt(() => {
    const E = ur.getState();
    f.xr.setReferenceSpaceType(r), v(() => ({ referenceSpace: r })), E.set({ referenceSpaceType: r });
  }, [f.xr, r, v]), jt(() => {
    if (!x)
      return void f.xr.setSession(null);
    const E = (R) => {
      var z;
      v(() => ({ isPresenting: !0 })), (z = P.current) == null || z.call(P, { nativeEvent: { ...R, target: x }, target: x });
    }, A = (R) => {
      var z;
      v(() => ({ isPresenting: !1, session: null })), ur.setState(() => ({ session: null })), (z = T.current) == null || z.call(T, { nativeEvent: { ...R, target: x }, target: x });
    }, M = (R) => {
      var z;
      (z = w.current) == null || z.call(w, { nativeEvent: R, target: x });
    }, L = (R) => {
      var z;
      const b = Object.values(x.inputSources).some((I) => I.hand);
      v(() => ({ isHandTracking: b })), (z = S.current) == null || z.call(S, { nativeEvent: R, target: x });
    };
    return f.xr.addEventListener("sessionstart", E), f.xr.addEventListener("sessionend", A), x.addEventListener("visibilitychange", M), x.addEventListener("inputsourceschange", L), f.xr.setSession(x).then(() => {
      f.xr.setFoveation(m().foveation);
    }), () => {
      f.xr.removeEventListener("sessionstart", E), f.xr.removeEventListener("sessionend", A), x.removeEventListener("visibilitychange", M), x.removeEventListener("inputsourceschange", L);
    };
  }, [x, f.xr, v, m]), /* @__PURE__ */ B.createElement(Nm, null, /* @__PURE__ */ B.createElement("primitive", {
    object: p
  }, /* @__PURE__ */ B.createElement("primitive", {
    object: g
  }), _.map((E) => /* @__PURE__ */ B.createElement("primitive", {
    key: E.index,
    object: E
  }))), d);
}
function Dm(o) {
  const n = B.useMemo(
    () => xo((r, i) => ({
      set: r,
      get: i,
      controllers: [],
      isPresenting: !1,
      isHandTracking: !1,
      player: new lr(),
      session: null,
      foveation: 0,
      referenceSpace: "local-floor",
      hoverState: {
        left: /* @__PURE__ */ new Map(),
        right: /* @__PURE__ */ new Map(),
        none: /* @__PURE__ */ new Map()
      },
      interactions: /* @__PURE__ */ new Map(),
      hasInteraction(l, u) {
        var a;
        return !!((a = i().interactions.get(l)) != null && a[u].some((d) => d.current));
      },
      getInteraction(l, u) {
        var a;
        return (a = i().interactions.get(l)) == null ? void 0 : a[u].reduce((d, f) => (f.current && d.push(f.current), d), []);
      },
      addInteraction(l, u, a) {
        const d = i().interactions;
        d.has(l) || d.set(l, {
          onHover: [],
          onBlur: [],
          onSelect: [],
          onSelectEnd: [],
          onSelectStart: [],
          onSelectMissed: [],
          onSqueeze: [],
          onSqueezeEnd: [],
          onSqueezeStart: [],
          onSqueezeMissed: [],
          onMove: []
        }), d.get(l)[u].push(a);
      },
      removeInteraction(l, u, a) {
        const d = i().interactions.get(l);
        if (d) {
          const f = d[u].indexOf(a);
          f !== -1 && d[u].splice(f, 1);
        }
      }
    })),
    []
  );
  return /* @__PURE__ */ B.createElement(pd.Provider, {
    value: n
  }, /* @__PURE__ */ B.createElement(Om, {
    ...o
  }));
}
const bm = (o, n) => {
  var r;
  if (!(!o && !n))
    return o && !n ? { optionalFeatures: [o] } : o && n ? { ...n, optionalFeatures: Rm([...(r = n.optionalFeatures) != null ? r : [], o]) } : n;
}, km = async (o, n) => {
  const r = ur.getState();
  if (r.session) {
    console.warn("@react-three/xr: session already started, please stop it first");
    return;
  }
  const i = bm(r.referenceSpaceType, n), l = await navigator.xr.requestSession(o, i);
  return r.set(() => ({ session: l })), l;
}, Fm = async () => {
  const o = ur.getState();
  if (!o.session) {
    console.warn("@react-three/xr: no session to stop, please start it first");
    return;
  }
  await o.session.end(), o.set({ session: null });
}, Bm = async (o, { sessionInit: n, enterOnly: r, exitOnly: i } = {}) => {
  const l = ur.getState();
  if (!(l.session && r) && !(!l.session && i))
    return l.session ? await Fm() : await km(o, n);
}, jm = (o, n, r) => {
  switch (o) {
    case "entered":
      return `Exit ${n}`;
    case "exited":
      return `Enter ${n}`;
    case "unsupported":
    default:
      switch (r) {
        case "https":
          return "HTTPS needed";
        case "security":
          return `${n} blocked`;
        case "unknown":
        default:
          return `${n} unsupported`;
      }
  }
}, Ga = B.forwardRef(function({ mode: n, sessionInit: r, enterOnly: i = !1, exitOnly: l = !1, onClick: u, onError: a, children: d, ...f }, g) {
  var p;
  const [m, v] = B.useState("exited"), [x, _] = B.useState("unknown"), P = jm(m, n, x), T = n === "inline" ? n : `immersive-${n.toLowerCase()}`, w = fn(a);
  jt(() => {
    if (!navigator?.xr)
      return void v("unsupported");
    navigator.xr.isSessionSupported(T).then((E) => {
      if (E)
        v("exited");
      else {
        const A = location.protocol === "https:";
        v("unsupported"), _(A ? "unknown" : "https");
      }
    }).catch((E) => {
      v("unsupported"), "name" in E && E.name === "SecurityError" ? _("security") : _("unknown");
    });
  }, [T]), jt(
    () => ur.subscribe((E) => {
      E.session ? v("entered") : m !== "unsupported" && v("exited");
    }),
    [m]
  );
  const S = B.useCallback(
    async (E) => {
      u?.(E);
      try {
        Bm(T, { sessionInit: r, enterOnly: i, exitOnly: l });
      } catch (A) {
        const M = w.current;
        if (M && A instanceof Error)
          M(A);
        else
          throw A;
      }
    },
    [u, T, r, i, l, w]
  );
  return /* @__PURE__ */ B.createElement("button", {
    ...f,
    ref: g,
    onClick: m === "unsupported" ? u : S
  }, (p = typeof d == "function" ? d(m) : d) != null ? p : P);
}), hd = {
  position: "absolute",
  bottom: "24px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "12px 24px",
  border: "1px solid white",
  borderRadius: "4px",
  background: "rgba(0, 0, 0, 0.1)",
  color: "white",
  font: "normal 0.8125rem sans-serif",
  outline: "none",
  zIndex: 99999,
  cursor: "pointer"
};
B.forwardRef(
  ({
    style: o = hd,
    sessionInit: n = {
      domOverlay: typeof document < "u" ? { root: document.body } : void 0,
      optionalFeatures: ["hit-test", "dom-overlay", "dom-overlay-for-handheld-ar"]
    },
    children: r,
    ...i
  }, l) => /* @__PURE__ */ B.createElement(Ga, {
    ...i,
    ref: l,
    mode: "AR",
    style: o,
    sessionInit: n
  }, r)
);
B.forwardRef(
  ({
    style: o = hd,
    sessionInit: n = { optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking", "layers"] },
    children: r,
    ...i
  }, l) => /* @__PURE__ */ B.createElement(Ga, {
    ...i,
    ref: l,
    mode: "VR",
    style: o,
    sessionInit: n
  }, r)
);
function Ue(o = (r) => r, n) {
  const r = B.useContext(pd);
  if (!r)
    throw new Error("useXR must be used within an <XR /> component!");
  return r(o, n);
}
function ef(o, n) {
  if (n === qp)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), o;
  if (n === pa || n === Bf) {
    let r = o.getIndex();
    if (r === null) {
      const a = [], d = o.getAttribute("position");
      if (d !== void 0) {
        for (let f = 0; f < d.count; f++)
          a.push(f);
        o.setIndex(a), r = o.getIndex();
      } else
        return console.error(
          "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."
        ), o;
    }
    const i = r.count - 2, l = [];
    if (r)
      if (n === pa)
        for (let a = 1; a <= i; a++)
          l.push(r.getX(0)), l.push(r.getX(a)), l.push(r.getX(a + 1));
      else
        for (let a = 0; a < i; a++)
          a % 2 === 0 ? (l.push(r.getX(a)), l.push(r.getX(a + 1)), l.push(r.getX(a + 2))) : (l.push(r.getX(a + 2)), l.push(r.getX(a + 1)), l.push(r.getX(a)));
    l.length / 3 !== i && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const u = o.clone();
    return u.setIndex(l), u.clearGroups(), u;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", n), o;
}
const Um = parseInt(jf.replace(/\D+/g, ""));
var Hm = Object.defineProperty, Vm = (o, n, r) => n in o ? Hm(o, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[n] = r, de = (o, n, r) => (Vm(o, typeof n != "symbol" ? n + "" : n, r), r);
const Ks = new Uf(), tf = new ba(), Gm = Math.cos(70 * (Math.PI / 180)), nf = (o, n) => (o % n + n) % n;
let Wm = class extends Zp {
  constructor(n, r) {
    super(), de(this, "object"), de(this, "domElement"), de(this, "enabled", !0), de(this, "target", new V()), de(this, "minDistance", 0), de(this, "maxDistance", 1 / 0), de(this, "minZoom", 0), de(this, "maxZoom", 1 / 0), de(this, "minPolarAngle", 0), de(this, "maxPolarAngle", Math.PI), de(this, "minAzimuthAngle", -1 / 0), de(this, "maxAzimuthAngle", 1 / 0), de(this, "enableDamping", !1), de(this, "dampingFactor", 0.05), de(this, "enableZoom", !0), de(this, "zoomSpeed", 1), de(this, "enableRotate", !0), de(this, "rotateSpeed", 1), de(this, "enablePan", !0), de(this, "panSpeed", 1), de(this, "screenSpacePanning", !0), de(this, "keyPanSpeed", 7), de(this, "zoomToCursor", !1), de(this, "autoRotate", !1), de(this, "autoRotateSpeed", 2), de(this, "reverseOrbit", !1), de(this, "reverseHorizontalOrbit", !1), de(this, "reverseVerticalOrbit", !1), de(this, "keys", { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }), de(this, "mouseButtons", {
      LEFT: Mr.ROTATE,
      MIDDLE: Mr.DOLLY,
      RIGHT: Mr.PAN
    }), de(this, "touches", { ONE: Lr.ROTATE, TWO: Lr.DOLLY_PAN }), de(this, "target0"), de(this, "position0"), de(this, "zoom0"), de(this, "_domElementKeyEvents", null), de(this, "getPolarAngle"), de(this, "getAzimuthalAngle"), de(this, "setPolarAngle"), de(this, "setAzimuthalAngle"), de(this, "getDistance"), de(this, "listenToKeyEvents"), de(this, "stopListenToKeyEvents"), de(this, "saveState"), de(this, "reset"), de(this, "update"), de(this, "connect"), de(this, "dispose"), this.object = n, this.domElement = r, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.getPolarAngle = () => p.phi, this.getAzimuthalAngle = () => p.theta, this.setPolarAngle = (D) => {
      let K = nf(D, 2 * Math.PI), ce = p.phi;
      ce < 0 && (ce += 2 * Math.PI), K < 0 && (K += 2 * Math.PI);
      let _e = Math.abs(K - ce);
      2 * Math.PI - _e < _e && (K < ce ? K += 2 * Math.PI : ce += 2 * Math.PI), m.phi = K - ce, i.update();
    }, this.setAzimuthalAngle = (D) => {
      let K = nf(D, 2 * Math.PI), ce = p.theta;
      ce < 0 && (ce += 2 * Math.PI), K < 0 && (K += 2 * Math.PI);
      let _e = Math.abs(K - ce);
      2 * Math.PI - _e < _e && (K < ce ? K += 2 * Math.PI : ce += 2 * Math.PI), m.theta = K - ce, i.update();
    }, this.getDistance = () => i.object.position.distanceTo(i.target), this.listenToKeyEvents = (D) => {
      D.addEventListener("keydown", ni), this._domElementKeyEvents = D;
    }, this.stopListenToKeyEvents = () => {
      this._domElementKeyEvents.removeEventListener("keydown", ni), this._domElementKeyEvents = null;
    }, this.saveState = () => {
      i.target0.copy(i.target), i.position0.copy(i.object.position), i.zoom0 = i.object.zoom;
    }, this.reset = () => {
      i.target.copy(i.target0), i.object.position.copy(i.position0), i.object.zoom = i.zoom0, i.object.updateProjectionMatrix(), i.dispatchEvent(l), i.update(), f = d.NONE;
    }, this.update = (() => {
      const D = new V(), K = new V(0, 1, 0), ce = new go().setFromUnitVectors(n.up, K), _e = ce.clone().invert(), Ge = new V(), Wt = new go(), $t = 2 * Math.PI;
      return function() {
        const ii = i.object.position;
        ce.setFromUnitVectors(n.up, K), _e.copy(ce).invert(), D.copy(ii).sub(i.target), D.applyQuaternion(ce), p.setFromVector3(D), i.autoRotate && f === d.NONE && Y(j()), i.enableDamping ? (p.theta += m.theta * i.dampingFactor, p.phi += m.phi * i.dampingFactor) : (p.theta += m.theta, p.phi += m.phi);
        let Lt = i.minAzimuthAngle, Xt = i.maxAzimuthAngle;
        isFinite(Lt) && isFinite(Xt) && (Lt < -Math.PI ? Lt += $t : Lt > Math.PI && (Lt -= $t), Xt < -Math.PI ? Xt += $t : Xt > Math.PI && (Xt -= $t), Lt <= Xt ? p.theta = Math.max(Lt, Math.min(Xt, p.theta)) : p.theta = p.theta > (Lt + Xt) / 2 ? Math.max(Lt, p.theta) : Math.min(Xt, p.theta)), p.phi = Math.max(i.minPolarAngle, Math.min(i.maxPolarAngle, p.phi)), p.makeSafe(), i.enableDamping === !0 ? i.target.addScaledVector(x, i.dampingFactor) : i.target.add(x), i.zoomToCursor && b || i.object.isOrthographicCamera ? p.radius = ge(p.radius) : p.radius = ge(p.radius * v), D.setFromSpherical(p), D.applyQuaternion(_e), ii.copy(i.target).add(D), i.object.matrixAutoUpdate || i.object.updateMatrix(), i.object.lookAt(i.target), i.enableDamping === !0 ? (m.theta *= 1 - i.dampingFactor, m.phi *= 1 - i.dampingFactor, x.multiplyScalar(1 - i.dampingFactor)) : (m.set(0, 0, 0), x.set(0, 0, 0));
        let Pn = !1;
        if (i.zoomToCursor && b) {
          let Cn = null;
          if (i.object instanceof Xr && i.object.isPerspectiveCamera) {
            const Mn = D.length();
            Cn = ge(Mn * v);
            const pr = Mn - Cn;
            i.object.position.addScaledVector(R, pr), i.object.updateMatrixWorld();
          } else if (i.object.isOrthographicCamera) {
            const Mn = new V(z.x, z.y, 0);
            Mn.unproject(i.object), i.object.zoom = Math.max(i.minZoom, Math.min(i.maxZoom, i.object.zoom / v)), i.object.updateProjectionMatrix(), Pn = !0;
            const pr = new V(z.x, z.y, 0);
            pr.unproject(i.object), i.object.position.sub(pr).add(Mn), i.object.updateMatrixWorld(), Cn = D.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), i.zoomToCursor = !1;
          Cn !== null && (i.screenSpacePanning ? i.target.set(0, 0, -1).transformDirection(i.object.matrix).multiplyScalar(Cn).add(i.object.position) : (Ks.origin.copy(i.object.position), Ks.direction.set(0, 0, -1).transformDirection(i.object.matrix), Math.abs(i.object.up.dot(Ks.direction)) < Gm ? n.lookAt(i.target) : (tf.setFromNormalAndCoplanarPoint(i.object.up, i.target), Ks.intersectPlane(tf, i.target))));
        } else
          i.object instanceof Wr && i.object.isOrthographicCamera && (Pn = v !== 1, Pn && (i.object.zoom = Math.max(i.minZoom, Math.min(i.maxZoom, i.object.zoom / v)), i.object.updateProjectionMatrix()));
        return v = 1, b = !1, Pn || Ge.distanceToSquared(i.object.position) > g || 8 * (1 - Wt.dot(i.object.quaternion)) > g ? (i.dispatchEvent(l), Ge.copy(i.object.position), Wt.copy(i.object.quaternion), Pn = !1, !0) : !1;
      };
    })(), this.connect = (D) => {
      D === document && console.error(
        'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'
      ), i.domElement = D, i.domElement.style.touchAction = "none", i.domElement.addEventListener("contextmenu", Ki), i.domElement.addEventListener("pointerdown", Wi), i.domElement.addEventListener("pointercancel", An), i.domElement.addEventListener("wheel", Xi);
    }, this.dispose = () => {
      var D, K, ce, _e, Ge, Wt;
      (D = i.domElement) == null || D.removeEventListener("contextmenu", Ki), (K = i.domElement) == null || K.removeEventListener("pointerdown", Wi), (ce = i.domElement) == null || ce.removeEventListener("pointercancel", An), (_e = i.domElement) == null || _e.removeEventListener("wheel", Xi), (Ge = i.domElement) == null || Ge.ownerDocument.removeEventListener("pointermove", ei), (Wt = i.domElement) == null || Wt.ownerDocument.removeEventListener("pointerup", ti), i._domElementKeyEvents !== null && i._domElementKeyEvents.removeEventListener("keydown", ni);
    };
    const i = this, l = { type: "change" }, u = { type: "start" }, a = { type: "end" }, d = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let f = d.NONE;
    const g = 1e-6, p = new zc(), m = new zc();
    let v = 1;
    const x = new V(), _ = new ye(), P = new ye(), T = new ye(), w = new ye(), S = new ye(), E = new ye(), A = new ye(), M = new ye(), L = new ye(), R = new V(), z = new ye();
    let b = !1;
    const I = [], k = {};
    function j() {
      return 2 * Math.PI / 60 / 60 * i.autoRotateSpeed;
    }
    function G() {
      return Math.pow(0.95, i.zoomSpeed);
    }
    function Y(D) {
      i.reverseOrbit || i.reverseHorizontalOrbit ? m.theta += D : m.theta -= D;
    }
    function ee(D) {
      i.reverseOrbit || i.reverseVerticalOrbit ? m.phi += D : m.phi -= D;
    }
    const ae = (() => {
      const D = new V();
      return function(ce, _e) {
        D.setFromMatrixColumn(_e, 0), D.multiplyScalar(-ce), x.add(D);
      };
    })(), Se = (() => {
      const D = new V();
      return function(ce, _e) {
        i.screenSpacePanning === !0 ? D.setFromMatrixColumn(_e, 1) : (D.setFromMatrixColumn(_e, 0), D.crossVectors(i.object.up, D)), D.multiplyScalar(ce), x.add(D);
      };
    })(), W = (() => {
      const D = new V();
      return function(ce, _e) {
        const Ge = i.domElement;
        if (Ge && i.object instanceof Xr && i.object.isPerspectiveCamera) {
          const Wt = i.object.position;
          D.copy(Wt).sub(i.target);
          let $t = D.length();
          $t *= Math.tan(i.object.fov / 2 * Math.PI / 180), ae(2 * ce * $t / Ge.clientHeight, i.object.matrix), Se(2 * _e * $t / Ge.clientHeight, i.object.matrix);
        } else
          Ge && i.object instanceof Wr && i.object.isOrthographicCamera ? (ae(
            ce * (i.object.right - i.object.left) / i.object.zoom / Ge.clientWidth,
            i.object.matrix
          ), Se(
            _e * (i.object.top - i.object.bottom) / i.object.zoom / Ge.clientHeight,
            i.object.matrix
          )) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), i.enablePan = !1);
      };
    })();
    function J(D) {
      i.object instanceof Xr && i.object.isPerspectiveCamera || i.object instanceof Wr && i.object.isOrthographicCamera ? v /= D : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), i.enableZoom = !1);
    }
    function Z(D) {
      i.object instanceof Xr && i.object.isPerspectiveCamera || i.object instanceof Wr && i.object.isOrthographicCamera ? v *= D : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), i.enableZoom = !1);
    }
    function te(D) {
      if (!i.zoomToCursor || !i.domElement)
        return;
      b = !0;
      const K = i.domElement.getBoundingClientRect(), ce = D.clientX - K.left, _e = D.clientY - K.top, Ge = K.width, Wt = K.height;
      z.x = ce / Ge * 2 - 1, z.y = -(_e / Wt) * 2 + 1, R.set(z.x, z.y, 1).unproject(i.object).sub(i.object.position).normalize();
    }
    function ge(D) {
      return Math.max(i.minDistance, Math.min(i.maxDistance, D));
    }
    function xe(D) {
      _.set(D.clientX, D.clientY);
    }
    function Fe(D) {
      te(D), A.set(D.clientX, D.clientY);
    }
    function it(D) {
      w.set(D.clientX, D.clientY);
    }
    function gt(D) {
      P.set(D.clientX, D.clientY), T.subVectors(P, _).multiplyScalar(i.rotateSpeed);
      const K = i.domElement;
      K && (Y(2 * Math.PI * T.x / K.clientHeight), ee(2 * Math.PI * T.y / K.clientHeight)), _.copy(P), i.update();
    }
    function se(D) {
      M.set(D.clientX, D.clientY), L.subVectors(M, A), L.y > 0 ? J(G()) : L.y < 0 && Z(G()), A.copy(M), i.update();
    }
    function fe(D) {
      S.set(D.clientX, D.clientY), E.subVectors(S, w).multiplyScalar(i.panSpeed), W(E.x, E.y), w.copy(S), i.update();
    }
    function le(D) {
      te(D), D.deltaY < 0 ? Z(G()) : D.deltaY > 0 && J(G()), i.update();
    }
    function Me(D) {
      let K = !1;
      switch (D.code) {
        case i.keys.UP:
          W(0, i.keyPanSpeed), K = !0;
          break;
        case i.keys.BOTTOM:
          W(0, -i.keyPanSpeed), K = !0;
          break;
        case i.keys.LEFT:
          W(i.keyPanSpeed, 0), K = !0;
          break;
        case i.keys.RIGHT:
          W(-i.keyPanSpeed, 0), K = !0;
          break;
      }
      K && (D.preventDefault(), i.update());
    }
    function Pe() {
      if (I.length == 1)
        _.set(I[0].pageX, I[0].pageY);
      else {
        const D = 0.5 * (I[0].pageX + I[1].pageX), K = 0.5 * (I[0].pageY + I[1].pageY);
        _.set(D, K);
      }
    }
    function Ve() {
      if (I.length == 1)
        w.set(I[0].pageX, I[0].pageY);
      else {
        const D = 0.5 * (I[0].pageX + I[1].pageX), K = 0.5 * (I[0].pageY + I[1].pageY);
        w.set(D, K);
      }
    }
    function ue() {
      const D = I[0].pageX - I[1].pageX, K = I[0].pageY - I[1].pageY, ce = Math.sqrt(D * D + K * K);
      A.set(0, ce);
    }
    function Ie() {
      i.enableZoom && ue(), i.enablePan && Ve();
    }
    function st() {
      i.enableZoom && ue(), i.enableRotate && Pe();
    }
    function vt(D) {
      if (I.length == 1)
        P.set(D.pageX, D.pageY);
      else {
        const ce = ri(D), _e = 0.5 * (D.pageX + ce.x), Ge = 0.5 * (D.pageY + ce.y);
        P.set(_e, Ge);
      }
      T.subVectors(P, _).multiplyScalar(i.rotateSpeed);
      const K = i.domElement;
      K && (Y(2 * Math.PI * T.x / K.clientHeight), ee(2 * Math.PI * T.y / K.clientHeight)), _.copy(P);
    }
    function Vi(D) {
      if (I.length == 1)
        S.set(D.pageX, D.pageY);
      else {
        const K = ri(D), ce = 0.5 * (D.pageX + K.x), _e = 0.5 * (D.pageY + K.y);
        S.set(ce, _e);
      }
      E.subVectors(S, w).multiplyScalar(i.panSpeed), W(E.x, E.y), w.copy(S);
    }
    function Gi(D) {
      const K = ri(D), ce = D.pageX - K.x, _e = D.pageY - K.y, Ge = Math.sqrt(ce * ce + _e * _e);
      M.set(0, Ge), L.set(0, Math.pow(M.y / A.y, i.zoomSpeed)), J(L.y), A.copy(M);
    }
    function _o(D) {
      i.enableZoom && Gi(D), i.enablePan && Vi(D);
    }
    function Kn(D) {
      i.enableZoom && Gi(D), i.enableRotate && vt(D);
    }
    function Wi(D) {
      var K, ce;
      i.enabled !== !1 && (I.length === 0 && ((K = i.domElement) == null || K.ownerDocument.addEventListener("pointermove", ei), (ce = i.domElement) == null || ce.ownerDocument.addEventListener("pointerup", ti)), Co(D), D.pointerType === "touch" ? Ao(D) : Eo(D));
    }
    function ei(D) {
      i.enabled !== !1 && (D.pointerType === "touch" ? Po(D) : To(D));
    }
    function ti(D) {
      var K, ce, _e;
      Yi(D), I.length === 0 && ((K = i.domElement) == null || K.releasePointerCapture(D.pointerId), (ce = i.domElement) == null || ce.ownerDocument.removeEventListener("pointermove", ei), (_e = i.domElement) == null || _e.ownerDocument.removeEventListener("pointerup", ti)), i.dispatchEvent(a), f = d.NONE;
    }
    function An(D) {
      Yi(D);
    }
    function Eo(D) {
      let K;
      switch (D.button) {
        case 0:
          K = i.mouseButtons.LEFT;
          break;
        case 1:
          K = i.mouseButtons.MIDDLE;
          break;
        case 2:
          K = i.mouseButtons.RIGHT;
          break;
        default:
          K = -1;
      }
      switch (K) {
        case Mr.DOLLY:
          if (i.enableZoom === !1)
            return;
          Fe(D), f = d.DOLLY;
          break;
        case Mr.ROTATE:
          if (D.ctrlKey || D.metaKey || D.shiftKey) {
            if (i.enablePan === !1)
              return;
            it(D), f = d.PAN;
          } else {
            if (i.enableRotate === !1)
              return;
            xe(D), f = d.ROTATE;
          }
          break;
        case Mr.PAN:
          if (D.ctrlKey || D.metaKey || D.shiftKey) {
            if (i.enableRotate === !1)
              return;
            xe(D), f = d.ROTATE;
          } else {
            if (i.enablePan === !1)
              return;
            it(D), f = d.PAN;
          }
          break;
        default:
          f = d.NONE;
      }
      f !== d.NONE && i.dispatchEvent(u);
    }
    function To(D) {
      if (i.enabled !== !1)
        switch (f) {
          case d.ROTATE:
            if (i.enableRotate === !1)
              return;
            gt(D);
            break;
          case d.DOLLY:
            if (i.enableZoom === !1)
              return;
            se(D);
            break;
          case d.PAN:
            if (i.enablePan === !1)
              return;
            fe(D);
            break;
        }
    }
    function Xi(D) {
      i.enabled === !1 || i.enableZoom === !1 || f !== d.NONE && f !== d.ROTATE || (D.preventDefault(), i.dispatchEvent(u), le(D), i.dispatchEvent(a));
    }
    function ni(D) {
      i.enabled === !1 || i.enablePan === !1 || Me(D);
    }
    function Ao(D) {
      switch (Qi(D), I.length) {
        case 1:
          switch (i.touches.ONE) {
            case Lr.ROTATE:
              if (i.enableRotate === !1)
                return;
              Pe(), f = d.TOUCH_ROTATE;
              break;
            case Lr.PAN:
              if (i.enablePan === !1)
                return;
              Ve(), f = d.TOUCH_PAN;
              break;
            default:
              f = d.NONE;
          }
          break;
        case 2:
          switch (i.touches.TWO) {
            case Lr.DOLLY_PAN:
              if (i.enableZoom === !1 && i.enablePan === !1)
                return;
              Ie(), f = d.TOUCH_DOLLY_PAN;
              break;
            case Lr.DOLLY_ROTATE:
              if (i.enableZoom === !1 && i.enableRotate === !1)
                return;
              st(), f = d.TOUCH_DOLLY_ROTATE;
              break;
            default:
              f = d.NONE;
          }
          break;
        default:
          f = d.NONE;
      }
      f !== d.NONE && i.dispatchEvent(u);
    }
    function Po(D) {
      switch (Qi(D), f) {
        case d.TOUCH_ROTATE:
          if (i.enableRotate === !1)
            return;
          vt(D), i.update();
          break;
        case d.TOUCH_PAN:
          if (i.enablePan === !1)
            return;
          Vi(D), i.update();
          break;
        case d.TOUCH_DOLLY_PAN:
          if (i.enableZoom === !1 && i.enablePan === !1)
            return;
          _o(D), i.update();
          break;
        case d.TOUCH_DOLLY_ROTATE:
          if (i.enableZoom === !1 && i.enableRotate === !1)
            return;
          Kn(D), i.update();
          break;
        default:
          f = d.NONE;
      }
    }
    function Ki(D) {
      i.enabled !== !1 && D.preventDefault();
    }
    function Co(D) {
      I.push(D);
    }
    function Yi(D) {
      delete k[D.pointerId];
      for (let K = 0; K < I.length; K++)
        if (I[K].pointerId == D.pointerId) {
          I.splice(K, 1);
          return;
        }
    }
    function Qi(D) {
      let K = k[D.pointerId];
      K === void 0 && (K = new ye(), k[D.pointerId] = K), K.set(D.pageX, D.pageY);
    }
    function ri(D) {
      const K = D.pointerId === I[0].pointerId ? I[1] : I[0];
      return k[K.pointerId];
    }
    r !== void 0 && this.connect(r), this.update();
  }
};
class md extends Jp {
  constructor(n) {
    super(n), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(r) {
      return new qm(r);
    }), this.register(function(r) {
      return new ig(r);
    }), this.register(function(r) {
      return new sg(r);
    }), this.register(function(r) {
      return new og(r);
    }), this.register(function(r) {
      return new Jm(r);
    }), this.register(function(r) {
      return new $m(r);
    }), this.register(function(r) {
      return new eg(r);
    }), this.register(function(r) {
      return new tg(r);
    }), this.register(function(r) {
      return new Qm(r);
    }), this.register(function(r) {
      return new ng(r);
    }), this.register(function(r) {
      return new Zm(r);
    }), this.register(function(r) {
      return new rg(r);
    }), this.register(function(r) {
      return new Km(r);
    }), this.register(function(r) {
      return new lg(r);
    }), this.register(function(r) {
      return new ag(r);
    });
  }
  load(n, r, i, l) {
    const u = this;
    let a;
    this.resourcePath !== "" ? a = this.resourcePath : this.path !== "" ? a = this.path : a = ar.extractUrlBase(n), this.manager.itemStart(n);
    const d = function(g) {
      l ? l(g) : console.error(g), u.manager.itemError(n), u.manager.itemEnd(n);
    }, f = new Hf(this.manager);
    f.setPath(this.path), f.setResponseType("arraybuffer"), f.setRequestHeader(this.requestHeader), f.setWithCredentials(this.withCredentials), f.load(
      n,
      function(g) {
        try {
          u.parse(
            g,
            a,
            function(p) {
              r(p), u.manager.itemEnd(n);
            },
            d
          );
        } catch (p) {
          d(p);
        }
      },
      i,
      d
    );
  }
  setDRACOLoader(n) {
    return this.dracoLoader = n, this;
  }
  setDDSLoader() {
    throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".');
  }
  setKTX2Loader(n) {
    return this.ktx2Loader = n, this;
  }
  setMeshoptDecoder(n) {
    return this.meshoptDecoder = n, this;
  }
  register(n) {
    return this.pluginCallbacks.indexOf(n) === -1 && this.pluginCallbacks.push(n), this;
  }
  unregister(n) {
    return this.pluginCallbacks.indexOf(n) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(n), 1), this;
  }
  parse(n, r, i, l) {
    let u;
    const a = {}, d = {};
    if (typeof n == "string")
      u = JSON.parse(n);
    else if (n instanceof ArrayBuffer)
      if (ar.decodeText(new Uint8Array(n.slice(0, 4))) === gd) {
        try {
          a[we.KHR_BINARY_GLTF] = new ug(n);
        } catch (p) {
          l && l(p);
          return;
        }
        u = JSON.parse(a[we.KHR_BINARY_GLTF].content);
      } else
        u = JSON.parse(ar.decodeText(new Uint8Array(n)));
    else
      u = n;
    if (u.asset === void 0 || u.asset.version[0] < 2) {
      l && l(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const f = new _g(u, {
      path: r || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    f.fileLoader.setRequestHeader(this.requestHeader);
    for (let g = 0; g < this.pluginCallbacks.length; g++) {
      const p = this.pluginCallbacks[g](f);
      d[p.name] = p, a[p.name] = !0;
    }
    if (u.extensionsUsed)
      for (let g = 0; g < u.extensionsUsed.length; ++g) {
        const p = u.extensionsUsed[g], m = u.extensionsRequired || [];
        switch (p) {
          case we.KHR_MATERIALS_UNLIT:
            a[p] = new Ym();
            break;
          case we.KHR_DRACO_MESH_COMPRESSION:
            a[p] = new cg(u, this.dracoLoader);
            break;
          case we.KHR_TEXTURE_TRANSFORM:
            a[p] = new fg();
            break;
          case we.KHR_MESH_QUANTIZATION:
            a[p] = new dg();
            break;
          default:
            m.indexOf(p) >= 0 && d[p] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + p + '".');
        }
      }
    f.setExtensions(a), f.setPlugins(d), f.parse(i, l);
  }
  parseAsync(n, r) {
    const i = this;
    return new Promise(function(l, u) {
      i.parse(n, r, l, u);
    });
  }
}
function Xm() {
  let o = {};
  return {
    get: function(n) {
      return o[n];
    },
    add: function(n, r) {
      o[n] = r;
    },
    remove: function(n) {
      delete o[n];
    },
    removeAll: function() {
      o = {};
    }
  };
}
const we = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class Km {
  constructor(n) {
    this.parser = n, this.name = we.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const n = this.parser, r = this.parser.json.nodes || [];
    for (let i = 0, l = r.length; i < l; i++) {
      const u = r[i];
      u.extensions && u.extensions[this.name] && u.extensions[this.name].light !== void 0 && n._addNodeRef(this.cache, u.extensions[this.name].light);
    }
  }
  _loadLight(n) {
    const r = this.parser, i = "light:" + n;
    let l = r.cache.get(i);
    if (l)
      return l;
    const u = r.json, f = ((u.extensions && u.extensions[this.name] || {}).lights || [])[n];
    let g;
    const p = new _n(16777215);
    f.color !== void 0 && p.fromArray(f.color);
    const m = f.range !== void 0 ? f.range : 0;
    switch (f.type) {
      case "directional":
        g = new th(p), g.target.position.set(0, 0, -1), g.add(g.target);
        break;
      case "point":
        g = new eh(p), g.distance = m;
        break;
      case "spot":
        g = new $p(p), g.distance = m, f.spot = f.spot || {}, f.spot.innerConeAngle = f.spot.innerConeAngle !== void 0 ? f.spot.innerConeAngle : 0, f.spot.outerConeAngle = f.spot.outerConeAngle !== void 0 ? f.spot.outerConeAngle : Math.PI / 4, g.angle = f.spot.outerConeAngle, g.penumbra = 1 - f.spot.innerConeAngle / f.spot.outerConeAngle, g.target.position.set(0, 0, -1), g.add(g.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + f.type);
    }
    return g.position.set(0, 0, 0), g.decay = 2, Un(g, f), f.intensity !== void 0 && (g.intensity = f.intensity), g.name = r.createUniqueName(f.name || "light_" + n), l = Promise.resolve(g), r.cache.add(i, l), l;
  }
  getDependency(n, r) {
    if (n === "light")
      return this._loadLight(r);
  }
  createNodeAttachment(n) {
    const r = this, i = this.parser, u = i.json.nodes[n], d = (u.extensions && u.extensions[this.name] || {}).light;
    return d === void 0 ? null : this._loadLight(d).then(function(f) {
      return i._getNodeRef(r.cache, d, f);
    });
  }
}
class Ym {
  constructor() {
    this.name = we.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return sr;
  }
  extendParams(n, r, i) {
    const l = [];
    n.color = new _n(1, 1, 1), n.opacity = 1;
    const u = r.pbrMetallicRoughness;
    if (u) {
      if (Array.isArray(u.baseColorFactor)) {
        const a = u.baseColorFactor;
        n.color.fromArray(a), n.opacity = a[3];
      }
      u.baseColorTexture !== void 0 && l.push(i.assignTexture(n, "map", u.baseColorTexture, 3001));
    }
    return Promise.all(l);
  }
}
class Qm {
  constructor(n) {
    this.parser = n, this.name = we.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(n, r) {
    const l = this.parser.json.materials[n];
    if (!l.extensions || !l.extensions[this.name])
      return Promise.resolve();
    const u = l.extensions[this.name].emissiveStrength;
    return u !== void 0 && (r.emissiveIntensity = u), Promise.resolve();
  }
}
class qm {
  constructor(n) {
    this.parser = n, this.name = we.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(n) {
    const i = this.parser.json.materials[n];
    return !i.extensions || !i.extensions[this.name] ? null : Tn;
  }
  extendMaterialParams(n, r) {
    const i = this.parser, l = i.json.materials[n];
    if (!l.extensions || !l.extensions[this.name])
      return Promise.resolve();
    const u = [], a = l.extensions[this.name];
    if (a.clearcoatFactor !== void 0 && (r.clearcoat = a.clearcoatFactor), a.clearcoatTexture !== void 0 && u.push(i.assignTexture(r, "clearcoatMap", a.clearcoatTexture)), a.clearcoatRoughnessFactor !== void 0 && (r.clearcoatRoughness = a.clearcoatRoughnessFactor), a.clearcoatRoughnessTexture !== void 0 && u.push(i.assignTexture(r, "clearcoatRoughnessMap", a.clearcoatRoughnessTexture)), a.clearcoatNormalTexture !== void 0 && (u.push(i.assignTexture(r, "clearcoatNormalMap", a.clearcoatNormalTexture)), a.clearcoatNormalTexture.scale !== void 0)) {
      const d = a.clearcoatNormalTexture.scale;
      r.clearcoatNormalScale = new ye(d, d);
    }
    return Promise.all(u);
  }
}
class Zm {
  constructor(n) {
    this.parser = n, this.name = we.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(n) {
    const i = this.parser.json.materials[n];
    return !i.extensions || !i.extensions[this.name] ? null : Tn;
  }
  extendMaterialParams(n, r) {
    const i = this.parser, l = i.json.materials[n];
    if (!l.extensions || !l.extensions[this.name])
      return Promise.resolve();
    const u = [], a = l.extensions[this.name];
    return a.iridescenceFactor !== void 0 && (r.iridescence = a.iridescenceFactor), a.iridescenceTexture !== void 0 && u.push(i.assignTexture(r, "iridescenceMap", a.iridescenceTexture)), a.iridescenceIor !== void 0 && (r.iridescenceIOR = a.iridescenceIor), r.iridescenceThicknessRange === void 0 && (r.iridescenceThicknessRange = [100, 400]), a.iridescenceThicknessMinimum !== void 0 && (r.iridescenceThicknessRange[0] = a.iridescenceThicknessMinimum), a.iridescenceThicknessMaximum !== void 0 && (r.iridescenceThicknessRange[1] = a.iridescenceThicknessMaximum), a.iridescenceThicknessTexture !== void 0 && u.push(
      i.assignTexture(r, "iridescenceThicknessMap", a.iridescenceThicknessTexture)
    ), Promise.all(u);
  }
}
class Jm {
  constructor(n) {
    this.parser = n, this.name = we.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(n) {
    const i = this.parser.json.materials[n];
    return !i.extensions || !i.extensions[this.name] ? null : Tn;
  }
  extendMaterialParams(n, r) {
    const i = this.parser, l = i.json.materials[n];
    if (!l.extensions || !l.extensions[this.name])
      return Promise.resolve();
    const u = [];
    r.sheenColor = new _n(0, 0, 0), r.sheenRoughness = 0, r.sheen = 1;
    const a = l.extensions[this.name];
    return a.sheenColorFactor !== void 0 && r.sheenColor.fromArray(a.sheenColorFactor), a.sheenRoughnessFactor !== void 0 && (r.sheenRoughness = a.sheenRoughnessFactor), a.sheenColorTexture !== void 0 && u.push(i.assignTexture(r, "sheenColorMap", a.sheenColorTexture, 3001)), a.sheenRoughnessTexture !== void 0 && u.push(i.assignTexture(r, "sheenRoughnessMap", a.sheenRoughnessTexture)), Promise.all(u);
  }
}
class $m {
  constructor(n) {
    this.parser = n, this.name = we.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(n) {
    const i = this.parser.json.materials[n];
    return !i.extensions || !i.extensions[this.name] ? null : Tn;
  }
  extendMaterialParams(n, r) {
    const i = this.parser, l = i.json.materials[n];
    if (!l.extensions || !l.extensions[this.name])
      return Promise.resolve();
    const u = [], a = l.extensions[this.name];
    return a.transmissionFactor !== void 0 && (r.transmission = a.transmissionFactor), a.transmissionTexture !== void 0 && u.push(i.assignTexture(r, "transmissionMap", a.transmissionTexture)), Promise.all(u);
  }
}
class eg {
  constructor(n) {
    this.parser = n, this.name = we.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(n) {
    const i = this.parser.json.materials[n];
    return !i.extensions || !i.extensions[this.name] ? null : Tn;
  }
  extendMaterialParams(n, r) {
    const i = this.parser, l = i.json.materials[n];
    if (!l.extensions || !l.extensions[this.name])
      return Promise.resolve();
    const u = [], a = l.extensions[this.name];
    r.thickness = a.thicknessFactor !== void 0 ? a.thicknessFactor : 0, a.thicknessTexture !== void 0 && u.push(i.assignTexture(r, "thicknessMap", a.thicknessTexture)), r.attenuationDistance = a.attenuationDistance || 1 / 0;
    const d = a.attenuationColor || [1, 1, 1];
    return r.attenuationColor = new _n(d[0], d[1], d[2]), Promise.all(u);
  }
}
class tg {
  constructor(n) {
    this.parser = n, this.name = we.KHR_MATERIALS_IOR;
  }
  getMaterialType(n) {
    const i = this.parser.json.materials[n];
    return !i.extensions || !i.extensions[this.name] ? null : Tn;
  }
  extendMaterialParams(n, r) {
    const l = this.parser.json.materials[n];
    if (!l.extensions || !l.extensions[this.name])
      return Promise.resolve();
    const u = l.extensions[this.name];
    return r.ior = u.ior !== void 0 ? u.ior : 1.5, Promise.resolve();
  }
}
class ng {
  constructor(n) {
    this.parser = n, this.name = we.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(n) {
    const i = this.parser.json.materials[n];
    return !i.extensions || !i.extensions[this.name] ? null : Tn;
  }
  extendMaterialParams(n, r) {
    const i = this.parser, l = i.json.materials[n];
    if (!l.extensions || !l.extensions[this.name])
      return Promise.resolve();
    const u = [], a = l.extensions[this.name];
    r.specularIntensity = a.specularFactor !== void 0 ? a.specularFactor : 1, a.specularTexture !== void 0 && u.push(i.assignTexture(r, "specularIntensityMap", a.specularTexture));
    const d = a.specularColorFactor || [1, 1, 1];
    return r.specularColor = new _n(d[0], d[1], d[2]), a.specularColorTexture !== void 0 && u.push(
      i.assignTexture(r, "specularColorMap", a.specularColorTexture, 3001)
      // sRGBEncoding
    ), Promise.all(u);
  }
}
class rg {
  constructor(n) {
    this.parser = n, this.name = we.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(n) {
    const i = this.parser.json.materials[n];
    return !i.extensions || !i.extensions[this.name] ? null : Tn;
  }
  extendMaterialParams(n, r) {
    const i = this.parser, l = i.json.materials[n];
    if (!l.extensions || !l.extensions[this.name])
      return Promise.resolve();
    const u = [], a = l.extensions[this.name];
    return a.anisotropyStrength !== void 0 && (r.anisotropy = a.anisotropyStrength), a.anisotropyRotation !== void 0 && (r.anisotropyRotation = a.anisotropyRotation), a.anisotropyTexture !== void 0 && u.push(i.assignTexture(r, "anisotropyMap", a.anisotropyTexture)), Promise.all(u);
  }
}
class ig {
  constructor(n) {
    this.parser = n, this.name = we.KHR_TEXTURE_BASISU;
  }
  loadTexture(n) {
    const r = this.parser, i = r.json, l = i.textures[n];
    if (!l.extensions || !l.extensions[this.name])
      return null;
    const u = l.extensions[this.name], a = r.options.ktx2Loader;
    if (!a) {
      if (i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return r.loadTextureImage(n, u.source, a);
  }
}
class sg {
  constructor(n) {
    this.parser = n, this.name = we.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(n) {
    const r = this.name, i = this.parser, l = i.json, u = l.textures[n];
    if (!u.extensions || !u.extensions[r])
      return null;
    const a = u.extensions[r], d = l.images[a.source];
    let f = i.textureLoader;
    if (d.uri) {
      const g = i.options.manager.getHandler(d.uri);
      g !== null && (f = g);
    }
    return this.detectSupport().then(function(g) {
      if (g)
        return i.loadTextureImage(n, a.source, f);
      if (l.extensionsRequired && l.extensionsRequired.indexOf(r) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return i.loadTexture(n);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(n) {
      const r = new Image();
      r.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", r.onload = r.onerror = function() {
        n(r.height === 1);
      };
    })), this.isSupported;
  }
}
class og {
  constructor(n) {
    this.parser = n, this.name = we.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(n) {
    const r = this.name, i = this.parser, l = i.json, u = l.textures[n];
    if (!u.extensions || !u.extensions[r])
      return null;
    const a = u.extensions[r], d = l.images[a.source];
    let f = i.textureLoader;
    if (d.uri) {
      const g = i.options.manager.getHandler(d.uri);
      g !== null && (f = g);
    }
    return this.detectSupport().then(function(g) {
      if (g)
        return i.loadTextureImage(n, a.source, f);
      if (l.extensionsRequired && l.extensionsRequired.indexOf(r) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return i.loadTexture(n);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(n) {
      const r = new Image();
      r.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", r.onload = r.onerror = function() {
        n(r.height === 1);
      };
    })), this.isSupported;
  }
}
class lg {
  constructor(n) {
    this.name = we.EXT_MESHOPT_COMPRESSION, this.parser = n;
  }
  loadBufferView(n) {
    const r = this.parser.json, i = r.bufferViews[n];
    if (i.extensions && i.extensions[this.name]) {
      const l = i.extensions[this.name], u = this.parser.getDependency("buffer", l.buffer), a = this.parser.options.meshoptDecoder;
      if (!a || !a.supported) {
        if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return u.then(function(d) {
        const f = l.byteOffset || 0, g = l.byteLength || 0, p = l.count, m = l.byteStride, v = new Uint8Array(d, f, g);
        return a.decodeGltfBufferAsync ? a.decodeGltfBufferAsync(p, m, v, l.mode, l.filter).then(function(x) {
          return x.buffer;
        }) : a.ready.then(function() {
          const x = new ArrayBuffer(p * m);
          return a.decodeGltfBuffer(
            new Uint8Array(x),
            p,
            m,
            v,
            l.mode,
            l.filter
          ), x;
        });
      });
    } else
      return null;
  }
}
class ag {
  constructor(n) {
    this.name = we.EXT_MESH_GPU_INSTANCING, this.parser = n;
  }
  createNodeMesh(n) {
    const r = this.parser.json, i = r.nodes[n];
    if (!i.extensions || !i.extensions[this.name] || i.mesh === void 0)
      return null;
    const l = r.meshes[i.mesh];
    for (const g of l.primitives)
      if (g.mode !== Bt.TRIANGLES && g.mode !== Bt.TRIANGLE_STRIP && g.mode !== Bt.TRIANGLE_FAN && g.mode !== void 0)
        return null;
    const a = i.extensions[this.name].attributes, d = [], f = {};
    for (const g in a)
      d.push(
        this.parser.getDependency("accessor", a[g]).then((p) => (f[g] = p, f[g]))
      );
    return d.length < 1 ? null : (d.push(this.parser.createNodeMesh(n)), Promise.all(d).then((g) => {
      const p = g.pop(), m = p.isGroup ? p.children : [p], v = g[0].count, x = [];
      for (const _ of m) {
        const P = new $e(), T = new V(), w = new go(), S = new V(1, 1, 1), E = new nh(_.geometry, _.material, v);
        for (let A = 0; A < v; A++)
          f.TRANSLATION && T.fromBufferAttribute(f.TRANSLATION, A), f.ROTATION && w.fromBufferAttribute(f.ROTATION, A), f.SCALE && S.fromBufferAttribute(f.SCALE, A), E.setMatrixAt(A, P.compose(T, w, S));
        for (const A in f)
          A !== "TRANSLATION" && A !== "ROTATION" && A !== "SCALE" && _.geometry.setAttribute(A, f[A]);
        ka.prototype.copy.call(E, _), this.parser.assignFinalMaterial(E), x.push(E);
      }
      return p.isGroup ? (p.clear(), p.add(...x), p) : x[0];
    }));
  }
}
const gd = "glTF", Mi = 12, rf = { JSON: 1313821514, BIN: 5130562 };
class ug {
  constructor(n) {
    this.name = we.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const r = new DataView(n, 0, Mi);
    if (this.header = {
      magic: ar.decodeText(new Uint8Array(n.slice(0, 4))),
      version: r.getUint32(4, !0),
      length: r.getUint32(8, !0)
    }, this.header.magic !== gd)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const i = this.header.length - Mi, l = new DataView(n, Mi);
    let u = 0;
    for (; u < i; ) {
      const a = l.getUint32(u, !0);
      u += 4;
      const d = l.getUint32(u, !0);
      if (u += 4, d === rf.JSON) {
        const f = new Uint8Array(n, Mi + u, a);
        this.content = ar.decodeText(f);
      } else if (d === rf.BIN) {
        const f = Mi + u;
        this.body = n.slice(f, f + a);
      }
      u += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class cg {
  constructor(n, r) {
    if (!r)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = we.KHR_DRACO_MESH_COMPRESSION, this.json = n, this.dracoLoader = r, this.dracoLoader.preload();
  }
  decodePrimitive(n, r) {
    const i = this.json, l = this.dracoLoader, u = n.extensions[this.name].bufferView, a = n.extensions[this.name].attributes, d = {}, f = {}, g = {};
    for (const p in a) {
      const m = _a[p] || p.toLowerCase();
      d[m] = a[p];
    }
    for (const p in n.attributes) {
      const m = _a[p] || p.toLowerCase();
      if (a[p] !== void 0) {
        const v = i.accessors[n.attributes[p]], x = Qr[v.componentType];
        g[m] = x.name, f[m] = v.normalized === !0;
      }
    }
    return r.getDependency("bufferView", u).then(function(p) {
      return new Promise(function(m) {
        l.decodeDracoFile(
          p,
          function(v) {
            for (const x in v.attributes) {
              const _ = v.attributes[x], P = f[x];
              P !== void 0 && (_.normalized = P);
            }
            m(v);
          },
          d,
          g
        );
      });
    });
  }
}
class fg {
  constructor() {
    this.name = we.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(n, r) {
    return (r.texCoord === void 0 || r.texCoord === n.channel) && r.offset === void 0 && r.rotation === void 0 && r.scale === void 0 || (n = n.clone(), r.texCoord !== void 0 && (n.channel = r.texCoord), r.offset !== void 0 && n.offset.fromArray(r.offset), r.rotation !== void 0 && (n.rotation = r.rotation), r.scale !== void 0 && n.repeat.fromArray(r.scale), n.needsUpdate = !0), n;
  }
}
class dg {
  constructor() {
    this.name = we.KHR_MESH_QUANTIZATION;
  }
}
class vd extends Ph {
  constructor(n, r, i, l) {
    super(n, r, i, l);
  }
  copySampleValue_(n) {
    const r = this.resultBuffer, i = this.sampleValues, l = this.valueSize, u = n * l * 3 + l;
    for (let a = 0; a !== l; a++)
      r[a] = i[u + a];
    return r;
  }
  interpolate_(n, r, i, l) {
    const u = this.resultBuffer, a = this.sampleValues, d = this.valueSize, f = d * 2, g = d * 3, p = l - r, m = (i - r) / p, v = m * m, x = v * m, _ = n * g, P = _ - g, T = -2 * x + 3 * v, w = x - v, S = 1 - T, E = w - v + m;
    for (let A = 0; A !== d; A++) {
      const M = a[P + A + d], L = a[P + A + f] * p, R = a[_ + A + d], z = a[_ + A] * p;
      u[A] = S * M + E * L + T * R + w * z;
    }
    return u;
  }
}
const pg = new go();
class hg extends vd {
  interpolate_(n, r, i, l) {
    const u = super.interpolate_(n, r, i, l);
    return pg.fromArray(u).normalize().toArray(u), u;
  }
}
const Bt = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, Qr = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, sf = {
  9728: vh,
  9729: vo,
  9984: yh,
  9985: xh,
  9986: wh,
  9987: Vf
}, of = {
  33071: Sh,
  33648: _h,
  10497: ha
}, Kl = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, _a = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  // uv => uv1, 4 uv channels
  // https://github.com/mrdoob/three.js/pull/25943
  // https://github.com/mrdoob/three.js/pull/25788
  ...Um >= 152 ? {
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv1",
    TEXCOORD_2: "uv2",
    TEXCOORD_3: "uv3"
  } : {
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv2"
  },
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, Bn = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, mg = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Xf,
  STEP: Eh
}, Yl = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function gg(o) {
  return o.DefaultMaterial === void 0 && (o.DefaultMaterial = new Fa({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: qr
  })), o.DefaultMaterial;
}
function ir(o, n, r) {
  for (const i in r.extensions)
    o[i] === void 0 && (n.userData.gltfExtensions = n.userData.gltfExtensions || {}, n.userData.gltfExtensions[i] = r.extensions[i]);
}
function Un(o, n) {
  n.extras !== void 0 && (typeof n.extras == "object" ? Object.assign(o.userData, n.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + n.extras));
}
function vg(o, n, r) {
  let i = !1, l = !1, u = !1;
  for (let g = 0, p = n.length; g < p; g++) {
    const m = n[g];
    if (m.POSITION !== void 0 && (i = !0), m.NORMAL !== void 0 && (l = !0), m.COLOR_0 !== void 0 && (u = !0), i && l && u)
      break;
  }
  if (!i && !l && !u)
    return Promise.resolve(o);
  const a = [], d = [], f = [];
  for (let g = 0, p = n.length; g < p; g++) {
    const m = n[g];
    if (i) {
      const v = m.POSITION !== void 0 ? r.getDependency("accessor", m.POSITION) : o.attributes.position;
      a.push(v);
    }
    if (l) {
      const v = m.NORMAL !== void 0 ? r.getDependency("accessor", m.NORMAL) : o.attributes.normal;
      d.push(v);
    }
    if (u) {
      const v = m.COLOR_0 !== void 0 ? r.getDependency("accessor", m.COLOR_0) : o.attributes.color;
      f.push(v);
    }
  }
  return Promise.all([
    Promise.all(a),
    Promise.all(d),
    Promise.all(f)
  ]).then(function(g) {
    const p = g[0], m = g[1], v = g[2];
    return i && (o.morphAttributes.position = p), l && (o.morphAttributes.normal = m), u && (o.morphAttributes.color = v), o.morphTargetsRelative = !0, o;
  });
}
function yg(o, n) {
  if (o.updateMorphTargets(), n.weights !== void 0)
    for (let r = 0, i = n.weights.length; r < i; r++)
      o.morphTargetInfluences[r] = n.weights[r];
  if (n.extras && Array.isArray(n.extras.targetNames)) {
    const r = n.extras.targetNames;
    if (o.morphTargetInfluences.length === r.length) {
      o.morphTargetDictionary = {};
      for (let i = 0, l = r.length; i < l; i++)
        o.morphTargetDictionary[r[i]] = i;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function xg(o) {
  let n;
  const r = o.extensions && o.extensions[we.KHR_DRACO_MESH_COMPRESSION];
  if (r ? n = "draco:" + r.bufferView + ":" + r.indices + ":" + Ql(r.attributes) : n = o.indices + ":" + Ql(o.attributes) + ":" + o.mode, o.targets !== void 0)
    for (let i = 0, l = o.targets.length; i < l; i++)
      n += ":" + Ql(o.targets[i]);
  return n;
}
function Ql(o) {
  let n = "";
  const r = Object.keys(o).sort();
  for (let i = 0, l = r.length; i < l; i++)
    n += r[i] + ":" + o[r[i]] + ";";
  return n;
}
function Ea(o) {
  switch (o) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function wg(o) {
  return o.search(/\.jpe?g($|\?)/i) > 0 || o.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : o.search(/\.webp($|\?)/i) > 0 || o.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const Sg = new $e();
class _g {
  constructor(n = {}, r = {}) {
    this.json = n, this.extensions = {}, this.plugins = {}, this.options = r, this.cache = new Xm(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let i = !1, l = !1, u = -1;
    typeof navigator < "u" && typeof navigator.userAgent < "u" && (i = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, l = navigator.userAgent.indexOf("Firefox") > -1, u = l ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || i || l && u < 98 ? this.textureLoader = new rh(this.options.manager) : this.textureLoader = new ih(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Hf(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(n) {
    this.extensions = n;
  }
  setPlugins(n) {
    this.plugins = n;
  }
  parse(n, r) {
    const i = this, l = this.json, u = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(a) {
      return a._markDefs && a._markDefs();
    }), Promise.all(
      this._invokeAll(function(a) {
        return a.beforeRoot && a.beforeRoot();
      })
    ).then(function() {
      return Promise.all([
        i.getDependencies("scene"),
        i.getDependencies("animation"),
        i.getDependencies("camera")
      ]);
    }).then(function(a) {
      const d = {
        scene: a[0][l.scene || 0],
        scenes: a[0],
        animations: a[1],
        cameras: a[2],
        asset: l.asset,
        parser: i,
        userData: {}
      };
      ir(u, d, l), Un(d, l), Promise.all(
        i._invokeAll(function(f) {
          return f.afterRoot && f.afterRoot(d);
        })
      ).then(function() {
        n(d);
      });
    }).catch(r);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const n = this.json.nodes || [], r = this.json.skins || [], i = this.json.meshes || [];
    for (let l = 0, u = r.length; l < u; l++) {
      const a = r[l].joints;
      for (let d = 0, f = a.length; d < f; d++)
        n[a[d]].isBone = !0;
    }
    for (let l = 0, u = n.length; l < u; l++) {
      const a = n[l];
      a.mesh !== void 0 && (this._addNodeRef(this.meshCache, a.mesh), a.skin !== void 0 && (i[a.mesh].isSkinnedMesh = !0)), a.camera !== void 0 && this._addNodeRef(this.cameraCache, a.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(n, r) {
    r !== void 0 && (n.refs[r] === void 0 && (n.refs[r] = n.uses[r] = 0), n.refs[r]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(n, r, i) {
    if (n.refs[r] <= 1)
      return i;
    const l = i.clone(), u = (a, d) => {
      const f = this.associations.get(a);
      f != null && this.associations.set(d, f);
      for (const [g, p] of a.children.entries())
        u(p, d.children[g]);
    };
    return u(i, l), l.name += "_instance_" + n.uses[r]++, l;
  }
  _invokeOne(n) {
    const r = Object.values(this.plugins);
    r.push(this);
    for (let i = 0; i < r.length; i++) {
      const l = n(r[i]);
      if (l)
        return l;
    }
    return null;
  }
  _invokeAll(n) {
    const r = Object.values(this.plugins);
    r.unshift(this);
    const i = [];
    for (let l = 0; l < r.length; l++) {
      const u = n(r[l]);
      u && i.push(u);
    }
    return i;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(n, r) {
    const i = n + ":" + r;
    let l = this.cache.get(i);
    if (!l) {
      switch (n) {
        case "scene":
          l = this.loadScene(r);
          break;
        case "node":
          l = this._invokeOne(function(u) {
            return u.loadNode && u.loadNode(r);
          });
          break;
        case "mesh":
          l = this._invokeOne(function(u) {
            return u.loadMesh && u.loadMesh(r);
          });
          break;
        case "accessor":
          l = this.loadAccessor(r);
          break;
        case "bufferView":
          l = this._invokeOne(function(u) {
            return u.loadBufferView && u.loadBufferView(r);
          });
          break;
        case "buffer":
          l = this.loadBuffer(r);
          break;
        case "material":
          l = this._invokeOne(function(u) {
            return u.loadMaterial && u.loadMaterial(r);
          });
          break;
        case "texture":
          l = this._invokeOne(function(u) {
            return u.loadTexture && u.loadTexture(r);
          });
          break;
        case "skin":
          l = this.loadSkin(r);
          break;
        case "animation":
          l = this._invokeOne(function(u) {
            return u.loadAnimation && u.loadAnimation(r);
          });
          break;
        case "camera":
          l = this.loadCamera(r);
          break;
        default:
          if (l = this._invokeOne(function(u) {
            return u != this && u.getDependency && u.getDependency(n, r);
          }), !l)
            throw new Error("Unknown type: " + n);
          break;
      }
      this.cache.add(i, l);
    }
    return l;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(n) {
    let r = this.cache.get(n);
    if (!r) {
      const i = this, l = this.json[n + (n === "mesh" ? "es" : "s")] || [];
      r = Promise.all(
        l.map(function(u, a) {
          return i.getDependency(n, a);
        })
      ), this.cache.add(n, r);
    }
    return r;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(n) {
    const r = this.json.buffers[n], i = this.fileLoader;
    if (r.type && r.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + r.type + " buffer type is not supported.");
    if (r.uri === void 0 && n === 0)
      return Promise.resolve(this.extensions[we.KHR_BINARY_GLTF].body);
    const l = this.options;
    return new Promise(function(u, a) {
      i.load(ar.resolveURL(r.uri, l.path), u, void 0, function() {
        a(new Error('THREE.GLTFLoader: Failed to load buffer "' + r.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(n) {
    const r = this.json.bufferViews[n];
    return this.getDependency("buffer", r.buffer).then(function(i) {
      const l = r.byteLength || 0, u = r.byteOffset || 0;
      return i.slice(u, u + l);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(n) {
    const r = this, i = this.json, l = this.json.accessors[n];
    if (l.bufferView === void 0 && l.sparse === void 0) {
      const a = Kl[l.type], d = Qr[l.componentType], f = l.normalized === !0, g = new d(l.count * a);
      return Promise.resolve(new ki(g, a, f));
    }
    const u = [];
    return l.bufferView !== void 0 ? u.push(this.getDependency("bufferView", l.bufferView)) : u.push(null), l.sparse !== void 0 && (u.push(this.getDependency("bufferView", l.sparse.indices.bufferView)), u.push(this.getDependency("bufferView", l.sparse.values.bufferView))), Promise.all(u).then(function(a) {
      const d = a[0], f = Kl[l.type], g = Qr[l.componentType], p = g.BYTES_PER_ELEMENT, m = p * f, v = l.byteOffset || 0, x = l.bufferView !== void 0 ? i.bufferViews[l.bufferView].byteStride : void 0, _ = l.normalized === !0;
      let P, T;
      if (x && x !== m) {
        const w = Math.floor(v / x), S = "InterleavedBuffer:" + l.bufferView + ":" + l.componentType + ":" + w + ":" + l.count;
        let E = r.cache.get(S);
        E || (P = new g(d, w * x, l.count * x / p), E = new sh(P, x / p), r.cache.add(S, E)), T = new or(
          E,
          f,
          v % x / p,
          _
        );
      } else
        d === null ? P = new g(l.count * f) : P = new g(d, v, l.count * f), T = new ki(P, f, _);
      if (l.sparse !== void 0) {
        const w = Kl.SCALAR, S = Qr[l.sparse.indices.componentType], E = l.sparse.indices.byteOffset || 0, A = l.sparse.values.byteOffset || 0, M = new S(
          a[1],
          E,
          l.sparse.count * w
        ), L = new g(a[2], A, l.sparse.count * f);
        d !== null && (T = new ki(
          T.array.slice(),
          T.itemSize,
          T.normalized
        ));
        for (let R = 0, z = M.length; R < z; R++) {
          const b = M[R];
          if (T.setX(b, L[R * f]), f >= 2 && T.setY(b, L[R * f + 1]), f >= 3 && T.setZ(b, L[R * f + 2]), f >= 4 && T.setW(b, L[R * f + 3]), f >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return T;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(n) {
    const r = this.json, i = this.options, u = r.textures[n].source, a = r.images[u];
    let d = this.textureLoader;
    if (a.uri) {
      const f = i.manager.getHandler(a.uri);
      f !== null && (d = f);
    }
    return this.loadTextureImage(n, u, d);
  }
  loadTextureImage(n, r, i) {
    const l = this, u = this.json, a = u.textures[n], d = u.images[r], f = (d.uri || d.bufferView) + ":" + a.sampler;
    if (this.textureCache[f])
      return this.textureCache[f];
    const g = this.loadImageSource(r, i).then(function(p) {
      p.flipY = !1, p.name = a.name || d.name || "", p.name === "" && typeof d.uri == "string" && d.uri.startsWith("data:image/") === !1 && (p.name = d.uri);
      const v = (u.samplers || {})[a.sampler] || {};
      return p.magFilter = sf[v.magFilter] || vo, p.minFilter = sf[v.minFilter] || Vf, p.wrapS = of[v.wrapS] || ha, p.wrapT = of[v.wrapT] || ha, l.associations.set(p, { textures: n }), p;
    }).catch(function() {
      return null;
    });
    return this.textureCache[f] = g, g;
  }
  loadImageSource(n, r) {
    const i = this, l = this.json, u = this.options;
    if (this.sourceCache[n] !== void 0)
      return this.sourceCache[n].then((m) => m.clone());
    const a = l.images[n], d = self.URL || self.webkitURL;
    let f = a.uri || "", g = !1;
    if (a.bufferView !== void 0)
      f = i.getDependency("bufferView", a.bufferView).then(function(m) {
        g = !0;
        const v = new Blob([m], { type: a.mimeType });
        return f = d.createObjectURL(v), f;
      });
    else if (a.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + n + " is missing URI and bufferView");
    const p = Promise.resolve(f).then(function(m) {
      return new Promise(function(v, x) {
        let _ = v;
        r.isImageBitmapLoader === !0 && (_ = function(P) {
          const T = new da(P);
          T.needsUpdate = !0, v(T);
        }), r.load(ar.resolveURL(m, u.path), _, void 0, x);
      });
    }).then(function(m) {
      return g === !0 && d.revokeObjectURL(f), m.userData.mimeType = a.mimeType || wg(a.uri), m;
    }).catch(function(m) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", f), m;
    });
    return this.sourceCache[n] = p, p;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(n, r, i, l) {
    const u = this;
    return this.getDependency("texture", i.index).then(function(a) {
      if (!a)
        return null;
      if (i.texCoord !== void 0 && i.texCoord > 0 && (a = a.clone(), a.channel = i.texCoord), u.extensions[we.KHR_TEXTURE_TRANSFORM]) {
        const d = i.extensions !== void 0 ? i.extensions[we.KHR_TEXTURE_TRANSFORM] : void 0;
        if (d) {
          const f = u.associations.get(a);
          a = u.extensions[we.KHR_TEXTURE_TRANSFORM].extendTexture(a, d), u.associations.set(a, f);
        }
      }
      return l !== void 0 && ("colorSpace" in a ? a.colorSpace = l === 3001 ? "srgb" : "srgb-linear" : a.encoding = l), n[r] = a, a;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(n) {
    const r = n.geometry;
    let i = n.material;
    const l = r.attributes.tangent === void 0, u = r.attributes.color !== void 0, a = r.attributes.normal === void 0;
    if (n.isPoints) {
      const d = "PointsMaterial:" + i.uuid;
      let f = this.cache.get(d);
      f || (f = new oh(), po.prototype.copy.call(f, i), f.color.copy(i.color), f.map = i.map, f.sizeAttenuation = !1, this.cache.add(d, f)), i = f;
    } else if (n.isLine) {
      const d = "LineBasicMaterial:" + i.uuid;
      let f = this.cache.get(d);
      f || (f = new lh(), po.prototype.copy.call(f, i), f.color.copy(i.color), f.map = i.map, this.cache.add(d, f)), i = f;
    }
    if (l || u || a) {
      let d = "ClonedMaterial:" + i.uuid + ":";
      l && (d += "derivative-tangents:"), u && (d += "vertex-colors:"), a && (d += "flat-shading:");
      let f = this.cache.get(d);
      f || (f = i.clone(), u && (f.vertexColors = !0), a && (f.flatShading = !0), l && (f.normalScale && (f.normalScale.y *= -1), f.clearcoatNormalScale && (f.clearcoatNormalScale.y *= -1)), this.cache.add(d, f), this.associations.set(f, this.associations.get(i))), i = f;
    }
    n.material = i;
  }
  getMaterialType() {
    return Fa;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(n) {
    const r = this, i = this.json, l = this.extensions, u = i.materials[n];
    let a;
    const d = {}, f = u.extensions || {}, g = [];
    if (f[we.KHR_MATERIALS_UNLIT]) {
      const m = l[we.KHR_MATERIALS_UNLIT];
      a = m.getMaterialType(), g.push(m.extendParams(d, u, r));
    } else {
      const m = u.pbrMetallicRoughness || {};
      if (d.color = new _n(1, 1, 1), d.opacity = 1, Array.isArray(m.baseColorFactor)) {
        const v = m.baseColorFactor;
        d.color.fromArray(v), d.opacity = v[3];
      }
      m.baseColorTexture !== void 0 && g.push(r.assignTexture(d, "map", m.baseColorTexture, 3001)), d.metalness = m.metallicFactor !== void 0 ? m.metallicFactor : 1, d.roughness = m.roughnessFactor !== void 0 ? m.roughnessFactor : 1, m.metallicRoughnessTexture !== void 0 && (g.push(r.assignTexture(d, "metalnessMap", m.metallicRoughnessTexture)), g.push(r.assignTexture(d, "roughnessMap", m.metallicRoughnessTexture))), a = this._invokeOne(function(v) {
        return v.getMaterialType && v.getMaterialType(n);
      }), g.push(
        Promise.all(
          this._invokeAll(function(v) {
            return v.extendMaterialParams && v.extendMaterialParams(n, d);
          })
        )
      );
    }
    u.doubleSided === !0 && (d.side = Gf);
    const p = u.alphaMode || Yl.OPAQUE;
    if (p === Yl.BLEND ? (d.transparent = !0, d.depthWrite = !1) : (d.transparent = !1, p === Yl.MASK && (d.alphaTest = u.alphaCutoff !== void 0 ? u.alphaCutoff : 0.5)), u.normalTexture !== void 0 && a !== sr && (g.push(r.assignTexture(d, "normalMap", u.normalTexture)), d.normalScale = new ye(1, 1), u.normalTexture.scale !== void 0)) {
      const m = u.normalTexture.scale;
      d.normalScale.set(m, m);
    }
    return u.occlusionTexture !== void 0 && a !== sr && (g.push(r.assignTexture(d, "aoMap", u.occlusionTexture)), u.occlusionTexture.strength !== void 0 && (d.aoMapIntensity = u.occlusionTexture.strength)), u.emissiveFactor !== void 0 && a !== sr && (d.emissive = new _n().fromArray(u.emissiveFactor)), u.emissiveTexture !== void 0 && a !== sr && g.push(r.assignTexture(d, "emissiveMap", u.emissiveTexture, 3001)), Promise.all(g).then(function() {
      const m = new a(d);
      return u.name && (m.name = u.name), Un(m, u), r.associations.set(m, { materials: n }), u.extensions && ir(l, m, u), m;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(n) {
    const r = ah.sanitizeNodeName(n || "");
    return r in this.nodeNamesUsed ? r + "_" + ++this.nodeNamesUsed[r] : (this.nodeNamesUsed[r] = 0, r);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(n) {
    const r = this, i = this.extensions, l = this.primitiveCache;
    function u(d) {
      return i[we.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(d, r).then(function(f) {
        return lf(f, d, r);
      });
    }
    const a = [];
    for (let d = 0, f = n.length; d < f; d++) {
      const g = n[d], p = xg(g), m = l[p];
      if (m)
        a.push(m.promise);
      else {
        let v;
        g.extensions && g.extensions[we.KHR_DRACO_MESH_COMPRESSION] ? v = u(g) : v = lf(new Da(), g, r), l[p] = { primitive: g, promise: v }, a.push(v);
      }
    }
    return Promise.all(a);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(n) {
    const r = this, i = this.json, l = this.extensions, u = i.meshes[n], a = u.primitives, d = [];
    for (let f = 0, g = a.length; f < g; f++) {
      const p = a[f].material === void 0 ? gg(this.cache) : this.getDependency("material", a[f].material);
      d.push(p);
    }
    return d.push(r.loadGeometries(a)), Promise.all(d).then(function(f) {
      const g = f.slice(0, f.length - 1), p = f[f.length - 1], m = [];
      for (let x = 0, _ = p.length; x < _; x++) {
        const P = p[x], T = a[x];
        let w;
        const S = g[x];
        if (T.mode === Bt.TRIANGLES || T.mode === Bt.TRIANGLE_STRIP || T.mode === Bt.TRIANGLE_FAN || T.mode === void 0)
          w = u.isSkinnedMesh === !0 ? new uh(P, S) : new Wn(P, S), w.isSkinnedMesh === !0 && w.normalizeSkinWeights(), T.mode === Bt.TRIANGLE_STRIP ? w.geometry = ef(w.geometry, Bf) : T.mode === Bt.TRIANGLE_FAN && (w.geometry = ef(w.geometry, pa));
        else if (T.mode === Bt.LINES)
          w = new ch(P, S);
        else if (T.mode === Bt.LINE_STRIP)
          w = new fh(P, S);
        else if (T.mode === Bt.LINE_LOOP)
          w = new dh(P, S);
        else if (T.mode === Bt.POINTS)
          w = new ph(P, S);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + T.mode);
        Object.keys(w.geometry.morphAttributes).length > 0 && yg(w, u), w.name = r.createUniqueName(u.name || "mesh_" + n), Un(w, u), T.extensions && ir(l, w, T), r.assignFinalMaterial(w), m.push(w);
      }
      for (let x = 0, _ = m.length; x < _; x++)
        r.associations.set(m[x], {
          meshes: n,
          primitives: x
        });
      if (m.length === 1)
        return u.extensions && ir(l, m[0], u), m[0];
      const v = new lr();
      u.extensions && ir(l, v, u), r.associations.set(v, { meshes: n });
      for (let x = 0, _ = m.length; x < _; x++)
        v.add(m[x]);
      return v;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(n) {
    let r;
    const i = this.json.cameras[n], l = i[i.type];
    if (!l) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return i.type === "perspective" ? r = new Xr(
      Wf.radToDeg(l.yfov),
      l.aspectRatio || 1,
      l.znear || 1,
      l.zfar || 2e6
    ) : i.type === "orthographic" && (r = new Wr(-l.xmag, l.xmag, l.ymag, -l.ymag, l.znear, l.zfar)), i.name && (r.name = this.createUniqueName(i.name)), Un(r, i), Promise.resolve(r);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(n) {
    const r = this.json.skins[n], i = [];
    for (let l = 0, u = r.joints.length; l < u; l++)
      i.push(this._loadNodeShallow(r.joints[l]));
    return r.inverseBindMatrices !== void 0 ? i.push(this.getDependency("accessor", r.inverseBindMatrices)) : i.push(null), Promise.all(i).then(function(l) {
      const u = l.pop(), a = l, d = [], f = [];
      for (let g = 0, p = a.length; g < p; g++) {
        const m = a[g];
        if (m) {
          d.push(m);
          const v = new $e();
          u !== null && v.fromArray(u.array, g * 16), f.push(v);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', r.joints[g]);
      }
      return new hh(d, f);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(n) {
    const i = this.json.animations[n], l = i.name ? i.name : "animation_" + n, u = [], a = [], d = [], f = [], g = [];
    for (let p = 0, m = i.channels.length; p < m; p++) {
      const v = i.channels[p], x = i.samplers[v.sampler], _ = v.target, P = _.node, T = i.parameters !== void 0 ? i.parameters[x.input] : x.input, w = i.parameters !== void 0 ? i.parameters[x.output] : x.output;
      _.node !== void 0 && (u.push(this.getDependency("node", P)), a.push(this.getDependency("accessor", T)), d.push(this.getDependency("accessor", w)), f.push(x), g.push(_));
    }
    return Promise.all([
      Promise.all(u),
      Promise.all(a),
      Promise.all(d),
      Promise.all(f),
      Promise.all(g)
    ]).then(function(p) {
      const m = p[0], v = p[1], x = p[2], _ = p[3], P = p[4], T = [];
      for (let w = 0, S = m.length; w < S; w++) {
        const E = m[w], A = v[w], M = x[w], L = _[w], R = P[w];
        if (E === void 0)
          continue;
        E.updateMatrix();
        let z;
        switch (Bn[R.path]) {
          case Bn.weights:
            z = Ah;
            break;
          case Bn.rotation:
            z = Oc;
            break;
          case Bn.position:
          case Bn.scale:
          default:
            z = Th;
            break;
        }
        const b = E.name ? E.name : E.uuid, I = L.interpolation !== void 0 ? mg[L.interpolation] : Xf, k = [];
        Bn[R.path] === Bn.weights ? E.traverse(function(G) {
          G.morphTargetInfluences && k.push(G.name ? G.name : G.uuid);
        }) : k.push(b);
        let j = M.array;
        if (M.normalized) {
          const G = Ea(j.constructor), Y = new Float32Array(j.length);
          for (let ee = 0, ae = j.length; ee < ae; ee++)
            Y[ee] = j[ee] * G;
          j = Y;
        }
        for (let G = 0, Y = k.length; G < Y; G++) {
          const ee = new z(
            k[G] + "." + Bn[R.path],
            A.array,
            j,
            I
          );
          L.interpolation === "CUBICSPLINE" && (ee.createInterpolant = function(Se) {
            const W = this instanceof Oc ? hg : vd;
            return new W(this.times, this.values, this.getValueSize() / 3, Se);
          }, ee.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0), T.push(ee);
        }
      }
      return new mh(l, void 0, T);
    });
  }
  createNodeMesh(n) {
    const r = this.json, i = this, l = r.nodes[n];
    return l.mesh === void 0 ? null : i.getDependency("mesh", l.mesh).then(function(u) {
      const a = i._getNodeRef(i.meshCache, l.mesh, u);
      return l.weights !== void 0 && a.traverse(function(d) {
        if (d.isMesh)
          for (let f = 0, g = l.weights.length; f < g; f++)
            d.morphTargetInfluences[f] = l.weights[f];
      }), a;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(n) {
    const r = this.json, i = this, l = r.nodes[n], u = i._loadNodeShallow(n), a = [], d = l.children || [];
    for (let g = 0, p = d.length; g < p; g++)
      a.push(i.getDependency("node", d[g]));
    const f = l.skin === void 0 ? Promise.resolve(null) : i.getDependency("skin", l.skin);
    return Promise.all([u, Promise.all(a), f]).then(function(g) {
      const p = g[0], m = g[1], v = g[2];
      v !== null && p.traverse(function(x) {
        x.isSkinnedMesh && x.bind(v, Sg);
      });
      for (let x = 0, _ = m.length; x < _; x++)
        p.add(m[x]);
      return p;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(n) {
    const r = this.json, i = this.extensions, l = this;
    if (this.nodeCache[n] !== void 0)
      return this.nodeCache[n];
    const u = r.nodes[n], a = u.name ? l.createUniqueName(u.name) : "", d = [], f = l._invokeOne(function(g) {
      return g.createNodeMesh && g.createNodeMesh(n);
    });
    return f && d.push(f), u.camera !== void 0 && d.push(
      l.getDependency("camera", u.camera).then(function(g) {
        return l._getNodeRef(l.cameraCache, u.camera, g);
      })
    ), l._invokeAll(function(g) {
      return g.createNodeAttachment && g.createNodeAttachment(n);
    }).forEach(function(g) {
      d.push(g);
    }), this.nodeCache[n] = Promise.all(d).then(function(g) {
      let p;
      if (u.isBone === !0 ? p = new gh() : g.length > 1 ? p = new lr() : g.length === 1 ? p = g[0] : p = new ka(), p !== g[0])
        for (let m = 0, v = g.length; m < v; m++)
          p.add(g[m]);
      if (u.name && (p.userData.name = u.name, p.name = a), Un(p, u), u.extensions && ir(i, p, u), u.matrix !== void 0) {
        const m = new $e();
        m.fromArray(u.matrix), p.applyMatrix4(m);
      } else
        u.translation !== void 0 && p.position.fromArray(u.translation), u.rotation !== void 0 && p.quaternion.fromArray(u.rotation), u.scale !== void 0 && p.scale.fromArray(u.scale);
      return l.associations.has(p) || l.associations.set(p, {}), l.associations.get(p).nodes = n, p;
    }), this.nodeCache[n];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(n) {
    const r = this.extensions, i = this.json.scenes[n], l = this, u = new lr();
    i.name && (u.name = l.createUniqueName(i.name)), Un(u, i), i.extensions && ir(r, u, i);
    const a = i.nodes || [], d = [];
    for (let f = 0, g = a.length; f < g; f++)
      d.push(l.getDependency("node", a[f]));
    return Promise.all(d).then(function(f) {
      for (let p = 0, m = f.length; p < m; p++)
        u.add(f[p]);
      const g = (p) => {
        const m = /* @__PURE__ */ new Map();
        for (const [v, x] of l.associations)
          (v instanceof po || v instanceof da) && m.set(v, x);
        return p.traverse((v) => {
          const x = l.associations.get(v);
          x != null && m.set(v, x);
        }), m;
      };
      return l.associations = g(u), u;
    });
  }
}
function Eg(o, n, r) {
  const i = n.attributes, l = new Ye();
  if (i.POSITION !== void 0) {
    const d = r.json.accessors[i.POSITION], f = d.min, g = d.max;
    if (f !== void 0 && g !== void 0) {
      if (l.set(new V(f[0], f[1], f[2]), new V(g[0], g[1], g[2])), d.normalized) {
        const p = Ea(Qr[d.componentType]);
        l.min.multiplyScalar(p), l.max.multiplyScalar(p);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const u = n.targets;
  if (u !== void 0) {
    const d = new V(), f = new V();
    for (let g = 0, p = u.length; g < p; g++) {
      const m = u[g];
      if (m.POSITION !== void 0) {
        const v = r.json.accessors[m.POSITION], x = v.min, _ = v.max;
        if (x !== void 0 && _ !== void 0) {
          if (f.setX(Math.max(Math.abs(x[0]), Math.abs(_[0]))), f.setY(Math.max(Math.abs(x[1]), Math.abs(_[1]))), f.setZ(Math.max(Math.abs(x[2]), Math.abs(_[2]))), v.normalized) {
            const P = Ea(Qr[v.componentType]);
            f.multiplyScalar(P);
          }
          d.max(f);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    l.expandByVector(d);
  }
  o.boundingBox = l;
  const a = new Jr();
  l.getCenter(a.center), a.radius = l.min.distanceTo(l.max) / 2, o.boundingSphere = a;
}
function lf(o, n, r) {
  const i = n.attributes, l = [];
  function u(a, d) {
    return r.getDependency("accessor", a).then(function(f) {
      o.setAttribute(d, f);
    });
  }
  for (const a in i) {
    const d = _a[a] || a.toLowerCase();
    d in o.attributes || l.push(u(i[a], d));
  }
  if (n.indices !== void 0 && !o.index) {
    const a = r.getDependency("accessor", n.indices).then(function(d) {
      o.setIndex(d);
    });
    l.push(a);
  }
  return Un(o, n), Eg(o, n, r), Promise.all(l).then(function() {
    return n.targets !== void 0 ? vg(o, n.targets, r) : o;
  });
}
var Tg = Object.defineProperty, Ag = (o, n, r) => n in o ? Tg(o, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[n] = r, be = (o, n, r) => (Ag(o, typeof n != "symbol" ? n + "" : n, r), r);
const je = {
  Handedness: {
    NONE: "none",
    LEFT: "left",
    RIGHT: "right"
  },
  ComponentState: {
    DEFAULT: "default",
    TOUCHED: "touched",
    PRESSED: "pressed"
  },
  ComponentProperty: {
    BUTTON: "button",
    X_AXIS: "xAxis",
    Y_AXIS: "yAxis",
    STATE: "state"
  },
  ComponentType: {
    TRIGGER: "trigger",
    SQUEEZE: "squeeze",
    TOUCHPAD: "touchpad",
    THUMBSTICK: "thumbstick",
    BUTTON: "button"
  },
  ButtonTouchThreshold: 0.05,
  AxisTouchThreshold: 0.1,
  VisualResponseProperty: {
    TRANSFORM: "transform",
    VISIBILITY: "visibility"
  }
};
async function yd(o) {
  const n = await fetch(o);
  if (n.ok)
    return n.json();
  throw new Error(n.statusText);
}
async function Pg(o) {
  if (!o)
    throw new Error("No basePath supplied");
  return await yd(`${o}/profilesList.json`);
}
async function Cg(o, n, r = null, i = !0) {
  if (!o)
    throw new Error("No xrInputSource supplied");
  if (!n)
    throw new Error("No basePath supplied");
  const l = await Pg(n);
  let u;
  if (o.profiles.some((f) => {
    const g = l[f];
    return g && (u = {
      profileId: f,
      profilePath: `${n}/${g.path}`,
      deprecated: !!g.deprecated
    }), !!u;
  }), !u) {
    if (!r)
      throw new Error("No matching profile name found");
    const f = l[r];
    if (!f)
      throw new Error(`No matching profile name found and default profile "${r}" missing.`);
    u = {
      profileId: r,
      profilePath: `${n}/${f.path}`,
      deprecated: !!f.deprecated
    };
  }
  const a = await yd(u.profilePath);
  let d;
  if (i) {
    let f;
    if (o.handedness === "any" ? f = a.layouts[Object.keys(a.layouts)[0]] : f = a.layouts[o.handedness], !f)
      throw new Error(`No matching handedness, ${o.handedness}, in profile ${u.profileId}`);
    f.assetPath && (d = u.profilePath.replace("profile.json", f.assetPath));
  }
  return { profile: a, assetPath: d };
}
const Mg = {
  xAxis: 0,
  yAxis: 0,
  button: 0,
  state: je.ComponentState.DEFAULT
};
function Lg(o = 0, n = 0) {
  let r = o, i = n;
  if (Math.sqrt(o * o + n * n) > 1) {
    const a = Math.atan2(n, o);
    r = Math.cos(a), i = Math.sin(a);
  }
  return {
    normalizedXAxis: r * 0.5 + 0.5,
    normalizedYAxis: i * 0.5 + 0.5
  };
}
class Rg {
  constructor(n) {
    be(this, "value"), be(this, "componentProperty"), be(this, "states"), be(this, "valueNodeName"), be(this, "valueNodeProperty"), be(this, "minNodeName"), be(this, "maxNodeName"), be(this, "valueNode"), be(this, "minNode"), be(this, "maxNode"), this.componentProperty = n.componentProperty, this.states = n.states, this.valueNodeName = n.valueNodeName, this.valueNodeProperty = n.valueNodeProperty, this.valueNodeProperty === je.VisualResponseProperty.TRANSFORM && (this.minNodeName = n.minNodeName, this.maxNodeName = n.maxNodeName), this.value = 0, this.updateFromComponent(Mg);
  }
  /**
   * Computes the visual response's interpolation weight based on component state
   * @param {Object} componentValues - The component from which to update
   * @param {number | undefined} xAxis - The reported X axis value of the component
   * @param {number | undefined} yAxis - The reported Y axis value of the component
   * @param {number | undefined} button - The reported value of the component's button
   * @param {string} state - The component's active state
   */
  updateFromComponent({
    xAxis: n,
    yAxis: r,
    button: i,
    state: l
  }) {
    const { normalizedXAxis: u, normalizedYAxis: a } = Lg(n, r);
    switch (this.componentProperty) {
      case je.ComponentProperty.X_AXIS:
        this.value = this.states.includes(l) ? u : 0.5;
        break;
      case je.ComponentProperty.Y_AXIS:
        this.value = this.states.includes(l) ? a : 0.5;
        break;
      case je.ComponentProperty.BUTTON:
        this.value = this.states.includes(l) && i ? i : 0;
        break;
      case je.ComponentProperty.STATE:
        this.valueNodeProperty === je.VisualResponseProperty.VISIBILITY ? this.value = this.states.includes(l) : this.value = this.states.includes(l) ? 1 : 0;
        break;
      default:
        throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`);
    }
  }
}
class Ng {
  /**
   * @param {string} componentId - Id of the component
   * @param {InputProfileComponent} componentDescription - Description of the component to be created
   */
  constructor(n, r) {
    if (be(this, "id"), be(this, "values"), be(this, "type"), be(this, "gamepadIndices"), be(this, "rootNodeName"), be(this, "visualResponses"), be(this, "touchPointNodeName"), be(this, "touchPointNode"), !n || !r || !r.visualResponses || !r.gamepadIndices || Object.keys(r.gamepadIndices).length === 0)
      throw new Error("Invalid arguments supplied");
    this.id = n, this.type = r.type, this.rootNodeName = r.rootNodeName, this.touchPointNodeName = r.touchPointNodeName, this.visualResponses = {}, Object.keys(r.visualResponses).forEach((i) => {
      const l = new Rg(r.visualResponses[i]);
      this.visualResponses[i] = l;
    }), this.gamepadIndices = Object.assign({}, r.gamepadIndices), this.values = {
      state: je.ComponentState.DEFAULT,
      button: this.gamepadIndices.button !== void 0 ? 0 : void 0,
      xAxis: this.gamepadIndices.xAxis !== void 0 ? 0 : void 0,
      yAxis: this.gamepadIndices.yAxis !== void 0 ? 0 : void 0
    };
  }
  get data() {
    return { id: this.id, ...this.values };
  }
  /**
   * @description Poll for updated data based on current gamepad state
   * @param {Object} gamepad - The gamepad object from which the component data should be polled
   */
  updateFromGamepad(n) {
    if (this.values.state = je.ComponentState.DEFAULT, this.gamepadIndices.button !== void 0 && n.buttons.length > this.gamepadIndices.button) {
      const r = n.buttons[this.gamepadIndices.button];
      this.values.button = r.value, this.values.button = this.values.button < 0 ? 0 : this.values.button, this.values.button = this.values.button > 1 ? 1 : this.values.button, r.pressed || this.values.button === 1 ? this.values.state = je.ComponentState.PRESSED : (r.touched || this.values.button > je.ButtonTouchThreshold) && (this.values.state = je.ComponentState.TOUCHED);
    }
    this.gamepadIndices.xAxis !== void 0 && n.axes.length > this.gamepadIndices.xAxis && (this.values.xAxis = n.axes[this.gamepadIndices.xAxis], this.values.xAxis = this.values.xAxis < -1 ? -1 : this.values.xAxis, this.values.xAxis = this.values.xAxis > 1 ? 1 : this.values.xAxis, this.values.state === je.ComponentState.DEFAULT && Math.abs(this.values.xAxis) > je.AxisTouchThreshold && (this.values.state = je.ComponentState.TOUCHED)), this.gamepadIndices.yAxis !== void 0 && n.axes.length > this.gamepadIndices.yAxis && (this.values.yAxis = n.axes[this.gamepadIndices.yAxis], this.values.yAxis = this.values.yAxis < -1 ? -1 : this.values.yAxis, this.values.yAxis = this.values.yAxis > 1 ? 1 : this.values.yAxis, this.values.state === je.ComponentState.DEFAULT && Math.abs(this.values.yAxis) > je.AxisTouchThreshold && (this.values.state = je.ComponentState.TOUCHED)), Object.values(this.visualResponses).forEach((r) => {
      r.updateFromComponent(this.values);
    });
  }
}
class Ig {
  /**
   * @param {XRInputSource} xrInputSource - The XRInputSource to build the MotionController around
   * @param {Profile} profile - The best matched profile description for the supplied xrInputSource
   * @param {string} assetUrl
   */
  constructor(n, r, i) {
    if (be(this, "xrInputSource"), be(this, "assetUrl"), be(this, "layoutDescription"), be(this, "id"), be(this, "components"), !n)
      throw new Error("No xrInputSource supplied");
    if (!r)
      throw new Error("No profile supplied");
    if (!r.layouts[n.handedness])
      throw new Error("No layout for " + n.handedness + " handedness");
    this.xrInputSource = n, this.assetUrl = i, this.id = r.profileId, this.layoutDescription = r.layouts[n.handedness], this.components = {}, Object.keys(this.layoutDescription.components).forEach((l) => {
      const u = this.layoutDescription.components[l];
      this.components[l] = new Ng(l, u);
    }), this.updateFromGamepad();
  }
  get gripSpace() {
    return this.xrInputSource.gripSpace;
  }
  get targetRaySpace() {
    return this.xrInputSource.targetRaySpace;
  }
  /**
   * @description Returns a subset of component data for simplified debugging
   */
  get data() {
    const n = [];
    return Object.values(this.components).forEach((r) => {
      n.push(r.data);
    }), n;
  }
  /**
   * @description Poll for updated data based on current gamepad state
   */
  updateFromGamepad() {
    Object.values(this.components).forEach((n) => {
      n.updateFromGamepad(this.xrInputSource.gamepad);
    });
  }
}
const af = new Ye(), Ys = new V();
class Wa extends Ch {
  constructor() {
    super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry";
    const n = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0], r = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2], i = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
    this.setIndex(i), this.setAttribute("position", new Dc(n, 3)), this.setAttribute("uv", new Dc(r, 2));
  }
  applyMatrix4(n) {
    const r = this.attributes.instanceStart, i = this.attributes.instanceEnd;
    return r !== void 0 && (r.applyMatrix4(n), i.applyMatrix4(n), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  setPositions(n) {
    let r;
    n instanceof Float32Array ? r = n : Array.isArray(n) && (r = new Float32Array(n));
    const i = new ma(r, 6, 1);
    return this.setAttribute("instanceStart", new or(i, 3, 0)), this.setAttribute("instanceEnd", new or(i, 3, 3)), this.computeBoundingBox(), this.computeBoundingSphere(), this;
  }
  setColors(n, r = 3) {
    let i;
    n instanceof Float32Array ? i = n : Array.isArray(n) && (i = new Float32Array(n));
    const l = new ma(i, r * 2, 1);
    return this.setAttribute("instanceColorStart", new or(l, r, 0)), this.setAttribute("instanceColorEnd", new or(l, r, r)), this;
  }
  fromWireframeGeometry(n) {
    return this.setPositions(n.attributes.position.array), this;
  }
  fromEdgesGeometry(n) {
    return this.setPositions(n.attributes.position.array), this;
  }
  fromMesh(n) {
    return this.fromWireframeGeometry(new Mh(n.geometry)), this;
  }
  fromLineSegments(n) {
    const r = n.geometry;
    return this.setPositions(r.attributes.position.array), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Ye());
    const n = this.attributes.instanceStart, r = this.attributes.instanceEnd;
    n !== void 0 && r !== void 0 && (this.boundingBox.setFromBufferAttribute(n), af.setFromBufferAttribute(r), this.boundingBox.union(af));
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Jr()), this.boundingBox === null && this.computeBoundingBox();
    const n = this.attributes.instanceStart, r = this.attributes.instanceEnd;
    if (n !== void 0 && r !== void 0) {
      const i = this.boundingSphere.center;
      this.boundingBox.getCenter(i);
      let l = 0;
      for (let u = 0, a = n.count; u < a; u++)
        Ys.fromBufferAttribute(n, u), l = Math.max(l, i.distanceToSquared(Ys)), Ys.fromBufferAttribute(r, u), l = Math.max(l, i.distanceToSquared(Ys));
      this.boundingSphere.radius = Math.sqrt(l), isNaN(this.boundingSphere.radius) && console.error(
        "THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",
        this
      );
    }
  }
  toJSON() {
  }
  applyMatrix(n) {
    return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."), this.applyMatrix4(n);
  }
}
class xd extends Wa {
  constructor() {
    super(), this.isLineGeometry = !0, this.type = "LineGeometry";
  }
  setPositions(n) {
    const r = n.length - 3, i = new Float32Array(2 * r);
    for (let l = 0; l < r; l += 3)
      i[2 * l] = n[l], i[2 * l + 1] = n[l + 1], i[2 * l + 2] = n[l + 2], i[2 * l + 3] = n[l + 3], i[2 * l + 4] = n[l + 4], i[2 * l + 5] = n[l + 5];
    return super.setPositions(i), this;
  }
  setColors(n, r = 3) {
    const i = n.length - r, l = new Float32Array(2 * i);
    if (r === 3)
      for (let u = 0; u < i; u += r)
        l[2 * u] = n[u], l[2 * u + 1] = n[u + 1], l[2 * u + 2] = n[u + 2], l[2 * u + 3] = n[u + 3], l[2 * u + 4] = n[u + 4], l[2 * u + 5] = n[u + 5];
    else
      for (let u = 0; u < i; u += r)
        l[2 * u] = n[u], l[2 * u + 1] = n[u + 1], l[2 * u + 2] = n[u + 2], l[2 * u + 3] = n[u + 3], l[2 * u + 4] = n[u + 4], l[2 * u + 5] = n[u + 5], l[2 * u + 6] = n[u + 6], l[2 * u + 7] = n[u + 7];
    return super.setColors(l, r), this;
  }
  fromLine(n) {
    const r = n.geometry;
    return this.setPositions(r.attributes.position.array), this;
  }
}
class Xa extends Lh {
  constructor(n) {
    super({
      type: "LineMaterial",
      uniforms: ga.clone(
        ga.merge([
          bc.common,
          bc.fog,
          {
            worldUnits: { value: 1 },
            linewidth: { value: 1 },
            resolution: { value: new ye(1, 1) },
            dashOffset: { value: 0 },
            dashScale: { value: 1 },
            dashSize: { value: 1 },
            gapSize: { value: 1 }
            // todo FIX - maybe change to totalSize
          }
        ])
      ),
      vertexShader: (
        /* glsl */
        `
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${parseInt(jf.replace(/\D+/g, "")) >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`
      ),
      clipping: !0
      // required for clipping support
    }), this.isLineMaterial = !0, this.onBeforeCompile = function() {
      this.transparent ? this.defines.USE_LINE_COLOR_ALPHA = "1" : delete this.defines.USE_LINE_COLOR_ALPHA;
    }, Object.defineProperties(this, {
      color: {
        enumerable: !0,
        get: function() {
          return this.uniforms.diffuse.value;
        },
        set: function(r) {
          this.uniforms.diffuse.value = r;
        }
      },
      worldUnits: {
        enumerable: !0,
        get: function() {
          return "WORLD_UNITS" in this.defines;
        },
        set: function(r) {
          r === !0 ? this.defines.WORLD_UNITS = "" : delete this.defines.WORLD_UNITS;
        }
      },
      linewidth: {
        enumerable: !0,
        get: function() {
          return this.uniforms.linewidth.value;
        },
        set: function(r) {
          this.uniforms.linewidth.value = r;
        }
      },
      dashed: {
        enumerable: !0,
        get: function() {
          return "USE_DASH" in this.defines;
        },
        set(r) {
          !!r != "USE_DASH" in this.defines && (this.needsUpdate = !0), r === !0 ? this.defines.USE_DASH = "" : delete this.defines.USE_DASH;
        }
      },
      dashScale: {
        enumerable: !0,
        get: function() {
          return this.uniforms.dashScale.value;
        },
        set: function(r) {
          this.uniforms.dashScale.value = r;
        }
      },
      dashSize: {
        enumerable: !0,
        get: function() {
          return this.uniforms.dashSize.value;
        },
        set: function(r) {
          this.uniforms.dashSize.value = r;
        }
      },
      dashOffset: {
        enumerable: !0,
        get: function() {
          return this.uniforms.dashOffset.value;
        },
        set: function(r) {
          this.uniforms.dashOffset.value = r;
        }
      },
      gapSize: {
        enumerable: !0,
        get: function() {
          return this.uniforms.gapSize.value;
        },
        set: function(r) {
          this.uniforms.gapSize.value = r;
        }
      },
      opacity: {
        enumerable: !0,
        get: function() {
          return this.uniforms.opacity.value;
        },
        set: function(r) {
          this.uniforms.opacity.value = r;
        }
      },
      resolution: {
        enumerable: !0,
        get: function() {
          return this.uniforms.resolution.value;
        },
        set: function(r) {
          this.uniforms.resolution.value.copy(r);
        }
      },
      alphaToCoverage: {
        enumerable: !0,
        get: function() {
          return "USE_ALPHA_TO_COVERAGE" in this.defines;
        },
        set: function(r) {
          !!r != "USE_ALPHA_TO_COVERAGE" in this.defines && (this.needsUpdate = !0), r === !0 ? (this.defines.USE_ALPHA_TO_COVERAGE = "", this.extensions.derivatives = !0) : (delete this.defines.USE_ALPHA_TO_COVERAGE, this.extensions.derivatives = !1);
        }
      }
    }), this.setValues(n);
  }
}
const uf = new V(), cf = new V(), tt = new Ui(), nt = new Ui(), an = new Ui(), ql = new V(), Zl = new $e(), ft = new dn(), ff = new V(), Qs = new Ye(), qs = new Jr(), un = new Ui();
let cn, Ta, wd, cr;
function df(o, n, r) {
  return un.set(0, 0, -n, 1).applyMatrix4(o.projectionMatrix), un.multiplyScalar(1 / un.w), un.x = cr / r.width, un.y = cr / r.height, un.applyMatrix4(o.projectionMatrixInverse), un.multiplyScalar(1 / un.w), Math.abs(Math.max(un.x, un.y));
}
function zg(o, n) {
  for (let r = 0, i = Ta.count; r < i; r++) {
    ft.start.fromBufferAttribute(Ta, r), ft.end.fromBufferAttribute(wd, r);
    const l = new V(), u = new V();
    cn.distanceSqToSegment(ft.start, ft.end, u, l), u.distanceTo(l) < cr * 0.5 && n.push({
      point: u,
      pointOnLine: l,
      distance: cn.origin.distanceTo(u),
      object: o,
      face: null,
      faceIndex: r,
      uv: null,
      uv2: null
    });
  }
}
function Og(o, n, r) {
  const i = n.projectionMatrix, u = o.material.resolution, a = o.matrixWorld, d = o.geometry, f = d.attributes.instanceStart, g = d.attributes.instanceEnd, p = -n.near;
  cn.at(1, an), an.w = 1, an.applyMatrix4(n.matrixWorldInverse), an.applyMatrix4(i), an.multiplyScalar(1 / an.w), an.x *= u.x / 2, an.y *= u.y / 2, an.z = 0, ql.copy(an), Zl.multiplyMatrices(n.matrixWorldInverse, a);
  for (let m = 0, v = f.count; m < v; m++) {
    if (tt.fromBufferAttribute(f, m), nt.fromBufferAttribute(g, m), tt.w = 1, nt.w = 1, tt.applyMatrix4(Zl), nt.applyMatrix4(Zl), tt.z > p && nt.z > p)
      continue;
    if (tt.z > p) {
      const S = tt.z - nt.z, E = (tt.z - p) / S;
      tt.lerp(nt, E);
    } else if (nt.z > p) {
      const S = nt.z - tt.z, E = (nt.z - p) / S;
      nt.lerp(tt, E);
    }
    tt.applyMatrix4(i), nt.applyMatrix4(i), tt.multiplyScalar(1 / tt.w), nt.multiplyScalar(1 / nt.w), tt.x *= u.x / 2, tt.y *= u.y / 2, nt.x *= u.x / 2, nt.y *= u.y / 2, ft.start.copy(tt), ft.start.z = 0, ft.end.copy(nt), ft.end.z = 0;
    const _ = ft.closestPointToPointParameter(ql, !0);
    ft.at(_, ff);
    const P = Wf.lerp(tt.z, nt.z, _), T = P >= -1 && P <= 1, w = ql.distanceTo(ff) < cr * 0.5;
    if (T && w) {
      ft.start.fromBufferAttribute(f, m), ft.end.fromBufferAttribute(g, m), ft.start.applyMatrix4(a), ft.end.applyMatrix4(a);
      const S = new V(), E = new V();
      cn.distanceSqToSegment(ft.start, ft.end, E, S), r.push({
        point: E,
        pointOnLine: S,
        distance: cn.origin.distanceTo(E),
        object: o,
        face: null,
        faceIndex: m,
        uv: null,
        uv2: null
      });
    }
  }
}
class Sd extends Wn {
  constructor(n = new Wa(), r = new Xa({ color: Math.random() * 16777215 })) {
    super(n, r), this.isLineSegments2 = !0, this.type = "LineSegments2";
  }
  // for backwards-compatibility, but could be a method of LineSegmentsGeometry...
  computeLineDistances() {
    const n = this.geometry, r = n.attributes.instanceStart, i = n.attributes.instanceEnd, l = new Float32Array(2 * r.count);
    for (let a = 0, d = 0, f = r.count; a < f; a++, d += 2)
      uf.fromBufferAttribute(r, a), cf.fromBufferAttribute(i, a), l[d] = d === 0 ? 0 : l[d - 1], l[d + 1] = l[d] + uf.distanceTo(cf);
    const u = new ma(l, 2, 1);
    return n.setAttribute("instanceDistanceStart", new or(u, 1, 0)), n.setAttribute("instanceDistanceEnd", new or(u, 1, 1)), this;
  }
  raycast(n, r) {
    const i = this.material.worldUnits, l = n.camera;
    l === null && !i && console.error(
      'LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'
    );
    const u = n.params.Line2 !== void 0 && n.params.Line2.threshold || 0;
    cn = n.ray;
    const a = this.matrixWorld, d = this.geometry, f = this.material;
    cr = f.linewidth + u, Ta = d.attributes.instanceStart, wd = d.attributes.instanceEnd, d.boundingSphere === null && d.computeBoundingSphere(), qs.copy(d.boundingSphere).applyMatrix4(a);
    let g;
    if (i)
      g = cr * 0.5;
    else {
      const m = Math.max(l.near, qs.distanceToPoint(cn.origin));
      g = df(l, m, f.resolution);
    }
    if (qs.radius += g, cn.intersectsSphere(qs) === !1)
      return;
    d.boundingBox === null && d.computeBoundingBox(), Qs.copy(d.boundingBox).applyMatrix4(a);
    let p;
    if (i)
      p = cr * 0.5;
    else {
      const m = Math.max(l.near, Qs.distanceToPoint(cn.origin));
      p = df(l, m, f.resolution);
    }
    Qs.expandByScalar(p), cn.intersectsBox(Qs) !== !1 && (i ? zg(this, r) : Og(this, l, r));
  }
}
class Dg extends Sd {
  constructor(n = new xd(), r = new Xa({ color: Math.random() * 16777215 })) {
    super(n, r), this.isLine2 = !0, this.type = "Line2";
  }
}
const bg = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles", kg = "generic-trigger";
class Fg {
  constructor(n = null, r = bg) {
    this.gltfLoader = n ?? new md(), this.path = r, this._assetCache = {};
  }
  initializeControllerModel(n, r) {
    return r.targetRayMode !== "tracked-pointer" || !r.gamepad ? Promise.resolve() : Cg(r, this.path, kg).then(({ profile: i, assetPath: l }) => {
      if (!l)
        throw new Error("no asset path");
      const u = new Ig(r, i, l);
      n.connectMotionController(u);
      const a = u.assetUrl, d = this._assetCache[a];
      if (d) {
        const f = d.scene.clone();
        n.connectModel(f);
      } else {
        if (!this.gltfLoader)
          throw new Error("GLTFLoader not set.");
        this.gltfLoader.setPath(""), this.gltfLoader.load(
          a,
          (f) => {
            if (!n.motionController) {
              console.warn("motionController gone while gltf load, bailing...");
              return;
            }
            this._assetCache[a] = f;
            const g = f.scene.clone();
            n.connectModel(g);
          },
          void 0,
          () => {
            throw new Error(`Asset ${a} missing or malformed.`);
          }
        );
      }
    }).catch((i) => {
      console.warn(i);
    });
  }
}
const pf = (o) => "envMap" in o, hf = (o, n) => {
  o.envMap = n, o.needsUpdate = !0;
}, _d = (o, n) => {
  n instanceof Wn && (Array.isArray(n.material) ? n.material.forEach((r) => pf(r) ? hf(r, o) : void 0) : pf(n.material) && hf(n.material, o));
}, mf = (o) => "envMapIntensity" in o, gf = (o, n) => {
  o.envMapIntensity = n, o.needsUpdate = !0;
}, Aa = (o, n) => {
  n instanceof Wn && (Array.isArray(n.material) ? n.material.forEach((r) => mf(r) ? gf(r, o) : void 0) : mf(n.material) && gf(n.material, o));
};
function Bg(o, n) {
  Object.values(o.components).forEach((r) => {
    const { type: i, touchPointNodeName: l, visualResponses: u } = r;
    if (i === je.ComponentType.TOUCHPAD && l)
      if (r.touchPointNode = n.getObjectByName(l), r.touchPointNode) {
        const a = new Rh(1e-3), d = new sr({ color: 255 }), f = new Wn(a, d);
        r.touchPointNode.add(f);
      } else
        console.warn(`Could not find touch dot, ${r.touchPointNodeName}, in touchpad component ${r.id}`);
    Object.values(u).forEach((a) => {
      const { valueNodeName: d, minNodeName: f, maxNodeName: g, valueNodeProperty: p } = a;
      if (p === je.VisualResponseProperty.TRANSFORM && f && g) {
        if (a.minNode = n.getObjectByName(f), a.maxNode = n.getObjectByName(g), !a.minNode) {
          console.warn(`Could not find ${f} in the model`);
          return;
        }
        if (!a.maxNode) {
          console.warn(`Could not find ${g} in the model`);
          return;
        }
      }
      a.valueNode = n.getObjectByName(d), a.valueNode || console.warn(`Could not find ${d} in the model`);
    });
  });
}
function jg(o, n) {
  Bg(o.motionController, n), (o.envMap || o.envMapIntensity != null) && n.traverse((r) => {
    o.envMap && _d(o.envMap, r), o.envMapIntensity != null && Aa(o.envMapIntensity, r);
  }), o.add(n);
}
class Ug extends lr {
  constructor() {
    super(), this.motionController = null, this.envMap = null, this.envMapIntensity = 1, this.scene = null;
  }
  setEnvironmentMap(n, r = 1) {
    var i;
    return this.envMap === n && this.envMapIntensity === r ? this : (this.envMap = n, this.envMapIntensity = r, (i = this.scene) == null || i.traverse((l) => {
      _d(n, l), Aa(r, l);
    }), this);
  }
  setEnvironmentMapIntensity(n) {
    var r;
    return this.envMapIntensity === n ? this : (this.envMapIntensity = n, (r = this.scene) == null || r.traverse((i) => Aa(n, i)), this);
  }
  connectModel(n) {
    if (!this.motionController) {
      console.warn("scene tried to add, but no motion controller");
      return;
    }
    this.scene = n, jg(this, n), this.dispatchEvent({
      type: "modelconnected",
      data: n
    });
  }
  connectMotionController(n) {
    this.motionController = n, this.dispatchEvent({
      type: "motionconnected",
      data: n
    });
  }
  updateMatrixWorld(n) {
    super.updateMatrixWorld(n), this.motionController && (this.motionController.updateFromGamepad(), Object.values(this.motionController.components).forEach((r) => {
      Object.values(r.visualResponses).forEach((i) => {
        const { valueNode: l, minNode: u, maxNode: a, value: d, valueNodeProperty: f } = i;
        l && (f === je.VisualResponseProperty.VISIBILITY && typeof d == "boolean" ? l.visible = d : f === je.VisualResponseProperty.TRANSFORM && u && a && typeof d == "number" && (l.quaternion.slerpQuaternions(u.quaternion, a.quaternion, d), l.position.lerpVectors(u.position, a.position, d)));
      });
    }));
  }
  disconnect() {
    this.dispatchEvent({
      type: "motiondisconnected",
      data: this.motionController
    }), this.dispatchEvent({
      type: "modeldisconnected",
      data: this.scene
    }), this.motionController = null, this.scene && this.remove(this.scene), this.scene = null;
  }
  dispose() {
    this.disconnect();
  }
}
const Hg = B.forwardRef(function({ target: n, hideOnBlur: r = !1, ...i }, l) {
  const u = Ue((f) => f.hoverState), a = B.useRef(null), d = B.useMemo(
    () => new Da().setFromPoints([new V(0, 0, 0), new V(0, 0, -1)]),
    []
  );
  return B.useImperativeHandle(l, () => a.current), dr(() => {
    if (!n.inputSource)
      return;
    let f = 1;
    const g = u[n.inputSource.handedness].values().next().value;
    g && n.inputSource.handedness !== "none" ? (f = g.distance, r && (a.current.visible = !1)) : r && (a.current.visible = !0);
    const p = -0.01;
    a.current.scale.z = f + p;
  }), /* @__PURE__ */ B.createElement("line", {
    ref: a,
    geometry: d,
    "material-opacity": 0.8,
    "material-transparent": !0,
    ...i
  });
}), Vg = new Fg(), Gg = ({
  target: o,
  envMap: n,
  envMapIntensity: r
}) => {
  const i = B.useRef(null), l = fn((f) => {
    n != null && f.setEnvironmentMap(n);
  }), u = fn((f) => f.setEnvironmentMap(null)), a = fn((f) => {
    r != null && f.setEnvironmentMapIntensity(r);
  }), d = B.useCallback(
    (f) => {
      var g, p, m;
      if (i.current = f, f) {
        if (o.xrControllerModel = f, (g = o.inputSource) != null && g.hand)
          return;
        l.current(f), a.current(f), o.inputSource ? Vg.initializeControllerModel(f, o.inputSource) : console.warn("no input source on XRController when handleControllerModel");
      } else {
        if ((p = o.inputSource) != null && p.hand)
          return;
        (m = o.xrControllerModel) == null || m.disconnect(), o.xrControllerModel = null;
      }
    },
    [o, a, l]
  );
  return B.useLayoutEffect(() => {
    i.current && (n ? l.current(i.current) : u.current(i.current));
  }, [n, l, u]), B.useLayoutEffect(() => {
    i.current && a.current(i.current);
  }, [r, a]), /* @__PURE__ */ B.createElement("xRControllerModel", {
    ref: d
  });
};
function Wg({ rayMaterial: o = {}, hideRaysOnBlur: n = !1, envMap: r, envMapIntensity: i }) {
  const l = Ue((d) => d.controllers), u = Ue((d) => d.isHandTracking), a = B.useMemo(
    () => Object.entries(o).reduce(
      (d, [f, g]) => ({
        ...d,
        [`material-${f}`]: g
      }),
      {}
    ),
    [JSON.stringify(o)]
  );
  return B.useMemo(() => ja({ XRControllerModel: Ug }), []), /* @__PURE__ */ B.createElement(B.Fragment, null, l.map((d, f) => /* @__PURE__ */ B.createElement(B.Fragment, {
    key: f
  }, wa(/* @__PURE__ */ B.createElement(Gg, {
    target: d,
    envMap: r,
    envMapIntensity: i
  }), d.grip), wa(
    /* @__PURE__ */ B.createElement(Hg, {
      visible: !u,
      hideOnBlur: n,
      target: d,
      ...a
    }),
    d.controller
  ))));
}
const Xg = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/";
class Kg {
  constructor(n, r, i = Xg, l, u) {
    this.controller = r, this.handModel = n, this.bones = [];
    const a = new md();
    u || a.setPath(i), a.load(u ?? `${l}.glb`, (d) => {
      const f = d.scene.children[0];
      this.handModel.add(f), this.scene = f;
      const g = f.getObjectByProperty("type", "SkinnedMesh");
      g.frustumCulled = !1, g.castShadow = !0, g.receiveShadow = !0, [
        "wrist",
        "thumb-metacarpal",
        "thumb-phalanx-proximal",
        "thumb-phalanx-distal",
        "thumb-tip",
        "index-finger-metacarpal",
        "index-finger-phalanx-proximal",
        "index-finger-phalanx-intermediate",
        "index-finger-phalanx-distal",
        "index-finger-tip",
        "middle-finger-metacarpal",
        "middle-finger-phalanx-proximal",
        "middle-finger-phalanx-intermediate",
        "middle-finger-phalanx-distal",
        "middle-finger-tip",
        "ring-finger-metacarpal",
        "ring-finger-phalanx-proximal",
        "ring-finger-phalanx-intermediate",
        "ring-finger-phalanx-distal",
        "ring-finger-tip",
        "pinky-finger-metacarpal",
        "pinky-finger-phalanx-proximal",
        "pinky-finger-phalanx-intermediate",
        "pinky-finger-phalanx-distal",
        "pinky-finger-tip"
      ].forEach((m) => {
        const v = f.getObjectByName(m);
        v !== void 0 ? v.jointName = m : console.warn(`Couldn't find ${m} in ${l} hand mesh`), this.bones.push(v);
      });
    });
  }
  updateMesh() {
    const n = this.controller.joints;
    let r = !0;
    for (let i = 0; i < this.bones.length; i++) {
      const l = this.bones[i];
      if (l) {
        const u = n[l.jointName];
        if (u.visible) {
          const a = u.position;
          l.position.copy(a), l.quaternion.copy(u.quaternion), r = !1;
        }
      }
    }
    r && this.scene ? this.scene.visible = !1 : this.scene && (this.scene.visible = !0);
  }
  dispose() {
    this.scene && this.handModel.remove(this.scene);
  }
}
const Yg = 0.01, Qg = "index-finger-tip";
class qg extends ka {
  constructor(n, r, i) {
    super(), this._onConnected = (l) => {
      const u = l.data;
      u.hand && !this.motionController && (this.xrInputSource = u, this.motionController = new Kg(
        this,
        this.controller,
        void 0,
        u.handedness,
        u.handedness === "left" ? this.leftModelPath : this.rightModelPath
      ));
    }, this._onDisconnected = () => {
      var l;
      (l = this.xrInputSource) != null && l.hand && this.motionControllerCleanup();
    }, this.controller = n, this.motionController = null, this.envMap = null, this.leftModelPath = r, this.rightModelPath = i, this.mesh = null, this.xrInputSource = null, n.addEventListener("connected", this._onConnected), n.addEventListener("disconnected", this._onDisconnected);
  }
  motionControllerCleanup() {
    var n;
    this.clear(), (n = this.motionController) == null || n.dispose(), this.motionController = null;
  }
  updateMatrixWorld(n) {
    super.updateMatrixWorld(n), this.motionController && this.motionController.updateMesh();
  }
  getPointerPosition() {
    const n = this.controller.joints[Qg];
    return n ? n.position : null;
  }
  intersectBoxObject(n) {
    const r = this.getPointerPosition();
    if (r) {
      const i = new Jr(r, Yg), l = new Ye().setFromObject(n);
      return i.intersectsBox(l);
    } else
      return !1;
  }
  checkButton(n) {
    this.intersectBoxObject(n) ? n.onPress() : n.onClear(), n.isPressed() && n.whilePressed();
  }
  dispose() {
    this.motionControllerCleanup(), this.controller.removeEventListener("connected", this._onConnected), this.controller.removeEventListener("disconnected", this._onDisconnected);
  }
}
function Zg({ modelLeft: o, modelRight: n }) {
  const r = Ue((i) => i.controllers);
  return B.useMemo(() => ja({ OculusHandModel: qg }), []), jt(() => {
    for (const i of r)
      i.hand.dispatchEvent({ type: "connected", data: i.inputSource, fake: !0 });
  }, [r, o, n]), /* @__PURE__ */ B.createElement(B.Fragment, null, r.map(({ hand: i }) => wa(/* @__PURE__ */ B.createElement("oculusHandModel", {
    args: [i, o, n]
  }), i)));
}
const Jg = /* @__PURE__ */ B.forwardRef(function({
  points: n,
  color: r = 16777215,
  vertexColors: i,
  linewidth: l,
  lineWidth: u,
  segments: a,
  dashed: d,
  ...f
}, g) {
  var p;
  const m = rt((T) => T.size), v = B.useMemo(() => a ? new Sd() : new Dg(), [a]), [x] = B.useState(() => new Xa()), _ = (i == null || (p = i[0]) == null ? void 0 : p.length) === 4 ? 4 : 3, P = B.useMemo(() => {
    const T = a ? new Wa() : new xd(), w = n.map((S) => {
      const E = Array.isArray(S);
      return S instanceof V || S instanceof Ui ? [S.x, S.y, S.z] : S instanceof ye ? [S.x, S.y, 0] : E && S.length === 3 ? [S[0], S[1], S[2]] : E && S.length === 2 ? [S[0], S[1], 0] : S;
    });
    if (T.setPositions(w.flat()), i) {
      r = 16777215;
      const S = i.map((E) => E instanceof _n ? E.toArray() : E);
      T.setColors(S.flat(), _);
    }
    return T;
  }, [n, a, i, _]);
  return B.useLayoutEffect(() => {
    v.computeLineDistances();
  }, [n, v]), B.useLayoutEffect(() => {
    d ? x.defines.USE_DASH = "" : delete x.defines.USE_DASH, x.needsUpdate = !0;
  }, [d, x]), B.useEffect(() => () => P.dispose(), [P]), /* @__PURE__ */ B.createElement("primitive", Gn({
    object: v,
    ref: g
  }, f), /* @__PURE__ */ B.createElement("primitive", {
    object: P,
    attach: "geometry"
  }), /* @__PURE__ */ B.createElement("primitive", Gn({
    object: x,
    attach: "material",
    color: r,
    vertexColors: !!i,
    resolution: [m.width, m.height],
    linewidth: l ?? u,
    dashed: d,
    transparent: _ === 4
  }, f)));
}), Ed = /* @__PURE__ */ B.forwardRef(({
  sdfGlyphSize: o = 64,
  anchorX: n = "center",
  anchorY: r = "middle",
  font: i,
  fontSize: l = 1,
  children: u,
  characters: a,
  onSync: d,
  ...f
}, g) => {
  const {
    Text: p,
    preloadFont: m
  } = kc(async () => import("./troika-three-text.esm-8179c0b3.js"), []), v = rt(({
    invalidate: T
  }) => T), [x] = B.useState(() => new p()), [_, P] = B.useMemo(() => {
    const T = [];
    let w = "";
    return B.Children.forEach(u, (S) => {
      typeof S == "string" || typeof S == "number" ? w += S : T.push(S);
    }), [T, w];
  }, [u]);
  return kc(() => new Promise((T) => m({
    font: i,
    characters: a
  }, T)), ["troika-text", i, a]), B.useLayoutEffect(() => void x.sync(() => {
    v(), d && d(x);
  })), B.useEffect(() => () => x.dispose(), [x]), /* @__PURE__ */ B.createElement("primitive", Gn({
    object: x,
    ref: g,
    font: i,
    text: P,
    anchorX: n,
    anchorY: r,
    fontSize: l,
    sdfGlyphSize: o
  }, f), _);
}), $g = /* @__PURE__ */ B.forwardRef(({
  makeDefault: o,
  camera: n,
  regress: r,
  domElement: i,
  enableDamping: l = !0,
  keyEvents: u = !1,
  onChange: a,
  onStart: d,
  onEnd: f,
  ...g
}, p) => {
  const m = rt((L) => L.invalidate), v = rt((L) => L.camera), x = rt((L) => L.gl), _ = rt((L) => L.events), P = rt((L) => L.setEvents), T = rt((L) => L.set), w = rt((L) => L.get), S = rt((L) => L.performance), E = n || v, A = i || _.connected || x.domElement, M = B.useMemo(() => new Wm(E), [E]);
  return dr(() => {
    M.enabled && M.update();
  }, -1), B.useEffect(() => (u && M.connect(u === !0 ? A : u), M.connect(A), () => void M.dispose()), [u, A, r, M, m]), B.useEffect(() => {
    const L = (b) => {
      m(), r && S.regress(), a && a(b);
    }, R = (b) => {
      d && d(b);
    }, z = (b) => {
      f && f(b);
    };
    return M.addEventListener("change", L), M.addEventListener("start", R), M.addEventListener("end", z), () => {
      M.removeEventListener("start", R), M.removeEventListener("end", z), M.removeEventListener("change", L);
    };
  }, [a, d, f, M, m, P]), B.useEffect(() => {
    if (o) {
      const L = w().controls;
      return T({
        controls: M
      }), () => T({
        controls: L
      });
    }
  }, [o, M]), /* @__PURE__ */ B.createElement("primitive", Gn({
    ref: p,
    object: M,
    enableDamping: l
  }, g));
}), Td = 0, e0 = 1, Ad = 2, vf = 2, Jl = 1.25, yf = 1, Fi = 6 * 4 + 4 + 4, wo = 65535, t0 = Math.pow(2, -24), $l = Symbol("SKIP_GENERATION");
function n0(o) {
  return o.index ? o.index.count : o.attributes.position.count;
}
function $r(o) {
  return n0(o) / 3;
}
function r0(o, n = ArrayBuffer) {
  return o > 65535 ? new Uint32Array(new n(4 * o)) : new Uint16Array(new n(2 * o));
}
function i0(o, n) {
  if (!o.index) {
    const r = o.attributes.position.count, i = n.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer, l = r0(r, i);
    o.setIndex(new ki(l, 1));
    for (let u = 0; u < r; u++)
      l[u] = u;
  }
}
function Pd(o) {
  const n = $r(o), r = o.drawRange, i = r.start / 3, l = (r.start + r.count) / 3, u = Math.max(0, i), a = Math.min(n, l) - u;
  return [{
    offset: Math.floor(u),
    count: Math.floor(a)
  }];
}
function Cd(o) {
  if (!o.groups || !o.groups.length)
    return Pd(o);
  const n = [], r = /* @__PURE__ */ new Set(), i = o.drawRange, l = i.start / 3, u = (i.start + i.count) / 3;
  for (const d of o.groups) {
    const f = d.start / 3, g = (d.start + d.count) / 3;
    r.add(Math.max(l, f)), r.add(Math.min(u, g));
  }
  const a = Array.from(r.values()).sort((d, f) => d - f);
  for (let d = 0; d < a.length - 1; d++) {
    const f = a[d], g = a[d + 1];
    n.push({
      offset: Math.floor(f),
      count: Math.floor(g - f)
    });
  }
  return n;
}
function s0(o) {
  if (o.groups.length === 0)
    return !1;
  const n = $r(o), r = Cd(o).sort((u, a) => u.offset - a.offset), i = r[r.length - 1];
  i.count = Math.min(n - i.offset, i.count);
  let l = 0;
  return r.forEach(({ count: u }) => l += u), n !== l;
}
function ea(o, n, r, i, l) {
  let u = 1 / 0, a = 1 / 0, d = 1 / 0, f = -1 / 0, g = -1 / 0, p = -1 / 0, m = 1 / 0, v = 1 / 0, x = 1 / 0, _ = -1 / 0, P = -1 / 0, T = -1 / 0;
  for (let w = n * 6, S = (n + r) * 6; w < S; w += 6) {
    const E = o[w + 0], A = o[w + 1], M = E - A, L = E + A;
    M < u && (u = M), L > f && (f = L), E < m && (m = E), E > _ && (_ = E);
    const R = o[w + 2], z = o[w + 3], b = R - z, I = R + z;
    b < a && (a = b), I > g && (g = I), R < v && (v = R), R > P && (P = R);
    const k = o[w + 4], j = o[w + 5], G = k - j, Y = k + j;
    G < d && (d = G), Y > p && (p = Y), k < x && (x = k), k > T && (T = k);
  }
  i[0] = u, i[1] = a, i[2] = d, i[3] = f, i[4] = g, i[5] = p, l[0] = m, l[1] = v, l[2] = x, l[3] = _, l[4] = P, l[5] = T;
}
function o0(o, n = null, r = null, i = null) {
  const l = o.attributes.position, u = o.index ? o.index.array : null, a = $r(o), d = l.normalized;
  let f;
  n === null ? (f = new Float32Array(a * 6 * 4), r = 0, i = a) : (f = n, r = r || 0, i = i || a);
  const g = l.array, p = l.offset || 0;
  let m = 3;
  l.isInterleavedBufferAttribute && (m = l.data.stride);
  const v = ["getX", "getY", "getZ"];
  for (let x = r; x < r + i; x++) {
    const _ = x * 3, P = x * 6;
    let T = _ + 0, w = _ + 1, S = _ + 2;
    u && (T = u[T], w = u[w], S = u[S]), d || (T = T * m + p, w = w * m + p, S = S * m + p);
    for (let E = 0; E < 3; E++) {
      let A, M, L;
      d ? (A = l[v[E]](T), M = l[v[E]](w), L = l[v[E]](S)) : (A = g[T + E], M = g[w + E], L = g[S + E]);
      let R = A;
      M < R && (R = M), L < R && (R = L);
      let z = A;
      M > z && (z = M), L > z && (z = L);
      const b = (z - R) / 2, I = E * 2;
      f[P + I + 0] = R + b, f[P + I + 1] = b + (Math.abs(R) + b) * t0;
    }
  }
  return f;
}
function ke(o, n, r) {
  return r.min.x = n[o], r.min.y = n[o + 1], r.min.z = n[o + 2], r.max.x = n[o + 3], r.max.y = n[o + 4], r.max.z = n[o + 5], r;
}
function xf(o) {
  let n = -1, r = -1 / 0;
  for (let i = 0; i < 3; i++) {
    const l = o[i + 3] - o[i];
    l > r && (r = l, n = i);
  }
  return n;
}
function wf(o, n) {
  n.set(o);
}
function Sf(o, n, r) {
  let i, l;
  for (let u = 0; u < 3; u++) {
    const a = u + 3;
    i = o[u], l = n[u], r[u] = i < l ? i : l, i = o[a], l = n[a], r[a] = i > l ? i : l;
  }
}
function Zs(o, n, r) {
  for (let i = 0; i < 3; i++) {
    const l = n[o + 2 * i], u = n[o + 2 * i + 1], a = l - u, d = l + u;
    a < r[i] && (r[i] = a), d > r[i + 3] && (r[i + 3] = d);
  }
}
function Li(o) {
  const n = o[3] - o[0], r = o[4] - o[1], i = o[5] - o[2];
  return 2 * (n * r + r * i + i * n);
}
const wn = 32, l0 = (o, n) => o.candidate - n.candidate, jn = new Array(wn).fill().map(() => ({
  count: 0,
  bounds: new Float32Array(6),
  rightCacheBounds: new Float32Array(6),
  leftCacheBounds: new Float32Array(6),
  candidate: 0
})), Js = new Float32Array(6);
function a0(o, n, r, i, l, u) {
  let a = -1, d = 0;
  if (u === Td)
    a = xf(n), a !== -1 && (d = (n[a] + n[a + 3]) / 2);
  else if (u === e0)
    a = xf(o), a !== -1 && (d = u0(r, i, l, a));
  else if (u === Ad) {
    const f = Li(o);
    let g = Jl * l;
    const p = i * 6, m = (i + l) * 6;
    for (let v = 0; v < 3; v++) {
      const x = n[v], T = (n[v + 3] - x) / wn;
      if (l < wn / 4) {
        const w = [...jn];
        w.length = l;
        let S = 0;
        for (let A = p; A < m; A += 6, S++) {
          const M = w[S];
          M.candidate = r[A + 2 * v], M.count = 0;
          const {
            bounds: L,
            leftCacheBounds: R,
            rightCacheBounds: z
          } = M;
          for (let b = 0; b < 3; b++)
            z[b] = 1 / 0, z[b + 3] = -1 / 0, R[b] = 1 / 0, R[b + 3] = -1 / 0, L[b] = 1 / 0, L[b + 3] = -1 / 0;
          Zs(A, r, L);
        }
        w.sort(l0);
        let E = l;
        for (let A = 0; A < E; A++) {
          const M = w[A];
          for (; A + 1 < E && w[A + 1].candidate === M.candidate; )
            w.splice(A + 1, 1), E--;
        }
        for (let A = p; A < m; A += 6) {
          const M = r[A + 2 * v];
          for (let L = 0; L < E; L++) {
            const R = w[L];
            M >= R.candidate ? Zs(A, r, R.rightCacheBounds) : (Zs(A, r, R.leftCacheBounds), R.count++);
          }
        }
        for (let A = 0; A < E; A++) {
          const M = w[A], L = M.count, R = l - M.count, z = M.leftCacheBounds, b = M.rightCacheBounds;
          let I = 0;
          L !== 0 && (I = Li(z) / f);
          let k = 0;
          R !== 0 && (k = Li(b) / f);
          const j = yf + Jl * (I * L + k * R);
          j < g && (a = v, g = j, d = M.candidate);
        }
      } else {
        for (let E = 0; E < wn; E++) {
          const A = jn[E];
          A.count = 0, A.candidate = x + T + E * T;
          const M = A.bounds;
          for (let L = 0; L < 3; L++)
            M[L] = 1 / 0, M[L + 3] = -1 / 0;
        }
        for (let E = p; E < m; E += 6) {
          let L = ~~((r[E + 2 * v] - x) / T);
          L >= wn && (L = wn - 1);
          const R = jn[L];
          R.count++, Zs(E, r, R.bounds);
        }
        const w = jn[wn - 1];
        wf(w.bounds, w.rightCacheBounds);
        for (let E = wn - 2; E >= 0; E--) {
          const A = jn[E], M = jn[E + 1];
          Sf(A.bounds, M.rightCacheBounds, A.rightCacheBounds);
        }
        let S = 0;
        for (let E = 0; E < wn - 1; E++) {
          const A = jn[E], M = A.count, L = A.bounds, z = jn[E + 1].rightCacheBounds;
          M !== 0 && (S === 0 ? wf(L, Js) : Sf(L, Js, Js)), S += M;
          let b = 0, I = 0;
          S !== 0 && (b = Li(Js) / f);
          const k = l - S;
          k !== 0 && (I = Li(z) / f);
          const j = yf + Jl * (b * S + I * k);
          j < g && (a = v, g = j, d = A.candidate);
        }
      }
    }
  } else
    console.warn(`MeshBVH: Invalid build strategy value ${u} used.`);
  return { axis: a, pos: d };
}
function u0(o, n, r, i) {
  let l = 0;
  for (let u = n, a = n + r; u < a; u++)
    l += o[u * 6 + i * 2];
  return l / r;
}
class ta {
  constructor() {
    this.boundingData = new Float32Array(6);
  }
}
function c0(o, n, r, i, l, u) {
  let a = i, d = i + l - 1;
  const f = u.pos, g = u.axis * 2;
  for (; ; ) {
    for (; a <= d && r[a * 6 + g] < f; )
      a++;
    for (; a <= d && r[d * 6 + g] >= f; )
      d--;
    if (a < d) {
      for (let p = 0; p < 3; p++) {
        let m = n[a * 3 + p];
        n[a * 3 + p] = n[d * 3 + p], n[d * 3 + p] = m;
      }
      for (let p = 0; p < 6; p++) {
        let m = r[a * 6 + p];
        r[a * 6 + p] = r[d * 6 + p], r[d * 6 + p] = m;
      }
      a++, d--;
    } else
      return a;
  }
}
function f0(o, n, r, i, l, u) {
  let a = i, d = i + l - 1;
  const f = u.pos, g = u.axis * 2;
  for (; ; ) {
    for (; a <= d && r[a * 6 + g] < f; )
      a++;
    for (; a <= d && r[d * 6 + g] >= f; )
      d--;
    if (a < d) {
      let p = o[a];
      o[a] = o[d], o[d] = p;
      for (let m = 0; m < 6; m++) {
        let v = r[a * 6 + m];
        r[a * 6 + m] = r[d * 6 + m], r[d * 6 + m] = v;
      }
      a++, d--;
    } else
      return a;
  }
}
function Et(o, n) {
  return n[o + 15] === 65535;
}
function Mt(o, n) {
  return n[o + 6];
}
function Ut(o, n) {
  return n[o + 14];
}
function Ht(o) {
  return o + 8;
}
function Vt(o, n) {
  return n[o + 6];
}
function Md(o, n) {
  return n[o + 7];
}
let Ld, bi, mo, Rd;
const d0 = Math.pow(2, 32);
function Pa(o) {
  return "count" in o ? 1 : 1 + Pa(o.left) + Pa(o.right);
}
function p0(o, n, r) {
  return Ld = new Float32Array(r), bi = new Uint32Array(r), mo = new Uint16Array(r), Rd = new Uint8Array(r), Ca(o, n);
}
function Ca(o, n) {
  const r = o / 4, i = o / 2, l = "count" in n, u = n.boundingData;
  for (let a = 0; a < 6; a++)
    Ld[r + a] = u[a];
  if (l)
    if (n.buffer) {
      const a = n.buffer;
      Rd.set(new Uint8Array(a), o);
      for (let d = o, f = o + a.byteLength; d < f; d += Fi) {
        const g = d / 2;
        Et(g, mo) || (bi[d / 4 + 6] += r);
      }
      return o + a.byteLength;
    } else {
      const a = n.offset, d = n.count;
      return bi[r + 6] = a, mo[i + 14] = d, mo[i + 15] = wo, o + Fi;
    }
  else {
    const a = n.left, d = n.right, f = n.splitAxis;
    let g;
    if (g = Ca(o + Fi, a), g / 4 > d0)
      throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");
    return bi[r + 6] = g / 4, g = Ca(g, d), bi[r + 7] = f, g;
  }
}
function h0(o, n) {
  const r = (o.index ? o.index.count : o.attributes.position.count) / 3, i = r > 2 ** 16, l = i ? 4 : 2, u = n ? new SharedArrayBuffer(r * l) : new ArrayBuffer(r * l), a = i ? new Uint32Array(u) : new Uint16Array(u);
  for (let d = 0, f = a.length; d < f; d++)
    a[d] = d;
  return a;
}
function m0(o, n, r, i, l) {
  const {
    maxDepth: u,
    verbose: a,
    maxLeafTris: d,
    strategy: f,
    onProgress: g,
    indirect: p
  } = l, m = o._indirectBuffer, v = o.geometry, x = v.index ? v.index.array : null, _ = p ? f0 : c0, P = $r(v), T = new Float32Array(6);
  let w = !1;
  const S = new ta();
  return ea(n, r, i, S.boundingData, T), A(S, r, i, T), S;
  function E(M) {
    g && g(M / P);
  }
  function A(M, L, R, z = null, b = 0) {
    if (!w && b >= u && (w = !0, a && (console.warn(`MeshBVH: Max depth of ${u} reached when generating BVH. Consider increasing maxDepth.`), console.warn(v))), R <= d || b >= u)
      return E(L + R), M.offset = L, M.count = R, M;
    const I = a0(M.boundingData, z, n, L, R, f);
    if (I.axis === -1)
      return E(L + R), M.offset = L, M.count = R, M;
    const k = _(m, x, n, L, R, I);
    if (k === L || k === L + R)
      E(L + R), M.offset = L, M.count = R;
    else {
      M.splitAxis = I.axis;
      const j = new ta(), G = L, Y = k - L;
      M.left = j, ea(n, G, Y, j.boundingData, T), A(j, G, Y, T, b + 1);
      const ee = new ta(), ae = k, Se = R - Y;
      M.right = ee, ea(n, ae, Se, ee.boundingData, T), A(ee, ae, Se, T, b + 1);
    }
    return M;
  }
}
function g0(o, n) {
  const r = o.geometry;
  n.indirect && (o._indirectBuffer = h0(r, n.useSharedArrayBuffer), s0(r) && !n.verbose && console.warn(
    'MeshBVH: Provided geometry contains groups that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.'
  )), o._indirectBuffer || i0(r, n);
  const i = n.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer, l = o0(r), u = n.indirect ? Pd(r) : Cd(r);
  o._roots = u.map((a) => {
    const d = m0(o, l, a.offset, a.count, n), f = Pa(d), g = new i(Fi * f);
    return p0(0, d, g), g;
  });
}
class En {
  constructor() {
    this.min = 1 / 0, this.max = -1 / 0;
  }
  setFromPointsField(n, r) {
    let i = 1 / 0, l = -1 / 0;
    for (let u = 0, a = n.length; u < a; u++) {
      const f = n[u][r];
      i = f < i ? f : i, l = f > l ? f : l;
    }
    this.min = i, this.max = l;
  }
  setFromPoints(n, r) {
    let i = 1 / 0, l = -1 / 0;
    for (let u = 0, a = r.length; u < a; u++) {
      const d = r[u], f = n.dot(d);
      i = f < i ? f : i, l = f > l ? f : l;
    }
    this.min = i, this.max = l;
  }
  isSeparated(n) {
    return this.min > n.max || n.min > this.max;
  }
}
En.prototype.setFromBox = function() {
  const o = new V();
  return function(r, i) {
    const l = i.min, u = i.max;
    let a = 1 / 0, d = -1 / 0;
    for (let f = 0; f <= 1; f++)
      for (let g = 0; g <= 1; g++)
        for (let p = 0; p <= 1; p++) {
          o.x = l.x * f + u.x * (1 - f), o.y = l.y * g + u.y * (1 - g), o.z = l.z * p + u.z * (1 - p);
          const m = r.dot(o);
          a = Math.min(m, a), d = Math.max(m, d);
        }
    this.min = a, this.max = d;
  };
}();
const v0 = function() {
  const o = new V(), n = new V(), r = new V();
  return function(l, u, a) {
    const d = l.start, f = o, g = u.start, p = n;
    r.subVectors(d, g), o.subVectors(l.end, l.start), n.subVectors(u.end, u.start);
    const m = r.dot(p), v = p.dot(f), x = p.dot(p), _ = r.dot(f), T = f.dot(f) * x - v * v;
    let w, S;
    T !== 0 ? w = (m * v - _ * x) / T : w = 0, S = (m + w * v) / x, a.x = w, a.y = S;
  };
}(), Ka = function() {
  const o = new ye(), n = new V(), r = new V();
  return function(l, u, a, d) {
    v0(l, u, o);
    let f = o.x, g = o.y;
    if (f >= 0 && f <= 1 && g >= 0 && g <= 1) {
      l.at(f, a), u.at(g, d);
      return;
    } else if (f >= 0 && f <= 1) {
      g < 0 ? u.at(0, d) : u.at(1, d), l.closestPointToPoint(d, !0, a);
      return;
    } else if (g >= 0 && g <= 1) {
      f < 0 ? l.at(0, a) : l.at(1, a), u.closestPointToPoint(a, !0, d);
      return;
    } else {
      let p;
      f < 0 ? p = l.start : p = l.end;
      let m;
      g < 0 ? m = u.start : m = u.end;
      const v = n, x = r;
      if (l.closestPointToPoint(m, !0, n), u.closestPointToPoint(p, !0, r), v.distanceToSquared(m) <= x.distanceToSquared(p)) {
        a.copy(v), d.copy(m);
        return;
      } else {
        a.copy(p), d.copy(x);
        return;
      }
    }
  };
}(), y0 = function() {
  const o = new V(), n = new V(), r = new ba(), i = new dn();
  return function(u, a) {
    const { radius: d, center: f } = u, { a: g, b: p, c: m } = a;
    if (i.start = g, i.end = p, i.closestPointToPoint(f, !0, o).distanceTo(f) <= d || (i.start = g, i.end = m, i.closestPointToPoint(f, !0, o).distanceTo(f) <= d) || (i.start = p, i.end = m, i.closestPointToPoint(f, !0, o).distanceTo(f) <= d))
      return !0;
    const P = a.getPlane(r);
    if (Math.abs(P.distanceToPoint(f)) <= d) {
      const w = P.projectPoint(f, n);
      if (a.containsPoint(w))
        return !0;
    }
    return !1;
  };
}(), x0 = 1e-15;
function na(o) {
  return Math.abs(o) < x0;
}
class Jt extends Di {
  constructor(...n) {
    super(...n), this.isExtendedTriangle = !0, this.satAxes = new Array(4).fill().map(() => new V()), this.satBounds = new Array(4).fill().map(() => new En()), this.points = [this.a, this.b, this.c], this.sphere = new Jr(), this.plane = new ba(), this.needsUpdate = !0;
  }
  intersectsSphere(n) {
    return y0(n, this);
  }
  update() {
    const n = this.a, r = this.b, i = this.c, l = this.points, u = this.satAxes, a = this.satBounds, d = u[0], f = a[0];
    this.getNormal(d), f.setFromPoints(d, l);
    const g = u[1], p = a[1];
    g.subVectors(n, r), p.setFromPoints(g, l);
    const m = u[2], v = a[2];
    m.subVectors(r, i), v.setFromPoints(m, l);
    const x = u[3], _ = a[3];
    x.subVectors(i, n), _.setFromPoints(x, l), this.sphere.setFromPoints(this.points), this.plane.setFromNormalAndCoplanarPoint(d, n), this.needsUpdate = !1;
  }
}
Jt.prototype.closestPointToSegment = function() {
  const o = new V(), n = new V(), r = new dn();
  return function(l, u = null, a = null) {
    const { start: d, end: f } = l, g = this.points;
    let p, m = 1 / 0;
    for (let v = 0; v < 3; v++) {
      const x = (v + 1) % 3;
      r.start.copy(g[v]), r.end.copy(g[x]), Ka(r, l, o, n), p = o.distanceToSquared(n), p < m && (m = p, u && u.copy(o), a && a.copy(n));
    }
    return this.closestPointToPoint(d, o), p = d.distanceToSquared(o), p < m && (m = p, u && u.copy(o), a && a.copy(d)), this.closestPointToPoint(f, o), p = f.distanceToSquared(o), p < m && (m = p, u && u.copy(o), a && a.copy(f)), Math.sqrt(m);
  };
}();
Jt.prototype.intersectsTriangle = function() {
  const o = new Jt(), n = new Array(3), r = new Array(3), i = new En(), l = new En(), u = new V(), a = new V(), d = new V(), f = new V(), g = new V(), p = new dn(), m = new dn(), v = new dn(), x = new V();
  function _(P, T, w) {
    const S = P.points;
    let E = 0, A = -1;
    for (let M = 0; M < 3; M++) {
      const { start: L, end: R } = p;
      L.copy(S[M]), R.copy(S[(M + 1) % 3]), p.delta(a);
      const z = na(T.distanceToPoint(L));
      if (na(T.normal.dot(a)) && z) {
        w.copy(p), E = 2;
        break;
      }
      const b = T.intersectLine(p, x);
      if (!b && z && x.copy(L), (b || z) && !na(x.distanceTo(R))) {
        if (E <= 1)
          (E === 1 ? w.start : w.end).copy(x), z && (A = E);
        else if (E >= 2) {
          (A === 1 ? w.start : w.end).copy(x), E = 2;
          break;
        }
        if (E++, E === 2 && A === -1)
          break;
      }
    }
    return E;
  }
  return function(T, w = null, S = !1) {
    this.needsUpdate && this.update(), T.isExtendedTriangle ? T.needsUpdate && T.update() : (o.copy(T), o.update(), T = o);
    const E = this.plane, A = T.plane;
    if (Math.abs(E.normal.dot(A.normal)) > 1 - 1e-10) {
      const M = this.satBounds, L = this.satAxes;
      r[0] = T.a, r[1] = T.b, r[2] = T.c;
      for (let b = 0; b < 4; b++) {
        const I = M[b], k = L[b];
        if (i.setFromPoints(k, r), I.isSeparated(i))
          return !1;
      }
      const R = T.satBounds, z = T.satAxes;
      n[0] = this.a, n[1] = this.b, n[2] = this.c;
      for (let b = 0; b < 4; b++) {
        const I = R[b], k = z[b];
        if (i.setFromPoints(k, n), I.isSeparated(i))
          return !1;
      }
      for (let b = 0; b < 4; b++) {
        const I = L[b];
        for (let k = 0; k < 4; k++) {
          const j = z[k];
          if (u.crossVectors(I, j), i.setFromPoints(u, n), l.setFromPoints(u, r), i.isSeparated(l))
            return !1;
        }
      }
      return w && (S || console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."), w.start.set(0, 0, 0), w.end.set(0, 0, 0)), !0;
    } else {
      const M = _(this, A, m);
      if (M === 1 && T.containsPoint(m.end))
        return w && (w.start.copy(m.end), w.end.copy(m.end)), !0;
      if (M !== 2)
        return !1;
      const L = _(T, E, v);
      if (L === 1 && this.containsPoint(v.end))
        return w && (w.start.copy(v.end), w.end.copy(v.end)), !0;
      if (L !== 2)
        return !1;
      if (m.delta(d), v.delta(f), d.dot(f) < 0) {
        let G = v.start;
        v.start = v.end, v.end = G;
      }
      const R = m.start.dot(d), z = m.end.dot(d), b = v.start.dot(d), I = v.end.dot(d), k = z < b, j = R < I;
      return R !== I && b !== z && k === j ? !1 : (w && (g.subVectors(m.start, v.start), g.dot(d) > 0 ? w.start.copy(m.start) : w.start.copy(v.start), g.subVectors(m.end, v.end), g.dot(d) < 0 ? w.end.copy(m.end) : w.end.copy(v.end)), !0);
    }
  };
}();
Jt.prototype.distanceToPoint = function() {
  const o = new V();
  return function(r) {
    return this.closestPointToPoint(r, o), r.distanceTo(o);
  };
}();
Jt.prototype.distanceToTriangle = function() {
  const o = new V(), n = new V(), r = ["a", "b", "c"], i = new dn(), l = new dn();
  return function(a, d = null, f = null) {
    const g = d || f ? i : null;
    if (this.intersectsTriangle(a, g))
      return (d || f) && (d && g.getCenter(d), f && g.getCenter(f)), 0;
    let p = 1 / 0;
    for (let m = 0; m < 3; m++) {
      let v;
      const x = r[m], _ = a[x];
      this.closestPointToPoint(_, o), v = _.distanceToSquared(o), v < p && (p = v, d && d.copy(o), f && f.copy(_));
      const P = this[x];
      a.closestPointToPoint(P, o), v = P.distanceToSquared(o), v < p && (p = v, d && d.copy(P), f && f.copy(o));
    }
    for (let m = 0; m < 3; m++) {
      const v = r[m], x = r[(m + 1) % 3];
      i.set(this[v], this[x]);
      for (let _ = 0; _ < 3; _++) {
        const P = r[_], T = r[(_ + 1) % 3];
        l.set(a[P], a[T]), Ka(i, l, o, n);
        const w = o.distanceToSquared(n);
        w < p && (p = w, d && d.copy(o), f && f.copy(n));
      }
    }
    return Math.sqrt(p);
  };
}();
class mt {
  constructor(n, r, i) {
    this.isOrientedBox = !0, this.min = new V(), this.max = new V(), this.matrix = new $e(), this.invMatrix = new $e(), this.points = new Array(8).fill().map(() => new V()), this.satAxes = new Array(3).fill().map(() => new V()), this.satBounds = new Array(3).fill().map(() => new En()), this.alignedSatBounds = new Array(3).fill().map(() => new En()), this.needsUpdate = !1, n && this.min.copy(n), r && this.max.copy(r), i && this.matrix.copy(i);
  }
  set(n, r, i) {
    this.min.copy(n), this.max.copy(r), this.matrix.copy(i), this.needsUpdate = !0;
  }
  copy(n) {
    this.min.copy(n.min), this.max.copy(n.max), this.matrix.copy(n.matrix), this.needsUpdate = !0;
  }
}
mt.prototype.update = function() {
  return function() {
    const n = this.matrix, r = this.min, i = this.max, l = this.points;
    for (let g = 0; g <= 1; g++)
      for (let p = 0; p <= 1; p++)
        for (let m = 0; m <= 1; m++) {
          const v = 1 * g | 2 * p | 4 * m, x = l[v];
          x.x = g ? i.x : r.x, x.y = p ? i.y : r.y, x.z = m ? i.z : r.z, x.applyMatrix4(n);
        }
    const u = this.satBounds, a = this.satAxes, d = l[0];
    for (let g = 0; g < 3; g++) {
      const p = a[g], m = u[g], v = 1 << g, x = l[v];
      p.subVectors(d, x), m.setFromPoints(p, l);
    }
    const f = this.alignedSatBounds;
    f[0].setFromPointsField(l, "x"), f[1].setFromPointsField(l, "y"), f[2].setFromPointsField(l, "z"), this.invMatrix.copy(this.matrix).invert(), this.needsUpdate = !1;
  };
}();
mt.prototype.intersectsBox = function() {
  const o = new En();
  return function(r) {
    this.needsUpdate && this.update();
    const i = r.min, l = r.max, u = this.satBounds, a = this.satAxes, d = this.alignedSatBounds;
    if (o.min = i.x, o.max = l.x, d[0].isSeparated(o) || (o.min = i.y, o.max = l.y, d[1].isSeparated(o)) || (o.min = i.z, o.max = l.z, d[2].isSeparated(o)))
      return !1;
    for (let f = 0; f < 3; f++) {
      const g = a[f], p = u[f];
      if (o.setFromBox(g, r), p.isSeparated(o))
        return !1;
    }
    return !0;
  };
}();
mt.prototype.intersectsTriangle = function() {
  const o = new Jt(), n = new Array(3), r = new En(), i = new En(), l = new V();
  return function(a) {
    this.needsUpdate && this.update(), a.isExtendedTriangle ? a.needsUpdate && a.update() : (o.copy(a), o.update(), a = o);
    const d = this.satBounds, f = this.satAxes;
    n[0] = a.a, n[1] = a.b, n[2] = a.c;
    for (let v = 0; v < 3; v++) {
      const x = d[v], _ = f[v];
      if (r.setFromPoints(_, n), x.isSeparated(r))
        return !1;
    }
    const g = a.satBounds, p = a.satAxes, m = this.points;
    for (let v = 0; v < 3; v++) {
      const x = g[v], _ = p[v];
      if (r.setFromPoints(_, m), x.isSeparated(r))
        return !1;
    }
    for (let v = 0; v < 3; v++) {
      const x = f[v];
      for (let _ = 0; _ < 4; _++) {
        const P = p[_];
        if (l.crossVectors(x, P), r.setFromPoints(l, n), i.setFromPoints(l, m), r.isSeparated(i))
          return !1;
      }
    }
    return !0;
  };
}();
mt.prototype.closestPointToPoint = function() {
  return function(n, r) {
    return this.needsUpdate && this.update(), r.copy(n).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix), r;
  };
}();
mt.prototype.distanceToPoint = function() {
  const o = new V();
  return function(r) {
    return this.closestPointToPoint(r, o), r.distanceTo(o);
  };
}();
mt.prototype.distanceToBox = function() {
  const o = ["x", "y", "z"], n = new Array(12).fill().map(() => new dn()), r = new Array(12).fill().map(() => new dn()), i = new V(), l = new V();
  return function(a, d = 0, f = null, g = null) {
    if (this.needsUpdate && this.update(), this.intersectsBox(a))
      return (f || g) && (a.getCenter(l), this.closestPointToPoint(l, i), a.closestPointToPoint(i, l), f && f.copy(i), g && g.copy(l)), 0;
    const p = d * d, m = a.min, v = a.max, x = this.points;
    let _ = 1 / 0;
    for (let T = 0; T < 8; T++) {
      const w = x[T];
      l.copy(w).clamp(m, v);
      const S = w.distanceToSquared(l);
      if (S < _ && (_ = S, f && f.copy(w), g && g.copy(l), S < p))
        return Math.sqrt(S);
    }
    let P = 0;
    for (let T = 0; T < 3; T++)
      for (let w = 0; w <= 1; w++)
        for (let S = 0; S <= 1; S++) {
          const E = (T + 1) % 3, A = (T + 2) % 3, M = w << E | S << A, L = 1 << T | w << E | S << A, R = x[M], z = x[L];
          n[P].set(R, z);
          const I = o[T], k = o[E], j = o[A], G = r[P], Y = G.start, ee = G.end;
          Y[I] = m[I], Y[k] = w ? m[k] : v[k], Y[j] = S ? m[j] : v[k], ee[I] = v[I], ee[k] = w ? m[k] : v[k], ee[j] = S ? m[j] : v[k], P++;
        }
    for (let T = 0; T <= 1; T++)
      for (let w = 0; w <= 1; w++)
        for (let S = 0; S <= 1; S++) {
          l.x = T ? v.x : m.x, l.y = w ? v.y : m.y, l.z = S ? v.z : m.z, this.closestPointToPoint(l, i);
          const E = l.distanceToSquared(i);
          if (E < _ && (_ = E, f && f.copy(i), g && g.copy(l), E < p))
            return Math.sqrt(E);
        }
    for (let T = 0; T < 12; T++) {
      const w = n[T];
      for (let S = 0; S < 12; S++) {
        const E = r[S];
        Ka(w, E, i, l);
        const A = i.distanceToSquared(l);
        if (A < _ && (_ = A, f && f.copy(i), g && g.copy(l), A < p))
          return Math.sqrt(A);
      }
    }
    return Math.sqrt(_);
  };
}();
class Ya {
  constructor(n) {
    this._getNewPrimitive = n, this._primitives = [];
  }
  getPrimitive() {
    const n = this._primitives;
    return n.length === 0 ? this._getNewPrimitive() : n.pop();
  }
  releasePrimitive(n) {
    this._primitives.push(n);
  }
}
class w0 extends Ya {
  constructor() {
    super(() => new Jt());
  }
}
const Gt = /* @__PURE__ */ new w0();
class S0 {
  constructor() {
    this.float32Array = null, this.uint16Array = null, this.uint32Array = null;
    const n = [];
    let r = null;
    this.setBuffer = (i) => {
      r && n.push(r), r = i, this.float32Array = new Float32Array(i), this.uint16Array = new Uint16Array(i), this.uint32Array = new Uint32Array(i);
    }, this.clearBuffer = () => {
      r = null, this.float32Array = null, this.uint16Array = null, this.uint32Array = null, n.length !== 0 && this.setBuffer(n.pop());
    };
  }
}
const Ne = new S0();
let Vn, Yr;
const zr = [], $s = /* @__PURE__ */ new Ya(() => new Ye());
function _0(o, n, r, i, l, u) {
  Vn = $s.getPrimitive(), Yr = $s.getPrimitive(), zr.push(Vn, Yr), Ne.setBuffer(o._roots[n]);
  const a = Ma(0, o.geometry, r, i, l, u);
  Ne.clearBuffer(), $s.releasePrimitive(Vn), $s.releasePrimitive(Yr), zr.pop(), zr.pop();
  const d = zr.length;
  return d > 0 && (Yr = zr[d - 1], Vn = zr[d - 2]), a;
}
function Ma(o, n, r, i, l = null, u = 0, a = 0) {
  const { float32Array: d, uint16Array: f, uint32Array: g } = Ne;
  let p = o * 2;
  if (Et(p, f)) {
    const v = Mt(o, g), x = Ut(p, f);
    return ke(o, d, Vn), i(v, x, !1, a, u + o, Vn);
  } else {
    let I = function(j) {
      const { uint16Array: G, uint32Array: Y } = Ne;
      let ee = j * 2;
      for (; !Et(ee, G); )
        j = Ht(j), ee = j * 2;
      return Mt(j, Y);
    }, k = function(j) {
      const { uint16Array: G, uint32Array: Y } = Ne;
      let ee = j * 2;
      for (; !Et(ee, G); )
        j = Vt(j, Y), ee = j * 2;
      return Mt(j, Y) + Ut(ee, G);
    };
    const v = Ht(o), x = Vt(o, g);
    let _ = v, P = x, T, w, S, E;
    if (l && (S = Vn, E = Yr, ke(_, d, S), ke(P, d, E), T = l(S), w = l(E), w < T)) {
      _ = x, P = v;
      const j = T;
      T = w, w = j, S = E;
    }
    S || (S = Vn, ke(_, d, S));
    const A = Et(_ * 2, f), M = r(S, A, T, a + 1, u + _);
    let L;
    if (M === vf) {
      const j = I(_), Y = k(_) - j;
      L = i(j, Y, !0, a + 1, u + _, S);
    } else
      L = M && Ma(
        _,
        n,
        r,
        i,
        l,
        u,
        a + 1
      );
    if (L)
      return !0;
    E = Yr, ke(P, d, E);
    const R = Et(P * 2, f), z = r(E, R, w, a + 1, u + P);
    let b;
    if (z === vf) {
      const j = I(P), Y = k(P) - j;
      b = i(j, Y, !0, a + 1, u + P, E);
    } else
      b = z && Ma(
        P,
        n,
        r,
        i,
        l,
        u,
        a + 1
      );
    return !!b;
  }
}
const Ri = /* @__PURE__ */ new V(), ra = /* @__PURE__ */ new V();
function E0(o, n, r = {}, i = 0, l = 1 / 0) {
  const u = i * i, a = l * l;
  let d = 1 / 0, f = null;
  if (o.shapecast(
    {
      boundsTraverseOrder: (p) => (Ri.copy(n).clamp(p.min, p.max), Ri.distanceToSquared(n)),
      intersectsBounds: (p, m, v) => v < d && v < a,
      intersectsTriangle: (p, m) => {
        p.closestPointToPoint(n, Ri);
        const v = n.distanceToSquared(Ri);
        return v < d && (ra.copy(Ri), d = v, f = m), v < u;
      }
    }
  ), d === 1 / 0)
    return null;
  const g = Math.sqrt(d);
  return r.point ? r.point.copy(ra) : r.point = ra.clone(), r.distance = g, r.faceIndex = f, r;
}
const Or = /* @__PURE__ */ new V(), Dr = /* @__PURE__ */ new V(), br = /* @__PURE__ */ new V(), eo = /* @__PURE__ */ new ye(), to = /* @__PURE__ */ new ye(), no = /* @__PURE__ */ new ye(), _f = /* @__PURE__ */ new V(), Ef = /* @__PURE__ */ new V(), Tf = /* @__PURE__ */ new V(), ro = /* @__PURE__ */ new V();
function T0(o, n, r, i, l, u) {
  let a;
  return u === Kf ? a = o.intersectTriangle(i, r, n, !0, l) : a = o.intersectTriangle(n, r, i, u !== Gf, l), a === null ? null : {
    distance: o.origin.distanceTo(l),
    point: l.clone()
  };
}
function A0(o, n, r, i, l, u, a, d, f) {
  Or.fromBufferAttribute(n, u), Dr.fromBufferAttribute(n, a), br.fromBufferAttribute(n, d);
  const g = T0(o, Or, Dr, br, ro, f);
  if (g) {
    i && (eo.fromBufferAttribute(i, u), to.fromBufferAttribute(i, a), no.fromBufferAttribute(i, d), g.uv = Di.getInterpolation(ro, Or, Dr, br, eo, to, no, new ye())), l && (eo.fromBufferAttribute(l, u), to.fromBufferAttribute(l, a), no.fromBufferAttribute(l, d), g.uv1 = Di.getInterpolation(ro, Or, Dr, br, eo, to, no, new ye())), r && (_f.fromBufferAttribute(r, u), Ef.fromBufferAttribute(r, a), Tf.fromBufferAttribute(r, d), g.normal = Di.getInterpolation(ro, Or, Dr, br, _f, Ef, Tf, new V()), g.normal.dot(o.direction) > 0 && g.normal.multiplyScalar(-1));
    const p = {
      a: u,
      b: a,
      c: d,
      normal: new V(),
      materialIndex: 0
    };
    Di.getNormal(Or, Dr, br, p.normal), g.face = p, g.faceIndex = u;
  }
  return g;
}
function So(o, n, r, i, l) {
  const u = i * 3;
  let a = u + 0, d = u + 1, f = u + 2;
  const g = o.index;
  o.index && (a = g.getX(a), d = g.getX(d), f = g.getX(f));
  const { position: p, normal: m, uv: v, uv1: x } = o.attributes, _ = A0(r, p, m, v, x, a, d, f, n);
  return _ ? (_.faceIndex = i, l && l.push(_), _) : null;
}
function Ke(o, n, r, i) {
  const l = o.a, u = o.b, a = o.c;
  let d = n, f = n + 1, g = n + 2;
  r && (d = r.getX(d), f = r.getX(f), g = r.getX(g)), l.x = i.getX(d), l.y = i.getY(d), l.z = i.getZ(d), u.x = i.getX(f), u.y = i.getY(f), u.z = i.getZ(f), a.x = i.getX(g), a.y = i.getY(g), a.z = i.getZ(g);
}
function P0(o, n, r, i, l, u) {
  const { geometry: a, _indirectBuffer: d } = o;
  for (let f = i, g = i + l; f < g; f++)
    So(a, n, r, f, u);
}
function C0(o, n, r, i, l) {
  const { geometry: u, _indirectBuffer: a } = o;
  let d = 1 / 0, f = null;
  for (let g = i, p = i + l; g < p; g++) {
    let m;
    m = So(u, n, r, g), m && m.distance < d && (f = m, d = m.distance);
  }
  return f;
}
function M0(o, n, r, i, l, u, a) {
  const { geometry: d } = r, { index: f } = d, g = d.attributes.position;
  for (let p = o, m = n + o; p < m; p++) {
    let v;
    if (v = p, Ke(a, v * 3, f, g), a.needsUpdate = !0, i(a, v, l, u))
      return !0;
  }
  return !1;
}
function L0(o, n = null) {
  n && Array.isArray(n) && (n = new Set(n));
  const r = o.geometry, i = r.index ? r.index.array : null, l = r.attributes.position;
  let u, a, d, f, g = 0;
  const p = o._roots;
  for (let v = 0, x = p.length; v < x; v++)
    u = p[v], a = new Uint32Array(u), d = new Uint16Array(u), f = new Float32Array(u), m(0, g), g += u.byteLength;
  function m(v, x, _ = !1) {
    const P = v * 2;
    if (d[P + 15] === wo) {
      const w = a[v + 6], S = d[P + 14];
      let E = 1 / 0, A = 1 / 0, M = 1 / 0, L = -1 / 0, R = -1 / 0, z = -1 / 0;
      for (let b = 3 * w, I = 3 * (w + S); b < I; b++) {
        let k = i[b];
        const j = l.getX(k), G = l.getY(k), Y = l.getZ(k);
        j < E && (E = j), j > L && (L = j), G < A && (A = G), G > R && (R = G), Y < M && (M = Y), Y > z && (z = Y);
      }
      return f[v + 0] !== E || f[v + 1] !== A || f[v + 2] !== M || f[v + 3] !== L || f[v + 4] !== R || f[v + 5] !== z ? (f[v + 0] = E, f[v + 1] = A, f[v + 2] = M, f[v + 3] = L, f[v + 4] = R, f[v + 5] = z, !0) : !1;
    } else {
      const w = v + 8, S = a[v + 6], E = w + x, A = S + x;
      let M = _, L = !1, R = !1;
      n ? M || (L = n.has(E), R = n.has(A), M = !L && !R) : (L = !0, R = !0);
      const z = M || L, b = M || R;
      let I = !1;
      z && (I = m(w, x, M));
      let k = !1;
      b && (k = m(S, x, M));
      const j = I || k;
      if (j)
        for (let G = 0; G < 3; G++) {
          const Y = w + G, ee = S + G, ae = f[Y], Se = f[Y + 3], W = f[ee], J = f[ee + 3];
          f[v + G] = ae < W ? ae : W, f[v + G + 3] = Se > J ? Se : J;
        }
      return j;
    }
  }
}
const Af = /* @__PURE__ */ new Ye();
function Xn(o, n, r, i) {
  return ke(o, n, Af), r.intersectBox(Af, i);
}
function R0(o, n, r, i, l, u) {
  const { geometry: a, _indirectBuffer: d } = o;
  for (let f = i, g = i + l; f < g; f++) {
    let p = d ? d[f] : f;
    So(a, n, r, p, u);
  }
}
function N0(o, n, r, i, l) {
  const { geometry: u, _indirectBuffer: a } = o;
  let d = 1 / 0, f = null;
  for (let g = i, p = i + l; g < p; g++) {
    let m;
    m = So(u, n, r, a ? a[g] : g), m && m.distance < d && (f = m, d = m.distance);
  }
  return f;
}
function I0(o, n, r, i, l, u, a) {
  const { geometry: d } = r, { index: f } = d, g = d.attributes.position;
  for (let p = o, m = n + o; p < m; p++) {
    let v;
    if (v = r.resolveTriangleIndex(p), Ke(a, v * 3, f, g), a.needsUpdate = !0, i(a, v, l, u))
      return !0;
  }
  return !1;
}
const Pf = /* @__PURE__ */ new V();
function z0(o, n, r, i, l) {
  Ne.setBuffer(o._roots[n]), La(0, o, r, i, l), Ne.clearBuffer();
}
function La(o, n, r, i, l) {
  const { float32Array: u, uint16Array: a, uint32Array: d } = Ne, f = o * 2;
  if (Et(f, a)) {
    const p = Mt(o, d), m = Ut(f, a);
    P0(n, r, i, p, m, l);
  } else {
    const p = Ht(o);
    Xn(p, u, i, Pf) && La(p, n, r, i, l);
    const m = Vt(o, d);
    Xn(m, u, i, Pf) && La(m, n, r, i, l);
  }
}
const Cf = /* @__PURE__ */ new V(), O0 = ["x", "y", "z"];
function D0(o, n, r, i) {
  Ne.setBuffer(o._roots[n]);
  const l = Ra(0, o, r, i);
  return Ne.clearBuffer(), l;
}
function Ra(o, n, r, i) {
  const { float32Array: l, uint16Array: u, uint32Array: a } = Ne;
  let d = o * 2;
  if (Et(d, u)) {
    const g = Mt(o, a), p = Ut(d, u);
    return C0(n, r, i, g, p);
  } else {
    const g = Md(o, a), p = O0[g], v = i.direction[p] >= 0;
    let x, _;
    v ? (x = Ht(o), _ = Vt(o, a)) : (x = Vt(o, a), _ = Ht(o));
    const T = Xn(x, l, i, Cf) ? Ra(x, n, r, i) : null;
    if (T) {
      const E = T.point[p];
      if (v ? E <= l[_ + g] : (
        // min bounding data
        E >= l[_ + g + 3]
      ))
        return T;
    }
    const S = Xn(_, l, i, Cf) ? Ra(_, n, r, i) : null;
    return T && S ? T.distance <= S.distance ? T : S : T || S || null;
  }
}
const io = /* @__PURE__ */ new Ye(), kr = /* @__PURE__ */ new Jt(), Fr = /* @__PURE__ */ new Jt(), Ni = /* @__PURE__ */ new $e(), Mf = /* @__PURE__ */ new mt(), so = /* @__PURE__ */ new mt();
function b0(o, n, r, i) {
  Ne.setBuffer(o._roots[n]);
  const l = Na(0, o, r, i);
  return Ne.clearBuffer(), l;
}
function Na(o, n, r, i, l = null) {
  const { float32Array: u, uint16Array: a, uint32Array: d } = Ne;
  let f = o * 2;
  if (l === null && (r.boundingBox || r.computeBoundingBox(), Mf.set(r.boundingBox.min, r.boundingBox.max, i), l = Mf), Et(f, a)) {
    const p = n.geometry, m = p.index, v = p.attributes.position, x = r.index, _ = r.attributes.position, P = Mt(o, d), T = Ut(f, a);
    if (Ni.copy(i).invert(), r.boundsTree)
      return ke(o, u, so), so.matrix.copy(Ni), so.needsUpdate = !0, r.boundsTree.shapecast({
        intersectsBounds: (S) => so.intersectsBox(S),
        intersectsTriangle: (S) => {
          S.a.applyMatrix4(i), S.b.applyMatrix4(i), S.c.applyMatrix4(i), S.needsUpdate = !0;
          for (let E = P * 3, A = (T + P) * 3; E < A; E += 3)
            if (Ke(Fr, E, m, v), Fr.needsUpdate = !0, S.intersectsTriangle(Fr))
              return !0;
          return !1;
        }
      });
    for (let w = P * 3, S = (T + P) * 3; w < S; w += 3) {
      Ke(kr, w, m, v), kr.a.applyMatrix4(Ni), kr.b.applyMatrix4(Ni), kr.c.applyMatrix4(Ni), kr.needsUpdate = !0;
      for (let E = 0, A = x.count; E < A; E += 3)
        if (Ke(Fr, E, x, _), Fr.needsUpdate = !0, kr.intersectsTriangle(Fr))
          return !0;
    }
  } else {
    const p = o + 8, m = d[o + 6];
    return ke(p, u, io), !!(l.intersectsBox(io) && Na(p, n, r, i, l) || (ke(m, u, io), l.intersectsBox(io) && Na(m, n, r, i, l)));
  }
}
const oo = /* @__PURE__ */ new $e(), ia = /* @__PURE__ */ new mt(), Ii = /* @__PURE__ */ new mt(), k0 = /* @__PURE__ */ new V(), F0 = /* @__PURE__ */ new V(), B0 = /* @__PURE__ */ new V(), j0 = /* @__PURE__ */ new V();
function U0(o, n, r, i = {}, l = {}, u = 0, a = 1 / 0) {
  n.boundingBox || n.computeBoundingBox(), ia.set(n.boundingBox.min, n.boundingBox.max, r), ia.needsUpdate = !0;
  const d = o.geometry, f = d.attributes.position, g = d.index, p = n.attributes.position, m = n.index, v = Gt.getPrimitive(), x = Gt.getPrimitive();
  let _ = k0, P = F0, T = null, w = null;
  l && (T = B0, w = j0);
  let S = 1 / 0, E = null, A = null;
  return oo.copy(r).invert(), Ii.matrix.copy(oo), o.shapecast(
    {
      boundsTraverseOrder: (M) => ia.distanceToBox(M),
      intersectsBounds: (M, L, R) => R < S && R < a ? (L && (Ii.min.copy(M.min), Ii.max.copy(M.max), Ii.needsUpdate = !0), !0) : !1,
      intersectsRange: (M, L) => {
        if (n.boundsTree)
          return n.boundsTree.shapecast({
            boundsTraverseOrder: (z) => Ii.distanceToBox(z),
            intersectsBounds: (z, b, I) => I < S && I < a,
            intersectsRange: (z, b) => {
              for (let I = z, k = z + b; I < k; I++) {
                Ke(x, 3 * I, m, p), x.a.applyMatrix4(r), x.b.applyMatrix4(r), x.c.applyMatrix4(r), x.needsUpdate = !0;
                for (let j = M, G = M + L; j < G; j++) {
                  Ke(v, 3 * j, g, f), v.needsUpdate = !0;
                  const Y = v.distanceToTriangle(x, _, T);
                  if (Y < S && (P.copy(_), w && w.copy(T), S = Y, E = j, A = I), Y < u)
                    return !0;
                }
              }
            }
          });
        {
          const R = $r(n);
          for (let z = 0, b = R; z < b; z++) {
            Ke(x, 3 * z, m, p), x.a.applyMatrix4(r), x.b.applyMatrix4(r), x.c.applyMatrix4(r), x.needsUpdate = !0;
            for (let I = M, k = M + L; I < k; I++) {
              Ke(v, 3 * I, g, f), v.needsUpdate = !0;
              const j = v.distanceToTriangle(x, _, T);
              if (j < S && (P.copy(_), w && w.copy(T), S = j, E = I, A = z), j < u)
                return !0;
            }
          }
        }
      }
    }
  ), Gt.releasePrimitive(v), Gt.releasePrimitive(x), S === 1 / 0 ? null : (i.point ? i.point.copy(P) : i.point = P.clone(), i.distance = S, i.faceIndex = E, l && (l.point ? l.point.copy(w) : l.point = w.clone(), l.point.applyMatrix4(oo), P.applyMatrix4(oo), l.distance = P.sub(l.point).length(), l.faceIndex = A), i);
}
function H0(o, n = null) {
  n && Array.isArray(n) && (n = new Set(n));
  const r = o.geometry, i = r.index ? r.index.array : null, l = r.attributes.position;
  let u, a, d, f, g = 0;
  const p = o._roots;
  for (let v = 0, x = p.length; v < x; v++)
    u = p[v], a = new Uint32Array(u), d = new Uint16Array(u), f = new Float32Array(u), m(0, g), g += u.byteLength;
  function m(v, x, _ = !1) {
    const P = v * 2;
    if (d[P + 15] === wo) {
      const w = a[v + 6], S = d[P + 14];
      let E = 1 / 0, A = 1 / 0, M = 1 / 0, L = -1 / 0, R = -1 / 0, z = -1 / 0;
      for (let b = w, I = w + S; b < I; b++) {
        const k = 3 * o.resolveTriangleIndex(b);
        for (let j = 0; j < 3; j++) {
          let G = k + j;
          G = i ? i[G] : G;
          const Y = l.getX(G), ee = l.getY(G), ae = l.getZ(G);
          Y < E && (E = Y), Y > L && (L = Y), ee < A && (A = ee), ee > R && (R = ee), ae < M && (M = ae), ae > z && (z = ae);
        }
      }
      return f[v + 0] !== E || f[v + 1] !== A || f[v + 2] !== M || f[v + 3] !== L || f[v + 4] !== R || f[v + 5] !== z ? (f[v + 0] = E, f[v + 1] = A, f[v + 2] = M, f[v + 3] = L, f[v + 4] = R, f[v + 5] = z, !0) : !1;
    } else {
      const w = v + 8, S = a[v + 6], E = w + x, A = S + x;
      let M = _, L = !1, R = !1;
      n ? M || (L = n.has(E), R = n.has(A), M = !L && !R) : (L = !0, R = !0);
      const z = M || L, b = M || R;
      let I = !1;
      z && (I = m(w, x, M));
      let k = !1;
      b && (k = m(S, x, M));
      const j = I || k;
      if (j)
        for (let G = 0; G < 3; G++) {
          const Y = w + G, ee = S + G, ae = f[Y], Se = f[Y + 3], W = f[ee], J = f[ee + 3];
          f[v + G] = ae < W ? ae : W, f[v + G + 3] = Se > J ? Se : J;
        }
      return j;
    }
  }
}
const Lf = /* @__PURE__ */ new V();
function V0(o, n, r, i, l) {
  Ne.setBuffer(o._roots[n]), Ia(0, o, r, i, l), Ne.clearBuffer();
}
function Ia(o, n, r, i, l) {
  const { float32Array: u, uint16Array: a, uint32Array: d } = Ne, f = o * 2;
  if (Et(f, a)) {
    const p = Mt(o, d), m = Ut(f, a);
    R0(n, r, i, p, m, l);
  } else {
    const p = Ht(o);
    Xn(p, u, i, Lf) && Ia(p, n, r, i, l);
    const m = Vt(o, d);
    Xn(m, u, i, Lf) && Ia(m, n, r, i, l);
  }
}
const Rf = /* @__PURE__ */ new V(), G0 = ["x", "y", "z"];
function W0(o, n, r, i) {
  Ne.setBuffer(o._roots[n]);
  const l = za(0, o, r, i);
  return Ne.clearBuffer(), l;
}
function za(o, n, r, i) {
  const { float32Array: l, uint16Array: u, uint32Array: a } = Ne;
  let d = o * 2;
  if (Et(d, u)) {
    const g = Mt(o, a), p = Ut(d, u);
    return N0(n, r, i, g, p);
  } else {
    const g = Md(o, a), p = G0[g], v = i.direction[p] >= 0;
    let x, _;
    v ? (x = Ht(o), _ = Vt(o, a)) : (x = Vt(o, a), _ = Ht(o));
    const T = Xn(x, l, i, Rf) ? za(x, n, r, i) : null;
    if (T) {
      const E = T.point[p];
      if (v ? E <= l[_ + g] : (
        // min bounding data
        E >= l[_ + g + 3]
      ))
        return T;
    }
    const S = Xn(_, l, i, Rf) ? za(_, n, r, i) : null;
    return T && S ? T.distance <= S.distance ? T : S : T || S || null;
  }
}
const lo = /* @__PURE__ */ new Ye(), Br = /* @__PURE__ */ new Jt(), jr = /* @__PURE__ */ new Jt(), zi = /* @__PURE__ */ new $e(), Nf = /* @__PURE__ */ new mt(), ao = /* @__PURE__ */ new mt();
function X0(o, n, r, i) {
  Ne.setBuffer(o._roots[n]);
  const l = Oa(0, o, r, i);
  return Ne.clearBuffer(), l;
}
function Oa(o, n, r, i, l = null) {
  const { float32Array: u, uint16Array: a, uint32Array: d } = Ne;
  let f = o * 2;
  if (l === null && (r.boundingBox || r.computeBoundingBox(), Nf.set(r.boundingBox.min, r.boundingBox.max, i), l = Nf), Et(f, a)) {
    const p = n.geometry, m = p.index, v = p.attributes.position, x = r.index, _ = r.attributes.position, P = Mt(o, d), T = Ut(f, a);
    if (zi.copy(i).invert(), r.boundsTree)
      return ke(o, u, ao), ao.matrix.copy(zi), ao.needsUpdate = !0, r.boundsTree.shapecast({
        intersectsBounds: (S) => ao.intersectsBox(S),
        intersectsTriangle: (S) => {
          S.a.applyMatrix4(i), S.b.applyMatrix4(i), S.c.applyMatrix4(i), S.needsUpdate = !0;
          for (let E = P, A = T + P; E < A; E++)
            if (Ke(jr, 3 * n.resolveTriangleIndex(E), m, v), jr.needsUpdate = !0, S.intersectsTriangle(jr))
              return !0;
          return !1;
        }
      });
    for (let w = P, S = T + P; w < S; w++) {
      const E = n.resolveTriangleIndex(w);
      Ke(Br, 3 * E, m, v), Br.a.applyMatrix4(zi), Br.b.applyMatrix4(zi), Br.c.applyMatrix4(zi), Br.needsUpdate = !0;
      for (let A = 0, M = x.count; A < M; A += 3)
        if (Ke(jr, A, x, _), jr.needsUpdate = !0, Br.intersectsTriangle(jr))
          return !0;
    }
  } else {
    const p = o + 8, m = d[o + 6];
    return ke(p, u, lo), !!(l.intersectsBox(lo) && Oa(p, n, r, i, l) || (ke(m, u, lo), l.intersectsBox(lo) && Oa(m, n, r, i, l)));
  }
}
const uo = /* @__PURE__ */ new $e(), sa = /* @__PURE__ */ new mt(), Oi = /* @__PURE__ */ new mt(), K0 = /* @__PURE__ */ new V(), Y0 = /* @__PURE__ */ new V(), Q0 = /* @__PURE__ */ new V(), q0 = /* @__PURE__ */ new V();
function Z0(o, n, r, i = {}, l = {}, u = 0, a = 1 / 0) {
  n.boundingBox || n.computeBoundingBox(), sa.set(n.boundingBox.min, n.boundingBox.max, r), sa.needsUpdate = !0;
  const d = o.geometry, f = d.attributes.position, g = d.index, p = n.attributes.position, m = n.index, v = Gt.getPrimitive(), x = Gt.getPrimitive();
  let _ = K0, P = Y0, T = null, w = null;
  l && (T = Q0, w = q0);
  let S = 1 / 0, E = null, A = null;
  return uo.copy(r).invert(), Oi.matrix.copy(uo), o.shapecast(
    {
      boundsTraverseOrder: (M) => sa.distanceToBox(M),
      intersectsBounds: (M, L, R) => R < S && R < a ? (L && (Oi.min.copy(M.min), Oi.max.copy(M.max), Oi.needsUpdate = !0), !0) : !1,
      intersectsRange: (M, L) => {
        if (n.boundsTree) {
          const R = n.boundsTree;
          return R.shapecast({
            boundsTraverseOrder: (z) => Oi.distanceToBox(z),
            intersectsBounds: (z, b, I) => I < S && I < a,
            intersectsRange: (z, b) => {
              for (let I = z, k = z + b; I < k; I++) {
                const j = R.resolveTriangleIndex(I);
                Ke(x, 3 * j, m, p), x.a.applyMatrix4(r), x.b.applyMatrix4(r), x.c.applyMatrix4(r), x.needsUpdate = !0;
                for (let G = M, Y = M + L; G < Y; G++) {
                  const ee = o.resolveTriangleIndex(G);
                  Ke(v, 3 * ee, g, f), v.needsUpdate = !0;
                  const ae = v.distanceToTriangle(x, _, T);
                  if (ae < S && (P.copy(_), w && w.copy(T), S = ae, E = G, A = I), ae < u)
                    return !0;
                }
              }
            }
          });
        } else {
          const R = $r(n);
          for (let z = 0, b = R; z < b; z++) {
            Ke(x, 3 * z, m, p), x.a.applyMatrix4(r), x.b.applyMatrix4(r), x.c.applyMatrix4(r), x.needsUpdate = !0;
            for (let I = M, k = M + L; I < k; I++) {
              const j = o.resolveTriangleIndex(I);
              Ke(v, 3 * j, g, f), v.needsUpdate = !0;
              const G = v.distanceToTriangle(x, _, T);
              if (G < S && (P.copy(_), w && w.copy(T), S = G, E = I, A = z), G < u)
                return !0;
            }
          }
        }
      }
    }
  ), Gt.releasePrimitive(v), Gt.releasePrimitive(x), S === 1 / 0 ? null : (i.point ? i.point.copy(P) : i.point = P.clone(), i.distance = S, i.faceIndex = E, l && (l.point ? l.point.copy(w) : l.point = w.clone(), l.point.applyMatrix4(uo), P.applyMatrix4(uo), l.distance = P.sub(l.point).length(), l.faceIndex = A), i);
}
function J0() {
  return typeof SharedArrayBuffer < "u";
}
const Bi = new Ne.constructor(), yo = new Ne.constructor(), Hn = new Ya(() => new Ye()), Ur = new Ye(), Hr = new Ye(), oa = new Ye(), la = new Ye();
let aa = !1;
function $0(o, n, r, i) {
  if (aa)
    throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");
  aa = !0;
  const l = o._roots, u = n._roots;
  let a, d = 0, f = 0;
  const g = new $e().copy(r).invert();
  for (let p = 0, m = l.length; p < m; p++) {
    Bi.setBuffer(l[p]), f = 0;
    const v = Hn.getPrimitive();
    ke(0, Bi.float32Array, v), v.applyMatrix4(g);
    for (let x = 0, _ = u.length; x < _ && (yo.setBuffer(u[p]), a = Zt(
      0,
      0,
      r,
      g,
      i,
      d,
      f,
      0,
      0,
      v
    ), yo.clearBuffer(), f += u[x].length, !a); x++)
      ;
    if (Hn.releasePrimitive(v), Bi.clearBuffer(), d += l[p].length, a)
      break;
  }
  return aa = !1, a;
}
function Zt(o, n, r, i, l, u = 0, a = 0, d = 0, f = 0, g = null, p = !1) {
  let m, v;
  p ? (m = yo, v = Bi) : (m = Bi, v = yo);
  const x = m.float32Array, _ = m.uint32Array, P = m.uint16Array, T = v.float32Array, w = v.uint32Array, S = v.uint16Array, E = o * 2, A = n * 2, M = Et(E, P), L = Et(A, S);
  let R = !1;
  if (L && M)
    p ? R = l(
      Mt(n, w),
      Ut(n * 2, S),
      Mt(o, _),
      Ut(o * 2, P),
      f,
      a + n,
      d,
      u + o
    ) : R = l(
      Mt(o, _),
      Ut(o * 2, P),
      Mt(n, w),
      Ut(n * 2, S),
      d,
      u + o,
      f,
      a + n
    );
  else if (L) {
    const z = Hn.getPrimitive();
    ke(n, T, z), z.applyMatrix4(r);
    const b = Ht(o), I = Vt(o, _);
    ke(b, x, Ur), ke(I, x, Hr);
    const k = z.intersectsBox(Ur), j = z.intersectsBox(Hr);
    R = k && Zt(
      n,
      b,
      i,
      r,
      l,
      a,
      u,
      f,
      d + 1,
      z,
      !p
    ) || j && Zt(
      n,
      I,
      i,
      r,
      l,
      a,
      u,
      f,
      d + 1,
      z,
      !p
    ), Hn.releasePrimitive(z);
  } else {
    const z = Ht(n), b = Vt(n, w);
    ke(z, T, oa), ke(b, T, la);
    const I = g.intersectsBox(oa), k = g.intersectsBox(la);
    if (I && k)
      R = Zt(
        o,
        z,
        r,
        i,
        l,
        u,
        a,
        d,
        f + 1,
        g,
        p
      ) || Zt(
        o,
        b,
        r,
        i,
        l,
        u,
        a,
        d,
        f + 1,
        g,
        p
      );
    else if (I)
      if (M)
        R = Zt(
          o,
          z,
          r,
          i,
          l,
          u,
          a,
          d,
          f + 1,
          g,
          p
        );
      else {
        const j = Hn.getPrimitive();
        j.copy(oa).applyMatrix4(r);
        const G = Ht(o), Y = Vt(o, _);
        ke(G, x, Ur), ke(Y, x, Hr);
        const ee = j.intersectsBox(Ur), ae = j.intersectsBox(Hr);
        R = ee && Zt(
          z,
          G,
          i,
          r,
          l,
          a,
          u,
          f,
          d + 1,
          j,
          !p
        ) || ae && Zt(
          z,
          Y,
          i,
          r,
          l,
          a,
          u,
          f,
          d + 1,
          j,
          !p
        ), Hn.releasePrimitive(j);
      }
    else if (k)
      if (M)
        R = Zt(
          o,
          b,
          r,
          i,
          l,
          u,
          a,
          d,
          f + 1,
          g,
          p
        );
      else {
        const j = Hn.getPrimitive();
        j.copy(la).applyMatrix4(r);
        const G = Ht(o), Y = Vt(o, _);
        ke(G, x, Ur), ke(Y, x, Hr);
        const ee = j.intersectsBox(Ur), ae = j.intersectsBox(Hr);
        R = ee && Zt(
          b,
          G,
          i,
          r,
          l,
          a,
          u,
          f,
          d + 1,
          j,
          !p
        ) || ae && Zt(
          b,
          Y,
          i,
          r,
          l,
          a,
          u,
          f,
          d + 1,
          j,
          !p
        ), Hn.releasePrimitive(j);
      }
  }
  return R;
}
const co = /* @__PURE__ */ new mt(), If = /* @__PURE__ */ new Ye(), ev = {
  strategy: Td,
  maxDepth: 40,
  maxLeafTris: 10,
  useSharedArrayBuffer: !1,
  setBoundingBox: !0,
  onProgress: null,
  indirect: !1,
  verbose: !0
};
class Qa {
  static serialize(n, r = {}) {
    r = {
      cloneBuffers: !0,
      ...r
    };
    const i = n.geometry, l = n._roots, u = n._indirectBuffer, a = i.getIndex();
    let d;
    return r.cloneBuffers ? d = {
      roots: l.map((f) => f.slice()),
      index: a.array.slice(),
      indirectBuffer: u ? u.slice() : null
    } : d = {
      roots: l,
      index: a.array,
      indirectBuffer: u
    }, d;
  }
  static deserialize(n, r, i = {}) {
    i = {
      setIndex: !0,
      indirect: !!n.indirectBuffer,
      ...i
    };
    const { index: l, roots: u, indirectBuffer: a } = n, d = new Qa(r, { ...i, [$l]: !0 });
    if (d._roots = u, d._indirectBuffer = a || null, i.setIndex) {
      const f = r.getIndex();
      if (f === null) {
        const g = new ki(n.index, 1, !1);
        r.setIndex(g);
      } else
        f.array !== l && (f.array.set(l), f.needsUpdate = !0);
    }
    return d;
  }
  get indirect() {
    return !!this._indirectBuffer;
  }
  constructor(n, r = {}) {
    if (n.isBufferGeometry) {
      if (n.index && n.index.isInterleavedBufferAttribute)
        throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.");
    } else
      throw new Error("MeshBVH: Only BufferGeometries are supported.");
    if (r = Object.assign({
      ...ev,
      // undocumented options
      // Whether to skip generating the tree. Used for deserialization.
      [$l]: !1
    }, r), r.useSharedArrayBuffer && !J0())
      throw new Error("MeshBVH: SharedArrayBuffer is not available.");
    this.geometry = n, this._roots = null, this._indirectBuffer = null, r[$l] || (g0(this, r), !n.boundingBox && r.setBoundingBox && (n.boundingBox = this.getBoundingBox(new Ye())));
    const { _indirectBuffer: i } = this;
    this.resolveTriangleIndex = r.indirect ? (l) => i[l] : (l) => l;
  }
  refit(n = null) {
    return (this.indirect ? H0 : L0)(this, n);
  }
  traverse(n, r = 0) {
    const i = this._roots[r], l = new Uint32Array(i), u = new Uint16Array(i);
    a(0);
    function a(d, f = 0) {
      const g = d * 2, p = u[g + 15] === wo;
      if (p) {
        const m = l[d + 6], v = u[g + 14];
        n(f, p, new Float32Array(i, d * 4, 6), m, v);
      } else {
        const m = d + Fi / 4, v = l[d + 6], x = l[d + 7];
        n(f, p, new Float32Array(i, d * 4, 6), x) || (a(m, f + 1), a(v, f + 1));
      }
    }
  }
  /* Core Cast Functions */
  raycast(n, r = qr) {
    const i = this._roots, l = this.geometry, u = [], a = r.isMaterial, d = Array.isArray(r), f = l.groups, g = a ? r.side : r, p = this.indirect ? V0 : z0;
    for (let m = 0, v = i.length; m < v; m++) {
      const x = d ? r[f[m].materialIndex].side : g, _ = u.length;
      if (p(this, m, x, n, u), d) {
        const P = f[m].materialIndex;
        for (let T = _, w = u.length; T < w; T++)
          u[T].face.materialIndex = P;
      }
    }
    return u;
  }
  raycastFirst(n, r = qr) {
    const i = this._roots, l = this.geometry, u = r.isMaterial, a = Array.isArray(r);
    let d = null;
    const f = l.groups, g = u ? r.side : r, p = this.indirect ? W0 : D0;
    for (let m = 0, v = i.length; m < v; m++) {
      const x = a ? r[f[m].materialIndex].side : g, _ = p(this, m, x, n);
      _ != null && (d == null || _.distance < d.distance) && (d = _, a && (_.face.materialIndex = f[m].materialIndex));
    }
    return d;
  }
  intersectsGeometry(n, r) {
    let i = !1;
    const l = this._roots, u = this.indirect ? X0 : b0;
    for (let a = 0, d = l.length; a < d && (i = u(this, a, n, r), !i); a++)
      ;
    return i;
  }
  shapecast(n) {
    const r = Gt.getPrimitive(), i = this.indirect ? I0 : M0;
    let {
      boundsTraverseOrder: l,
      intersectsBounds: u,
      intersectsRange: a,
      intersectsTriangle: d
    } = n;
    if (a && d) {
      const m = a;
      a = (v, x, _, P, T) => m(v, x, _, P, T) ? !0 : i(v, x, this, d, _, P, r);
    } else
      a || (d ? a = (m, v, x, _) => i(m, v, this, d, x, _, r) : a = (m, v, x) => x);
    let f = !1, g = 0;
    const p = this._roots;
    for (let m = 0, v = p.length; m < v; m++) {
      const x = p[m];
      if (f = _0(this, m, u, a, l, g), f)
        break;
      g += x.byteLength;
    }
    return Gt.releasePrimitive(r), f;
  }
  bvhcast(n, r, i) {
    let {
      intersectsRanges: l,
      intersectsTriangles: u
    } = i;
    const a = Gt.getPrimitive(), d = this.geometry.index, f = this.geometry.attributes.position, g = this.indirect ? (_) => {
      const P = this.resolveTriangleIndex(_);
      Ke(a, P * 3, d, f);
    } : (_) => {
      Ke(a, _ * 3, d, f);
    }, p = Gt.getPrimitive(), m = n.geometry.index, v = n.geometry.attributes.position, x = n.indirect ? (_) => {
      const P = n.resolveTriangleIndex(_);
      Ke(p, P * 3, m, v);
    } : (_) => {
      Ke(p, _ * 3, m, v);
    };
    if (u) {
      const _ = (P, T, w, S, E, A, M, L) => {
        for (let R = w, z = w + S; R < z; R++) {
          x(R), p.a.applyMatrix4(r), p.b.applyMatrix4(r), p.c.applyMatrix4(r), p.needsUpdate = !0;
          for (let b = P, I = P + T; b < I; b++)
            if (g(b), a.needsUpdate = !0, u(a, p, b, R, E, A, M, L))
              return !0;
        }
        return !1;
      };
      if (l) {
        const P = l;
        l = function(T, w, S, E, A, M, L, R) {
          return P(T, w, S, E, A, M, L, R) ? !0 : _(T, w, S, E, A, M, L, R);
        };
      } else
        l = _;
    }
    return $0(this, n, r, l);
  }
  /* Derived Cast Functions */
  intersectsBox(n, r) {
    return co.set(n.min, n.max, r), co.needsUpdate = !0, this.shapecast(
      {
        intersectsBounds: (i) => co.intersectsBox(i),
        intersectsTriangle: (i) => co.intersectsTriangle(i)
      }
    );
  }
  intersectsSphere(n) {
    return this.shapecast(
      {
        intersectsBounds: (r) => n.intersectsBox(r),
        intersectsTriangle: (r) => r.intersectsSphere(n)
      }
    );
  }
  closestPointToGeometry(n, r, i = {}, l = {}, u = 0, a = 1 / 0) {
    return (this.indirect ? Z0 : U0)(
      this,
      n,
      r,
      i,
      l,
      u,
      a
    );
  }
  closestPointToPoint(n, r = {}, i = 0, l = 1 / 0) {
    return E0(
      this,
      n,
      r,
      i,
      l
    );
  }
  getBoundingBox(n) {
    return n.makeEmpty(), this._roots.forEach((i) => {
      ke(0, new Float32Array(i), If), n.union(If);
    }), n;
  }
}
function zf(o, n, r) {
  return o === null || (o.point.applyMatrix4(n.matrixWorld), o.distance = o.point.distanceTo(r.ray.origin), o.object = n, o.distance < r.near || o.distance > r.far) ? null : o;
}
const ua = /* @__PURE__ */ new Uf(), Of = /* @__PURE__ */ new $e(), tv = Wn.prototype.raycast;
function nv(o, n) {
  if (this.geometry.boundsTree) {
    if (this.material === void 0)
      return;
    Of.copy(this.matrixWorld).invert(), ua.copy(o.ray).applyMatrix4(Of);
    const r = this.geometry.boundsTree;
    if (o.firstHitOnly === !0) {
      const i = zf(r.raycastFirst(ua, this.material), this, o);
      i && n.push(i);
    } else {
      const i = r.raycast(ua, this.material);
      for (let l = 0, u = i.length; l < u; l++) {
        const a = zf(i[l], this, o);
        a && n.push(a);
      }
    }
  } else
    tv.call(this, o, n);
}
function rv(o) {
  return this.boundsTree = new Qa(this, o), this.boundsTree;
}
function iv() {
  this.boundsTree = null;
}
const Df = (o) => o.isMesh, sv = /* @__PURE__ */ B.forwardRef(({
  enabled: o = !0,
  firstHitOnly: n = !1,
  children: r,
  strategy: i = Ad,
  verbose: l = !1,
  setBoundingBox: u = !0,
  maxDepth: a = 40,
  maxLeafTris: d = 10,
  indirect: f = !1,
  ...g
}, p) => {
  const m = B.useRef(null), v = rt((x) => x.raycaster);
  return B.useImperativeHandle(p, () => m.current, []), B.useEffect(() => {
    if (o) {
      const x = {
        strategy: i,
        verbose: l,
        setBoundingBox: u,
        maxDepth: a,
        maxLeafTris: d,
        indirect: f
      }, _ = m.current;
      return v.firstHitOnly = n, _.traverse((P) => {
        Df(P) && !P.geometry.boundsTree && P.raycast === Wn.prototype.raycast && (P.raycast = nv, P.geometry.computeBoundsTree = rv, P.geometry.disposeBoundsTree = iv, P.geometry.computeBoundsTree(x));
      }), () => {
        delete v.firstHitOnly, _.traverse((P) => {
          Df(P) && P.geometry.boundsTree && (P.geometry.disposeBoundsTree(), P.raycast = Wn.prototype.raycast);
        });
      };
    }
  }, []), /* @__PURE__ */ B.createElement("group", Gn({
    ref: m
  }, g), r);
}), ov = /* @__PURE__ */ B.forwardRef(function({
  children: n,
  disable: r,
  disableX: i,
  disableY: l,
  disableZ: u,
  left: a,
  right: d,
  top: f,
  bottom: g,
  front: p,
  back: m,
  onCentered: v,
  precise: x = !0,
  cacheKey: _ = 0,
  ...P
}, T) {
  const w = B.useRef(null), S = B.useRef(null), E = B.useRef(null);
  return B.useLayoutEffect(() => {
    S.current.matrixWorld.identity();
    const A = new Ye().setFromObject(E.current, x), M = new V(), L = new Jr(), R = A.max.x - A.min.x, z = A.max.y - A.min.y, b = A.max.z - A.min.z;
    A.getCenter(M), A.getBoundingSphere(L);
    const I = f ? z / 2 : g ? -z / 2 : 0, k = a ? -R / 2 : d ? R / 2 : 0, j = p ? b / 2 : m ? -b / 2 : 0;
    S.current.position.set(r || i ? 0 : -M.x + k, r || l ? 0 : -M.y + I, r || u ? 0 : -M.z + j), typeof v < "u" && v({
      parent: w.current.parent,
      container: w.current,
      width: R,
      height: z,
      depth: b,
      boundingBox: A,
      boundingSphere: L,
      center: M,
      verticalAlignment: I,
      horizontalAlignment: k,
      depthAlignment: j
    });
  }, [_, v, f, a, p, r, i, l, u, x, d, g, m]), B.useImperativeHandle(T, () => w.current, []), /* @__PURE__ */ B.createElement("group", Gn({
    ref: w
  }, P), /* @__PURE__ */ B.createElement("group", {
    ref: S
  }, /* @__PURE__ */ B.createElement("group", {
    ref: E
  }, n)));
});
function lv() {
  const { controllers: o } = Ue(), n = pn(), r = pn();
  return dr(() => {
    if (o && o[0] && o[1]) {
      if (o[0].controller) {
        const i = o[0].hand.joints["index-finger-tip"].position;
        n.current.position.copy(i);
      }
      if (o[1].controller) {
        const i = o[1].hand.joints["index-finger-tip"].position;
        r.current.position.copy(i);
      }
    }
  }), re.jsxs(re.Fragment, { children: [re.jsxs("mesh", { name: "leftTipBbox", ref: r, children: [re.jsx("boxGeometry", { args: [0.02, 0.02, 0.02] }), re.jsx("meshStandardMaterial", { color: "blue", transparent: !0, opacity: 0 })] }), re.jsxs("mesh", { name: "rightTipBbox", ref: n, children: [re.jsx("boxGeometry", { args: [0.02, 0.02, 0.02] }), re.jsx("meshStandardMaterial", { color: "orange", transparent: !0, opacity: 0 })] })] });
}
function ca(o) {
  const { currentLine: n, scale: r } = o, i = pn();
  return re.jsxs("group", { children: [re.jsx(ov, { bottom: !0, right: !0, position: [n.midPoint.x, n.midPoint.y, n.midPoint.z], rotation: [0, 0, 0], children: re.jsx(Ed, { color: "gray", scale: 0.05, ref: i, children: `${(n.startPoint.distanceTo(n.endPoint) * r).toFixed(2)} µm` }) }), re.jsx(Jg, {
    points: [n.startPoint, n.endPoint],
    color: "white",
    lineWidth: 2,
    dashed: !1,
    segments: !0
  })] });
}
function av(o) {
  const { segmentationGroup: n, segmentationSettings: r, segmentationSceneScale: i, renderingSettings: l, materialRef: u, highlightEntity: a, setObsHighlight: d } = o, f = pn(), g = pn(), p = pn(), { isPresenting: m } = Ue();
  Sn(() => {
    m && f?.current ? u !== null && (u.current.material.uniforms.u_physical_Pixel.value = 0.2) : m || u !== null && (u.current.material.uniforms.u_physical_Pixel.value = 2.5);
  }, [m]);
  const { scene: v } = rt(), { controllers: x } = Ue(), [_, P] = ht(!1), [T, w] = ht(!1), [S, E] = ht(!1), [A, M] = ht({
    startPoint: new V(),
    midPoint: new V(),
    endPoint: new V(),
    setStartPoint: !1,
    setEndPoint: !1
  }), [L, R] = ht([]), [z, b] = ht(0);
  return dr(() => {
    if (m) {
      const I = v.getObjectByName("rightTipBbox"), k = v.getObjectByName("leftTipBbox"), j = new Ye().setFromObject(k), G = new Ye().setFromObject(I);
      let Y = !1;
      if (b(z - 1), j.intersectsBox(G) && j.max.x !== -G.min.x && (P(!0), E(!0), M({
        startPoint: new V(),
        midPoint: new V(),
        endPoint: new V(),
        setStartPoint: !1,
        setEndPoint: !1
      })), _) {
        let ee = x[1].hand.joints["index-finger-tip"].position.clone(), ae = x[0].hand.joints["index-finger-tip"].position.clone();
        ee = ee.applyMatrix4(p.current.matrixWorld.clone().invert()), ae = ae.applyMatrix4(p.current.matrixWorld.clone().invert());
        let Se = ee.clone(), W = ae.clone();
        A.setStartPoint && (Se = A.startPoint), A.setEndPoint && (W = A.endPoint), M({
          startPoint: Se,
          midPoint: new V().addVectors(Se, W).multiplyScalar(0.5),
          endPoint: W,
          setStartPoint: A.setStartPoint,
          setEndPoint: A.setEndPoint
        }), x[0].hand.inputState.pinching === !0 && M({
          startPoint: A.startPoint,
          midPoint: A.midPoint,
          endPoint: A.endPoint,
          setStartPoint: A.setStartPoint,
          setEndPoint: !0
        }), x[1].hand.inputState.pinching === !0 && M({
          startPoint: A.startPoint,
          midPoint: A.midPoint,
          endPoint: A.endPoint,
          setStartPoint: !0,
          setEndPoint: A.setEndPoint
        }), A.setStartPoint && A.setEndPoint && (L.push(A), R(L), E(!1), P(!1), b(8));
      } else
        z <= 0 && f?.current && m && (f.current.children[0].children.forEach((ee, ae) => {
          const Se = f.current.children[0].children[ae], W = new Ye().setFromObject(Se), J = j.intersectsBox(W), Z = G.intersectsBox(W);
          (J || Z) && (Y = !0, d(Se.name), w(!0), x[1] !== void 0 && J && x[1].hand.inputState.pinching === !0 && (b(10), Y = !1, x[1].hand.inputState.pinching = !1), x[0] !== void 0 && Z && x[0].hand.inputState.pinching === !0 && (b(10), Y = !1, x[0].hand.inputState.pinching = !1));
        }), !Y && T && (d(null), w(!1)));
    }
  }, [_, T, A, L, S, z, m]), re.jsx("group", { children: Ue().isPresenting ? re.jsxs(zm, { children: [re.jsxs("group", { ref: p, children: [n?.visible ? re.jsxs("group", { children: [re.jsx("hemisphereLight", { skyColor: 8421504, groundColor: 6316128 }), re.jsx("directionalLight", { color: 16777215, position: [0, -800, 0] }), re.jsx("primitive", { ref: f, object: n, position: [-0.18, 1.13, -1], scale: [
    2e-3 * i[0],
    2e-3 * i[1],
    2e-3 * i[2]
  ] })] }) : null, l.uniforms && l.shader ? re.jsx("group", { children: re.jsxs("mesh", { name: "cube", position: [-0.18, 1.13, -1], rotation: [0, 0, 0], scale: [
    2e-3 * l.meshScale[0],
    2e-3 * l.meshScale[1],
    2e-3 * l.meshScale[2]
  ], ref: u, children: [re.jsx("boxGeometry", { args: l.geometrySize }), re.jsx("shaderMaterial", { customProgramCacheKey: () => "1", side: qr, uniforms: l.uniforms, needsUpdate: !0, transparent: !0, vertexShader: l.shader.vertexShader, fragmentShader: l.shader.fragmentShader })] }) }) : null] }), re.jsx("group", { name: "currentLine", ref: g, children: S ? re.jsx(ca, { currentLine: A, scale: 1 / 2e-3 * 0.4 }) : null }), re.jsx("group", { name: "lines", children: L.map((I) => re.jsx(ca, { currentLine: I, scale: 1 / 2e-3 * 0.4 })) })] }) : re.jsxs("group", { children: [re.jsxs("group", { children: [n?.visible ? re.jsxs("group", { children: [re.jsx("hemisphereLight", { skyColor: 8421504, groundColor: 6316128 }), re.jsx("directionalLight", { color: 16777215, position: [0, -800, 0] }), re.jsx("directionalLight", { color: 16777215, position: [0, 800, 0] }), re.jsx(sv, { firstHitOnly: !0, children: re.jsx("primitive", { ref: f, object: n, position: [0, 0, 0], onClick: (I) => {
    I.object.parent.userData.name === "finalPass" && a(I.object.name, I.object.userData.layerScope, I.object.userData.channelScope);
  }, onPointerOver: (I) => {
    d(I.object.name);
  }, onPointerOut: (I) => d(null) }) })] }) : null, l.uniforms && l.shader ? re.jsx("group", { children: re.jsxs("mesh", { scale: l.meshScale, ref: u, children: [re.jsx("boxGeometry", { args: l.geometrySize }), re.jsx("shaderMaterial", { customProgramCacheKey: () => "1", side: qr, uniforms: l.uniforms, needsUpdate: !0, transparent: !0, vertexShader: l.shader.vertexShader, fragmentShader: l.shader.fragmentShader })] }) }) : null] }), re.jsx("group", { name: "lines", children: L.map((I) => re.jsx(ca, { currentLine: I, scale: 1 })) })] }) });
}
function uv() {
  const { controllers: o } = Ue();
  return dr(() => {
    o?.[0] && o?.[1] && (o[0]?.hand?.children?.[25]?.children?.[0]?.children?.[0] && (o[0].hand.children[25].children[0].children[0].material.transparent = !0, o[0].hand.children[25].children[0].children[0].material.opacity = 0.5), o[1]?.hand?.children?.[25]?.children?.[0]?.children?.[0] && (o[1].hand.children[25].children[0].children[0].material.transparent = !0, o[1].hand.children[25].children[0].children[0].material.opacity = 0.5));
  }), null;
}
class cv {
  /**
   * @param {number} xLength Width of the volume
   * @param {number} yLength Length of the volume
   * @param {number} zLength Depth of the volume
   * @param {string} type The type of data (uint8, uint16, ...)
   * @param {ArrayBuffer} arrayBuffer The buffer with volume data
   */
  constructor(n, r, i, l, u) {
    if (this.spacing = [1, 1, 1], this.offset = [0, 0, 0], this.matrix = new Nh(), this.matrix.identity(), this.sliceList = [], this.lowerThresholdValue = -1 / 0, this.upperThresholdValue = 1 / 0, arguments.length > 0) {
      switch (this.xLength = Number(n) || 1, this.yLength = Number(r) || 1, this.zLength = Number(i) || 1, l) {
        case "Uint8":
        case "uint8":
        case "uchar":
        case "unsigned char":
        case "uint8_t":
          this.data = new Uint8Array(u);
          break;
        case "Int8":
        case "int8":
        case "signed char":
        case "int8_t":
          this.data = new Int8Array(u);
          break;
        case "Int16":
        case "int16":
        case "short":
        case "short int":
        case "signed short":
        case "signed short int":
        case "int16_t":
          this.data = new Int16Array(u);
          break;
        case "Uint16":
        case "uint16":
        case "ushort":
        case "unsigned short":
        case "unsigned short int":
        case "uint16_t":
          this.data = new Uint16Array(u);
          break;
        case "Int32":
        case "int32":
        case "int":
        case "signed int":
        case "int32_t":
          this.data = new Int32Array(u);
          break;
        case "Uint32":
        case "uint32":
        case "uint":
        case "unsigned int":
        case "uint32_t":
          this.data = new Uint32Array(u);
          break;
        case "longlong":
        case "long long":
        case "long long int":
        case "signed long long":
        case "signed long long int":
        case "int64":
        case "int64_t":
        case "ulonglong":
        case "unsigned long long":
        case "unsigned long long int":
        case "uint64":
        case "uint64_t":
          throw new Error("uint64_t type is not supported in JavaScript");
        case "Float32":
        case "float32":
        case "float":
          this.data = new Float32Array(u);
          break;
        case "Float64":
        case "float64":
        case "double":
          this.data = new Float64Array(u);
          break;
        default:
          this.data = new Uint8Array(u);
      }
      if (this.data.length !== this.xLength * this.yLength * this.zLength)
        throw new Error("lengths are not matching arrayBuffer size");
    }
  }
  get lowerThreshold() {
    return this.lowerThresholdValue;
  }
  set lowerThreshold(n) {
    this.lowerThresholdValue = n, this.sliceList.forEach((r) => {
      r.geometryNeedsUpdate = !0;
    });
  }
  get upperThreshold() {
    return this.upperThresholdValue;
  }
  set upperThreshold(n) {
    this.upperThresholdValue = n, this.sliceList.forEach((r) => {
      r.geometryNeedsUpdate = !0;
    });
  }
  /**
   * Shortcut for data[access(i,j,k)]
   * @param {number} i    First coordinate
   * @param {number} j    Second coordinate
   * @param {number} k    Third coordinate
   * @returns {number}  value in the data array
   */
  getData(n, r, i) {
    return this.data[i * this.xLength * this.yLength + r * this.xLength + n];
  }
  /**
   * Compute the index in the data
   * array corresponding to the given coordinates in IJK system
   * @param {number} i    First coordinate
   * @param {number} j    Second coordinate
   * @param {number} k    Third coordinate
   * @returns {number}  index
   */
  access(n, r, i) {
    return i * this.xLength * this.yLength + r * this.xLength + n;
  }
  /**
   * Retrieve the IJK coordinates of the voxel
   * corresponding of the given index in the data
   * @param {number} index index of the voxel
   * @returns {Array}  [x,y,z]
   */
  reverseAccess(n) {
    const r = Math.floor(n / (this.yLength * this.xLength)), i = Math.floor((n - r * this.yLength * this.xLength) / this.xLength);
    return [n - r * this.yLength * this.xLength - i * this.xLength, i, r];
  }
  /**
   * Apply a function to all the voxels, be careful,
   * the value will be replaced
   * @param {Function} functionToMap A function to apply to every voxel,
   * will be called with the following parameters:
   * - value of the voxel
   * - index of the voxel
   * - the data (TypedArray)
   * @param {Object} context  You can specify a context in which call the function,
   * default if this Volume
   * @returns {Volume} this
   */
  map(n, r) {
    const { length: i } = this.data, l = r || this;
    for (let u = 0; u < i; u++)
      this.data[u] = n.call(l, this.data[u], u, this.data);
    return this;
  }
  /**
   * Compute the orientation
   * of the slice and returns all the information relative to the
   * geometry such as sliceAccess,
   * the plane matrix (orientation and position in RAS coordinate)
   * and the dimensions of the plane in both coordinate system.
   * @param {string} axis  the normal axis to the slice 'x' 'y' or 'z'
   * @param {number} index the index of the slice
   * @returns {Object} an object containing all the usefull information
   * on the geometry of the slice
   */
  extractPerpendicularPlane(n, r) {
    const i = new $e().identity(), l = this;
    let u, a, d, f;
    const g = new V(), p = new V(), m = new V(), v = new V(this.xLength, this.yLength, this.zLength);
    switch (n) {
      case "x":
        g.set(1, 0, 0), p.set(0, 0, -1), m.set(0, -1, 0), u = this.spacing[2], a = this.spacing[1], f = new V(r, 0, 0), i.multiply(new $e().makeRotationY(Math.PI / 2)), d = (l.RASDimensions[0] - 1) / 2, i.setPosition(new V(r - d, 0, 0));
        break;
      case "y":
        g.set(0, 1, 0), p.set(1, 0, 0), m.set(0, 0, 1), u = this.spacing[0], a = this.spacing[2], f = new V(0, r, 0), i.multiply(new $e().makeRotationX(-Math.PI / 2)), d = (l.RASDimensions[1] - 1) / 2, i.setPosition(new V(0, r - d, 0));
        break;
      case "z":
      default:
        g.set(0, 0, 1), p.set(1, 0, 0), m.set(0, -1, 0), u = this.spacing[0], a = this.spacing[1], f = new V(0, 0, r), d = (l.RASDimensions[2] - 1) / 2, i.setPosition(new V(0, 0, r - d));
        break;
    }
    p.applyMatrix4(l.inverseMatrix).normalize(), p.argVar = "i", m.applyMatrix4(l.inverseMatrix).normalize(), m.argVar = "j", g.applyMatrix4(l.inverseMatrix).normalize();
    const x = Math.floor(Math.abs(p.dot(v))), _ = Math.floor(Math.abs(m.dot(v))), P = Math.abs(x * u), T = Math.abs(_ * a);
    f = Math.abs(Math.round(f.applyMatrix4(l.inverseMatrix).dot(g)));
    const w = [new V(1, 0, 0), new V(0, 1, 0), new V(0, 0, 1)], S = [p, m, g].find((L) => Math.abs(L.dot(w[0])) > 0.9), E = [p, m, g].find((L) => Math.abs(L.dot(w[1])) > 0.9), A = [p, m, g].find((L) => Math.abs(L.dot(w[2])) > 0.9);
    function M(L, R) {
      const z = S === g ? f : S.arglet === "i" ? L : R, b = E === g ? f : E.arglet === "i" ? L : R, I = A === g ? f : A.arglet === "i" ? L : R, k = S.dot(w[0]) > 0 ? z : l.xLength - 1 - z, j = E.dot(w[1]) > 0 ? b : l.yLength - 1 - b, G = A.dot(w[2]) > 0 ? I : l.zLength - 1 - I;
      return l.access(k, j, G);
    }
    return {
      iLength: x,
      jLength: _,
      sliceAccess: M,
      matrix: i,
      planeWidth: P,
      planeHeight: T
    };
  }
  /**
   * Compute the minimum
   * and the maximum of the data in the volume
   * @returns {Array} [min,max]
   */
  computeMinMax() {
    let n = 1 / 0, r = -1 / 0;
    const i = this.data.length;
    let l = 0;
    for (l = 0; l < i; l++)
      if (!Number.isNaN(this.data[l])) {
        const u = this.data[l];
        n = Math.min(n, u), r = Math.max(r, u);
      }
    return this.min = n, this.max = r, [n, r];
  }
}
const fv = {
  uniforms: {
    u_size: { value: new V(1, 1, 1) },
    u_renderstyle: { value: 0 },
    u_renderthreshold: { value: 0.5 },
    u_opacity: { value: 0.5 },
    u_clim: { value: new ye(0.2, 0.8) },
    u_clim2: { value: new ye(0.2, 0.8) },
    u_clim3: { value: new ye(0.2, 0.8) },
    u_clim4: { value: new ye(0.2, 0.8) },
    u_clim5: { value: new ye(0.2, 0.8) },
    u_clim6: { value: new ye(0.2, 0.8) },
    u_xClip: { value: new ye(-1, 1e6) },
    u_yClip: { value: new ye(-1, 1e6) },
    u_zClip: { value: new ye(-1, 1e6) },
    u_data: { value: null },
    u_stop_geom: { value: null },
    u_geo_color: { value: null },
    u_window_size: { value: new ye(1, 1) },
    u_vol_scale: { value: new ye(1, 1, 1) },
    u_physical_Pixel: { value: 0.5 },
    volumeTex: { value: null },
    volumeTex2: { value: null },
    volumeTex3: { value: null },
    volumeTex4: { value: null },
    volumeTex5: { value: null },
    volumeTex6: { value: null },
    u_color: { value: new V(0, 0, 0) },
    u_color2: { value: new V(0, 0, 0) },
    u_color3: { value: new V(0, 0, 0) },
    u_color4: { value: new V(0, 0, 0) },
    u_color5: { value: new V(0, 0, 0) },
    u_color6: { value: new V(0, 0, 0) },
    u_cmdata: { value: null },
    near: { value: 0.1 },
    far: { value: 1e4 },
    alphaScale: { value: 0 },
    dtScale: { value: 1 },
    volumeCount: { value: 0 },
    finalGamma: { value: 0 },
    boxSize: { value: new V(1, 1, 1) }
  },
  vertexShader: [
    "out vec3 rayDirUnnorm;",
    "out vec3 cameraCorrected;",
    "uniform vec3 u_vol_scale;",
    "uniform vec3 u_size;",
    "varying vec3 worldSpaceCoords;",
    "varying vec2 vUv;",
    "varying vec4 glPosition;",
    "uniform highp vec3 boxSize;",
    "void main()",
    "{",
    "   worldSpaceCoords = position / boxSize + vec3(0.5, 0.5, 0.5); //move it from [-0.5;0.5] to [0,1]",
    "   cameraCorrected = (inverse(modelMatrix) * vec4(cameraPosition, 1.)).xyz;",
    "   rayDirUnnorm = position - cameraCorrected;",
    "   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
    "   glPosition = gl_Position;",
    "   vUv = uv;",
    "}"
  ].join(`
`),
  fragmentShader: [
    "#include <packing>",
    "precision highp float;",
    " precision mediump sampler3D;",
    "in vec3 rayDirUnnorm;",
    "in vec3 cameraCorrected;",
    "uniform sampler3D volumeTex;",
    "uniform sampler3D volumeTex2;",
    "uniform sampler3D volumeTex3;",
    "uniform sampler3D volumeTex4;",
    "uniform sampler3D volumeTex5;",
    "uniform sampler3D volumeTex6;",
    "uniform vec2 u_clim;",
    "uniform vec2 u_clim2;",
    "uniform vec2 u_clim3;",
    "uniform vec2 u_clim4;",
    "uniform vec2 u_clim5;",
    "uniform vec2 u_clim6;",
    "uniform vec2 u_window_size;",
    "uniform vec2 u_xClip;",
    "uniform vec2 u_yClip;",
    "uniform vec2 u_zClip;",
    "uniform sampler2D u_cmdata;",
    "uniform sampler2D u_stop_geom;",
    "uniform sampler2D u_geo_color;",
    "uniform vec3 u_color;",
    "uniform vec3 u_color2;",
    "uniform vec3 u_color3;",
    "uniform vec3 u_color4;",
    "uniform vec3 u_color5;",
    "uniform vec3 u_color6;",
    "uniform float alphaScale;",
    "uniform float dtScale;",
    "uniform float finalGamma;",
    "uniform float volumeCount;",
    "uniform highp vec3 boxSize;",
    "uniform vec3 u_size;",
    "uniform int u_renderstyle;",
    "uniform float u_opacity;",
    "uniform vec3 u_vol_scale;",
    "uniform float near;",
    "uniform float u_physical_Pixel;",
    "varying vec2 vUv;",
    "varying vec4 glPosition;",
    "uniform float far;",
    "varying vec3 worldSpaceCoords;",
    "float linearize_z(float z) {",
    "        return near * far / (far + z * (near - far));",
    "}",
    "vec2 intersect_hit(vec3 orig, vec3 dir) {",
    "  vec3 boxMin = vec3(-0.5) * boxSize;",
    "  vec3 boxMax = vec3( 0.5) * boxSize;",
    "  if(u_xClip.x > -1.0){   boxMin.x = u_xClip.x-(boxSize.x/2.0);",
    "   if(u_xClip.y < boxSize.x)",
    "       boxMax.x = u_xClip.y-(boxSize.x/2.0);",
    "  }",
    "  if(u_yClip.x > -1.0){   boxMin.y = u_yClip.x-(boxSize.y/2.0);",
    "   if(u_yClip.y < boxSize.y)",
    "      boxMax.y = u_yClip.y-(boxSize.y/2.0);",
    "  }",
    "  if(u_zClip.x > -1.0){   boxMin.z = u_zClip.x-(boxSize.z/2.0);",
    "   if(u_zClip.y < boxSize.z)       boxMax.z = u_zClip.y-(boxSize.z/2.0);",
    "  }",
    "  vec3 invDir = 1.0 / dir;",
    "  vec3 tmin0 = (boxMin - orig) * invDir;",
    "  vec3 tmax0 = (boxMax - orig) * invDir;",
    "  vec3 tmin = min(tmin0, tmax0);",
    "  vec3 tmax = max(tmin0, tmax0);",
    "  float t0 = max(tmin.x, max(tmin.y, tmin.z));",
    "  float t1 = min(tmax.x, min(tmax.y, tmax.z));",
    "  return vec2(t0, t1);",
    "}",
    "   // Pseudo-random number gen from",
    "   // http://www.reedbeta.com/blog/quick-and-easy-gpu-random-numbers-in-d3d11/",
    "   // with some tweaks for the range of values",
    "       float wang_hash(int seed) {",
    "     seed = (seed ^ 61) ^ (seed >> 16);",
    "     seed *= 9;",
    "     seed = seed ^ (seed >> 4);",
    "     seed *= 0x27d4eb2d;",
    "     seed = seed ^ (seed >> 15);",
    "     return float(seed % 2147483647) / float(2147483647);",
    "     }",
    "float linear_to_srgb(float x) {",
    "   if (x <= 0.0031308f) {",
    "     return 12.92f * x;",
    "   }",
    "   return 1.055f * pow(x, 1.f / 2.4f) - 0.055f;",
    "}",
    "void main(void) {",
    // For finding the settings for the MESH
    // "  gl_FragColor = vec4(worldSpaceCoords.x,worldSpaceCoords.y,worldSpaceCoords.z,0.5);",
    // "  return;",
    //
    "  //STEP 1: Normalize the view Ray",
    "  vec3 rayDir = normalize(rayDirUnnorm);",
    "  //STEP 2: Intersect the ray with the volume bounds to find the interval along the ray overlapped by the volume",
    "  vec2 t_hit = intersect_hit(cameraCorrected, rayDir);",
    "  if (t_hit.x >= t_hit.y) {",
    "    discard;",
    "  }",
    "  //No sample behind the eye",
    "  t_hit.x = max(t_hit.x, 0.0);",
    "  //STEP 3: Compute the step size to march through the volume grid",
    "  ivec3 volumeTexSize = textureSize(volumeTex, 0);",
    "  vec3 dt_vec = 1.0 / (vec3(volumeTexSize) * abs(rayDir));",
    "  float dt = min(dt_vec.x, min(dt_vec.y, dt_vec.z));",
    "  dt = max(1.0, dt);",
    "  // Ray starting point, in the real space where the box may not be a cube.",
    "  // Prevents a lost WebGL context.",
    // "   if (dt < 0.0000001) {",
    // "     gl_FragColor = vec4(1.0);",
    // "     return;",
    // "   }",
    " float offset = wang_hash(int(gl_FragCoord.x + 640.0 * gl_FragCoord.y));",
    " vec3 p = cameraCorrected + (t_hit.x + offset + dt) * rayDir;",
    "  // Most browsers do not need this initialization, but add it to be safe.",
    "  gl_FragColor = vec4(0.0);",
    "  p = p / boxSize + vec3(0.5);",
    "  vec3 step = (rayDir * dt) / boxSize;",
    "  // ",
    "  // Initialization of some variables.",
    "  float max_val = 0.0;",
    "  float max_val2 = 0.0;",
    "  float max_val3 = 0.0;",
    "  float max_val4 = 0.0;",
    "  float max_val5 = 0.0;",
    "  float max_val6 = 0.0;",
    "  vec3 rgbCombo = vec3(0.0);",
    "  float total = 0.0;",
    "  int max_i = 30000;",
    "  int i = 0;",
    "  float x = gl_FragCoord.x/u_window_size.x;",
    "  float y = gl_FragCoord.y/u_window_size.y;",
    "  vec3 meshPos = texture2D(u_stop_geom, vec2(x,y)).xyz;",
    // "  vec3 meshPos = texture2D(u_stop_geom, vec2(gl_FragCoord.x,gl_FragCoord.y)).xyz;",
    //  "  gl_FragColor = vec4(meshPos,1.0);",
    //  "  return;",
    "  float dist = 1000.0;",
    "  for (float t = t_hit.x; t < t_hit.y; t += dt) {",
    "       if(meshPos != vec3(0.0))           dist = distance(p,meshPos);",
    "      float val = texture(volumeTex, p.xyz).r;",
    "      val = max(0.0, (val - u_clim[0]) / (u_clim[1] - u_clim[0]));",
    "      rgbCombo += max(0.0, min(1.0, val)) * u_color;",
    "      total += val;",
    "      if(volumeCount > 1.0){           float val2 = texture(volumeTex2, p.xyz).r;",
    "           val2 = max(0.0,(val2 - u_clim2[0]) / (u_clim2[1] - u_clim2[0]));",
    "           rgbCombo += max(0.0, min(1.0, val2)) * u_color2;",
    "           total += val2;",
    "       }",
    "       if(volumeCount > 2.0){           float val3 = texture(volumeTex3, p.xyz).r;",
    "           val3 = max(0.0,(val3 - u_clim3[0]) / (u_clim3[1] - u_clim3[0]));",
    "           rgbCombo += max(0.0, min(1.0, val3)) * u_color3;",
    "           total += val3;",
    "       }",
    "       if(volumeCount > 3.0){           float val4 = texture(volumeTex4, p.xyz).r;",
    "           val4 = max(0.0,(val4 - u_clim4[0]) / (u_clim4[1] - u_clim4[0]));",
    "           rgbCombo += max(0.0, min(1.0, val4)) * u_color4;",
    "           total += val4;",
    "       }",
    "       if(volumeCount > 4.0){           float val5 = texture(volumeTex5, p.xyz).r;",
    "           val5 = max(0.0,(val5 - u_clim5[0]) / (u_clim5[1] - u_clim5[0]));",
    "           rgbCombo += max(0.0, min(1.0, val5)) * u_color5;",
    "           total += val5;",
    "        }",
    "        if(volumeCount > 5.0){           float val6 = texture(volumeTex6, p.xyz).r;",
    "           val6 = max(0.0,(val6 - u_clim6[0]) / (u_clim6[1] - u_clim6[0]));",
    "           rgbCombo += max(0.0, min(1.0, val6)) * u_color6;",
    "           total += val6;",
    "       }",
    // STOP the traversal if there has been data and the distance to the object is too small
    "       if(total > 0.0 && dist < 0.1){",
    "           break;",
    "       }else if(dist < 0.1){           gl_FragColor = vec4(0.0,0.0,0.0,0.0);",
    "           break;",
    "       }",
    "       if(u_renderstyle == 0 && (max_val > u_clim[1] && max_val2 >= u_clim2[1] && max_val3 >= u_clim3[1] && max_val4 >= u_clim4[1] && max_val5 >= u_clim5[1] &&  max_val6 >= u_clim6[1])) break;",
    "       if(u_renderstyle == 2){           total = min(total, 1.0);",
    "           vec4 val_color = vec4(rgbCombo, total);",
    "           val_color.a = 1.0 - pow(1.0 - val_color.a, 1.0);",
    "           gl_FragColor.rgb += (1.0 - gl_FragColor.a) * val_color.a * val_color.rgb;",
    "           gl_FragColor.a += (1.0 - gl_FragColor.a) * val_color.a * dtScale;",
    "           if (gl_FragColor.a >= 0.95) {",
    "               break;",
    "           }",
    "       }",
    // "       }",
    "       p += step;",
    "  }",
    "   gl_FragDepth = distance(worldSpaceCoords,p)*u_physical_Pixel;",
    // "   gl_FragColor = vec4(gl_FragDepth,gl_FragDepth,gl_FragDepth,1.0);",
    // "   return;",
    "   if(u_renderstyle == 0 && (max_val <  u_clim[0] && max_val2 < u_clim2[0] && max_val3 < u_clim3[0] &&   max_val4 <  u_clim4[0] && max_val5 <  u_clim5[0] && max_val6 <  u_clim6[0])){",
    "        gl_FragColor = vec4(0,0,0,0);",
    "   }else if(u_renderstyle == 0){",
    "       max_val = (max_val - u_clim[0]) / (u_clim[1] - u_clim[0]);",
    "       max_val2 = (max_val2 - u_clim2[0]) / (u_clim2[1] - u_clim2[0]);",
    "       max_val3 = (max_val3 - u_clim3[0]) / (u_clim3[1] - u_clim3[0]);",
    "       max_val4 = (max_val4 - u_clim4[0]) / (u_clim4[1] - u_clim4[0]);",
    "       max_val5 = (max_val5 - u_clim5[0]) / (u_clim5[1] - u_clim5[0]);",
    "       max_val6 = (max_val6 - u_clim6[0]) / (u_clim6[1] - u_clim6[0]);",
    "       vec3 color = u_color * max_val;",
    "       if(volumeCount > 1.0) color = color +  u_color2 * max_val2;",
    "       if(volumeCount > 3.0) color = color +  u_color4 * max_val4;",
    "       if(volumeCount > 2.0) color = color +  u_color3 * max_val3;",
    "       if(volumeCount > 4.0) color = color +  u_color5 * max_val5;",
    "       if(volumeCount > 5.0) color = color +  u_color6 * max_val6;",
    "       vec3 colorCorrected = vec3(min(color[0], 1.0), min(color[1],1.0), min(color[2],1.0));",
    "        gl_FragColor = vec4(color,1.0);",
    "    }",
    "    gl_FragColor.r = linear_to_srgb(gl_FragColor.r);",
    "    gl_FragColor.g = linear_to_srgb(gl_FragColor.g);",
    "    gl_FragColor.b = linear_to_srgb(gl_FragColor.b);",
    "}"
  ].join(`
`)
}, dv = {
  maximumIntensityProjection: 0,
  minimumIntensityProjection: 1,
  additive: 2
};
function pv(o, n, r, i, l, u) {
  const { spatialRenderingMode: a } = u, d = l?.image?.instance?.getData();
  if (!d)
    return {
      channelsVisible: null,
      resolution: null,
      data: null,
      colors: null,
      contrastLimits: null,
      allChannels: null,
      channelTargetC: null
    };
  const f = l.image.instance, g = a === "3D", p = n[Ft.PHOTOMETRIC_INTERPRETATION] === "RGB", m = n[Ft.VOLUMETRIC_RENDERING_ALGORITHM], v = dv[m], x = n[Ft.SPATIAL_LAYER_VISIBLE], _ = n[Ft.SPATIAL_LAYER_OPACITY];
  f.isInterleaved();
  const P = p ? [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255]
  ] : r.map((I) => i[I][Ft.SPATIAL_CHANNEL_COLOR]), T = p ? [
    [0, 255],
    [0, 255],
    [0, 255]
  ] : r.map((I) => i[I][Ft.SPATIAL_CHANNEL_WINDOW] || [0, 255]), w = p ? [
    // Layer visible AND channel visible
    x && !0,
    x && !0,
    x && !0
  ] : r.map((I) => (
    // Layer visible AND channel visible
    x && i[I][Ft.SPATIAL_CHANNEL_VISIBLE]
  )), S = p ? [
    // Layer visible AND channel visible
    x && !0,
    x && !0,
    x && !0
  ] : r.map((I) => (
    // Layer visible AND channel visible
    x && i[I][Ft.SPATIAL_TARGET_C]
  )), E = f.getAutoTargetResolution(), A = n[Ft.SPATIAL_TARGET_RESOLUTION], M = A === null || Number.isNaN(A) ? E : A, L = l.image.loaders[0].channels;
  let R = n[Ft.SPATIAL_SLICE_X], z = n[Ft.SPATIAL_SLICE_Y], b = n[Ft.SPATIAL_SLICE_Z];
  return R = R !== null ? R : new ye(-1, 1e5), z = z !== null ? z : new ye(-1, 1e5), b = b !== null ? b : new ye(-1, 1e5), {
    channelsVisible: w,
    allChannels: L,
    channelTargetC: S,
    resolution: M,
    data: d,
    colors: P,
    contrastLimits: T,
    is3dMode: g,
    renderingMode: v,
    layerTransparency: _,
    xSlice: R,
    ySlice: z,
    zSlice: b
  };
}
function hv(o, n, r, i, l) {
  const { images: u = {}, imageLayerScopes: a, imageLayerCoordination: d, imageChannelScopesByLayer: f, imageChannelCoordination: g } = o, p = a[0], m = f[p], v = d[0][p], x = g[0][p], { channelsVisible: _, allChannels: P, channelTargetC: T, resolution: w, data: S, colors: E, contrastLimits: A, is3dMode: M, renderingMode: L, layerTransparency: R, xSlice: z, ySlice: b, zSlice: I } = pv(p, v, m, x, u[p], o);
  return T !== null && (n.channelTargetC.length !== 0 && (n.channelTargetC.toString() !== T.toString() || n.resolution.toString() !== w.toString()) ? i || l(!0) : (n.channelsVisible.toString() !== _.toString() || n.colors.toString() !== E.toString() || n.is3dMode !== M || n.contrastLimits.toString() !== A.toString() || n.renderingMode.toString() !== L.toString() || n.layerTransparency.toString() !== R.toString() || n.xSlice.toString() !== z.toString() || n.ySlice.toString() !== b.toString() || n.zSlice.toString() !== I.toString()) && (r({
    channelsVisible: _,
    allChannels: P,
    channelTargetC: T,
    resolution: w,
    data: S,
    colors: E,
    contrastLimits: A,
    is3dMode: M,
    renderingMode: L,
    layerTransparency: R,
    xSlice: z,
    ySlice: b,
    zSlice: I
  }), l(!1))), {
    images: u,
    layerScope: p,
    imageLayerScopes: a,
    imageLayerCoordination: d,
    imageChannelScopesByLayer: f,
    imageChannelCoordination: g,
    channelsVisible: _,
    allChannels: P,
    channelTargetC: T,
    resolution: w,
    data: S,
    colors: E,
    contrastLimits: A,
    is3dMode: M,
    renderingMode: L,
    layerTransparency: R,
    xSlice: z,
    ySlice: b,
    zSlice: I
  };
}
function fo(o, n) {
  const [r, i] = n;
  return (o - r) / Math.sqrt(i ** 2 - r ** 2);
}
function mv(o, n, r, i, l, u, a, d, f, g, p, m, v) {
  o.boxSize.value.set(r.xLength, r.yLength, r.zLength), o.volumeTex.value = n.length > 0 ? n[0] : null, o.volumeTex2.value = n.length > 1 ? n[1] : null, o.volumeTex3.value = n.length > 2 ? n[2] : null, o.volumeTex4.value = n.length > 3 ? n[3] : null, o.volumeTex5.value = n.length > 4 ? n[4] : null, o.volumeTex6.value = n.length > 5 ? n[5] : null, o.near.value = 0.1, o.far.value = 3e3, o.alphaScale.value = 1, o.dtScale.value = d, o.finalGamma.value = 4.5, o.volumeCount.value = n.length, o.u_size.value.set(r.xLength, r.yLength, r.zLength), o.u_stop_geom.value = null, o.u_window_size.value.set(0, 0), o.u_vol_scale.value.set(1 / r.xLength, 1 / r.yLength, 1 / r.zLength * 2), o.u_renderstyle.value = l, o.u_clim.value.set(u.length > 0 ? u[0][0] : null, u.length > 0 ? u[0][1] : null), o.u_clim2.value.set(u.length > 1 ? u[1][0] : null, u.length > 1 ? u[1][1] : null), o.u_clim3.value.set(u.length > 2 ? u[2][0] : null, u.length > 2 ? u[2][1] : null), o.u_clim4.value.set(u.length > 3 ? u[3][0] : null, u.length > 3 ? u[3][1] : null), o.u_clim5.value.set(u.length > 4 ? u[4][0] : null, u.length > 4 ? u[4][1] : null), o.u_clim6.value.set(u.length > 5 ? u[5][0] : null, u.length > 5 ? u[5][1] : null), o.u_xClip.value.set(f[0] * (1 / m[0]) / v[0] * r.xLength, f[1] * (1 / m[0]) / v[0] * r.xLength), o.u_yClip.value.set(g[0] * (1 / m[1]) / v[1] * r.yLength, g[1] * (1 / m[1]) / v[1] * r.yLength), o.u_zClip.value.set(p[0] * (1 / m[2]) / v[2] * r.zLength, p[1] * (1 / m[1]) / v[2] * r.zLength), o.u_color.value.set(a.length > 0 ? a[0][0] : null, a.length > 0 ? a[0][1] : null, a.length > 0 ? a[0][2] : null), o.u_color2.value.set(a.length > 1 ? a[1][0] : null, a.length > 1 ? a[1][1] : null, a.length > 1 ? a[1][2] : null), o.u_color3.value.set(a.length > 2 ? a[2][0] : null, a.length > 2 ? a[2][1] : null, a.length > 2 ? a[2][2] : null), o.u_color4.value.set(a.length > 3 ? a[3][0] : null, a.length > 3 ? a[3][1] : null, a.length > 3 ? a[3][2] : null), o.u_color5.value.set(a.length > 4 ? a[4][0] : null, a.length > 4 ? a[4][1] : null, a.length > 4 ? a[4][2] : null), o.u_color6.value.set(a.length > 5 ? a[5][0] : null, a.length > 5 ? a[5][1] : null, a.length > 5 ? a[5][2] : null);
}
function bf(o, n, r, i, l, u, a, d, f, g, p, m, v, x) {
  const _ = [], P = [], T = [];
  let w = null;
  if (n.forEach((M, L) => {
    r[L] && (w = o.get(M), _.push(l.get(M)), P.push([i[L][0] / 255, i[L][1] / 255, i[L][2] / 255]), u[L][0] === 0 && u[L][1] === 255 ? T.push([
      fo(a.get(M)[0], a.get(M)),
      fo(a.get(M)[1], a.get(M))
    ]) : T.push([
      fo(u[L][0], a.get(M)),
      fo(u[L][1], a.get(M))
    ]));
  }), w === null)
    return null;
  const S = {
    clim1: 0.01,
    clim2: 0.7,
    isothreshold: 0.15,
    opacity: 1,
    colormap: "gray"
  }, E = fv, A = ga.clone(E.uniforms);
  return mv(A, _, w, S, f, T, P, g, p, m, v, [d[0].size, d[1].size, d[2] ? d[2].size : 1], x), [
    A,
    E,
    [1, d[1].size / d[0].size, d[2] ? d[2].size / d[0].size : 1],
    [w.xLength, w.yLength, w.zLength],
    [1, w.yLength / w.xLength, w.zLength / w.xLength]
  ];
}
const gv = {
  Uint8: Uint8Array,
  Uint16: Uint16Array,
  Uint32: Uint32Array,
  Int8: Int8Array,
  Int16: Int16Array,
  Int32: Int32Array,
  Float32: Float32Array,
  Float64: Float64Array
};
async function vv({ source: o, selection: n, onUpdate: r = () => {
}, downsampleDepth: i = 1, signal: l }) {
  const { shape: u, labels: a, dtype: d } = o, { height: f, width: g } = Dh(o), p = u[a.indexOf("z")], m = Math.max(1, Math.floor(p / i)), v = f * g, x = gv[d], _ = new x(v * m);
  return await Promise.all(new Array(m).fill(0).map(async (P, T) => {
    const w = {
      ...n,
      z: T * i
    }, { data: S } = await o.getRaster({
      selection: w,
      signal: l
    });
    let E = 0;
    for (r({ z: T, total: m, progress: 0.5 }); E < v; ) {
      const A = T * v + (v - E - 1), M = (g - E - 1) % g + g * Math.floor(E / g);
      _[A] = S[M], E += 1;
    }
    r({ z: T, total: m, progress: 1 });
  })), {
    data: _,
    height: f,
    width: g,
    depth: m
  };
}
function yv(o, n, r) {
  return vv({
    source: r[n],
    selection: { t: 0, c: o },
    // corresponds to the first channel of the first timepoint
    downsampleDepth: 2 ** n
  });
}
function xv(o) {
  const n = new cv();
  return n.xLength = o.width, n.yLength = o.height, n.zLength = o.depth, n.data = o.data, n;
}
function wv(o) {
  const n = new Ih(o.data, o.xLength, o.yLength, o.zLength);
  return n.format = zh, n.type = Oh, n.generateMipmaps = !1, n.minFilter = vo, n.magFilter = vo, n.needsUpdate = !0, n;
}
function Sv(o) {
  const { x: n, y: r, z: i } = o?.meta?.physicalSizes ?? {};
  return [n, r, i];
}
function _v(o) {
  const [n, r] = o.computeMinMax(), i = new Float32Array(o.data.length);
  for (let l = 0; l < o.data.length; l++)
    i[l] = (o.data[l] - n) / Math.sqrt(r ** 2 - n ** 2);
  return i;
}
async function Ev(o, n, r, i, l, u, a) {
  let d = null, f = null;
  const { shape: g, labels: p } = r[0], m = o.filter((x) => !i.has(x) || n !== a), v = await Promise.all(m.map((x) => yv(x, n, r)));
  return m.forEach((x, _) => {
    const P = v[_];
    d = xv(P);
    const T = d.computeMinMax();
    d.data = _v(d), i.set(x, d), l.set(x, wv(d)), u.set(x, T), f = Sv(r[n]);
  }), [
    i,
    l,
    u,
    f,
    [g[p.indexOf("x")], g[p.indexOf("y")], g[p.indexOf("z")]]
  ];
}
function Tv(o) {
  const n = pn(null), r = pn(null), [i, l] = ht(!1), [u, a] = ht(!1), [d, f] = ht(null), [g, p] = ht([1, 1, 1]), [m, v] = ht({
    uniforms: null,
    shader: null,
    meshScale: null,
    geometrySize: null,
    boxSize: null
  }), [x, _] = ht({
    volumes: /* @__PURE__ */ new Map(),
    textures: /* @__PURE__ */ new Map(),
    volumeMinMax: /* @__PURE__ */ new Map(),
    scale: null,
    resolution: null,
    originalScale: null
  }), [P, T] = ht({
    channelsVisible: [],
    allChannels: [],
    channelTargetC: [],
    resolution: null,
    data: null,
    colors: [],
    contrastLimits: [],
    is3dMode: !1,
    renderingMode: null,
    layerTransparency: 1
  }), [w, S] = ht({
    visible: !0,
    color: [1, 1, 1],
    opacity: 1,
    multiVisible: "",
    multiOpacity: "",
    multiColor: "",
    data: null,
    obsSets: []
  }), { images: E, layerScope: A, channelsVisible: M, allChannels: L, channelTargetC: R, resolution: z, data: b, colors: I, contrastLimits: k, is3dMode: j, renderingMode: G, layerTransparency: Y, xSlice: ee, ySlice: ae, zSlice: Se } = hv(o, P, T, u, a), { obsSegmentations: W, onEntitySelected: J, segmentationLayerCoordination: Z, segmentationChannelCoordination: te, segmentationChannelScopesByLayer: ge } = o;
  let xe = () => {
  };
  const Fe = [];
  if (te[0][A] !== void 0) {
    const se = te[0][A][A], { setObsHighlight: fe } = te[1][A][A];
    xe = fe;
    const le = te[0][A][A].additionalObsSets;
    le !== null && se.obsSetSelection.forEach((Me) => {
      const Pe = Me[1];
      le.tree[0].children.forEach((Ve) => {
        Ve.name === Pe && Ve.set.forEach(([ue]) => {
          const Ie = { name: "", id: "", color: [255, 255, 255] };
          Ie.name = Pe, Ie.id = ue, se.obsSetColor.forEach((st) => {
            st.path[1] === Pe && (Ie.color = st.color);
          }), Fe.push(Ie);
        });
      });
    }), se.obsHighlight !== null && Fe.push({ name: "", id: se.obsHighlight, color: [255, 34, 0] });
  }
  if (W?.[A]?.obsSegmentations && d == null) {
    const { scene: se, sceneOptions: fe } = W[A].obsSegmentations;
    if (se?.children) {
      const le = new fa(), Me = new lr();
      Me.userData.name = "finalPass", se.children.forEach((Ve) => {
        let ue = Ve;
        ue.material === void 0 && (ue = Ve.children[0]), (ue.material instanceof Tn || ue.material instanceof sr) && (ue.material = new Fa());
        let Ie = ue.name.replace("mesh_", "").replace("mesh", "").replace("glb", "").replace("_dec", "").replace("_Decobj", "").replace("obj", "").replace("_DEc", "").replace(".", "").replace("_Dec", "");
        Ie.includes("_") && (Ie = Ie.split("_")[0]), ue.name = Ie, ue.userData.name = Ie, ue.userData.layerScope = A, ue.material.transparent = !0, ue.material.writeDepthTexture = !0, ue.material.depthTest = !0, ue.material.depthWrite = !0, ue.material.needsUpdate = !0, ue.material.side = fe?.materialSide === "back" ? Kf : qr;
        const st = ue.clone();
        st.geometry = ue.geometry.clone(), st.geometry.translate(fe?.targetX ?? 0, fe?.targetY ?? 0, fe?.targetZ ?? 0), st.geometry.scale(fe?.scaleX ?? 1, fe?.scaleY ?? 1, fe?.scaleZ ?? 1), st.geometry.rotateX(fe?.rotationX ?? 0), st.geometry.rotateY(fe?.rotationY ?? 0), st.geometry.rotateZ(fe?.rotationZ ?? 0);
        const vt = ue.clone();
        vt.material = ue.material.clone(), vt.geometry = st.geometry.clone(), Me.add(vt);
      }), le.add(Me), le.scale.set(fe?.sceneScaleX ?? 1, fe?.sceneScaleY ?? 1, fe?.sceneScaleZ ?? 1);
      const Pe = [
        fe?.sceneScaleX ?? 1,
        fe?.sceneScaleY ?? 1,
        fe?.sceneScaleZ ?? 1
      ];
      p(Pe), le.rotateX(fe?.sceneRotationX ?? 0), le.rotateY(fe?.sceneRotationY ?? 0), le.rotateZ(fe?.sceneRotationZ ?? 0), f(le);
    }
  }
  if (te[0] !== void 0 && te[0][A] !== void 0) {
    const se = te[0][A][A];
    let fe = "";
    Fe.forEach((Me) => {
      fe += `${Me.id};${Me.color.toString()};${Me.name}`;
    });
    let le = "";
    if (w.obsSets.forEach((Me) => {
      le += `${Me.id};${Me.color.toString()};${Me.name}`;
    }), ge[A].length > 1) {
      let Me = "", Pe = "", Ve = "", ue = !1, Ie = 0;
      ge[A].forEach((st) => {
        const vt = te[0][A][st];
        Me += `${vt.spatialChannelColor.toString()};`, Pe += `${vt.spatialChannelOpacity};`, Ve += `${vt.spatialChannelVisible};`, ue |= vt.spatialChannelVisible, Ie += vt.spatialChannelOpacity;
      }), (Me !== w.multiColor || Pe !== w.multiOpacity || Ve !== w.multiVisible) && S({
        color: se.spatialChannelColor,
        opacity: Ie,
        visible: ue,
        multiColor: Me,
        multiVisible: Ve,
        multiOpacity: Pe,
        data: W,
        obsSets: Fe
      });
    } else
      (se.spatialChannelColor.toString() !== w.color.toString() || se.spatialChannelVisible !== w.visible || se.spatialChannelOpacity !== w.opacity || fe !== le) && S({
        color: se.spatialChannelColor,
        opacity: se.spatialChannelOpacity,
        visible: se.spatialChannelVisible,
        multiColor: "",
        multiVisible: "",
        multiOpacity: "",
        data: W,
        obsSets: Fe
      });
  }
  if (Sn(() => {
    if (d !== null) {
      let se = 0, fe = 0;
      for (let le = 0; le < d.children.length; le++)
        d.children[le].userData.name === "finalPass" ? fe = le : se = le;
      d.children[fe].children.forEach((le, Me) => {
        let { color: Pe } = w;
        const Ve = le.userData.name;
        if (w.obsSets.forEach((ue) => {
          ue.id === Ve && (Pe = ue.color);
        }), ge[A].length > 1)
          ge[A].forEach((ue) => {
            const Ie = te[0][A][ue];
            Ie.spatialTargetC === Ve && (le.material.color.r = Ie.spatialChannelColor[0] / 255, le.material.color.g = Ie.spatialChannelColor[1] / 255, le.material.color.b = Ie.spatialChannelColor[2] / 255, le.material.opacity = Ie.spatialChannelOpacity, le.visible = Ie.spatialChannelVisible, le.material.needsUpdate = !0, le.userData.layerScope = A, le.userData.channelScope = ue, d.children[se].children[Me].material.needsUpdate = !0);
          });
        else {
          le.material.color.r = Pe[0] / 255, le.material.color.g = Pe[1] / 255, le.material.color.b = Pe[2] / 255, le.material.opacity = w.opacity, le.material.visible = w.visible, le.material.needsUpdate = !0, le.userData.layerScope = A;
          const ue = Object.keys(te[0][A])?.[0];
          le.userData.channelScope = ue;
        }
      });
    }
  }, [w, d]), E[A]?.image?.instance?.getData() !== void 0 && !u && !i && k !== null && k[0][1] !== 255 && j && (a(!0), l(!0)), Sn(() => {
    const se = async () => {
      const fe = await Ev(R, z, b, x.volumes, x.textures, x.volumeMinMax, x.resolution);
      if (fe[0] !== null)
        if (_({
          resolution: z,
          volumes: fe[0],
          textures: fe[1],
          volumeMinMax: fe[2],
          scale: fe[3] !== null ? fe[3] : x.scale,
          originalScale: fe[4]
        }), !m.uniforms || !m.shader) {
          const le = bf(fe[0], R, M, I, fe[1], k, fe[2], fe[3], G, Y, ee, ae, Se, fe[4]);
          le !== null && v({
            uniforms: le[0],
            shader: le[1],
            meshScale: le[2],
            geometrySize: le[3],
            boxSize: le[4]
          });
        } else
          T({
            channelsVisible: M,
            allChannels: L,
            channelTargetC: R,
            resolution: z,
            data: b,
            colors: I,
            contrastLimits: k,
            is3dMode: j,
            renderingMode: G,
            layerTransparency: Y,
            xSlice: ee,
            ySlice: ae,
            zSlice: Se
          });
    };
    u && (z !== P.resolution && n.current && (n.current.material.uniforms.volumeCount.value = 0, n.current.material.uniforms.volumeTex.value = null), se(), a(!1));
  }, [u]), Sn(() => {
    if (m.uniforms && m.shader) {
      const se = bf(x.volumes, P.channelTargetC, P.channelsVisible, P.colors, x.textures, P.contrastLimits, x.volumeMinMax, x.scale, P.renderingMode, P.layerTransparency, P.xSlice, P.ySlice, P.zSlice, x.originalScale);
      if (se !== null) {
        let fe = 0;
        P.channelsVisible.forEach((le) => {
          le && fe++;
        }), a(!1), n?.current?.material?.uniforms && (n.current.material.uniforms.u_clim.value = se[0].u_clim.value, n.current.material.uniforms.u_clim2.value = se[0].u_clim2.value, n.current.material.uniforms.u_clim3.value = se[0].u_clim3.value, n.current.material.uniforms.u_clim4.value = se[0].u_clim4.value, n.current.material.uniforms.u_clim5.value = se[0].u_clim5.value, n.current.material.uniforms.u_clim6.value = se[0].u_clim6.value, n.current.material.uniforms.u_xClip.value = se[0].u_xClip.value, n.current.material.uniforms.u_yClip.value = se[0].u_yClip.value, n.current.material.uniforms.u_zClip.value = se[0].u_zClip.value, n.current.material.uniforms.u_color.value = se[0].u_color.value, n.current.material.uniforms.u_color2.value = se[0].u_color2.value, n.current.material.uniforms.u_color3.value = se[0].u_color3.value, n.current.material.uniforms.u_color4.value = se[0].u_color4.value, n.current.material.uniforms.u_color5.value = se[0].u_color5.value, n.current.material.uniforms.u_color6.value = se[0].u_color6.value, n.current.material.uniforms.volumeTex.value = se[0].volumeTex.value, n.current.material.uniforms.volumeTex2.value = se[0].volumeTex2.value, n.current.material.uniforms.volumeTex3.value = se[0].volumeTex3.value, n.current.material.uniforms.volumeTex4.value = se[0].volumeTex4.value, n.current.material.uniforms.volumeTex5.value = se[0].volumeTex5.value, n.current.material.uniforms.volumeTex6.value = se[0].volumeTex6.value, n.current.material.uniforms.volumeCount.value = fe, n.current.material.uniforms.u_renderstyle.value = P.renderingMode, n.current.material.uniforms.dtScale.value = P.layerTransparency);
      } else
        n?.current?.material?.uniforms && (n.current.material.uniforms.volumeCount.value = 0, n.current.material.uniforms.volumeTex.value = null);
    }
  }, [P]), !P.is3dMode)
    return null;
  if (P.is3dMode && (!m.uniforms || !m.shader))
    return re.jsxs("group", { children: [re.jsx("ambientLight", {}), re.jsx("pointLight", { position: [10, 10, 10] }), re.jsx(Ed, { color: "white", scale: 20, fontWeight: 1e3, children: "Loading ..." })] });
  const gt = {
    segmentationGroup: d,
    segmentationSettings: w,
    segmentationSceneScale: g,
    renderingSettings: m,
    materialRef: n,
    highlightEntity: J,
    setObsHighlight: xe
  };
  return re.jsxs("group", { children: [re.jsx(Wg, {}), re.jsx(Zg, {}), re.jsx(lv, {}), re.jsx(uv, {}), re.jsx(av, { ...gt }), re.jsx($g, { ref: r, enableDamping: !1, dampingFactor: 0, zoomDampingFactor: 0, smoothZoom: !1 })] });
}
const Rv = Fh((o, n) => re.jsxs("div", { style: { width: "100%", height: "100%" }, children: [re.jsx(Ga, { mode: "AR", sessionInit: { optionalFeatures: ["hand-tracking"] }, style: {
  border: "none",
  background: "rgba(0, 0, 0, 0.0)",
  zIndex: 1,
  position: "absolute"
}, children: (r) => r !== "unsupported" ? re.jsx("div", { style: {
  border: "1px solid white",
  padding: "12px 24px",
  borderRadius: "4px",
  background: "rgba(0, 0, 0, 0.1)",
  color: "white",
  font: "normal 0.8125rem sans-serif",
  outline: "none",
  cursor: "pointer"
}, children: r === "entered" ? "Exit AR" : "Enter AR" }) : null }), re.jsx(Mm, { style: { position: "absolute", top: 0, left: 0 }, camera: {
  fov: 50,
  up: [0, 1, 0],
  position: [0, 0, 800],
  near: 0.1,
  far: 3e3
}, gl: { antialias: !0, logarithmicDepthBuffer: !1 }, ref: n, children: re.jsx(Dm, { children: re.jsx(Tv, { ...o }) }) })] }));
export {
  Rv as SpatialWrapper
};
