/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./img/avatar.jpg":
/*!************************!*\
  !*** ./img/avatar.jpg ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"img/avatar.jpg\");\n\n//# sourceURL=webpack:///./img/avatar.jpg?");

/***/ }),

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "./components/MessageInput/MessageInput.module.css":
/*!*********************************************************!*\
  !*** ./components/MessageInput/MessageInput.module.css ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"*,\\n*::before,\\n*::after {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n}\\n\\nhtml {\\n  font-size: 15px;\\n}\\n\\n.form {\\n  width: 100%;\\n  border-top: 1px solid rgba(25, 25, 25, 0.32);\\n  position: fixed;\\n  bottom: 0;\\n  display: flex;\\n  padding: 0 12px;\\n  background: white;\\n  align-items: center;\\n  column-gap: 12px;\\n}\\n\\n.form__input {\\n  resize: none;\\n  padding: 12px 0;\\n  border: 0;\\n  outline: none;\\n  width: 100%;\\n  font-size: inherit;\\n}\\n\\n.form__send-button {\\n  cursor: pointer;\\n  display: none;\\n  justify-content: center;\\n  align-items: center;\\n  background: var(--color-main);\\n  border: none;\\n  border-radius: 4px;\\n  padding: 4px 8px;\\n}\\n.form__send-button_active {\\n  display: flex;\\n}\\n\\n.form__send-icon {\\n  color: white;\\n  width: 24px;\\n}\\n\");\n\n//# sourceURL=webpack:///./components/MessageInput/MessageInput.module.css?");

/***/ }),

/***/ "./components/MessagesList/MessagesList.module.css":
/*!*********************************************************!*\
  !*** ./components/MessagesList/MessagesList.module.css ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"*,\\n*::before,\\n*::after {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n}\\n\\n:root {\\n  --color-main: rgb(142, 36, 170);\\n  --color-black: rgba(0, 0, 0, 1);\\n}\\n\\n.messages-container {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: end;\\n  padding: 8px;\\n}\\n.messages-container__message {\\n  list-style-type: none;\\n  max-width: 90%;\\n  margin: 4px 0;\\n  padding: 4px 12px;\\n  border-radius: 4px;\\n  background: #EFFEDD;\\n}\\n.messages-container__message_user {\\n  background: white;\\n  align-self: flex-start;\\n}\\n.messages-container__timestamp {\\n  font-size: 0.8em;\\n  opacity: 0.9;\\n  display: block;\\n  text-align: right;\\n}\\n\\n.actions {\\n  position: absolute;\\n  display: none;\\n  border: 1px solid rgba(25, 25, 25, 0.32);\\n  padding: 4px 8px;\\n  background: white;\\n  border-radius: 8px;\\n  top: 90px;\\n}\\n.actions_active {\\n  display: block;\\n}\\n.actions__elem {\\n  cursor: pointer;\\n  border: none;\\n  background: none;\\n}\\n\");\n\n//# sourceURL=webpack:///./components/MessagesList/MessagesList.module.css?");

/***/ }),

