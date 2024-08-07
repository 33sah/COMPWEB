function xfind(speed, angle, time) {
    return speed * Math.cos(angle) * time;
}

function yfind(speed, angle, time, height, g) {
    return height + (speed * Math.sin(angle) * time) + (0.5 * g * Math.pow(time, 2));
}

function vfind(speed, angle, time, g){
    let vx = speed * Math.cos(angle)
    let vy = (speed * Math.sin(angle)) + (g * time)
    return Math.sqrt((vx**2) + (vy**2))
}

function rendering(coords, velocities){
    const ctx = document.getElementById('animgraph').getContext('2d');


    const data = {
        datasets: [{
            label: 'Trajectory',
            data: coords,
            borderColor: '#37474f',
            backgroundColor: '#37474f',
            pointRadius: 3,
            pointBackgroundColor: '#37474f',
            fill: false,
            tension: 0.4
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
                    return ctx.type === 'data' && ctx.mode === 'default' && !ctx.dropped ? ctx.dataIndex * 30 : 0;
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
            tooltip: {
                callbacks: {
                    label: function(context) {
                        // Get the data index
                        const index = context.dataIndex;
                        // Get the corresponding velocity value
                        const velocity = velocities[index];
                        // Return the tooltip label
                        return `Y: ${context.raw.y}, Velocity: ${velocity}`;
                    }
                }
            },
            
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



function generate(u, angle, height, g) {
    const newg = -1 * g;
    let radianAngle = angle * Math.PI / 180;
    const xcoords = [];
    const ycoords = [];
    const velocity = [];
    let time = 0, interval = 0.01;

    while (yfind(u, radianAngle, time, height, newg) >= 0) {
        let x = xfind(u, radianAngle, time);
        let y = yfind(u, radianAngle, time, height, newg);
        let v = vfind(u, radianAngle, time, g)
        xcoords.push(x);
        ycoords.push(y);
        velocity.push(v)
        time += interval;
    }

    // Putting information to the DOM

    const displayvalues = document.getElementById("DisplayValues")

    displayvalues.innerHTML = "";

    displayvalues.innerHTML = `<table class="table table-success table-striped">
        <thead>
            <tr>
                <th scope="col">Plot</th>
                <th scope="col">Range (m)</th>
                <th scope="col">Time of Flight (s)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td> Time Step </td>
                <td>${Math.max(...xcoords)}</td>
                <td>${time}</td>
            </tr>
        </tbody>
</table>`;


    // Data transformation for d3.js
    const data = xcoords.map((x, i) => ({ x: x, y: ycoords[i] }));
    return [data, velocity];
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
    let stuff = generate(u,angle,height, g);
    let coords = stuff[0];
    let vel = stuff[1];

    console.log(coords, vel)

    rendering(coords, vel)
});

