import { BoxGeometry, Mesh, MeshPhongMaterial, Scene } from "three";
import { Pole } from "./Pole";

export class Canopy {
    get raiseHeight(): number {
        return this._raiseHeight;
    }

    set raiseHeight(value: number) {
        this._raiseHeight = value;
        this.ceilingPieces.forEach((e: Pole) => {
            e.position(e.x, value + this._baseHeight + this._height, e.z);
        });
        this.tallPoles.forEach((e: Pole) => {
            e.yPos = value + this._height + this._baseHeight;
        });
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.shortPoles.forEach((e: Pole) => {
            e.scaleY = value;
        });
        this.tallPoles.forEach((e: Pole) => {
            e.scaleY = value + this._raiseHeight;
        });
        this.horizontalPieces.forEach((e: Pole) => {
            e.position(e.x, value + this._baseHeight, e.z);
        });
        this.ceilingPieces.forEach((e: Pole) => {
            e.position(e.x, value + this._baseHeight + this._raiseHeight, e.z);
        });
        console.log(value + this._height);
    }

    get baseHeight(): number {
        return this._baseHeight;
    }

    set baseHeight(value: number) {
        this.shortPoles.forEach((e: Pole) => {
            e.position(e.x, value, e.z);
        });
        this.tallPoles.forEach((e: Pole) => {
            e.position(e.x, value, e.z);
        });
        this.ceilingPieces.forEach((e: Pole) => {
            e.position(e.x, value + this._height + this._raiseHeight, e.z);
        });
        this.horizontalPieces.forEach((e: Pole) => {
            e.position(e.x, value + this._height, e.z);
        });
        this._baseHeight = value;
    }

    get color(): number {
        return this._color;
    }

    set color(value: number) {
        this._color = value;
        this.shortPoles.forEach((e: Pole) => {
            e.color.setHex(value);
        });
    }

    private sidePoles: number;
    private frontPoles: number;
    private poleWidth: number = 0.09;
    private _color: number;
    private width: number;
    private length: number;

    private _height: number;
    private _raiseHeight: number;

    private windowsPerSlot: number;
    private poleHeight: number = 2.2;
    private poleHeightBack: number = 3.2;
    private _baseHeight: number = 0.2;
    private shortPoles: Pole[] = [];
    private ceilingPieces: Pole[] = [];
    private horizontalPieces: Pole[] = [];
    private tallPoles: Pole[] = [];

    constructor(scene: Scene, width: number, height: number, length: number, color: number) {
        this.sidePoles = 2;
        this.frontPoles = 2;
        this.width = width;
        this.length = length;
        this._height = height;
        this._raiseHeight = height + 0.8;
        this._color = color;
        const x = this.length / 2 - this.poleWidth / 2,
            y = this.width / 2 - this.poleWidth / 2,
            frontLeft = new Pole({ xPos: x, yPos: y, height: this.poleHeight }),
            frontRight = new Pole({ xPos: x, yPos: -y, height: this.poleHeight }),
            backLeft = new Pole({ xPos: -x, yPos: y, height: this.poleHeightBack }),
            backRight = new Pole({ xPos: -x, yPos: -y, height: this.poleHeightBack }),
            horizontalBarLeft = new Pole({ xPos: x + this.poleWidth / 2, yPos: y, length: this.length, rotY: -90 }),
            horizontalBarRight = new Pole({ xPos: x + this.poleWidth / 2, yPos: -y, length: this.length, rotY: -90 }),
            horizontalBarFront = new Pole({
                xPos: x,
                yPos: -y - this.poleWidth * 1.5,
                zPos: this.width + this.poleWidth * 2,
                rotY: 0
            }),
            horizontalBarBackTop = new Pole({
                xPos: -x,
                yPos: -y - this.poleWidth * 1.5,
                length: this.width + this.poleWidth * 2,
                rotY: 0,
                height: this.poleHeightBack
            });
        scene.add(frontLeft);
        scene.add(frontRight);
        scene.add(backLeft);
        scene.add(backRight);
        scene.add(horizontalBarLeft);
        scene.add(horizontalBarRight);
        scene.add(horizontalBarFront);
        scene.add(horizontalBarBackTop);
        this.shortPoles.push(frontLeft);
        this.shortPoles.push(frontRight);
        this.tallPoles.push(backLeft);
        this.tallPoles.push(backRight);
        this.horizontalPieces.push(horizontalBarLeft);
        this.horizontalPieces.push(horizontalBarRight);
        this.horizontalPieces.push(horizontalBarFront);
        this.ceilingPieces.push(horizontalBarBackTop);
        if (this.width % 2 && 0) {
            this.windowsPerSlot = 2;
        } else {
            this.windowsPerSlot = 3;
        }
        this.frontbars(scene, x, y, this.width, this.length);
        this.sidebars(scene, x, y, this.width, this.length);
        this.ceiling(scene);
    }

    private frontbars(scene: Scene, x: number, y: number, width: number, length: number): void {
        for (let i = 0; i <= width; i++) {
            if (i !== 0 && i !== length) {
                const polePosition = -width * i + this.poleWidth / 2;
                this.windowsPerSlot = 2;
                const pole = new Pole({ xPos: this.poleWidth, yPos: this.height, zPos: this.poleWidth });
                pole.position(x, y + polePosition, this.poleHeight);
                //const pole = this.pole(x, y + polePosition, this.poleHeight);
                if (i % 2 === 0 && width % 2 === 0 && width % 3 !== 0) {
                    this.addFrontPole(scene, pole);
                } else if (i % 3 == 0 && width % 3 === 0) {
                    this.addFrontPole(scene, pole);
                } else if (i % 3 == 0 && i % 2 == 0 && width % 3 === 0) {
                    this.addFrontPole(scene, pole);
                }
            }
        }
    }

