const inquirer = require("inquirer");
const fs = require("fs");


function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "text",
            message: "Enter up to three characters for the logo:",
            validate: (input) => {
                if (input.length <= 3) {
                    return true;
                }
                return "Please enter up to three characters!";
            },
        },
        {
            type: "input",
            name: "textColor",
            message: "Choose a shape for the logo:",
            choices: ["circle", "triangle", "square"],
        },
        {
            type: "input",
            name: "shapeColor",
            message: "Enter the shape color:",
        },
    ]);
}

function generateSVG(data) {
    const {text, textColor, shape, shapeColor} = data;

    const svg = new SVG({
        width: 300,
        height:200,
    });

    svg.rect (0, 0, 300, 200).fill("white");

    switch (shape) {
        case "circle":
            svg.circle(150, 100, 50).fill(shapeColor);
            break;
        case "triangle":
            svg.polygon("100,180 200, 180 150, 20").fill(shapeColor);
            break;
        case "square":
            svg.rect(100, 50, 100, 100).fill(shapeColor);
            break;
            default:
            break;
    }

    svg.text(150, 100, text).fill(textColor).attr("text-anchor", "middle");

    return svg.toString();
}

function saveSVGToFile(svgCode) {
    fs.writeFile("logo.svg", svgCode, (err) => {
        if (err) throw err;
        console.log("generated logo.svg");
    });
}

class SVG {
    constructor(options) {}
    rect(x,y, width, height) {}
    circle(cx, cy, r) {}
    polygon(points) {}
    text(x, y, text) {}
    toString() {}
}

class Rect {
    fill(color) {}
    attr(name, value) {}
}

class Circle {
    fill(color) {}
    attr(name, value) {}
}

class Polygon {
    fill(color) {}
    attr(name, value) {}
}

class Text {
    fill(color) {}
    attr(name, value) {}
}

function main () {
    console.log("welcome to the logo generator!!");

    promptUser()
    .then((answers) => generateSVG(answers))
    .then((svgCode) => saveSVGToFile(svgCode))
    .catch ((err) => console.error(err));
}

main();