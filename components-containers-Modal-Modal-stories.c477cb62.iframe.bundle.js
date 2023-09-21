"use strict";(self.webpackChunkaltrone_ui=self.webpackChunkaltrone_ui||[]).push([[148],{"./src/components/containers/Modal/Modal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultModalStory:()=>DefaultModalStory,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Modal_stories});var Modal=__webpack_require__("./src/components/containers/Modal/index.ts"),StorybookPlayground=__webpack_require__("./src/storybook/StorybookPlayground.tsx"),react=__webpack_require__("./node_modules/react/index.js"),ButtonContainer=__webpack_require__("./src/components/containers/ButtonContainer/index.ts"),typography=__webpack_require__("./src/components/typography/index.ts"),Form=__webpack_require__("./src/components/containers/Form/index.ts"),components_form=__webpack_require__("./src/components/form/index.ts"),types=__webpack_require__("./src/types/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var MODAL_ACTIONS=[{label:"Subscribe",role:types.uU.primary,onClick:function onClick(){return alert("subscribed!")}}],DefaultModalStory={name:"Default Form",render:function render(_ref){var args=_extends({},(function _objectDestructuringEmpty(obj){if(null==obj)throw new TypeError("Cannot destructure "+obj)}(_ref),_ref)),_useState2=_slicedToArray((0,react.useState)(!1),2),visible=_useState2[0],setVisible=_useState2[1],_useState4=_slicedToArray((0,react.useState)(""),2),email=_useState4[0],setEmail=_useState4[1];return(0,jsx_runtime.jsxs)(ButtonContainer.q,{children:[(0,jsx_runtime.jsx)(components_form.zx,{onClick:function onClick(){return setVisible(!0)},children:"Open Modal"}),visible&&(0,jsx_runtime.jsxs)(Modal.u,_objectSpread(_objectSpread({},args),{},{onClose:function onClose(){return setVisible(!1)},children:[(0,jsx_runtime.jsx)(typography.nv,{children:"Enter your email address to subscribe"}),(0,jsx_runtime.jsx)(Form.l0,{children:(0,jsx_runtime.jsx)(Form.Wi,{label:"Email address",children:(0,jsx_runtime.jsx)(components_form.oi,{value:email,onChange:setEmail,placeholder:"example@gmail.com"})})})]}))]})},decorators:[StorybookPlayground.e3]};const Modal_stories={component:Modal.u,title:"Containers/Modal",tags:["autodocs"],args:{onClose:void 0,title:"Subscription",size:types.$u.medium,surface:types.Tg.glass,actions:MODAL_ACTIONS,fluid:!1,showClose:!0,showCancel:!0,closeOnOverlay:!0,reduceMotion:!1},argTypes:{onClose:{control:!1},size:{control:"select"},surface:{control:"select"},elevation:{control:"select"}}};var __namedExportsOrder=["DefaultModalStory"]}}]);