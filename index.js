const circle_color = "#d92323";
const blob_color = "#32a852";
const grid_line_color = "#999999";
const background_color = "#151a1f";
const corner_color = "#1f8fff";

const height = 600;
const width = 600;
const gridSize = 40;
const circles = [];

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

const Circle = function (x, y, radius) {
    this.radius = radius;
    this.x = x;
    this.y = y;

    this.draw = (ctx) => {
        ctx.strokeStyle = circle_color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 360);
        ctx.stroke();
    }
}

canvas.width = width;
canvas.height = height;

circles.push(new Circle(width / 4, width / 4, width / 5));
circles.push(new Circle(width / 5, width * 0.45, width / 10));
const myGrid = new Grid(gridSize, gridSize, width / gridSize);

const circleIntersectFunction = (x, y, circle) => {
    return (circle.radius*circle.radius) / (Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
};

const drawLine = (ctx, x1, y1, x2, y2, color="#FFFFFF") => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

const gridCellToTile = (grid, x, y) => {
    let tileValue = "";
    for (let i = y; i <= y + 1; i++)
    {
        for (let j = x; j <= x + 1; j++)
        {
            if (j >= grid.width || i >= grid.height)
            {
                tileValue += "0";
            }
            else
            {
                tileValue += grid.getValue(j, i) >= 1 ? "1" : "0";
            }
        }
    }
    return tileValue;
};

const drawBackground = (ctx) => {
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawCorners = (ctx, grid) => {
    grid.forEachCellCoords((element, x, y) => {
        if (element.value >= 1)
        {
            ctx.strokeStyle = corner_color;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 360);
            ctx.stroke();
        }
    });
}

const draw = () => {
    drawBackground(ctx);

    // myGrid.drawColors(ctx);
    // myGrid.drawLines(ctx, grid_line_color);
    // myGrid.drawValues(ctx);
    // myGrid.drawCoordinates(ctx);

    // drawCorners(ctx, myGrid);

    myGrid.forEachCell((element, x, y) => {
        drawTile(ctx, myGrid, x, y)
    });

    // circles.forEach((element) => {
    //     element.draw(ctx);
    // });
};

const update = () => {
    circles.forEach((element) => {
        element.x += 1;
    });

    myGrid.forEachCellCoords((element, x, y) => {
        let sum = 0;
        circles.forEach((circle) => {
            sum += circleIntersectFunction(x, y, circle);
        })
        element.value = sum;
    });
};

let drawInterval = setInterval(draw, 40);
let updateInterval = setInterval(update, 16);