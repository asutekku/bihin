import {Mesh, Scene} from "three";
import {PatioBase} from "./PatioBase";
import {Canopy} from "./Canopy";

export class Patio {

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this.base.width = value;
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this.base.height = value;
        this._height = value;
    }

    get length(): number {
        return this._length;
    }

    set length(value: number) {
        this.base.length = value;
        this._length = value;
    }

    base: PatioBase;
    canopy: Canopy;

    private _length: number = 3;
    private _width: number = 3;
    private _height: number = 0.2;

    showFences: boolean = false;
    showFencesFront: boolean = true;
    showFencesRight: boolean = true;
    showFencesLeft: boolean = true;
    evenFenceHeight: boolean = true;
    fenceHeight: number = 80; // cm
    fenceHeightLeft: number = 80; // cm
    fenceHeightFront: number = 80; // cm
    fenceHeightRight: number = 80; // cm
    fenceDepth: number = 5; // cm

    showCanopy: boolean = true;
    showWindows: boolean = true;

    poleWidth: number = 9; // cm
    poleHorHeight: number = 14; // cm
    poleHeight: number = 220; // cm
    poleHeightBack: number = 320; // cm
    color: number = 0xd2d2d2; // cm
    windowsPerSlot: number = 3; // cm
    windowDepth: number = 1; // cm
    windowHeight: number = this.poleHeight; // cm
    sidePoles: number = 2; // cm
    frontPoles: number = 2; // cm

    constructor(scene: Scene) {
        this.base = new PatioBase(scene);
        this.canopy = new Canopy(scene, this._width, this._height, this._length, this.color);
        this.canopy.color = this.color;
    }

    update(): void {

    }
}