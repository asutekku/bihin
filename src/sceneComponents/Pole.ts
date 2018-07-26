import { BoxGeometry, Color, Mesh, MeshPhongMaterial, Object3D, Scene } from "three";

export class Pole {
    poleMesh: Mesh;
    private poleMat: MeshPhongMaterial;
    private poleGeom: BoxGeometry;
    private width: number;
    private height: number;
    private length: number;

    constructor(parameters: {
        xPos?: number;
        yPos?: number;
        zPos?: number;
        width?: number;
        height?: number;
        length?: number;
        rotX?: number;
        rotY?: number;
        rotZ?: number;
    }) {
        let { xPos, yPos, zPos, width, height, length, rotX, rotY, rotZ } = parameters;
        this.width = width ? width : 0.09;
        this.height = height ? height : 2.2;
        this.length = length ? length : 0.09;
        this.poleGeom = new BoxGeometry(1, 1, 1);
        this.poleMat = new MeshPhongMaterial({ color: "#FFFFFF" });
        this.poleMat.color.setHSL(2.55, 2.55, 2.55);
        this.poleMesh = new Mesh(this.poleGeom, this.poleMat);
        this.poleMesh.scale.set(this.width, this.height, this.width);
        this.poleMesh.position.set(xPos ? xPos : 0, yPos ? yPos : 0, zPos ? zPos : 0);
        if (rotX) this.poleMesh.rotateY(rotX * Math.PI / 180);
        if (rotY) this.poleMesh.rotateY(rotY * Math.PI / 180);
        if (rotZ) this.poleMesh.rotateY(rotZ * Math.PI / 180);
        this.poleMesh.castShadow = true;
        this.poleMesh.receiveShadow = true;
    }

    position(x: number, y: number, z: number): void {
        this.poleMesh.position.set(x, y, z);
    }

    scale(x: number, y: number, z: number): void {
        this.poleMesh.scale.set(this.width, this.height, this.width);
    }

    set x(position: number) {
        this.poleMesh.position.x = position;
    }

    set y(position: number) {
        this.poleMesh.position.y = position;
    }

    set z(position: number) {
        this.poleMesh.position.z = position;
    }

    get x(): number {
        return this.poleMesh.position.x;
    }

    get y(): number {
        return this.poleMesh.position.y;
    }

    get z(): number {
        return this.poleMesh.position.z;
    }

    set scaleX(scale: number) {
        this.poleMesh.scale.x = scale;
    }

    set scaleY(scale: number) {
        this.poleMesh.scale.y = scale;
    }

    set scaleZ(scale: number) {
        this.poleMesh.scale.z = scale;
    }

    set color(color: Color) {
        this.poleMat.color = color;
    }

    addTo(scene: Scene) {
        scene.add(this.poleMesh);
    }
}
