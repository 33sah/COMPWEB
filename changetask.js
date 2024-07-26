function updatepage(input){
    const injection = document.getElementById("Taskchanging")

    injection.innerHTML = ""

    switch (input) {
        case 0:
            injection.innerHTML = '<p> Hello <p>'
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

            <canvas id="animgraph"> </canvas>`;
            break;
        
        case 6:
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
                    <span class="input-group-text">Air Denisty:</span>
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