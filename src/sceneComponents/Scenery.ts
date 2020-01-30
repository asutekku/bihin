import {
    AxesHelper,
    BackSide,
    Color,
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    Mesh,
    MeshPhongMaterial,
    PlaneBufferGeometry,
    Scene,
    ShaderMaterial,
    SphereBufferGeometry
} from "three";

export default class Scenery {
    private groundGeo: PlaneBufferGeometry;
    private groundMat: MeshPhongMaterial;
    private ground: Mesh;
    private hemiLight: HemisphereLight | undefined;
    private dirLight: any | undefined;
    private hemiLightHelper: HemisphereLightHelper | undefined;
    private dirLightHelper: DirectionalLightHelper | undefined;

    private vertexShader: string = "varying vec3 vWorldPosition;void main() {vec4 worldPosition = modelMatrix * vec4( position, 1.0 );vWorldPosition = worldPosition.xyz;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}";
    private fragmentShader: string = "uniform vec3 topColor;uniform vec3 bottomColor;uniform float offset;uniform float exponent;varying vec3 vWorldPosition;void main() {float h = normalize( vWorldPosition + offset ).y;gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );}";

    constructor(scene: Scene) {
        this.groundGeo = new PlaneBufferGeometry(300, 300);
        this.groundMat = new MeshPhongMaterial({color: 0xffffff, specular: 0xffffff});
        this.groundMat.color.setHex(0x608038);
        this.groundMat.specular.set(0);
        this.ground = new Mesh(this.groundGeo, this.groundMat);
        this.ground.receiveShadow = true;
        this.ground.rotation.x -= Math.PI / 2;
        this.ground.position.y = 0;
        this.sceneLights(scene);
        this.addSkydome(scene);
        scene.add(this.ground);
    }

    private sceneLights(scene: Scene): void {
        this.hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
        this.hemiLightHelper = new HemisphereLightHelper(this.hemiLight, 1);
        this.dirLight = new DirectionalLight(0xffffff, 1);
        this.dirLightHelper = new DirectionalLightHelper(this.dirLight, 1);
        this.hemiLight.color.setHSL(0.6, 1, 0.6);
        this.hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        this.hemiLight.position.set(0, 1, 0);

        this.dirLight.color.setHSL(0.1, 1, 0.95);
        this.dirLight.position.set(3, 10, 3);
        //this.dirLight.position.multiplyScalar(30);
        this.dirLight.castShadow = true;
        this.dirLight.name = "sunLight";
        this.dirLight.shadow.mapSize.width = 2048;
        this.dirLight.shadow.mapSize.height = 2048;
        const d = 10;
        this.dirLight.shadow.camera.left = -d;
        this.dirLight.shadow.camera.right = d;
        this.dirLight.shadow.camera.top = d;
        this.dirLight.shadow.camera.bottom = -d;
        this.dirLight.shadow.camera.far = 100;
        this.dirLight.shadow.bias = -0.0001;
        scene.add(this.hemiLight);
        //scene.add(this.hemiLightHelper);
        scene.add(this.dirLight);
        //scene.add(this.dirLightHelper);
    }

    private helper(scene: Scene): void {
        /**
         * An axis object to visualize the 3 axes in a simple way.
         * The X axis is red. The Y axis is green. The Z axis is blue.
         * @type {AxesHelper}
         */
        const axesHelper = new AxesHelper(2);
        axesHelper.position.set(0, 2, 0);
        scene.add(axesHelper);
    }

    private addSkydome(scene: Scene): void {
        const uniforms = {
            topColor: {value: new Color(0x0077ff)},
            bottomColor: {value: new Color(0xffffff)},
            offset: {value: 33},
            exponent: {value: 0.6}
        };
        uniforms.topColor.value.copy(this.hemiLight!.color);
        // TerraceDesigner.scene.fog.color.copy( uniforms.bottomColor.value );
        const skyGeo = new SphereBufferGeometry(100, 32, 15);
        const skyMat = new ShaderMaterial({
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader,
            uniforms: uniforms,
            side: BackSide
        });
        const sky = new Mesh(skyGeo, skyMat);
        scene.add(sky);
    }
}
