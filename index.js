//DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('rclipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
// generate event listner
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasnumbers = numbersEl.checked;
    const hassymbols = symbolsEl.checked;

    //console.log(typeof length);

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasnumbers,
        hassymbols,
        length);

});

//copy to clipboard

// function copyFunc() {
//     /* Get the text field */
//     const copyText = resultEl.innerText;
//     console.log(copyText);
//     /* Select the text field */
//     copyText.select();
//     //copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
//     /* Copy the text inside the text field */
//     navigator.clipboard.writeText(copyText.value);
    
//     /* Alert the copied text */
//     alert("Copied the text: " + copyText.value);
//   }




clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard ');
});

//generate password function
function generatePassword(lower,upper,number,symbol,length){
    let generatedPassword= '';
    const typesCount = lower+upper+number+symbol;
    //console.log(typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    
    //console.log(typesArr);
    //console.log(Object.values(item));
    if(typesCount === 0){
        return '';
    }
    for (let i=0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
           //console.log('funcname',funcName);
            
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = (generatedPassword.slice(0,length));

    return finalPassword;
}




// Generator function

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26)+97); 
}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65); 
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48); 
}
function getRandomSymbol(){
    const symbols = '`~!@#$%^&*_+=-,<>.?/;:(){}[]\|';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

