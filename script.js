let inputPasswordDisplay = document.querySelector("[iskoQuerySelectorSeSelectKrnaHai]");
let inputCopy = document.querySelector("[data-copyMssg]");
let inputSlider = document.querySelector("[data-lengthSlider]");
let inputLengthNumber = document.querySelector("[data-lengthNumber]");
let inputCopyBtn = document.querySelector("[data-copy]");
let uppercaseCheck = document.querySelector("#upper");
let lowercaseCheck = document.querySelector("#lower");
let numberCheck = document.querySelector("#number");
let SymbolCheck = document.querySelector("#symb");
let inputIndicator = document.querySelector("[data-indicator]");
let generateBtn = document.querySelector(".generate-pass");
let allCheckboxes = document.querySelectorAll("input[type=checkbox]");
let symbols = "!@#$%^&*()-=+_~><,./?;':'[]\{}|";

//initially
let password = "";
let passLength = 10;
let checkCount = 0;
handleSlider();

// set passowrd length
function handleSlider() {
    inputSlider.value = passLength;
    inputLengthNumber.innerText = passLength;
};

inputSlider.addEventListener('input', (e) => {
    passLength = e.target.value;
    handleSlider();
});

function setIndicator(color) {
    inputIndicator.style.backgroundColor = color;
    inputIndicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function generateRandomNumber() {
    return getRndInteger(0, 9);
};

function generateLowercase() {
    return String.fromCharCode(getRndInteger(97, 123));
};

function generateUppercase() {
    return String.fromCharCode(getRndInteger(65, 91));
};
function generateSymbol() {
    let randomNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randomNum);
};

function calcPassStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNumber = true;
    if (SymbolCheck.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passLength >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasLower || hasUpper) && (hasNumber || hasSymbol) && passLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
};

async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(inputPasswordDisplay.value);
        inputCopy.innerText = "Copied";
    }
    catch {
        inputCopy.innerText = "Failed";
    }
    inputCopy.classList.add("active");

    setTimeout(() => {
        inputCopy.classList.remove("active");
    }, 3000);
};

inputCopyBtn.addEventListener('click', () => {
    if (inputPasswordDisplay.value) copyToClipboard();
});

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    if (passLength < checkCount) {
        passLength = checkCount;
        handleSlider();
    }
};

allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});



generateBtn.addEventListener('click', () => {
    if (checkCount <= 0) return;

    if (passLength < checkCount) {
        passLength = checkCount;
        handleSlider();
    }

    password = "";

    let arr = [];
    if (uppercaseCheck.checked) arr.push(generateUppercase);
    if (lowercaseCheck.checked) arr.push(generateLowercase);
    if (numberCheck.checked) arr.push(generateRandomNumber);
    if (SymbolCheck.checked) arr.push(generateSymbol);

    for (let i = 0; i < arr.length; i++) {
        password += arr[i]();
    }

    for (let i = 0; i < passLength - arr.length; i++) {
        let randomIndex = getRndInteger(0, arr.length);
        password += arr[randomIndex]();
    }

    //shuffle the password
    password = shufflePassword(Array.from(password));

    //show password in UI
    inputPasswordDisplay.value = password;

    //calc strength
    calcPassStrength();
});


function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
};


