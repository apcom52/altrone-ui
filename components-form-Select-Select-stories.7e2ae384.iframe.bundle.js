"use strict";(self.webpackChunkaltrone_ui=self.webpackChunkaltrone_ui||[]).push([[2507],{"./src/components/form/Select/Select.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultSelect:()=>DefaultSelect,SelectWithCustomOptions:()=>SelectWithCustomOptions,SelectWithParents:()=>SelectWithParents,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Select_stories});var Select=__webpack_require__("./src/components/form/Select/index.ts"),react=__webpack_require__("./node_modules/react/index.js"),StorybookPlayground=__webpack_require__("./src/storybook/StorybookPlayground.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var DATA=[{label:"The United Kingdom",value:"uk"},{label:"The United States of America",value:"use"},{label:"Spain",value:"spain"},{label:"France",value:"france"},{label:"Turkey",value:"turkey"},{label:"Russia",value:"russia"},{label:"Japan",value:"japan"},{label:"China",value:"china"},{label:"Brazil",value:"brazil"},{label:"Germany",value:"germany"}],DefaultSelect={name:"Default Select",render:function render(_ref){var args=_extends({},(function _objectDestructuringEmpty(obj){if(null==obj)throw new TypeError("Cannot destructure "+obj)}(_ref),_ref)),_useState2=_slicedToArray((0,react.useState)(args.value),2),value=_useState2[0],setValue=_useState2[1];return(0,react.useEffect)((function(){setValue(args.value)}),[args.value]),(0,jsx_runtime.jsx)(StorybookPlayground.pF,{children:(0,jsx_runtime.jsx)(Select.P,_objectSpread(_objectSpread({},args),{},{value,onChange:setValue,options:DATA}))})}};function SelectWithParents_typeof(o){return SelectWithParents_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},SelectWithParents_typeof(o)}function SelectWithParents_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function SelectWithParents_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?SelectWithParents_ownKeys(Object(t),!0).forEach((function(r){SelectWithParents_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):SelectWithParents_ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function SelectWithParents_defineProperty(obj,key,value){return(key=function SelectWithParents_toPropertyKey(arg){var key=function SelectWithParents_toPrimitive(input,hint){if("object"!==SelectWithParents_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==SelectWithParents_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===SelectWithParents_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function SelectWithParents_slicedToArray(arr,i){return function SelectWithParents_arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function SelectWithParents_iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||function SelectWithParents_unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return SelectWithParents_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return SelectWithParents_arrayLikeToArray(o,minLen)}(arr,i)||function SelectWithParents_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function SelectWithParents_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function SelectWithParents_extends(){return SelectWithParents_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},SelectWithParents_extends.apply(this,arguments)}var SelectWithParents_DATA=[{label:"The United Kingdom",value:"uk",parent:"nato"},{label:"The United States of America",value:"use",parent:"nato"},{label:"Spain",value:"spain",parent:"eu",disabled:!0},{label:"France",parent:"eu",value:"france"},{label:"Turkey",parent:"nato",value:"turkey"},{label:"Russia",value:"russia"},{label:"Japan",parent:"nato",value:"japan"},{label:"China",value:"china"},{label:"Brazil",value:"brazil"},{label:"Germany",parent:"eu",value:"germany"}],PARENTS=[{label:"European Union",value:"eu",disabled:!0},{label:"NATO",value:"nato"}],SelectWithParents={name:"Default Select",render:function render(_ref){var args=SelectWithParents_extends({},(function SelectWithParents_objectDestructuringEmpty(obj){if(null==obj)throw new TypeError("Cannot destructure "+obj)}(_ref),_ref)),_useState2=SelectWithParents_slicedToArray((0,react.useState)(args.value),2),value=_useState2[0],setValue=_useState2[1];return(0,react.useEffect)((function(){setValue(args.value)}),[args.value]),(0,jsx_runtime.jsx)(StorybookPlayground.pF,{children:(0,jsx_runtime.jsx)(Select.P,SelectWithParents_objectSpread(SelectWithParents_objectSpread({},args),{},{value,onChange:setValue,options:SelectWithParents_DATA,parents:PARENTS}))})}},clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js");function SelectWithCustomOptions_typeof(o){return SelectWithCustomOptions_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},SelectWithCustomOptions_typeof(o)}function SelectWithCustomOptions_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function SelectWithCustomOptions_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?SelectWithCustomOptions_ownKeys(Object(t),!0).forEach((function(r){SelectWithCustomOptions_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):SelectWithCustomOptions_ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function SelectWithCustomOptions_defineProperty(obj,key,value){return(key=function SelectWithCustomOptions_toPropertyKey(arg){var key=function SelectWithCustomOptions_toPrimitive(input,hint){if("object"!==SelectWithCustomOptions_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==SelectWithCustomOptions_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===SelectWithCustomOptions_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function SelectWithCustomOptions_slicedToArray(arr,i){return function SelectWithCustomOptions_arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function SelectWithCustomOptions_iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||function SelectWithCustomOptions_unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return SelectWithCustomOptions_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return SelectWithCustomOptions_arrayLikeToArray(o,minLen)}(arr,i)||function SelectWithCustomOptions_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function SelectWithCustomOptions_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function SelectWithCustomOptions_extends(){return SelectWithCustomOptions_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},SelectWithCustomOptions_extends.apply(this,arguments)}var SelectWithCustomOptions_DATA=[{label:"The United Kingdom",value:"🇬🇧",parent:"nato"},{label:"The United States of America",value:"🇺🇸",parent:"nato"},{label:"Spain",value:"🇪🇸",parent:"eu",disabled:!0},{label:"France",parent:"eu",value:"🇫🇷"},{label:"Turkey",parent:"nato",value:"🇹🇷"},{label:"Russia",value:"🇷🇺"},{label:"Japan",parent:"nato",value:"🇯🇵"},{label:"China",value:"🇨🇳"},{label:"Brazil",value:"🇧🇷"},{label:"Germany",parent:"eu",value:"🇩🇪"}],CustomSelectItem=function CustomSelectItem(_ref){var label=_ref.label,value=_ref.value,onSelect=_ref.onSelect,inSelectHeader=_ref.inSelectHeader,selected=_ref.selected,ComponentName=inSelectHeader?"div":"button";return(0,jsx_runtime.jsx)(ComponentName,{className:(0,clsx_m.default)("alt-select-option",{"alt-select-option--selected":selected}),onClick:function onClick(){return onSelect(value)},children:(0,jsx_runtime.jsxs)("div",{className:"alt-select-option__label",children:[String(value)," ",label]})})};CustomSelectItem.displayName="CustomSelectItem";var SelectWithCustomOptions={name:"Default Select",render:function render(_ref2){var args=SelectWithCustomOptions_extends({},(function SelectWithCustomOptions_objectDestructuringEmpty(obj){if(null==obj)throw new TypeError("Cannot destructure "+obj)}(_ref2),_ref2)),_useState2=SelectWithCustomOptions_slicedToArray((0,react.useState)(args.value),2),value=_useState2[0],setValue=_useState2[1];return(0,react.useEffect)((function(){setValue(args.value)}),[args.value]),(0,jsx_runtime.jsx)(StorybookPlayground.pF,{children:(0,jsx_runtime.jsx)(Select.P,SelectWithCustomOptions_objectSpread(SelectWithCustomOptions_objectSpread({},args),{},{value,onChange:setValue,options:SelectWithCustomOptions_DATA,ItemComponent:CustomSelectItem}))})}};const Select_stories={component:Select.P,title:"Forms/Select",tags:["autodocs"],args:{value:void 0,searchable:!1,clearable:!1},argTypes:{value:{control:"text",description:"Selected option"},options:{control:!1,description:"List of the options"},onChange:{control:!1,description:"Callback is called when user selects an option"},parents:{description:"List of groups of the options"},searchable:{description:"If true user can search throughout the list of options. "},clearable:{description:"If true user can select undefined option."},searchFunc:{description:"Custom search function (when searchable is true)"},ItemComponent:{control:!1,description:"Custom Select option component"},size:{control:"select",description:"Size of the Select"},surface:{control:"select",description:"Surface of the Select"},elevation:{control:"select",description:"Elevation of the Select"},errorText:{description:"Error text"},hintText:{description:"Hint text"},classNames:{description:"Custom CSS class"}}};var __namedExportsOrder=["DefaultSelect","SelectWithParents","SelectWithCustomOptions"]}}]);