enum FrameDepth {
}

export enum FrameColour {
    S0502Y = '#F7EFE4',
    RAL9010 = '#EEECE4',
    RR32 = '#4F361C',
    RR23 = '#545452'
}

export enum WindowType {
    A = "A",
    BI = "BI",
    BL = "BL",
    BTJ = "BTJ",
    E = "E",
    F = "F",
    T = "T"
}

export enum Direction {
    vertical,
    horizontal
}

export interface IWindowModel {
    frameWidth: 0.042;
    frameColour: FrameColour;
    type: WindowType;
    width: number;
    height: number;
    depth: number; //mm
    plankWidth: number;
    windowCount: number;
    firstWidth: number;
    secondWidth: number;
    thirdWidth: number;
    direction: Direction;
    equalDivision: boolean;
    image: string;
}