import {Clock, Color, PCFSoftShadowMap, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from "three";
import GeneralLights from "./sceneComponents/GeneralLights";
import SceneSubject from "./sceneComponents/SceneSubject";
import Scenery from "./sceneComponents/Scenery";
import {OrbitControls} from "three-orbitcontrols-ts";
import {WindowModel} from "./sceneComponents/Window";

export class SceneManager {
    private readonly canvas: HTMLCanvasElement;
    private readonly scene: Scene;
    private static renderer: WebGLRenderer;
    private readonly camera: PerspectiveCamera;
    //private sceneSubjects: (GeneralLights | SceneSubject)[];
    private scenery: Scenery;
    private clock: Clock;
    private readonly screenDimensions: { width: number; height: number };
    private mousePosition: any = {
        x: 0,
        y: 0
    };
    private controls: OrbitControls;
    private domContainer = document.getElementById("terraceDesignerContainer")!;
    static window: WindowModel;
    static image: string;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.screenDimensions = {
            width: this.canvas.width,
            height: this.canvas.height
        };

        this.scene = this.buildScene();
        SceneManager.renderer = this.buildRender(this.screenDimensions);
        this.camera = this.buildCamera(this.screenDimensions);
        this.controls = this.setupControls();

        //this.sceneSubjects = this.createSceneSubjects(this.scene);

        this.scenery = this.setupScenery(this.scene);
        SceneManager.window = this.setupWindow(this.scene);
        this.clock = new Clock();
    }

    buildScene(): Scene {
        const scene: Scene = new Scene();
        scene.background = new Color().setHSL(0.6, 0, 1);
        return scene;
    }

    static getImageData(): string {
        let imgData = "";
        try {
            const strMime = "image/jpeg";
            imgData = SceneManager.renderer.domElement.toDataURL(strMime);
            console.log(imgData);
            return imgData;
        } catch (e) {
            console.log(e);
        }
        return imgData;
    }

    buildRender({width, height}: { width: number; height: number }) {
        const renderer: WebGLRenderer = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        const DPR: number = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = PCFSoftShadowMap;
        return renderer;
    }

    buildCamera({width, height}: { width: number; height: number }) {
        const aspectRatio: number = width / height;
        const fieldOfView: number = 60;
        const nearPlane: number = 0.1;
        const farPlane: number = 300;
        const camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(2, 2, 2);
        new Vector3(0, 1, 0)
        //camera.lookAt(target);

        return camera;
    }

    setupControls() {
        const controls = new OrbitControls(this.camera, this.domContainer);
        controls.maxPolarAngle = Math.PI / 2 - 0.1;
        controls.update();
        controls.target = new Vector3(0, .5, 0);
        return controls;
    }

    createSceneSubjects(scene: Scene) {
        return [new GeneralLights(scene), new SceneSubject(scene)];
    }

    setupScenery(scene: Scene) {
        return new Scenery(scene);
    }

    setupWindow(scene: Scene) {
        return new WindowModel(scene);
    }

    update() {
        this.controls.update();
        const elapsedTime = this.clock.getElapsedTime();
        /*for (let i = 0; i < this.sceneSubjects.length; i++)
            this.sceneSubjects[i].update(elapsedTime);*/
        SceneManager.renderer.render(this.scene, this.camera);
    }

    onMouseMove(x: number, y: number) {
        this.mousePosition.xPos = x;
        this.mousePosition.yPos = y;
    }

    onWindowResize() {
        const {width, height}: { width: number; height: number } = this.canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        SceneManager.renderer.setSize(width, height);
    }
}
