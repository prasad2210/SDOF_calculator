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
    ratio = Number(ratio);
    let mFactor = $("#selectM").val();
    let kFactor = $("#selectK").val();
    let cFactor = $("#selectC").val();

    let mass1 = mass * mFactor;
    let k1 = k * kFactor;
    let c1 = c * cFactor;

    result[0] = Math.sqrt(k1 / mass1);
    result[1] = result[0] / (2 * Math.PI);

    if (ratio >= 1) {
        result[2] = "NaN";
        result[3] = "NaN";
        result[6] = "NaN";
    }
    else {
        result[2] = result[0] * Math.sqrt(1 - Math.pow(ratio, 2));
        result[3] = result[2] / (2 * Math.PI);
        result[6] = 2 * ratio * Math.PI / (Math.sqrt(1 - (ratio * ratio)));

        result[2] = result[2].toFixed(3);
        result[3] = result[3].toFixed(3);
        result[6] = result[6].toFixed(3);


    }

    result[4] = 2 * Math.sqrt(k1 * mass1);
    result[5] = 1/(2*ratio);

    result[0] = result[0].toFixed(3);
    result[1] = result[1].toFixed(3);
    result[4] = result[4].toFixed(3);
    result[5] = result[5].toFixed(3);





    $("#result0").html(result[0]);
    $("#result1").html(result[1]);
    $("#result2").html(result[2]);
    $("#result3").html(result[3]);
    $("#result4").html(result[4]);
    $("#result5").html(result[5]);
    $("#result6").html(result[6]);


    let datagiven = [];

    for(let i=0; i<20; i= i + 0.01){
        let x = i;
        let x1 = 10;
        let y = 1;
        if(ratio< 1){
            y = ((x1*Math.exp(-1*ratio*result[0]*x))*(Math.sin(result[2]*x + Math.atan((Math.sqrt(1 - ratio*ratio))/ratio) )))/(Math.sqrt(1 - ratio*ratio));
        } 
        else if(ratio == 1){
            y = x1*(1 + result[0]*x)*Math.exp(-1*result[0]*x);
        }
        else if(ratio >1){
            let y1 = Math.sqrt(ratio*ratio -1);
            
            y1 = y1.toFixed(5);
            y1 = Number(y1);
            
            y = (x1/(2*y1))*(((ratio + y1)*(Math.exp((-1*ratio + y1)*result[0]*x))) + ((-1*ratio + y1)*(Math.exp((-1*ratio - y1)*result[0]*x))));
            // // console.log(y);
            // let y2 = x1/(2*y1);
            // console.log(y2);
            // let y5 = Number(ratio) + Number(y1);
            // console.log(typeof(y1));
            // let y3 = Math.exp(((-1*ratio) + y1)*result[0]*x);
            // console.log(y3);
            
            // let y4 = ((-1*ratio) + y1)*(Math.exp((-1*ratio) -y1)*result[0]*x);
            // console.log(y4)
            // y = y2*(y3 + y4);
            // console.log(y);
            
        }

        datagiven.push({
            x : x,
            y : y
        });
    }

    var chart = new CanvasJS.Chart("chart1", {
        animationEnabled: true,
	    zoomEnabled: true,
        theme: "light2",
        title:{
            text: "Free vibration graph"
        },
        axisX: {
            title: "Time in sec",
        },
        axisY: {
            title: "X(t) in mm",
        },
        data: [{        
            type: "spline",
              indexLabelFontSize: 16,
            dataPoints: datagiven
        }]
    });
    chart.render();



}