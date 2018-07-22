const radius = 10;
let angle = 45;

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
        TerraceDesigner.addLights();
        TerraceDesigner.addHelper();
        TerraceDesigner.addSkydome();
        TerraceDesigner.addGround();
        TerraceDesigner.addRaycaster();
        PatioBuilder.buildPatio();
        Controls.setTerraceValueControls();
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
        TerraceDesigner.mouse = new THREE.Vector2();
        TerraceDesigner.controls.update();
        TerraceDesigner.renderer = new THREE.WebGLRenderer();
        TerraceDesigner.renderer.setSize(window.innerWidth, window.innerHeight * 2);
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

    static addGround(): void {
        const groundGeo = new THREE.PlaneBufferGeometry(100000, 100000);
        const groundMat = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff});
        groundMat.color.setHSL(1.22, 0.39, 0.49);
        groundMat.specular.set(0);
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -20;
        TerraceDesigner.scene.add(ground);
        ground.receiveShadow = true;
    }

    static addRaycaster(): void {
        TerraceDesigner.rayCaster = new THREE.Raycaster();
    }

    static addLights(): void {
        this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        this.hemiLight.color.setHSL(0.6, 1, 0.6);
        this.hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        this.hemiLight.position.set(0, 50, 0);
        TerraceDesigner.scene.add(this.hemiLight);
        const hemiLightHelper = new THREE.HemisphereLightHelper(this.hemiLight, 10);
        TerraceDesigner.scene.add(hemiLightHelper);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(10, 30, 10);
        dirLight.position.multiplyScalar(30);
        TerraceDesigner.scene.add(dirLight);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        const d = 500;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;
        const dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
        TerraceDesigner.scene.add(dirLightHeper);
    }

    static addSkydome(): void {
        const vertexShader = document.getElementById("vertexShader").textContent;
        const fragmentShader = document.getElementById("fragmentShader").textContent;
        const uniforms = {
            topColor: {value: new THREE.Color(0x0077ff)},
            bottomColor: {value: new THREE.Color(0xffffff)},
            offset: {value: 33},
            exponent: {value: 0.6}
        };
        uniforms.topColor.value.copy(this.hemiLight.color);
        // TerraceDesigner.scene.fog.color.copy( uniforms.bottomColor.value );
        const skyGeo = new THREE.SphereBufferGeometry(40000, 32, 15);
        const skyMat = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: uniforms,
            side: THREE.BackSide
        });
        const sky = new THREE.Mesh(skyGeo, skyMat);
        TerraceDesigner.scene.add(sky);
    }

    static addHelper(): void {
        /**
         * An axis object to visualize the 3 axes in a simple way.
         * The X axis is red. The Y axis is green. The Z axis is blue.
         * @type {AxesHelper}
         */
        const axesHelper = new THREE.AxesHelper(200);
        axesHelper.position.set(0, 100, 0);
        TerraceDesigner.scene.add(axesHelper);
    }
}

class Controls {
    static terraceWidthValue: number = 3;
    static terraceDepthValue: number = 3;

