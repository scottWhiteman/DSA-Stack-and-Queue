const _Node = require("./Node");

class Stack {
    constructor() {
        this.top = null;
    }
    push(item) {
        if (this.top === null) {
            this.top = new _Node(item, null);
            return this.top;
        }
        const node = new _Node(item, this.top);
        this.top = node;
    }
    pop() {
        const node = this.top;
        this.top = node.next;
        return node.data;
    }
    popQueue() {
        const temp = new Stack;
        while (this.top !== null) {
            temp.push(this.pop());
        }
        let returnedNode = temp.pop();
        while (temp.top !== null) {
            this.push(temp.pop());
        }
        return returnedNode;
    }
}

module.exports = Stack;