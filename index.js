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

canvas.width = width;
canvas.height = height;

circles.push(new Circle(250, 250, 200));
const myGrid = new Grid(10, 10, 100);

const circleIntersectFunction = (x, y, circle) => {
    return ((circle.radius*circle.radius) / (Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2)));
};

const draw = () => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    myGrid.drawColors(ctx);
    myGrid.drawLines(ctx);
    // myGrid.drawValues(ctx);
    // myGrid.drawCoordinates(ctx);

    myGrid.forEachCellCoords((element, x, y) => {
        if (element.value >= 1)
        {
            ctx.strokeStyle = "#FF0000";
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 360);
            ctx.stroke();
        }
    });

    myGrid.forEachCell((element, x, y) => {
        drawTile(ctx, myGrid, x, y)
    });

    circles.forEach((element) => {
        element.draw(ctx);
    });
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
                tileValue += "1";
            }
            else
            {
                tileValue += grid.getValue(j, i) >= 1 ? "1" : "0";
            }
        }
    }
    return tileValue;
};

// Returns coordinates for the midpoint of the top edge of a square or a given size, with a corner at the given coordinates
const topMid = (cornerX, cornerY, cellSize) => {
    return [cornerX + cellSize / 2, cornerY];
};
// Returns coordinates for the midpoint of the left edge of a square or a given size, with a corner at the given coordinates
const leftMid = (cornerX, cornerY, cellSize) => {
    return [cornerX, cornerY + cellSize / 2];
};
// Returns coordinates for the midpoint of the right edge of a square or a given size, with a corner at the given coordinates
const rightMid = (cornerX, cornerY, cellSize) => {
    return [cornerX + cellSize, cornerY + cellSize / 2];
};
// Returns coordinates for the midpoint of the bottom edge of a square or a given size, with a corner at the given coordinates
const bottomMid = (cornerX, cornerY, cellSize) => {
    return [cornerX + cellSize / 2, cornerY + cellSize];
};

const tiles = {
    "0000": (ctx, cornerX, cornerY, cellSize) => {},
    "1111": (ctx, cornerX, cornerY, cellSize) => {},
    "0010": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...bottomMid(cornerX, cornerY, cellSize));
    },
    "0001": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...bottomMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize));
    },
    "0011": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize));
    },
    "0100": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...topMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize));
    },
    "0110": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...topMid(cornerX, cornerY, cellSize));
        drawLine(ctx, ...bottomMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize));
    },
    "0101": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...topMid(cornerX, cornerY, cellSize), ...bottomMid(cornerX, cornerY, cellSize));
    },
    "0111": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...topMid(cornerX, cornerY, cellSize));
    },
    "1000": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...topMid(cornerX, cornerY, cellSize));
    },
    "1010": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...topMid(cornerX, cornerY, cellSize), ...bottomMid(cornerX, cornerY, cellSize));
    },
    "1001": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...topMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize));
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...bottomMid(cornerX, cornerY, cellSize));
    },
    "1011": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...topMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize));
    },
    "1100": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize));
    },
    "1110": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...bottomMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize));
    },
    "1101": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...bottomMid(cornerX, cornerY, cellSize));
    },
};

const drawTile = (ctx, grid, x, y) => {
    const {cornerX, cornerY} = grid.getCellCorner(x, y);

    tiles[gridCellToTile(grid, x, y)](ctx, cornerX, cornerY, grid.cellSize);
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