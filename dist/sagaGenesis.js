// saga-genesis v0.1.0
// Copyright 2018 Brendan Asselstine, Chuck Bergeron
// https://github.com/MedCredits/saga-genesis#readme

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactRedux = require('react-redux');
var Web3 = _interopDefault(require('web3'));
var BN = _interopDefault(require('bn.js'));
var abi = _interopDefault(require('ethjs-abi'));
var reduxSaga = require('redux-saga');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var ContractRegistryProvider =
/*#__PURE__*/
function (_React$Component) {
  inherits(ContractRegistryProvider, _React$Component);

  function ContractRegistryProvider() {
    classCallCheck(this, ContractRegistryProvider);

    return possibleConstructorReturn(this, getPrototypeOf(ContractRegistryProvider).apply(this, arguments));
  }

  createClass(ContractRegistryProvider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        contractRegistry: this.props.contractRegistry
      };
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.Children.only(this.props.children);
    }
  }]);

  return ContractRegistryProvider;
}(React__default.Component);
ContractRegistryProvider.propTypes = {
  contractRegistry: PropTypes.object.isRequired
};
ContractRegistryProvider.childContextTypes = {
  contractRegistry: PropTypes.object
};

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

function withContractRegistry(WrappedComponent) {
  var ContractRegistryWrapper =
  /*#__PURE__*/
  function (_Component) {
    inherits(_ContractRegistryWrapper, _Component);

    function _ContractRegistryWrapper() {
      classCallCheck(this, _ContractRegistryWrapper);

      return possibleConstructorReturn(this, getPrototypeOf(_ContractRegistryWrapper).apply(this, arguments));
    }

    createClass(_ContractRegistryWrapper, [{
      key: "render",
      value: function render() {
        return React__default.createElement(WrappedComponent, _extends_1({}, this.props, {
          contractRegistry: this.context.contractRegistry
        }));
      }
    }]);

    return _ContractRegistryWrapper;
  }(React.Component);

  ContractRegistryWrapper.contextTypes = {
    contractRegistry: PropTypes.object
  };
  return ContractRegistryWrapper;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

var lastSagaKey = 0;

var debug = require('debug')('withSaga');

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withSaga(saga) {
  return function (WrappedComponent) {
    function mapStateToProps(state) {
      return {
        sagaGenesisReady: state.sagaGenesis.sagaGenesisInit.initialized
      };
    }

    function mapDispatchToProps(dispatch, props) {
      return {
        dispatchPrepareSaga: function dispatchPrepareSaga(props, key) {
          dispatch({
            type: 'PREPARE_SAGA',
            saga: saga,
            key: key,
            props: props
          });
        },
        dispatchRunSaga: function dispatchRunSaga(props, key, displayName) {
          dispatch({
            type: "RUN_SAGA_".concat(key),
            saga: saga,
            props: props,
            key: key,
            displayName: displayName
          });
        },
        dispatchEndSaga: function dispatchEndSaga(key) {
          dispatch({
            type: "END_SAGA_".concat(key),
            key: key
          });
        }
      };
    }

    var SagaWrapper = reactRedux.connect(mapStateToProps, mapDispatchToProps)(
    /*#__PURE__*/
    function (_PureComponent) {
      inherits(_SagaWrapper, _PureComponent);

      function _SagaWrapper(props, context) {
        var _this;

        classCallCheck(this, _SagaWrapper);

        _this = possibleConstructorReturn(this, getPrototypeOf(_SagaWrapper).call(this, props, context));

        defineProperty(assertThisInitialized(assertThisInitialized(_this)), "displayName", "WithSaga(".concat(getDisplayName(WrappedComponent), ")"));

        _this.sagaKey = ++lastSagaKey;
        debug("constructor ".concat(_this.sagaKey));
        return _this;
      }

      createClass(_SagaWrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          debug("componentDidMount ".concat(this.sagaKey));

          if (this.props.sagaGenesisReady) {
            this.prepareSaga(this.props);
          }
        }
      }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          debug("componentWillReceiveProps ".concat(this.sagaKey));

          if (nextProps.sagaGenesisReady && this.props.sagaGenesisReady !== nextProps.sagaGenesisReady) {
            this.prepareSaga(nextProps);
          }
        }
      }, {
        key: "prepareSaga",
        value: function prepareSaga(props) {
          debug("prepareSaga ".concat(this.sagaKey));
          props.dispatchPrepareSaga(props, this.sagaKey);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          debug("dispatchEndSaga ".concat(this.sagaKey));
          this.props.dispatchEndSaga(this.sagaKey);
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          if (this.props.sagaGenesisReady) {
            debug("dispatchRunSaga ".concat(this.sagaKey));
            this.props.dispatchRunSaga(this.props, this.sagaKey, this.displayName);
          }
        }
      }, {
        key: "render",
        value: function render() {
          return React__default.createElement(WrappedComponent, _extends_1({}, this.props, {
            sagaKey: this.sagaKey
          }));
        }
      }]);

      return _SagaWrapper;
    }(React.PureComponent));
    return SagaWrapper;
  };
}

var construct = createCommonjsModule(function (module) {
function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
});

var _web3 = null;
function getWeb3OrNull () {
  if (!_web3 && window && window.web3) {
    _web3 = new Web3(window.web3.currentProvider);
  }

  return _web3;
}

var _web3$1;

function getWeb3 () {
  if (!_web3$1) {
    _web3$1 = getWeb3OrNull();
  }

  if (!_web3$1) {
    _web3$1 = new Web3();
  }

  return _web3$1;
}

function sha3() {
  var web3 = getWeb3();

  if (web3.utils) {
    var _web3$utils$sha;

    return (_web3$utils$sha = web3.utils.sha3).call.apply(_web3$utils$sha, [null].concat(Array.prototype.slice.call(arguments)));
  } else {
    var _web3$sha;

    return (_web3$sha = web3.sha3).call.apply(_web3$sha, [null].concat(Array.prototype.slice.call(arguments)));
  }
}

function hashCall () {
  var digest = "NotAHex" + Array.from(arguments).join('-');
  return sha3(digest);
}

var Call =
/*#__PURE__*/
function () {
  function Call(address, method) {
    classCallCheck(this, Call);

    this.address = address;
    this.method = method;

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.args = args;
    this.hash = hashCall.apply(void 0, [address, method].concat(args));
  }

  createClass(Call, [{
    key: "toString",
    value: function toString(call) {
      return "".concat(this.address, ": ").concat(this.method, "(").concat(this.args.map(function (a) {
        return a.toString();
      }).join(', '), ")");
    }
  }]);

  return Call;
}();

function createCall(address, method) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return construct(Call, [address, method].concat(args));
}

var transactionIds = 0;
function nextId() {
  transactionIds += 1;
  return transactionIds;
}

function withSend(WrappedComponent) {
  function mapDispatchToProps(dispatch, props) {
    return {
      dispatchSend: function dispatchSend(transactionId, call, address, options) {
        dispatch({
          type: 'SG_SEND_TRANSACTION',
          transactionId: transactionId,
          call: call,
          address: address,
          options: options
        });
      }
    };
  }

  var SendWrapper = reactRedux.connect(function () {
    return {};
  }, mapDispatchToProps)(
  /*#__PURE__*/
  function (_Component) {
    inherits(_SendWrapper, _Component);

    function _SendWrapper() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, _SendWrapper);

      for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(_SendWrapper)).call.apply(_getPrototypeOf2, [this].concat(_args)));

      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "send", function (address, method) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        return function (options) {
          var call = createCall.apply(void 0, [address, method].concat(args));
          var transactionId = nextId();

          _this.props.dispatchSend(transactionId, call, address, options);

          return transactionId;
        };
      });

      return _this;
    }

    createClass(_SendWrapper, [{
      key: "render",
      value: function render() {
        return React__default.createElement(WrappedComponent, _extends_1({}, this.props, {
          send: this.send
        }));
      }
    }]);

    return _SendWrapper;
  }(React.Component));
  return SendWrapper;
}

function addLogListener(address, fromBlock) {
  return {
    type: 'ADD_LOG_LISTENER',
    address: address,
    fromBlock: fromBlock
  };
}
function removeLogListener(address) {
  return {
    type: 'REMOVE_LOG_LISTENER',
    address: address
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchAddLogListener: function dispatchAddLogListener(address, fromBlock) {
      dispatch(addLogListener(address, fromBlock));
    },
    dispatchRemoveLogListener: function dispatchRemoveLogListener(address) {
      dispatch(removeLogListener(address));
    }
  };
}

function isDefined(variable) {
  return variable !== null && typeof variable !== 'undefined';
}

var LogListener = reactRedux.connect(function () {
  return {};
}, mapDispatchToProps)(
/*#__PURE__*/
function (_Component) {
  inherits(_LogListener, _Component);

  function _LogListener() {
    classCallCheck(this, _LogListener);

    return possibleConstructorReturn(this, getPrototypeOf(_LogListener).apply(this, arguments));
  }

  createClass(_LogListener, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.address && isDefined(this.props.fromBlock)) {
        this.props.dispatchAddLogListener(this.props.address, this.props.fromBlock);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var oldPropsAreFullyDefined = this.props.address && isDefined(this.props.fromBlock);
      var addressHasChanged = this.props.address !== props.address;
      var removedOldProps = false;

      if (oldPropsAreFullyDefined && addressHasChanged) {
        this.props.dispatchRemoveLogListener();
        removedOldProps = true;
      }

      var newPropsAreFullyDefined = props.address && isDefined(props.fromBlock);

      if ((!oldPropsAreFullyDefined || removedOldProps) && newPropsAreFullyDefined) {
        this.props.dispatchAddLogListener(props.address, props.fromBlock);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.dispatchRemoveLogListener(this.props.address);
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement(React__default.Fragment, null, this.props.children);
    }
  }]);

  return _LogListener;
}(React.Component));
LogListener.propTypes = {
  address: PropTypes.string,
  fromBlock: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(BN)])
};

function contractByName (state, name) {
  var networkId = state.sagaGenesis.network.networkId;

  if (state.sagaGenesis && state.sagaGenesis.contracts && state.sagaGenesis.contracts.networks[networkId] && state.sagaGenesis.contracts.networks[networkId].nameAddress) {
    return state.sagaGenesis.contracts.networks[networkId].nameAddress[name];
  }
}

function contractKeyByAddress (state, address) {
  if (!address) {
    return;
  }

  address = address.toLowerCase();
  var networkId = state.sagaGenesis.network.networkId;

  if (state.sagaGenesis && state.sagaGenesis.contracts && state.sagaGenesis.contracts.networks[networkId]) {
    return state.sagaGenesis.contracts.networks[networkId].addressContractKey[address];
  }
}

function cacheCallState (state, addressOrName, method) {
  if (addressOrName && !addressOrName.startsWith('0x')) {
    addressOrName = contractByName(state, addressOrName);
  }

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var hash = hashCall.apply(null, [addressOrName, method].concat(args));
  return state.sagaGenesis.callCache[hash] || {};
}

function cacheCallValue (state, address, method) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var callState = cacheCallState.apply(void 0, [state, address, method].concat(args));
  if (callState) return callState.response;
}

function cacheCallValueInt (state, address, method) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var callState = cacheCallState.apply(void 0, [state, address, method].concat(args));
  var response = callState.response;

  if (response) {
    response = parseInt(response, 10);
  }

  return response;
}

