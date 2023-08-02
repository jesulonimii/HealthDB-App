import PropTypes from "prop-types";


export const functions = PropTypes.func;
export const string = PropTypes.string;
export const boolean = PropTypes.bool;
export const number = PropTypes.number;
export const object = PropTypes.object;
export const array = PropTypes.array;
export const any = PropTypes.any;
export const date = PropTypes.instanceOf(Date);

export function oneOf(object) {
	return PropTypes.oneOf(object);
}

export function arrayOf(array) {
	return PropTypes.arrayOf(PropTypes.shape(array));
}


//=>required

export const required = {
	functions : PropTypes.func.isRequired,
	string : PropTypes.string.isRequired,
	boolean : PropTypes.bool.isRequired,
	number : PropTypes.number.isRequired,
	object : PropTypes.object.isRequired,
	array : PropTypes.array.isRequired,
	any : PropTypes.any.isRequired,
	date : PropTypes.instanceOf(Date).isRequired,
	oneOf(array) {
		return PropTypes.oneOf(array).isRequired;
	},
	arrayOf(array) {
		return PropTypes.arrayOf(PropTypes.shape(array));
	}
}


