function integralFunction(z) {
    return (0.5 * Math.log(Math.abs(Math.sqrt(1 + z ** 2) + z))) + (0.5 * z * Math.sqrt(1 + z ** 2));
}

function totalDistance(speed, angle, X, g) {
    const multiplicationFactor = ((speed ** 2) / (g * (1 + (Math.tan(angle) ** 2))));
    const sub1 = Math.tan(angle);
    const sub2 = Math.tan(angle) - (((g * X) / (speed ** 2)) * (1 + (Math.tan(angle) ** 2)));
    return (multiplicationFactor * (integralFunction(sub1) - integralFunction(sub2)));
}

function Rmax(height, speed, g) {
    return ((speed ** 2) / g) * Math.sqrt(1 + (2 * g * height) / (speed ** 2));
}

function thetamax(height, speed, g) {
    return Math.asin(1 / Math.sqrt(2 + (2 * g * height) / (speed ** 2)));
}

function yfind(speed, angle, x, height, g) {
    return height + (x * Math.tan(angle)) - ((g / (2 * (speed ** 2))) * (1 + (Math.tan(angle) ** 2)) * (x ** 2));
}

function Apogx(speed, angle, g) {
    return ((speed ** 2) / g) * Math.sin(angle) * Math.cos(angle);
}

function Apogy(speed, angle, height, g) {
    return height + (((speed ** 2) / (2 * g)) * ((Math.sin(angle) ** 2)));
}

function Rfind(speed, angle, height, g) {
    return Math.abs((speed ** 2 / g) * ((Math.sin(angle) * Math.cos(angle)) + (Math.cos(angle) * Math.sqrt((Math.sin(angle) ** 2) + ((2 * g * height) / (speed ** 2))))));
}

function generate(u,angle,g,h){
    let Rmaxi = Rmax(h,u,g)
    let Rnorm = Rfind(u, angle, h, g)

    let maxangle = thetamax(h, u, g)
    let maxdangle = maxangle * (180 / Math.PI)

    const peakn = {
        x: [Apogx(u, angle, g)],
        y: [Apogy(u, angle, h, g)]
    };

    const peakmax = {
        x: [Apogx(u, maxangle, g)],
        y: [Apogy(u, maxangle, h, g)]
    }

    const xcoordsn = []; 
    const xcoordsmax = [];

    const ycoordsn = [];
    const ycoordsmax = [];

    let sn = totalDistance(u, angle, Rnorm, g);
    let smax = totalDistance(u, maxangle, Rmaxi, g);

    console.log(sn, smax)

    for (let i = 0; i <= 1.02; i+=0.02){
        let xn = Rnorm * i;
        let xmax = Rmaxi * i;

        let yn = yfind(u, angle, xn, h, g);
        let ymax = yfind(u, maxangle, xmax, h, g)

        xcoordsn.push(xn);
        ycoordsn.push(yn);

        xcoordsmax.push(xmax);
        ycoordsmax.push(ymax);
    }

    const datan = xcoordsn.map((x, i) => ({ x: x, y: ycoordsn[i] }));
    const datamax = xcoordsmax.map((x, i) => ({ x: x, y: ycoordsmax[i] }));

    const displayvalues = document.getElementById("DisplayValues")

    displayvalues.innerHTML = "";

    displayvalues.innerHTML = `<table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">Plot</th>
                    <th scope="col">Angle (Degrees)</th>
                    <th scope="col"> Range (m) </th>
                    <th scope="col">Time of Flight (s)</th>
                    <th scope="col">Distance Travelled (m)</th>
                    <th scope="col">Peak X Coordinate (m) </th>
                    <th scope="col">Peak Y Coordinate (m) </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> Normal Trajectory</td>
                    <td>${Math.round(angle * (180 / Math.PI) * 100) / 100}</td>
                    <td>${Rnorm}</td>
                    <td>${Rnorm / (u * Math.cos(angle))}</td>
                    <td> ${sn}</td>
                    <td>${peakn.x}}</td>
                    <td>${peakn.y}</td>
                </tr>
                <tr>
                    <td> Maximum Range </td>
                    <td> ${Math.round(maxdangle * 100) / 100} </td>
                    <td>${Rmaxi}</td>
                    <td>${Rmaxi / (u * Math.cos(maxangle))}</td>
                    <td> ${smax}</td>
                    <td>${peakmax.x}}</td>
                    <td>${peakmax.y}</td>
                </tr>
            </tbody>
        </table>`;

    return [datamax, datan, peakmax, peakn, sn, smax];
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
    let angle = parseFloat(inputangle.value) * (Math.PI / 180)
    let u = parseFloat(inputu.value);
    let height = parseFloat(inputheight.value);
    let g = parseFloat(inputg.value);
    let maps = generate(u,angle,g, height);
    rendering(maps[0], maps[1], maps[2], maps[3]);
});