function cacheCallValueBigNumber (state, address, method) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var callState = cacheCallState.apply(void 0, [state, address, method].concat(args));
  var response = callState.response;

  if (response) {
    var bigNum = new BN(response);
  }

  return bigNum;
}

function abiFactory(abi$$1) {
  return function (web3, address) {
    return new web3.eth.Contract(abi$$1, address);
  };
}

var ABIHelper =
/*#__PURE__*/
function () {
  function ABIHelper(abi$$1) {
    var _this = this;

    classCallCheck(this, ABIHelper);

    this._lookup = {};
    this._topic0Lookup = {};
    abi$$1.forEach(function (definition) {
      _this._lookup[definition.name] = definition;

      if (definition.type === 'event') {
        var topic0 = _this.topic0(definition);

        _this._topic0Lookup[topic0] = definition;
      }
    });
  }

  createClass(ABIHelper, [{
    key: "lookup",
    value: function lookup(name) {
      return this._lookup[name];
    }
  }, {
    key: "topic0",
    value: function topic0(nameOrDefinition) {
      var definition;

      if (typeof nameOrDefinition === 'string') {
        definition = this._lookup[nameOrDefinition];
      } else {
        definition = nameOrDefinition;
      }

      var types = definition.inputs.map(function (input) {
        return input.type;
      });
      return sha3("".concat(definition.name, "(").concat(types.join(','), ")"));
    }
  }, {
    key: "decodeLogParameters",
    value: function decodeLogParameters(log) {
      var definition = this._topic0Lookup[log.topics[0]];
      return abi.decodeEvent(definition, log.data, log.topics);
    }
  }]);

  return ABIHelper;
}();

var CallCountRegistry =
/*#__PURE__*/
function () {
  function CallCountRegistry() {
    classCallCheck(this, CallCountRegistry);

    this.contractCalls = {};
    this.keyCalls = {};
  }

  createClass(CallCountRegistry, [{
    key: "count",
    value: function count(call) {
      var callState = this._getContractCallState(call);

      if (callState) {
        return callState.count;
      } else {
        return 0;
      }
    }
  }, {
    key: "register",
    value: function register(call, key) {
      this._increment(call);

      this._getKeyCalls(key).push(call);
    }
  }, {
    key: "deregister",
    value: function deregister(key) {
      var deletedCalls = this.decrementCalls(this._getKeyCalls(key));
      delete this.keyCalls[key];
      return deletedCalls;
    }
  }, {
    key: "decrementCalls",
    value: function decrementCalls(calls) {
      var _this = this;

      return calls.reduce(function (accumulator, call) {
        if (!_this._decrement(call)) {
          accumulator.push(call);
        }

        return accumulator;
      }, []);
    }
  }, {
    key: "getContractCalls",
    value: function getContractCalls(address) {
      if (!address) {
        return {};
      }

      address = address.toLowerCase();
      var contractCalls = this.contractCalls[address];

      if (!contractCalls) {
        contractCalls = {};
        this.contractCalls[address] = contractCalls;
      }

      return contractCalls;
    }
  }, {
    key: "resetKeyCalls",
    value: function resetKeyCalls(key) {
      var keyCalls = this._getKeyCalls(key);

      this.keyCalls[key] = [];
      return keyCalls;
    }
  }, {
    key: "_getKeyCalls",
    value: function _getKeyCalls(key) {
      var keyCalls = this.keyCalls[key];

      if (!keyCalls) {
        keyCalls = [];
        this.keyCalls[key] = keyCalls;
      }

      return keyCalls;
    }
  }, {
    key: "_increment",
    value: function _increment(call) {
      var callState = this._getContractCallState(call);

      if (callState) {
        callState.count += 1;
      } else {
        callState = {
          count: 1,
          call: call
        };
        this.getContractCalls(call.address)[call.hash] = callState;
      }

      return callState.count;
    }
  }, {
    key: "_decrement",
    value: function _decrement(call) {
      var callState = this._getContractCallState(call);

      var result = 0;

      if (callState) {
        callState.count -= 1;

        if (callState.count === 0) {
          delete this.getContractCalls(call.address)[call.hash];
        } else {
          result = callState.count;
        }
      }

      return result;
    }
  }, {
    key: "_getContractCallState",
    value: function _getContractCallState(call) {
      return this.getContractCalls(call.address)[call.hash];
    }
  }]);

  return CallCountRegistry;
}();

var ContractRegistry =
/*#__PURE__*/
function () {
  function ContractRegistry(config) {
    classCallCheck(this, ContractRegistry);

    this.config = config;
    this.contractCache = {};
  }

  createClass(ContractRegistry, [{
    key: "has",
    value: function has(address) {
      address = this.cleanAddress(address);
      return !!this.contractCache[address];
    }
  }, {
    key: "get",
    value: function get(address, contractKey, web3) {
      address = this.cleanAddress(address);
      var contract = this.contractCache[address];

      if (!contract) {
        if (!contractKey) {
          throw new Error("No contract found for address ".concat(address, ", you must pass a contractKey for it to be constructed"));
        }

        if (!this.config.contractFactories[contractKey]) {
          throw new Error("You need to register the ".concat(contractKey, " contract in your ContractRegistry options"));
        }

        contract = this.config.contractFactories[contractKey](web3, address);
        this.contractCache[address] = contract;
      }

      return contract;
    }
  }, {
    key: "cleanAddress",
    value: function cleanAddress(address) {
      if (address) address = address.toLowerCase();
      return address;
    }
  }]);

  return ContractRegistry;
}();

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var objectSpread = _objectSpread;

function logReducerFactory(mutateStateWithLog) {
  return function (state, _ref) {
    var type = _ref.type,
        logs = _ref.logs,
        log = _ref.log;

    if (typeof state === 'undefined') {
      state = {};
    }

    switch (type) {
      case 'PAST_LOGS':
        state = objectSpread({}, state);
        logs.forEach(function (log) {
          mutateStateWithLog(state, log);
        });
        break;

      case 'NEW_LOG':
        state = objectSpread({}, state);
        mutateStateWithLog(state, log);
        break;
      //no default
    }

    return state;
  };
}

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;

  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}

function accounts (state, _ref) {
  var type = _ref.type,
      accounts = _ref.accounts;

  if (typeof state === 'undefined') {
    state = [];
  }

  switch (type) {
    case 'WEB3_ACCOUNTS':
      state = accounts;
      break;
    // no default
  }

  return state;
}

function contracts (state, _ref) {
  var type = _ref.type,
      address = _ref.address,
      name = _ref.name,
      contractKey = _ref.contractKey,
      networkId = _ref.networkId;

  if (typeof state === 'undefined') {
    state = {
      networks: {
        /*
          [networkId]: {
            nameAddress: {},
            addressContractKey: {}
          }
        */
      }
    };
  }

  switch (type) {
    case 'ADD_CONTRACT':
      var networkConfig = state.networks[networkId] || {}; // console.log('in ADD_CONTRACT', networkConfig, state.networks, networkId)

      state = {
        networks: objectSpread({}, state.networks, defineProperty({}, networkId, objectSpread({}, networkConfig, {
          addressContractKey: objectSpread({}, networkConfig.addressContractKey, defineProperty({}, address, contractKey))
        })))
      };
      networkConfig = state.networks[networkId] || {}; // refactor out name in favour of contractKey

      if (name) {
        state = {
          networks: objectSpread({}, state.networks, defineProperty({}, networkId, objectSpread({}, networkConfig, {
            nameAddress: objectSpread({}, networkConfig.nameAddress, defineProperty({}, name, address))
          })))
        };
      }

      break;
    // no default
  }

  return state;
}

function callCache (state, _ref) {
  var type = _ref.type,
      call = _ref.call,
      response = _ref.response,
      error = _ref.error,
      calls = _ref.calls;

  if (typeof state === 'undefined') {
    state = {};
  }

  switch (type) {
    case 'WEB3_STALE_CALLS':
      state = objectSpread({}, state);
      calls.forEach(function (call) {
        state[call.hash].stale = true;
      });
      break;

    case 'WEB3_CALL':
      state = objectSpread({}, state, defineProperty({}, call.hash, objectSpread({}, state[call.hash], {
        inFlight: true,
        stale: false
      })));
      break;

    case 'WEB3_CALL_RETURN':
      state = objectSpread({}, state, defineProperty({}, call.hash, objectSpread({}, state[call.hash], {
        inFlight: false,
        response: response
      })));
      break;

    case 'WEB3_CALL_ERROR':
      state = objectSpread({}, state, defineProperty({}, call.hash, objectSpread({}, state[call.hash], {
        inFlight: false,
        error: error
      })));
      break;

    case 'WEB3_CALL_CANCELLED':
      state = objectSpread({}, state, defineProperty({}, call.hash, objectSpread({}, state[call.hash], {
        inFlight: false
      })));
      break;
    // no default
  }

  return state;
}

function transactions (state, _ref) {
  var type = _ref.type,
      transactionId = _ref.transactionId,
      call = _ref.call,
      options = _ref.options,
      error = _ref.error,
      receipt = _ref.receipt,
      gasUsed = _ref.gasUsed,
      txHash = _ref.txHash,
      confirmationNumber = _ref.confirmationNumber,
      address = _ref.address;

  if (typeof state === 'undefined') {
    state = {};
  }

  switch (type) {
    case 'SG_START_TRANSACTION':
      state = objectSpread({}, state, defineProperty({}, transactionId, {
        transactionId: transactionId,
        call: call,
        options: options || {},
        address: address,
        inFlight: true
      }));
      break;

    case 'SG_TRANSACTION_HASH':
      if (state[transactionId]) {
        state = objectSpread({}, state, defineProperty({}, transactionId, objectSpread({}, state[transactionId], {
          inFlight: false,
          submitted: true,
          txHash: txHash
        })));
      }

      break;

    case 'SG_TRANSACTION_RECEIPT':
      if (state[transactionId]) {
        state = objectSpread({}, state, defineProperty({}, transactionId, objectSpread({}, state[transactionId], {
          inFlight: false,
          complete: true,
          receipt: receipt
        })));
      }

      break;

    case 'SG_TRANSACTION_CONFIRMED':
      if (state[transactionId]) {
        state = objectSpread({}, state, defineProperty({}, transactionId, objectSpread({}, state[transactionId], {
          confirmed: true,
          receipt: receipt
        })));
      }

      break;

    case 'SG_TRANSACTION_CONFIRMATION':
      if (state[transactionId]) {
        state = objectSpread({}, state, defineProperty({}, transactionId, objectSpread({}, state[transactionId], {
          confirmationNumber: confirmationNumber
        })));
      }

      break;

    case 'SG_TRANSACTION_ERROR':
      if (state[transactionId]) {
        state = objectSpread({}, state, defineProperty({}, transactionId, objectSpread({}, state[transactionId], {
          inFlight: false,
          complete: true,
          error: error,
          call: call,
          gasUsed: gasUsed
        })));
      }

      break;

    case 'SG_CLEAR_TRANSACTIONS':
      state = {};
      break;

    case 'SG_REMOVE_TRANSACTION':
      var copy = Object.assign({}, state);
      delete copy[transactionId];
      state = copy;
      break;
    // no default
  }

  return state;
}

