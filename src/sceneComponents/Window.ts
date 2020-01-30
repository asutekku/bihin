import {Scene} from "three";
import {Frame} from "./Frame";
import {FrameColour} from "../Models/Window";

export class WindowModel {

    get canopyHeight(): number {
        return this._canopyHeight;
    }

    set canopyHeight(value: number) {
        this._canopyHeight = value;
        this.frame.height = this._canopyHeight;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        //this.base.width = this._width;
        this.frame.width = this._width;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        //this.base.height = this._height;
        this.frame.height = this._height;
    }

    get depth(): number {
        return this._depth;
    }

    set depth(value: number) {
        this._depth = value;
        //this.base.length = this._length;
        this.frame.depth = this._depth;
    }

    //base: PatioBase;
    frame: Frame;

    private _width: number = 1.4;
    private _height: number = 1;
    private _depth: number = 0.21;

    showCanopy: boolean = true;
    showWindows: boolean = true;

    poleWidth: number = 9; // cm
    poleHorHeight: number = 14; // cm

    private _canopyHeight: number = 2.2; // cm
    private _canopyRaiseHeight: number = 0.8; // cm

    poleHeightBack: number = 3.2; // cm
    color: FrameColour = FrameColour.S0502Y; // cm
    windowsPerSlot: number = 3; // cm
    windowDepth: number = 1; // cm
    windowHeight: number = this._canopyHeight; // cm
    sidePoles: number = 2; // cm
    frontPoles: number = 2; // cm

    constructor(scene: Scene) {
        //this.base = new PatioBase(scene);
        this.frame = new Frame(scene, this._width, this._height, this._depth, this.color);
        this.frame.color = this.color;
    }

    update(): void {
    }
}
