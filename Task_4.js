function yfind(speed, angle, x, height, g) {
    return height + (x * Math.tan(angle)) - ((g / (2 * (speed ** 2))) * (1 + (Math.tan(angle) ** 2)) * (x ** 2));
}

function Apogx(speed, angle, g) {
    return ((speed ** 2) / g) * Math.sin(angle) * Math.cos(angle);
}

function Apogy(speed, angle, height, g) {
    return height + (((speed ** 2) / (2 * g)) * ((Math.sin(angle) ** 2)));
}

function Rmax(height, speed, g) {
    return ((speed ** 2) / g) * Math.sqrt(1 + (2 * g * height) / (speed ** 2));
}

function thetamax(height, speed, g) {
    return Math.asin(1 / Math.sqrt(2 + (2 * g * height) / (speed ** 2)));
}

function Rfind(speed, angle, height, g) {
    return Math.abs((speed ** 2 / g) * ((Math.sin(angle) * Math.cos(angle)) + (Math.cos(angle) * Math.sqrt((Math.sin(angle) ** 2) + ((2 * g * height) / (speed ** 2))))));
}

function generate(u,angle,g,h){

    let radian_angle = (angle * Math.PI) / 180;

    // Normal Trajectory 

    let Rnorm = Rfind(u,radian_angle,h,g)
    const xcoordsn = [];
    const ycoordsn = [];

    // Maximised Trajectory 

    let Rmaxi = Rmax(h,u,g)
    let maxangle = thetamax(h,u,g)
    let maxdangle = maxangle * (180 / Math.PI)
    
    const xcoordsm = [];
    const ycoordsm = [];

    for (let i = 0; i <= 1; i+=0.02){
        
        let x_n = i * Rnorm
        let x_m = i * Rmaxi

        xcoordsn.push(x_n)
        xcoordsm.push(x_m)

        let y_n = yfind(u, radian_angle,x_n,h,g)
        let y_m = yfind(u, maxangle, x_m, h,g)

        ycoordsn.push(y_n)
        ycoordsm.push(y_m)

    }

    const peakn = {
        x: Apogx(u, radian_angle, g),
        y: Apogy(u, radian_angle, h, g)
    };

    const peakm = {
        x: Apogx(u, maxangle, g),
        y: Apogy(u, maxangle, h, g)
    };

    const datan = xcoordsn.map((x, i) => ({ x: x, y: ycoordsn[i] }));
    const datam = xcoordsm.map((x, i) => ({ x: x, y: ycoordsm[i] }));

    return [datam, datan, peakm, peakn];
}

function rendering(coordsmax, coordsnorm, peakmax, peaknorm) {
    const ctx = document.getElementById('animgraph').getContext('2d');

    const data = {
        datasets: [{
            label: 'Max Range',
            data: coordsmax,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.4
        },
        {
            label: 'Normal',
            data: coordsnorm,
            borderColor: 'rgba(55, 55, 55, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(55, 55, 55, 1)',
            fill: false,
            tension: 0.4
        },
        {
            label: 'Peak Max Range',
            data: [peakmax],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        },
        {
            label: 'Peak Normal',
            data: [peaknorm],
            borderColor: 'rgba(215, 199, 22, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(215, 199, 22, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        }
    ]
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
                    return ctx.type === 'data' && ctx.mode === 'default' && !ctx.dropped ? ctx.dataIndex * 10 : 0;
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
    let angle = parseFloat(inputangle.value)
    let u = parseFloat(inputu.value);
    let height = parseFloat(inputheight.value);
    let g = parseFloat(inputg.value);
    let maps = generate(u,angle,g, height);
    let datamax = maps[0];
    let datanorm = maps[1];
    let peakmax = maps[2];
    let peaknorm = maps[3];
    rendering(datamax, datanorm, peakmax, peaknorm);
});