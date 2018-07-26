import { IcosahedronBufferGeometry, Mesh, MeshStandardMaterial } from "three";

export default class SceneSubject {
    private readonly mesh: Mesh;
    private radius: number;

    constructor(scene: THREE.Scene) {
        this.radius = 2;
        this.mesh = new Mesh(new IcosahedronBufferGeometry(this.radius, 2), new MeshStandardMaterial({ flatShading: true }));
        this.mesh.position.set(0, 0, -20);
        scene.add(this.mesh);
    }

    update(time: number) {
        const scale = Math.sin(time) + 2;
        this.mesh.scale.set(scale, scale, scale);
    }
}
