const Stack = require('./Stack');
const Queue = require('./Queue');

function main() {
    const starTrek = new Stack();

    starTrek.push('Kirk');
    starTrek.push('Spock');
    starTrek.push('McCoy');
    starTrek.push('Scotty');
    console.log(peek(starTrek));
    display(starTrek);

    starTrek.pop();
    starTrek.pop();

    display(starTrek);

    const Q = new Queue();
}

//2). Stack methods
function peek(lst) {
    return lst.top ? lst.top.data : null;
}
function isEmpty(lst) {
    return lst.top ? false : true;
}
function display(lst) {
    let current = lst.top;
    while (current !== null) {
        console.log(current.data);
        current = current.next;
    }
}

//3). Palindrome
function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const palinStack = new Stack();
    let palindrome = '';
    for (let i = 0; i < s.length; i++) {
        palinStack.push(s[i]);
    }
    while(!isEmpty(palinStack)) {
        palindrome += palinStack.pop();
    }
    return palindrome === s;
}

//4). Matching Parentheses
function matchParentheses(str) {
    const pairs = new Stack();
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            pairs.push(str[i]);
        }
        else if (str[i] === ')') {
            if (peek(pairs) === '(') {
                pairs.pop();
            }
            else {
                console.log('Missing "("')
                return false;
            }
        }
    }
    if (isEmpty(pairs)) {
        console.log('success');
        return true
    }
    else {
        let missing = ''
        while (!isEmpty(pairs)) {
            missing += pairs.pop();
        }
        console.log('Must close the following: ' + missing);
        return false;
    }
}

//5). Sort Stack
function sortStack(lst) {
    const tempStack = new Stack();
    while (!isEmpty(lst)) {
        let num = lst.pop();
        //pull all numbers greater than current number
        while (!isEmpty(tempStack) && peek(tempStack) > num) {
            lst.push(tempStack.pop());
        }
        tempStack.push(num);
    }
    //Put all numbers back into stack
    while (!isEmpty(tempStack)) {
        lst.push(tempStack.pop());
    }
}
// Test Sort stack function
function sortTest() {
    const toSort = new Stack();
    toSort.push(5);
    toSort.push(1);
    toSort.push(12);
    toSort.push(4);
    toSort.push(45);
    toSort.push(8);
    display(toSort);
    sortStack(toSort);
    display(toSort);
}

//6). and 7).
//Double queue should also work since the structure is similar
function queueTest() {
    const starTrekQ = new Queue();
    starTrekQ.enqueue('Kirk');
    starTrekQ.enqueue('Spock');
    starTrekQ.enqueue('Uhura');
    starTrekQ.enqueue('Sulu');
    starTrekQ.enqueue('Checkov');

    //Should be Kirk
    console.log(peekQueue(starTrekQ));
    //Should be false
    console.log(isEmptyQueue(starTrekQ));
    //Should display above queue
    displayQueue(starTrekQ);

    //Remove Spock
    while (peekQueue(starTrekQ) !== 'Spock' && !isEmptyQueue(starTrekQ)) {
         console.log('removing ' + starTrekQ.dequeue());
     }
    console.log('removing ' + starTrekQ.dequeue());
    //Display after removing Spock
    //Should not have Kirk and Spock
    displayQueue(starTrekQ);

    //Double Linked first is line test
    //Should be Uhura
    console.log(peekQueue(starTrekQ));
}

function peekQueue(queue) {
    return queue.first ? queue.first.data : null;
}

function isEmptyQueue(queue) {
    return queue.first ? false : true;
}

function displayQueue(queue) {
    let current = queue.first;
    while (current !== null) {
        console.log(current.data);
        current = current.next;
    }
}
//queueTest();

// 8). Using a second stack to act like a queue.  Stack has a function that works like a queue
function stackedQueue() {
    const stack = new Stack();
    stack.push(5);
    stack.push(42);
    stack.push(1);
    stack.push(3);
    stack.push(58);
    
    console.log(peek(stack));
    console.log(stack.popQueue());
    (display(stack));
}

// 9). Square Dancing pairs
function squarePair() {
    const m = new Queue();
    const f = new Queue();
    const line = new Queue();
    line.enqueue('F Jane');
    line.enqueue('M Frank');
    line.enqueue('M John');
    line.enqueue('M Sherlock');
    line.enqueue('F Madonna');
    line.enqueue('M David');
    line.enqueue('M Christopher');
    line.enqueue('F Beyonce');

    while (!isEmptyQueue(line)) {
        let person = line.dequeue().split(' ');
        if (person[0] === 'F') {
            f.enqueue(person[1]);
        } else if (person[0] === 'M') {
            m.enqueue(person[1]);
        }
    }
    while (!isEmptyQueue(m) && !isEmptyQueue(f)) {
        let male = m.dequeue();
        let female = f.dequeue();
        console.log(`Female dance is ${female}, and the male dance is ${male}`);
    }
    let remainingM = 0;
    let remainingF = 0;
    while (!isEmptyQueue(m)) {
        m.dequeue();
        remainingM++;
    }
    while (!isEmptyQueue(f)) {
        f.dequeue();
        remainingF++;
    }
    remainingM > 0 ? console.log(`There are ${remainingM} male dancers waiting to dance`) : null
    remainingF > 0 ? console.log(`There are ${remainingF} female dancers waiting to dance`) : null
}

//10). 
function bank() {
    const line = new Queue();
    line.enqueue('Bab');
    line.enqueue('Soo');
    line.enqueue('Mary');
    line.enqueue('Joe');
    line.enqueue('Unlucky');

    while (!isEmptyQueue(line)) {
        let serving = line.dequeue();
        //25% chance to send someone back to end of line
        if (Math.random() <= 0.25) {
            console.log(`Sending ${serving} back to line`);
            line.enqueue(serving);
        }
    }
}