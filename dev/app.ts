const canvas = document.getElementById("terraceDesignerContainer");


class TerraceDesigner {
    static scene: THREE.Scene;
    static camera: THREE.PerspectiveCamera;
    static controls: THREE.OrbitControls;
    static renderer: THREE.WebGLRenderer;
    static hemiLight: THREE.HemisphereLight;
    static domContainer: HTMLElement;
    static rayCaster: THREE.Raycaster;
    static mouse: THREE.Vector2;

    public static main(): void {
        TerraceDesigner.initScene();
        TerraceDesigner.addRaycaster();
        PatioBuilder.buildPatio();
        //Controls.setTerraceValueControls();
        TerraceDesigner.render();
    }

    static initScene(): void {
        TerraceDesigner.domContainer = document.getElementById("3dContainer");
        TerraceDesigner.scene = new THREE.Scene();
        TerraceDesigner.scene.background = new THREE.Color().setHSL(0.6, 0, 1);
        //TerraceDesigner.scene.fog = new THREE.Fog( TerraceDesigner.scene.background, 1, 5000 );
        TerraceDesigner.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50000);
        TerraceDesigner.controls = new THREE.OrbitControls(TerraceDesigner.camera, TerraceDesigner.domContainer);
        TerraceDesigner.camera.position.set(400, 180, 800);
        TerraceDesigner.camera.lookAt(new THREE.Vector3(0, 120, 0));
        TerraceDesigner.mouse = new THREE.Vector2();
        TerraceDesigner.controls.update();
        TerraceDesigner.renderer = new THREE.WebGLRenderer();
        TerraceDesigner.renderer.setSize(window.innerWidth, window.innerHeight);
        TerraceDesigner.renderer.domElement.id = "canvas-3d";
        TerraceDesigner.renderer.shadowMap.enabled = true;
        TerraceDesigner.domContainer.appendChild(TerraceDesigner.renderer.domElement);
    }

    static render = () => {
        requestAnimationFrame(TerraceDesigner.render);
        TerraceDesigner.controls.update();
        TerraceDesigner.renderer.render(TerraceDesigner.scene, TerraceDesigner.camera);
        TerraceDesigner.rayCaster.setFromCamera(TerraceDesigner.mouse, TerraceDesigner.camera);
    };

    static addRaycaster(): void {
        TerraceDesigner.rayCaster = new THREE.Raycaster();
    }
}



class PatioBuilder {
    static patioElements: THREE.Mesh[] = [];
    static patioFences: THREE.Mesh[] = [];
    static patioDepth: number;
    static patioWidth: number;
    static patioDepthCount: number = 3;
    static patioWidthCount: number = 3;
    static patioBaseWidth = 100; // cm
    static patioBaseHeight = 20; // cm

    static showFences: boolean = false;
    static showFencesFront: boolean = true;
    static showFencesRight: boolean = true;
    static showFencesLeft: boolean = true;
    static evenFenceHeight: boolean = true;
    static fenceHeight: number = 80; // cm
    static fenceHeightLeft: number = 80; // cm
    static fenceHeightFront: number = 80; // cm
    static fenceHeightRight: number = 80; // cm
    static fenceDepth: number = 5; // cm

    static showCanopy: boolean = true;
    static showWindows: boolean = true;
    static poleWidth: number = 9; // cm
    static poleHorHeight: number = 14; // cm
    static poleHeight: number = 220; // cm
    static poleHeightBack: number = 320; // cm
    static terraceColor: string = "#d2d2d2"; // cm
    static windowsPerSlot: number = 3; // cm
    static windowDepth: number = 1; // cm
    static windowHeight: number = PatioBuilder.poleHeight; // cm
    static sidePoles: number = 2; // cm
    static frontPoles: number = 2; // cm

