/* Queues */

/* First in, first out */

/* Queues */

function Queue () { 
	var collection = [];

	this.print = function() {
		console.log(collection);
	};

	/* Push item onto queue (at the end) */
	this.enqueue = function(element) {
		collection.push(element);
	};

	/* Get item from queue, from at the beginning 
	  of the array. This returns and removes
	  item from array */
	this.dequeue = function() {
		return collection.shift(); 
	};

	/* Get the item next in line to be dequeued */
	this.front = function() {
		return collection[0];
	};

	/* Return size of queue */
	this.size = function() {
		return collection.length; 
	};

	/* Determine if there are any entries in queue */
	this.isEmpty = function() {
		return (collection.length === 0); 
	};
}

const q = new Queue(); 
q.enqueue('a'); 
q.enqueue('b');
q.enqueue('c');
q.print();
q.dequeue();
console.log(q.front());
q.print();

/* Items with a higher priority are sent to the 
   beginning of the queue */
function PriorityQueue () {
	/* Array of arrays. The format of each entry is:
	   [Some data item, numeric priority] */
	var collection = [];

	this.printCollection = function() {
		(console.table(collection));
	};

	this.enqueue = function(element){
		if (this.isEmpty()){ 
			collection.push(element);
		} else {
			var added = false;
			for (var i = 0; i < collection.length; i++){
				 if (element[1] < collection[i][1]){ //checking priorities
					collection.splice(i,0,element);
					added = true;
					break;
				}
			}
			if (!added){
				collection.push(element);
			}
		}
	};

	this.dequeue = function() {
		var value = collection.shift();

		/* We don't return the priority */
		return value[0];
	};

	this.front = function() {
		return collection[0];
	};

	this.size = function() {
		return collection.length; 
	};

	this.isEmpty = function() {
		return (collection.length === 0); 
	};
}

const pq = new PriorityQueue(); 
pq.enqueue(['Beau Carnes', 2]); 
pq.enqueue(['Quincy Larson', 3]);
pq.enqueue(['Ewa Mitulska-Wójcik', 1])
pq.enqueue(['Briana Swift', 2])
pq.printCollection();
console.log(pq.dequeue());
console.log(pq.front());
pq.printCollection();
