
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
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...bottomMid(cornerX, cornerY, cellSize), blob_color);
    },
    "0001": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...bottomMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize), blob_color);
    },
    "0011": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize), blob_color);
    },
    "0100": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...topMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize), blob_color);
    },
    "0110": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...topMid(cornerX, cornerY, cellSize), blob_color);
        drawLine(ctx, ...bottomMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize), blob_color);
    },
    "0101": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...topMid(cornerX, cornerY, cellSize), ...bottomMid(cornerX, cornerY, cellSize), blob_color);
    },
    "0111": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...topMid(cornerX, cornerY, cellSize), blob_color);
    },
    "1000": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...topMid(cornerX, cornerY, cellSize), blob_color);
    },
    "1010": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...topMid(cornerX, cornerY, cellSize), ...bottomMid(cornerX, cornerY, cellSize), blob_color);
    },
    "1001": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...topMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize), blob_color);
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...bottomMid(cornerX, cornerY, cellSize), blob_color);
    },
    "1011": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...topMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize), blob_color);
    },
    "1100": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize), blob_color);
    },
    "1110": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...bottomMid(cornerX, cornerY, cellSize), ...rightMid(cornerX, cornerY, cellSize), blob_color);
    },
    "1101": (ctx, cornerX, cornerY, cellSize) => {
        drawLine(ctx, ...leftMid(cornerX, cornerY, cellSize), ...bottomMid(cornerX, cornerY, cellSize), blob_color);
    },
};

const drawTile = (ctx, grid, x, y) => {
    const {cornerX, cornerY} = grid.getCellCorner(x, y);

    tiles[gridCellToTile(grid, x, y)](ctx, cornerX, cornerY, grid.cellSize);
};