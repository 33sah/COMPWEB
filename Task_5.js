function boundingParabola(speed, x, height, g) {
    return ((speed ** 2 / (2 * g)) - ((g / (2 * speed ** 2)) * (x ** 2)) + height);
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

function Rmax(height, speed, g) {
    return ((speed ** 2) / g) * Math.sqrt(1 + (2 * g * height) / (speed ** 2));
}

function thetamax(height, speed, g) {
    return Math.asin(1 / Math.sqrt(2 + (2 * g * height) / (speed ** 2)));
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Red
    const g = Math.floor(Math.random() * 256); // Green
    const b = Math.floor(Math.random() * 256); // Blue
    const a = Math.random().toFixed(2); // Alpha (0.0 to 1.0)

    return `rgba(${r}, ${g}, ${b}, ${a})`;
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

    // Max Range and Angle

    let maxangle = thetamax(h,u,g)
    let maxdangle = maxangle * (180 / Math.pi)
    
    // Finding minimum speed and appropriate angle required to hit the point. 

    let minlspeed = Math.sqrt(g) * (Math.sqrt(Y + Math.sqrt(X**2 + Y**2)));
    let minrangle = Math.atan((Y + Math.sqrt(X**2 + Y**2))/(X));
    let mindangle = minrangle * (180 / Math.pi);

    // Variables for quadratic to solve for high and low ball given a launch velocity.

    let A = (g)/(2*u**2) * X**2;
    let B = - X;
    let C = Y - h + ((g*(X**2)) / (2 * (u**2)));

    let results = quadratic_solve(A,B,C);

    // Max ranges to know distance to plot
    let R1 = Rfind(u, results[0],h,g);
    let Rmin = Rfind(minlspeed, minrangle, h, g);
    let Rmaxi = Rmax(h,u,g);

    const xcoordsmax =[];
    const xcoordsmin = [];
    const xcoords1 = [];

    const ycoordsmax = [];
    const ycoordsmin = []; 
    const ycoords1 = [];
    const ycoordsbound = [];

    if (results.length == 2){
        const xcoords2 = [];
        const ycoords2 = [];

        
        let R2 = Rfind(u,results[1],h,g);

        for (let i = 0; i <= 1; i+=0.02){
            
            let xmin = Rmin * i;
            let x1 = R1 * i;
            let x2 = R2 * i;
            let xmax = Rmaxi * i;

            let ymin = yfind(minlspeed, minrangle, xmin, h, g)
            let y1 = yfind(u, results[0], x1, h, g)
            let y2 = yfind(u, results[1], x2, h, g)
            let ymax = yfind(u, maxangle, xmax, h, g)
            let ybound = boundingParabola(u, xmax, h, g)

            xcoordsmax.push(xmax);
            xcoordsmin.push(xmin);
            xcoords1.push(x1);
            xcoords2.push(x2);

            ycoordsbound.push(ybound);
            ycoordsmax.push(ymax);
            ycoordsmin.push(ymin);
            ycoords1.push(y1)
            ycoords2.push(y2)
        }
            const datamin = xcoordsmin.map((x, i) => ({ x: x, y: ycoordsmin[i] }));
            const data1 = xcoords1.map((x, i) => ({ x: x, y: ycoords1[i] }));
            const data2 = xcoords2.map((x, i) => ({ x: x, y: ycoords2[i] }));
            const datamax = xcoordsmax.map((x, i) => ({ x: x, y: ycoordsmax[i] }));
            const databound = xcoordsmax.map((x, i) => ({ x: x, y: ycoordsbound[i] }));

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

            const peakmax = {
                x: Apogx(u, maxangle, g),
                y: Apogy(u, maxangle, h, g)
                
            };

            return [datamin, data1, data2, datamax, databound, peakmin, peak1, peak2, peakmax, results];
    }

    else { 

        for (let i = 0; i <= 1; i+=0.02){
        
            let xmin = Rmin * i;
            let x1 = R1 * i;
            let xmax = Rmaxi * i;

            let ymin = yfind(minlspeed, minrangle, xmin, h, g);
            let y1 = yfind(u, results[0], x1, h, g);
            let ymax = yfind(u, maxangle, xmax, h, g);
            let ybound = boundingParabola(u, xmax, h, g);

            xcoordsmin.push(xmin);
            xcoords1.push(x1);
            xcoordsmax.push(xmax);

            ycoordsbound.push(ybound);
            ycoordsmax.push(ymax);
            ycoordsmin.push(ymin);
            ycoords1.push(y1)
        }

        const datamin = xcoordsmin.map((x, i) => ({ x: x, y: ycoordsmin[i] }));
        const data1 = xcoords1.map((x, i) => ({ x: x, y: ycoords1[i] }));
        const datamax = xcoordsmax.map((x, i) => ({ x: x, y: ycoordsmax[i] }));
        const databound = xcoordsmax.map((x, i) => ({ x: x, y: ycoordsbound[i] }));

        const peakmin = {
            x: Apogx(minlspeed, minrangle, g),
            y: Apogy(minlspeed, minrangle, h, g)
        };

        const peak1 = {
            x: Apogx(u, results[0], g),
            y: Apogy(u, results[0], h, g)
        };

        const peakmax = {
            x: Apogx(u, maxangle, g),
            y: Apogy(u, maxangle, h, g)
        };

            return [datamin, data1, datamax, databound, peakmin, peak1, peakmax];
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

function renderingif1(datamin, data1, datamax, databound, peakmin, peak1, peakmax, target){
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
            label: 'Bounding Parabola Trajectory: Rare Edge Case',
            data: data1,
            borderColor: 'rgba(55, 55, 55, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(55, 55, 55, 1)',
            fill: false,
            tension: 0.4
        },
        {
            label: 'Actual Bounding Parabola',
            data: databound,
            borderColor: 'rgba(55, 55, 55, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(55, 55, 55, 1)',
            fill: false,
            tension: 0.4
        },
        {
            label: 'Maximum Range',
            data: datamax,
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
            label: 'Peak Max Range',
            data: [peakmax],
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

function renderingif2(datamin, data1, data2, datamax, databound, peakmin, peak1, peak2, peakmax, results, target){
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
            label: 'Actual Bounding Parabola',
            data: databound,
            borderColor: 'rgba(55, 55, 55, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(55, 55, 55, 1)',
            fill: false,
            tension: 0.4
        },
        {
            label: 'Maximum Range',
            data: datamax,
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
            label: 'Peak Max Range',
            data: [peakmax],
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
    };
    
    console.log((values[values.length - 1].length == 2))
    if (values[values.length - 1].length == 2){
        renderingif2(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], target);
    }

    else {
        renderingif1(values[0], values[1], values[2], values[3], values[4], values[5], values[6],target);
    }
    
});