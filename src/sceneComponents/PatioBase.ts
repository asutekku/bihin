import {BoxGeometry, Mesh, MeshPhongMaterial, Scene} from "three";

export class PatioBase {
    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.mesh.scale.y = value;
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


    constructor(scene: Scene) {
        const geometry = new BoxGeometry(1, 1, 1);
        geometry.translate(0, this._height / 2, 0);
        this.material = new MeshPhongMaterial({color: "#826B50"});
        this.material.specular.set(0);
        this.mesh = new Mesh(geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.scale.x = this._width;
        this.mesh.scale.y = this._height;
        this.mesh.scale.z = this._length;
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