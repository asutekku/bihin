import {BoxGeometry, Mesh, MeshPhongMaterial, Scene} from "three";
import {Pole} from "./Pole";

//X is width

export class Canopy {

    get length(): number {
        return this._length;
    }

    set length(value: number) {
        this._length = value;
        this.updateScale();
        this.updatePosition();
        this.frontBars();
    }

    private horizontalBarFront: Pole;
    private frontLeft: Pole;
    private frontRight: Pole;
    private backLeft: Pole;
    private backRight: Pole;
    private horizontalBarLeft: Pole;
    private horizontalBarRight: Pole;
    private horizontalBarBackTop: Pole;

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this.updateScale();
        this.updatePosition();
        this.frontBars();
    }

    get raiseHeight(): number {
        return this._raiseHeight;
    }

    set raiseHeight(value: number) {
        this._raiseHeight = value;
        this.updateScale();
        this.updatePosition();
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.updateScale();
        this.updatePosition();
        this.frontBars();
    }

    get baseHeight(): number {
        return this._baseHeight;
    }

    set baseHeight(value: number) {
        this._baseHeight = value;
        this.updatePosition();
        this.frontBars();
    }

    get color(): number {
        return this._color;
    }

    set color(value: number) {
        this._color = value;
        this.poles.forEach((pole: Pole) => {
            pole.color = value;
        });
    }

    private scene: Scene;

    private sidePoles: number;
    private frontPoles: number;
    private poleWidth: number = 0.09;
    private _color: number;
    private _width: number;
    private _length: number;

    private _height: number;
    private _raiseHeight: number;

    private windowsPerSlot: number;
    private poleHeight: number = 2.2;
    private poleHeightBack: number = 3.2;
    private _baseHeight: number = 0.2;
    private poles: Pole[] = [];
    private front: Pole[] = [];

    updateScale(): void {
        this.horizontalBarFront.scaleY = this._width - (this.poleWidth * 2);
        this.horizontalBarBackTop.scaleY = this._width - (this.poleWidth * 2);
        this.horizontalBarLeft.scaleY = this._length - (this.poleWidth * 2);
        this.horizontalBarRight.scaleY = this._length - (this.poleWidth * 2);
        this.frontLeft.scaleY = this._height;
        this.frontRight.scaleY = this._height;
        this.backRight.scaleY = this._raiseHeight;
        this.backLeft.scaleY = this._raiseHeight;
    }

    updatePosition(): void {
        const x = this._width / 2 - this.poleWidth / 2;
        const z = this._length / 2 - this.poleWidth / 2;
        const height = this._baseHeight + (this._height / 2);
        const backHeight = this._baseHeight + ((this._raiseHeight) / 2);
        this.frontLeft.position(x, height, z);
        this.frontRight.position(-x, height, z);
        this.backLeft.position(x, backHeight, -z);
        this.backRight.position(-x, backHeight, -z);
        this.horizontalBarLeft.position(x, this._baseHeight + this._height - (this.poleWidth / 2), 0);
        this.horizontalBarRight.position(-x, this._baseHeight + this._height - (this.poleWidth / 2), 0);
        this.horizontalBarFront.position(0, this._baseHeight + this._height - (this.poleWidth / 2), z);
        this.horizontalBarBackTop.position(0, this._baseHeight + this._raiseHeight - (this.poleWidth / 2), -z);
    }

    constructor(scene: Scene, width: number, height: number, length: number, color: number) {
        this.sidePoles = 2;
        this.frontPoles = 2;
        this._width = width;
        this._length = length;
        this._height = height;
        this._raiseHeight = height + 0.8;
        this._color = color;
        this.scene = scene;
        const x = this._width / 2 - this.poleWidth / 2;
        const y = this._length / 2 - this.poleWidth / 2;
        this.frontLeft = new Pole({xPos: x, yPos: y, height: this.poleHeight});
        this.frontRight = new Pole({xPos: x, yPos: -y, height: this.poleHeight});
        this.backLeft = new Pole({xPos: -x, yPos: y, height: this.poleHeightBack});
        this.backRight = new Pole({xPos: -x, yPos: -y, height: this.poleHeightBack});
        this.horizontalBarLeft = new Pole({
            xPos: x,
            yPos: 0,
            length: this._length,
            rotZ: -90,
            rotY: 90
        });
        this.horizontalBarRight = new Pole({
            xPos: -x,
            yPos: 0,
            length: this._length,
            rotZ: -90,
            rotY: 90
        });
        this.horizontalBarFront = new Pole({
            xPos: 0,
            yPos: y,
            zPos: this._width + this.poleWidth * 2,
            rotZ: -90
        });
        this.horizontalBarBackTop = new Pole({
            xPos: 0,
            yPos: -y,
            length: this._width + this.poleWidth * 2,
            rotZ: -90,
            height: this.poleHeightBack
        });
        this.frontLeft.addTo(scene);
        this.frontRight.addTo(scene);
        this.backLeft.addTo(scene);
        this.backRight.addTo(scene);
        this.horizontalBarLeft.addTo(scene);
        this.horizontalBarRight.addTo(scene);
        this.horizontalBarFront.addTo(scene);
        this.horizontalBarBackTop.addTo(scene);
        this.poles.push(this.frontLeft);
        this.poles.push(this.frontRight);
        this.poles.push(this.backLeft);
        this.poles.push(this.backRight);
        this.poles.push(this.horizontalBarLeft);
        this.poles.push(this.horizontalBarRight);
        this.poles.push(this.horizontalBarFront);
        this.poles.push(this.horizontalBarBackTop);
        if (this._width % 2 && 0) {
            this.windowsPerSlot = 2;
        } else {
            this.windowsPerSlot = 3;
        }
        this.frontBars();
        //this.sidebars(scene, x, y, this._width, this._length);
        //this.ceiling(scene);
        this.updateScale();
        this.updatePosition();
    }

    private frontBars(): void {
        const x = this._width / 2 - this.poleWidth / 2;
        const z = this._length / 2 - this.poleWidth / 2;
        this.front.forEach(pole => {
            this.scene.remove(pole.poleMesh);
            pole.poleGeom.dispose();
            this.poles.splice(this.poles.indexOf(pole), 1);
        });
        for (let i = 0; i <= this._width; i++) {
            if (i !== 0 && i !== length) {
                this.windowsPerSlot = 2;
                const pole = new Pole({width: this.poleWidth, height: this.height, length: this.poleWidth});
                pole.position((x + this.poleWidth) - i, this._baseHeight + (this.height / 2), z);
                //const pole = this.pole(x, y + polePosition, this.poleHeight);
                if (i % 2 === 0 && this._width % 2 === 0 && this._width % 3 !== 0) {
                    this.addFrontPole(this.scene, pole);
                    this.front.push(pole);
                } else if (i % 3 === 0 && this._width % 3 === 0) {
                    this.addFrontPole(this.scene, pole);
                    this.front.push(pole);
                } else if (i % 3 === 0 && i % 2 === 0 && this._width % 3 === 0) {
                    this.addFrontPole(this.scene, pole);
                    this.front.push(pole);
                }
            }
        }
    }

    addFrontPole(scene: Scene, pole: Pole): void {
        this.frontPoles++;
        scene.add(pole.poleMesh);
        this.poles.push(pole);
    }

    addSidePole(scene: Scene, poleLeft: Pole, poleRight: Pole): void {
        this.sidePoles++;
        scene.add(poleLeft.poleMesh);
        scene.add(poleRight.poleMesh);
        this.poles.push(poleLeft);
        this.poles.push(poleRight);
    }

    sidebars(scene: Scene, x: number, y: number, width: number, length: number): void {
        for (let i = 0; i <= length; i++) {
            if (i !== 0 && i !== length) {
                this.windowsPerSlot = 2;
                const polePosition = -width * i + this.poleWidth / 2;
                const poleLeft = new Pole({xPos: x + polePosition, yPos: y, height: this.poleHeight});
                const poleRight = new Pole({xPos: x + polePosition, yPos: -y, height: this.poleHeight});
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
        const count: number = Math.round((this._width - this.poleWidth) * 100 / 80),
            length = Math.sqrt(Math.pow(this._length, 2) + Math.pow(this.poleHeightBack - this.poleHeight, 2)) + 0.1,
            x = this._length / 2 - this.poleWidth / 2,
            y = this._width / 2 - this.poleWidth / 2,
            divide = this._width / count,
            height = this.poleHeightBack - this.poleHeight,
            angle: number = Math.asin(height / length);
        console.log(angle);
        for (let i = 0; i < count + 1; i++) {
            const ceilingPole = new Pole({
                xPos: -x,
                yPos: y - 1,
                length: length,
                rotY: 90,
                rotX: angle,
                height: this.poleHeight
            });
            this.poles.push(ceilingPole);
            ceilingPole.addTo(scene);
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
        let material = new MeshPhongMaterial({color: this._color});
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new Mesh(geometry, material);
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, this._baseHeight, y);
        return pole;
    }

    ceilingPole(x: number, y: number, length: number, rot?: number, verPlus?: number): Mesh {
        const geometry = new BoxGeometry(this.poleWidth, this.poleWidth, length);
        let material = new MeshPhongMaterial({color: this._color});
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new Mesh(geometry, material);
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, (verPlus ? this.poleHeightBack : this.poleHeight) + this._baseHeight, y);
        if (rot) pole.rotateY(rot * Math.PI / 180);
        return pole;
    }
}
