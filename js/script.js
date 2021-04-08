let mass = 1;
let k = 1;
let c = 1;
let ratio = 0.5;
let result = [0, 0, 0, 0, 0, 0];


function defaultVal() {
    calculate();
    changeDRatio();

}
function callback() {
    changeDRatio();
}


function changeDFactor(val1) {
    let val2 = document.getElementById("dFactor");
    let mFactor = $("#selectM").val();
    let kFactor = $("#selectK").val();
    mass = $("#mass").val();
    k = $("#kValue").val();
    let mass1 = mass * mFactor;
    let k1 = k * kFactor;
    val2.value = val1.value * 2 * Math.sqrt(mass1 * k1);
}

function changeDRatio() {
    let val1 = document.getElementById("dFactor");
    let val2 = document.getElementById("dRatio");
    let mFactor = $("#selectM").val();
    let kFactor = $("#selectK").val();
    let cFactor = $("#selectC").val();
    //alert(mFactor+" "+kFactor +" "+  c1);
    mass = $("#mass").val();
    k = $("#kValue").val();

    let mass1 = mass * mFactor;
    let k1 = k * kFactor;
    val2.value = val1.value * cFactor / (2 * Math.sqrt(mass1 * k1));
}


function calculate() {


    mass = $("#mass").val();
    k = $("#kValue").val();
    c = $("#dFactor").val();
    ratio = $("#dRatio").val();
    let mFactor = $("#selectM").val();
    let kFactor = $("#selectK").val();
    let cFactor = $("#selectC").val();

    let mass1 = mass * mFactor;
    let k1 = k * kFactor;
    let c1 = c * cFactor;

    result[0] = Math.sqrt(k1 / mass1);
    result[1] = result[0] / (2 * Math.PI);

    if (ratio > 1) {
        result[2] = "NaN";
        result[3] = "NaN";
        result[5] = "NaN";
    }
    else {
        result[2] = result[0] * Math.sqrt(1 - Math.pow(ratio, 2));
        result[3] = result[2] / (2 * Math.PI);
        result[5] = 2 * ratio * Math.PI / (Math.sqrt(1 - (ratio * ratio)));

    }

    result[4] = 2 * Math.sqrt(k1 * mass1);


    $("#result0").html(result[0]);
    $("#result1").html(result[1]);
    $("#result2").html(result[2]);
    $("#result3").html(result[3]);
    $("#result4").html(result[4]);
    $("#result5").html(result[5]);
}