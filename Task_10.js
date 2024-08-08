// This is the extension file, named as such to make referencing for the radio output easier. [I'm Lazy]

function velocity(vx, vy){
    return Math.sqrt(vx**2 + vy**2)
}

function drag(vp, v, CD, CSA, AD, mass){
    return ((-0.5 * vp * v * CD * CSA * AD) / mass )
}

function gravity(Me, y, D){
    let G = 6.67430 * (10**-11);
    return (-(G * Me) / ((y + D)**2))
}

function dragaltitude(vp, v, CD, CSA, mass, temp, sealevel, y, Me, D){
    let R = 8.3144598;
    let M = 0.02897; 
    return ((-0.5 * sealevel * vp * v * CD * CSA * (Math.E**((-M * y * gravity(Me, y, D)) / (R * temp))) ) / mass)
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

function generate(u, angle, h, g, CD, CSA, AD, mass, planetmass, planetrad, sealevel, temp){

    // Normal Air Resistance

    let vx = u * Math.cos(angle);
    let vy = u * Math.sin(angle);

    let dt = 0.01;
    let newg = g * -1;
    let t = 0;
    let talt = 0;

    const xcoords = [0];
    const ycoords = [h];

    let x = 0;
    let y = h;

    // Altitude Air Resistance

    let vxalt = u * Math.cos(angle);
    let vyalt = u * Math.sin(angle);

    const xcoordsalt = [0];
    const ycoordsalt = [h];

    let xalt = 0;
    let yalt = h;


    while (y >= 0){
        let v = velocity(vx,vy);
        
        let ax = drag(vx, v, CD, CSA, AD, mass);
        let ay = (newg + drag(vy, v, CD, CSA, AD, mass));

        x += vx * dt + (0.5 * ax * (dt**2));
        y += vy * dt + (0.5 * ay * (dt**2));
        
        vx += ax * dt;
        vy += ay * dt;

        t += dt;

        xcoords.push(x);
        ycoords.push(y);


    }

    while (yalt >= 0){
        let valt = velocity(vxalt, vyalt);
        
        let axalt = dragaltitude(vxalt, valt, CD, CSA, mass, temp, sealevel, yalt, planetmass, planetrad);
        let ayalt = (gravity(planetmass, yalt, planetrad) + dragaltitude(vyalt, valt, CD, CSA, mass, temp, sealevel, yalt, planetmass, planetrad));

        xalt += vxalt * dt + (0.5 * axalt * (dt**2));
        yalt += vyalt * dt + (0.5 * ayalt * (dt**2));

        vxalt += axalt * dt;
        vyalt += ayalt * dt;

        talt += dt;

        xcoordsalt.push(xalt);
        ycoordsalt.push(yalt);

    }

    let Rair = Math.max(...xcoords)
    let Peakyair = Math.max(...ycoords)
    let Peakxair = xcoords[ycoords.indexOf(Peakyair)]

    let Rairalt = Math.max(...xcoordsalt)
    let Peakyairalt = Math.max(...ycoordsalt)
    let Peakxairalt = xcoordsalt[ycoordsalt.indexOf(Peakyairalt)]


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

    const peakairalt = {
        x: Peakxairalt,
        y: Peakyairalt
    };

    console.log(t)
    const data = xcoords.map((x, i) => ({ x: x, y: ycoords[i] }));
    const dataalt = xcoordsalt.map((x, i) => ({ x: x, y: ycoordsalt[i] }));
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
                <tr>
                    <td> Air Resistance with Altitude </td>
                    <td>${Math.round(angle * (180 / Math.PI) * 100) / 100}</td>
                    <td>${Rairalt}</td>
                    <td>${talt}</td>
                    <td>${dt}</td>
                    <td> ${peakairalt.x} </td>
                    <td> ${peakairalt.y} </td>
                </tr>
            </tbody>
        </table>`;

    return [data, datanorm, peak, peakair, dataalt, peakairalt]
}


function rendering(coords, coordsnorm, peak, peakair, coordsalt, peakalt) {
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
            label: 'Air Resistance with Altitude',
            data: coordsalt,
            borderColor: 'rgba(23, 23, 175, 1)',
            backgroundColor: 'rgba(23, 23, 175, 0.2)',
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
            label: 'Peak Air Resistance with Altitude',
            data: [peakalt],
            borderColor: 'rgba(25, 199, 72, 1)',
            backgroundColor: 'rgba(25, 199, 72, 0.2)',
            pointRadius: 10,
            pointBackgroundColor: 'rgba(215, 231, 32, 1)',
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
var inputdragcoeff = document.querySelector('#DCRange');
var inputdensity = document.querySelector('#density');
var inputmass = document.querySelector('#mass');
var inputcsa = document.querySelector('#csa');
var inputplanetmass = document.querySelector('#planetmass');
var inputplanetrad = document.querySelector('#planetrad');
var inputsealevel = document.querySelector('#sealevel');
var inputtemp = document.querySelector('#temp');


document.getElementById("run").addEventListener("click", () => {
    let angle = parseFloat(inputangle.value) * (Math.PI / 180);
    let u = parseFloat(inputu.value);
    let height = parseFloat(inputheight.value);
    let g = parseFloat(inputg.value);
    let dragcoeff = parseFloat(inputdragcoeff.value);
    let density = parseFloat(inputdensity.value);
    let mass = parseFloat(inputmass.value);
    let csa = parseFloat(inputcsa.value);
    let planetmass = parseFloat(inputplanetmass.value) * 10**24;
    let planetrad = parseFloat(inputplanetrad.value) * 1000;
    let sealevel = parseFloat(inputsealevel.value);
    let temp = parseFloat(inputtemp.value);
    let maps = generate(u,angle,height,g,dragcoeff, csa, density, mass, planetmass, planetrad, sealevel, temp);
    let dataair = maps[0];
    let datanorm = maps[1];
    let peaknorm = maps[2];
    let peakair = maps[3];
    let dataalt = maps[4];
    let peakalt = maps[5];
    rendering(dataair, datanorm, peaknorm, peakair, dataalt, peakalt);
});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

;(function() {;
    var ρσ_modules = {};
    var lat, lon, LatN, LongW, theta;
    ρσ_modules.pythonize = {};
    
    (function(){
        function strings() {
            var string_funcs, exclude, name;
            string_funcs = set("capitalize strip lstrip rstrip islower isupper isspace lower upper swapcase center count endswith startswith find rfind index rindex format join ljust rjust partition rpartition replace split rsplit splitlines zfill".split(" "));
            if (!arguments.length) {
                exclude = (function(){
                    var s = ρσ_set();
                    s.jsset.add("split");
                    s.jsset.add("replace");
                    return s;
                })();
            } else if (arguments[0]) {
                exclude = Array.prototype.slice.call(arguments);
            } else {
                exclude = null;
            }
            if (exclude) {
                string_funcs = string_funcs.difference(set(exclude));
            }
            var ρσ_Iter0 = string_funcs;
            ρσ_Iter0 = ((typeof ρσ_Iter0[Symbol.iterator] === "function") ? (ρσ_Iter0 instanceof Map ? ρσ_Iter0.keys() : ρσ_Iter0) : Object.keys(ρσ_Iter0));
            for (var ρσ_Index0 of ρσ_Iter0) {
                name = ρσ_Index0;
                (ρσ_expr_temp = String.prototype)[(typeof name === "number" && name < 0) ? ρσ_expr_temp.length + name : name] = (ρσ_expr_temp = ρσ_str.prototype)[(typeof name === "number" && name < 0) ? ρσ_expr_temp.length + name : name];
            }
        };
        if (!strings.__module__) Object.defineProperties(strings, {
            __module__ : {value: "pythonize"}
        });
    
        ρσ_modules.pythonize.strings = strings;
    })();
    async function __main__() {
    "use strict";
        var display = canvas;
        var scene = canvas();
    
        function input(arg) {
            arg = arg || {}
            if (arg.prompt !== undefined && arg.prompt != '') return prompt(arg.prompt)
            else if (typeof arg === 'string') return prompt(arg)
            else return prompt()
        }
    
        var version, print, arange, __name__, type, ρσ_ls, G, ME, RE, m, lat, lon, theta, LatN, LongW, northButton, southButton, westButton, eastButton, la, lo, ts, ts_caption, Earth, x, y, z, mass, tilt, Npole, Spole, v0, t, dt, w, r, F;
        version = ρσ_list_decorate([ "3.2", "glowscript" ]);
        Array.prototype['+'] = function(r) {return this.concat(r)}
        Array.prototype['*'] = function(r) {return __array_times_number(this, r)}
        window.__GSlang = "vpython";
        print = GSprint;
        arange = range;
        __name__ = "__main__";
        type = pytype;
        var strings = ρσ_modules.pythonize.strings;
    
        strings();
        "5";
        G = 6.67e-11;
        "6";
        ME = 5.972e24;
        "7";
        RE = 6378e3;
        "10";
        G = 6.67e-11;
        "11";
        ME = 5.972e24;
        "12";
        RE = 6378e3;
        "13";
        m = 100;
        "14";
        lat = 0;
        "15";
        lon = 0;
        "16";
        theta = 45;
        "17";
        LatN = true;
        "18";
        LongW = true;
        "19";
        scene.lights = ρσ_list_decorate([]);
        "20";
        ρσ_interpolate_kwargs.call(this, distant_light, [ρσ_desugar_kwargs({direction: vector(1["-u"]()["*"](1), 0, 0), color: vector(.9, .9, .9)})]);
        "23";
        async function lati(evt) {
            "24";
            "25";
            lat = evt.number["*"](pi)["/"](180);
        };
        if (!lati.__argnames__) Object.defineProperties(lati, {
            __argnames__ : {value: ["evt"]},
            __module__ : {value: null}
        });
    
        "27";
        async function long(evt) {
            "28";
            "29";
            lon = evt.number["*"](pi)["/"](180);
        };
        if (!long.__argnames__) Object.defineProperties(long, {
            __argnames__ : {value: ["evt"]},
            __module__ : {value: null}
        });
    
        "33";
        async function latDir(evt) {
            "34";
            "35";
            if ((evt.text === "N" || typeof evt.text === "object" && ρσ_equals(evt.text, "N"))) {
                "36";
                LatN = true;
                "37";
            } else {
                "38";
                LatN = false;
            }
        };
        if (!latDir.__argnames__) Object.defineProperties(latDir, {
            __argnames__ : {value: ["evt"]},
            __module__ : {value: null}
        });
    
        "40";
        async function longDir(evt) {
            "41";
            "42";
            if ((evt.text === "W" || typeof evt.text === "object" && ρσ_equals(evt.text, "W"))) {
                "43";
                LongW = true;
                "44";
            } else {
                "45";
                LongW = false;
            }
        };
        if (!longDir.__argnames__) Object.defineProperties(longDir, {
            __argnames__ : {value: ["evt"]},
            __module__ : {value: null}
        });
    
        "47";
        async function setTheta(evt) {
            "48";
            "49";
            theta = float(evt.value)["*"](pi)["/"](180);
            "50";
            ts_caption.text = "Theta = "["+"]("{:1.2f}".format(ts.value))["+"]("\n\n");
        };
        if (!setTheta.__argnames__) Object.defineProperties(setTheta, {
            __argnames__ : {value: ["evt"]},
            __module__ : {value: null}
        });
    
        "53";
        async function lToCart(la, lo) {
            var ρσ_ls, x, y, z;
            "54";
            "55";
            if (LongW) {
                "56";
                lo = 1["-u"]()["*"](lo);
                "57";
            }
            if (LatN === false) {
                "58";
                la = 1["-u"]()["*"](la);
            }
            "59";
            x = RE["*"](sin(la))["*"](sin(lo));
            "60";
            y = RE["*"](cos(lo))["*"](sin(la));
            "61";
            z = RE["*"](cos(la));
            "62";
            return [x, y, z];
        };
        if (!lToCart.__argnames__) Object.defineProperties(lToCart, {
            __argnames__ : {value: ["la", "lo"]},
            __module__ : {value: null}
        });
    
        "64";
        async function cartToL(xyz) {
            var ρσ_ls, x, y, z, r, thet, phi;
            "65";
            x = ρσ_getitem(xyz, 0);
            "66";
            y = ρσ_getitem(xyz, 1);
            "67";
            z = ρσ_getitem(xyz, 2);
            "68";
            r = RE;
            "69";
            thet = acos(z["/"](r))["*"](180)["/"](pi);
            "70";
            phi = atan2(x, y)["*"](180)["/"](pi);
            "72";
            return ρσ_list_decorate([ r, thet, phi ]);
        };
        if (!cartToL.__argnames__) Object.defineProperties(cartToL, {
            __argnames__ : {value: ["xyz"]},
            __module__ : {value: null}
        });
    
        "74";
        northButton = ρσ_interpolate_kwargs.call(this, radio, [ρσ_desugar_kwargs({bind: latDir, text: "N", name: "latDir", checked: true})]);
        "75";
        southButton = ρσ_interpolate_kwargs.call(this, radio, [ρσ_desugar_kwargs({bind: latDir, text: "S", name: "latDir"})]);
        "76";
        westButton = ρσ_interpolate_kwargs.call(this, radio, [ρσ_desugar_kwargs({bind: longDir, text: "W", name: "longDir", checked: true})]);
        "77";
        eastButton = ρσ_interpolate_kwargs.call(this, radio, [ρσ_desugar_kwargs({bind: longDir, text: "E", name: "longDir"})]);
        "78";
        scene.append_to_caption("   ");
        (await sleep(.1));
        "80";
        la = ρσ_interpolate_kwargs.call(this, winput, [ρσ_desugar_kwargs({bind: lati, prompt: "Latitude?", type: "numeric", text: "Enter Lat"})]);
        (await sleep(.1));
        "81";
        lo = ρσ_interpolate_kwargs.call(this, winput, [ρσ_desugar_kwargs({bind: long, prompt: "Longitude", type: "numeric", text: "Enter Long"})]);
        "82";
        ts = ρσ_interpolate_kwargs.call(this, slider, [ρσ_desugar_kwargs({bind: setTheta, min: 0, max: 90, value: 45})]);
        "83";
        ts_caption = ρσ_interpolate_kwargs.call(this, wtext, [ρσ_desugar_kwargs({text: "Theta = "["+"]("{:1.2f}".format(ts.value))["+"]("\n\n")})]);
        "84";
        ρσ_interpolate_kwargs.call(this, label, [ρσ_desugar_kwargs({pos: vec(0, RE["+"](30), 0), text: "Enter in longitude + latitude before clicking to continue.", xoffset: 20, yoffset: 50, space: 30, height: 16, border: 4, font: "sans"})]);
        "86";
        Earth = ρσ_interpolate_kwargs.call(this, sphere, [ρσ_desugar_kwargs({pos: vector(0, 0, 0), radius: RE, texture: textures.earth, shininess: 0})]);
        "88";
        (await scene.pause());
        "89";
        x = ρσ_getitem((await lToCart(lat, lon)), 0);
        "90";
        y = ρσ_getitem((await lToCart(lat, lon)), 1);
        "91";
        z = ρσ_getitem((await lToCart(lat, lon)), 2);
        "92";
        mass = ρσ_interpolate_kwargs.call(this, sphere, [ρσ_desugar_kwargs({pos: vector(x, y, z), radius: RE["/"](20), color: color.yellow, make_trail: true})]);
        "93";
        tilt = 0;
        "94";
        ρσ_interpolate_kwargs.call(Earth, Earth.rotate, [ρσ_desugar_kwargs({origin: vector(0, 0, 0), axis: vector(0, 0, 1), angle: tilt})]);
        "95";
        Npole = ρσ_interpolate_kwargs.call(this, cylinder, [ρσ_desugar_kwargs({pos: vector(0, 0, 0), axis: 1.5["*"](RE)["*"](vector(1["-u"]()["*"](sin(tilt)), cos(tilt), 0)), radius: .02["*"](RE)})]);
        "96";
        Spole = ρσ_interpolate_kwargs.call(this, cylinder, [ρσ_desugar_kwargs({pos: vector(0, 0, 0), axis: 1["-u"]()["*"](1.5)["*"](RE)["*"](vector(1["-u"]()["*"](sin(tilt)), cos(tilt), 0)), radius: .02["*"](RE)})]);
        "97";
        v0 = 5e3;
        "98";
        ρσ_interpolate_kwargs.call(mass, mass.rotate, [ρσ_desugar_kwargs({origin: vector(0, 0, 0), axis: vector(0, 0, 1), angle: tilt})]);
        "99";
        mass.p = m["*"](v0)["*"](vector(1["-u"]()["*"](cos(theta)), sin(theta), 0));
        "100";
        t = 0;
        "101";
        dt = .5;
        "102";
        w = 2["*"](pi)["/"](24["*"](Math.pow(60, 2)))["*"](norm(Npole.axis));
        "105";
        while (mag(mass.pos)[">="](RE)) {
            "106";
            (await rate(500));
            "107";
            ρσ_interpolate_kwargs.call(Earth, Earth.rotate, [ρσ_desugar_kwargs({origin: vector(0, 0, 0), axis: w, angle: mag(w)["*"](dt)})]);
            "108";
            r = mass.pos;
            "109";
            F = 1["-u"]()["*"](G)["*"](ME)["*"](m)["*"](norm(r))["/"](Math.pow(mag(r), 2))["-"](1["*"](2)["*"](m)["*"](cross(mass.p["/"](m), w)));
            "110";
            mass.p = mass.p["+"](F["*"](dt));
            "111";
            mass.pos = mass.pos["+"](mass.p["*"](dt)["/"](m));
            "112";
            t = t["+"](dt);
        }
        "113";
        print(ρσ_list_decorate([ mass.pos.x, mass.pos.y, mass.pos.z ]));
    };
    if (!__main__.__module__) Object.defineProperties(__main__, {
        __module__ : {value: null}
    });
    
    ;$(function(){ window.__context = { glowscript_container: $("#glowscript").removeAttr("id") }; __main__() })})()
    // END JAVASCRIPT
    
    //--><!]]></script>