function ethBalance (state, _ref) {
  var type = _ref.type,
      balance = _ref.balance;

  if (typeof state === 'undefined') {
    state = {
      balance: undefined
    };
  }

  switch (type) {
    case 'ETH_BALANCE':
      state = {
        balance: balance
      };
      break;
    // no default
  }

  return state;
}

function network (state, _ref) {
  var type = _ref.type,
      networkId = _ref.networkId;

  if (typeof state === 'undefined') {
    state = {
      networkId: undefined
    };
  }

  switch (type) {
    case 'WEB3_NETWORK_ID':
      // console.log('setting network id in state')
      state = {
        networkId: networkId
      };
      break;
    // no default
  }

  return state;
}

function sagaGenesisInit (state, _ref) {
  var type = _ref.type,
      numConfirmationsRequired = _ref.numConfirmationsRequired;

  if (typeof state === 'undefined') {
    state = {
      initialized: false,
      numConfirmationsRequired: 1
    };
  }

  switch (type) {
    case 'SG_UPDATE_SAGA_GENESIS_CONFIG':
      state = objectSpread({}, state, {
        numConfirmationsRequired: numConfirmationsRequired
      });
      break;

    case 'SG_SAGA_GENESIS_INITIALIZED':
      state = objectSpread({}, state, {
        initialized: true
      });
      break;
    // no default
  }

  return state;
}

function web3 (state, _ref) {
  var type = _ref.type;

  if (typeof state === 'undefined') {
    state = {
      initialized: false,
      error: false
    };
  }

  switch (type) {
    case 'WEB3_INITIALIZED':
      state = objectSpread({}, state, {
        initialized: true
      });
      break;

    case 'WEB3_INITIALIZE_ERROR':
      state = objectSpread({}, state, {
        error: true
      });
      break;
    // no default
  }

  return state;
}

function logs (state, _ref) {
  var type = _ref.type,
      address = _ref.address,
      logs = _ref.logs,
      log = _ref.log;

  if (typeof state === 'undefined') {
    state = {};
  }

  switch (type) {
    case 'LOG_LISTENER_ADDED':
      if (!state[address]) {
        state = objectSpread({}, state, defineProperty({}, address, {
          count: 1
        }));
      } else {
        state = objectSpread({}, state, defineProperty({}, address, objectSpread({}, state[address], {
          count: state[address].count + 1
        })));
      }

      break;

    case 'PAST_LOGS':
      state = objectSpread({}, state, defineProperty({}, address, objectSpread({}, state[address], {
        logs: logs
      })));
      break;

    case 'NEW_LOG':
      state = objectSpread({}, state);
      state[address].logs.push(log);
      break;

    case 'REMOVE_LOG_LISTENER':
      state = objectSpread({}, state);

      if (state[address]) {
        state[address].count -= 1;

        if (state[address].count === 0) {
          delete state[address];
        }
      }

      break;
    // no default
  }

  return state;
}

function block (state, _ref) {
  var type = _ref.type,
      block = _ref.block,
      blockNumber = _ref.blockNumber;

  if (typeof state === 'undefined') {
    state = {
      latestBlock: {
        timestamp: Math.floor(Date.now() / 1000)
      }
    };
  }

  switch (type) {
    case 'UPDATE_BLOCK_NUMBER':
      state = objectSpread({}, state);
      state.blockNumber = blockNumber;
      break;

    case 'BLOCK_LATEST':
      state = objectSpread({}, state);
      state.latestBlock = block;
      break;
    // no default
  }

  return state;
}

var reducers = combineReducers({
  callCache: callCache,
  accounts: accounts,
  transactions: transactions,
  network: network,
  ethBalance: ethBalance,
  contracts: contracts,
  web3: web3,
  logs: logs,
  block: block,
  sagaGenesisInit: sagaGenesisInit
});

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = module.exports;

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);
});

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sym = function sym(id) {
  return '@@redux-saga/' + id;
};

var TASK = /*#__PURE__*/sym('TASK');
var HELPER = /*#__PURE__*/sym('HELPER');
var SELF_CANCELLATION = /*#__PURE__*/sym('SELF_CANCELLATION');
var ident = function ident(v) {
  return v;
};

function check(value, predicate, error) {
  if (!predicate(value)) {
    log('error', 'uncaught at check', error);
    throw new Error(error);
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(object, property) {
  return is.notUndef(object) && hasOwnProperty.call(object, property);
}

var is = {
  undef: function undef(v) {
    return v === null || v === undefined;
  },
  notUndef: function notUndef(v) {
    return v !== null && v !== undefined;
  },
  func: function func(f) {
    return typeof f === 'function';
  },
  number: function number(n) {
    return typeof n === 'number';
  },
  string: function string(s) {
    return typeof s === 'string';
  },
  array: Array.isArray,
  object: function object(obj) {
    return obj && !is.array(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  },
  promise: function promise(p) {
    return p && is.func(p.then);
  },
  iterator: function iterator(it) {
    return it && is.func(it.next) && is.func(it.throw);
  },
  iterable: function iterable(it) {
    return it && is.func(Symbol) ? is.func(it[Symbol.iterator]) : is.array(it);
  },
  task: function task(t) {
    return t && t[TASK];
  },
  observable: function observable(ob) {
    return ob && is.func(ob.subscribe);
  },
  buffer: function buffer(buf) {
    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
  },
  pattern: function pattern(pat) {
    return pat && (is.string(pat) || (typeof pat === 'undefined' ? 'undefined' : _typeof(pat)) === 'symbol' || is.func(pat) || is.array(pat));
  },
  channel: function channel(ch) {
    return ch && is.func(ch.take) && is.func(ch.close);
  },
  helper: function helper(it) {
    return it && it[HELPER];
  },
  stringableFunc: function stringableFunc(f) {
    return is.func(f) && hasOwn(f, 'toString');
  }
};

var kThrow = function kThrow(err) {
  throw err;
};
var kReturn = function kReturn(value) {
  return { value: value, done: true };
};
function makeIterator(next) {
  var thro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : kThrow;
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var isHelper = arguments[3];

  var iterator = { name: name, next: next, throw: thro, return: kReturn };

  if (isHelper) {
    iterator[HELPER] = true;
  }
  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }
  return iterator;
}

/**
  Print error in a useful way whether in a browser environment
  (with expandable error stack traces), or in a node.js environment
  (text-only log output)
 **/
function log(level, message) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  /*eslint-disable no-console*/
  if (typeof window === 'undefined') {
    console.log('redux-saga ' + level + ': ' + message + '\n' + (error && error.stack || error));
  } else {
    console[level](message, error);
  }
}

function deprecate(fn, deprecationWarning) {
  return function () {
    if (process.env.NODE_ENV === 'development') log('warn', deprecationWarning);
    return fn.apply(undefined, arguments);
  };
}

var updateIncentive = function updateIncentive(deprecated, preferred) {
  return deprecated + ' has been deprecated in favor of ' + preferred + ', please update your code';
};

var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + 'setContext(props): argument ' + props + ' is not a plain object';
};

var IO = /*#__PURE__*/sym('IO');
var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL$1 = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

var effect = function effect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref[type] = payload, _ref;
};

var detach = function detach(eff) {
  check(asEffect.fork(eff), is.object, 'detach(eff): argument must be a fork effect');
  eff[FORK].detached = true;
  return eff;
};

function take() {
  var patternOrChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  if (arguments.length) {
    check(arguments[0], is.notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }
  if (is.pattern(patternOrChannel)) {
    return effect(TAKE, { pattern: patternOrChannel });
  }
  if (is.channel(patternOrChannel)) {
    return effect(TAKE, { channel: patternOrChannel });
  }
  throw new Error('take(patternOrChannel): argument ' + String(patternOrChannel) + ' is not valid channel or a valid pattern');
}

take.maybe = function () {
  var eff = take.apply(undefined, arguments);
  eff[TAKE].maybe = true;
  return eff;
};

function put(channel, action) {
  if (arguments.length > 1) {
    check(channel, is.notUndef, 'put(channel, action): argument channel is undefined');
    check(channel, is.channel, 'put(channel, action): argument ' + channel + ' is not a valid channel');
    check(action, is.notUndef, 'put(channel, action): argument action is undefined');
  } else {
    check(channel, is.notUndef, 'put(action): argument action is undefined');
    action = channel;
    channel = null;
  }
  return effect(PUT, { channel: channel, action: action });
}

put.resolve = function () {
  var eff = put.apply(undefined, arguments);
  eff[PUT].resolve = true;
  return eff;
};

put.sync = /*#__PURE__*/deprecate(put.resolve, /*#__PURE__*/updateIncentive('put.sync', 'put.resolve'));

function all(effects) {
  return effect(ALL, effects);
}

function getFnCallDesc(meth, fn, args) {
  check(fn, is.notUndef, meth + ': argument fn is undefined');

  var context = null;
  if (is.array(fn)) {
    var _fn = fn;
    context = _fn[0];
    fn = _fn[1];
  } else if (fn.fn) {
    var _fn2 = fn;
    context = _fn2.context;
    fn = _fn2.fn;
  }
  if (context && is.string(fn) && is.func(context[fn])) {
    fn = context[fn];
  }
  check(fn, is.func, meth + ': argument ' + fn + ' is not a function');

  return { context: context, fn: fn, args: args };
}

function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return effect(CALL, getFnCallDesc('call', fn, args));
}

function fork(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return effect(FORK, getFnCallDesc('fork', fn, args));
}

function spawn(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return detach(fork.apply(undefined, [fn].concat(args)));
}

function cancel() {
  for (var _len6 = arguments.length, tasks = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    tasks[_key6] = arguments[_key6];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return cancel(t);
    }));
  }
  var task = tasks[0];
  if (tasks.length === 1) {
    check(task, is.notUndef, 'cancel(task): argument task is undefined');
    check(task, is.task, 'cancel(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  }
  return effect(CANCEL$1, task || SELF_CANCELLATION);
}

function select(selector) {
  for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    args[_key7 - 1] = arguments[_key7];
  }

  if (arguments.length === 0) {
    selector = ident;
  } else {
    check(selector, is.notUndef, 'select(selector,[...]): argument selector is undefined');
    check(selector, is.func, 'select(selector,[...]): argument ' + selector + ' is not a function');
  }
  return effect(SELECT, { selector: selector, args: args });
}

