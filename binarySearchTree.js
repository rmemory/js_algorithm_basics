/* Binary Search Tree */

/* A binary tree is an ordered set of data, where each
   node has at most two children, the "left" child 
   node has a value less than the parent 
   value, and the "right" child node has a value 
   greater than the parent value.

   Stated differently, the values in each left subtree 
   (the entire left subtree) all have values less than the
   value of the parent node. Conversely, the values in
   each right subtree all have values greater than the
   value in the parent node.

   For example if a parent node has a value of 17, this
   implies all of the values in the left subtree will 
   be less than 17 (even if there are both left and 
   right nodes in that left subtree). 
 
   Equal values are discarded because there is no use 
   in having duplicate data in the tree.

   On average, a search skips about half the tree,
   each lookup. A delete operation takes a time 
   proportional to the log of the number of items
   stored in the tree. This is better than a linear
   time to search the same data unsorted, but 
   typically slower than the same type of operation
   on a hash table. */

/* Ultimately its best to create an interface that 
   accepts a data container class which implements
   its own comparsion method, but this will do for 
   now .... it just assumes the data is always 
   numeric */
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
		// data is always numeric in this example
		this.data = data;

		/* The children: Left always is valued less
		   than the parent node, and right is always
		   valued more than the parent node */
		this.left = left;
		this.right = right;
	}
}
	
class BST {
	constructor() {
		this.root = null;
	}

	/* API to add value to tree */
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

	/* API to find minimum value in tree. This code
	   traverses down the entire left edge of the tree */
	findMin() {
		let current = this.root;
		// Go until there are no more lefts remaining
		while (current.left !== null) {
			current = current.left;
		}
		return current.data;
	}

	/* API to find the maximum value in the tree. This code
	   traverses down the entire right edge of the tree */
	findMax() {
		let current = this.root;
		// Go until there are no more rights remaining
		while (current.right !== null) {
			current = current.right;
		}
		return current.data;
	}

	/* API to find a particular value. The value is returned
	   if found and a null value if the value wasn't found in 
	   the tree. */
	find(data) {
		// Start at the top
		let current = this.root;

		/* while the value searched for doesn't match the current
		   node keep looking */
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

		// Found it (return the entire node I guess)
		return current;
	}

	/* API to determine if data is present. True if found
	   false if not */
	isPresent(data) {
		// Start at the top
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
				// node being removed has no children 
				if (node.left == null && node.right == null) {
					/* By returning null here, we are nulling
					   out the reference to it in its parent */
					return null;
				}

				// node being removed has no left child 
				if (node.left == null) {
					/* node.right will now become the new 
					   node.left in the parent of the 
					   current node (which is being removed) */
					return node.right;
				}

				// node being removed has no right child 
				if (node.right == null) {
					/* node.left will now become the new 
					   node.right in the parent of the 
					   current node (which is being removed) */
					return node.left;
				}

				/* node being removed has two children,
				   now we have to figure out who is the parent
				   Start by looking at the children of the right
				   node, and traverse down the entire left edge
				   of the right child node. The node at the bottom
				   of this traversal operation will become the new 
				   parent. Go right, then left, left, left, etc
				   until there are no more left nodes remaining
				   and move that node to becomethe parent of the
				   existing node.left and node.right (weird, but it 
				   works) */
				
				/* As just described, first go right ... */
				var tempNode = node.right;
				while (tempNode.left !== null) {
					/* Now go left until there are no more lefts */
					tempNode = tempNode.left;
				}

				/* Now replace the data of the node we are removing
				   with the one we just found */
				node.data = tempNode.data;

				/* Now fix up the node.right of the node we are 
				   removing, but we have to remove that guy we 
				   found during the right-left, left, etc. (aka, 
				   the node currently known as tempNode). This
				   might be easier with bi directional references in 
				   nodes so we could quickly go back up to tempNode's
				   parent and null out it's left pointer, but that 
				   adds more complication to the node data structure, 
				   (aka, a parent reference to each node), and that
				   adds more complication to the addNode, removeNode, 
				   methods. */
				node.right = removeNode(node.right, tempNode.data);

				/* Ok, all done. This node is all fixed up and 
				   ready to go. */
				return node;
			} else if (data < node.data) {
				// Keep moving down, following the left child
				node.left = removeNode(node.left, data);
				return node;
			} else {
				// Keep moving down, following the right child
				node.right = removeNode(node.right, data);
				return node;
			}
		}; // End of removeNode function

		// Starting at the top, remove the node
		this.root = removeNode(this.root, data);
	}

	/* API to determine if the tree is "balanced" */
	isBalanced() {
		return (this.findMinHeight() >= this.findMaxHeight() - 1)
	}

	/* The min height is the distance from the the root node 
	   to the closet node without two children. In other words,
	   this check ends when it finds a node with only one
	   or zero child nodes.
	   
	   Both right and left branches are checked */
	findMinHeight(node = this.root) {
		if (node == null) {
			return -1;
		}

		/* Recursively check the children on both sides */
		let left = this.findMinHeight(node.left);
		let right = this.findMinHeight(node.right);

		if (left < right) {
			/* Left wasn't found */
			return left + 1;
		} else {
			return right + 1;
		}
	}

	/* The max height is the distance from the the root node 
	   to the closet node without both children. In other words,
	   this check ends when it finds a node with zero child nodes.
	   
	   Both right and left branches are checked */
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

	/* Traverse the entire tree, starting at the deepest left 
	   most node and continuing to look for the left most node,
	   going right only when you have to, until there are 
	   no more nodes. 

	   This is depth first traversal */
	inOrder() {
		if (this.root == null) {
			return null;
		} else {
			var result = new Array();

			function traverseInOrder(node) {			 
				node.left && traverseInOrder(node.left);
				result.push(node.data);
				node.right && traverseInOrder(node.right);
			};
			traverseInOrder(this.root);
			return result;
		}
	}

	/* Start at the root node, go left, printing out the 
	   left nodes as you encounter them */
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

	/* Do the left most node first, looking for leaves first */
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
	
	/* Look for nodes that are on the same level */
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