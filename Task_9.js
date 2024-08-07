function velocity(vx, vy){
    return Math.sqrt(vx**2 + vy**2)
}

function drag(vp, v, CD, CSA, AD, mass){
    return ((-0.5 * vp * v * CD * CSA * AD) / mass )
}

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

function generate(u, angle, h, g, CD, CSA, AD, mass){
    let vx = u * Math.cos(angle);
    let vy = u * Math.sin(angle);

    let dt = 0.01;
    let newg = g * -1;
    let t = 0;

    const xcoords = [0];
    const ycoords = [h];

    let x = 0;
    let y = h;


    while (y >= 0){
        let v = velocity(vx,vy);
        
        let ax = drag(vx, v, CD, CSA, AD, mass)
        let ay = (newg + drag(vy, v, CD, CSA, AD, mass))

        x += vx * dt + (0.5 * ax * (dt**2))
        y += vy * dt + (0.5 * ay * (dt**2))
        
        vx += ax * dt
        vy += ay * dt;

        t += dt;

        xcoords.push(x);
        ycoords.push(y);

    }

    let Rair = Math.max(...xcoords)
    let Peakyair = Math.max(...ycoords)
    let Peakxair = xcoords[ycoords.indexOf(Peakyair)]

    let R = Rfind(u, angle, h, g);
    let T = timeperiod(R, angle);

    const xcoordsnorm = [];
    const ycoordsnorm = [];

    for (let i = 0; i <= 1.02; i+=0.02){
        let xnorm = R * i;
        let ynorm = yfind(u, angle, xnorm, h, g)

        xcoordsnorm.push(xnorm);
        ycoordsnorm.push(ynorm);

    }
    const peak = {
        x: [Apogx(u, angle, g)],
        y: [Apogy(u, angle, h, g)]
    };

    const peakair = {
        x: Peakxair,
        y: Peakyair
    };

    console.log(t)
    const data = xcoords.map((x, i) => ({ x: x, y: ycoords[i] }));
    const datanorm = xcoordsnorm.map((x, i) => ({ x: x, y: ycoordsnorm[i] }));

    console.log(data, datanorm, peak, "Peakair:", peakair)

    const displayvalues = document.getElementById("DisplayValues")

    displayvalues.innerHTML = "";

    displayvalues.innerHTML = `<table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">Plot</th>
                    <th scope="col">Angle (Degrees)</th>
                    <th scope="col">Range (m) </th>
                    <th scope="col">Time of Flight (s)</th>
                    <th scope="col">Time Step (s)</th>
                    <th scope="col">Peak X Coordinate (m) </th>
                    <th scope="col">Peak Y Coordinate (m) </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> Analytical Model </td>
                    <td>${Math.round(angle * (180 / Math.PI) * 100) / 100}</td>
                    <td>${R}</td>
                    <td>${T}</td>
                    <td> No time step </td>
                    <td> ${peak.x} </td>
                    <td> ${peak.y} </td>
                </tr>
                <tr>
                    <td> Air Resistance </td>
                    <td>${Math.round(angle * (180 / Math.PI) * 100) / 100}</td>
                    <td>${Rair}</td>
                    <td>${t}</td>
                    <td>${dt}</td>
                    <td> ${peakair.x} </td>
                    <td> ${peakair.y} </td>
                </tr>
            </tbody>
        </table>`;

    return [data, datanorm, peak, peakair]
}


function rendering(coords, coordsnorm, peak, peakair) {
    const ctx = document.getElementById('animgraph').getContext('2d');

    const data = {
        datasets: [{
            label: 'Air Resistance',
            data: coords,
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
            label: 'Peak Air Resistance',
            data: [peakair],
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
            data: [peak],
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
var inputdragcoeff = document.querySelector('#DCRange')
var inputdensity = document.querySelector('#density')
var inputmass = document.querySelector('#mass')
var inputcsa = document.querySelector('#csa')

document.getElementById("run").addEventListener("click", () => {
    let angle = parseFloat(inputangle.value) * (Math.PI / 180);
    let u = parseFloat(inputu.value);
    let height = parseFloat(inputheight.value);
    let g = parseFloat(inputg.value);
    let dragcoeff = parseFloat(inputdragcoeff.value);
    let density = parseFloat(inputdensity.value);
    let mass = parseFloat(inputmass.value);
    let csa = parseFloat(inputcsa.value);
    let maps = generate(u,angle,height,g,dragcoeff, csa, density, mass);
    let dataair = maps[0];
    let datanorm = maps[1];
    let peaknorm = maps[2];
    let peakair = maps[3];
    rendering(dataair, datanorm, peaknorm, peakair);
});