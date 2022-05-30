const Vec2 = function (x, y) {
    this.x = x;
    this.y = y;
    this.normalized = () => {
        const mag = this.magnitude();
        return new Vec2(this.x / mag, this.y / mag);
    };
    this.magnitude = () => {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    };
    this.multiply = (scalar) => {
        return new Vec2(this.x * scalar, this.y * scalar);
    };
    this.add = (vector) => {
        return new Vec2(this.x + vector.x, this.y + vector.y);
    };
    this.dot = (vector) => {
        return this.x * vector.x + this.y * vector.y;
    };
    this.perpendicularClockwise = () => {
        return new Vec2(this.y, -this.x)
    };
    this.perpendicularCounterclockwise = () => {
        return new Vec2(-this.y, this.x)
    };
}