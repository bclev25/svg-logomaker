const svgWrite = require('svgWrite');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter up tp three characters: ', (text) => {
    text = text.slice(0, 3);

    rl.question('Enter text color: ', (textColor) => {

        rl.question('Choose a shape (circle, triangle, square): ', (shape) => {

          rl.question('Enter ${shape} color: ', (shapeColor) => {

            const svg = svgWrite('<?xml version="1.0" encoding="utf-8"?>\n');
            const shapeSize = { width: 100, height: 100};
            const textSize = 36;

            switch (shape) {
                case 'circle':
                svg.circle({ cx: '150', cy: '100', r:'50', fill: shapeColor});
                break;
                case 'triangle':
                    svg.polygon([(150 - shapeSize.width / 2) + ',' + (100 + shapeSize.height / 2)]),
                    (150 - shapeSize.width / 2) + ',' + (100 + shapeSize.height / 2),
                    ('150' + (100 - shapeSize.height / 2), {fill: shapeColor});
            break;
        case 'square':
            svg.rect((150 - shapeSize.width / 2) + ',' + (100 - shapeSize.height / 2)),
                   shapeSize.width, shapeSize.height, { fill: shapeColor};
            break;
            default:
                console.log('Invalid shape entered');
                return;

                svg.text(text, { x: '150', y:'100', fill: textColor, 'font-size': textSize, 'text-anchor': 'middle'});

                const filename = 'logo.svg';
                fs.writeFileSync(filename, svg.toString());
                console.log('Generated ${filename}');

                const browserPath = process.env.Browser || '/usr/bin/xdg-open';
                const url = 'file://${__dirname}/${filename}';
                const childProcess = require('child_process').exec;
                childProcess('${browserPath} "${url}"');

                rl.close();
            }

          });

        });
    });
});