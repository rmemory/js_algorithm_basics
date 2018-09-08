/* Stacks */

// https://jsconsole.com/

//https://youtu.be/t2CEgPsws3U?t=544

// Step 1: Implement using regular array operations
let letters = [];

const word = "racecar";

let rword = "";

// Put the letters onto the stack
for (let i = 0; i < word.length; i++) {
	letters.push(word[i]);
}

// Pop the letters off of the stack
for (let i = 0; i < word.length; i++) {
	rword += letters.pop();
}

if (rword === word) {
	console.log(`${word} is a palindrome`);
} else {
	console.log(`${word} is not a palindrome`);
}

// Step 2: Create our own custom stack implementation
var MyStack = function() {
	this.count = 0;
	this.storage = {};
  
	// Adds a value onto the end of the stack
	this.push = function(value) {
		this.storage[this.count] = value;
		this.count++;
	}
	
	// Removes and returns the value at the end of the stack
	this.pop = function() {
		if (this.count === 0) {
			return undefined;
		}

		this.count--;
		var result = this.storage[this.count];
		delete this.storage[this.count];
		return result;
	}
	
	this.size = function() {
		return this.count;
	}
	
	// Returns the value at the end of the stack
	this.peek = function() {
		return this.storage[this.count-1];
	}
}

var myStack = new MyStack();

myStack.push(1);
myStack.push(2);
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());
myStack.push("some string");
console.log(myStack.size());
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());