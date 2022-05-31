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

const Circle = function (x, y, radius, velocity = new Vec2(0, 0)) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.velocity = velocity;

    this.draw = (ctx) => {
        ctx.strokeStyle = circle_color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 360);
        ctx.stroke();
    };

    this._getIntersectionWithBorder = (xOrY, lower, upper) => {
        const p = (new Vec2(this.x, this.y)).add(this.velocity.normalized().multiply(this.radius));
        let border;
        let mod;
        
        if (this.velocity[xOrY] < 0)
        {
            border = lower;
            mod = -1;
        }
        else if (this.velocity[xOrY] > 0)
        {
            border = upper;
            mod = 1;
        } 
        else
        {
            return null;
        }

        const a = Math.abs(border - p[xOrY]);
        const cosTheta = this.velocity[xOrY] / this.velocity.magnitude();
        const b = a / cosTheta;
        return p.add(this.velocity.normalized().multiply((b * mod) - this.radius));
    };

    this.move = (amount, lowerBoundX, upperBoundX, lowerBoundY, upperBoundY) => {
        const position = new Vec2(this.x, this.y);
        const target = position.add(amount);
        let intersection = this._getIntersectionWithHorizontalBorder(lowerBoundX, upperBoundX);
        if (intersection != null)
        {
            const distToIntersection = position.distance(intersection);
            const distToTarget = position.distance(target);
            if (distToIntersection < distToTarget)
            {
                this.velocity = new Vec2(this.velocity.x, -this.velocity.y);
                this.move(intersection.add(position.multiply(-1)), lowerBoundX, upperBoundX, lowerBoundY, upperBoundY);
                return;
            }
        }
        intersection = this._getIntersectionWithVerticalBorder(lowerBoundY, upperBoundY);
        if (intersection != null)
        {
            const distToIntersection = position.distance(intersection);
            const distToTarget = position.distance(target);
            if (distToIntersection < distToTarget)
            {
                this.velocity = new Vec2(-this.velocity.x, this.velocity.y);
                this.move(intersection.add(position.multiply(-1)), lowerBoundX, upperBoundX, lowerBoundY, upperBoundY);
                return;
            }
        }
        this.x = target.x;
        this.y = target.y;
    };

    this._getIntersectionWithVerticalBorder = (lower, upper) => {
        return this._getIntersectionWithBorder("x", lower, upper);
    };

    this._getIntersectionWithHorizontalBorder = (lower, upper) => {
        return this._getIntersectionWithBorder("y", lower, upper)
    };

    this._getIntersectionWithLine = (position, direction) => {
        let perpendicularVector;

        if (direction.y < 0)
        {
            perpendicularVector = direction.perpendicularCounterclockwise().normalized();
        }
        else
        {
            perpendicularVector = direction.perpendicularClockwise().normalized();
        }

        
        const cosTheta = this.velocity.normalized().dot(perpendicularVector.normalized());
        const b = a / cosTheta;
        return this.velocity.normalized() * (b - this.radius);
    };
}



canvas.width = width;
canvas.height = height;

circles.push(new Circle(150, 160, 50, new Vec2(1, 5)));
circles.push(new Circle(500, 240, 75, new Vec2(-2, 3)));
circles.push(new Circle(140, 70, 35, new Vec2(1, -3)));
circles.push(new Circle(500, 563, 60, new Vec2(-7, 2)));
circles.push(new Circle(450, 160, 50, new Vec2(3, -2)));
circles.push(new Circle(400, 350, 100, new Vec2(0.5, 3)));

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
};

const drawRay = (ctx, position, direction, length, color="#FFFFFF") => {
    const target = position.add(direction.normalized().multiply(length));
    return drawLine(ctx, position.x, position.y, target.x, target.y, color);
};

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
};

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
};

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
        element.move(element.velocity, 0, width, 0, height);
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