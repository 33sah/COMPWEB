function yfind(speed, angle, x, height, g) {
    return height + (x * Math.tan(angle)) - ((g / (2 * (speed ** 2))) * (1 + (Math.tan(angle) ** 2)) * (x ** 2));
}

function Rfind(speed, angle, height, g) {
    return Math.abs((speed ** 2 / g) * ((Math.sin(angle) * Math.cos(angle)) + (Math.cos(angle) * Math.sqrt((Math.sin(angle) ** 2) + ((2 * g * height) / (speed ** 2))))));
}

function Apogx(speed, angle, g) {
    return ((speed ** 2) / g) * Math.sin(angle) * Math.cos(angle);
}

function Apogy(speed, angle, height, g) {
    return height + (((speed ** 2) / (2 * g)) * ((Math.sin(angle) ** 2)));
}

function timeperiod(R, angle){
    return R / (Math.cos(angle))
}

function generate(u, angle, height, g){
    let radian_angle = (angle * Math.PI) / 180;
    let R = Rfind(u, radian_angle, height, g);
    let T = timeperiod(R, angle);

    const xcoords = [];
    const ycoords = [];

    for (let i = 0; i <= 1.02; i+=0.02){
        let x = R * i;
        let y = yfind(u, radian_angle, x, height, g)

        xcoords.push(x);
        ycoords.push(y);

    }
    const peak = {
        x: [Apogx(u, radian_angle, g)],
        y: [Apogy(u, radian_angle, height, g)]
    };
    console.log(peak)
    const data = xcoords.map((x, i) => ({ x: x, y: ycoords[i] }));
    return [data, peak];
}

function rendering(coords, peak) {
    const ctx = document.getElementById('animgraph').getContext('2d');

    console.log("peak:", peak.x, peak.y)

    const data = {
        datasets: [{
            label: 'Trajectory',
            data: coords,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.4
        }, 
        {
            label: 'Peak Point',
            data: [peak],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        }]
    };

    const options = {
        responsive: true,
        animation: {
            duration: 1000, 
            easing: 'easeInOutSine',
            x: {
                type: 'number',
                easing: 'easeInOutSine',
                from: NaN, // The `from` property is required
                delay(ctx) {
                    return ctx.type === 'data' && ctx.mode === 'default' && !ctx.dropped ? ctx.dataIndex * 50 : 0;
                }
            }
        
        },
        
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'X Coordinates'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Y Coordinates'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                align: "end"
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',
                    speed: 0.1
                },
                zoom: {
                    wheel:{
                        enabled: true
                    },
                    mode: 'xy',
                    speed: 0.1,
                    sensitivity: 3, // Adjust sensitivity as needed
                }
            }
        }
    };

    const config = {
        type: 'line',
        data: data,
        options: options
    };

    // If chart instance already exists, destroy it before creating a new one
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create the chart instance and save it to a global variable
    window.myChart = new Chart(ctx, config);

}




// Constants and functions for projectile motion, taken from inputs
var inputangle = document.querySelector("#AngleRange");
var inputu= document.querySelector("#velocity");
var inputheight= document.querySelector("#height");
var inputg = document.querySelector("#gravity");

document.getElementById("run").addEventListener("click", () => {
    let angle = parseFloat(inputangle.value);
    let u = parseFloat(inputu.value);
    let height = parseFloat(inputheight.value);
    let g = parseFloat(inputg.value);
    console.log(u, angle, height);
    let values = generate(u,angle,height,g);
    let data = values[0];
    let peak = values[1];
    console.log(data);
    console.log(peak);
    rendering(data, peak);
});
