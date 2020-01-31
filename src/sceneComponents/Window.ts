import {Scene} from "three";
import {Frame} from "./Frame";
import {WindowState} from "../state/WindowState";

export class WindowModel {

    update(window: WindowState): void {
        this.frame.update(window);
    }

    frame: Frame;
    windowState: WindowState;

    private _width: number = 1.4;
    private _height: number = 1;
    private _depth: number = 0.21;


    constructor(scene: Scene, window: WindowState) {
        this.windowState = window;
        this.frame = new Frame(scene, this.windowState);
    }

}
