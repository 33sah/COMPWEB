function updatepage(input){
    const injection = document.getElementById("Taskchanging")

    injection.innerHTML = ""

    switch (input) {
        case 0:
            injection.innerHTML = `<h2 class="box-title">Tools Used</h2> 
            <div id="tools">
                <div class="card" style="width: 18rem;">
                    <img src="images/JavaScript.png" class="card-img-top" alt="Javscipt Logo">
                    <div class="card-body">
                    <h5 class="card-title">Javscript</h5>
                    <p class="card-text">Used as the main programming language for the project, with DOM manipulation and data handling being processed by it. Of course using HTML and CSS as a basis for the GUI as well.</p>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" class="btn btn-primary" style="background-color: #37474f;">Website</a>
                    </div>
                </div>

                <div class="card" style="width: 18rem;">
                    <img src="images/bootstrap.jpg" class="card-img-top" alt="Bootstrap Logo">
                    <div class="card-body">
                    <h5 class="card-title">Bootstrap</h5>
                    <p class="card-text">Contributed to the main bulk of the GUI handling and used to streamline the production process with aesthetic frontend components.</p>
                    <a href="https://getbootstrap.com/" class="btn btn-primary" style="background-color: #37474f;">Website</a>
                    </div>
                </div>

                <div class="card" style="width: 18rem;">
                    <img src="images/chartjs.svg" class="card-img-top" alt="ChartJS Logo">
                    <div class="card-body">
                    <h5 class="card-title">ChartJS</h5>
                    <p class="card-text">Used to graph all projectile trajectories with animations to simulate motion. Allows for an interactive graph that blends in with other UI components.</p>
                    <a href="https://www.chartjs.org/" class="btn btn-primary" style="background-color: #37474f;">Website</a>
                    </div>
                </div>

            </div>


            <h2 class="box-title">Task Information</h2>
            <div id="taskdescrip">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Task 1</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Time Model</h6>
                    <p class="card-text">Generic Projectile Motion model using a small time step and basic SUVAT equations.</p>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Task 2</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Analytical Model</h6>
                    <p class="card-text">Model using \(y(x)\) equations for the projectile trajectory by defining a equally spaced array of \(x\) coordinate values between \(0\) and the maximum horizontal range with the Apogee (peak). </p>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Task 3</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Target Model</h6>
                    <p class="card-text">Model defining minimum speed and "high" and "low" ball trajectories for a projectile launched from \((0,0)\) and passing through \((X,Y)\).</p>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Task 4</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Maximum Range Model</h6>
                    <p class="card-text">Model which maximises the range of the launch for given inputs \(u, \, g, \, h\).</p>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Task 5</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Bounding Parabola Model</h6>
                    <p class="card-text">Model which combines Tasks 3 and 4 but also defines a bounding parabola for the trajectories given \(u, \, g, \, h\). </p>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Task 6</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Distance Model</h6>
                    <p class="card-text">Model which calculates the distance travelled by the projectile along its trajectory. Exact computation using integration.</p>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Task 7</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Range Model</h6>
                    <p class="card-text">Model which shows the Maximum and Minimum values for range when plotted against time with launch angle \(\theta > 70.5 ^{\circ}\).</p>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Task 8</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Bounce Model </h6>
                    <p class="card-text">Model using a Verlet method with small time increment over which acceleration can be considered constant is used to model a bouncing projectile with diminishing altitude as defined by its coefficient of restitution.</p>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Task 9</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Air Resistance Model</h6>
                    <p class="card-text">Model using a Verlet method to model the effect of air resistance on the projectile's path with pressure considered as a constant relative to altitude. </p>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Extension</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">Rotating Planet and Diminshing Altitude Model</h6>
                  <p class="card-text">The diminishing altitude is simular to that of Task 9, but with functions \(g(y)\) and \(\rho(y)\) being used in place of constants \(g\) and \(\rho\) respectively. For the rotating planet model, we will be using VPython to render this and will take inputs for the Latitude, Longitude and Launch Axis in addition to previously defined parameters. The mathematical derivation behind this is outlined in our LaTeX research paper.  </p>
                </div>
              </div>
            </div>`
            break;

        case 1:
            injection.innerHTML = 
            
            `<div id = Variables>

            <div id="slidecontainer">
                <label for="AngleRange" class="form-label">Select Launch Angle (Degrees): </label>
                <input type="range" min="1" max="90" value="45" step="0.01" class="form-range" id="AngleRange">
                <output id = "AngleValue"> </output>
            </div>

            <div id="numberinputs">

                <div class="input-group mb-3" id = velocitycontainer>
                    <span class="input-group-text"> Launch Velocity:</span>
                    <input type="number" class="form-control" aria-label="Velocity" id="velocity" value="10" min="0">
                    <span class="input-group-text"><math display="block"> <msup> <mi>ms</mi> <mn>-1</mn></msup> </math></span>
                </div>

                <div class="input-group mb-3" id = heightcontainer>
                    <span class="input-group-text"> Launch Height:</span>
                    <input type="number" class="form-control" aria-label="Height" id="height" value="0" min="0">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = gcontainer>
                    <span class="input-group-text"> Gravitational Field Strength:</span>
                    <input type="number" class="form-control" aria-label="Gravity" id="gravity" value="9.81">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>ms</mi> <mn>-2</mn></msup> </math></span>
                </div>

            </div>

            <button type="button" class="btn btn-outline-dark" id="run">Run</button>

            </div>

            <div id="revealstats">
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="revealbutton">
                        Run Statistics:
                    </button>
                </p>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body" id="DisplayValues"> </div>
                </div>
            </div>

            <canvas id="animgraph"> </canvas>`;

            break;
        
        case 2:
            injection.innerHTML = 
            
            `<div id = Variables>

            <div id="slidecontainer">
                <label for="AngleRange" class="form-label">Select Launch Angle (Degrees): </label>
                <input type="range" min="1" max="90" value="45" step="0.01" class="form-range" id="AngleRange">
                <output id = "AngleValue"> </output>
            </div>

            <div id="numberinputs">

                <div class="input-group mb-3" id = velocitycontainer>
                    <span class="input-group-text"> Launch Velocity:</span>
                    <input type="number" class="form-control" aria-label="Velocity" id="velocity" value="10" min="0">
                    <span class="input-group-text"><math display="block"> <msup> <mi>ms</mi> <mn>-1</mn></msup> </math></span>
                </div>

                <div class="input-group mb-3" id = heightcontainer>
                    <span class="input-group-text"> Launch Height:</span>
                    <input type="number" class="form-control" aria-label="Height" id="height" value="0" min="0">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = gcontainer>
                    <span class="input-group-text"> Gravitational Field Strength:</span>
                    <input type="number" class="form-control" aria-label="Gravity" id="gravity" value="9.81">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>ms</mi> <mn>-2</mn></msup> </math></span>
                </div>

            </div>

            <button type="button" class="btn btn-outline-dark" id="run">Run</button>

            </div>

           <div id="revealstats">
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="revealbutton">
                        Run Statistics:
                    </button>
                </p>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body" id="DisplayValues"> </div>
                </div>
            </div>

            <canvas id="animgraph"> </canvas>`;

            break;

        case 3:
            injection.innerHTML = 
            
            `<div id = Variables>

            <div id="numberinputs">

                <div class="input-group mb-3" id = velocitycontainer>
                    <span class="input-group-text"> Launch Velocity:</span>
                    <input type="number" class="form-control" aria-label="Velocity" id="velocity" value="150" min="0">
                    <span class="input-group-text"><math display="block"> <msup> <mi>ms</mi> <mn>-1</mn></msup> </math></span>
                </div>

                <div class="input-group mb-3" id = heightcontainer>
                    <span class="input-group-text"> Launch Height:</span>
                    <input type="number" class="form-control" aria-label="Height" id="height" value="0" min="0">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = xcontainer>
                    <span class="input-group-text"> X-Coordinate of Target:</span>
                    <input type="number" class="form-control" aria-label="XX" id="xx" value="1000" min="1">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = ycontainer>
                    <span class="input-group-text"> Y-Coordinate of Target:</span>
                    <input type="number" class="form-control" aria-label="YY" id="yy" value="300" min="1">
                    <span class="input-group-text">m</span>
                </div>

            </div>

             <div class="input-group mb-3" id = gcontainer>
                    <span class="input-group-text"> Gravitational Field Strength:</span>
                    <input type="number" class="form-control" aria-label="Gravity" id="gravity" value="9.81">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>ms</mi> <mn>-2</mn></msup> </math></span>
             </div>

            <button type="button" class="btn btn-outline-dark" id="run">Run</button>

            </div>

           <div id="revealstats">
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="revealbutton">
                        Run Statistics:
                    </button>
                </p>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body" id="DisplayValues"> </div>
                </div>
            </div>

            <canvas id="animgraph"> </canvas>`;
            break;

        case 4:
            injection.innerHTML = 
            
            `<div id = Variables>

            <div id="slidecontainer">
                <label for="AngleRange" class="form-label">Select Launch Angle (Degrees): </label>
                <input type="range" min="1" max="90" value="30" step="0.01" class="form-range" id="AngleRange">
                <output id = "AngleValue"> </output>
            </div>

            <div id="numberinputs">

               <div class="input-group mb-3" id = velocitycontainer>
                    <span class="input-group-text"> Launch Velocity:</span>
                    <input type="number" class="form-control" aria-label="Velocity" id="velocity" value="10" min="0">
                    <span class="input-group-text"><math display="block"> <msup> <mi>ms</mi> <mn>-1</mn></msup> </math></span>
                </div>

                <div class="input-group mb-3" id = heightcontainer>
                    <span class="input-group-text"> Launch Height:</span>
                    <input type="number" class="form-control" aria-label="Height" id="height" value="0" min="0">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = gcontainer>
                    <span class="input-group-text"> Gravitational Field Strength:</span>
                    <input type="number" class="form-control" aria-label="Gravity" id="gravity" value="9.81">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>ms</mi> <mn>-2</mn></msup> </math></span>
                </div>

            </div>

            <button type="button" class="btn btn-outline-dark" id="run">Run</button>

            </div>

           <div id="revealstats">
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="revealbutton">
                        Run Statistics:
                    </button>
                </p>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body" id="DisplayValues"> </div>
                </div>
            </div>

            <canvas id="animgraph"> </canvas>`;
            break;

        case 5:
            injection.innerHTML = 
            
            `<div id = Variables>

            <div id="numberinputs">

                <div class="input-group mb-3" id = velocitycontainer>
                    <span class="input-group-text"> Launch Velocity:</span>
                    <input type="number" class="form-control" aria-label="Velocity" id="velocity" value="115" min="0">
                    <span class="input-group-text"><math display="block"> <msup> <mi>ms</mi> <mn>-1</mn></msup> </math></span>
                </div>

                <div class="input-group mb-3" id = heightcontainer>
                    <span class="input-group-text"> Launch Height:</span>
                    <input type="number" class="form-control" aria-label="Height" id="height" value="0" min="0">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = xcontainer>
                    <span class="input-group-text"> X-Coordinate of Target:</span>
                    <input type="number" class="form-control" aria-label="XX" id="xx" value="1000" min="1">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = ycontainer>
                    <span class="input-group-text"> Y-Coordinate of Target:</span>
                    <input type="number" class="form-control" aria-label="YY" id="yy" value="300" min="1">
                    <span class="input-group-text">m</span>
                </div>

            </div>

            <div class="input-group mb-3" id = gcontainer>
                    <span class="input-group-text"> Gravitational Field Strength:</span>
                    <input type="number" class="form-control" aria-label="Gravity" id="gravity" value="9.81">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>ms</mi> <mn>-2</mn></msup> </math></span>
            </div>
             

            <button type="button" class="btn btn-outline-dark" id="run">Run</button>

            </div>

           <div id="revealstats">
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="revealbutton">
                        Run Statistics:
                    </button>
                </p>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body" id="DisplayValues"> </div>
                </div>
            </div>

            <canvas id="animgraph"> </canvas>`;
            break;
        
        case 6:
            injection.innerHTML = 
            
            `<div id = Variables>

            <div id="slidecontainer">
                <label for="AngleRange" class="form-label">Select Launch Angle (Degrees): </label>
                <input type="range" min="1" max="90" value="30" step="0.01" class="form-range" id="AngleRange">
                <output id = "AngleValue"> </output>
            </div>

            <div id="numberinputs">

                <div class="input-group mb-3" id = velocitycontainer>
                    <span class="input-group-text"> Launch Velocity:</span>
                    <input type="number" class="form-control" aria-label="Velocity" id="velocity" value="10" min="0">
                    <span class="input-group-text"><math display="block"> <msup> <mi>ms</mi> <mn>-1</mn></msup> </math></span>
                </div>

                <div class="input-group mb-3" id = heightcontainer>
                    <span class="input-group-text"> Launch Height:</span>
                    <input type="number" class="form-control" aria-label="Height" id="height" value="0" min="0">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = gcontainer>
                    <span class="input-group-text"> Gravitational Field Strength:</span>
                    <input type="number" class="form-control" aria-label="Gravity" id="gravity" value="9.81">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>ms</mi> <mn>-2</mn></msup> </math></span>
                </div>

            </div>

            <button type="button" class="btn btn-outline-dark" id="run">Run</button>

            </div>

           <div id="revealstats">
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="revealbutton">
                        Run Statistics:
                    </button>
                </p>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body" id="DisplayValues"> </div>
                </div>
            </div>

            <canvas id="animgraph"> </canvas>`;
            break;


        case 7:
            injection.innerHTML = 
            
            `<div id = Variables>

            <div id="slidecontainer">
                <label for="AngleRange" class="form-label">Select Launch Angle (Degrees): </label>
                <input type="range" min="70.53" max="90" value="70.53" step="0.01" class="form-range" id="AngleRange">
                <output id = "AngleValue"> </output>
            </div>

            <div id="numberinputs">

               <div class="input-group mb-3" id = velocitycontainer>
                    <span class="input-group-text"> Launch Velocity:</span>
                    <input type="number" class="form-control" aria-label="Velocity" id="velocity" value="10" min="0">
                    <span class="input-group-text"><math display="block"> <msup> <mi>ms</mi> <mn>-1</mn></msup> </math></span>
                </div>

                <div class="input-group mb-3" id = heightcontainer>
                    <span class="input-group-text"> Launch Height:</span>
                    <input type="number" class="form-control" aria-label="Height" id="height" value="0" min="0">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = gcontainer>
                    <span class="input-group-text"> Gravitational Field Strength:</span>
                    <input type="number" class="form-control" aria-label="Gravity" id="gravity" value="9.81">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>ms</mi> <mn>-2</mn></msup> </math></span>
                </div>

            </div>

            <button type="button" class="btn btn-outline-dark" id="run">Run</button>

            </div>

           <div id="revealstats">
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="revealbutton">
                        Run Statistics:
                    </button>
                </p>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body" id="DisplayValues"> </div>
                </div>
            </div>

            <canvas id="animgraph"> </canvas>
            <canvas id="timeplot"> </canvas>`;
            break;
        
        case 8:
            injection.innerHTML = 
            
            `<div id = Variables>

            <div id="slidecontainer">
                <label for="AngleRange" class="form-label">Select Launch Angle (Degrees): </label>
                <input type="range" min="1" max="90" value="45" step="0.01" class="form-range" id="AngleRange">
                <output id = "AngleValue"> </output>
            </div>

            <div id="Restitution">
                <label for="ResRange" class="form-label">Select Coefficient of Restitution: </label>
                <input type="range" min="0" max="1" value="0.5" step="0.01" class="form-range" id="ResRange">
                <output id = "ResValue"> </output>
            </div>

            <div id="numberinputs">

               <div class="input-group mb-3" id = velocitycontainer>
                    <span class="input-group-text"> Launch Velocity:</span>
                    <input type="number" class="form-control" aria-label="Velocity" id="velocity" value="10" min="0">
                    <span class="input-group-text"><math display="block"> <msup> <mi>ms</mi> <mn>-1</mn></msup> </math></span>
                </div>

                <div class="input-group mb-3" id = heightcontainer>
                    <span class="input-group-text"> Launch Height:</span>
                    <input type="number" class="form-control" aria-label="Height" id="height" value="0" min="0">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = bouncecontainer>
                    <span class="input-group-text">Number of Bounces:</span>
                    <input type="number" class="form-control" aria-label="Bounce" id="bounce" value="3" min="1">
                </div>

                <div class="input-group mb-3" id = gcontainer>
                    <span class="input-group-text"> Gravitational Field Strength:</span>
                    <input type="number" class="form-control" aria-label="Gravity" id="gravity" value="9.81">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>ms</mi> <mn>-2</mn></msup> </math></span>
                </div>

            </div>

            <button type="button" class="btn btn-outline-dark" id="run">Run</button>

            </div>

           <div id="revealstats">
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="revealbutton">
                        Run Statistics:
                    </button>
                </p>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body" id="DisplayValues"> </div>
                </div>
            </div>

            <canvas id="animgraph"> </canvas>`;

            let res = document.createElement("script");
            res.src = "./res.js"

            injection.appendChild(res)
            
            break;

        case 9:
            injection.innerHTML = 
            
            `<div id = Variables>

            <div id="slidecontainer">
                <label for="AngleRange" class="form-label">Select Launch Angle (Degrees): </label>
                <input type="range" min="1" max="90" value="45" step="0.01" class="form-range" id="AngleRange">
                <output id = "AngleValue"> </output>
            </div>

            <div id="DragCoefficient">
                <label for="DCRange" class="form-label">Select Drag Coefficient: </label>
                <input type="range" min="0" max="3" value="0.5" step="0.01" class="form-range" id="DCRange">
                <output id = "DCValue"> </output>
            </div>

            <div id="numberinputs">

               <div class="input-group mb-3" id = velocitycontainer>
                    <span class="input-group-text">Launch Velocity:</span>
                    <input type="number" class="form-control" aria-label="Velocity" id="velocity" value="10" min="0">
                    <span class="input-group-text"><math display="block"> <msup> <mi>ms</mi> <mn>-1</mn></msup> </math></span>
                </div>

                <div class="input-group mb-3" id = heightcontainer>
                    <span class="input-group-text">Launch Height:</span>
                    <input type="number" class="form-control" aria-label="Height" id="height" value="0" min="0">
                    <span class="input-group-text">m</span>
                </div>

                <div class="input-group mb-3" id = gcontainer>
                    <span class="input-group-text">Gravitational Field Strength:</span>
                    <input type="number" class="form-control" aria-label="Gravity" id="gravity" value="9.81">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>ms</mi> <mn>-2</mn></msup> </math></span>
                </div>

            </div>

            <div id="airresistanceinputs">
                <div class="input-group mb-3" id = densitycontainer>
                    <span class="input-group-text">Air Density:</span>
                    <input type="number" class="form-control" aria-label="Density" id="density" value="1.225" min="0">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>kgm</mi> <mn>-3</mn></msup> </math></span>
                </div>
    
                <div class="input-group mb-3" id = csacontainer>
                    <span class="input-group-text">Cross Sectional Area:</span>
                    <input type="number" class="form-control" aria-label="CSA" id="csa" value="1" min="0">
                    <span class="input-group-text"> <math display="block"> <msup> <mi>m</mi> <mn>2</mn></msup> </math></span>
                </div>

                <div class="input-group mb-3" id = masscontainer>
                    <span class="input-group-text">Projectile Mass:</span>
                    <input type="number" class="form-control" aria-label="Mass" id="mass" value="1" min="0">
                    <span class="input-group-text"> kg </span>
                </div>

            </div>

            

            <button type="button" class="btn btn-outline-dark" id="run">Run</button>

            </div>

           <div id="revealstats">
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="revealbutton">
                        Run Statistics:
                    </button>
                </p>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body" id="DisplayValues"> </div>
                </div>
            </div>

            <canvas id="animgraph"> </canvas>`;

            let drag = document.createElement("script");
            drag.src = "./dragcoeff.js"

            injection.appendChild(drag)

            break;
        
        case 10:
            injection.innerHTML = ""
            break;
    
        default:
            injection.innerHTML = "<p class='className'>\
                                        Error\
                                </p>";
            break;
    }

    if (input == 3 || input == 5){
        let js = document.createElement("script");
        js.src = `./Task_${input}.js`
        injection.appendChild(js)
    }

    else {
        let js1 = document.createElement("script");
        js1.src = "./slider.js"

        let js2 = document.createElement("script");
        js2.src = `./Task_${input}.js` 

        injection.appendChild(js1)

        js1.onload = () => {

            injection.appendChild(js2)
        }
    }
}


const radios = document.querySelectorAll('input[name="btnradio"]');
radios.forEach((radio, index) => {
    radio.addEventListener('input', () => {
        if (radio.checked) {
            console.log(index)
            updatepage(index)
        }
    });
});

// <math display="block"> <msup> <mi>ms</mi> <mn>-1</mn></msup> </math>