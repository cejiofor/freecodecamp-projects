// JavaScript Algorithms and Data Structures Projects: Cash Register
// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

// cid is a 2D array listing available currency.

// The checkCashRegister() function should always return an object with a status key and a change key.

// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

// Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

// Currency Unit	Amount
// Penny	$0.01 (PENNY) 
// Nickel	$0.05 (NICKEL)
// Dime	$0.1 (DIME)
// Quarter	$0.25 (QUARTER)
// Dollar	$1 (DOLLAR)
// Five Dollars	$5 (FIVE)
// Ten Dollars	$10 (TEN)
// Twenty Dollars	$20 (TWENTY)
// One-hundred Dollars	$100 (ONE HUNDRED)

function checkCashRegister(price, cash, cid) {
  var changeDue = cash*100 - price*100;
  var _cid = cid.reduce((object, [key,value]) => Object.assign(object, {[key]: value*100}), {});
  var cidSum = Object.values(_cid).reduce((acc,value) => acc+value);
  var newDems = {"ONE HUNDRED":10000, "TWENTY":2000, "TEN":1000, "FIVE":500, "ONE":100, "QUARTER":25, "DIME":10, "NICKEL":5, "PENNY":1};
  var register = {status: "", change:{}};
  
  if (cidSum < changeDue){
    register.status = "INSUFFICIENT_FUNDS";
    register.change = [];
    // console.log(register);
    return register;
  } else if (cidSum == changeDue){
      register.status = "CLOSED";
      register.change = cid;
      // console.log(register);
      return register;
  } else{
    register.status = "OPEN";
    
    for (var largestDenom in newDems){
      register.change[largestDenom] = 0;
      while (changeDue >= newDems[largestDenom] && _cid[largestDenom]>0){
        changeDue -= newDems[largestDenom];
        _cid[largestDenom] -= newDems[largestDenom];
        cidSum = Object.values(_cid).reduce((acc,value) => acc+value);
        register.change[largestDenom] += newDems[largestDenom];
      }
    }

    register.change = Object.keys(register.change).map(function(key){
      return [key, register.change[key]/100];
    }).filter(ele => ele[1]>0);

    if (changeDue > 0){
      register.status = "INSUFFICIENT_FUNDS";
      register.change = [];
      // console.log(register);
      return register;
    }
  }  

  // console.log(register)
  return register;
}


checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) //should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) //should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

//Insufficient change
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) //should return {status: "INSUFFICIENT_FUNDS", change: []}.

//Not exact Change
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) //should return {status: "INSUFFICIENT_FUNDS", change: []}.

//Exact Change
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) //should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}