/**
  channel(pattern, [buffer])    => creates an event channel for store actions
**/
function actionChannel(pattern, buffer) {
  check(pattern, is.notUndef, 'actionChannel(pattern,...): argument pattern is undefined');
  if (arguments.length > 1) {
    check(buffer, is.notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
    check(buffer, is.buffer, 'actionChannel(pattern, buffer): argument ' + buffer + ' is not a valid buffer');
  }
  return effect(ACTION_CHANNEL, { pattern: pattern, buffer: buffer });
}

function cancelled() {
  return effect(CANCELLED, {});
}

function getContext(prop) {
  check(prop, is.string, 'getContext(prop): argument ' + prop + ' is not a string');
  return effect(GET_CONTEXT, prop);
}

function setContext(props) {
  check(props, is.object, createSetContextWarning(null, props));
  return effect(SET_CONTEXT, props);
}

var createAsEffectType = function createAsEffectType(type) {
  return function (effect) {
    return effect && effect[IO] && effect[type];
  };
};

var asEffect = {
  take: /*#__PURE__*/createAsEffectType(TAKE),
  put: /*#__PURE__*/createAsEffectType(PUT),
  all: /*#__PURE__*/createAsEffectType(ALL),
  race: /*#__PURE__*/createAsEffectType(RACE),
  call: /*#__PURE__*/createAsEffectType(CALL),
  cps: /*#__PURE__*/createAsEffectType(CPS),
  fork: /*#__PURE__*/createAsEffectType(FORK),
  join: /*#__PURE__*/createAsEffectType(JOIN),
  cancel: /*#__PURE__*/createAsEffectType(CANCEL$1),
  select: /*#__PURE__*/createAsEffectType(SELECT),
  actionChannel: /*#__PURE__*/createAsEffectType(ACTION_CHANNEL),
  cancelled: /*#__PURE__*/createAsEffectType(CANCELLED),
  flush: /*#__PURE__*/createAsEffectType(FLUSH),
  getContext: /*#__PURE__*/createAsEffectType(GET_CONTEXT),
  setContext: /*#__PURE__*/createAsEffectType(SET_CONTEXT)
};

var done = { done: true, value: undefined };
var qEnd = {};

function safeName(patternOrChannel) {
  if (is.channel(patternOrChannel)) {
    return 'channel';
  } else if (Array.isArray(patternOrChannel)) {
    return String(patternOrChannel.map(function (entry) {
      return String(entry);
    }));
  } else {
    return String(patternOrChannel);
  }
}

function fsmIterator(fsm, q0) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iterator';

  var updateState = void 0,
      qNext = q0;

  function next(arg, error) {
    if (qNext === qEnd) {
      return done;
    }

    if (error) {
      qNext = qEnd;
      throw error;
    } else {
      updateState && updateState(arg);

      var _fsm$qNext = fsm[qNext](),
          q = _fsm$qNext[0],
          output = _fsm$qNext[1],
          _updateState = _fsm$qNext[2];

      qNext = q;
      updateState = _updateState;
      return qNext === qEnd ? done : output;
    }
  }

  return makeIterator(next, function (error) {
    return next(null, error);
  }, name, true);
}

var CHANNEL_END_TYPE = '@@redux-saga/CHANNEL_END';
var END = { type: CHANNEL_END_TYPE };

if (process.env.NODE_ENV !== 'production') ;

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: take(patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: fork.apply(undefined, [worker].concat(args, [ac])) };
  };

  var action = void 0,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === END ? [qEnd] : ['q1', yFork(action)];
    }
  }, 'q1', 'takeEvery(' + safeName(patternOrChannel) + ', ' + worker.name + ')');
}

function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: take(patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: fork.apply(undefined, [worker].concat(args, [ac])) };
  };
  var yCancel = function yCancel(task) {
    return { done: false, value: cancel(task) };
  };

  var task = void 0,
      action = void 0;
  var setTask = function setTask(t) {
    return task = t;
  };
  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === END ? [qEnd] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
    },
    q3: function q3() {
      return ['q1', yFork(action), setTask];
    }
  }, 'q1', 'takeLatest(' + safeName(patternOrChannel) + ', ' + worker.name + ')');
}

function takeEvery$2(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork.apply(undefined, [takeEvery, patternOrChannel, worker].concat(args));
}

function takeLatest$2(patternOrChannel, worker) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return fork.apply(undefined, [takeLatest, patternOrChannel, worker].concat(args));
}

var _marked =
/*#__PURE__*/
regenerator.mark(refreshAccounts),
    _marked2 =
/*#__PURE__*/
regenerator.mark(startAccountsPolling),
    _marked3 =
