"use strict";(self.webpackChunkaltrone_ui=self.webpackChunkaltrone_ui||[]).push([[575],{"./src/components/list/Breadcrumbs/Breadcrumbs.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultBreadcrumbs:()=>DefaultBreadcrumbs,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Breadcrumbs_stories});var icons=__webpack_require__("./src/components/icons/index.ts"),Breadcrumbs=__webpack_require__("./src/components/list/Breadcrumbs/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var DefaultBreadcrumbs={name:"Default Spoiler",render:function render(_ref){var args=_extends({},(function _objectDestructuringEmpty(obj){if(null==obj)throw new TypeError("Cannot destructure "+obj)}(_ref),_ref));return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(Breadcrumbs.O,_objectSpread({},args))})},decorators:[__webpack_require__("./src/storybook/StorybookPlayground.tsx").XS]};const Breadcrumbs_stories={component:Breadcrumbs.O,title:"Lists/Breadcrumbs",tags:["autodocs"],args:{links:[{title:"Dashboard",href:"https://google.com"},{title:"Invoices",icon:(0,jsx_runtime.jsx)(icons.J,{i:"request_quote"}),onClick:function onClick(){return alert("invoices")}},{title:"#1309",href:"#1309"}],collapsible:!1,disabled:!1,showHomeLink:!0},argTypes:{links:{description:"The list of the links"},collapsible:{description:"When the list is collapsed, the inner items of the list are collapsed into context menu"},disabled:{description:"When the list is disabled all items of the list are not clickable"},showHomeLink:{description:'Use this property to show "Home" item'},className:{description:"Custom css class which applies to wrapper"},HomeComponent:{description:'Custom implementation of "Home" item'},onHomeClick:{description:'Callback fires each time when user clicks on "Home" item'}}};var __namedExportsOrder=["DefaultBreadcrumbs"]}}]);