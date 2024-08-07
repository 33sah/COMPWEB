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

function quadratic_solve(A, B, C) {
    const discriminant = (B**2) - (4 * A * C);

    if (discriminant > 0) {
        const Answer1 = Math.atan((-B + Math.sqrt(discriminant)) / (2 * A));
        console.log(`Answer 1 is ${Answer1}`);

        const Answer2 = Math.atan((-B - Math.sqrt(discriminant)) / (2 * A));
        console.log(`Answer 2 is ${Answer2}`);

        return [Math.max(Answer1, Answer2), Math.min(Answer1, Answer2)];
    } 
    
    else if (discriminant == 0) {
        const Answer = Math.atan(-B / (2 * A));
        console.log(`Answer 3 is ${Answer}`);

        return [Answer];
    }

    else if (discriminant < 0) {
        console.log("No real solutions")
        let message = "No real solutions";
    }


    // Solve quadratic for finding the correct angle. 
}

function generate(X,Y,u,g,h){

    // Finding minimum speed and appropriate angle required to hit the point. 

    let minlspeed = Math.sqrt(g) * (Math.sqrt(Y + Math.sqrt(X**2 + Y**2)));
    let minrangle = Math.atan((Y + Math.sqrt(X**2 + Y**2))/(X));
    let mindangle = minrangle * (180 / Math.PI);

    // Variables for quadratic to solve for high and low ball given a launch velocity.

    let A = (g)/(2*u**2) * X**2;
    let B = - X;
    let C = Y - h + ((g*(X**2)) / (2 * (u**2)));

    let results = quadratic_solve(A,B,C);

    console.log(A,B,C, results)

    const xcoordsmin = [];
    const xcoords1 = [];

    const ycoordsmin = []; 
    const ycoords1 = [];

    if (results.length == 2){
        const xcoords2 = [];
        const ycoords2 = [];

        for (let i = 0; i <= 1.02; i+=0.02){
        
            let x = X * i;
            let ymin = yfind(minlspeed, minrangle, x, h, g)
            let y1 = yfind(u, results[0], x, h, g)
            let y2 = yfind(u, results[1], x, h, g)

            xcoordsmin.push(x);
            xcoords1.push(x);
            xcoords2.push(x);

            ycoordsmin.push(ymin);
            ycoords1.push(y1)
            ycoords2.push(y2)
        }

        const datamin = xcoordsmin.map((x, i) => ({ x: x, y: ycoordsmin[i] }));
        const data1 = xcoords1.map((x, i) => ({ x: x, y: ycoords1[i] }));
        const data2 = xcoords2.map((x, i) => ({ x: x, y: ycoords2[i] }));

        const peakmin = {
            x: Apogx(minlspeed, minrangle, g),
            y: Apogy(minlspeed, minrangle, h, g)
        };
    
        const peak1 = {
            x: Apogx(u, results[0], g),
            y: Apogy(u, results[0], h, g)
        };

        const peak2 = {
            x: Apogx(u, results[1], g),
            y: Apogy(u, results[1], h, g)
        };

        const displayvalues = document.getElementById("DisplayValues")

        displayvalues.innerHTML = "";

        displayvalues.innerHTML = `<table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">Plot</th>
                    <th scope="col">Angle (Degrees)</th>
                    <th scope="col">Speed (<math> <msup> <mi>𝐦𝐬</mi> <mn>-1</mn></msup> </math>) </th>
                    <th scope="col">Peak X Coordinate (m) </th>
                    <th scope="col">Peak Y Coordinate (m) </th>
                    <th scope="col">Time of Flight (s) </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> Minimum Speed </td>
                    <td>${mindangle}</td>
                    <td>${minlspeed}</td>
                    <td>${peakmin.x}}</td>
                    <td>${peakmin.y}</td>
                    <td>${X / (Math.cos(minrangle) * minlspeed) }</td>
                </tr>
                <tr>
                    <td> ${chooselabel(results, 0)} Ball </td>
                    <td> ${results[0] * (180 / Math.PI)} </td>
                    <td>${u}</td>
                    <td>${peak1.x}}</td>
                    <td>${peak1.y}</td>
                    <td>${X / (Math.cos(results[0]) * u) }</td>

                </tr>
                <tr>
                    <td> ${chooselabel(results, 1)} Ball </td>
                    <td>${results[1] * (180 / Math.PI)}</td>
                    <td>${u}</td>
                    <td>${peak2.x}}</td>
                    <td>${peak2.y}</td>
                    <td>${X / (Math.cos(results[1]) * u) }</td>
                </tr>
            </tbody>
        </table>`;

        return [datamin, data1, data2, peakmin, peak1, peak2, results];
    }

    else { 

        for (let i = 0; i <= 1; i+=0.02){
        
            let x = X * i;
            let ymin = yfind(minlspeed, minrangle, x, h, g)
            let y1 = yfind(u, results[0], x, h, g)

            xcoordsmin.push(x);
            xcoords1.push(x);

            ycoordsmin.push(ymin);
            ycoords1.push(y1)

            const datamin = xcoordsmin.map((x, i) => ({ x: x, y: ycoordsmin[i] }));
            const data1 = xcoords1.map((x, i) => ({ x: x, y: ycoords1[i] }));
        }

        const peakmin = {
            x: Apogx(u, minrangle, g),
            y: Apogy(u, minrangle, h, g)
        };
    
        const peak1 = {
            x: Apogx(u, results[0], g),
            y: Apogy(u, results[0], h, g)
        };

        const displayvalues = document.getElementById("DisplayValues")

        displayvalues.innerHTML = "";

        displayvalues.innerHTML = `<table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">Plot</th>
                    <th scope="col">Angle (Degrees)</th>
                    <th scope="col">Speed (<math> <msup> <mi>𝐦𝐬</mi> <mn>-1</mn></msup> </math>) </th>
                    <th scope="col">Peak X Coordinate (m) </th>
                    <th scope="col">Peak Y Coordinate (m) </th>
                    <th scope="col">Time of Flight (s) </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> Minimum Speed </td>
                    <td>${mindangle}</td>
                    <td>${minlspeed}</td>
                    <td>${peakmin.x}}</td>
                    <td>${peakmin.y}</td>
                    <td>${X / (Math.cos(minrangle) * minlspeed) }</td>
                </tr>
                <tr>
                    <td> Bounding Parabola; Rare Edge Case </td>
                    <td> ${results[0] * (180 / Math.PI)} </td>
                    <td>${u}</td>
                    <td>${peak1.x}}</td>
                    <td>${peak1.y}</td>
                    <td>${X / (Math.cos(results[0]) * u) }</td>
                </tr>
            </tbody>
        </table>`;


        return [datamin, data1, peakmin, peak1, results];
    }


}

