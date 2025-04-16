var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var pluralize$1 = { exports: {} };
(function(module, exports) {
  (function(root, pluralize2) {
    if (typeof commonjsRequire === "function" && true && true) {
      module.exports = pluralize2();
    } else {
      root.pluralize = pluralize2();
    }
  })(commonjsGlobal, function() {
    var pluralRules = [];
    var singularRules = [];
    var uncountables = {};
    var irregularPlurals = {};
    var irregularSingles = {};
    function sanitizeRule(rule) {
      if (typeof rule === "string") {
        return new RegExp("^" + rule + "$", "i");
      }
      return rule;
    }
    function restoreCase(word, token) {
      if (word === token)
        return token;
      if (word === word.toLowerCase())
        return token.toLowerCase();
      if (word === word.toUpperCase())
        return token.toUpperCase();
      if (word[0] === word[0].toUpperCase()) {
        return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
      }
      return token.toLowerCase();
    }
    function interpolate(str, args) {
      return str.replace(/\$(\d{1,2})/g, function(match, index) {
        return args[index] || "";
      });
    }
    function replace(word, rule) {
      return word.replace(rule[0], function(match, index) {
        var result = interpolate(rule[1], arguments);
        if (match === "") {
          return restoreCase(word[index - 1], result);
        }
        return restoreCase(match, result);
      });
    }
    function sanitizeWord(token, word, rules) {
      if (!token.length || uncountables.hasOwnProperty(token)) {
        return word;
      }
      var len = rules.length;
      while (len--) {
        var rule = rules[len];
        if (rule[0].test(word))
          return replace(word, rule);
      }
      return word;
    }
    function replaceWord(replaceMap, keepMap, rules) {
      return function(word) {
        var token = word.toLowerCase();
        if (keepMap.hasOwnProperty(token)) {
          return restoreCase(word, token);
        }
        if (replaceMap.hasOwnProperty(token)) {
          return restoreCase(word, replaceMap[token]);
        }
        return sanitizeWord(token, word, rules);
      };
    }
    function checkWord(replaceMap, keepMap, rules, bool) {
      return function(word) {
        var token = word.toLowerCase();
        if (keepMap.hasOwnProperty(token))
          return true;
        if (replaceMap.hasOwnProperty(token))
          return false;
        return sanitizeWord(token, token, rules) === token;
      };
    }
    function pluralize2(word, count, inclusive) {
      var pluralized = count === 1 ? pluralize2.singular(word) : pluralize2.plural(word);
      return (inclusive ? count + " " : "") + pluralized;
    }
    pluralize2.plural = replaceWord(
      irregularSingles,
      irregularPlurals,
      pluralRules
    );
    pluralize2.isPlural = checkWord(
      irregularSingles,
      irregularPlurals,
      pluralRules
    );
    pluralize2.singular = replaceWord(
      irregularPlurals,
      irregularSingles,
      singularRules
    );
    pluralize2.isSingular = checkWord(
      irregularPlurals,
      irregularSingles,
      singularRules
    );
    pluralize2.addPluralRule = function(rule, replacement) {
      pluralRules.push([sanitizeRule(rule), replacement]);
    };
    pluralize2.addSingularRule = function(rule, replacement) {
      singularRules.push([sanitizeRule(rule), replacement]);
    };
    pluralize2.addUncountableRule = function(word) {
      if (typeof word === "string") {
        uncountables[word.toLowerCase()] = true;
        return;
      }
      pluralize2.addPluralRule(word, "$0");
      pluralize2.addSingularRule(word, "$0");
    };
    pluralize2.addIrregularRule = function(single, plural) {
      plural = plural.toLowerCase();
      single = single.toLowerCase();
      irregularSingles[single] = plural;
      irregularPlurals[plural] = single;
    };
    [
      // Pronouns.
      ["I", "we"],
      ["me", "us"],
      ["he", "they"],
      ["she", "they"],
      ["them", "them"],
      ["myself", "ourselves"],
      ["yourself", "yourselves"],
      ["itself", "themselves"],
      ["herself", "themselves"],
      ["himself", "themselves"],
      ["themself", "themselves"],
      ["is", "are"],
      ["was", "were"],
      ["has", "have"],
      ["this", "these"],
      ["that", "those"],
      // Words ending in with a consonant and `o`.
      ["echo", "echoes"],
      ["dingo", "dingoes"],
      ["volcano", "volcanoes"],
      ["tornado", "tornadoes"],
      ["torpedo", "torpedoes"],
      // Ends with `us`.
      ["genus", "genera"],
      ["viscus", "viscera"],
      // Ends with `ma`.
      ["stigma", "stigmata"],
      ["stoma", "stomata"],
      ["dogma", "dogmata"],
      ["lemma", "lemmata"],
      ["schema", "schemata"],
      ["anathema", "anathemata"],
      // Other irregular rules.
      ["ox", "oxen"],
      ["axe", "axes"],
      ["die", "dice"],
      ["yes", "yeses"],
      ["foot", "feet"],
      ["eave", "eaves"],
      ["goose", "geese"],
      ["tooth", "teeth"],
      ["quiz", "quizzes"],
      ["human", "humans"],
      ["proof", "proofs"],
      ["carve", "carves"],
      ["valve", "valves"],
      ["looey", "looies"],
      ["thief", "thieves"],
      ["groove", "grooves"],
      ["pickaxe", "pickaxes"],
      ["passerby", "passersby"]
    ].forEach(function(rule) {
      return pluralize2.addIrregularRule(rule[0], rule[1]);
    });
    [
      [/s?$/i, "s"],
      [/[^\u0000-\u007F]$/i, "$0"],
      [/([^aeiou]ese)$/i, "$1"],
      [/(ax|test)is$/i, "$1es"],
      [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
      [/(e[mn]u)s?$/i, "$1s"],
      [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
      [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
      [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
      [/(seraph|cherub)(?:im)?$/i, "$1im"],
      [/(her|at|gr)o$/i, "$1oes"],
      [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
      [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
      [/sis$/i, "ses"],
      [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
      [/([^aeiouy]|qu)y$/i, "$1ies"],
      [/([^ch][ieo][ln])ey$/i, "$1ies"],
      [/(x|ch|ss|sh|zz)$/i, "$1es"],
      [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
      [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
      [/(pe)(?:rson|ople)$/i, "$1ople"],
      [/(child)(?:ren)?$/i, "$1ren"],
      [/eaux$/i, "$0"],
      [/m[ae]n$/i, "men"],
      ["thou", "you"]
    ].forEach(function(rule) {
      return pluralize2.addPluralRule(rule[0], rule[1]);
    });
    [
      [/s$/i, ""],
      [/(ss)$/i, "$1"],
      [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
      [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
      [/ies$/i, "y"],
      [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
      [/\b(mon|smil)ies$/i, "$1ey"],
      [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
      [/(seraph|cherub)im$/i, "$1"],
      [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
      [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
      [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
      [/(test)(?:is|es)$/i, "$1is"],
      [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
      [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
      [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
      [/(alumn|alg|vertebr)ae$/i, "$1a"],
      [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
      [/(matr|append)ices$/i, "$1ix"],
      [/(pe)(rson|ople)$/i, "$1rson"],
      [/(child)ren$/i, "$1"],
      [/(eau)x?$/i, "$1"],
      [/men$/i, "man"]
    ].forEach(function(rule) {
      return pluralize2.addSingularRule(rule[0], rule[1]);
    });
    [
      // Singular words with no plurals.
      "adulthood",
      "advice",
      "agenda",
      "aid",
      "aircraft",
      "alcohol",
      "ammo",
      "analytics",
      "anime",
      "athletics",
      "audio",
      "bison",
      "blood",
      "bream",
      "buffalo",
      "butter",
      "carp",
      "cash",
      "chassis",
      "chess",
      "clothing",
      "cod",
      "commerce",
      "cooperation",
      "corps",
      "debris",
      "diabetes",
      "digestion",
      "elk",
      "energy",
      "equipment",
      "excretion",
      "expertise",
      "firmware",
      "flounder",
      "fun",
      "gallows",
      "garbage",
      "graffiti",
      "hardware",
      "headquarters",
      "health",
      "herpes",
      "highjinks",
      "homework",
      "housework",
      "information",
      "jeans",
      "justice",
      "kudos",
      "labour",
      "literature",
      "machinery",
      "mackerel",
      "mail",
      "media",
      "mews",
      "moose",
      "music",
      "mud",
      "manga",
      "news",
      "only",
      "personnel",
      "pike",
      "plankton",
      "pliers",
      "police",
      "pollution",
      "premises",
      "rain",
      "research",
      "rice",
      "salmon",
      "scissors",
      "series",
      "sewage",
      "shambles",
      "shrimp",
      "software",
      "species",
      "staff",
      "swine",
      "tennis",
      "traffic",
      "transportation",
      "trout",
      "tuna",
      "wealth",
      "welfare",
      "whiting",
      "wildebeest",
      "wildlife",
      "you",
      /pok[eé]mon$/i,
      // Regexes.
      /[^aeiou]ese$/i,
      // "chinese", "japanese"
      /deer$/i,
      // "deer", "reindeer"
      /fish$/i,
      // "fish", "blowfish", "angelfish"
      /measles$/i,
      /o[iu]s$/i,
      // "carnivorous"
      /pox$/i,
      // "chickpox", "smallpox"
      /sheep$/i
    ].forEach(pluralize2.addUncountableRule);
    return pluralize2;
  });
})(pluralize$1);
var pluralizeExports = pluralize$1.exports;
const plur = /* @__PURE__ */ getDefaultExportFromCjs(pluralizeExports);
plur.addPluralRule("glomerulus", "glomeruli");
plur.addPluralRule("interstitium", "interstitia");
function commaNumber(n) {
  const nf = new Intl.NumberFormat("en-US");
  return nf.format(n);
}
function capitalize(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
}
function pluralize(word, count = null) {
  return plur(word, count);
}
function getLongestString(strings) {
  return strings.reduce(
    (prevLongest, currentValue) => prevLongest.length > currentValue.length ? prevLongest : currentValue
  );
}
function cleanFeatureId(featureName) {
  if (featureName.startsWith("ENSG")) {
    return featureName.split(".")[0];
  }
  return featureName;
}
function getNextScope(prevScopes) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nextCharIndices = [0];
  function next() {
    const r = [];
    nextCharIndices.forEach((charIndex) => {
      r.unshift(chars[charIndex]);
    });
    let increment = true;
    for (let i = 0; i < nextCharIndices.length; i++) {
      const val = ++nextCharIndices[i];
      if (val >= chars.length) {
        nextCharIndices[i] = 0;
      } else {
        increment = false;
        break;
      }
    }
    if (increment) {
      nextCharIndices.push(0);
    }
    return r.join("");
  }
  let nextScope;
  do {
    nextScope = next();
  } while (prevScopes.includes(nextScope));
  return nextScope;
}
function getNextScopeNumeric(prevScopes) {
  let nextScopeInt = 0;
  let nextScopeStr;
  do {
    nextScopeStr = `${nextScopeInt}`;
    nextScopeInt += 1;
  } while (prevScopes.includes(nextScopeStr));
  return nextScopeStr;
}
function createPrefixedGetNextScopeNumeric(prefix) {
  return (prevScopes) => {
    let nextScopeInt = 0;
    let nextScopeStr;
    do {
      nextScopeStr = `${prefix}${nextScopeInt}`;
      nextScopeInt += 1;
    } while (prevScopes.includes(nextScopeStr));
    return nextScopeStr;
  };
}
function getInitialCoordinationScopePrefix(datasetUid, dataType) {
  return `init_${datasetUid}_${dataType}_`;
}
function getInitialCoordinationScopeName(datasetUid, dataType, i = null) {
  const prefix = getInitialCoordinationScopePrefix(datasetUid, dataType);
  return `${prefix}${i === null ? 0 : i}`;
}
const identityFunc = (d) => d;
function unnestMap(map, keys, aggFunc) {
  if (keys.length < 2) {
    throw new Error("Insufficient number of keys passed to flattenInternMap");
  }
  const aggFuncToUse = !aggFunc ? identityFunc : aggFunc;
  return Array.from(map.entries()).flatMap(([k, v]) => {
    if (v instanceof Map) {
      const keysWithoutFirst = [...keys];
      keysWithoutFirst.splice(0, 1);
      return unnestMap(v, keysWithoutFirst, aggFuncToUse).map((childObj) => ({
        [keys[0]]: k,
        ...childObj
      }));
    }
    return {
      [keys[0]]: k,
      [keys[1]]: aggFuncToUse(v)
    };
  });
}
var loglevel = { exports: {} };
(function(module) {
  (function(root, definition) {
    if (module.exports) {
      module.exports = definition();
    } else {
      root.log = definition();
    }
  })(commonjsGlobal, function() {
    var noop = function() {
    };
    var undefinedType = "undefined";
    var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
    var logMethods = [
      "trace",
      "debug",
      "info",
      "warn",
      "error"
    ];
    var _loggersByName = {};
    var defaultLogger = null;
    function bindMethod(obj, methodName) {
      var method = obj[methodName];
      if (typeof method.bind === "function") {
        return method.bind(obj);
      } else {
        try {
          return Function.prototype.bind.call(method, obj);
        } catch (e) {
          return function() {
            return Function.prototype.apply.apply(method, [obj, arguments]);
          };
        }
      }
    }
    function traceForIE() {
      if (console.log) {
        if (console.log.apply) {
          console.log.apply(console, arguments);
        } else {
          Function.prototype.apply.apply(console.log, [console, arguments]);
        }
      }
      if (console.trace)
        console.trace();
    }
    function realMethod(methodName) {
      if (methodName === "debug") {
        methodName = "log";
      }
      if (typeof console === undefinedType) {
        return false;
      } else if (methodName === "trace" && isIE) {
        return traceForIE;
      } else if (console[methodName] !== void 0) {
        return bindMethod(console, methodName);
      } else if (console.log !== void 0) {
        return bindMethod(console, "log");
      } else {
        return noop;
      }
    }
    function replaceLoggingMethods() {
      var level = this.getLevel();
      for (var i = 0; i < logMethods.length; i++) {
        var methodName = logMethods[i];
        this[methodName] = i < level ? noop : this.methodFactory(methodName, level, this.name);
      }
      this.log = this.debug;
      if (typeof console === undefinedType && level < this.levels.SILENT) {
        return "No console available for logging";
      }
    }
    function enableLoggingWhenConsoleArrives(methodName) {
      return function() {
        if (typeof console !== undefinedType) {
          replaceLoggingMethods.call(this);
          this[methodName].apply(this, arguments);
        }
      };
    }
    function defaultMethodFactory(methodName, _level, _loggerName) {
      return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }
    function Logger(name, factory) {
      var self2 = this;
      var inheritedLevel;
      var defaultLevel;
      var userLevel;
      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = void 0;
      }
      function persistLevelIfPossible(levelNum) {
        var levelName = (logMethods[levelNum] || "silent").toUpperCase();
        if (typeof window === undefinedType || !storageKey)
          return;
        try {
          window.localStorage[storageKey] = levelName;
          return;
        } catch (ignore) {
        }
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
        } catch (ignore) {
        }
      }
      function getPersistedLevel() {
        var storedLevel;
        if (typeof window === undefinedType || !storageKey)
          return;
        try {
          storedLevel = window.localStorage[storageKey];
        } catch (ignore) {
        }
        if (typeof storedLevel === undefinedType) {
          try {
            var cookie = window.document.cookie;
            var cookieName = encodeURIComponent(storageKey);
            var location = cookie.indexOf(cookieName + "=");
            if (location !== -1) {
              storedLevel = /^([^;]+)/.exec(
                cookie.slice(location + cookieName.length + 1)
              )[1];
            }
          } catch (ignore) {
          }
        }
        if (self2.levels[storedLevel] === void 0) {
          storedLevel = void 0;
        }
        return storedLevel;
      }
      function clearPersistedLevel() {
        if (typeof window === undefinedType || !storageKey)
          return;
        try {
          window.localStorage.removeItem(storageKey);
        } catch (ignore) {
        }
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        } catch (ignore) {
        }
      }
      function normalizeLevel(input) {
        var level = input;
        if (typeof level === "string" && self2.levels[level.toUpperCase()] !== void 0) {
          level = self2.levels[level.toUpperCase()];
        }
        if (typeof level === "number" && level >= 0 && level <= self2.levels.SILENT) {
          return level;
        } else {
          throw new TypeError("log.setLevel() called with invalid level: " + input);
        }
      }
      self2.name = name;
      self2.levels = {
        "TRACE": 0,
        "DEBUG": 1,
        "INFO": 2,
        "WARN": 3,
        "ERROR": 4,
        "SILENT": 5
      };
      self2.methodFactory = factory || defaultMethodFactory;
      self2.getLevel = function() {
        if (userLevel != null) {
          return userLevel;
        } else if (defaultLevel != null) {
          return defaultLevel;
        } else {
          return inheritedLevel;
        }
      };
      self2.setLevel = function(level, persist) {
        userLevel = normalizeLevel(level);
        if (persist !== false) {
          persistLevelIfPossible(userLevel);
        }
        return replaceLoggingMethods.call(self2);
      };
      self2.setDefaultLevel = function(level) {
        defaultLevel = normalizeLevel(level);
        if (!getPersistedLevel()) {
          self2.setLevel(level, false);
        }
      };
      self2.resetLevel = function() {
        userLevel = null;
        clearPersistedLevel();
        replaceLoggingMethods.call(self2);
      };
      self2.enableAll = function(persist) {
        self2.setLevel(self2.levels.TRACE, persist);
      };
      self2.disableAll = function(persist) {
        self2.setLevel(self2.levels.SILENT, persist);
      };
      self2.rebuild = function() {
        if (defaultLogger !== self2) {
          inheritedLevel = normalizeLevel(defaultLogger.getLevel());
        }
        replaceLoggingMethods.call(self2);
        if (defaultLogger === self2) {
          for (var childName in _loggersByName) {
            _loggersByName[childName].rebuild();
          }
        }
      };
      inheritedLevel = normalizeLevel(
        defaultLogger ? defaultLogger.getLevel() : "WARN"
      );
      var initialLevel = getPersistedLevel();
      if (initialLevel != null) {
        userLevel = normalizeLevel(initialLevel);
      }
      replaceLoggingMethods.call(self2);
    }
    defaultLogger = new Logger();
    defaultLogger.getLogger = function getLogger(name) {
      if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
        throw new TypeError("You must supply a name when creating a logger.");
      }
      var logger = _loggersByName[name];
      if (!logger) {
        logger = _loggersByName[name] = new Logger(
          name,
          defaultLogger.methodFactory
        );
      }
      return logger;
    };
    var _log = typeof window !== undefinedType ? window.log : void 0;
    defaultLogger.noConflict = function() {
      if (typeof window !== undefinedType && window.log === defaultLogger) {
        window.log = _log;
      }
      return defaultLogger;
    };
    defaultLogger.getLoggers = function getLoggers() {
      return _loggersByName;
    };
    defaultLogger["default"] = defaultLogger;
    return defaultLogger;
  });
})(loglevel);
var loglevelExports = loglevel.exports;
const log = /* @__PURE__ */ getDefaultExportFromCjs(loglevelExports);
const DEFAULT_DARK_COLOR = [50, 50, 50];
const DEFAULT_LIGHT_COLOR = [200, 200, 200];
const DEFAULT_LIGHT2_COLOR = [235, 235, 235];
function getDefaultColor(theme) {
  return theme === "dark" ? DEFAULT_DARK_COLOR : theme === "light" ? DEFAULT_LIGHT_COLOR : DEFAULT_LIGHT2_COLOR;
}
function getDefaultForegroundColor(theme) {
  return theme === "dark" ? DEFAULT_LIGHT2_COLOR : DEFAULT_DARK_COLOR;
}
const PALETTE = [
  [68, 119, 170],
  [136, 204, 238],
  [68, 170, 153],
  [17, 119, 51],
  [153, 153, 51],
  [221, 204, 119],
  [204, 102, 119],
  [136, 34, 85],
  [170, 68, 153]
];
const VIEWER_PALETTE = [
  [0, 0, 255],
  [0, 255, 0],
  [255, 0, 255],
  [255, 255, 0],
  [0, 255, 255],
  [255, 255, 255],
  [255, 128, 0],
  [255, 0, 0]
];
const PATHOLOGY_PALETTE = [
  [0, 0, 0],
  [228, 158, 37],
  [91, 181, 231],
  [22, 157, 116],
  [239, 226, 82],
  [16, 115, 176],
  [211, 94, 26],
  [202, 122, 166]
];
const LARGE_PATHOLOGY_PALETTE = [
  [0, 0, 0],
  [0, 73, 73],
  [0, 146, 146],
  [255, 109, 182],
  [255, 182, 219],
  [73, 0, 146],
  [0, 109, 219],
  [182, 109, 255],
  [109, 182, 255],
  [182, 219, 255],
  [146, 0, 0],
  [146, 72, 0],
  [219, 109, 0],
  [36, 255, 36],
  [255, 255, 109],
  [255, 255, 255]
];
const COLORMAP_OPTIONS = [
  "viridis",
  "greys",
  "magma",
  "jet",
  "hot",
  "bone",
  "copper",
  "summer",
  "density",
  "inferno"
];
const DEFAULT_GL_OPTIONS = { webgl2: true };
function createDefaultUpdateStatus(componentName) {
  return (message) => log.warn(`${componentName} updateStatus: ${message}`);
}
function createDefaultUpdateCellsSelection(componentName) {
  return (cellsSelection) => log.warn(`${componentName} updateCellsSelection: ${cellsSelection}`);
}
function createDefaultUpdateCellsHover(componentName) {
  return (hoverInfo) => log.warn(`${componentName} updateCellsHover: ${hoverInfo.cellId}`);
}
function createDefaultUpdateGenesHover(componentName) {
  return (hoverInfo) => log.warn(`${componentName} updateGenesHover: ${hoverInfo.geneId}`);
}
function createDefaultUpdateTracksHover(componentName) {
  return (hoverInfo) => log.warn(`${componentName} updateTracksHover: ${hoverInfo}`);
}
function createDefaultUpdateViewInfo(componentName) {
  return (viewInfo) => log.warn(`${componentName} updateViewInfo: ${viewInfo}`);
}
function createDefaultClearPleaseWait() {
  return () => {
  };
}
function copyUint8Array(arr) {
  const newBuffer = new ArrayBuffer(arr.buffer.byteLength);
  const newArr = new Uint8Array(newBuffer);
  newArr.set(arr);
  return newArr;
}
function asEsModule(component) {
  return {
    __esModule: true,
    default: component
  };
}
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0)
    return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
const VALUE_TRANSFORM_OPTIONS = [
  { name: "None", value: null },
  { name: "Log", value: "log1p" },
  { name: "ArcSinh", value: "arcsinh" }
];
function getValueTransformFunction(featureValueTransform, coefficient) {
  let transformFunction;
  switch (featureValueTransform) {
    case "log1p":
      transformFunction = (v) => Math.log(1 + v * coefficient);
      break;
    case "arcsinh":
      transformFunction = (v) => Math.asinh(v * coefficient);
      break;
    default:
      transformFunction = (v) => v;
  }
  return transformFunction;
}
const defaultPoolSize = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 1;
class Pool {
  /**
   * @constructor
   * @param {object} Worker The worker class to be used for processing.
   */
  constructor(createWorker) {
    __publicField(this, "workers");
    __publicField(this, "idleWorkers");
    __publicField(this, "waitQueue");
    this.workers = [];
    this.idleWorkers = [];
    this.waitQueue = [];
    for (let i = 0; i < defaultPoolSize; ++i) {
      const w = createWorker();
      this.workers.push(w);
      this.idleWorkers.push(w);
    }
  }
  // eslint-disable-next-line class-methods-use-this
  async process() {
    throw new Error('Pool needs to implement "process" method');
  }
  async waitForWorker() {
    const idleWorker = this.idleWorkers.pop();
    if (idleWorker) {
      return idleWorker;
    }
    const waiter = {};
    const promise = new Promise((resolve) => {
      waiter.resolve = resolve;
    });
    this.waitQueue.push(waiter);
    return promise;
  }
  async finishTask(currentWorker) {
    const waiter = this.waitQueue.pop();
    if (waiter && waiter.resolve) {
      waiter.resolve(currentWorker);
    } else {
      this.idleWorkers.push(currentWorker);
    }
  }
  destroy() {
    for (let i = 0; i < this.workers.length; ++i) {
      this.workers[i].terminate();
    }
  }
}
export {
  COLORMAP_OPTIONS,
  DEFAULT_DARK_COLOR,
  DEFAULT_GL_OPTIONS,
  DEFAULT_LIGHT_COLOR,
  LARGE_PATHOLOGY_PALETTE,
  PALETTE,
  PATHOLOGY_PALETTE,
  Pool,
  VALUE_TRANSFORM_OPTIONS,
  VIEWER_PALETTE,
  asEsModule,
  capitalize,
  cleanFeatureId,
  commaNumber,
  copyUint8Array,
  createDefaultClearPleaseWait,
  createDefaultUpdateCellsHover,
  createDefaultUpdateCellsSelection,
  createDefaultUpdateGenesHover,
  createDefaultUpdateStatus,
  createDefaultUpdateTracksHover,
  createDefaultUpdateViewInfo,
  createPrefixedGetNextScopeNumeric,
  formatBytes,
  getDefaultColor,
  getDefaultForegroundColor,
  getInitialCoordinationScopeName,
  getInitialCoordinationScopePrefix,
  getLongestString,
  getNextScope,
  getNextScopeNumeric,
  getValueTransformFunction,
  pluralize,
  unnestMap
};
