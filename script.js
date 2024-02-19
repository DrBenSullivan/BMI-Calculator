//Define function to listen for changes to height units to enable their fields and change their respective placeholders, step and min/max values according to the unit selected.
const 
    heightInput = document.getElementById("height"),
    selectHeightUnit = document.getElementById("heightUnit"),
    checkHeightUnit = () => {
        selectHeightUnit.addEventListener("change", function() {
            heightInput.value = "";
            switch(selectHeightUnit.value) {
                case "metres":
                    heightInput.removeAttribute("disabled");
                    heightInput.placeholder = "Height (m)";
                    break;
                case "centimetres":
                    heightInput.removeAttribute("disabled");
                    heightInput.placeholder = "Height (cm)";
                    break;
                case "inches":
                    heightInput.removeAttribute("disabled");
                    heightInput.placeholder = "Height (in)";
                    break;
            }
        })
    }
;

//Define function to listen for changes to weight units to enable their fields and change their respective placeholders, step and min/max values according to the unit selected.
const
    weightInput = document.getElementById("weight"),
    selectWeightUnit = document.getElementById("weightUnit"),
    checkWeightUnit = () => {
        selectWeightUnit.addEventListener("change", function() {
            weightInput.value = "";
            switch(selectWeightUnit.value) {
                case "kilograms":
                    weightInput.removeAttribute("disabled");    
                    weightInput.placeholder = "Weight (kg)";
                    break;
                case "pounds":
                    weightInput.removeAttribute("disabled");
                    weightInput.placeholder = "Weight (lbs)";
                    break;
            };
        });
    }
;

//Start listening for Unit changes on DOMContentLoad 
document.addEventListener("DOMContentLoaded", function() {
    checkHeightUnit();
    checkWeightUnit();
});

//Define function to capture inputted values.
const getValues = () => {
    return{
        age: parseInt(document.getElementById("age").value),
        heightValue: heightInput.value,
        heightUnit: selectHeightUnit.value,
        weightValue: weightInput.value,
        weightUnit: selectWeightUnit.value
    };
};

//Define function to use values provided to calculate BMI.
const calculateBmi = () => {
    let heightInMetres, weightInKilograms;
    const output = document.getElementById("output");
    const { age, heightValue, heightUnit, weightValue, weightUnit } = getValues();

    //BMI only validated in adults so, if age<18, do not return BMI.
    if (age<18){
        output.innerHTML = "BMI should not be used in under 18-year-olds.";
    } else {

        //Convert height to metres for calculation.
        const 
            centimetresToMetresDivisor = 100,
            inchesToMetresFactor = 2.54;

        if (heightUnit === "centimetres"){
            heightInMetres = heightValue/centimetresToMetresDivisor;
        } else if (heightUnit === "inches"){
            heightInMetres = heightValue*inchesToMetresFactor;
        } else {    //i.e. height is already in metres.
            heightInMetres = heightValue;
        }

        //Convert weight to kilograms for calculation.
        const poundsToKilogramsDivisor = 2.205;
        if (weightUnit === "pounds"){
            weightInKilograms = weightValue/poundsToKilogramsDivisor;
        } else {    //i.e. weight is already in kilograms.
            weightInKilograms = weightValue;
        }

        //Calculate BMI.
        const result = weightInKilograms/heightInMetres**2;

        //At extremes of BMI, suggest to check input values.
        if (result<10) {
            output.innerHTML = "BMI is less than 10kg/m&sup2, please check input values.";
        } else if (result>60) {
            output.innerHTML = "BMI is over 60kg/m&sup2, please check input values.";
        } else {
            output.innerHTML = "BMI is " + result.toFixed(1) + "kg/m&sup2";
        }
    }   
};

//Define button variable and run calculator on click.
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", calculateBmi);