    static buildPatio() {
        this.patioDepth = PatioBuilder.patioDepthCount * 100;
        this.patioWidth = PatioBuilder.patioWidthCount * 100;
        if (PatioBuilder.patioElements)
            PatioBuilder.patioElements.forEach(e => {
                TerraceDesigner.scene.remove(e);
                e.geometry.dispose();
                e = undefined;
            });
        for (let i = 0; i < this.patioDepthCount; i++) {
            for (let d = 0; d < this.patioWidthCount; d++) {
                const x = i * this.patioBaseWidth - this.patioDepth / 2 + this.patioBaseWidth / 2,
                    y = d * this.patioBaseWidth - this.patioWidth / 2 + this.patioBaseWidth / 2,
                    terracePiece = this.base(x, y);
                TerraceDesigner.scene.add(terracePiece);
            }
        }
        if (this.showFences) {
            PatioBuilder.fences();
        }
        if (this.showCanopy) {
            PatioBuilder.canopy();
            PatioBuilder.ceiling();
        }
        if (this.showWindows) {
            PatioBuilder.windows();
        }
    }

    private static ceiling(): void {
        const count: number = Math.round(this.patioWidth / 80),
            length = Math.sqrt(Math.pow(this.patioDepth, 2) + Math.pow(this.poleHeightBack - this.poleHeight, 2)) + 10,
            x = this.patioDepth / 2 - this.poleWidth / 2,
            y = this.patioWidth / 2 - this.poleWidth / 2,
            divide = this.patioWidth / count,
            height = this.poleHeightBack - this.poleHeight,
            angle: number = Math.asin(height / length);
        console.log(angle);
        for (let i = 0; i < count + 1; i++) {
            const ceilingPole = this.ceilingPole(-x, y - i * divide, length, 90, this.poleHeightBack);
            ceilingPole.rotateX(angle);
            TerraceDesigner.scene.add(ceilingPole);
        }
        const ceilingWindow = this.window(-x, y, this.patioWidth, 180, length);
        ceilingWindow.position.set(-x, this.poleHeightBack + 8, y);
        ceilingWindow.rotateZ(angle + Util.toRad(90));
        TerraceDesigner.scene.add(ceilingWindow);
    }

    private static fences(): void {
        //The front facing fence
        let leftHeight = this.fenceHeight;
        let frontHeight = this.fenceHeight;
        let rightHeight = this.fenceHeight;
        if (!this.evenFenceHeight) {
            leftHeight = this.fenceHeightLeft;
            frontHeight = this.fenceHeightFront;
            rightHeight = this.fenceHeightRight;
        }
        if (this.showFencesFront) {
            for (let i = 0; i < this.patioWidthCount; i++) {
                const x = this.patioDepth / 2 - this.fenceDepth / 2,
                    y = i * this.patioBaseWidth - this.patioWidth / 2 + this.patioBaseWidth / 2,
                    terraceFence = this.fence(x, y, 0, frontHeight);
                TerraceDesigner.scene.add(terraceFence);
            }
        }
        //Right
        if (this.showFencesRight) {
            //The side fences
            for (let i = 0; i < this.patioDepthCount; i++) {
                const x = i * this.patioBaseWidth - this.patioDepth / 2 + this.patioBaseWidth / 2,
                    yLeft = this.patioWidth / 2 - this.fenceDepth / 2,
                    terraceFenceLeft = this.fence(x, yLeft, 90, leftHeight);
                TerraceDesigner.scene.add(terraceFenceLeft);
            }
        }
        //Left
        if (this.showFencesLeft) {
            for (let i = 0; i < this.patioDepthCount; i++) {
                const x = i * this.patioBaseWidth - this.patioDepth / 2 + this.patioBaseWidth / 2,
                    yRight = -(this.patioWidth / 2 - this.fenceDepth / 2),
                    terraceFenceRight = this.fence(x, yRight, 90, rightHeight);
                TerraceDesigner.scene.add(terraceFenceRight);
            }
        }
    }


    /**
     * TODO: Fix poles appearing at wrong places
     */


