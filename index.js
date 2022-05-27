const height = 1000;
const width = 1000;
const circles = [];

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

const Circle = function (x, y, radius) {
    this.radius = radius;
    this.x = x;
    this.y = y;

    this.draw = (ctx) => {
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 360);
        ctx.stroke();
    }
}

const Grid = function (arr, cellSize)
{
    this.arr = arr;
    this.cellSize = cellSize;

    this.drawLines = (ctx) => {
        const width = this.arr[0].length * this.cellSize;
        const height = this.arr.length * this.cellSize;

        // Vertical Lines
        for (let y = 0; y < width; y += cellSize)
        {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Horizontal Lines
        for (let x = 0; x < height; x += cellSize)
        {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
    };

    this.drawValues = (ctx, offset) => {
        this._2DArrayUtil(this.arr, (value, x, y) => {
            ctx.font = '12px serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(value, x, y);
        }, 25, 25);
    }

    // Does for every item in an array, calls a callback function, passing in the value, as well as the x and y values on a grid.
    this._2DArrayUtil = (arr, callback, x = 0, y = 0, ) => {
        let xOffset = x;
        let yOffset = y;

        for (let y = 0; y < arr.length; y++)
        {
            for (let x = 0; x < arr[0].length; x++)
            {
                callback(arr[x][y], xOffset, yOffset);
                xOffset += this.cellSize;
            }
            xOffset = x;
            yOffset += this.cellSize;
        }
    };
}

canvas.width = width;
canvas.height = height;

circles.push(new Circle(250, 250, 100));
const myGrid = new Grid([["(0,0)", "(0,1)"], ["(1,0)", "(1,1)"]], 100);

const draw = () => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    myGrid.drawLines(ctx);
    myGrid.drawValues(ctx, 100)

    circles.forEach((element) => {
        element.draw(ctx);
    })
}

let interval = setInterval(draw, 1);