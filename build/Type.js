"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.validateArgs=exports.isOfType=exports.validateRecord=exports.values=void 0;var _utils=require("./utils");function _toArray(arr){return _arrayWithHoles(arr)||_iterableToArray(arr)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==="function"){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))}ownKeys.forEach(function(key){_defineProperty(target,key,source[key])})}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}// Tiny ArgLessEnum to bypass the circular dependency shithole
var ArgLessEnum=(0,_utils.createEnumConstructor)({createConstructor:function createConstructor(Type,constr){return function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _objectSpread({},constr,{args:args})}}});var values=function values(obj){return Object.keys(obj).sort().map(function(k){return obj[k]})};// type Type = Type|String;
// Cant use Type to define Type so ArgLessEnum
exports.values=values;var Type=ArgLessEnum(["Any","String","Number","Bool","List","Map","Record","Func","Enum","OneOf"]);// validateList :: (Type, [a]) -> Boolean
var validateList=function validateList(innerType,list){return(0,_utils.isList)(list)&&(innerType&&list.length>0?list.length===_toConsumableArray(list).filter(isOfType(innerType)).length:true)};// validateRecord :: Object Type -> Object a -> Boolean
var validateRecord=function validateRecord(shape,obj){return validateArgs(values(shape),values(obj))};// isOfType :: Type -> a -> Boolean
exports.validateRecord=validateRecord;var isOfType=function isOfType(type){return function(value){// Dynamic argument description
if(typeof type==="string"&&value!==undefined)return true;if(Type.isConstructor(type)){return!!Type.match(type,{Any:function Any(){return true},String:function String(){return typeof value==="string"},Number:function Number(){return typeof value==="number"},Bool:function Bool(){return typeof value==="boolean"},Func:function Func(){return typeof value==="function"},List:function List(innerType){return validateList(innerType,value)},Map:function Map(innerType){return innerType&&(0,_utils.isObject)(value)&&validateList(innerType,values(value))},Record:function Record(shape){return(0,_utils.isObject)(value)&&(shape?validateRecord(shape,value):true)},OneOf:function OneOf(typeList){return!!_toConsumableArray(typeList).filter(function(type){return isOfType(type)(value)}).length},Enum:function Enum(InnerType){return value&&InnerType.isConstructor(value)}})}return false}};// validateArgs :: ([Type], [a]) -> Bool
exports.isOfType=isOfType;var validateArgs=function validateArgs(typeList,valueList){if(typeList.length!==valueList.length)return false;var _typeList=_toArray(typeList),type=_typeList[0],types=_typeList.slice(1);var _valueList=_toArray(valueList),val=_valueList[0],vals=_valueList.slice(1);if(!isOfType(type)(val))return false;return types.length>0?validateArgs(types,vals):true};exports.validateArgs=validateArgs;var _default=Type;exports.default=_default;