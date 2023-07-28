const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
// it will show all type of checkbox
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
// it will help us to find random symbol bcz we have created a string and function will take out symbol from this string randomly

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set circle colour to grey
setIndicator("#ccc");

// set Paswword length
function handleSlider(){
inputSlider.value = passwordLength;
lengthDisplay.innerText = passwordLength;
// aur kuch
const min=inputSlider.min;
const max=inputSlider.max;
inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min)+"% 100%")


}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    // shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
   
}

function generateRandomNumber(){
    return getRndInteger(0,9);

}

function generateLowercase(){
  return String.fromCharCode(getRndInteger(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
  }
 
  function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
  }

  function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
async function copyContent(){
    try{
await navigator.clipboard.writeText(passwordDisplay.value);
// it writes the text on the clipboard and returns promise
copyMsg.innerText= "copied";
}
catch(e){
copyMsg.innerText= "failed";
}
// to make copy awala span visible
copyMsg.classList.add("active");

// ho skta h glt
setTimeout(() => {
    copyMsg.classList.remove("active");
}, 2000);

}

function shufflePass(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
  checkCount=0;
  allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked)
    checkCount++;
  });

     //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click' ,()=>{
  // if none of the checkboc is selected
  if(checkCount<=0){
   alert("Select the Symbols Required!");
   return;}

  if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
  }
    // now finding the new password
    console.log("Starting the journewy");
    // removing the old password

    password="";

    // lets put stuff mentioned by the checkboxes

    // if(uppercaseCheck.checked){
    //   password=generateUppercase();
    // }
    
    // if(lowercaseCheck.checked){
    //   password=generateLowercase();
    // }
    
    // if(numbersCheck.checked){
    //   password=generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //   password=generateSymbol();
    // }
    let funcArr = [];
    if(uppercaseCheck.checked)
      funcArr.push(generateUppercase)
    if(lowercaseCheck.checked)
      funcArr.push(generateLowercase)
    if(numbersCheck.checked)
      funcArr.push(generateRandomNumber)
    if(symbolsCheck.checked)
      funcArr.push(generateSymbol)
  //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
  console.log("Compulsory addition done");

  // remaining addition done
  for(let i=0;i<passwordLength-funcArr.length;i++)
  {
    let randIndex=getRndInteger(0, funcArr.length)
    password+=funcArr[randIndex]();
  }
  console.log("remaining addition done");

  // shuffle the password
  password=shufflePass(Array.from(password));
  console.log("shuffling done");

  
  // showing passsword
  passwordDisplay.value=password;

  console.log("UI addition done");


  // calculate strength
  calcStrength();
})