function chooselabel(results, index){
    if (results.indexOf(Math.max(...results)) == index){
        return 'High'
    }

    else {
        return 'Low'
    }
}

function renderingif1(datamin, data1, peakmin, peak1, target){
    const ctx = document.getElementById('animgraph').getContext('2d');

    const data = {
        datasets: [{
            label: 'Minimum Speed',
            data: datamin,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.4
        },
        {
            label: 'Bounding Parabola: Rare Edge Case',
            data: data1,
            borderColor: 'rgba(55, 55, 55, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(55, 55, 55, 1)',
            fill: false,
            tension: 0.4
        },
        {
            label: 'Peak Minimum Speed',
            data: [peakmin],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        },
        {
            label: 'Peak Bounding Parabola',
            data: [peak1],
            borderColor: 'rgba(215, 199, 22, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(215, 199, 22, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        },
        {
            label: 'Target',
            data: [target],
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

function renderingif2(datamin, data1, data2, peakmin, peak1, peak2, results, target){
    const ctx = document.getElementById('animgraph').getContext('2d');

    const data = {
        datasets: [{
            label: 'Minimum Speed',
            data: datamin,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.4
        },
        {
            label: `${chooselabel(results, 1)} Ball`,
            data: data1,
            borderColor: 'rgba(55, 55, 55, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(55, 55, 55, 1)',
            fill: false,
            tension: 0.4
        },
        {
            label: `${chooselabel(results, 2)} Ball`,
            data: data2,
            borderColor: 'rgba(55, 55, 55, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(55, 55, 55, 1)',
            fill: false,
            tension: 0.4
        },
        {
            label: 'Peak Minimum Speed',
            data: [peakmin],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        },
        {
            label: `Peak ${chooselabel(results, 1)} Ball`,
            data: [peak1],
            borderColor: 'rgba(215, 199, 22, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(215, 199, 22, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        },
        {
            label: `Peak ${chooselabel(results, 1)} Ball`,
            data: [peak2],
            borderColor: 'rgba(215, 199, 22, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(215, 199, 22, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        },
        {
            label: 'Target',
            data: [target],
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
var inputu= document.querySelector("#velocity");
var inputheight= document.querySelector("#height");
var inputg = document.querySelector("#gravity");
var inputx = document.querySelector("#xx");
var inputy = document.querySelector("#yy");

document.getElementById("run").addEventListener("click", () => {
    let u = parseFloat(inputu.value);
    let height = parseFloat(inputheight.value);
    let g = parseFloat(inputg.value);
    let X = parseFloat(inputx.value);
    let Y = parseFloat(inputy.value);

    console.log(u, X, Y, g, height);
    let values = generate(X,Y,u,g,height) 

    let target = {
        x: X,
        y: Y
    }
    
    console.log((values[values.length - 1].length == 2))
    if (values[values.length - 1].length == 2){
        renderingif2(values[0], values[1], values[2], values[3], values[4], values[5], values[6], target);
    }

    else {
        renderingif1(values[0], values[1], values[2], values[3], target);
    }
    
});