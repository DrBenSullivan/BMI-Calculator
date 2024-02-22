//Declare unit conversion factors as properties of an object.
const convert = {
    cmToM: 0.01,
    ftToIn: 12,
    inToM: 0.0254,
    stToLb: 14,
    lbToKg: 0.454
}

//Assign constants to static HTML elements.
const
    ageInput = document.getElementById("age-input"),
    heightUnitInput = document.getElementById("height-unit-input"),
    weightUnitInput = document.getElementById("weight-unit-input"),
    output = document.getElementById("output"),
    submitButton = document.getElementById("submit-button")
;

//DEFINE FUNCTIONS TO MANIPULATE HTML DEPENDING ON THE UNIT SELECTED.
//(1/4) Change height unit to 'imperial'.
const imperialHeightSelected = () => {
    const heightInput = document.getElementById("height-input");
    heightInput.outerHTML = 
        `<div id="height-input" class="grid-1x2">
            <select id="height-input--foot" class="grid-1x2__item1">
                <option selected disabled>ft</option><option value="1">1'</option><option value="2">2'</option><option value="3">3'</option><option value="4">4'</option><option value="5">5'</option><option value="6">6'</option><option value="7">7'</option><option value="8">8'</option><option value="9">9'</option>
            </select>
            <select id="height-input--inch" class="grid-1x2__item2">
                <option selected disabled>in</option><option value="0">0&quot;</option><option value="0.5">&frac12;"</option><option value="1">1"</option><option value="1.5">1 &frac12;"</option><option value="2">2"</option><option value="2.5">2 &frac12;"</option><option value="3">3"</option><option value="3.5">3 &frac12;"</option><option value="4">4"</option><option value="4.5">4 &frac12;"</option><option value="5">5"</option><option value="5.5">5 &frac12;"</option><option value="6">6"</option><option value="6.5">6 &frac12;"</option><option value="7">7"</option><option value="7.5">7 &frac12;"</option><option value="8">8"</option><option value="8.5">8 &frac12;"</option><option value="9">9"</option><option value="9.5">9 &frac12;"</option><option value="10">10"</option><option value="10.5">10 &frac12;"</option><option value="11">11"</option><option value="11.5">11 &frac12;"</option>
            </select>
        </div>`;
}
//(2/4) Change height unit to any other unit.
const otherHeightSelected = (unit) => {
    const heightInput = document.getElementById("height-input");
    heightInput.outerHTML = `<input id="height-input" class="grid-item" placeholder="Height (` +unit+ `)" type="number" />`;
}
//(3/4) Change weight unit to 'imperial'.
const imperialWeightSelected = () => {
    const weightInput = document.getElementById("weight-input");
    weightInput.outerHTML = 
        `<div id="weight-input" class="grid-1x2">
            <select id="weight-input--stone" class="grid-1x2__item1">
                <option selected disabled>st</option><option value="1">1 st</option><option value="2">2 st</option><option value="3">3 st</option><option value="4">4 st</option><option value="5">5 st</option><option value="6">6 st</option><option value="7">7 st</option><option value="8">8 st</option><option value="9">9 st</option><option value="10">10 st</option><option value="11">11 st</option><option value="12">12 st</option><option value="13">13 st</option><option value="14">14 st</option><option value="15">15 st</option><option value="16">16 st</option><option value="17">17 st</option><option value="18">18 st</option><option value="19">19 st</option><option value="20">20 st</option>
            </select>
            <select id="weight-input--pound" class="grid-1x2__item2">
                <option selected disabled>lb</option><option value="0">0 lb</option><option value="1">1 lb</option><option value="2">2 lb</option><option value="3">3 lb</option><option value="4">4 lb</option><option value="5">5 lb</option><option value="6">6 lb</option><option value="7">7 lb</option><option value="8">8 lb</option><option value="9">9 lb</option><option value="10">10 lb</option><option value="11">11 lb</option><option value="12">12 lb</option><option value="13">13 lb</option><option value="14">14 lb</option><option value="15">15 lb</option><option value="16">16 lb</option><option value="17">17 lb</option><option value="18">18 lb</option><option value="19">19 lb</option><option value="20">20 lb</option>
            </select>
        </div>`;
}
//(4/4) Change weight unit to any other unit.
const otherWeightSelected = (unit) => {
    const weightInput = document.getElementById("weight-input");
    weightInput.outerHTML = `<input id="weight-input" class="grid-item" placeholder= "Weight (` +unit+ `)" type="number"/>`;
}

