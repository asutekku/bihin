import { BoxGeometry, Mesh, MeshPhongMaterial, Object3D, Scene } from "three";

export class PatioBase {
    private scene: Scene;

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.mesh.scale.y = this._height;
        this.mesh.position.y = this._height / 2;
    }

    get length(): number {
        return this._length;
    }

    set length(value: number) {
        this._length = value;
        this.mesh.scale.z = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this.mesh.scale.x = value;
    }

    private _width: number = 3;
    private _length: number = 3;
    private _height: number = 0.2;
    material: MeshPhongMaterial;
    mesh: Mesh;
    geometry: BoxGeometry;

    constructor(scene: Scene) {
        this.scene = scene;
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshPhongMaterial({ color: "#826B50" });
        this.material.specular.set(0);
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.scale.x = this._width;
        this.mesh.scale.y = this._height;
        this.mesh.scale.z = this._length;
        this.mesh.position.y = this._height / 2;
        scene.add(this.mesh);
    }

    color(color: THREE.Color) {
        this.material.color = color;
    }
}
