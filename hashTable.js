​/* Hash Table */

const hash = (string, max) => {
	let hash = 0;
	
	for (let i = 0; i < string.length; i++) {
		hash += string.charCodeAt(i);
	}
	return hash % max;
};

let HashTable = function() {
	const storage = [];
	const storageLimit = 14;
	
	this.print = function() {
		console.log(storage)
	}

	this.add = function(key, value) {
		const index = hash(key, storageLimit);

		if (storage[index] === undefined) {
			storage[index] = [
				[key, value]
			];
		} else {
			/* Multiple keys sharing same index */
			let inserted = false;

			for (let i = 0; i < storage[index].length; i++) {
				/* Key already exists, replace value */
				if (storage[index][i][0] === key) {
					storage[index][i][1] = value;
					inserted = true;
				}
			}
			/* Key didn't already exist, create a new entry */
			if (inserted === false) {
				storage[index].push([key, value]);
			}
		}
	};

	this.remove = function(key) {
		const index = hash(key, storageLimit);
		
		/* Provide a special case which assumes we don't have a situation
		   where we have many keys using the same hash */
		if (storage[index].length === 1 && storage[index][0][0] === key) {
			delete storage[index];
		} else {
			for (let i = 0; i < storage[index].length; i++) {
				if (storage[index][i][0] === key) {
					delete storage[index][i];
				}
			}
		}
	};

	this.lookup = function(key) {
		const index = hash(key, storageLimit);
		
		if (storage[index] === undefined) {
			return undefined;
		} else {
			for (let i = 0; i < storage[index].length; i++) {
				if (storage[index][i][0] === key) {
					return storage[index][i][1];
				}
			}
		}
	};
};

console.log(hash('quincy', 10))

let ht = new HashTable();
ht.add('beau', 'person');
ht.add('fido', 'dog');
ht.add('rex', 'dinosour');
ht.add('tux', 'penguin')
console.log(ht.lookup('tux'))
ht.print();