"use strict";(self.webpackChunkaltrone_ui=self.webpackChunkaltrone_ui||[]).push([[323],{"./src/components/list/NavigationList/NavigationList.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{HierarchicalNavigationList:()=>HierarchicalNavigationList,SimpleNavigationList:()=>SimpleNavigationList,__namedExportsOrder:()=>__namedExportsOrder,default:()=>NavigationList_stories});var NavigationList=__webpack_require__("./src/components/list/NavigationList/index.ts"),StorybookPlayground=__webpack_require__("./src/storybook/StorybookPlayground.tsx"),react=__webpack_require__("./node_modules/react/index.js"),typography=__webpack_require__("./src/components/typography/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var MENU=[{label:"Wi-Fi",value:"wifi",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"wifi"})},{label:"Bluetooth",value:"bluetooth",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"bluetooth"})},{label:"Network",value:"network",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"public"})},{label:"VPN",value:"vpn",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"vpn_lock"})},"-",{label:"Notifications",value:"notifications",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"notifications"})},{label:"Sound",value:"sound",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"volume_up"})},{label:"Focus",value:"focus",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"nightlight_round"})},{label:"Screen Time",value:"screenTime",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"hourglass_bottom"})},"-",{label:"General",value:"general",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"settings"})},{label:"Appearance",value:"appearance",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"brightness_6"})},{label:"Accessibility",value:"a18y",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"accessibility"})},{label:"Control Centre",value:"cc",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"tune"})},{label:"Siri & Spotlight",value:"siri",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"graphic_eq"})},{label:"Privacy & Security",value:"privacy",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"fingerprint"})}],ACTION={icon:(0,jsx_runtime.jsx)(typography.JO,{i:"ads_click"}),onClick:function onClick(){return alert("Navigation List action")}},SimpleNavigationList={name:"Simple Navigation List",render:function render(_ref){var args=_extends({},(function _objectDestructuringEmpty(obj){if(null==obj)throw new TypeError("Cannot destructure "+obj)}(_ref),_ref)),_useState2=_slicedToArray((0,react.useState)(""),2),current=_useState2[0],setCurrent=_useState2[1];return(0,jsx_runtime.jsx)("div",{style:{width:300},children:(0,jsx_runtime.jsx)(NavigationList.b2,_objectSpread(_objectSpread({},args),{},{list:MENU,selected:current,onChange:function onChange(value){return setCurrent(String(value))},action:ACTION}))})},decorators:[StorybookPlayground.e3]};function HierarchicalNavigationList_typeof(obj){return HierarchicalNavigationList_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},HierarchicalNavigationList_typeof(obj)}function HierarchicalNavigationList_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function HierarchicalNavigationList_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?HierarchicalNavigationList_ownKeys(Object(source),!0).forEach((function(key){HierarchicalNavigationList_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):HierarchicalNavigationList_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function HierarchicalNavigationList_defineProperty(obj,key,value){return(key=function HierarchicalNavigationList_toPropertyKey(arg){var key=function HierarchicalNavigationList_toPrimitive(input,hint){if("object"!==HierarchicalNavigationList_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==HierarchicalNavigationList_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===HierarchicalNavigationList_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function HierarchicalNavigationList_slicedToArray(arr,i){return function HierarchicalNavigationList_arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function HierarchicalNavigationList_iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function HierarchicalNavigationList_unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return HierarchicalNavigationList_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return HierarchicalNavigationList_arrayLikeToArray(o,minLen)}(arr,i)||function HierarchicalNavigationList_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function HierarchicalNavigationList_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function HierarchicalNavigationList_extends(){return HierarchicalNavigationList_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},HierarchicalNavigationList_extends.apply(this,arguments)}var HierarchicalNavigationList_MENU=[{label:"Wi-Fi",value:"wifi",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"wifi"})},{label:"Bluetooth",value:"bluetooth",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"bluetooth"})},{label:"Network",value:"network",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"public"}),submenu:[{label:"Network settings",value:"network_settings",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"public"}),submenu:[{label:"Wireless connection",value:"wireless"},{label:"Ethernet",value:"ethernet"}]},{label:"Firewall",value:"firewall",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"public"})}]},{label:"VPN",value:"vpn",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"vpn_lock"})},"-",{label:"Notifications",value:"notifications",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"notifications"})},{label:"Sound",value:"sound",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"volume_up"})},{label:"Focus",value:"focus",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"nightlight_round"})},{label:"Screen Time",value:"screenTime",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"hourglass_bottom"})},"-",{label:"General",value:"general",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"settings"})},{label:"Appearance",value:"appearance",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"brightness_6"})},{label:"Accessibility",value:"a18y",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"accessibility"})},{label:"Control Centre",value:"cc",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"tune"})},{label:"Siri & Spotlight",value:"siri",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"graphic_eq"})},{label:"Privacy & Security",value:"privacy",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"fingerprint"})}],HierarchicalNavigationList_ACTION={icon:(0,jsx_runtime.jsx)(typography.JO,{i:"ads_click"}),onClick:function onClick(){return alert("Navigation List action")}},HierarchicalNavigationList={name:"Simple Navigation List",render:function render(_ref){var args=HierarchicalNavigationList_extends({},(function HierarchicalNavigationList_objectDestructuringEmpty(obj){if(null==obj)throw new TypeError("Cannot destructure "+obj)}(_ref),_ref)),_useState2=HierarchicalNavigationList_slicedToArray((0,react.useState)(""),2),current=_useState2[0],setCurrent=_useState2[1];return(0,jsx_runtime.jsx)("div",{style:{width:300},children:(0,jsx_runtime.jsx)(NavigationList.b2,HierarchicalNavigationList_objectSpread(HierarchicalNavigationList_objectSpread({},args),{},{list:HierarchicalNavigationList_MENU,selected:current,onChange:function onChange(value){return setCurrent(String(value))},action:HierarchicalNavigationList_ACTION}))})},decorators:[StorybookPlayground.e3]};const NavigationList_stories={component:NavigationList.b2,title:"List/NavigationList",tags:["autodocs"],args:{title:"Settings"},argTypes:{}};var __namedExportsOrder=["SimpleNavigationList","HierarchicalNavigationList"]}}]);