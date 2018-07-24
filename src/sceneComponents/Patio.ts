import {Mesh, Scene} from "three";
import {PatioBase} from "./PatioBase";

export class Patio {

    base: PatioBase;

    length: number = 3;
    width: number = 3;
    height: number = 0.2;

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
    terraceColor: string = "#d2d2d2"; // cm
    windowsPerSlot: number = 3; // cm
    windowDepth: number = 1; // cm
    windowHeight: number = this.poleHeight; // cm
    sidePoles: number = 2; // cm
    frontPoles: number = 2; // cm

    constructor(scene: Scene) {
        this.base = new PatioBase(scene);
    }

    update():void {

    }
}