    static setTerraceValueControls(): void {
        const terraceWidthDom = <HTMLInputElement>document.getElementById("terraceWidth");
        const terraceDepthDom = <HTMLInputElement>document.getElementById("terraceDepth");
        const terraceShowFences = <HTMLInputElement>document.getElementById("showFences");
        const terraceShowCanopy = <HTMLInputElement>document.getElementById("showTerrace");
        const terraceShowWindows = <HTMLInputElement>document.getElementById("showWindows");
        const terraceHeightInput = <HTMLInputElement>document.getElementById("terraceHeight");
        const terraceHeightBackInput = <HTMLInputElement>document.getElementById("terraceHeightBack");
        const fenceHeight = <HTMLInputElement>document.getElementById("fenceHeight");
        const evenFenceHeight = <HTMLInputElement>document.getElementById("evenFenceHeight");
        const fenceHeightLeft = <HTMLInputElement>document.getElementById("fenceHeightLeft");
        const fenceHeightFront = <HTMLInputElement>document.getElementById("fenceHeightFront");
        const fenceHeightRight = <HTMLInputElement>document.getElementById("fenceHeightRight");
        const showFenceRight = <HTMLInputElement>document.getElementById("showFenceLeft");
        const showFenceFront = <HTMLInputElement>document.getElementById("showFenceFront");
        const showFenceLeft = <HTMLInputElement>document.getElementById("showFenceRight");
        terraceWidthDom.addEventListener("input", () => {
            PatioBuilder.patioWidthCount = parseInt(terraceWidthDom.value);
            PatioBuilder.buildPatio();
        });
        terraceDepthDom.addEventListener("input", () => {
            PatioBuilder.patioDepthCount = parseInt(terraceDepthDom.value);
            PatioBuilder.buildPatio();
        });
        terraceHeightInput.addEventListener("input", () => {
            fenceHeightFront.max = terraceHeightInput.value;
            fenceHeightLeft.max = terraceHeightInput.value;
            fenceHeightRight.max = terraceHeightInput.value;
            fenceHeight.max = terraceHeightInput.value;
            if (PatioBuilder.fenceHeight > parseInt(terraceHeightInput.value)) {
                PatioBuilder.fenceHeight = parseInt(terraceHeightInput.value);
            }
            if (PatioBuilder.fenceHeightLeft > parseInt(terraceHeightInput.value)) {
                PatioBuilder.fenceHeightLeft = parseInt(terraceHeightInput.value);
            }
            if (PatioBuilder.fenceHeightFront > parseInt(terraceHeightInput.value)) {
                PatioBuilder.fenceHeightFront = parseInt(terraceHeightInput.value);
            }
            if (PatioBuilder.fenceHeightRight > parseInt(terraceHeightInput.value)) {
                PatioBuilder.fenceHeightRight = parseInt(terraceHeightInput.value);
            }
            if (PatioBuilder.poleHeightBack < parseInt(terraceHeightInput.value) + 20) {
                PatioBuilder.poleHeightBack = parseInt(terraceHeightInput.value) + 20;
            }
            PatioBuilder.poleHeight = parseInt(terraceHeightInput.value);
            PatioBuilder.buildPatio();
            terraceHeightBackInput.min = (parseInt(terraceHeightInput.value) + 20).toString();
        });
        terraceHeightBackInput.addEventListener("input", () => {
            PatioBuilder.poleHeightBack = parseInt(terraceHeightBackInput.value);
            PatioBuilder.buildPatio();
        });
        terraceShowFences.addEventListener("change", () => {
            const fenceVisDIV = document.getElementById("showFenceOptions");
            const hidden = terraceShowFences.checked;
            if (hidden) {
                fenceVisDIV.classList.remove("hidden");
                PatioBuilder.evenFenceHeight = false;
            } else {
                fenceVisDIV.classList.add("hidden");
                PatioBuilder.evenFenceHeight = true;
            }
            PatioBuilder.showFences = terraceShowFences.checked;
            PatioBuilder.buildPatio();
        });
        showFenceLeft.addEventListener("change", () => {
            PatioBuilder.showFencesLeft = showFenceLeft.checked;
            PatioBuilder.buildPatio();
        });
        showFenceFront.addEventListener("change", () => {
            PatioBuilder.showFencesFront = showFenceFront.checked;
            PatioBuilder.buildPatio();
        });
        showFenceRight.addEventListener("change", () => {
            PatioBuilder.showFencesRight = showFenceRight.checked;
            PatioBuilder.buildPatio();
        });
        terraceShowCanopy.addEventListener("change", () => {
            PatioBuilder.showCanopy = terraceShowCanopy.checked;
            if (PatioBuilder.showCanopy == false) {
                PatioBuilder.showWindows = false;
                terraceShowWindows.checked = false;
            }
            PatioBuilder.buildPatio();
        });
        terraceShowWindows.addEventListener("change", () => {
            PatioBuilder.showWindows = terraceShowWindows.checked;
            PatioBuilder.buildPatio();
        });
        fenceHeight.addEventListener("input", () => {
            PatioBuilder.fenceHeight = parseInt(fenceHeight.value);
            PatioBuilder.buildPatio();
        });
        evenFenceHeight.addEventListener("change", () => {
            const visDiv = document.getElementById("fenceHeightStrict");
            const vidDivSingle = document.getElementById("optionFenceHeight");
            const hidden = evenFenceHeight.checked;
            if (!hidden) {
                visDiv.classList.remove("hidden");
                vidDivSingle.classList.add("hidden");
                PatioBuilder.evenFenceHeight = false;
            } else {
                visDiv.classList.add("hidden");
                vidDivSingle.classList.remove("hidden");
                PatioBuilder.evenFenceHeight = true;
            }
            PatioBuilder.buildPatio();
        });
        fenceHeightLeft.addEventListener("input", () => {
            PatioBuilder.fenceHeightLeft = parseInt(fenceHeightLeft.value);
            PatioBuilder.buildPatio();
        });
        fenceHeightFront.addEventListener("input", () => {
            PatioBuilder.fenceHeightFront = parseInt(fenceHeightFront.value);
            PatioBuilder.buildPatio();
        });
        fenceHeightRight.addEventListener("input", () => {
            PatioBuilder.fenceHeightRight = parseInt(fenceHeightRight.value);
            PatioBuilder.buildPatio();
        });
    }
}

