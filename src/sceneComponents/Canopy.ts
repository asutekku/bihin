import {BoxGeometry, Mesh, MeshPhongMaterial, Scene} from "three";

export class Canopy {
    private sidePoles: number;
    private frontPoles: number;
    private poleWidth: number = 0.09;
    private color: any;
    private width: number;
    private length: number;
    private height: number;
    private windowsPerSlot: number;
    private poleHeight: number = 2.2;
    private poleHeightBack: number = 3.2;
    private baseHeight: number = 0.2;


    constructor(scene: Scene, width: number, height: number, length: number) {
        this.sidePoles = 2;
        this.frontPoles = 2;
        this.width = width;
        this.length = length;
        this.height = height;
        const x = this.length / 2 - this.poleWidth / 2,
            y = this.width / 2 - this.poleWidth / 2,
            frontLeft = this.pole(x, y, this.poleHeight),
            frontRight = this.pole(x, -y, this.poleHeight),
            backLeft = this.pole(-x, y, this.poleHeightBack),
            backRight = this.pole(-x, -y, this.poleHeightBack),
            horizontalBarLeft = this.ceilingPole(x + this.poleWidth / 2, y, this.length, -90),
            horizontalBarRight = this.ceilingPole(x + this.poleWidth / 2, -y, this.length, -90),
            horizontalBarFront = this.ceilingPole(x, -y - this.poleWidth * 1.5, this.width + this.poleWidth * 2, 0),
            horizontalBarBackTop = this.ceilingPole(-x, -y - this.poleWidth * 1.5, this.width + this.poleWidth * 2, 0, this.poleHeightBack);
        scene.add(frontLeft);
        scene.add(frontRight);
        scene.add(backLeft);
        scene.add(backRight);
        scene.add(horizontalBarLeft);
        scene.add(horizontalBarRight);
        scene.add(horizontalBarFront);
        scene.add(horizontalBarBackTop);
        if (this.width % 2 && 0) {
            this.windowsPerSlot = 2;
        } else {
            this.windowsPerSlot = 3;
        }
        this.frontbars(scene, x, y, this.width, this.length);
        this.sidebars(scene, x, y, this.width, this.length);
    }

    frontbars(scene: Scene, x: number, y: number, width: number, length: number) {
        for (let i = 0; i <= width; i++) {
            if (i !== 0 && i !== length) {
                const polePosition = (-width) * i + this.poleWidth / 2;
                this.windowsPerSlot = 2;
                const pole = this.pole(x, y + polePosition, this.poleHeight);
                if (i % 2 === 0 && width % 2 === 0 && width % 3 !== 0) {
                    this.frontPoles++;
                    scene.add(pole);
                } else if (i % 3 == 0 && width % 3 === 0) {
                    this.frontPoles++;
                    scene.add(pole);
                } else if (i % 3 == 0 && i % 2 == 0 && width % 3 === 0) {
                    this.frontPoles++;
                    scene.add(pole);
                }
            }
        }
    }

    sidebars(scene: Scene, x: number, y: number, width: number, length: number) {
        for (let i = 0; i <= length; i++) {
            if (i !== 0 && i !== length) {
                this.windowsPerSlot = 2;
                const polePosition = (-width) * i + this.poleWidth / 2;
                const poleLeft = this.pole(x + polePosition, y, this.poleHeight);
                const poleRight = this.pole(x + polePosition, -y, this.poleHeight);
                if (i % 2 === 0 && length % 2 === 0 && length % 3 !== 0) {
                    this.sidePoles++;
                    scene.add(poleLeft);
                    scene.add(poleRight);
                } else if (i % 3 == 0 && length % 3 === 0) {
                    this.sidePoles++;
                    scene.add(poleLeft);
                    scene.add(poleRight);
                } else if (i % 3 == 0 && i % 2 == 0 && length % 3 === 0) {
                    this.sidePoles++;
                    scene.add(poleLeft);
                    scene.add(poleRight);
                }
            }
        }
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
        let material = new MeshPhongMaterial({color: this.color});
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new Mesh(geometry, material);
        pole.geometry.translate(0, height / 2, 0);
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, this.baseHeight, y);
        return pole;
    }

    ceilingPole(x: number, y: number, length: number, rot?: number, verPlus?: number): Mesh {
        const geometry = new BoxGeometry(this.poleWidth, this.poleWidth, length);
        let material = new MeshPhongMaterial({color: this.color});
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new Mesh(geometry, material);
        pole.geometry.translate(0, this.poleWidth / 2, length / 2); // Set's the origin to the bottom of the pole
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, (verPlus ? this.poleHeightBack : this.poleHeight) + this.baseHeight, y);
        if (rot) pole.rotateY(rot * Math.PI / 180);
        return pole;
    }
}