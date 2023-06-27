const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthNumber = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[display-password]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelector("input[type=checkbox]");
const generateBtn = document.querySelector("[generate-Password]");
const indicator = document.querySelector("[strength-Indicator]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

let symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password = "";
let passwordLength = 10;

handleSlider();

function handleSlider(){
    inputSlider.value = passwordLength; //Iska Role nhi smjh aa rha
    lengthNumber.innerText = passwordLength;
}

inputSlider.addEventListener('input',(e)=>{
    // lengthNumber.innerText = e.target.value;
    passwordLength = e.target.value;
    handleSlider();
})

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(97,122));
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(65,90));
}

function generateSymbol(){
    const randInt = getRndInteger(0,symbols.length);
    return symbols[randInt];
}
let funcArr = [];
generateBtn.addEventListener('click',()=>{
    password = "";
    funcArr = [];
    let cnt = 0;
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
        cnt++;
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
        cnt++;
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
        cnt++;
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
        cnt++;
    }
    if(cnt>0){
        for(let i=0;i<passwordLength;i++){
            let randomNum = getRndInteger(0 , funcArr.length);
            password = password + funcArr[randomNum]();
        }
        password = shufflePassword(Array.from(password));
        passwordDisplay.value = password;
        calcStrength();
    }
})
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
    console.log("kya hua");
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
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow - HW
}
function shufflePassword(array) {
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
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}