    addFrontPole(scene: Scene, pole: Pole): void {
        this.frontPoles++;
        scene.add(pole.poleMesh);
        this.shortPoles.push(pole);
    }

    addSidePole(scene: Scene, poleLeft: Pole, poleRight: Pole): void {
        this.sidePoles++;
        scene.add(poleLeft.poleMesh);
        scene.add(poleRight.poleMesh);
        this.shortPoles.push(poleLeft);
        this.shortPoles.push(poleRight);
    }

    sidebars(scene: Scene, x: number, y: number, width: number, length: number): void {
        for (let i = 0; i <= length; i++) {
            if (i !== 0 && i !== length) {
                this.windowsPerSlot = 2;
                const polePosition = -width * i + this.poleWidth / 2;
                const poleLeft = this.pole(x + polePosition, y, this.poleHeight);
                const poleRight = this.pole(x + polePosition, -y, this.poleHeight);
                if (i % 2 === 0 && length % 2 === 0 && length % 3 !== 0) {
                    this.addSidePole(scene, poleLeft, poleRight);
                } else if (i % 3 == 0 && length % 3 === 0) {
                    this.addSidePole(scene, poleLeft, poleRight);
                } else if (i % 3 == 0 && i % 2 == 0 && length % 3 === 0) {
                    this.addSidePole(scene, poleLeft, poleRight);
                }
            }
        }
    }

    ceiling(scene: Scene): void {
        const count: number = Math.round((this.width - this.poleWidth) * 100 / 80),
            length = Math.sqrt(Math.pow(this.length, 2) + Math.pow(this.poleHeightBack - this.poleHeight, 2)) + 0.1,
            x = this.length / 2 - this.poleWidth / 2,
            y = this.width / 2 - this.poleWidth / 2,
            divide = this.width / count,
            height = this.poleHeightBack - this.poleHeight,
            angle: number = Math.asin(height / length);
        console.log(angle);
        for (let i = 0; i < count + 1; i++) {
            const ceilingPole = this.ceilingPole(-x, y - i * divide, length, 90, this.poleHeightBack);
            ceilingPole.rotateX(angle);
            this.ceilingPieces.push(ceilingPole);
            scene.add(ceilingPole);
        }
        /*const ceilingWindow = this.window(-x, y, this.patioWidth, 180, length);
        ceilingWindow.position.set(-x, this.poleHeightBack + 8, y);
        ceilingWindow.rotateZ(angle + Util.toRad(90));
        scene.add(ceilingWindow);*/
    }

    /*

//Front bars
    for (let i = 0; i <= this.patioWidthCount; i++) {
        if (i !== 0 && i !== this.patioWidthCount) {
            this.windowsPerSlot = 2;
            const pole = this.pole(x, y + polePosition, this.poleHeight);
            const polePosition = (-this.patioBaseWidth) * i + this.poleWidth / 2;
            if (i % 2 === 0 && this.patioWidthCount % 2 === 0 && this.patioWidthCount % 3 !== 0) {
                this.frontPoles++;
                scene.add(pole);
            } else if (i % 3 == 0 && this.patioWidthCount % 3 === 0) {
                this.frontPoles++;
                scene.add(pole);
            } else if (i % 3 == 0 && i % 2 == 0 && this.patioWidthCount % 3 === 0) {
                this.frontPoles++;
                scene.add(pole);
            }
        }

//Side bars
    for (let i = 0; i <= this.patioDepthCount; i++) {
        if (i !== 0 && i !== this.patioDepthCount) {
            this.windowsPerSlot = 2;
            const polePosition = (-this.patioBaseWidth) * i + this.poleWidth / 2;
            if (i % 2 === 0 && this.patioDepthCount % 2 === 0 && this.patioDepthCount % 3 !== 0) {
                this.sidePoles++;
                const poleLeft = this.pole(x + polePosition, y, this.poleHeight);
                const poleRight = this.pole(x + polePosition, -y, this.poleHeight);
                scene.add(poleLeft);
                scene.add(poleRight);
            } else if (i % 3 == 0 && this.patioDepthCount % 3 === 0) {
                this.sidePoles++;
                const poleLeft = this.pole(x + polePosition, y, this.poleHeight);
                const poleRight = this.pole(x + polePosition, -y, this.poleHeight);
                scene.add(poleLeft);
                scene.add(poleRight);
            } else if (i % 3 == 0 && i % 2 == 0 && this.patioDepthCount % 3 === 0) {
                this.sidePoles++;
                const poleLeft = this.pole(x + polePosition, y, this.poleHeight);
                const poleRight = this.pole(x + polePosition, -y, this.poleHeight);
                scene.add(poleLeft);
                scene.add(poleRight);
            }
        }

    }*/

    pole(x: number, y: number, height: number, color?: string): Mesh {
        const geometry = new BoxGeometry(this.poleWidth, height, this.poleWidth);
        let material = new MeshPhongMaterial({ color: this._color });
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new Mesh(geometry, material);
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, this._baseHeight, y);
        return pole;
    }

    ceilingPole(x: number, y: number, length: number, rot?: number, verPlus?: number): Mesh {
        const geometry = new BoxGeometry(this.poleWidth, this.poleWidth, length);
        let material = new MeshPhongMaterial({ color: this._color });
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new Mesh(geometry, material);
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, (verPlus ? this.poleHeightBack : this.poleHeight) + this._baseHeight, y);
        if (rot) pole.rotateY(rot * Math.PI / 180);
        return pole;
    }
}
