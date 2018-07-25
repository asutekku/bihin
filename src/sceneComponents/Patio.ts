import {Mesh, Scene} from "three";
import {PatioBase} from "./PatioBase";
import {Canopy} from "./Canopy";

export class Patio {

    base: PatioBase;
    canopy: Canopy;

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
    color: number = 0xd2d2d2; // cm
    windowsPerSlot: number = 3; // cm
    windowDepth: number = 1; // cm
    windowHeight: number = this.poleHeight; // cm
    sidePoles: number = 2; // cm
    frontPoles: number = 2; // cm

    constructor(scene: Scene) {
        this.base = new PatioBase(scene);
        this.canopy = new Canopy(scene, this.width, this.height, this.length,this.color);
        this.canopy.color = this.color;
    }

    update(): void {

    }
}