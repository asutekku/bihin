import {Direction, FrameColour, IWindowModel, WindowType} from "../Models/Window";

export class WindowState implements IWindowModel {
    direction: Direction = Direction.horizontal;
    firstWidth: number;
    frameColour: FrameColour = FrameColour.S0502Y;
    frameWidth: 0.042;
    secondWidth: number;
    thirdWidth: number;
    type: WindowType;
    width: number;
    height: number;
    depth: number;
    windowCount: number = 2;
    equalDivision: boolean = false;
    image: string = "";
    plankWidth: number;

    setType(type: WindowType) {
        switch (type) {
            case WindowType.A:
                this.windowCount = 1;
                this.direction = Direction.horizontal;
                this.equalDivision = false;
                break;
            case WindowType.BI:
                console.log("Got Bi");
                this.windowCount = 2;
                this.direction = Direction.horizontal;
                this.equalDivision = false;
                break;
            case WindowType.BL:
                this.windowCount = 2;
                this.direction = Direction.horizontal;
                this.equalDivision = false;
                break;
            case WindowType.BTJ:
                this.windowCount = 2;
                this.direction = Direction.horizontal;
                this.equalDivision = true;
                break;
            case WindowType.E:
                this.windowCount = 3;
                this.direction = Direction.horizontal;
                this.equalDivision = false;
                break;
            case WindowType.F:
                this.windowCount = 2;
                this.direction = Direction.vertical;
                this.equalDivision = false;
                break;
            case WindowType.T:
                break;
        }
        console.log("Count in State:" + this.windowCount);
    }

    constructor(type: WindowType) {
        this.width = 1.4;
        this.height = 1;
        this.depth = 0.21;
        this.plankWidth = 0.04;
        this.firstWidth = this.width;
        this.type = type;
        this.frameWidth = 0.042;
        this.setType(type);
        this.secondWidth = 0;
        this.thirdWidth = 0;
    }


}