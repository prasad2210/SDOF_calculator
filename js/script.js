let mass = 1;
let k = 1;
let c = 1;
let ratio = 0.5;
let result = [0, 0, 0, 0, 0, 0];
let x1 = 20;

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

    let err = "Add ";

    x1 = $("#initial").val();
    mass = $("#mass").val();
    k = $("#kValue").val();
    c = $("#dFactor").val();
    ratio = $("#dRatio").val();
    ratio = Number(ratio);

    if (!mass) {
        err += "Mass, ";
    }
    if (!k) {
        err += "Stiffness, ";
    }
    if (!c) {
        err += "Damping factor, ";
    }
    if (!ratio) {
        err += "Damping ratio, ";
    }
    if (!x1) {
        err += "Initial displacemt, ";
    }

    if ((mass && k && x1)) {
        $("#error").css('display', "none");
        $("#table").css('display', "block");
        $("#chart1").css('display', "block");
        $("#chart2").css('display', "block");
        $("#chart3").css('display', "block");


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
        result[5] = 1 / (2 * ratio);

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
        let dataplot2 = [];
        let dataplot3 = [];

        for (let i = 0; i < 20; i = i + 0.01) {
            let x = i;
            let y = 1;
            if (ratio < 1) {
                y = ((x1 * Math.exp(-1 * ratio * result[0] * x)) * (Math.sin(result[2] * x + Math.atan((Math.sqrt(1 - ratio * ratio)) / ratio)))) / (Math.sqrt(1 - ratio * ratio));
            }
            else if (ratio == 1) {
                y = x1 * (1 + result[0] * x) * Math.exp(-1 * result[0] * x);
            }
            else if (ratio > 1) {
                let y1 = Math.sqrt(ratio * ratio - 1);

                y1 = y1.toFixed(5);
                y1 = Number(y1);

                y = (x1 / (2 * y1)) * (((ratio + y1) * (Math.exp((-1 * ratio + y1) * result[0] * x))) + ((-1 * ratio + y1) * (Math.exp((-1 * ratio - y1) * result[0] * x))));

            }

            datagiven.push({
                x: x,
                y: y
            });
        }

        var chart = new CanvasJS.Chart("chart1", {
            animationEnabled: true,
            zoomEnabled: true,
            theme: "light2",
            title: {
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

        if (ratio < 1 && ratio > 0) {
            $("#box1").css('display', "block");
            $("#box2").css("display", "block");

            for (let i = 0.1; i < 1; i = i + 0.01) {
                let x = i;
                let y = (2 * Math.PI * x) / (Math.sqrt(1 - (x * x)));
                dataplot2.push({
                    x: x,
                    y: y
                });
            }
            var chart = new CanvasJS.Chart("chart2", {
                animationEnabled: true,
                zoomEnabled: true,
                theme: "light2",
                title: {
                    text: "δ Vs ζ"
                },
                axisX: {
                    title: "damping ratio (ζ)",
                },
                axisY: {
                    title: "logerithmetic decrement (δ)",
                },
                data: [{
                    type: "spline",
                    indexLabelFontSize: 16,
                    dataPoints: dataplot2
                }]
            });
            chart.render();


            for (let i = 0; i < 20; i = i + 0.01) {
                let x = i;
                let y = (x1 * Math.exp(-1 * ratio * result[0] * x)) / Math.sqrt((1 - ratio * ratio));
                dataplot3.push({
                    x: x,
                    y: y
                });
            }
            var chart = new CanvasJS.Chart("chart3", {
                animationEnabled: true,
                zoomEnabled: true,
                theme: "light2",
                title: {
                    text: "A Vs T"
                },
                axisX: {
                    title: "Time in sec (t)",
                },
                axisY: {
                    title: "Amplitude (A)",
                },
                data: [{
                    type: "spline",
                    indexLabelFontSize: 16,
                    dataPoints: dataplot3
                }]
            });
            chart.render();


        }
        else {
            $("#box1").css('display', "none");
            $("#box2").css("display", "none");
        }
    }
    else {
        err = err.substring(0, err.length - 2);
        
        err += ' values'  
        let msg =  '<div class="alert alert-danger alert-dismissible fade show text-center" role="alert"> <b>'+ err +' </b><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
        $("#error").css('display', "block");
        $("#table").css('display', "none");
        $("#chart1").css('display', "none");
        $("#chart2").css('display', "none");
        $("#chart3").css('display', "none");
        

        $("#error").html(msg);
    }
}