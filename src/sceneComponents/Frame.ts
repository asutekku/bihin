import {Scene, Vector3} from "three";
import {Pole} from "./Pole";
import {FrameColour} from "../Models/Window";
import {WindowState} from "../state/WindowState";
import {WindowModel} from "./Window";
import {EditableObject} from "./EditableObject";

export class Frame implements EditableObject {
    get color(): FrameColour {
        return this.model.frameColour;
    }

    set color(value: FrameColour) {
        this.model.frameColour = value;
        this.reDraw();
    }

    get width(): number {
        return this.model.width;
    }

    set width(value: number) {
        this.model.width = value;
        this.reDraw();
    }

    get height(): number {
        return this.model.height;
    }

    set height(value: number) {
        this.model.depth = value;
        this.reDraw();
    }

    get depth(): number {
        return this.model.depth;
    }

    set depth(value: number) {
        this.model.depth = value;
        this.reDraw();
    }

    private model: WindowState;

    position: Vector3 = new Vector3(0, 0, 0);
    objects: Pole[] = [];
    private scene: Scene;

    private leftFrame: Pole;
    private rightFrame: Pole;
    private topFrame: Pole;
    private bottomFrame: Pole;
    private dividers: Pole[] = [];

    constructor(scene: Scene, window: WindowState) {
        this.scene = scene;
        this.model = window;
        this.initValues(window);

        this.leftFrame = new Pole({
            xPos: this.model.width,
            yPos: this.model.height / 2,
            height: this.model.height,
            width: this.model.plankWidth,
            length: this.model.depth,
        });
        this.rightFrame = new Pole({
            xPos: -this.model.width,
            yPos: this.model.height / 2,
            height: this.model.height,
            width: this.model.plankWidth,
            length: this.model.depth,
        });
        this.topFrame = new Pole({
            xPos: this.position.x,
            yPos: this.position.y + this.model.height,
            height: this.model.height * 2,
            width: this.model.plankWidth,
            length: this.model.depth,
            rotZ: -90,
        });
        this.bottomFrame = new Pole({
            xPos: this.position.x,
            yPos: this.position.y,
            height: this.model.height * 2,
            width: this.model.plankWidth,
            length: this.model.depth,
            rotZ: -90
        });

        this.leftFrame.addTo(this.scene);
        this.rightFrame.addTo(this.scene);
        this.topFrame.addTo(this.scene);
        this.bottomFrame.addTo(this.scene);

        this.objects.push(this.leftFrame);
        this.objects.push(this.rightFrame);
        this.objects.push(this.topFrame);
        this.objects.push(this.bottomFrame);
        this.reDraw();
    }

    update(window: WindowState) {
        this.initValues(window);
        this.reDraw();
    }

    drawWindows() {
        let dividerCount = this.model.windowCount - 1;
        let division = this.model.width / this.model.windowCount;
        console.log("Count in Frame:" + this.model.windowCount);
        this.dividers.forEach(pole => {
            this.scene.remove(pole.poleMesh);
            pole.poleGeom.dispose();
        });
        console.log(division);
        this.dividers = [];
        for (let i = 1; i <= dividerCount; i++) {
            let divider = new Pole({
                xPos: -this.model.width / 2 + (division * i),
                yPos: this.position.y + this.model.height / 2,
                height: this.model.height - this.model.plankWidth,
                width: this.model.plankWidth,
                length: this.model.depth,
            });
            divider.scaleZ = this.model.depth;
            this.dividers.push(divider);
            this.scene.add(divider.poleMesh);
        }
        //this.dividers.forEach(d=>d.addTo(this.scene));
    }

    initValues(window: WindowState) {
        this.model = window;
        /*this.model.width = window.width ? window.width : 1.2;
        this.model.height = window.height ? window.height : 1.2;
        this.model.depth = window.depth ? window.depth : 0.17;
        this.model.plankWidth = 0.04;
        this.model.frameColour = window.frameColour;*/
        this.position = new Vector3(0, .2, 0);
    }

    reDraw() {
        this.updateScale();
        this.updatePosition();
        this.drawWindows();
    }

    updateScale(): void {
        this.topFrame.scaleY = this.model.width;
        this.bottomFrame.scaleY = this.model.width;
        this.leftFrame.scaleY = (this.model.height) - this.model.plankWidth;
        this.rightFrame.scaleY = (this.model.height) - this.model.plankWidth;
        this.topFrame.scaleZ = this.model.depth;
        this.bottomFrame.scaleZ = this.model.depth;
        this.leftFrame.scaleZ = this.model.depth;
        this.rightFrame.scaleZ = this.model.depth;
    }

    updatePosition(): void {
        this.leftFrame.position(this.width / 2 - (this.model.plankWidth / 2), this.position.y + this.model.height / 2, 0);
        this.rightFrame.position(-this.model.width / 2 + (this.model.plankWidth / 2), this.position.y + this.model.height / 2, 0);
        this.topFrame.position(this.position.x, this.position.y + this.model.height, 0);
        this.bottomFrame.position(this.position.x, this.position.y, 0);
    }

    set x(position: number) {
        this.position.x = position;
        this.reDraw();
    }

    set y(position: number) {
        this.position.y = position;
        this.reDraw();
    }

    set z(position: number) {
        this.position.z = position;
        this.reDraw();
    }

    get x(): number {
        return this.position.x;
    }

    get y(): number {
        return this.position.y;
    }

    get z(): number {
        return this.position.z;
    }
}
