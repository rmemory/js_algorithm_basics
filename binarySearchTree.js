/* Binary Search Tree */

/* A binary tree is an ordered set of data, where each
   node has at most two children, the "left" child 
   node has a value less than the parent 
   value, and the "right" child node has a value 
   greater than the parent value. Equal values are 
   discarded because there is no use in having 
   duplicate data.

   On average, a search skips about half the tree,
   each lookup, delete operation takes a time 
   proportional to the log of the number of items
   stored in the tree. This is better than a linear
   time to search the same data unsorted, but 
   typically slower than the same type of operation
   on a hash table. */

const numericComparison = (data1, data2) => {
	if (data1 < data2) {
		return -1;
	} 
	else if (data1 > data2) {
		return 1;
	} else {
		return 0;
	}
}

/* Binary Search Tree */

class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}
	
class BST {
	constructor() {
		this.root = null;
	}

	// API to add value to tree
	add(data) {
		const node = this.root;

		if (node === null) {
			this.root = new Node(data);
			return;
		} else {
			/* This function will be called recursively.
				Here is the definition of the function
				see below where it is initially called */
			const searchTree = function(node) {
				if (numericComparison(data, node.data) < 0) {
					if (node.left === null) {
						node.left = new Node(data);
						// Drop to return
					} else { //node.left !== null
						// Continue moving down the tree
						return searchTree(node.left);
					}
				} else if (numericComparison(data, node.data) > 0) {
					if (node.right === null) {
						node.right = new Node(data);
						// Drop to return
					} else { //node.right !== null
						// Continue moving down the tree
						return searchTree(node.right);
					}
				}

				return; // Note there is no value to return in any situation
			}; // End of searchTree function

			// Recursively find a location to add the data
			return searchTree(node);
		}
	}

	// API to find minimum value in tree
	findMin() {
		let current = this.root;
		while (current.left !== null) {
			current = current.left;
		}
		return current.data;
	}

	// API to find the maximum value in the tree
	findMax() {
		let current = this.root;
		while (current.right !== null) {
			current = current.right;
		}
		return current.data;
	}

	// API to find a particular value
	find(data) {
		let current = this.root;
		while (numericComparison(current.data, data) != 0) {
			if (numericComparison(data, current.data) < 0) {
				current = current.left;
			} else {
				current = current.right;
			}

			// We ran out of nodes and no data found
			if (current === null) {
				return null;
			}
		}
		return current;
	}

	// API to determine if data is present
	isPresent(data) {
		let current = this.root;
		while (current) {
			if (numericComparison(data, current.data) === 0) {
				// Found it
				return true;
			}

			// Continue moving down the tree
			if (numericComparison(data, current.data) < 0) {
				current = current.left;
			} else {
				current = current.right;
			}
		}

		// Didn't find it
		return false;
	}

	// API to remove data
	remove(data) {
		const removeNode = function(node, data) {
			if (node == null) {
				return null;
			}
			if (data == node.data) {
				// node has no children 
				if (node.left == null && node.right == null) {
					return null;
				}
				// node has no left child 
				if (node.left == null) {
					return node.right;
				}
				// node has no right child 
				if (node.right == null) {
					return node.left;
				}
				// node has two children 
				var tempNode = node.right;
				while (tempNode.left !== null) {
					tempNode = tempNode.left;
				}
				node.data = tempNode.data;
				node.right = removeNode(node.right, tempNode.data);
				return node;
			} else if (data < node.data) {
				node.left = removeNode(node.left, data);
				return node;
			} else {
				node.right = removeNode(node.right, data);
				return node;
			}
		}; // End of removeNode function

		this.root = removeNode(this.root, data);
	}

	isBalanced() {
		return (this.findMinHeight() >= this.findMaxHeight() - 1)
	}

	findMinHeight(node = this.root) {
		if (node == null) {
			return -1;
		}
		let left = this.findMinHeight(node.left);
		let right = this.findMinHeight(node.right);
		if (left < right) {
			return left + 1;
		} else {
			return right + 1;
		}
	}

	findMaxHeight(node = this.root) {
		if (node == null) {
			return -1;
		}
		let left = this.findMaxHeight(node.left);
		let right = this.findMaxHeight(node.right);
		if (left > right) {
			return left + 1;
		} else {
			return right + 1;
		}
	}

	inOrder() {
		if (this.root == null) {
			return null;
		} else {
			var result = new Array();
			function traverseInOrder(node) {			 
				node.left && traverseInOrder(node.left);
				result.push(node.data);
				node.right && traverseInOrder(node.right);
			}
			traverseInOrder(this.root);
			return result;
		}
	}

	preOrder() {
		if (this.root == null) {
			return null;
		} else {
			var result = new Array();
			function traversePreOrder(node) {
				result.push(node.data);
				node.left && traversePreOrder(node.left);
				node.right && traversePreOrder(node.right);
			};

			traversePreOrder(this.root);
			return result;
		}
	};

	postOrder() {
		if (this.root == null) {
			return null;
		} else {
			var result = new Array();
			function traversePostOrder(node) {
				node.left && traversePostOrder(node.left);
				node.right && traversePostOrder(node.right);
				result.push(node.data);
			};
			traversePostOrder(this.root);
			return result;
		}
	};
	
	levelOrder() {
		let result = [];
		let Q = []; 
		if (this.root != null) {
			Q.push(this.root);
			while(Q.length > 0) {
				let node = Q.shift();
				result.push(node.data);
				if (node.left != null) {
					Q.push(node.left);
				};
				if (node.right != null) {
					Q.push(node.right);
				};
			};
			return result;
		} else {
			return null;
		};
	};
}
	
	const 
	
	var bst = new BST();
	
	bst.add(9);
	bst.add(4);
	bst.add(17);
	bst.add(3);
	bst.add(6);
	bst.add(22);
	bst.add(5);
	bst.add(7);
	bst.add(20);
	
	console.log(bst.findMinHeight());
	console.log(bst.findMaxHeight());
	console.log(bst.isBalanced());
	bst.add(10);
	console.log(bst.findMinHeight());
	console.log(bst.findMaxHeight());
	console.log(bst.isBalanced());
	console.log('inOrder: ' + bst.inOrder());
	console.log('preOrder: ' + bst.preOrder());
	console.log('postOrder: ' + bst.postOrder());
	
	console.log('levelOrder: ' + bst.levelOrder());