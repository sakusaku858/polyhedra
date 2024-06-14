class MyVector extends THREE.Vector3 {
    mul(scalar) {
        return new MyVector(scalar * this.x, scalar * this.y, scalar * this.z);
    }
    sub(v) {
        return new MyVector(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    add(v) {
        return new MyVector(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v) {
        const a1 = this.x;
        const a2 = this.y;
        const a3 = this.z;
        const b1 = v.x;
        const b2 = v.y;
        const b3 = v.z;
        return new MyVector(a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1);
    }
    div(scalar) {
        return new MyVector(this.x / scalar, this.y / scalar, this.z / scalar);
    }
    abs() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    norm() {
        return this.div(this.abs());
    }
    copy() {
        return new MyVector(this.x, this.y, this.z);
    }
    equalsTo(v) {
        if (
            this.x === v.x &&
            this.y === v.y &&
            this.z === v.z
        ) {
            return true;
        }
        return false;
    }
    isOnAxis(axis) {
        if (this.equalsTo(new MyVector(0, 0, 0))) return true;
        const a = axis.abs();
        const b = this.abs();
        const cos = this.dot(axis) / (a * b);
        if (0.999 < cos * cos && cos * cos < 1.001) return true;
        else return false;
    }
    //原点と座標axisを通る直線を軸として角度angleだけ回転
    //点が軸上にあるとゼロ除算してしまうので
    //最初にはじいておく
    rotateAxisAngle(axis, angle) {
        if (this.isOnAxis(axis)) return this.copy();
        const P = this;
        const A = axis;
        const t = this.dot(A) / A.dot(A);
        const Q = A.mul(t);
        const Pn = P.sub(Q).norm();
        const Rn = A.cross(P).norm();
        const len = P.sub(Q).abs();
        return Pn.mul(len * Math.cos(angle)).add(Rn.mul(len * Math.sin(angle))).add(Q);
    }
    //この点とvとの中点を得る
    getMidPoint(v) {
        return this.add(v).div(2.0);
    }
}