import { 
	BooleanViewer, 
	GenderViewer
}
from '_components'
import React from 'react'
import {
	Label
} 
from 'reactstrap';
import moment from 'moment'

export const commons = {
    toJSONObject,
	getPropByString,
	getCurrentContainer,
	getInputType,
	indexOfItemInArray,
	clone,
	getAttributeViewer,
	getWorkingContainerName
}
function getCurrentContainer(){
	let container = localStorage.getItem('workingContainer');
	return JSON.parse(container).id;
}
/**
 * When fetched single result from remote server, this json object must be 
 * parsed like this in order to read attributes on it.
 * 
 * @param data
 * @returns JSON object
 */
function toJSONObject(data){
	const d = JSON.stringify(data);
	const datason = JSON.parse(d);
	return datason;
}
function clone(data){
	const d = JSON.stringify(data);
	const datason = JSON.parse(d);
	return datason;
}
/**
 * Resolve attribute value on object.
 * Ex: Will read 'masterAttributes.name' on 'Obj'
 * 
 * @param obj
 * @param propString
 * @returns
 */
function getPropByString (obj, propString) {
    if (!propString) return "-";

    var prop, props = propString.split('.');
    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
        prop = props[i];

        var candidate = obj[prop];
        if (candidate !== undefined) {
            obj = candidate;
        } else {
            break;
        }
    }
    return obj[props[i]];
}
/**
 * 
 * @param {*} attribute 
 */
function getInputType(attribute){
    switch(attribute.type){
        case 'string': return 'text';
        case 'bool': return 'checkbox';
        case 'email': return 'email';
        case 'tel': return 'tel';
        case 'number': return 'number';
        case 'password': return 'password';
        case 'date': return 'date';
        default: return 'text';
    }
}
function getAttributeViewer(attribute, value){
	const type = attribute.type
	if( 'gender' === type){
		return (
			<GenderViewer value={value}/>	
		) 
	}
	else if('bool' === type){
		return <React.Fragment>
			<input type='checkbox' readOnly={true} defaultChecked={value}/>
		</React.Fragment>
	}
	else if(attribute.type === 'date'){
		var dateformat = attribute.dateFormat
		const date = moment(value);
		return <React.Fragment>
			<Label className="control-value-view">{moment(date).format(dateformat)}</Label>
		</React.Fragment>
	}
	else {
		return <React.Fragment>
			<Label className="control-value-view">{String(value) === 'undefined' ? '' : String(value)}</Label>
		</React.Fragment>
	}
}
/**
 * Get the index of an item in given array.
 * Items arre compared by id
 */
function indexOfItemInArray(item, array){
	var index = -1
	var i= 0
	array.map(d => {
		if(d.id === item.id) index = i
		i++
	})
	return index
}
/**
 * Returns current orking container name.
 * 
 * @returns
 */
function getWorkingContainerName(){
	let workingContainer = JSON.parse(localStorage.getItem('workingContainer'))
	return workingContainer.name
}

