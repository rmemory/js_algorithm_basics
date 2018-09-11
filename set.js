/* Sets */

function mySet() {
	// the var collection will hold the set
	let collection = [];

	// check for the presence of an element and 
	// return true or false
	this.has = function(element) {
		return (collection.indexOf(element) !== -1);
	};

	// Return all the values in the set
	this.values = function() {
		return collection;
	};

	// Add an element to the set
	this.add = function(element) {
		// check to see if element already exists
		if(!this.has(element)){
			collection.push(element);
			return true;
		}
		return false;
	};

	// Remove an element from a set
	// This is delete in ES6 set
	this.remove = function(element) {
		if(this.has(element)){
			index = collection.indexOf(element);
			// Take out one element (the element)
			collection.splice(index,1);
			return true;
		}
		return false;
	};

	// Return the size of the collection
	// This is a property in ES6
	this.size = function() {
		return collection.length;
	};

	// Return the union of two sets, meaning
	// combine this set with another set, 
	// removing duplicates along the way

	// Not present in ES6 implementation
	this.union = function(otherSet) {
		const unionSet = new mySet();
		const firstSet = this.values();
		const secondSet = otherSet.values();

		// Recall that add already checks to see if
		// element already exists
		firstSet.forEach(function(e){
			unionSet.add(e);
		});

		secondSet.forEach(function(e){
			unionSet.add(e);
		});

		return unionSet;
	};
	
	// Return the intersection of two sets as a new set
	// Find the elements that exist in both this set
	// and otherset, and return them in a new set

	// Not present in ES6 implementation
	this.intersection = function(otherSet) {
		const intersectionSet = new mySet();
		const firstSet = this.values();

		firstSet.forEach(function(e){
			if(otherSet.has(e)){
				intersectionSet.add(e);
			}
		});

		return intersectionSet;
	};

	// Return the difference of two sets as a new set
	// Not present in ES6 implementation
	this.difference = function(otherSet) {
		const differenceSet = new mySet();
		const firstSet = this.values();

		firstSet.forEach(function(e){
			if(!otherSet.has(e)){
				differenceSet.add(e);
			}
		});

		return differenceSet;
	};
	
	// Test if the set is a subset of a different set
	// Not present in ES6 implementation
	this.subset = function(otherSet) {
		const firstSet = this.values();
		
		return firstSet.every(function(value) {
			return otherSet.has(value);
		});
	};
}

var setA = new mySet();  
var setB = new mySet();  
setA.add("a");  
setB.add("b");  
setB.add("c");  
setB.add("a");  
setB.add("d");  
console.log(setA.subset(setB));
console.log(setA.intersection(setB).values());
console.log(setB.difference(setA).values());

var setC = new Set();  
var setD = new Set();  
setC.add("a");  
setD.add("b");  
setD.add("c");  
setD.add("a");  
setD.add("d");  
console.log(setD.values())
setD.delete("a");
console.log(setD.has("a"));
console.log(setD.add("d"));
