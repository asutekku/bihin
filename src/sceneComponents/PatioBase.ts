import { BoxGeometry, Mesh, MeshPhongMaterial, Object3D, Scene } from "three";

export class PatioBase {
    private scene: Scene;

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.scene.remove(this.mesh);
        this.geometry.dispose();
        this.geometry = new BoxGeometry(1, 1, 1);
        this.geometry.translate(0, value / 2, 0);
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.scale.xPos = this._width;
        this.mesh.scale.yPos = this._height;
        this.mesh.scale.zPos = this._length;
        this.scene.add(this.mesh);
    }

    get length(): number {
        return this._length;
    }

    set length(value: number) {
        this._length = value;
        this.mesh.scale.zPos = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this.mesh.scale.xPos = value;
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
        this.geometry.translate(0, this._height / 2, 0);
        this.material = new MeshPhongMaterial({ color: "#826B50" });
        this.material.specular.set(0);
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.scale.xPos = this._width;
        this.mesh.scale.yPos = this._height;
        this.mesh.scale.zPos = this._length;
        scene.add(this.mesh);
    }

    color(color: THREE.Color) {
        this.material.color = color;
    }
}

/*
* Calculation for patio built on many smaller pieces
*
    for (let i = 0; i < this.width; i++) {
        for (let d = 0; d < this.length; d++) {
            const x = i * this.length - this.length / 2 + this.patioBaseWidth / 2,
                y = d * this.width - this.width / 2 + this.patioBaseWidth / 2,
                terracePiece = this.base(x, y);
            scene.add(terracePiece);
        }
    }
 */