class PatioBuilder {
    static patioElements: THREE.Mesh[] = [];
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
        //Canopy
        if (this.showCanopy) {
            PatioBuilder.canopy();
        }
        if (this.showWindows) {
            PatioBuilder.windows();
        }
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
    private static canopy(): void {
        this.sidePoles = 2;
        this.frontPoles = 2;
        const x = this.patioDepth / 2 - this.poleWidth / 2,
            y = this.patioWidth / 2 - this.poleWidth / 2,
            frontLeft = this.pole(x, y, this.poleHeight),
            frontRight = this.pole(x, -y, this.poleHeight),
            backLeft = this.pole(-x, y, this.poleHeightBack),
            backRight = this.pole(-x, -y, this.poleHeightBack),
            horizontalBarLeft = this.ceilingPole(x + this.poleWidth / 2, y, this.patioDepth, -90),
            horizontalBarRight = this.ceilingPole(x + this.poleWidth / 2, -y, this.patioDepth, -90),
            horizontalBarFront = this.ceilingPole(x, -y - this.poleWidth * 1.5, this.patioWidth + this.poleWidth * 2, 0),
            horizontalBarBackTop = this.ceilingPole(-x, -y - this.poleWidth * 1.5, this.patioWidth + this.poleWidth * 2, 0, this.poleHeightBack);
        TerraceDesigner.scene.add(frontLeft);
        TerraceDesigner.scene.add(frontRight);
        TerraceDesigner.scene.add(backLeft);
        TerraceDesigner.scene.add(backRight);
        TerraceDesigner.scene.add(horizontalBarLeft);
        TerraceDesigner.scene.add(horizontalBarRight);
        TerraceDesigner.scene.add(horizontalBarFront);
        TerraceDesigner.scene.add(horizontalBarBackTop);
        if (this.patioWidthCount % 2 && 0) {
            this.windowsPerSlot = 2;
        } else {
            this.windowsPerSlot = 3;
        }

        //Front bars
        for (let i = 0; i <= this.patioWidthCount; i++) {
            if (i !== 0 && i !== this.patioWidthCount) {
                this.windowsPerSlot = 2;
                const polePosition = (-this.patioBaseWidth) * i + this.poleWidth / 2;
                if (i % 2 === 0 && this.patioWidthCount % 2 === 0 && this.patioWidthCount % 3 !== 0) {
                    this.frontPoles++;
                    const pole = this.pole(x, y + polePosition, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                } else if (i % 3 == 0 && this.patioWidthCount % 3 === 0) {
                    this.frontPoles++;
                    const pole = this.pole(x, y + polePosition, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                } else if (i % 3 == 0 && i % 2 == 0 && this.patioWidthCount % 3 === 0) {
                    this.frontPoles++;
                    const pole = this.pole(x, y + polePosition, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                }
            }
        }

        //Side bars
        for (let i = 0; i <= this.patioDepthCount; i++) {
            if (i !== 0 && i !== this.patioDepthCount) {
                this.windowsPerSlot = 2;
                const polePosition = (-this.patioBaseWidth) * i + this.poleWidth / 2;
                if (i % 2 === 0 && this.patioDepthCount % 2 === 0 && this.patioDepthCount % 3 !== 0) {
                    this.sidePoles++;
                    const pole = this.pole(x + polePosition, y, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                } else if (i % 3 == 0 && this.patioDepthCount % 3 === 0) {
                    this.sidePoles++;
                    const pole = this.pole(x + polePosition, y, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                } else if (i % 3 == 0 && i % 2 == 0 && this.patioDepthCount % 3 === 0) {
                    this.sidePoles++;
                    const pole = this.pole(x + polePosition, y, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                }
            }
        }
    }

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
            slotSide(x, y + j * (sideSlotWidth + this.poleWidth), sideWindowWidth);
            //this.patioWidth / 2 - frontWindowWidth / 2 + this.poleWidth
        }
        //Windows right
        for (let j = 0; j < slotCountSide; j++) {
            const x = -(this.patioWidth / 2 - this.poleWidth / 1.5);
            slotSide(x, y + j * (sideSlotWidth + this.poleWidth), sideWindowWidth);
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
        fence.castShadow = true;
        fence.receiveShadow = true;
        fence.position.set(x, (height ? height : this.fenceHeight) / 2, y);
        if (rot) fence.rotateY(Util.toRad(rot));
        PatioBuilder.patioElements.push(fence);
        return fence;
    }

    private static pole(x: number, y: number, height: number, color?: string): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(this.poleWidth, height, this.poleWidth);
        let material = new THREE.MeshPhongMaterial({color: this.terraceColor});
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new THREE.Mesh(geometry, material);
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, height / 2, y);
        PatioBuilder.patioElements.push(pole);
        return pole;
    }

    private static ceilingPole(x: number, y: number, length: number, rot?: number, verPlus?: number): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(this.poleWidth, this.poleWidth, length);
        let material = new THREE.MeshPhongMaterial({color: this.terraceColor});
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new THREE.Mesh(geometry, material);
        pole.geometry.translate(0, 0, length / 2);
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, (verPlus ? this.poleHeightBack : this.poleHeight) + this.poleWidth / 2, y);
        if (rot) pole.rotateY(Util.toRad(rot));
        PatioBuilder.patioElements.push(pole);
        return pole;
    }

    private static window(x: number, y: number, width: number, rot?: number): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(this.windowDepth, this.poleHeight, width);
        let material = new THREE.MeshLambertMaterial({color: "#80d9dd", transparent: true, opacity: 0.5});
        let window = new THREE.Mesh(geometry, material);
        window.geometry.translate(0, 0, width / 2);
        window.castShadow = false;
        window.receiveShadow = false;
        window.position.set(x, this.poleHeight / 2, y);
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