/***/ "./components/MessageInput/MessageInput.js":
/*!*************************************************!*\
  !*** ./components/MessageInput/MessageInput.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MessageInput: () => (/* binding */ MessageInput)\n/* harmony export */ });\n/* harmony import */ var _MessageInput_module_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageInput.module.css */ \"./components/MessageInput/MessageInput.module.css\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }\nfunction _possibleConstructorReturn(t, e) { if (e && (\"object\" == _typeof(e) || \"function\" == typeof e)) return e; if (void 0 !== e) throw new TypeError(\"Derived constructors may only return object or undefined\"); return _assertThisInitialized(t); }\nfunction _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); return e; }\nfunction _inherits(t, e) { if (\"function\" != typeof e && null !== e) throw new TypeError(\"Super expression must either be null or a function\"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, \"prototype\", { writable: !1 }), e && _setPrototypeOf(t, e); }\nfunction _wrapNativeSuper(t) { var r = \"function\" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if (\"function\" != typeof t) throw new TypeError(\"Super expression must either be null or a function\"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }\nfunction _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }\nfunction _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }\nfunction _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf(\"[native code]\"); } catch (n) { return \"function\" == typeof t; } }\nfunction _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }\nfunction _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }\nfunction _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }\nfunction _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError(\"Cannot initialize the same private elements twice on an object\"); }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }\nfunction _assertClassBrand(e, t, n) { if (\"function\" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError(\"Private element is not present on this object\"); }\n\nvar _defaultPlaceholder = /*#__PURE__*/new WeakMap();\nvar _errorPlaceholder = /*#__PURE__*/new WeakMap();\nvar MessageInput = /*#__PURE__*/function (_HTMLElement) {\n  function MessageInput() {\n    var _this;\n    _classCallCheck(this, MessageInput);\n    _this = _callSuper(this, MessageInput);\n    _defineProperty(_this, \"form\", void 0);\n    _defineProperty(_this, \"input\", void 0);\n    _defineProperty(_this, \"formSendButton\", void 0);\n    _classPrivateFieldInitSpec(_this, _defaultPlaceholder, 'Введите сообщение');\n    _classPrivateFieldInitSpec(_this, _errorPlaceholder, 'Сначала вы должны ввести имя');\n    _this.handleSubmit = _this.handleSubmit.bind(_this);\n    _this.handleKeyPress = _this.handleKeyPress.bind(_this);\n    _this.handleInputChange = _this.handleInputChange.bind(_this);\n    return _this;\n  }\n  _inherits(MessageInput, _HTMLElement);\n  return _createClass(MessageInput, [{\n    key: \"connectedCallback\",\n    value: function connectedCallback() {\n      this.attachShadow({\n        mode: 'open'\n      });\n      this.render();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      this.removeEventListeners();\n      this.shadowRoot.innerHTML = this.getHtml();\n      this.form = this.shadowRoot.querySelector('.form');\n      this.input = this.shadowRoot.querySelector('.form__input');\n      this.formSendButton = this.shadowRoot.querySelector('.form__send-button');\n      this.addEventListeners();\n    }\n  }, {\n    key: \"addEventListeners\",\n    value: function addEventListeners() {\n      this.form.addEventListener('submit', this.handleSubmit);\n      this.form.addEventListener('keypress', this.handleKeyPress);\n      this.input.addEventListener('input', this.handleInputChange);\n    }\n  }, {\n    key: \"removeEventListeners\",\n    value: function removeEventListeners() {\n      if (this.form && this.input) {\n        this.form.removeEventListener('submit', this.handleSubmit);\n        this.form.removeEventListener('keypress', this.handleKeyPress);\n        this.input.removeEventListener('input', this.handleInputChange);\n      }\n    }\n  }, {\n    key: \"handleSubmit\",\n    value: function handleSubmit(event) {\n      event.preventDefault();\n      var messageComponent = document.querySelector('messages-list');\n      var messagesList = JSON.parse(localStorage.getItem('messages')) || [];\n      if (this.input.value.trim()) {\n        var _document$getElementB;\n        messagesList.push({\n          author: (_document$getElementB = document.getElementById('userName')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value,\n          text: this.input.value.trim(),\n          sendDate: new Date()\n        });\n        this.input.value = '';\n        this.formSendButton.classList.remove('form__send-button_active');\n        localStorage.setItem('messages', JSON.stringify(messagesList));\n      }\n      if (messageComponent) {\n        messageComponent.render();\n      }\n    }\n  }, {\n    key: \"handleKeyPress\",\n    value: function handleKeyPress(event) {\n      if (!event.shiftKey && event.keyCode === 13) {\n        event.preventDefault();\n        this.form.dispatchEvent(new Event('submit'));\n      }\n    }\n  }, {\n    key: \"handleInputChange\",\n    value: function handleInputChange() {\n      if (this.input.value) {\n        this.formSendButton.classList.add('form__send-button_active');\n      } else {\n        this.formSendButton.classList.remove('form__send-button_active');\n      }\n    }\n  }, {\n    key: \"lockInput\",\n    value: function lockInput() {\n      this.input.disabled = true;\n      this.input.placeholder = _classPrivateFieldGet(_errorPlaceholder, this);\n      this.formSendButton.classList.remove('form__send-button_active');\n    }\n  }, {\n    key: \"unLockInput\",\n    value: function unLockInput() {\n      this.input.disabled = false;\n      this.input.placeholder = _classPrivateFieldGet(_defaultPlaceholder, this);\n      this.handleInputChange();\n    }\n  }, {\n    key: \"getHtml\",\n    value: function getHtml() {\n      return \"\\n      <style>\".concat(_MessageInput_module_css__WEBPACK_IMPORTED_MODULE_0__[\"default\"], \"</style>\\n      <form class=\\\"form\\\" action=\\\"/\\\" autocomplete=\\\"off\\\">\\n        <textarea \\n          class=\\\"form__input\\\" \\n          name=\\\"message-text\\\" \\n          placeholder=\\\"\").concat(_classPrivateFieldGet(_errorPlaceholder, this), \"\\\" \\n          rows=\\\"1\\\" \\n          disabled\\n        ></textarea>\\n        <button class=\\\"form__send-button\\\">\\n          <svg class=\\\"form__send-icon\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"currentColor\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\n            <path d=\\\"M5 18.5V13.346L10.846 12L5 10.654V5.5L20.423 12L5 18.5Z\\\"/>\\n          </svg>\\n        </button>\\n      </form>\");\n    }\n  }]);\n}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));\n\n//# sourceURL=webpack:///./components/MessageInput/MessageInput.js?");

