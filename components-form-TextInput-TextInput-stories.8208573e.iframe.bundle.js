"use strict";(self.webpackChunkaltrone_ui=self.webpackChunkaltrone_ui||[]).push([[25],{"./src/components/form/TextInput/TextInput.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BothIslands:()=>stories_BothIslands,Default:()=>DefaultTextInput,LeftTextIsland:()=>stories_LeftIslandWithText,LiveSuggestions:()=>stories_TextInputLiveSuggestions,RightIconIsland:()=>stories_RightIslandWithIcon,Suggestions:()=>stories_TextInputSuggestions,__namedExportsOrder:()=>__namedExportsOrder,default:()=>TextInput_stories});var TextInput=__webpack_require__("./src/components/form/TextInput/index.ts"),react=__webpack_require__("./node_modules/react/index.js"),StorybookPlayground=__webpack_require__("./src/storybook/StorybookPlayground.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}var _excluded=["placeholder","value","onChange"];function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}var DefaultTextInputStory=function DefaultTextInputStory(_ref){var _ref$placeholder=_ref.placeholder,placeholder=void 0===_ref$placeholder?"":_ref$placeholder,args=(_ref.value,_ref.onChange,_objectWithoutProperties(_ref,_excluded)),_useState2=_slicedToArray((0,react.useState)(""),2),_value=_useState2[0],setValue=_useState2[1];return(0,jsx_runtime.jsx)(StorybookPlayground.pF,{children:(0,jsx_runtime.jsx)(TextInput.oi,_objectSpread({value:_value,onChange:setValue,placeholder},args))})};DefaultTextInputStory.displayName="DefaultTextInputStory",DefaultTextInputStory.args={placeholder:"",loading:!1};const DefaultTextInput=DefaultTextInputStory;function LeftIslandWithText_slicedToArray(arr,i){return function LeftIslandWithText_arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function LeftIslandWithText_iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function LeftIslandWithText_unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return LeftIslandWithText_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return LeftIslandWithText_arrayLikeToArray(o,minLen)}(arr,i)||function LeftIslandWithText_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function LeftIslandWithText_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var LeftIslandWithText=function LeftIslandWithText(){var _useState2=LeftIslandWithText_slicedToArray((0,react.useState)(""),2),value=_useState2[0],setValue=_useState2[1];return(0,jsx_runtime.jsx)(StorybookPlayground.pF,{children:(0,jsx_runtime.jsx)(TextInput.oi,{value,onChange:setValue,prefix:"$"})})};LeftIslandWithText.displayName="LeftIslandWithText";const stories_LeftIslandWithText=LeftIslandWithText;var typography=__webpack_require__("./src/components/typography/index.ts");function RightIslandWithIcon_typeof(obj){return RightIslandWithIcon_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},RightIslandWithIcon_typeof(obj)}var RightIslandWithIcon_excluded=["value","onChange"];function RightIslandWithIcon_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function RightIslandWithIcon_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?RightIslandWithIcon_ownKeys(Object(source),!0).forEach((function(key){RightIslandWithIcon_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):RightIslandWithIcon_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function RightIslandWithIcon_defineProperty(obj,key,value){return(key=function RightIslandWithIcon_toPropertyKey(arg){var key=function RightIslandWithIcon_toPrimitive(input,hint){if("object"!==RightIslandWithIcon_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==RightIslandWithIcon_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===RightIslandWithIcon_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function RightIslandWithIcon_slicedToArray(arr,i){return function RightIslandWithIcon_arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function RightIslandWithIcon_iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function RightIslandWithIcon_unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return RightIslandWithIcon_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return RightIslandWithIcon_arrayLikeToArray(o,minLen)}(arr,i)||function RightIslandWithIcon_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function RightIslandWithIcon_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function RightIslandWithIcon_objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function RightIslandWithIcon_objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}var RightIslandWithIcon=function RightIslandWithIcon(_ref){_ref.value,_ref.onChange;var args=RightIslandWithIcon_objectWithoutProperties(_ref,RightIslandWithIcon_excluded),_useState2=RightIslandWithIcon_slicedToArray((0,react.useState)(""),2),_value=_useState2[0],setValue=_useState2[1];return(0,jsx_runtime.jsx)(StorybookPlayground.pF,{children:(0,jsx_runtime.jsx)(TextInput.oi,RightIslandWithIcon_objectSpread({value:_value,onChange:setValue,rightIcon:(0,jsx_runtime.jsx)(typography.JO,{i:"search"})},args))})};RightIslandWithIcon.displayName="RightIslandWithIcon",RightIslandWithIcon.args={loading:!1};const stories_RightIslandWithIcon=RightIslandWithIcon;function BothIslands_slicedToArray(arr,i){return function BothIslands_arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function BothIslands_iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function BothIslands_unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return BothIslands_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return BothIslands_arrayLikeToArray(o,minLen)}(arr,i)||function BothIslands_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function BothIslands_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var BothIslands=function BothIslands(){var _useState2=BothIslands_slicedToArray((0,react.useState)(""),2),value=_useState2[0],setValue=_useState2[1];return(0,jsx_runtime.jsx)(StorybookPlayground.pF,{children:(0,jsx_runtime.jsx)(TextInput.oi,{value,onChange:setValue,leftIsland:{type:TextInput._8.components,content:(0,jsx_runtime.jsx)("b",{children:"q>:"})},rightIsland:{type:TextInput._8.actions,content:[{title:"Decrease",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"keyboard_arrow_down"}),onClick:function onClick(){return alert("Decrease clicked")}},{title:"Increase",icon:(0,jsx_runtime.jsx)(typography.JO,{i:"keyboard_arrow_up"}),onClick:function onClick(){return alert("Increase clicked")}}]}})})};BothIslands.displayName="BothIslands";const stories_BothIslands=BothIslands;var data=__webpack_require__("./src/components/data/DataTable/stories/data.ts");function TextInputSuggestions_slicedToArray(arr,i){return function TextInputSuggestions_arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function TextInputSuggestions_iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function TextInputSuggestions_unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return TextInputSuggestions_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return TextInputSuggestions_arrayLikeToArray(o,minLen)}(arr,i)||function TextInputSuggestions_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function TextInputSuggestions_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var SUGGESTIONS=data.Z.map((function(country){return country.name})),TextInputSuggestions=function TextInputSuggestions(_ref){var _ref$placeholder=_ref.placeholder,placeholder=void 0===_ref$placeholder?"":_ref$placeholder,_useState2=TextInputSuggestions_slicedToArray((0,react.useState)(""),2),value=_useState2[0],setValue=_useState2[1];return(0,jsx_runtime.jsx)(StorybookPlayground.pF,{children:(0,jsx_runtime.jsx)(TextInput.oi,{value,onChange:setValue,placeholder,suggestions:SUGGESTIONS})})};TextInputSuggestions.displayName="TextInputSuggestions",TextInputSuggestions.args={placeholder:""};const stories_TextInputSuggestions=TextInputSuggestions;function TextInputLiveSuggestions_slicedToArray(arr,i){return function TextInputLiveSuggestions_arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function TextInputLiveSuggestions_iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function TextInputLiveSuggestions_unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return TextInputLiveSuggestions_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return TextInputLiveSuggestions_arrayLikeToArray(o,minLen)}(arr,i)||function TextInputLiveSuggestions_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function TextInputLiveSuggestions_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var TextInputLiveSuggestions_SUGGESTIONS=data.Z.map((function(country){return country.name})),TextInputLiveSuggestions=function TextInputLiveSuggestions(_ref){var _ref$placeholder=_ref.placeholder,placeholder=void 0===_ref$placeholder?"":_ref$placeholder,_useState2=TextInputLiveSuggestions_slicedToArray((0,react.useState)(""),2),value=_useState2[0],setValue=_useState2[1],_useState4=TextInputLiveSuggestions_slicedToArray((0,react.useState)(!1),2),isLeftActive=_useState4[0],_useState6=(_useState4[1],TextInputLiveSuggestions_slicedToArray((0,react.useState)(!1),2)),isRightActive=_useState6[0];_useState6[1];return(0,jsx_runtime.jsx)(StorybookPlayground.pF,{children:(0,jsx_runtime.jsx)(TextInput.oi,{value,onChange:setValue,placeholder,suggestions:TextInputLiveSuggestions_SUGGESTIONS,prefix:isLeftActive?"left":void 0,suffix:isRightActive?"right":void 0,useLiveSuggestions:!0})})};TextInputLiveSuggestions.displayName="TextInputLiveSuggestions",TextInputLiveSuggestions.args={placeholder:""};const stories_TextInputLiveSuggestions=TextInputLiveSuggestions,TextInput_stories={component:TextInput.oi,title:"Forms/TextInput"};var __namedExportsOrder=["Default","LeftTextIsland","RightIconIsland","BothIslands","Suggestions","LiveSuggestions"]}}]);