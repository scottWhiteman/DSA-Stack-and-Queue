const _Node = require("./Node");
const _DNode = require("./DNode");

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }
    enqueue(item) {
        const node = new _DNode(item, null, this.last);
        if (this.first === null) {
            this.first = node;
        }
        if (this.last) {
            this.last.next = node;
        }
        this.last = node;
    }
    dequeue() {
        if (this.first === null) {
            return;
        }
        const node = this.first;
        this.first = this.first.next;

        if (node === this.last) {
            this.last = null;
        }
        if (node.next) {
            node.prev = null;
        }
        return node.data;
    }
    peek() {
        return this.first.data;
    }
    isEmpty() {
        return this.first ? false : true;
    }
}

module.exports = Queue