function generate(u, angle, g, h, C, N){
    let vx = u * Math.cos(angle);
    let vy = u * Math.sin(angle);

    let dt = 0.01;
    let newg = g * -1;
    let t = 0;

    const xcoords = [0];
    const ycoords = [h];

    let x = 0;
    let y = h;

    let Nbounces = 0 

    while (Nbounces < N){
        
        x += vx * dt
        y += vy * dt + (0.5 * newg * (dt**2))

        vy += newg * dt;

        t += dt;

        if (y < 0){
            y = 0; 
            vy = (-1 * vy * C);
            Nbounces += 1;
        }

        xcoords.push(x);
        ycoords.push(y);

    }

    console.log(t)
    const data = xcoords.map((x, i) => ({ x: x, y: ycoords[i] }));
    return data
}

function rendering(coords) {
    const ctx = document.getElementById('animgraph').getContext('2d');

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
var inputres = document.querySelector('#ResRange')
var inputbounce = document.querySelector('#bounce')

document.getElementById("run").addEventListener("click", () => {
    let angle = parseFloat(inputangle.value);
    let u = parseFloat(inputu.value);
    let height = parseFloat(inputheight.value);
    let g = parseFloat(inputg.value);
    let res = parseFloat(inputres.value);
    let Nb = parseInt(inputbounce.value);
    let data = generate(u,angle,g, height, res, Nb);
    rendering(data);
});