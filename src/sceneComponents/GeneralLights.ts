import {PointLight, Scene} from "three";

export default class GeneralLights {
    scene: Scene;
    light: PointLight;

    constructor(scene: Scene) {
        this.scene = scene;
        this.light = new PointLight("#2222ff", 1);
        scene.add(this.light);
    }

    update(time: number) {
        this.light.intensity = (Math.sin(time) + 1.5) / 1.5;
        this.light.color.setHSL(Math.sin(time), 0.5, 0.5);
    }
}
