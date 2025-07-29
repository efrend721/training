import './style.css'

// Definition for singly-linked list node
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

/**
 * Add two numbers represented as linked lists (most significant digit first)
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    // Get the lengths of both linked lists
    const len1 = getLength(l1);
    const len2 = getLength(l2);
    
    // Add zeros to the shorter list to make them equal length
    if (len1 < len2) {
        l1 = padWithZeros(l1, len2 - len1);
    } else if (len2 < len1) {
        l2 = padWithZeros(l2, len1 - len2);
    }
    
    // Recursively add the numbers
    const result = addHelper(l1, l2);
    
    // If there's a carry, add a new node at the beginning
    if (result.carry === 1) {
        return new ListNode(1, result.node);
    }
    
    return result.node;
}

/**
 * Helper function to get the length of a linked list
 */
function getLength(head) {
    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }
    return length;
}

/**
 * Helper function to pad a linked list with zeros at the beginning
 */
function padWithZeros(head, count) {
    for (let i = 0; i < count; i++) {
        head = new ListNode(0, head);
    }
    return head;
}

/**
 * Recursive helper function to add two numbers
 * Returns an object with the result node and carry
 */
function addHelper(l1, l2) {
    if (!l1 && !l2) {
        return { node: null, carry: 0 };
    }
    
    // Recursively process the rest of the list
    const result = addHelper(l1.next, l2.next);
    
    // Calculate the sum for current position
    const sum = l1.val + l2.val + result.carry;
    const currentVal = sum % 10;
    const carry = Math.floor(sum / 10);
    
    // Create current node
    const currentNode = new ListNode(currentVal, result.node);
    
    return { node: currentNode, carry: carry };
}

/**
 * Alternative solution without reversing (using stacks)
 */
function addTwoNumbersWithStacks(l1, l2) {
    const stack1 = [];
    const stack2 = [];
    
    // Push all digits to stacks
    let current = l1;
    while (current) {
        stack1.push(current.val);
        current = current.next;
    }
    
    current = l2;
    while (current) {
        stack2.push(current.val);
        current = current.next;
    }
    
    let carry = 0;
    let result = null;
    
    // Process from least significant digit
    while (stack1.length > 0 || stack2.length > 0 || carry > 0) {
        const val1 = stack1.length > 0 ? stack1.pop() : 0;
        const val2 = stack2.length > 0 ? stack2.pop() : 0;
        
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        
        // Create new node and link it
        const newNode = new ListNode(sum % 10);
        newNode.next = result;
        result = newNode;
    }
    
    return result;
}

/**
 * Helper function to create a linked list from an array
 */
function createLinkedList(arr) {
    if (arr.length === 0) return null;
    
    let head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

/**
 * Helper function to convert linked list to array for display
 */
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

/**
 * Test function to demonstrate the solution
 */
function runTests() {
    console.log('=== Add Two Numbers II - Test Cases ===\n');
    
    // Test Case 1: [7,2,4,3] + [5,6,4] = [7,8,0,7]
    const l1_1 = createLinkedList([7, 2, 4, 3]);
    const l2_1 = createLinkedList([5, 6, 4]);
    const result1 = addTwoNumbers(l1_1, l2_1);
    console.log('Test 1:');
    console.log('Input: l1 = [7,2,4,3], l2 = [5,6,4]');
    console.log('Output:', linkedListToArray(result1));
    console.log('Expected: [7,8,0,7]');
    console.log('✓ Correct:', JSON.stringify(linkedListToArray(result1)) === JSON.stringify([7,8,0,7]));
    console.log();
    
    // Test Case 2: [2,4,3] + [5,6,4] = [8,0,7]
    const l1_2 = createLinkedList([2, 4, 3]);
    const l2_2 = createLinkedList([5, 6, 4]);
    const result2 = addTwoNumbers(l1_2, l2_2);
    console.log('Test 2:');
    console.log('Input: l1 = [2,4,3], l2 = [5,6,4]');
    console.log('Output:', linkedListToArray(result2));
    console.log('Expected: [8,0,7]');
    console.log('✓ Correct:', JSON.stringify(linkedListToArray(result2)) === JSON.stringify([8,0,7]));
    console.log();
    
    // Test Case 3: [0] + [0] = [0]
    const l1_3 = createLinkedList([0]);
    const l2_3 = createLinkedList([0]);
    const result3 = addTwoNumbers(l1_3, l2_3);
    console.log('Test 3:');
    console.log('Input: l1 = [0], l2 = [0]');
    console.log('Output:', linkedListToArray(result3));
    console.log('Expected: [0]');
    console.log('✓ Correct:', JSON.stringify(linkedListToArray(result3)) === JSON.stringify([0]));
    console.log();
    
    // Test Case 4: Different lengths with carry
    const l1_4 = createLinkedList([9, 9]);
    const l2_4 = createLinkedList([1]);
    const result4 = addTwoNumbers(l1_4, l2_4);
    console.log('Test 4:');
    console.log('Input: l1 = [9,9], l2 = [1]');
    console.log('Output:', linkedListToArray(result4));
    console.log('Expected: [1,0,0]');
    console.log('✓ Correct:', JSON.stringify(linkedListToArray(result4)) === JSON.stringify([1,0,0]));
    console.log();
    
    // Test with stack-based solution
    console.log('=== Testing Stack-based Solution ===\n');
    const l1_5 = createLinkedList([7, 2, 4, 3]);
    const l2_5 = createLinkedList([5, 6, 4]);
    const result5 = addTwoNumbersWithStacks(l1_5, l2_5);
    console.log('Stack solution test:');
    console.log('Input: l1 = [7,2,4,3], l2 = [5,6,4]');
    console.log('Output:', linkedListToArray(result5));
    console.log('Expected: [7,8,0,7]');
    console.log('✓ Correct:', JSON.stringify(linkedListToArray(result5)) === JSON.stringify([7,8,0,7]));
}

// Create the UI
document.querySelector('#app').innerHTML = `
  <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Courier New', monospace;">
    <h1>Add Two Numbers II</h1>
    <p><strong>Problem:</strong> Add two non-negative integers represented as linked lists where the most significant digit comes first.</p>
    
    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h3>Algorithm Explanation:</h3>
      <ol>
        <li><strong>Recursive Approach:</strong> Calculate lengths of both lists and pad the shorter one with zeros</li>
        <li>Use recursion to process from right to left, handling carry propagation</li>
        <li><strong>Stack Approach:</strong> Push all digits to stacks, then pop and add from least significant digit</li>
      </ol>
      
      <h3>Time Complexity:</h3>
      <p>O(max(m, n)) where m and n are the lengths of the two linked lists</p>
      
      <h3>Space Complexity:</h3>
      <p>O(max(m, n)) for the recursion stack or explicit stacks</p>
    </div>
    
    <button id="run-tests" style="background: #007acc; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px;">
      Run Test Cases
    </button>
    
    <div id="output" style="background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 8px; margin-top: 20px; font-family: 'Courier New', monospace; white-space: pre-wrap; display: none;"></div>
  </div>
`;

// Add event listener for the test button
document.getElementById('run-tests').addEventListener('click', () => {
    const output = document.getElementById('output');
    output.style.display = 'block';
    
    // Capture console.log output
    const originalLog = console.log;
    let logOutput = '';
    console.log = (...args) => {
        logOutput += args.join(' ') + '\n';
        originalLog(...args);
    };
    
    runTests();
    
    // Restore console.log and display output
    console.log = originalLog;
    output.textContent = logOutput;
});

// Run tests immediately to show in console
runTests();
