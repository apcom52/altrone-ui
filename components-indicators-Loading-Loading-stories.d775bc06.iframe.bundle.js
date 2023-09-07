"use strict";(self.webpackChunkaltrone_ui=self.webpackChunkaltrone_ui||[]).push([[379],{"./src/components/indicators/Loading/Loading.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultLoading:()=>DefaultLoading,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Loading_stories});var types=__webpack_require__("./src/types/index.ts"),Loading=__webpack_require__("./src/components/indicators/Loading/index.ts"),StorybookPlayground=__webpack_require__("./src/storybook/StorybookPlayground.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var DefaultLoading={name:"Default Loading",render:function render(_ref){var args=_extends({},(function _objectDestructuringEmpty(obj){if(null==obj)throw new TypeError("Cannot destructure "+obj)}(_ref),_ref));return(0,jsx_runtime.jsx)(Loading.g,function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},args))},decorators:[StorybookPlayground.XS]};const Loading_stories={component:Loading.g,title:"Indicators/Loading",tags:["autodocs"],args:{size:types.$u.medium},argTypes:{size:{control:"select",description:"Size of the loading animation"},className:{description:"Custom className for loading animation"},color:{description:"This field is used for applying a custom color for loading animation. By default, we use textColor variable"}}};var __namedExportsOrder=["DefaultLoading"]}}]);