function rangefind(speed, t, angle, g){
    return Math.sqrt(((speed**2) * (t**2)) - (g * (t**3) * speed * Math.sin(angle)) + (0.25 * (g**2) * (t**4)));
}

function maxmintime(speed, angle, g){
    if (angle > Math.asin(2 * (Math.sqrt(2) / 3))){

        let result1 = (((3 * speed) / (2 * g)) * (Math.sin(angle) + Math.sqrt((Math.sin(angle)**2) - (8/9))));
        let result2 = (((3 * speed) / (2 * g)) * (Math.sin(angle) - Math.sqrt((Math.sin(angle)**2) - (8/9))));

        return [result1, result2];

    }

    else if (angle == Math.asin(2 * (Math.sqrt(2) / 3))){
        
        return [(((3 * speed) / (2 * g)) * (Math.sin(angle)))];
    }

    else {
        console.log("Error???")
    }

}

function maxminposition(speed, angle, time, g){
    let maxx = speed * Math.cos(angle) * time
    let maxy = (speed * Math.sin(angle) * time) - (0.5 * g * (time**2)) 

    return [maxx, maxy];
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

function generate(u, angle, g){
    // Time range plot

    const rcoords = [];
    const times = [];

    for (let t = 0; t <= 3.01; t+=0.01){
        
        let r = rangefind(u, t, angle, g)

        times.push(t);
        rcoords.push(r);

    }

    // x,y position plot 

    const xcoords = [];
    const ycoords = [];

    let Rx = Rfind(u, angle, 0, g)

    for (let i = 0; i <= 1.01; i+=0.01){
        let x = i * Rx
        let y = yfind(u, angle, x, 0, g)

        xcoords.push(x)
        ycoords.push(y)

    }

    const datapos = xcoords.map((x, i) => ({ x: x, y: ycoords[i] }));
    const timedata = times.map((x, i) => ({ x: x, y: rcoords[i] }));

    let maxmin = maxmintime(u, angle, g)
    
    if (maxmin.length == 1){
        const time1 = {
            x: maxmin[0],
            y: rangefind(u,maxmin[0], angle, g)
        }

        let maxminpos = maxminposition(u, angle, maxmin[0],g)

        const pos1 = {
            x: maxminpos[0],
            y: maxminpos[1]
        }
        `<table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">Plot</th>
                    <th scope="col">Range (m)</th>
                    <th scope="col">Time of Flight (s)</th>
                    <th scope="col"> Maximum / Minimum X (m) </th>
                    <th scope="col"> Maximum / Minimum Y (m) </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> Position Plot </td>
                    <td>${Rx}</td>
                    <td>${Rx / (u * Math.cos(angle))}</td>
                    <td>${pos1.x}}</td>
                    <td>${pos1.y}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">Plot</th>
                    <th scope="col"> Maximum / Minimum Time (s) </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> Range-Time Plot </td>
                    <td>${maxmin[0]}}</td>
                </tr>
            </tbody>
        </table>`;

        return [datapos, timedata, time1, pos1, maxmin]

    }

    else if (maxmin.length == 2){
        const time1 = {
            x: maxmin[0],
            y: rangefind(u,maxmin[0], angle, g)
        }

        const time2 = {
            x: maxmin[1],
            y: rangefind(u,maxmin[1], angle, g)
        }

        let maxminpos = maxminposition(u, angle, maxmin[0],g)

        const pos1 = {
            x: maxminpos[0],
            y: maxminpos[1]
        }

        let maxminpos2 = maxminposition(u, angle, maxmin[1],g)

        const pos2 = {
            x: maxminpos2[0],
            y: maxminpos2[1]
        }

        const displayvalues = document.getElementById("DisplayValues")

        displayvalues.innerHTML = "";

        displayvalues.innerHTML = `<table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">Plot</th>
                    <th scope="col">Range (m)</th>
                    <th scope="col">Time of Flight (s)</th>
                    <th scope="col">${getname(maxmin, 0)} X (m) </th>
                    <th scope="col">${getname(maxmin, 0)} Y (m) </th>
                    <th scope="col">${getname(maxmin, 1)} X (m) </th>
                    <th scope="col">${getname(maxmin, 1)} Y (m) </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> Position Plot </td>
                    <td>${Rx}</td>
                    <td>${Rx / (u * Math.cos(angle))}</td>
                    <td>${pos1.x}}</td>
                    <td>${pos1.y}</td>
                    <td>${pos2.x}}</td>
                    <td>${pos2.y}</td>

                </tr>
            </tbody>
        </table>
        <table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">Plot</th>
                    <th scope="col">${getname(maxmin, 0)} Time (s) </th>
                    <th scope="col">${getname(maxmin, 1)} Time (s) </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> Range-Time Plot </td>
                    <td>${maxmin[0]}}</td>
                    <td>${maxmin[1]}</td>

                </tr>
            </tbody>
        </table>`;

        return [datapos, timedata, time1, time2, pos1, pos2, maxmin]

    }
}




function getname(maxmin, index){
    if (maxmin.indexOf(Math.max(...maxmin)) == index){
        return 'Maximum'
    }
    else {
        return 'Minimum'
    }
}

function renderingif1(datapos, timedata, time1, pos1, maxmin){
    const ctx = document.getElementById('animgraph').getContext('2d');


    const dataposi = {
        datasets: [{
            label: 'Trajectory',
            data: datapos,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.4
        }, 
        {
            label: 'Maximum / Minimum Point',
            data: [pos1],
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
        data: dataposi,
        options: options
    };

    const ctx2 = document.getElementById('timeplot').getContext('2d');

    const datatime = {
        datasets: [{
            label: 'Range Function',
            data: timedata,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.4
        }, 
        {
            label: 'Maximum / Minimum Point',
            data: [time1],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        }]
    };

    const optionstime = {
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

    const configtime = {
        type: 'line',
        data: datatime,
        options: options
    };

    // If chart instance already exists, destroy it before creating a new one
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create the chart instance and save it to a global variable
    window.myChart = new Chart(ctx, config);
    
    if (window.myChart2){
        window.myChart2.destroy();
    }

    window.myChart2 = new Chart(ctx, configtime)

}

function renderingif2(datapos, timedata, time1, time2, pos1, pos2, maxmin){
    const ctx = document.getElementById('animgraph').getContext('2d');


    const dataposi = {
        datasets: [{
            label: 'Trajectory',
            data: datapos,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.4
        }, 
        {
            label: `${getname(maxmin, 0)} Point`,
            data: [pos1],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        },
        {
            label: `${getname(maxmin, 1)} Point`,
            data: [pos2],
            borderColor: 'rgba(25, 99, 132, 1)',
            backgroundColor: 'rgba(25, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(25, 99, 132, 1)',
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
        data: dataposi,
        options: options
    };

    const ctx2 = document.getElementById('timeplot').getContext('2d');

    const datatime = {
        datasets: [{
            label: 'Range Function',
            data: timedata,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 75, 75, 0.2)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.4
        }, 
        {
            label: `${getname(maxmin, 0)} Point`,
            data: [time1],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        },
        {
            label: `${getname(maxmin, 1)} Point`,
            data: [time2],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            showLine: true,
            type: 'scatter'
        }]
    };

    const optionstime = {
        responsive: true,
        animation: {
            duration: 1000, 
            easing: 'easeInOutSine',
            x: {
                type: 'number',
                easing: 'easeInOutSine',
                from: NaN, // The `from` property is required
                delay(ctx) {
                    return ctx.type === 'data' && ctx.mode === 'default' && !ctx.dropped ? ctx.dataIndex * 20 : 0;
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

    const configtime = {
        type: 'line',
        data: datatime,
        options: optionstime
    };

    // If chart instance already exists, destroy it before creating a new one
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create the chart instance and save it to a global variable
    window.myChart = new Chart(ctx, config);
    
    if (window.myChart2){
        window.myChart2.destroy();
    }

    window.myChart2 = new Chart(ctx2, configtime)
}

// Constants and functions for projectile motion, taken from inputs
var inputu= document.querySelector("#velocity");
var inputangle= document.querySelector("#AngleRange");
var inputg = document.querySelector("#gravity");

document.getElementById("run").addEventListener("click", () => {
    let u = parseFloat(inputu.value);
    let g = parseFloat(inputg.value);
    let angle = parseFloat(inputangle.value) * (Math.PI / 180);

    let values = generate(u, angle, g) 

    console.log(values)
    
    if (values[values.length - 1].length == 2){
        renderingif2(values[0], values[1], values[2], values[3], values[4], values[5], values[6]);
    }

    else {
        renderingif1(values[0], values[1], values[2], values[3], values[4]);
    }
    
});