    private static windows() {
        /**
         *  Calculates how much area do the windows require
         *  First it removes the poles from the total width
         *  Then it divides it by windows per slot (usually either 2 or 3)
         *  Then it divides it by slot count which is frontPoles - 1;
         */
        const slotCountFront = this.frontPoles - 1;
        const slotCountSide = this.sidePoles - 1;
        const frontWindowWidth = (this.patioWidth - this.frontPoles * this.poleWidth) / this.windowsPerSlot / slotCountFront;
        const sideWindowWidth = (this.patioDepth - this.sidePoles * this.poleWidth) / this.windowsPerSlot / slotCountSide;
        const x = this.patioWidth / 2 - this.poleWidth;
        const slotWidth = frontWindowWidth * this.windowsPerSlot;
        const sideSlotWidth = sideWindowWidth * this.windowsPerSlot;

        /**
         * adding to X moves left
         * adding to Y moves to front
         */
        const slot = (x: number, y: number, width: number) => {
            let buildPointX = x;
            let buildPointY = y;
            for (let i = 0; i < this.windowsPerSlot; i++) {
                const window = this.window(buildPointY, buildPointX, width, 180);
                TerraceDesigner.scene.add(window);
                buildPointX -= frontWindowWidth;
                buildPointY += 2;
            }
        };
        const slotSide = (x: number, y: number, width: number) => {
            let buildPointX = x;
            let buildPointY = y;
            for (let i = 0; i < this.windowsPerSlot; i++) {
                const window = this.window(buildPointY, buildPointX, width, 90);
                TerraceDesigner.scene.add(window);
                buildPointX -= 2;
                buildPointY += sideWindowWidth;
            }
        };
        for (let i = 0; i < slotCountFront; i++) {
            const y = this.patioDepth / 2 - this.poleWidth / 1.5;
            slot(x - i * (slotWidth + this.poleWidth), y, frontWindowWidth);
            //this.patioWidth / 2 - frontWindowWidth / 2 + this.poleWidth
        }
        // Windows left
        const y = (-this.patioDepth / 2 - this.poleWidth / 2);
        for (let j = 0; j < slotCountSide; j++) {
            const x = this.patioWidth / 2 - this.poleWidth / 1.5;
            slotSide(x, y + j * (sideSlotWidth + this.poleWidth) + (this.poleWidth * 1.5), sideWindowWidth);
            //this.patioWidth / 2 - frontWindowWidth / 2 + this.poleWidth
        }
        //Windows right
        for (let j = 0; j < slotCountSide; j++) {
            const x = -(this.patioWidth / 2 - this.poleWidth / 1.5);
            slotSide(x, y + j * (sideSlotWidth + this.poleWidth) + (this.poleWidth * 1.5), sideWindowWidth);
            //this.patioWidth / 2 - frontWindowWidth / 2 + this.poleWidth
        }
    }

    private static base(x: number, y: number): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(this.patioBaseWidth, this.patioBaseHeight, this.patioBaseWidth);
        let material = new THREE.MeshPhongMaterial({color: "#826B50"});
        //material.color.setHSL(0.32, 0.23, 0.42);
        material.specular.set(0);
        let base = new THREE.Mesh(geometry, material);
        base.castShadow = true;
        base.receiveShadow = true;
        base.position.set(x, -this.patioBaseHeight / 2, y);
        PatioBuilder.patioElements.push(base);
        return base;
    }

    private static fence(x: number, y: number, rot?: number, height?: number): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(this.fenceDepth, height ? height : this.fenceHeight, this.patioBaseWidth);
        let material = new THREE.MeshPhongMaterial({color: this.terraceColor});
        material.color.setHSL(2.55, 2.55, 2.55);
        let fence = new THREE.Mesh(geometry, material);
        fence.geometry.translate(0, (height ? height : this.fenceHeight) / 2, 0);
        fence.castShadow = true;
        fence.receiveShadow = true;
        fence.position.set(x, 0, y);
        if (rot) fence.rotateY(Util.toRad(rot));
        PatioBuilder.patioElements.push(fence);
        return fence;
    }



    private static window(x: number, y: number, width: number, rot?: number, height?: number): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(this.windowDepth, height ? height : this.poleHeight, width);
        let material = new THREE.MeshLambertMaterial({color: "#b8bfc6", transparent: true, opacity: 0.5});
        let window = new THREE.Mesh(geometry, material);
        window.geometry.translate(0, (height ? height : this.poleHeight) / 2, width / 2);
        window.castShadow = false;
        window.receiveShadow = false;
        window.position.set(x, 0, y);
        if (rot) window.rotateY(Util.toRad(rot));
        PatioBuilder.patioElements.push(window);
        return window;
    }
}

class Util {
    static toRad(deg: number): number {
        return deg * Math.PI / 180;
    }
}

TerraceDesigner.main();
