const height = 1000;
const width = 1000;
const circles = [];

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

const circle = function (x, y, radius) {
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

const gridLines = function (width, height, cellsX, cellsY)
{
    this.height = height;
    this.width = width;
    this.cellsX = cellsX;
    this.cellsY = cellsY;

    this.draw = (ctx) => {
        cellWidth = width / cellsX;
        cellHeight = height / cellsY;

        // Vertical Lines
        for (let y = 0; y < this.height; y += cellHeight)
        {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Horizontal Lines
        for (let x = 0; x < this.width; x += cellWidth)
        {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
    };
}

const gridValues = function (array2d)
{
    this.array2d = array2d;

    this.draw = (ctx, xPos, yPos, offset) => {
        let xOffset = 0;
        let yOffset = 0;

        for (let y = 0; y < array2d.length; y++)
        {
            for (let x = 0; x < array2d[0].length; x++)
            {
                ctx.font = '12px serif';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(this.array2d[y][x], xPos + xOffset, yPos + yOffset);
                xOffset += offset;
            }
            xOffset = 0;
            yOffset += offset;
        }
    }
}

const grid = function (arr, cellSize)
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

circles.push(new circle(250, 250, 100));
// const debugGrid = new gridLines(height, height, 10, 10);
// const debugGridValues = new gridValues([["(0,0)", "(0,1)"], ["(1,0)", "(1,1)"]]);
const myGrid = new grid([["(0,0)", "(0,1)"], ["(1,0)", "(1,1)"]], 100);

console.log(circles);

const draw = () => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // debugGrid.draw(ctx);
    // debugGridValues.draw(ctx, 25, 25, 100);
    myGrid.drawLines(ctx);
    myGrid.drawValues(ctx, 100)

    circles.forEach((element) => {
        element.draw(ctx);
    })
}

let interval = setInterval(draw, 1);