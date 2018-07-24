const radius = 10;
let angle = 45;
class TerraceDesigner {
    static main() {
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
    static initScene() {
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
    static addGround() {
        const groundGeo = new THREE.PlaneBufferGeometry(100000, 100000);
        const groundMat = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff });
        groundMat.color.setHSL(1.22, 0.39, 0.49);
        groundMat.specular.set(0);
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -20;
        TerraceDesigner.scene.add(ground);
        ground.receiveShadow = true;
    }
    static addRaycaster() {
        TerraceDesigner.rayCaster = new THREE.Raycaster();
    }
    static addLights() {
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
        dirLight.shadow.mapSize.width = 4096;
        dirLight.shadow.mapSize.height = 4096;
        const d = 2000;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;
        const dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
        TerraceDesigner.scene.add(dirLightHeper);
    }
    static addSkydome() {
        const vertexShader = document.getElementById("vertexShader").textContent;
        const fragmentShader = document.getElementById("fragmentShader").textContent;
        const uniforms = {
            topColor: { value: new THREE.Color(0x0077ff) },
            bottomColor: { value: new THREE.Color(0xffffff) },
            offset: { value: 33 },
            exponent: { value: 0.6 }
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
    static addHelper() {
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
TerraceDesigner.render = () => {
    requestAnimationFrame(TerraceDesigner.render);
    TerraceDesigner.controls.update();
    TerraceDesigner.renderer.render(TerraceDesigner.scene, TerraceDesigner.camera);
    TerraceDesigner.rayCaster.setFromCamera(TerraceDesigner.mouse, TerraceDesigner.camera);
};
class Controls {
    static setTerraceValueControls() {
        const terraceWidthDom = document.getElementById("terraceWidth");
        const terraceDepthDom = document.getElementById("terraceDepth");
        const terraceShowFences = document.getElementById("showFences");
        const terraceShowCanopy = document.getElementById("showTerrace");
        const terraceShowWindows = document.getElementById("showWindows");
        const terraceHeightInput = document.getElementById("terraceHeight");
        const terraceHeightBackInput = document.getElementById("terraceHeightBack");
        const fenceHeight = document.getElementById("fenceHeight");
        const evenFenceHeight = document.getElementById("evenFenceHeight");
        const fenceHeightLeft = document.getElementById("fenceHeightLeft");
        const fenceHeightFront = document.getElementById("fenceHeightFront");
        const fenceHeightRight = document.getElementById("fenceHeightRight");
        const showFenceRight = document.getElementById("showFenceLeft");
        const showFenceFront = document.getElementById("showFenceFront");
        const showFenceLeft = document.getElementById("showFenceRight");
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
            }
            else {
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
            }
            else {
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
Controls.terraceWidthValue = 3;
Controls.terraceDepthValue = 3;
class PatioBuilder {
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
                const x = i * this.patioBaseWidth - this.patioDepth / 2 + this.patioBaseWidth / 2, y = d * this.patioBaseWidth - this.patioWidth / 2 + this.patioBaseWidth / 2, terracePiece = this.base(x, y);
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
    static ceiling() {
        const count = Math.round(this.patioWidth / 80), length = Math.sqrt(Math.pow(this.patioDepth, 2) + Math.pow(this.poleHeightBack - this.poleHeight, 2)) + 10, x = this.patioDepth / 2 - this.poleWidth / 2, y = this.patioWidth / 2 - this.poleWidth / 2, divide = this.patioWidth / count, height = this.poleHeightBack - this.poleHeight, angle = Math.asin(height / length);
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
    static fences() {
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
                const x = this.patioDepth / 2 - this.fenceDepth / 2, y = i * this.patioBaseWidth - this.patioWidth / 2 + this.patioBaseWidth / 2, terraceFence = this.fence(x, y, 0, frontHeight);
                TerraceDesigner.scene.add(terraceFence);
            }
        }
        //Right
        if (this.showFencesRight) {
            //The side fences
            for (let i = 0; i < this.patioDepthCount; i++) {
                const x = i * this.patioBaseWidth - this.patioDepth / 2 + this.patioBaseWidth / 2, yLeft = this.patioWidth / 2 - this.fenceDepth / 2, terraceFenceLeft = this.fence(x, yLeft, 90, leftHeight);
                TerraceDesigner.scene.add(terraceFenceLeft);
            }
        }
        //Left
        if (this.showFencesLeft) {
            for (let i = 0; i < this.patioDepthCount; i++) {
                const x = i * this.patioBaseWidth - this.patioDepth / 2 + this.patioBaseWidth / 2, yRight = -(this.patioWidth / 2 - this.fenceDepth / 2), terraceFenceRight = this.fence(x, yRight, 90, rightHeight);
                TerraceDesigner.scene.add(terraceFenceRight);
            }
        }
    }
    /**
     * TODO: Fix poles appearing at wrong places
     */
    static canopy() {
        this.sidePoles = 2;
        this.frontPoles = 2;
        const x = this.patioDepth / 2 - this.poleWidth / 2, y = this.patioWidth / 2 - this.poleWidth / 2, frontLeft = this.pole(x, y, this.poleHeight), frontRight = this.pole(x, -y, this.poleHeight), backLeft = this.pole(-x, y, this.poleHeightBack), backRight = this.pole(-x, -y, this.poleHeightBack), horizontalBarLeft = this.ceilingPole(x + this.poleWidth / 2, y, this.patioDepth, -90), horizontalBarRight = this.ceilingPole(x + this.poleWidth / 2, -y, this.patioDepth, -90), horizontalBarFront = this.ceilingPole(x, -y - this.poleWidth * 1.5, this.patioWidth + this.poleWidth * 2, 0), horizontalBarBackTop = this.ceilingPole(-x, -y - this.poleWidth * 1.5, this.patioWidth + this.poleWidth * 2, 0, this.poleHeightBack);
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
        }
        else {
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
                }
                else if (i % 3 == 0 && this.patioWidthCount % 3 === 0) {
                    this.frontPoles++;
                    const pole = this.pole(x, y + polePosition, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                }
                else if (i % 3 == 0 && i % 2 == 0 && this.patioWidthCount % 3 === 0) {
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
                    const poleLeft = this.pole(x + polePosition, y, this.poleHeight);
                    const poleRight = this.pole(x + polePosition, -y, this.poleHeight);
                    TerraceDesigner.scene.add(poleLeft);
                    TerraceDesigner.scene.add(poleRight);
                }
                else if (i % 3 == 0 && this.patioDepthCount % 3 === 0) {
                    this.sidePoles++;
                    const poleLeft = this.pole(x + polePosition, y, this.poleHeight);
                    const poleRight = this.pole(x + polePosition, -y, this.poleHeight);
                    TerraceDesigner.scene.add(poleLeft);
                    TerraceDesigner.scene.add(poleRight);
                }
                else if (i % 3 == 0 && i % 2 == 0 && this.patioDepthCount % 3 === 0) {
                    this.sidePoles++;
                    const poleLeft = this.pole(x + polePosition, y, this.poleHeight);
                    const poleRight = this.pole(x + polePosition, -y, this.poleHeight);
                    TerraceDesigner.scene.add(poleLeft);
                    TerraceDesigner.scene.add(poleRight);
                }
            }
        }
    }
    static windows() {
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
        const slot = (x, y, width) => {
            let buildPointX = x;
            let buildPointY = y;
            for (let i = 0; i < this.windowsPerSlot; i++) {
                const window = this.window(buildPointY, buildPointX, width, 180);
                TerraceDesigner.scene.add(window);
                buildPointX -= frontWindowWidth;
                buildPointY += 2;
            }
        };
        const slotSide = (x, y, width) => {
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
    static base(x, y) {
        const geometry = new THREE.BoxGeometry(this.patioBaseWidth, this.patioBaseHeight, this.patioBaseWidth);
        let material = new THREE.MeshPhongMaterial({ color: "#826B50" });
        //material.color.setHSL(0.32, 0.23, 0.42);
        material.specular.set(0);
        let base = new THREE.Mesh(geometry, material);
        base.castShadow = true;
        base.receiveShadow = true;
        base.position.set(x, -this.patioBaseHeight / 2, y);
        PatioBuilder.patioElements.push(base);
        return base;
    }
    static fence(x, y, rot, height) {
        const geometry = new THREE.BoxGeometry(this.fenceDepth, height ? height : this.fenceHeight, this.patioBaseWidth);
        let material = new THREE.MeshPhongMaterial({ color: this.terraceColor });
        material.color.setHSL(2.55, 2.55, 2.55);
        let fence = new THREE.Mesh(geometry, material);
        fence.geometry.translate(0, (height ? height : this.fenceHeight) / 2, 0);
        fence.castShadow = true;
        fence.receiveShadow = true;
        fence.position.set(x, 0, y);
        if (rot)
            fence.rotateY(Util.toRad(rot));
        PatioBuilder.patioElements.push(fence);
        return fence;
    }
    static pole(x, y, height, color) {
        const geometry = new THREE.BoxGeometry(this.poleWidth, height, this.poleWidth);
        let material = new THREE.MeshPhongMaterial({ color: this.terraceColor });
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new THREE.Mesh(geometry, material);
        pole.geometry.translate(0, height / 2, 0);
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, 0, y);
        PatioBuilder.patioElements.push(pole);
        return pole;
    }
    static ceilingPole(x, y, length, rot, verPlus) {
        const geometry = new THREE.BoxGeometry(this.poleWidth, this.poleWidth, length);
        let material = new THREE.MeshPhongMaterial({ color: this.terraceColor });
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new THREE.Mesh(geometry, material);
        pole.geometry.translate(0, this.poleWidth / 2, length / 2); // Set's the origin to the bottom of the pole
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, (verPlus ? this.poleHeightBack : this.poleHeight), y);
        if (rot)
            pole.rotateY(Util.toRad(rot));
        PatioBuilder.patioElements.push(pole);
        return pole;
    }
    static window(x, y, width, rot, height) {
        const geometry = new THREE.BoxGeometry(this.windowDepth, height ? height : this.poleHeight, width);
        let material = new THREE.MeshLambertMaterial({ color: "#b8bfc6", transparent: true, opacity: 0.5 });
        let window = new THREE.Mesh(geometry, material);
        window.geometry.translate(0, (height ? height : this.poleHeight) / 2, width / 2);
        window.castShadow = false;
        window.receiveShadow = false;
        window.position.set(x, 0, y);
        if (rot)
            window.rotateY(Util.toRad(rot));
        PatioBuilder.patioElements.push(window);
        return window;
    }
}
PatioBuilder.patioElements = [];
PatioBuilder.patioFences = [];
PatioBuilder.patioDepthCount = 3;
PatioBuilder.patioWidthCount = 3;
PatioBuilder.patioBaseWidth = 100; // cm
PatioBuilder.patioBaseHeight = 20; // cm
PatioBuilder.showFences = false;
PatioBuilder.showFencesFront = true;
PatioBuilder.showFencesRight = true;
PatioBuilder.showFencesLeft = true;
PatioBuilder.evenFenceHeight = true;
PatioBuilder.fenceHeight = 80; // cm
PatioBuilder.fenceHeightLeft = 80; // cm
PatioBuilder.fenceHeightFront = 80; // cm
PatioBuilder.fenceHeightRight = 80; // cm
PatioBuilder.fenceDepth = 5; // cm
PatioBuilder.showCanopy = true;
PatioBuilder.showWindows = true;
PatioBuilder.poleWidth = 9; // cm
PatioBuilder.poleHorHeight = 14; // cm
PatioBuilder.poleHeight = 220; // cm
PatioBuilder.poleHeightBack = 320; // cm
PatioBuilder.terraceColor = "#d2d2d2"; // cm
PatioBuilder.windowsPerSlot = 3; // cm
PatioBuilder.windowDepth = 1; // cm
PatioBuilder.windowHeight = PatioBuilder.poleHeight; // cm
PatioBuilder.sidePoles = 2; // cm
PatioBuilder.frontPoles = 2; // cm
class Util {
    static toRad(deg) {
        return deg * Math.PI / 180;
    }
}
TerraceDesigner.main();