/*#__PURE__*/
regenerator.mark(_callee);
function refreshAccounts() {
  var web3, existingAccount, accounts;
  return regenerator.wrap(function refreshAccounts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return getContext('web3');

        case 3:
          web3 = _context.sent;
          _context.next = 6;
          return select(function (state) {
            return state.sagaGenesis.accounts[0];
          });

        case 6:
          existingAccount = _context.sent;
          _context.next = 9;
          return web3.eth.getAccounts();

        case 9:
          accounts = _context.sent;

          if (!(accounts[0] !== existingAccount)) {
            _context.next = 13;
            break;
          }

          _context.next = 13;
          return put({
            type: 'WEB3_ACCOUNTS',
            accounts: accounts
          });

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          _context.next = 19;
          return put({
            type: 'SAGA_GENESIS_CAUGHT_ERROR',
            error: _context.t0
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 15]]);
}
function startAccountsPolling() {
  return regenerator.wrap(function startAccountsPolling$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:

          _context2.next = 3;
          return call(refreshAccounts);

        case 3:
          _context2.next = 5;
          return call(reduxSaga.delay, 1000);

        case 5:
          _context2.next = 0;
          break;

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
function _callee() {
  return regenerator.wrap(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return fork(startAccountsPolling);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

var _marked$1 =
/*#__PURE__*/
regenerator.mark(addContract);
function addContract(_ref) {
  var address, name, contractKey, networkId, existingContractKey;
  return regenerator.wrap(function addContract$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          address = _ref.address, name = _ref.name, contractKey = _ref.contractKey, networkId = _ref.networkId;
          address = address.toLowerCase();

          if (networkId) {
            _context.next = 7;
            break;
          }

          _context.next = 5;
          return select(function (state) {
            return state.sagaGenesis.network.networkId;
          });

        case 5:
          networkId = _context.sent;

          if (!networkId) {
            console.warn("No network ID available, cannot store ".concat(contractKey, ": ").concat(address));
          }

        case 7:
          _context.next = 9;
          return select(contractKeyByAddress, address);

        case 9:
          existingContractKey = _context.sent;

          if (!(existingContractKey !== contractKey)) {
            _context.next = 13;
            break;
          }

          _context.next = 13;
          return put({
            type: "ADD_CONTRACT",
            address: address,
            name: name,
            contractKey: contractKey,
            networkId: networkId
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$1, this);
}

var _marked$2 =
/*#__PURE__*/
regenerator.mark(takeSequentially);
function takeSequentially(pattern, saga) {
  var channel, action;
  return regenerator.wrap(function takeSequentially$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return actionChannel(pattern, reduxSaga.buffers.expanding(50));

        case 2:
          channel = _context.sent;

        case 3:

          _context.next = 6;
          return take(channel);

        case 6:
          action = _context.sent;
          _context.next = 9;
          return call(saga, action);

        case 9:
          _context.next = 3;
          break;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$2, this);
}

var _marked$3 =
/*#__PURE__*/
regenerator.mark(getReadWeb3),
    _marked2$1 =
/*#__PURE__*/
regenerator.mark(web3NetworkId),
    _marked3$1 =
/*#__PURE__*/
regenerator.mark(web3Initialize);
function getReadWeb3() {
  var web3;
  return regenerator.wrap(function getReadWeb3$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getContext('readWeb3');

        case 2:
          web3 = _context.sent;

          if (web3) {
            _context.next = 7;
            break;
          }

          _context.next = 6;
          return getContext('web3');

        case 6:
          web3 = _context.sent;

        case 7:
          return _context.abrupt("return", web3);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$3, this);
}
function web3NetworkId() {
  var web3;
  return regenerator.wrap(function web3NetworkId$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getContext('web3');

        case 2:
          web3 = _context2.sent;
          _context2.next = 5;
          return web3.eth.net.getId();

        case 5:
          return _context2.abrupt("return", _context2.sent);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2$1, this);
}
function web3Initialize() {
  var web3;
  return regenerator.wrap(function web3Initialize$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          web3 = getWeb3OrNull();

          if (!web3) {
            _context3.next = 16;
            break;
          }

          _context3.prev = 2;
          _context3.next = 5;
          return web3.eth.net.getId();

        case 5:
          _context3.next = 7;
          return put({
            type: 'WEB3_INITIALIZED',
            web3: web3
          });

        case 7:
          _context3.next = 14;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);
          console.error("Could not get network, web3 in bad state!");
          _context3.next = 14;
          return put({
            type: 'WEB3_INITIALIZE_ERROR'
          });

        case 14:
          _context3.next = 19;
          break;

        case 16:
          console.error("window.web3 doesn't exist!");
          _context3.next = 19;
          return put({
            type: 'WEB3_INITIALIZE_ERROR'
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3$1, this, [[2, 9]]);
}

var _marked$4 =
/*#__PURE__*/
regenerator.mark(getReceiptData),
    _marked2$2 =
/*#__PURE__*/
regenerator.mark(updateCurrentBlockNumber),
    _marked3$2 =
/*#__PURE__*/
regenerator.mark(gatherLatestBlocks),
    _marked4 =
/*#__PURE__*/
regenerator.mark(getBlockData),
    _marked5 =
/*#__PURE__*/
regenerator.mark(startBlockPolling),
    _marked6 =
/*#__PURE__*/
regenerator.mark(_callee$1);

var debug$1 = require('debug')('block-sagas');

var MAX_RETRIES = 50;
function getReceiptData(txHash) {
  var web3, i, receipt;
  return regenerator.wrap(function getReceiptData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getReadWeb3();

        case 2:
          web3 = _context.sent;
          i = 0;

        case 4:
          if (!(i < MAX_RETRIES)) {
            _context.next = 22;
            break;
          }

          debug$1("getReceiptData web3.eth.getTransactionReceipt loop: ", txHash);
          _context.next = 8;
          return call(web3.eth.getTransactionReceipt, txHash);

        case 8:
          receipt = _context.sent;

          if (!receipt) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", receipt);

        case 13:
          if (!(i > MAX_RETRIES)) {
            _context.next = 17;
            break;
          }

          throw new Error('Unable to get receipt from network');

        case 17:
          _context.next = 19;
          return call(reduxSaga.delay, 2000);

        case 19:
          i++;
          _context.next = 4;
          break;

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$4, this);
}

function updateCurrentBlockNumber() {
  var web3, blockNumber, currentBlockNumber;
  return regenerator.wrap(function updateCurrentBlockNumber$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          debug$1("updateCurrentBlockNumber()");
          _context2.prev = 1;
          _context2.next = 4;
          return getReadWeb3();

        case 4:
          web3 = _context2.sent;
          _context2.next = 7;
          return call(web3.eth.getBlockNumber);

        case 7:
          blockNumber = _context2.sent;
          _context2.next = 10;
          return select(function (state) {
            return state.sagaGenesis.block.blockNumber;
          });

        case 10:
          currentBlockNumber = _context2.sent;

          if (!(blockNumber !== currentBlockNumber)) {
            _context2.next = 15;
            break;
          }

          debug$1("updateCurrentBlockNumber got new block #");
          _context2.next = 15;
          return put({
            type: 'UPDATE_BLOCK_NUMBER',
            blockNumber: blockNumber,
            lastBlockNumber: currentBlockNumber
          });

        case 15:
          _context2.next = 22;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](1);
          console.warn('Warn in updateCurrentBlockNumber: ' + _context2.t0);
          _context2.next = 22;
          return put({
            type: 'SAGA_GENESIS_CAUGHT_ERROR',
            error: _context2.t0
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2$2, this, [[1, 17]]);
}

function gatherLatestBlocks(_ref) {
  var blockNumber, lastBlockNumber, i, block;
  return regenerator.wrap(function gatherLatestBlocks$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          blockNumber = _ref.blockNumber, lastBlockNumber = _ref.lastBlockNumber;
          debug$1("gatherLatestBlocks(".concat(blockNumber, ", ").concat(lastBlockNumber, ")"));

          if (lastBlockNumber) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return");

        case 4:
          _context3.prev = 4;
          i = lastBlockNumber + 1;

        case 6:
          if (!(i <= blockNumber)) {
            _context3.next = 16;
            break;
          }

          _context3.next = 9;
          return call(getBlockData, i);

        case 9:
          block = _context3.sent;
          debug$1("BLOCK_LATEST");
          _context3.next = 13;
          return put({
            type: 'BLOCK_LATEST',
            block: block
          });

        case 13:
          i++;
          _context3.next = 6;
          break;

        case 16:
          _context3.next = 23;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](4);
          console.warn('warn in getLatestBlocks()');
          _context3.next = 23;
          return put({
            type: 'SAGA_GENESIS_CAUGHT_ERROR',
            error: _context3.t0
          });

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3$2, this, [[4, 18]]);
}

function getBlockData(blockId) {
  var web3, i, block;
  return regenerator.wrap(function getBlockData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          debug$1("getBlockData() (".concat(blockId, ")"));
          _context4.next = 3;
          return getReadWeb3();

        case 3:
          web3 = _context4.sent;
          i = 0;

        case 5:
          if (!(i < MAX_RETRIES)) {
            _context4.next = 23;
            break;
          }

          debug$1("getBlockData() (attempt #".concat(i, ")"));
          _context4.next = 9;
          return call(web3.eth.getBlock, blockId, true);

        case 9:
          block = _context4.sent;

          if (!block) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("return", block);

        case 14:
          if (!(i > MAX_RETRIES)) {
            _context4.next = 18;
            break;
          }

          throw new Error('Unable to get block from network');

        case 18:
          _context4.next = 20;
          return call(reduxSaga.delay, 2000);

        case 20:
          i++;
          _context4.next = 5;
          break;

        case 23:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function startBlockPolling() {
  return regenerator.wrap(function startBlockPolling$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:

          _context5.prev = 1;
          _context5.next = 4;
          return call(updateCurrentBlockNumber);

        case 4:
          _context5.next = 11;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](1);
          console.warn('warn in startBlockPolling()');
          _context5.next = 11;
          return put({
            type: 'SAGA_GENESIS_CAUGHT_ERROR',
            error: _context5.t0
          });

        case 11:
          _context5.next = 13;
          return call(reduxSaga.delay, 1000);

        case 13:
          _context5.next = 0;
          break;

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this, [[1, 6]]);
}

function _callee$1() {
  return regenerator.wrap(function _callee$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return fork(takeSequentially, 'UPDATE_BLOCK_NUMBER', gatherLatestBlocks);

        case 2:
          _context6.next = 4;
          return fork(startBlockPolling);

        case 4:
          debug$1('Started.');

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

var _marked$5 =
/*#__PURE__*/
regenerator.mark(waitForResponse),
    _marked2$3 =
/*#__PURE__*/
regenerator.mark(executeWeb3Call),
    _marked3$3 =
/*#__PURE__*/
regenerator.mark(registerCall),
    _marked4$1 =
/*#__PURE__*/
regenerator.mark(callCount),
    _marked5$1 =
/*#__PURE__*/
regenerator.mark(web3CallExecute),
    _marked6$1 =
/*#__PURE__*/
regenerator.mark(findWeb3Contract),
    _marked7 =
/*#__PURE__*/
regenerator.mark(findCallMethod);

var debug$2 = require('debug')('calls');

var callsInFlight = new Set();
function isInFlight(call$$1) {
  return callsInFlight.has(call$$1.hash);
}
function waitForResponse(call$$1) {
  var action;
  return regenerator.wrap(function waitForResponse$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:

          _context.next = 3;
          return take(['WEB3_CALL_RETURN', 'WEB3_CALL_ERROR']);

        case 3:
          action = _context.sent;

          if (!(action.call.hash === call$$1.hash)) {
            _context.next = 10;
            break;
          }

          _context.t0 = action.type;
          _context.next = _context.t0 === 'WEB3_CALL_RETURN' ? 8 : 9;
          break;

        case 8:
          return _context.abrupt("return", action.response);

        case 9:
          throw action.error;

        case 10:
          _context.next = 0;
          break;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$5, this);
}
function executeWeb3Call(call$$1) {
  var inFlight;
  return regenerator.wrap(function executeWeb3Call$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          inFlight = isInFlight(call$$1);

          if (inFlight) {
            _context2.next = 5;
            break;
          }

          callsInFlight.add(call$$1.hash);
          _context2.next = 5;
          return put({
            type: 'WEB3_CALL',
            call: call$$1
          });

        case 5:
          _context2.next = 7;
          return waitForResponse(call$$1);

        case 7:
          return _context2.abrupt("return", _context2.sent);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2$3, this);
}
function registerCall(call$$1) {
  var key, callCountRegistry;
  return regenerator.wrap(function registerCall$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return getContext('key');

        case 2:
          key = _context3.sent;

          if (key) {
            _context3.next = 5;
            break;
          }

          throw new Error("registerCall called without a key scope: ".concat(JSON.stringify(call$$1)));

        case 5:
          _context3.next = 7;
          return getContext('callCountRegistry');

        case 7:
          callCountRegistry = _context3.sent;
          callCountRegistry.register(call$$1, key);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3$3, this);
}
function callCount(call$$1) {
  var callCountRegistry;
  return regenerator.wrap(function callCount$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return getContext('callCountRegistry');

        case 2:
          callCountRegistry = _context4.sent;
          return _context4.abrupt("return", callCountRegistry.count(call$$1));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4$1, this);
}
/*
Triggers the web3 call.
*/

function web3CallExecute(_ref) {
  var call$$1, account, options, callMethod;
  return regenerator.wrap(function web3CallExecute$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          call$$1 = _ref.call;
          debug$2("web3CallExecute", call$$1);
          _context6.prev = 2;
          _context6.next = 5;
          return select(function (state) {
            return state.sagaGenesis.accounts[0];
          });

        case 5:
          account = _context6.sent;
          options = {
            from: account
          };
          _context6.next = 9;
          return findCallMethod(call$$1);

        case 9:
          callMethod = _context6.sent;
          _context6.next = 12;
          return spawn(
          /*#__PURE__*/
          regenerator.mark(function _callee() {
            var response;
            return regenerator.wrap(function _callee$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    _context5.next = 3;
                    return call(callMethod, options);

                  case 3:
                    response = _context5.sent;
                    _context5.next = 6;
                    return put({
                      type: 'WEB3_CALL_RETURN',
                      call: call$$1,
                      response: response
                    });

                  case 6:
                    _context5.next = 14;
                    break;

                  case 8:
                    _context5.prev = 8;
                    _context5.t0 = _context5["catch"](0);
                    debug$2("web3CallExecute rpc ERROR: ".concat(_context5.t0));
                    _context5.next = 13;
                    return put({
                      type: 'WEB3_CALL_ERROR',
                      call: call$$1,
                      error: _context5.t0
                    });

                  case 13:
                    console.error('Error on WEB3 Call: ', call$$1.method, call$$1.args, call$$1, _context5.t0);

                  case 14:
                    _context5.prev = 14;
                    callsInFlight.delete(call$$1.hash);
                    return _context5.finish(14);

                  case 17:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee, this, [[0, 8, 14, 17]]);
          }));

        case 12:
          _context6.next = 28;
          break;

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](2);
          debug$2("web3CallExecute general ERROR: ".concat(_context6.t0));
          _context6.next = 19;
          return cancelled();

        case 19:
          if (!_context6.sent) {
            _context6.next = 25;
            break;
          }

          console.warn('Cancelled on WEB3 Call: ', call$$1.method, call$$1.args, call$$1, _context6.t0);
          _context6.next = 23;
          return put({
            type: 'WEB3_CALL_CANCELLED',
            call: call$$1
          });

        case 23:
          _context6.next = 28;
          break;

        case 25:
          console.error('Error on WEB3 Call: ', call$$1.method, call$$1.args, call$$1, _context6.t0);
          _context6.next = 28;
          return put({
            type: 'WEB3_CALL_ERROR',
            call: call$$1,
            error: _context6.t0
          });

        case 28:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked5$1, this, [[2, 14]]);
}

function findWeb3Contract(address) {
  var contractRegistry, web3, contractKey;
  return regenerator.wrap(function findWeb3Contract$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return getContext('readContractRegistry');

        case 2:
          contractRegistry = _context7.sent;
          _context7.next = 5;
          return getReadWeb3();

        case 5:
          web3 = _context7.sent;
          _context7.next = 8;
          return select(contractKeyByAddress, address);

        case 8:
          contractKey = _context7.sent;
          return _context7.abrupt("return", contractRegistry.get(address, contractKey, web3));

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked6$1, this);
}

function findCallMethod(call$$1) {
  var address, method, args, contract, contractMethod;
  return regenerator.wrap(function findCallMethod$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          address = call$$1.address, method = call$$1.method, args = call$$1.args;
          _context8.next = 3;
          return findWeb3Contract(address);

        case 3:
          contract = _context8.sent;
          contractMethod = contract.methods[method];

          if (contractMethod) {
            _context8.next = 9;
            break;
          }

          _context8.next = 8;
          return put({
            type: 'WEB3_CALL_ERROR',
            call: call$$1,
            error: "Address ".concat(address, " does not have method '").concat(method, "'")
          });

        case 8:
          return _context8.abrupt("return");

        case 9:
          return _context8.abrupt("return", contractMethod.apply(void 0, toConsumableArray(args)).call);

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked7, this);
}

var _marked$6 =
/*#__PURE__*/
regenerator.mark(addAddressIfExists);
function addAddressIfExists(addressSet, address) {
  var contractKey;
  return regenerator.wrap(function addAddressIfExists$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (address) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", false);

        case 2:
          address = address.toLowerCase();
          _context.next = 5;
          return select(contractKeyByAddress, address);

        case 5:
          contractKey = _context.sent;

          if (!contractKey) {
            _context.next = 9;
            break;
          }

          addressSet.add(address);
          return _context.abrupt("return", true);

        case 9:
          return _context.abrupt("return", false);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$6, this);
}

var _marked$7 =
/*#__PURE__*/
regenerator.mark(deregisterKey),
    _marked2$4 =
/*#__PURE__*/
regenerator.mark(invalidateAddress),
    _marked3$4 =
/*#__PURE__*/
regenerator.mark(invalidateTransaction),
    _marked4$2 =
/*#__PURE__*/
regenerator.mark(invalidateBlockAddresses),
    _marked5$2 =
/*#__PURE__*/
regenerator.mark(addTransactionReceiptAddresses),
    _marked6$2 =
/*#__PURE__*/
regenerator.mark(invalidateAddressSet),
    _marked7$1 =
/*#__PURE__*/
regenerator.mark(runSaga),
    _marked8 =
/*#__PURE__*/
regenerator.mark(prepareSaga),
    _marked9 =
/*#__PURE__*/
regenerator.mark(_callee6);

var debug$3 = require('debug')('cache-scope-sagas.js');

function deregisterKey(key) {
  var callCountRegistry, calls;
  return regenerator.wrap(function deregisterKey$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getContext('callCountRegistry');

        case 2:
          callCountRegistry = _context.sent;
          calls = callCountRegistry.deregister(key);

          if (!calls.length) {
            _context.next = 7;
            break;
          }

          _context.next = 7;
          return put({
            type: 'WEB3_STALE_CALLS',
            calls: calls
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$7, this);
}
function invalidateAddress(_ref) {
  var address, callCountRegistry, contractCalls;
  return regenerator.wrap(function invalidateAddress$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          address = _ref.address;
          _context3.next = 3;
          return getContext('callCountRegistry');

        case 3:
          callCountRegistry = _context3.sent;
          contractCalls = Object.values(callCountRegistry.getContractCalls(address));

          if (contractCalls) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return");

        case 7:
          _context3.next = 9;
          return all(contractCalls.map(
          /*#__PURE__*/
          regenerator.mark(function _callee(callState) {
            var call$$1;
            return regenerator.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(callState.count > 0)) {
                      _context2.next = 4;
                      break;
                    }

                    call$$1 = callState.call;
                    _context2.next = 4;
                    return executeWeb3Call(call$$1);

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee, this);
          })));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked2$4, this);
}
function invalidateTransaction(_ref2) {
  var transactionId, call$$1, receipt, contractAddresses;
  return regenerator.wrap(function invalidateTransaction$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          transactionId = _ref2.transactionId, call$$1 = _ref2.call, receipt = _ref2.receipt;
          contractAddresses = Object.values(receipt.events || {}).reduce(function (addressSet, event) {
            return addressSet.add(event.address);
          }, new Set());
          contractAddresses.add(call$$1.address);
          _context5.next = 5;
          return all(Array.from(contractAddresses).map(
          /*#__PURE__*/
          regenerator.mark(function _callee2(address) {
            var contractKey;
            return regenerator.wrap(function _callee2$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return select(contractKeyByAddress, address);

                  case 2:
                    contractKey = _context4.sent;

                    if (!contractKey) {
                      _context4.next = 6;
                      break;
                    }

                    _context4.next = 6;
                    return fork(put, {
                      type: 'CACHE_INVALIDATE_ADDRESS',
                      address: address
                    });

                  case 6:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee2, this);
          })));

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked3$4, this);
}
function invalidateBlockAddresses(_ref3) {
  var block, addressSet, i, transaction, to, from, receipt;
  return regenerator.wrap(function invalidateBlockAddresses$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          block = _ref3.block;
          debug$3("invalidateBlockAddresses(): ", block);
          _context6.prev = 2;
          addressSet = new Set();
          _context6.t0 = regenerator.keys(block.transactions);

        case 5:
          if ((_context6.t1 = _context6.t0()).done) {
            _context6.next = 22;
            break;
          }

          i = _context6.t1.value;
          transaction = block.transactions[i];
          _context6.next = 10;
          return call(addAddressIfExists, addressSet, transaction.to);

        case 10:
          to = _context6.sent;
          _context6.next = 13;
          return call(addAddressIfExists, addressSet, transaction.from);

        case 13:
          from = _context6.sent;

          if (!(to || from)) {
            _context6.next = 20;
            break;
          }

          _context6.next = 17;
          return call(getReceiptData, transaction.hash);

        case 17:
          receipt = _context6.sent;
          _context6.next = 20;
          return addTransactionReceiptAddresses(receipt, addressSet);

        case 20:
          _context6.next = 5;
          break;

        case 22:
          _context6.next = 24;
          return invalidateAddressSet(addressSet);

        case 24:
          _context6.next = 31;
          break;

        case 26:
          _context6.prev = 26;
          _context6.t2 = _context6["catch"](2);
          console.warn('warn in latestBlock()');
          _context6.next = 31;
          return put({
            type: 'SAGA_GENESIS_CAUGHT_ERROR',
            error: _context6.t2
          });

        case 31:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked4$2, this, [[2, 26]]);
}

function addTransactionReceiptAddresses(receipt, addressSet) {
  return regenerator.wrap(function addTransactionReceiptAddresses$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          debug$3("addTransactionReceiptAddresses(): ".concat(receipt));
          _context9.next = 3;
          return all(receipt.logs.map(
          /*#__PURE__*/
          regenerator.mark(function _callee4(log) {
            return regenerator.wrap(function _callee4$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return call(addAddressIfExists, addressSet, log.address);

                  case 2:
                    if (!log.topics) {
                      _context8.next = 5;
                      break;
                    }

                    _context8.next = 5;
                    return all(log.topics.map(
                    /*#__PURE__*/
                    regenerator.mark(function _callee3(topic) {
                      var actualAddress;
                      return regenerator.wrap(function _callee3$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              if (!topic) {
                                _context7.next = 4;
                                break;
                              }

                              // topics are 32 bytes and will have leading 0's padded for typical Eth addresses, ignore them
                              actualAddress = '0x' + topic.substr(26);
                              _context7.next = 4;
                              return call(addAddressIfExists, addressSet, actualAddress);

                            case 4:
                            case "end":
                              return _context7.stop();
                          }
                        }
                      }, _callee3, this);
                    })));

                  case 5:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee4, this);
          })));

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked5$2, this);
}

function invalidateAddressSet(addresses) {
  return regenerator.wrap(function invalidateAddressSet$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return all(Array.from(addresses).map(
          /*#__PURE__*/
          regenerator.mark(function _callee5(address) {
            return regenerator.wrap(function _callee5$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    debug$3("CACHE_INVALIDATE_ADDRESS ".concat(address));
                    _context10.next = 3;
                    return fork(put, {
                      type: 'CACHE_INVALIDATE_ADDRESS',
                      address: address
                    });

                  case 3:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee5, this);
          })));

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked6$2, this);
}
function runSaga(_ref4) {
  var saga, props, key, callCountRegistry, oldCalls, emptyCalls;
  return regenerator.wrap(function runSaga$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          saga = _ref4.saga, props = _ref4.props, key = _ref4.key;
          _context12.prev = 1;
          _context12.next = 4;
          return setContext({
            key: key
          });

        case 4:
          _context12.next = 6;
          return getContext('callCountRegistry');

        case 6:
          callCountRegistry = _context12.sent;
          oldCalls = callCountRegistry.resetKeyCalls(key);
          _context12.next = 10;
          return call(saga, props);

        case 10:
          emptyCalls = callCountRegistry.decrementCalls(oldCalls);

          if (!emptyCalls.length) {
            _context12.next = 14;
            break;
          }

          _context12.next = 14;
          return put({
            type: 'WEB3_STALE_CALLS',
            calls: emptyCalls
          });

        case 14:
          _context12.next = 26;
          break;

        case 16:
          _context12.prev = 16;
          _context12.t0 = _context12["catch"](1);
          _context12.next = 20;
          return cancelled();

        case 20:
          if (_context12.sent) {
            _context12.next = 24;
            break;
          }

          throw _context12.t0;

        case 24:
          _context12.next = 26;
          return put({
            type: 'SAGA_CANCELLED',
            key: key
          });

        case 26:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked7$1, this, [[1, 16]]);
}

function prepareSaga(_ref5) {
  var saga, props, key, action, task;
  return regenerator.wrap(function prepareSaga$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          saga = _ref5.saga, props = _ref5.props, key = _ref5.key;
          action = "RUN_SAGA_".concat(key);
          _context13.next = 4;
          return takeLatest$2(action, runSaga);

        case 4:
          task = _context13.sent;
          _context13.next = 7;
          return runSaga({
            saga: saga,
            props: props,
            key: key
          });

        case 7:
          _context13.next = 9;
          return take("END_SAGA_".concat(key));

        case 9:
          _context13.next = 11;
          return deregisterKey(key);

        case 11:
          _context13.next = 13;
          return cancel(task);

        case 13:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked8, this);
}

function _callee6() {
  return regenerator.wrap(function _callee6$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return takeEvery$2('PREPARE_SAGA', prepareSaga);

        case 2:
          _context14.next = 4;
          return fork(takeSequentially, 'BLOCK_LATEST', invalidateBlockAddresses);

        case 4:
          _context14.next = 6;
          return takeEvery$2('CACHE_INVALIDATE_ADDRESS', invalidateAddress);

        case 6:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked9, this);
}

var _marked$8 =
/*#__PURE__*/
regenerator.mark(isCacheActive),
    _marked2$5 =
/*#__PURE__*/
regenerator.mark(findResponse),
    _marked3$5 =
/*#__PURE__*/
regenerator.mark(runCall),
    _marked4$3 =
/*#__PURE__*/
regenerator.mark(cacheCall),
    _marked5$3 =
/*#__PURE__*/
regenerator.mark(cacheCallByName),
    _marked6$3 =
/*#__PURE__*/
regenerator.mark(cacheCallByAddress),
    _marked7$2 =
/*#__PURE__*/
regenerator.mark(callNoCache),
    _marked8$1 =
/*#__PURE__*/
regenerator.mark(web3Call),
    _marked9$1 =
/*#__PURE__*/
regenerator.mark(_callee$2);

var debug$4 = require('debug')('call-cache-sagas');

function isCacheActive(call$$1) {
  var count;
  return regenerator.wrap(function isCacheActive$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return callCount(call$$1);

        case 2:
          count = _context.sent;
          return _context.abrupt("return", count > 0);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$8, this);
}

function findResponse(call$$1) {
  var callState;
  return regenerator.wrap(function findResponse$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return select(function (state) {
            return state.sagaGenesis.callCache[call$$1.hash];
          });

        case 2:
          callState = _context2.sent;
          return _context2.abrupt("return", !callState || callState.response);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2$5, this);
}

function runCall(call$$1, cacheActive) {
  var response, inFlight;
  return regenerator.wrap(function runCall$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(typeof cacheActive === 'undefined')) {
            _context3.next = 4;
            break;
          }

          _context3.next = 3;
          return isCacheActive(call$$1);

        case 3:
          cacheActive = _context3.sent;

        case 4:
          response = null;
          inFlight = isInFlight(call$$1);

          if (!(cacheActive && !inFlight)) {
            _context3.next = 12;
            break;
          }

          _context3.next = 9;
          return findResponse(call$$1);

        case 9:
          response = _context3.sent;
          _context3.next = 15;
          break;

        case 12:
          _context3.next = 14;
          return executeWeb3Call(call$$1);

        case 14:
          response = _context3.sent;

        case 15:
          return _context3.abrupt("return", response);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3$5, this);
}
/**
  Calls web3Call and increments the call count
*/

function cacheCall(addressOrName, method) {
  var _len,
      args,
      _key,
      _args4 = arguments;

  return regenerator.wrap(function cacheCall$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          for (_len = _args4.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = _args4[_key];
          }

          if (!addressOrName.startsWith('0x')) {
            _context4.next = 7;
            break;
          }

          _context4.next = 4;
          return cacheCallByAddress.apply(void 0, [addressOrName, method].concat(args));

        case 4:
          return _context4.abrupt("return", _context4.sent);

        case 7:
          _context4.next = 9;
          return cacheCallByName.apply(void 0, [addressOrName, method].concat(args));

        case 9:
          return _context4.abrupt("return", _context4.sent);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4$3, this);
}
function cacheCallByName(name, method) {
  var address,
      _len2,
      args,
      _key2,
      _args5 = arguments;

  return regenerator.wrap(function cacheCallByName$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return select(contractByName, name);

        case 2:
          address = _context5.sent;

          if (address) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", null);

        case 5:
          for (_len2 = _args5.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = _args5[_key2];
          }

          _context5.next = 8;
          return cacheCallByAddress.apply(void 0, [address, method].concat(args));

        case 8:
          return _context5.abrupt("return", _context5.sent);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5$3, this);
}
function cacheCallByAddress(address, method) {
  var _len3,
      args,
      _key3,
      call$$1,
      cacheActive,
      _args6 = arguments;

  return regenerator.wrap(function cacheCallByAddress$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          for (_len3 = _args6.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            args[_key3 - 2] = _args6[_key3];
          }

          call$$1 = createCall.apply(void 0, [address, method].concat(args));
          _context6.next = 4;
          return isCacheActive(call$$1);

        case 4:
          cacheActive = _context6.sent;
          _context6.next = 7;
          return registerCall(call$$1);

        case 7:
          _context6.next = 9;
          return runCall(call$$1, cacheActive);

        case 9:
          return _context6.abrupt("return", _context6.sent);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6$3, this);
}
function callNoCache(address, method) {
  var _len4,
      args,
      _key4,
      call$$1,
      _args7 = arguments;

  return regenerator.wrap(function callNoCache$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          for (_len4 = _args7.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
            args[_key4 - 2] = _args7[_key4];
          }

          call$$1 = createCall.apply(void 0, [address, method].concat(args));
          _context7.next = 4;
          return put({
            type: 'WEB3_CALL',
            call: call$$1
          });

        case 4:
          _context7.next = 6;
          return waitForResponse(call$$1);

        case 6:
          return _context7.abrupt("return", _context7.sent);

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7$2, this);
}
function web3Call(address, method) {
  var _len5,
      args,
      _key5,
      call$$1,
      _args8 = arguments;

  return regenerator.wrap(function web3Call$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          for (_len5 = _args8.length, args = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
            args[_key5 - 2] = _args8[_key5];
          }

          call$$1 = createCall.apply(void 0, [address, method].concat(args));
          _context8.next = 4;
          return runCall(call$$1);

        case 4:
          return _context8.abrupt("return", _context8.sent);

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8$1, this);
}
function _callee$2() {
  return regenerator.wrap(function _callee$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return takeEvery$2('WEB3_CALL', web3CallExecute);

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9$1, this);
}

var _marked$9 =
/*#__PURE__*/
regenerator.mark(refreshNetwork),
    _marked2$6 =
/*#__PURE__*/
regenerator.mark(startNetworkPolling),
    _marked3$6 =
/*#__PURE__*/
regenerator.mark(_callee$3);
function refreshNetwork() {
  var web3, existingNetworkId, networkId;
  return regenerator.wrap(function refreshNetwork$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getContext('web3');

        case 2:
          web3 = _context.sent;
          _context.next = 5;
          return select(function (state) {
            return state.sagaGenesis.network.networkId;
          });

        case 5:
          existingNetworkId = _context.sent;
          _context.prev = 6;
          _context.next = 9;
          return web3.eth.net.getId();

        case 9:
          networkId = _context.sent;

          if (!(existingNetworkId !== networkId)) {
            _context.next = 13;
            break;
          }

          _context.next = 13;
          return put({
            type: 'WEB3_NETWORK_ID',
            web3: web3,
            networkId: networkId
          });

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](6);
          _context.next = 19;
          return put({
            type: 'SAGA_GENESIS_CAUGHT_ERROR',
            error: _context.t0
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$9, this, [[6, 15]]);
}
function startNetworkPolling() {
  return regenerator.wrap(function startNetworkPolling$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:

          _context2.next = 3;
          return call(refreshNetwork);

        case 3:
          _context2.next = 5;
          return call(reduxSaga.delay, 1000);

        case 5:
          _context2.next = 0;
          break;

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2$6, this);
}
function _callee$3() {
  return regenerator.wrap(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return fork(startNetworkPolling);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3$6, this);
}

var _marked$a =
/*#__PURE__*/
regenerator.mark(getEthBalance),
    _marked2$7 =
/*#__PURE__*/
regenerator.mark(startEthBalancePolling),
    _marked3$7 =
/*#__PURE__*/
regenerator.mark(_callee$4);

function getEthBalance() {
  var web3, address, balance, oldBalance;
  return regenerator.wrap(function getEthBalance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getReadWeb3();

        case 2:
          web3 = _context.sent;
          _context.next = 5;
          return select(function (state) {
            return state.sagaGenesis.accounts[0];
          });

        case 5:
          address = _context.sent;

          if (!(web3 === undefined || address === undefined)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return");

        case 8:
          _context.next = 10;
          return call(web3.eth.getBalance, address);

        case 10:
          balance = _context.sent;
          _context.next = 13;
          return select(function (state) {
            return state.sagaGenesis.ethBalance.balance;
          });

        case 13:
          oldBalance = _context.sent;

          if (!(oldBalance !== balance)) {
            _context.next = 17;
            break;
          }

          _context.next = 17;
          return put({
            type: 'ETH_BALANCE',
            balance: balance
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$a, this);
}

function startEthBalancePolling() {
  return regenerator.wrap(function startEthBalancePolling$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:

          _context2.prev = 1;
          _context2.next = 4;
          return call(getEthBalance);

        case 4:
          _context2.next = 11;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](1);
          console.warn('warn in startEthBalancePolling()', _context2.t0);
          _context2.next = 11;
          return put({
            type: 'SAGA_GENESIS_CAUGHT_ERROR',
            error: _context2.t0
          });

        case 11:
          _context2.next = 13;
          return call(reduxSaga.delay, 2000);

        case 13:
          _context2.next = 0;
          break;

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2$7, this, [[1, 6]]);
}

function _callee$4() {
  return regenerator.wrap(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return fork(startEthBalancePolling);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3$7, this);
}

var _marked$b =
/*#__PURE__*/
regenerator.mark(web3Send),
    _marked2$8 =
/*#__PURE__*/
regenerator.mark(checkExternalTransactionReceipts),
    _marked3$8 =
/*#__PURE__*/
regenerator.mark(pollTransactions),
    _marked4$4 =
/*#__PURE__*/
regenerator.mark(_callee$5);

var debug$5 = require('debug')('transaction-sagas');

function createTransactionEventChannel(web3, call$$1, transactionId, send, options) {
  debug$5("#".concat(transactionId, ": createTransactionEventChannel"), call$$1);
  return reduxSaga.eventChannel(function (emit) {
    var promiEvent = send(options).on('transactionHash', function (txHash) {
      debug$5("#".concat(transactionId, ": transactionHash ").concat(txHash));
      emit({
        type: 'SG_TRANSACTION_HASH',
        transactionId: transactionId,
        txHash: txHash,
        call: call$$1
      });
    }).on('confirmation', function (confirmationNumber, receipt) {
      debug$5("#".concat(transactionId, ": confirmation ").concat(confirmationNumber));
      emit({
        type: 'SG_TRANSACTION_CONFIRMATION',
        transactionId: transactionId,
        confirmationNumber: confirmationNumber,
        receipt: receipt
      });

      if (confirmationNumber === options.numConfirmationsRequired) {
        emit({
          type: 'SG_TRANSACTION_CONFIRMED',
          transactionId: transactionId,
          call: call$$1,
          confirmationNumber: confirmationNumber,
          receipt: receipt
        });
        emit(reduxSaga.END);
      }
    }).on('receipt', function (receipt) {
      debug$5("#".concat(transactionId, ": receipt"), receipt);
      emit({
        type: 'SG_TRANSACTION_RECEIPT',
        transactionId: transactionId,
        receipt: receipt
      });
    }).on('error', function (error) {
      debug$5("#".concat(transactionId, ": error ").concat(error));
      var txObject = {
        type: 'SG_TRANSACTION_ERROR',
        transactionId: transactionId,
        call: call$$1,
        error: error.toString()
      };
      var gasUsed = error.message.match(/"gasUsed": ([0-9]*)/);
      if (gasUsed) txObject['gasUsed'] = gasUsed[1];
      emit(txObject);
      emit(reduxSaga.END);
    });
    return function () {
      promiEvent.removeAllListeners();
    };
  });
}

function web3Send(_ref) {
  var transactionId, call$$1, options, address, method, args, account, contractRegistry, web3, contractKey, contract, contractMethod, func, send, transactionChannel;
  return regenerator.wrap(function web3Send$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          transactionId = _ref.transactionId, call$$1 = _ref.call, options = _ref.options;
          debug$5("#".concat(transactionId, ": web3Send"), call$$1);
          address = call$$1.address, method = call$$1.method, args = call$$1.args;
          _context.prev = 3;
          _context.next = 6;
          return put({
            type: 'SG_START_TRANSACTION',
            transactionId: transactionId,
            call: call$$1,
            options: options,
            address: address
          });

        case 6:
          _context.next = 8;
          return select(function (state) {
            return state.sagaGenesis.accounts[0];
          });

        case 8:
          account = _context.sent;
          options = Object.assign({
            from: account
          }, options || {});
          _context.next = 12;
          return select(function (state) {
            return state.sagaGenesis.sagaGenesisInit.numConfirmationsRequired;
          });

        case 12:
          options.numConfirmationsRequired = _context.sent;
          _context.next = 15;
          return getContext('writeContractRegistry');

        case 15:
          contractRegistry = _context.sent;
          _context.next = 18;
          return getContext('web3');

        case 18:
          web3 = _context.sent;
          _context.next = 21;
          return select(contractKeyByAddress, address);

        case 21:
          contractKey = _context.sent;
          contract = contractRegistry.get(address, contractKey, web3);
          contractMethod = contract.methods[method];

          if (contractMethod) {
            _context.next = 28;
            break;
          }

          _context.next = 27;
          return put({
            type: 'SG_TRANSACTION_ERROR',
            transactionId: transactionId,
            call: call$$1,
            error: "Address ".concat(address, " does not have method '").concat(method, "'")
          });

        case 27:
          return _context.abrupt("return");

        case 28:
          func = contractMethod.apply(void 0, toConsumableArray(args));
          send = func.send;
          transactionChannel = createTransactionEventChannel(web3, call$$1, transactionId, send, options);
          _context.prev = 31;

        case 32:

          _context.t0 = put;
          _context.next = 36;
          return take(transactionChannel);

        case 36:
          _context.t1 = _context.sent;
          _context.next = 39;
          return (0, _context.t0)(_context.t1);

        case 39:
          _context.next = 32;
          break;

        case 41:
          _context.prev = 41;
          transactionChannel.close();
          return _context.finish(41);

        case 44:
          _context.next = 51;
          break;

        case 46:
          _context.prev = 46;
          _context.t2 = _context["catch"](3);
          debug$5("#".concat(transactionId, " web3Send: ERROR"), call$$1);
          _context.next = 51;
          return put({
            type: 'SG_TRANSACTION_ERROR',
            transactionId: transactionId,
            call: call$$1,
            error: _context.t2.message
          });

        case 51:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$b, this, [[3, 46], [31,, 41, 44]]);
}

function checkExternalTransactionReceipts(web3) {
  var networkId, _web, transactions, i, _transactions$i, transactionId, txHash, txType, inFlight, call$$1, submitted, complete, receipt;

  return regenerator.wrap(function checkExternalTransactionReceipts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return web3NetworkId();

        case 3:
          networkId = _context2.sent;
          _context2.next = 6;
          return getReadWeb3();

        case 6:
          _web = _context2.sent;
          _context2.next = 9;
          return select(function (state) {
            return Object.values(state.sagaGenesis.transactions);
          });

        case 9:
          transactions = _context2.sent;
          i = 0;

        case 11:
          if (!(i < transactions.length)) {
            _context2.next = 32;
            break;
          }

          _transactions$i = transactions[i], transactionId = _transactions$i.transactionId, txHash = _transactions$i.txHash, txType = _transactions$i.txType, inFlight = _transactions$i.inFlight, call$$1 = _transactions$i.call, submitted = _transactions$i.submitted, complete = _transactions$i.complete;

          if (!(submitted && !complete)) {
            _context2.next = 29;
            break;
          }

          _context2.next = 16;
          return call(_web.eth.getTransactionReceipt, txHash);

        case 16:
          receipt = _context2.sent;

          if (!receipt) {
            _context2.next = 29;
            break;
          }

          _context2.next = 20;
          return put({
            type: 'SG_TRANSACTION_RECEIPT',
            transactionId: transactionId,
            receipt: receipt,
            call: call$$1
          });

        case 20:
          if (!receipt.status) {
            _context2.next = 25;
            break;
          }

          _context2.next = 23;
          return put({
            type: 'SG_TRANSACTION_CONFIRMED',
            transactionId: transactionId,
            receipt: receipt,
            call: call$$1
          });

        case 23:
          _context2.next = 27;
          break;

        case 25:
          _context2.next = 27;
          return put({
            type: 'SG_TRANSACTION_ERROR',
            transactionId: transactionId,
            call: call$$1,
            error: ""
          });

        case 27:
          _context2.next = 29;
          break;

        case 29:
          i++;
          _context2.next = 11;
          break;

        case 32:
          _context2.next = 37;
          break;

        case 34:
          _context2.prev = 34;
          _context2.t0 = _context2["catch"](0);
          console.warn(_context2.t0);

        case 37:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2$8, this, [[0, 34]]);
}

function pollTransactions() {
  return regenerator.wrap(function pollTransactions$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:

          _context3.next = 3;
          return call(checkExternalTransactionReceipts);

        case 3:
          _context3.next = 5;
          return call(reduxSaga.delay, 2000);

        case 5:
          _context3.next = 0;
          break;

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3$8, this);
}

function _callee$5() {
  return regenerator.wrap(function _callee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return fork(pollTransactions);

        case 2:
          _context4.next = 4;
          return takeEvery$2('SG_SEND_TRANSACTION', web3Send);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4$4, this);
}

var _marked$c =
/*#__PURE__*/
regenerator.mark(sagaGenesisInit$1);
function sagaGenesisInit$1() {
  return regenerator.wrap(function sagaGenesisInit$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return put({
            type: 'SG_SAGA_GENESIS_INITIALIZED'
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$c, this);
}

var _marked$d =
/*#__PURE__*/
regenerator.mark(addSubscription),
    _marked2$9 =
/*#__PURE__*/
regenerator.mark(checkLatestBlockForEvents),
    _marked3$9 =
/*#__PURE__*/
regenerator.mark(checkReceiptForEvents),
    _marked4$5 =
/*#__PURE__*/
regenerator.mark(logSaga);

var debug$6 = require('debug')('logSaga.js');

var MAX_RETRIES$1 = 50;
var RETRY_DELAY = 2000;

function addSubscription(_ref) {
  var address, fromBlock, listener, web3, fromBlockHex, i, pastLogs;
  return regenerator.wrap(function addSubscription$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          address = _ref.address, fromBlock = _ref.fromBlock;
          address = address.toLowerCase();
          _context.next = 4;
          return put({
            type: 'LOG_LISTENER_ADDED',
            address: address
          });

        case 4:
          _context.next = 6;
          return select(function (state) {
            return state.sagaGenesis.logs[address];
          });

        case 6:
          listener = _context.sent;

          if (!(listener.count === 1)) {
            _context.next = 32;
            break;
          }

          _context.next = 10;
          return getReadWeb3();

        case 10:
          web3 = _context.sent;
          fromBlockHex = web3.utils.toHex(fromBlock || 0);
          i = 0;

        case 13:
          if (!(i < MAX_RETRIES$1)) {
            _context.next = 32;
            break;
          }

          _context.next = 16;
          return call([web3.eth, 'getPastLogs'], {
            fromBlock: fromBlockHex,
            toBlock: 'latest',
            address: address
          });

        case 16:
          pastLogs = _context.sent;

          if (!pastLogs) {
            _context.next = 23;
            break;
          }

          _context.next = 20;
          return put({
            type: 'PAST_LOGS',
            address: address,
            logs: pastLogs
          });

        case 20:
          return _context.abrupt("return");

        case 23:
          if (!(i > MAX_RETRIES$1)) {
            _context.next = 27;
            break;
          }

          throw new Error('Unable to get pastLogs from network');

        case 27:
          _context.next = 29;
          return call(reduxSaga.delay, RETRY_DELAY);

        case 29:
          i++;
          _context.next = 13;
          break;

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$d, this);
}

function checkLatestBlockForEvents(_ref2) {
  var block, addressSet, i, transaction, to, from, receipt;
  return regenerator.wrap(function checkLatestBlockForEvents$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          block = _ref2.block;
          debug$6("checkLatestBlockForEvents(): ", block);
          _context2.prev = 2;
          addressSet = new Set();
          _context2.t0 = regenerator.keys(block.transactions);

        case 5:
          if ((_context2.t1 = _context2.t0()).done) {
            _context2.next = 22;
            break;
          }

          i = _context2.t1.value;
          transaction = block.transactions[i];
          _context2.next = 10;
          return call(addAddressIfExists, addressSet, transaction.to);

        case 10:
          to = _context2.sent;
          _context2.next = 13;
          return call(addAddressIfExists, addressSet, transaction.from);

        case 13:
          from = _context2.sent;

          if (!(to || from)) {
            _context2.next = 20;
            break;
          }

          _context2.next = 17;
          return call(getReceiptData, transaction.hash);

        case 17:
          receipt = _context2.sent;
          _context2.next = 20;
          return checkReceiptForEvents(receipt);

        case 20:
          _context2.next = 5;
          break;

        case 22:
          _context2.next = 29;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t2 = _context2["catch"](2);
          console.warn('warn in latestBlock()');
          _context2.next = 29;
          return put({
            type: 'SAGA_GENESIS_CAUGHT_ERROR',
            error: _context2.t2
          });

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2$9, this, [[2, 24]]);
}

function checkReceiptForEvents(receipt) {
  return regenerator.wrap(function checkReceiptForEvents$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return all(receipt.logs.map(
          /*#__PURE__*/
          regenerator.mark(function _callee(log) {
            var address, logs;
            return regenerator.wrap(function _callee$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    address = log.address.toLowerCase();
                    _context3.next = 3;
                    return select(function (state) {
                      return state.sagaGenesis.logs[address];
                    });

                  case 3:
                    logs = _context3.sent;

                    if (!logs) {
                      _context3.next = 7;
                      break;
                    }

                    _context3.next = 7;
                    return put({
                      type: 'NEW_LOG',
                      address: address,
                      log: log
                    });

                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee, this);
          })));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked3$9, this);
}

function logSaga() {
  return regenerator.wrap(function logSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return fork(takeSequentially, 'ADD_LOG_LISTENER', addSubscription);

        case 2:
          _context5.next = 4;
          return fork(takeSequentially, 'BLOCK_LATEST', checkLatestBlockForEvents);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked4$5, this);
}

var _marked$e =
/*#__PURE__*/
regenerator.mark(takeOnceAndRun);
function takeOnceAndRun(pattern, saga) {
  var action;
  return regenerator.wrap(function takeOnceAndRun$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return take(pattern);

        case 2:
          action = _context.sent;
          _context.next = 5;
          return call(saga, action);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$e, this);
}

var _marked$f =
/*#__PURE__*/
regenerator.mark(start),
    _marked2$a =
/*#__PURE__*/
regenerator.mark(_callee$6);
function start(_ref) {
  var web3;
  return regenerator.wrap(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          web3 = _ref.web3;
          _context.next = 3;
          return setContext({
            web3: web3
          });

        case 3:
          _context.next = 5;
          return all([_callee$2(), _callee$3(), _callee(), _callee$1(), _callee6(), _callee$5(), _callee$4(), logSaga(), sagaGenesisInit$1()]);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$f, this);
}
function _callee$6() {
  return regenerator.wrap(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return fork(takeOnceAndRun, 'WEB3_INITIALIZED', start);

        case 2:
          _context2.next = 4;
          return web3Initialize();

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2$a, this);
}

var TransactionStateHandler =
/*#__PURE__*/
function () {
  function TransactionStateHandler() {
    classCallCheck(this, TransactionStateHandler);
  }

  createClass(TransactionStateHandler, [{
    key: "handle",
    value: function handle(transaction) {
      var _this = this;

      return {
        onError: function onError(cb) {
          if (!_this.hasError && transaction && transaction.error) {
            cb(transaction.error);
            _this.hasError = true;
          }

          return _this.handle(transaction);
        },
        onTxHash: function onTxHash(cb) {
          if (!_this.hasTxHash && transaction && transaction.txHash) {
            cb(transaction.txHash);
            _this.hasTxHash = true;
          }

          return _this.handle(transaction);
        },
        onReceipt: function onReceipt(cb) {
          if (!_this.hasReceipt && transaction && transaction.receipt) {
            cb(transaction.receipt);
            _this.hasReceipt = true;
          }

          return _this.handle(transaction);
        },
        onConfirmed: function onConfirmed(cb) {
          if (!_this.hasConfirmed && transaction && transaction.confirmed) {
            cb();
            _this.hasConfirmed = true;
          }

          return _this.handle(transaction);
        }
      };
    }
  }]);

  return TransactionStateHandler;
}();

exports.nextId = nextId;
exports.CallCountRegistry = CallCountRegistry;
exports.ContractRegistry = ContractRegistry;
exports.sagas = _callee$6;
exports.TransactionStateHandler = TransactionStateHandler;
exports.ContractRegistryProvider = ContractRegistryProvider;
exports.withContractRegistry = withContractRegistry;
exports.withSaga = withSaga;
exports.withSend = withSend;
exports.LogListener = LogListener;
exports.contractByName = contractByName;
exports.contractKeyByAddress = contractKeyByAddress;
exports.cacheCallState = cacheCallState;
exports.cacheCallValue = cacheCallValue;
exports.cacheCallValueInt = cacheCallValueInt;
exports.cacheCallValueBigNumber = cacheCallValueBigNumber;
exports.hashCall = hashCall;
exports.abiFactory = abiFactory;
exports.createCall = createCall;
exports.ABIHelper = ABIHelper;
exports.addLogListener = addLogListener;
exports.removeLogListener = removeLogListener;
exports.logReducerFactory = logReducerFactory;
exports.reducers = reducers;
exports.start = start;
exports.web3Send = web3Send;
exports.addContract = addContract;
exports.web3NetworkId = web3NetworkId;
exports.takeOnceAndRun = takeOnceAndRun;
exports.takeSequentially = takeSequentially;
exports.runCall = runCall;
exports.cacheCall = cacheCall;
exports.cacheCallByName = cacheCallByName;
exports.cacheCallByAddress = cacheCallByAddress;
exports.callNoCache = callNoCache;
exports.web3Call = web3Call;
