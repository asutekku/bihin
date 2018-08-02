import { Mesh, Scene } from "three";
import { PatioBase } from "./PatioBase";
import { Canopy } from "./Canopy";

export class Patio {
    get canopyRaiseHeight(): number {
        return this._canopyRaiseHeight;
    }

    set canopyRaiseHeight(value: number) {
        this._canopyRaiseHeight = value;
        this.canopy.raiseHeight = this._canopyRaiseHeight;
    }

    get canopyHeight(): number {
        return this._canopyHeight;
    }

    set canopyHeight(value: number) {
        this._canopyHeight = value;
        this.canopy.height = this._canopyHeight;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this.base.width = this._width;
        this.canopy.width = this._width;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.base.height = this._height;
        this.canopy.baseHeight = this._height;
    }

    get length(): number {
        return this._length;
    }

    set length(value: number) {
        this._length = value;
        this.base.length = this._length;
        this.canopy.length = this._length;
    }

    base: PatioBase;
    canopy: Canopy;

    state: any = {
        patio: {
            length: 3,
            width: 3,
            height: 0.2
        },
        fences: {
            show: <boolean>false,
            showRight: <boolean>true,
            showLeft: <boolean>true,
            showFront: <boolean>true,
            evenHeight: <boolean>true,
            heightAll: <number>0.8,
            heightFront: <number>0.8,
            heightLeft: <number>0.8,
            heightRight: <number>0.8,
            depth: <number>0.05
        },
        canopy: {
            show: true,
            showWindows: true,
            height: 2.2,
            heightBack: 3.0,
            windowsPerSlow: 3
        }
    };
    private _length: number = 3;
    private _width: number = 3;
    private _height: number = 0.2;

    showFences: boolean = false;
    showFencesFront: boolean = true;
    showFencesRight: boolean = true;
    showFencesLeft: boolean = true;
    evenFenceHeight: boolean = true;
    fenceHeight: number = 0.8; // cm
    fenceHeightLeft: number = 0.8; // cm
    fenceHeightFront: number = 0.8; // cm
    fenceHeightRight: number = 0.8; // cm
    fenceDepth: number = 5; // cm

    showCanopy: boolean = true;
    showWindows: boolean = true;

    poleWidth: number = 9; // cm
    poleHorHeight: number = 14; // cm

    private _canopyHeight: number = 2.2; // cm
    private _canopyRaiseHeight: number = 0.8; // cm

    poleHeightBack: number = 3.2; // cm
    color: number = 0xd2d2d2; // cm
    windowsPerSlot: number = 3; // cm
    windowDepth: number = 1; // cm
    windowHeight: number = this._canopyHeight; // cm
    sidePoles: number = 2; // cm
    frontPoles: number = 2; // cm

    constructor(scene: Scene) {
        this.base = new PatioBase(scene);
        this.canopy = new Canopy(scene, this._width, this._canopyHeight, this._length, this.color);
        this.canopy.color = this.color;
    }

    update(): void {}
}