/***/ }),

/***/ "./components/MessageInput/index.js":
/*!******************************************!*\
  !*** ./components/MessageInput/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MessageInput: () => (/* reexport safe */ _MessageInput__WEBPACK_IMPORTED_MODULE_0__.MessageInput)\n/* harmony export */ });\n/* harmony import */ var _MessageInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageInput */ \"./components/MessageInput/MessageInput.js\");\n\n\n//# sourceURL=webpack:///./components/MessageInput/index.js?");

/***/ }),

/***/ "./components/MessagesList/MessagesList.js":
/*!*************************************************!*\
  !*** ./components/MessagesList/MessagesList.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MessagesList: () => (/* binding */ MessagesList)\n/* harmony export */ });\n/* harmony import */ var _MessagesList_module_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessagesList.module.css */ \"./components/MessagesList/MessagesList.module.css\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }\nfunction _possibleConstructorReturn(t, e) { if (e && (\"object\" == _typeof(e) || \"function\" == typeof e)) return e; if (void 0 !== e) throw new TypeError(\"Derived constructors may only return object or undefined\"); return _assertThisInitialized(t); }\nfunction _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); return e; }\nfunction _inherits(t, e) { if (\"function\" != typeof e && null !== e) throw new TypeError(\"Super expression must either be null or a function\"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, \"prototype\", { writable: !1 }), e && _setPrototypeOf(t, e); }\nfunction _wrapNativeSuper(t) { var r = \"function\" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if (\"function\" != typeof t) throw new TypeError(\"Super expression must either be null or a function\"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }\nfunction _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }\nfunction _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }\nfunction _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf(\"[native code]\"); } catch (n) { return \"function\" == typeof t; } }\nfunction _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }\nfunction _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }\nfunction _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }\nfunction _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError(\"Cannot initialize the same private elements twice on an object\"); }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _assertClassBrand(e, t, n) { if (\"function\" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError(\"Private element is not present on this object\"); }\n\nvar _MessagesList_brand = /*#__PURE__*/new WeakSet();\nvar MessagesList = /*#__PURE__*/function (_HTMLElement) {\n  function MessagesList() {\n    var _this;\n    _classCallCheck(this, MessagesList);\n    _this = _callSuper(this, MessagesList);\n    _classPrivateMethodInitSpec(_this, _MessagesList_brand);\n    _defineProperty(_this, \"container\", void 0);\n    _defineProperty(_this, \"messages\", void 0);\n    _defineProperty(_this, \"actions\", void 0);\n    _defineProperty(_this, \"messageContextIndex\", void 0);\n    _this.handleMessageMouseDown = _this.handleMessageMouseDown.bind(_this);\n    _this.hadnleContextClick = _this.hadnleContextClick.bind(_this);\n    return _this;\n  }\n  _inherits(MessagesList, _HTMLElement);\n  return _createClass(MessagesList, [{\n    key: \"connectedCallback\",\n    value: function connectedCallback() {\n      this.attachShadow({\n        mode: 'open'\n      });\n      this.render();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      this.messages = JSON.parse(localStorage.getItem('messages')) || [];\n      this.removeEventListeners();\n      this.shadowRoot.innerHTML = this.getHtml();\n      this.container = this.shadowRoot.querySelector('.messages-container');\n      this.actions = this.shadowRoot.querySelector('.actions');\n      this.addEventListeners();\n    }\n  }, {\n    key: \"addEventListeners\",\n    value: function addEventListeners() {\n      if (this.container) {\n        this.container.addEventListener('contextmenu', this.hadnleContextClick);\n        this.container.addEventListener('mousedown', this.handleMessageMouseDown);\n      }\n    }\n  }, {\n    key: \"removeEventListeners\",\n    value: function removeEventListeners() {\n      if (this.container) {\n        this.container.removeEventListener('contextmenu', this.hadnleContextClick);\n        this.container.removeEventListener('mousedown', this.handleMessageMouseDown);\n      }\n    }\n  }, {\n    key: \"handleMessageMouseDown\",\n    value: function handleMessageMouseDown(event) {\n      if (event.button !== 2 && this.actions.classList.contains('actions_active')) {\n        this.actions.classList.remove('actions_active');\n        this.messageContextIndex = null;\n      }\n    }\n  }, {\n    key: \"hadnleContextClick\",\n    value: function hadnleContextClick(event) {\n      event.preventDefault();\n      var item = event.target.closest('.messages-container__message');\n      var isActionsMenuShow = this.actions.classList.contains('actions_active');\n      if (item && !isActionsMenuShow) {\n        this.messageContextIndex = +item.getAttribute('data-index');\n        this.renderActionsMenu(event);\n      } else {\n        this.messageContextIndex = null;\n        this.actions.classList.remove('actions_active');\n      }\n    }\n  }, {\n    key: \"renderActionsMenu\",\n    value: function renderActionsMenu(event) {\n      var screenWidth = window.innerWidth;\n      var elementWidth = 142;\n      if (event.pageX < screenWidth / 2) {\n        this.actions.style.left = \"\".concat(event.pageX, \"px\");\n      } else {\n        this.actions.style.left = \"\".concat(event.pageX - elementWidth, \"px\");\n      }\n      this.actions.style.top = \"\".concat(event.pageY, \"px\");\n      this.actions.classList.add('actions_active');\n    }\n  }, {\n    key: \"removeMessage\",\n    value: function removeMessage() {\n      this.messages = [].concat(_toConsumableArray(this.messages.slice(0, this.messageContextIndex)), _toConsumableArray(this.messages.slice(this.messageContextIndex + 1)));\n      localStorage.setItem('messages', JSON.stringify(this.messages));\n      this.render();\n    }\n  }, {\n    key: \"getHtml\",\n    value: function getHtml() {\n      var _this2 = this;\n      return \"\\n      <style>\".concat(_MessagesList_module_css__WEBPACK_IMPORTED_MODULE_0__[\"default\"], \"</style>\\n      <ul class=\\\"messages-container\\\">\\n        \").concat(this.messages.map(function (msg, index) {\n        return _assertClassBrand(_MessagesList_brand, _this2, _getMessage).call(_this2, msg, index);\n      }).join(''), \"\\n      </ul>\\n      <div class=\\\"actions\\\">\\n        <button class=\\\"actions__elem\\\" data-action=\\\"delete\\\" onclick=\\\"this.getRootNode().host.removeMessage()\\\">\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C \\u0441\\u043E\\u043E\\u0431\\u0449\\u0435\\u043D\\u0438\\u0435</button>\\n      </div>\\n    \");\n    }\n  }]);\n}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));\nfunction _getFormattedDate(date) {\n  var hours = String(date.getHours()).padStart(2, '0');\n  var minutes = String(date.getMinutes()).padStart(2, '0');\n  return \"\".concat(hours, \":\").concat(minutes);\n}\nfunction _getMessage(msg, index) {\n  var _document$getElementB;\n  var messageClasses;\n  if (msg.author.trim() === ((_document$getElementB = document.getElementById('userName')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value.trim())) {\n    messageClasses = 'messages-container__message messages-container__message';\n  } else {\n    messageClasses = 'messages-container__message messages-container__message_user';\n  }\n  return \"\\n      <li data-index=\\\"\".concat(index, \"\\\" class=\\\"\").concat(messageClasses, \"\\\">\\n        <h6 class=\\\"messages-container__author\\\">\").concat(msg.author.trim(), \"</h6>\\n        <p class=\\\"messages-container__text\\\">\").concat(msg.text.replace(/\\n/g, '<br>'), \"</p>\\n        <span class=\\\"messages-container__timestamp\\\">\").concat(_assertClassBrand(_MessagesList_brand, this, _getFormattedDate).call(this, new Date(msg.sendDate)), \"</span>\\n      </li>\\n      \");\n}\n\n//# sourceURL=webpack:///./components/MessagesList/MessagesList.js?");

