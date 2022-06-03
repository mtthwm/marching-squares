const TileInput = function (corner, size, cornerWeights) {
    this.corner = corner;
    this.size = size;
    this.cornerWeights = cornerWeights;

    // LINEARLY INTERPOLATED

    this.leftMid = () => {
        return new Vec2(corner.x, corner.y + this.size*this._skewPercent(cornerWeights[0], cornerWeights[2]));
    }

    this.rightMid = () => {
        return new Vec2(corner.x + this.size, corner.y + this.size*this._skewPercent(cornerWeights[1], cornerWeights[3]));
    }

    this.topMid = () => {
        return new Vec2(corner.x + this.size*this._skewPercent(cornerWeights[0], cornerWeights[1]), corner.y);
    }

    this.bottomMid = () => {
        return new Vec2(corner.x + this.size*this._skewPercent(cornerWeights[2], cornerWeights[3]), corner.y + this.size);
    }

    // NON LINEAR INTERPOLATED VERSION

    // this.leftMid = () => {
    //     return new Vec2(corner.x, corner.y + this.size * 0.5);
    // }

    // this.rightMid = () => {
    //     return new Vec2(corner.x + this.size, corner.y + this.size * 0.5);
    // }

    // this.topMid = () => {
    //     return new Vec2(corner.x + this.size * 0.5, corner.y);
    // }

    // this.bottomMid = () => {
    //     return new Vec2(corner.x + this.size * 0.5, corner.y + this.size);
    // }

    this._clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    }

    this._skewPercent = (low, high) => {
        const result = (1 - low) / (high - low);
        return result;
    };
}

const tiles = {
    "0000": (ctx, input) => {},
    "1111": (ctx, input) => {},
    "0010": (ctx, input) => {
        drawLine(ctx, input.leftMid(), input.bottomMid());
    },
    "0001": (ctx, input) => {
        drawLine(ctx, input.bottomMid(), input.rightMid());
    },
    "0011": (ctx, input) => {
        drawLine(ctx, input.leftMid(), input.rightMid());
    },
    "0100": (ctx, input) => {
        drawLine(ctx, input.topMid(), input.rightMid());
    },
    "0110": (ctx, input) => {
        drawLine(ctx, input.leftMid(), input.topMid());
        drawLine(ctx, input.bottomMid(), input.rightMid());
    },
    "0101": (ctx, input) => {
        drawLine(ctx, input.topMid(), input.bottomMid());
    },
    "0111": (ctx, input) => {
        drawLine(ctx, input.leftMid(), input.topMid());
    },
    "1000": (ctx, input) => {
        drawLine(ctx, input.leftMid(), input.topMid());
    },
    "1010": (ctx, input) => {
        drawLine(ctx, input.topMid(), input.bottomMid());
    },
    "1001": (ctx, input) => {
        drawLine(ctx, input.topMid(), input.rightMid());
        drawLine(ctx, input.leftMid(), input.bottomMid());
    },
    "1011": (ctx, input) => {
        drawLine(ctx, input.topMid(), input.rightMid());
    },
    "1100": (ctx, input) => {
        drawLine(ctx, input.leftMid(), input.rightMid());
    },
    "1110": (ctx, input) => {
        drawLine(ctx, input.bottomMid(), input.rightMid());
    },
    "1101": (ctx, input) => {
        drawLine(ctx, input.leftMid(), input.bottomMid());
    },
};

const drawTile = (ctx, grid, x, y) => {
    const {cornerX, cornerY} = grid.getCellCorner(x, y);
    const tileIn = new TileInput(new Vec2(cornerX, cornerY), grid.cellSize, grid.getCornerWeightArray(x, y));
    tiles[gridCellToTile(grid, x, y)](ctx, tileIn);
};
