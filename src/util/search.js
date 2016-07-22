'use babel';
'use strict';

export default function search(items, searchString, options) {
	if(!items || items.length === 0) return [];
	if(!searchString) return items;
	if(!options) options = {};
	if(typeof options.property === 'undefined') options.property = 'name';
	if(typeof options.searchExact === 'undefined') options.searchExact = true;

	// Find all items that match the search string
	const lowercaseSearch = searchString.toLowerCase();
	let matchedItems;
	if(options.useStartsWith && searchString.length === 1) {
		matchedItems = items.filter(element => (options.property ? element[options.property] : element.toString()).normalize('NFKD').toLowerCase().startsWith(lowercaseSearch));
	} else {
		matchedItems = items.filter(element => (options.property ? element[options.property] : element.toString()).normalize('NFKD').toLowerCase().includes(lowercaseSearch));
	}

	// See if any are an exact match
	if(options.searchExact && matchedItems.length > 1) {
		const exactItems = matchedItems.filter(element => (options.property ? element[options.property] : element.toString()).normalize('NFKD').toLowerCase() === lowercaseSearch);
		if(exactItems.length > 0) return exactItems;
	}

	return matchedItems;
}