/***/ }),

/***/ "./components/MessagesList/index.js":
/*!******************************************!*\
  !*** ./components/MessagesList/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MessagesList: () => (/* reexport safe */ _MessagesList__WEBPACK_IMPORTED_MODULE_0__.MessagesList)\n/* harmony export */ });\n/* harmony import */ var _MessagesList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessagesList */ \"./components/MessagesList/MessagesList.js\");\n\n\n//# sourceURL=webpack:///./components/MessagesList/index.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_MessagesList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/MessagesList */ \"./components/MessagesList/index.js\");\n/* harmony import */ var _components_MessageInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/MessageInput */ \"./components/MessageInput/index.js\");\n/* harmony import */ var _img_avatar_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/avatar.jpg */ \"./img/avatar.jpg\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n\n\n\n\ncustomElements.define('messages-list', _components_MessagesList__WEBPACK_IMPORTED_MODULE_0__.MessagesList);\ncustomElements.define('message-input', _components_MessageInput__WEBPACK_IMPORTED_MODULE_1__.MessageInput);\nvar messageInput = document.querySelector('message-input');\nvar messagesList = document.querySelector('messages-list');\nvar userInput = document.getElementById('userName');\nuserInput.addEventListener('input', handleInputUser);\nfunction handleInputUser() {\n  if (!userInput.value.trim()) {\n    messageInput.lockInput();\n  } else {\n    messageInput.unLockInput();\n  }\n  messagesList.render();\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;