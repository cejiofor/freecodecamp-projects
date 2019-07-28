// JavaScript Algorithms and Data Structures Projects: Roman Numeral Converter
// Convert the given number into a roman numeral.

// All roman numerals answers should be provided in upper-case.


var romanNumeral = {1:"I", 5:"V", 10:"X", 50:"L", 100:"C", 500:"D", 1000:"M"};

function convertToRoman(num) {
    var numCopy = num;
    var romanArr = [];
    var kSpace = 0 
    //num%10000-num%1000;

    function addValueArr(arr,value,n){
        while (n>0){
            arr.push(value)
            n--;
        };
        return arr;
    }

    // Add the needed numerals for the 1000's place, update working numer to remove the 1000's place value
    kSpace = numCopy%10000-numCopy%1000;
    romanArr = addValueArr(romanArr, "M",kSpace/1000);
    // console.log(numCopy, kSpace);
    // numCopy -= kSpace;

    // Add the needed numerals for the 100's place, update working numer to remove the 100's place value
    kSpace = numCopy%1000 - numCopy%100;
    // console.log(numCopy, kSpace);
    if(kSpace == 900){
        romanArr.push("CM");
    } else if (kSpace > 400){
        romanArr.push("D");
        romanArr = addValueArr(romanArr, "C",(kSpace-500)/100);
    } else if(kSpace == 400){
        romanArr.push("CD");
    } else {
        romanArr = addValueArr(romanArr, "C",(kSpace)/100);
    }    
    
    // Add the needed numerals for the 10's place, update working numer to remove the 10's place value
    kSpace = numCopy%100 - numCopy%10;
    // console.log(numCopy, kSpace);
    if(kSpace == 90){
        romanArr.push("XC");
    } else if (kSpace > 40){
        romanArr.push("L");
        romanArr = addValueArr(romanArr, "X",(kSpace-50)/10);
    } else if(kSpace == 40){
        romanArr.push("XL");
    } else {
        romanArr = addValueArr(romanArr, "X",(kSpace)/10);
    }
    
    // Add the needed numerals for the 1's place, 
    kSpace = numCopy%10;// - numCopy;
    // console.log(numCopy, kSpace);
    if(kSpace == 9){
        romanArr.push("IX");
    } else if (kSpace > 4){
        romanArr.push("V");
        romanArr = addValueArr(romanArr, "I",(kSpace-5));
    } else if(kSpace == 4){
        romanArr.push("IV");
    } else {
        romanArr = addValueArr(romanArr, "I",kSpace);
    }  

    console.log(romanArr.join(""));

    return romanArr.join("");
}

// convertToRoman(36);
convertToRoman(2) //should return "II".
convertToRoman(3) //should return "III".
convertToRoman(4) //should return "IV".
convertToRoman(5) //should return "V".
convertToRoman(9) //should return "IX".
convertToRoman(12) //should return "XII".
convertToRoman(16) //should return "XVI".
convertToRoman(29) //should return "XXIX".
convertToRoman(44) //should return "XLIV".
convertToRoman(45) //should return "XLV"
convertToRoman(68) //should return "LXVIII"
convertToRoman(83) //should return "LXXXIII"
convertToRoman(97) //should return "XCVII"
convertToRoman(99) //should return "XCIX"
convertToRoman(400) //should return "CD"
convertToRoman(500) //should return "D"
convertToRoman(501) //should return "DI"
convertToRoman(649) //should return "DCXLIX"
convertToRoman(798) //should return "DCCXCVIII"
convertToRoman(891) //should return "DCCCXCI"
convertToRoman(1000) //should return "M"
convertToRoman(1004) //should return "MIV"
convertToRoman(1006) //should return "MVI"
convertToRoman(1023) //should return "MXXIII"
convertToRoman(2014) //should return "MMXIV"
convertToRoman(3999) //should return "MMMCMXCIX"