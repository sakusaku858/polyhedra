class RotateGroup {
    constructor() {
        this.axisAngles = [];
    }
    rotateTriangle(triangle) {
        const triangles = [];
        this.axisAngles.forEach(ele => {
            const t = triangle.rotateAxisAngle(ele.axis, ele.angle);
            triangles.push(triangle.rotateAxisAngle(ele.axis, ele.angle));
        });
        return triangles;
    }
}

class RotateGroupOfTetrahedron extends RotateGroup {
    constructor() {
        super();
        const a = new MyVector(1, -1, 1);
        const b = new MyVector(-1, 1, 1);
        const c = new MyVector(-1, -1, -1);
        const d = new MyVector(1, 1, -1);
        const ab = a.getMidPoint(b);// AB-CD
        const ac = a.getMidPoint(c);// AC-BD
        const ad = a.getMidPoint(d);// AD-BC
        const angle1 = 2 * Math.PI / 3
        const angle2 = 4 * Math.PI / 3
        const angle3 = Math.PI;
        this.axisAngles = [
            { axis: a, angle: angle1 },
            { axis: a, angle: angle2 },
            { axis: b, angle: angle1 },
            { axis: b, angle: angle2 },
            { axis: c, angle: angle1 },
            { axis: c, angle: angle2 },
            { axis: d, angle: angle1 },
            { axis: d, angle: angle2 },
            { axis: ab, angle: angle3 },
            { axis: ac, angle: angle3 },
            { axis: ad, angle: angle3 },
            { axis: a, angle: 0 }
        ];
    }
}

//立方体の回転群のつもり
class RotateGroupOfOctahedron extends RotateGroup {
    constructor() {
        super();
        const a = new MyVector(1, 1, 1);
        const b = new MyVector(1, -1, 1);
        const c = new MyVector(-1, -1, 1);
        const d = new MyVector(-1, 1, 1);
        const e = new MyVector(1, 1, -1);
        const f = new MyVector(1, -1, -1);
        const g = new MyVector(-1, -1, -1);
        const h = new MyVector(-1, 1, -1);
        const ab = a.getMidPoint(b);
        const bc = b.getMidPoint(c);
        const cd = c.getMidPoint(d);
        const da = d.getMidPoint(a);
        const ae = a.getMidPoint(e);
        const bf = b.getMidPoint(f);
        const f1 = new MyVector(1, 0, 0);
        const f2 = new MyVector(0, 1, 0);
        const f3 = new MyVector(0, 0, 1);

        const vAngle1 = 2 * Math.PI / 3
        const vAngle2 = 4 * Math.PI / 3
        const eAngle = Math.PI;
        const fAngle1 = Math.PI / 2;
        const fAngle2 = fAngle1 * 2;
        const fAngle3 = fAngle1 * 3;

        this.axisAngles = [
            { axis: a, angle: vAngle1 }, //0
            { axis: a, angle: vAngle2 }, //1
            { axis: b, angle: vAngle1 }, //2
            { axis: b, angle: vAngle2 }, //3
            { axis: c, angle: vAngle1 }, //4
            { axis: c, angle: vAngle2 }, //5
            { axis: d, angle: vAngle1 }, //6
            { axis: d, angle: vAngle2 }, //7

            { axis: ab, angle: eAngle }, //8
            { axis: bc, angle: eAngle },//9
            { axis: cd, angle: eAngle },//10
            { axis: da, angle: eAngle },//11
            { axis: ae, angle: eAngle },//12
            { axis: bf, angle: eAngle },//13

            { axis: f1, angle: fAngle1 },
            { axis: f1, angle: fAngle2 },
            { axis: f1, angle: fAngle3 },
            { axis: f2, angle: fAngle1 },
            { axis: f2, angle: fAngle2 },
            { axis: f2, angle: fAngle3 },
            { axis: f3, angle: fAngle1 },
            { axis: f3, angle: fAngle2 },
            { axis: f3, angle: fAngle3 },

            { axis: f3, angle: 0 }
        ];
    }
}

class RotateGroupOfDodecahedron extends RotateGroup {
    constructor() {
        super();
        const PHI = (1 + Math.sqrt(5)) / 2;
        const INV = 1 / PHI;
        const HLF = 0.5;
        const HLFP = PHI * 0.5;
        const HLFP2 = PHI * PHI * 0.5;
        const CNT = (PHI + 2) / 5;
        const CNTP = CNT * PHI;
        const ANGL5 = 2 * Math.PI / 5;
        const ANGL3 = 2 * Math.PI / 3;
        const ANGL2 = Math.PI;
        const vertices = [
            new MyVector(1, 1, 1),
            new MyVector(1, 1, -1),
            new MyVector(1, -1, 1),
            new MyVector(1, -1, -1),
            new MyVector(0, PHI, INV),
            new MyVector(0, -PHI, INV),
            new MyVector(INV, 0, PHI),
            new MyVector(INV, 0, -PHI),
            new MyVector(PHI, INV, 0),
            new MyVector(-PHI, INV, 0)
        ];
        const edges = [
            new MyVector(HLF, HLFP2, HLFP),
            new MyVector(HLF, HLFP2, -HLFP),
            new MyVector(HLF, -HLFP2, HLFP),
            new MyVector(HLF, -HLFP2, -HLFP),

            new MyVector(HLFP, HLF, HLFP2),
            new MyVector(HLFP, HLF, -HLFP2),
            new MyVector(HLFP, -HLF, HLFP2),
            new MyVector(HLFP, -HLF, -HLFP2),

            new MyVector(HLFP2, HLFP, HLF),
            new MyVector(HLFP2, HLFP, -HLF),
            new MyVector(HLFP2, -HLFP, HLF),
            new MyVector(HLFP2, -HLFP, -HLF),

            new MyVector(0, PHI, 0),
            new MyVector(0, 0, PHI),
            new MyVector(PHI, 0, 0)
        ];
        const faces = [
            new MyVector(0, CNT, CNTP),
            new MyVector(0, CNT, -CNTP),
            new MyVector(CNTP, 0, CNT),
            new MyVector(CNTP, 0, -CNT),
            new MyVector(CNT, CNTP, 0),
            new MyVector(CNT, -CNTP, 0)
        ];
        vertices.forEach(v => {
            this.axisAngles.push({ axis: v, angle: ANGL3 });
            this.axisAngles.push({ axis: v, angle: ANGL3 * 2 });
        });
        edges.forEach(e => {
            this.axisAngles.push({ axis: e, angle: ANGL2 });
        });
        faces.forEach(f => {
            this.axisAngles.push({ axis: f, angle: ANGL5 });
            this.axisAngles.push({ axis: f, angle: ANGL5 * 2 });
            this.axisAngles.push({ axis: f, angle: ANGL5 * 3 });
            this.axisAngles.push({ axis: f, angle: ANGL5 * 4 });
        });
        this.axisAngles.push({ axis: vertices[0], angle: 0 });
    }
}