//Listen for changes to units value to enable their fields and change their respective placeholders, step and min/max values according to the unit selected.
document.addEventListener("DOMContentLoaded", function() {
    let heightInput = document.getElementById("height");
    let heightUnit = document.getElementById("heightUnit");
    heightUnit.addEventListener("change", function() {
        heightInput.value = "";
        switch(heightUnit.value) {
            case "metres":
                heightInput.removeAttribute("disabled");
                heightInput.placeholder = "Height (m)";
                heightInput.min = "1";
                heightInput.max = "2.5";
                heightInput.step = "0.01";
                break;
            case "centimetres":
                heightInput.removeAttribute("disabled");
                heightInput.placeholder = "Height (cm)";
                heightInput.min = "100";
                heightInput.max = "250";
                heightInput.step = "1";
                break;
            case "inches":
                heightInput.removeAttribute("disabled");
                heightInput.placeholder = "Height (in)";
                heightInput.min = "40";
                heightInput.max = "100";
                heightInput.step = "0.25";
                break;
        }
    });
    let weightInput = document.getElementById("weight");
    let weightUnit = document.getElementById("weightUnit");
    weightUnit.addEventListener("change", function() {
        switch(weightUnit.value) {
            case "kilograms":
                weightInput.placeholder = "Weight (kg)";
                weightInput.removeAttribute("disabled");
                break;
            case "pounds":
                weightInput.placeholder = "Weight (lbs)";
                weightInput.removeAttribute("disabled");
                break;
        }
    });
});

//On clicking "Submit", use values provided to calculate BMI.
function calculateBmi() {
    let result, height, weight;
    let output = document.getElementById("output");
    const heightUnit = document.getElementById("heightUnit").value;
    const heightInput = parseFloat(document.getElementById("height").value);
    const weightUnit = document.getElementById("weightUnit").value;
    const weightInput = parseFloat(document.getElementById("weight").value);

    //Convert height to metres for calculation.
    if (heightUnit === "metres"){
        height = heightInput;
    } else if (heightUnit === "centimetres"){
        height = heightInput/100;
    } else {    //i.e. unit is inches.
        height = heightInput*2.54;
    }

    //Convert weight to kilograms for calculation.
    if (weightUnit === "kilograms"){
        weight = weightInput;
    } else {    //i.e. unit is pounds.
        weight = weightInput/2.205;
    }

    //BMI only validated in adults, if age<18, do not return BMI.
    if (parseInt(document.getElementById("age").value)<18){
        output.innerHTML = "BMI should not be used in under 18-year-olds."
        return;
    } else {
        result = weight/height**2;
    }

    //At extremes of BMI, suggest to check input values.
    if (result<10) {
        output.innerHTML = "BMI is less than 10kg/m&sup2, please check input values.";
    } else if (result>60) {
        output.innerHTML = "BMI is over 60kg/m&sup2, please check input values.";
    } else {
    output.innerHTML = "BMI is " + result.toFixed(1) + "kg/m&sup2";
    }
}