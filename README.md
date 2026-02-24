1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
>> getElementById finds element by using id name. since id's are unique it gives only one element. getElementsByClassName finds elements by class name. it returns html collection and can give many element. querySelector finds first matching element while  querySelectorAll finds all matching elements. 
2. How do you create and insert a new element into the DOM?
>> I used document.createElement('div') to create element and filterSection.appendChild(div) to insert a new element into the DOM. I also used .innerHTML to fill that new element with content before appending it.
3. What is Event Bubbling? And how does it work?
>>Event bubbling means that when an event happens on an element, it doesn’t stop there it moves upward through its parent elements.Like If I click "Delete" button inside card, First button event runs,Then card event,Then main containe,
Then document.
4. What is Event Delegation in JavaScript? Why is it useful?
>>Event Delegation is a design pattern where you attach a single event listener to a parent element to manage events for all of its current and future children. it is usefull for Memory Efficiency and works for dynamically added elements. also it keeps code cleaner.
5. What is the difference between preventDefault() and stopPropagation() methods?
>>preventDefault() Stops the default browser behavior associated with an event while stopPropagation() Stops the event from bubbling up the DOM tree.