//Define listener functions & initialise.
const heightUnitListener = () => {
    output.innerHTML = "";
    if(heightUnitInput.value==="imperial") {
        imperialHeightSelected();
    } else {
        otherHeightSelected(heightUnitInput.value);
    }
}
const weightUnitListener = () => {
    output.innerHTML = "";
    if(weightUnitInput.value==="imperial") {
        imperialWeightSelected();
    } else {
        otherWeightSelected(weightUnitInput.value);
    }
}
const listenersOnPageLoaded = () => {
    heightUnitInput.addEventListener("input", heightUnitListener);
    weightUnitInput.addEventListener("input", weightUnitListener);
    submitButton.addEventListener("click", getBmi);
}
document.addEventListener("DOMContentLoaded", listenersOnPageLoaded);

//Function to convert imperial height inputs and return in metres.
const convertImperialHeightToMetres = (inputFeet,inputInches) => {
    const feetInIn = inputFeet*convert.ftToIn;
    const totalIn = feetInIn + inputInches;
    const totalM = totalIn*convert.inToM;
    return totalM;
}

//Function to return other height inputs in metres.
const convertOtherHeightToMetres = (inputValue,inputUnit) => {
    switch (inputUnit) {
        case "m": 
            return inputValue;
        case "cm":
            return inputValue*convert.cmToM;
        case "in":
            return inputValue*convert.inToM;
    }
}

//Function to determine which height conversion function to run depending on unit input.
const getHeightInMetres = () => {
    const heightUnit = heightUnitInput.value;
    if (heightUnit==="imperial"){
        const footValue = parseFloat(document.getElementById("height-input--foot").value);
        const inchValue = parseFloat(document.getElementById("height-input--inch").value);
        return convertImperialHeightToMetres(footValue,inchValue);
    } else {
        const heightValue = document.getElementById("height-input").value;
        return convertOtherHeightToMetres(heightValue,heightUnit);
    }
}

//Function to convert imperial weight inputs and return in metres.
const convertImperialWeightToKilograms = (stones,pounds) => {
    const stonesInLb = stones*convert.stToLb;
    const totalLb = stonesInLb + pounds;
    const totalKg = totalLb*convert.lbToKg;
    return totalKg;
}

//Function to convert other weight inputs and return in metres.
const convertOtherWeightToKilograms = (inputValue,inputUnit) => {
    switch (inputUnit) {
        case "kg": 
            return inputValue;
        case "lb":
            return inputValue*convert.lbToKg;
    }
}

//Function to determine which weight conversion function to run depending on unit input and return the result.
const getWeightInKilograms = () => {
    const weightUnit = weightUnitInput.value;
    if (weightUnit==="imperial"){
        const stoneValue = parseFloat(document.getElementById("weight-input--stone").value);
        const poundValue = parseFloat(document.getElementById("weight-input--pound").value);
        return convertImperialWeightToKilograms(stoneValue,poundValue);
    } else {
        const weightValue = document.getElementById("weight-input").value;
        return convertOtherWeightToKilograms(weightValue,weightUnit);
    }
}

//Function to calculate BMI from metric units.
const calculateBMI = (heightInM,weightInKg) => {
    return weightInKg/(heightInM**2);
}

//Function to return HTML output depending on  
const calculatorOutput = (bmi) => {
    if (bmi<10) {
        return "BMI is less than 10kg/m&sup2;, please check input values.";
    } else if (bmi>60) {
        return "BMI is over 60kg/m&sup2;, please check input values.";
    } else {
        return"BMI is " + bmi + "kg/m&sup2;";
    }
}

//Function to run calculator.
const getBmi = () => {

    //BMI only validated for use in adults, guard clause to exclude <18-year-olds.
    const age = ageInput.value;
    if (age<18){
        output.textContent = "BMI should not be used in under 18-year-olds.";
        return;
    }

    //Run functions and input messsage into <output>
    const heightInMetres = getHeightInMetres();
    const weightInKilograms = getWeightInKilograms();
    const bmiValue = calculateBMI(heightInMetres,weightInKilograms).toFixed(1);
    const outputMessage = calculatorOutput(bmiValue);
    output.innerHTML = outputMessage;
}