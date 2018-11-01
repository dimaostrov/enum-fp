
import EnumTag from './EnumTag';

// TODO: Sanitize name to alphanumeric value
// ConstructorDescription :: Object -> ConstructorDescription
export const ConstructorDescription = ({ name, props }) => ({ name, props });

// reduceTypeConstructors :: (EnumType, Array ConstructorDescription) -> Object EnumAction
export const reduceTypeConstructors = (Type, subTypes) =>
    subTypes.reduce((obj, subtype) => ({
        ...obj,
        [subtype.name]: EnumTag(subtype.name, Type, subtype.props),
    }), {});

// error :: String -> ()
export const error = msg => { throw new Error(msg); };

// prop :: Array -> Object
export const prop = path => obj =>
    path.reduce((o, key) => ({ ...o, [key]: o[key] }), obj);

export const isArray = arr =>
    Object.prototype.toString.call(arr) === '[object Array]';
