class LoaderResult {
  /**
   * @param {LoaderDataType} data
   * @param {object[]|string|null} url Single URL or array of { url, name } objects.
   * @param {object|null} coordinationValues
   * @param {RequestInit|null} requestInit
   */
  constructor(data, url, coordinationValues = null, requestInit = null) {
    this.data = data;
    this.url = url;
    this.coordinationValues = coordinationValues;
    this.requestInit = requestInit;
  }
}
class AbstractLoader {
  /**
   *
   * @param {LoaderParams} params
   */
  constructor({
    type,
    fileType,
    url,
    requestInit,
    options,
    coordinationValues
  }) {
    this.fileType = fileType;
    this.type = type;
    this.url = url;
    this.requestInit = requestInit;
    this.options = options;
    this.coordinationValues = coordinationValues;
  }
  /**
   *
   * @returns {Promise<LoaderResult<any>>}
   */
  // eslint-disable-next-line class-methods-use-this
  async load() {
    return Promise.resolve(
      new LoaderResult(true, null)
    );
  }
}
class AbstractTwoStepLoader extends AbstractLoader {
  /**
   *
   * @param {DataSourceType} dataSource
   * @param {LoaderParams} params
   */
  constructor(dataSource, params) {
    super(params);
    this.dataSource = dataSource;
  }
}
class AbstractLoaderError {
  constructor(message) {
    this.message = message;
  }
  // eslint-disable-next-line class-methods-use-this
  warnInConsole() {
    throw new Error("The warnInConsole() method has not been implemented.");
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
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
class LoaderValidationError extends AbstractLoaderError {
  constructor(datasetType, datasetFileType, datasetUrl, reason) {
    super(`Error while validating ${datasetType}.`);
    this.name = "LoaderValidationError";
    this.datasetType = datasetType;
    this.datasetFileType = datasetFileType;
    this.datasetUrl = datasetUrl;
    this.reason = reason;
    this.message = `${datasetType} from ${datasetUrl}: validation failed`;
  }
  warnInConsole() {
    const {
      reason,
      message
    } = this;
    log.warn(
      message,
      JSON.stringify(reason, null, 2)
    );
  }
}
class LoaderNotFoundError extends AbstractLoaderError {
  constructor(loaders, dataset, fileType, viewCoordinationValues) {
    super(`Error: unable to find matching ${fileType} file in dataset ${dataset}.`);
    this.name = "LoaderNotFoundError";
    this.loaders = loaders;
    this.dataset = dataset;
    this.fileType = fileType;
    this.viewCoordinationValues = viewCoordinationValues;
    this.message = `Expected to match on { ${Object.entries(viewCoordinationValues || {}).map(([k, v]) => `${k}: ${v ?? "null"}`).join(", ")} }`;
  }
  warnInConsole() {
    const { loaders, message } = this;
    log.warn(message, loaders);
  }
}
class DatasetNotFoundError extends AbstractLoaderError {
  constructor(datasetUid) {
    super(`Error finding dataset for ${datasetUid}. Please check that at least one dataset exists in the view config.`);
    this.name = "DatasetNotFoundError";
    this.datasetUid = datasetUid;
    this.message = datasetUid ? `Unable to find dataset for ${datasetUid}` : "No dataset uid specified.";
  }
  warnInConsole() {
    const {
      message
    } = this;
    log.warn(message);
  }
}
class DataSourceFetchError extends AbstractLoaderError {
  constructor(source, url, headers) {
    super(`${source} Error HTTP Status fetching from ${url}`);
    this.source = source;
    this.url = url;
    this.headers = headers;
    this.message = `${source} failed to fetch from ${url} with headers ${JSON.stringify(headers)}`;
  }
  warnInConsole() {
    const { message } = this;
    log.warn(message);
  }
}
function getSourceAndLoaderFromFileType(type, fileTypes) {
  if (Array.isArray(fileTypes)) {
    const matchingFileType = fileTypes.find((ft) => ft.name === type);
    if (matchingFileType) {
      return matchingFileType.getSourceAndLoader();
    }
  }
  return [null, null];
}
function getDataTypeFromFileType(type, fileTypes) {
  if (Array.isArray(fileTypes)) {
    const matchingFileType = fileTypes.find((ft) => ft.name === type);
    if (matchingFileType) {
      return matchingFileType.dataType;
    }
  }
  return null;
}
export {
  AbstractLoader,
  AbstractLoaderError,
  AbstractTwoStepLoader,
  DataSourceFetchError,
  DatasetNotFoundError,
  LoaderNotFoundError,
  LoaderResult,
  LoaderValidationError,
  getDataTypeFromFileType,
  getSourceAndLoaderFromFileType
};
