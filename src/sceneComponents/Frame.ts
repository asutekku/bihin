import {BoxGeometry, Color, Mesh, MeshPhongMaterial, Object3D, Scene, Vector3} from "three";
import {Pole} from "./Pole";
import {FrameColour} from "../Models/Window";

export class Frame {
    get color(): FrameColour {
        return this._color;
    }

    set color(value: FrameColour) {
        this._color = value;
        this.reDraw();
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this.reDraw();
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.reDraw();
    }

    get depth(): number {
        return this._depth;
    }

    set depth(value: number) {
        this._depth = value;
        this.reDraw();
    }

    private _width: number;
    private _height: number;
    private _depth: number;
    private _position: Vector3;
    objects: Pole[] = [];
    private scene: Scene;

    private leftFrame: Pole;
    private rightFrame: Pole;
    private topFrame: Pole;
    private bottomFrame: Pole;
    private _color: FrameColour;
    private _plankWidth: number = 0.04;

    constructor(scene: Scene, width: number, height: number, depth: number, color: FrameColour) {
        this.scene = scene;
        this._width = width ? width : 1.2;
        this._height = height ? height : 1.2;
        this._depth = depth ? depth : 0.17;
        this._position = new Vector3(0, .2, 0);
        this._color = FrameColour.S0502Y;

        this.leftFrame = new Pole({
            xPos: this._width,
            yPos: +this._height / 2,
            height: this._height,
            width: this._plankWidth,
            length: this._depth,
        });
        this.rightFrame = new Pole({
            xPos: -this._width,
            yPos: +this._height / 2,
            height: this._height,
            width: this._plankWidth,
            length: this._depth,
        });
        this.topFrame = new Pole({
            xPos: this._position.x,
            yPos: this._position.y + this._height,
            height: this._height * 2,
            width: this._plankWidth,
            length: this._depth,
            rotZ: -90,
        });
        this.bottomFrame = new Pole({
            xPos: this._position.x,
            yPos: this._position.y,
            height: this._height * 2,
            width: this._plankWidth,
            length: this._depth,
            rotZ: -90
        });

        this.leftFrame.addTo(scene);
        this.rightFrame.addTo(scene);
        this.topFrame.addTo(scene);
        this.bottomFrame.addTo(scene);

        this.objects.push(this.leftFrame);
        this.objects.push(this.rightFrame);
        this.objects.push(this.topFrame);
        this.objects.push(this.bottomFrame);
        this.reDraw();
    }


    reDraw() {
        this.updateScale();
        this.updatePosition();
    }

    updateScale(): void {
        this.topFrame.scaleY = this._width;
        this.bottomFrame.scaleY = this._width;
        this.leftFrame.scaleY = (this._height) - this._plankWidth;
        this.rightFrame.scaleY = (this._height) - this._plankWidth;
        this.topFrame.scaleZ = this._depth;
        this.bottomFrame.scaleZ = this._depth;
        this.leftFrame.scaleZ = this._depth;
        this.rightFrame.scaleZ = this._depth;
    }

    updatePosition(): void {
        this.leftFrame.position(this._width / 2 - (this._plankWidth / 2), this._position.y + this._height/2, 0);
        this.rightFrame.position(-this._width / 2 + (this._plankWidth / 2), this._position.y + this._height/2, 0);
        this.topFrame.position(this._position.x, this._position.y + this._height, 0);
        this.bottomFrame.position(this._position.x, this._position.y, 0);
    }

    set x(position: number) {
        this.reDraw();
        this._position.x = position;
    }

    set y(position: number) {
        this.reDraw();
        this._position.y = position;
    }

    set z(position: number) {
        this._position.z = position;
    }

    get x(): number {
        return this._position.x;
    }

    get y(): number {
        return this._position.y;
    }

    get z(): number {
        return this._position.z;
    }
}
