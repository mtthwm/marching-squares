const GridCell = function (value, color) {
    this.value = value;
    this.color = color;

    this.toString = () => {
        return this.value;
    };
};

const Grid = function (width, height, cellSize)
{
    this.createFrom2DArray = (arr, cellSize) => {
        this.arr = arr;
        this.width = arr[0].length;
        this.height = arr.length;
        this.cellSize = cellSize;
    };

    this.setColor = (x, y, color) => {
        this.arr[y][x].color = color;
    };

    this.getColor = (x, y) => {
        return this.arr[y][x].color;
    };

    this.setValue = (x, y, value) => {
        this.arr[y][x].value = value;
    };

    this.getValue = (x, y) => {
        return this.arr[y][x].value;
    };

    this.getCellCorner = (x, y) => {
        let cornerX = x * this.cellSize;
        let cornerY = y * this.cellSize;

        return {cornerX, cornerY};
    };

    this.drawLines = (ctx, color="#FFFFFF") => {
        const width = this.arr[0].length * this.cellSize;
        const height = this.arr.length * this.cellSize;

        ctx.strokeStyle = color;

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

    this.drawValues = (ctx, offsetX, offsetY, color="#FFFFFF") => {
        this._2DArrayUtil(this.arr, (value, x, y) => {
            ctx.font = '12px serif';
            ctx.fillStyle = color;
            ctx.fillText(value.value, x, y, this.cellSize * 0.75);
        }, offsetX, offsetY);
    };

    this.drawColors = (ctx) => {
        this._2DArrayUtil(this.arr, (value, x, y) => {
            ctx.fillStyle = value.color;
            ctx.fillRect(x, y, cellSize, cellSize);
        }, 0, 0);
    };

    this.drawCoordinates = (ctx, color="#FFFFFF") => {
        this._2DArrayUtil(this.arr, (value, x, y) => {
            ctx.font = '12px serif';
            ctx.fillStyle = color;
            ctx.fillText(`(${Math.floor(x / cellSize)},${Math.floor(y / cellSize)})`, x, y, this.cellSize * 0.75);
        }, cellSize * .4, cellSize * .5);
    }

    this.forEachCellCoords = (callback) => {
      this._2DArrayUtil(this.arr, callback, 0, 0);  
    };

    this.forEachCell = (callback) => {
        this._2DArrayUtil(this.arr, (element, x, y) => {
            callback(element, Math.floor(x / cellSize), Math.floor(y / cellSize));
        }, 0, 0);
    };

    this.getCornerWeightArray = (x, y) => {
        let final = [];
        
        for (let i = y; i <= y + 1; i++)
        {
            for (let j = x; j <= x + 1; j++)
            {
                if (j >= this.width || i >= this.height)
                {
                    final.push(1);
                }
                else
                {
                    final.push(this.getValue(j, i));
                }
            }
        }
        return final;
    }

    // Does *something* for every item in a 2D array, calls a callback function, passing in the value, as well as the x and y values on a grid.
    this._2DArrayUtil = (arr, callback, x = 0, y = 0, ) => {
        let xOffset = x;
        let yOffset = y;

        for (let y = 0; y < arr.length; y++)
        {
            for (let x = 0; x < arr[0].length; x++)
            {
                callback(arr[y][x], xOffset, yOffset);
                xOffset += this.cellSize;
            }
            xOffset = x;
            yOffset += this.cellSize;
        }
    };

    this._generate2DArray = (width, height) => {
        let arr = [];
        for (let i = 0; i < height; i++)
        {
            let new1DArray = [];
            for (let j = 0; j < width; j++)
            {
                new1DArray.push(new GridCell(null, "#000000"));
            }
            arr.push(new1DArray);
        }
        return arr;
    };

    this.createFrom2DArray(this._generate2DArray(width, height), cellSize);
}