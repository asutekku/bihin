const radius = 10;
let angle = 45;
class TerraceDesigner {
    static main() {
        TerraceDesigner.initScene();
        TerraceDesigner.addLights();
        TerraceDesigner.addHelper();
        TerraceDesigner.animate();
        TerraceDesigner.addSkydome();
        TerraceDesigner.addGround();
        PatioBuilder.buildPatio();
        Controls.setTerraceValueControls();
    }
    static initScene() {
        TerraceDesigner.domContainer = document.getElementById("3dContainer");
        TerraceDesigner.scene = new THREE.Scene();
        TerraceDesigner.scene.background = new THREE.Color().setHSL(0.6, 0, 1);
        //TerraceDesigner.scene.fog = new THREE.Fog( TerraceDesigner.scene.background, 1, 5000 );
        TerraceDesigner.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50000);
        TerraceDesigner.controls = new THREE.OrbitControls(TerraceDesigner.camera, TerraceDesigner.domContainer);
        TerraceDesigner.camera.position.set(400, 180, 800);
        TerraceDesigner.controls.update();
        TerraceDesigner.renderer = new THREE.WebGLRenderer();
        TerraceDesigner.renderer.setSize(window.innerWidth, window.innerHeight * 2);
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
TerraceDesigner.animate = () => {
    requestAnimationFrame(TerraceDesigner.animate);
    TerraceDesigner.controls.update();
    TerraceDesigner.renderer.render(TerraceDesigner.scene, TerraceDesigner.camera);
};
class Controls {
    static setTerraceValueControls() {
        const terraceWidthDom = document.getElementById("terraceWidth");
        const terraceDepthDom = document.getElementById("terraceDepth");
        const terraceShowFences = document.getElementById("showFences");
        const terraceShowCanopy = document.getElementById("showTerrace");
        const terraceShowWindows = document.getElementById("showWindows");
        const terraceHeightInput = document.getElementById("terraceHeight");
        const terraceFenceHeight = document.getElementById("fenceHeight");
        terraceWidthDom.addEventListener("input", () => {
            PatioBuilder.patioWidthCount = parseInt(terraceWidthDom.value);
            PatioBuilder.buildPatio();
        });
        terraceDepthDom.addEventListener("input", () => {
            PatioBuilder.patioDepthCount = parseInt(terraceDepthDom.value);
            PatioBuilder.buildPatio();
        });
        terraceHeightInput.addEventListener("input", () => {
            PatioBuilder.poleHeight = parseInt(terraceHeightInput.value);
            PatioBuilder.buildPatio();
        });
        terraceShowFences.addEventListener("change", () => {
            PatioBuilder.showFences = terraceShowFences.checked;
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
        terraceFenceHeight.addEventListener("input", () => {
            PatioBuilder.fenceHeight = parseInt(terraceFenceHeight.value);
            PatioBuilder.buildPatio();
        });
    }
}
Controls.terraceWidthValue = 3;
Controls.terraceDepthValue = 3;
class PatioBuilder {
    static buildPatio() {
        this.patioWidth = PatioBuilder.patioWidthCount * 100;
        this.patioDepth = PatioBuilder.patioDepthCount * 100;
        if (PatioBuilder.patioElements)
            PatioBuilder.patioElements.forEach(e => TerraceDesigner.scene.remove(e));
        for (let i = 0; i < this.patioWidthCount; i++) {
            for (let d = 0; d < this.patioDepthCount; d++) {
                const x = i * this.patioBaseWidth - this.patioWidth / 2 + this.patioBaseWidth / 2, y = d * this.patioBaseWidth - this.patioDepth / 2 + this.patioBaseWidth / 2, terracePiece = this.base(x, y);
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
    static fences() {
        //The front facing fence
        for (let i = 0; i < this.patioDepthCount; i++) {
            const x = this.patioWidth / 2 - this.fenceDepth / 2, y = i * this.patioBaseWidth - this.patioDepth / 2 + this.patioBaseWidth / 2, terraceFence = this.fence(x, y);
            TerraceDesigner.scene.add(terraceFence);
        }
        //The side fences
        for (let i = 0; i < this.patioWidthCount; i++) {
            const x = i * this.patioBaseWidth - this.patioWidth / 2 + this.patioBaseWidth / 2, yLeft = this.patioDepth / 2 - this.fenceDepth / 2, yRight = -(this.patioDepth / 2 - this.fenceDepth / 2), terraceFenceLeft = this.fence(x, yLeft, 90), terraceFenceRight = this.fence(x, yRight, 90);
            TerraceDesigner.scene.add(terraceFenceLeft);
            TerraceDesigner.scene.add(terraceFenceRight);
        }
    }
    static canopy() {
        this.sidePoles = 2;
        this.frontPoles = 2;
        //First the corner poles
        const x = this.patioWidth / 2 - this.poleWidth / 2, y = this.patioDepth / 2 - this.poleWidth / 2, frontLeft = this.pole(x, y, this.poleHeight), frontRight = this.pole(x, -y, this.poleHeight), backLeft = this.pole(-x, y, this.poleHeight + 100), backRight = this.pole(-x, -y, this.poleHeight + 100), horizontalBarLeft = this.ceilingPole(x + this.poleWidth / 2, y, this.patioWidth, -90), horizontalBarRight = this.ceilingPole(x + this.poleWidth / 2, -y, this.patioWidth, -90), horizontalBarFront = this.ceilingPole(x, -y - this.poleWidth * 1.5, this.patioDepth + this.poleWidth * 2), horizontalBarBackTop = this.ceilingPole(-x, -y - this.poleWidth * 1.5, this.patioDepth + this.poleWidth * 2, 0, 100);
        TerraceDesigner.scene.add(frontLeft);
        TerraceDesigner.scene.add(frontRight);
        TerraceDesigner.scene.add(backLeft);
        TerraceDesigner.scene.add(backRight);
        TerraceDesigner.scene.add(horizontalBarLeft);
        TerraceDesigner.scene.add(horizontalBarRight);
        TerraceDesigner.scene.add(horizontalBarFront);
        TerraceDesigner.scene.add(horizontalBarBackTop);
        if (this.patioDepthCount % 2 && 0) {
            this.windowsPerSlot = 2;
        }
        else {
            this.windowsPerSlot = 3;
        }
        //Front bars
        for (let i = 0; i <= this.patioDepthCount; i++) {
            if (i !== 0 && i !== this.patioDepthCount) {
                this.windowsPerSlot = 2;
                const polePosition = ((this.patioWidth / 2 - this.patioBaseWidth / 2) * i) - this.poleWidth / 2;
                if (i % 2 === 0 && this.patioDepthCount % 2 === 0 && this.patioDepthCount % 3 !== 0) {
                    this.frontPoles++;
                    const pole = this.pole(x, y - polePosition, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                }
                else if (i % 3 == 0 && this.patioDepthCount % 3 === 0) {
                    this.frontPoles++;
                    const pole = this.pole(x, y - polePosition, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                }
                else if (i % 3 == 0 && i % 2 == 0 && this.patioDepthCount % 3 === 0) {
                    this.frontPoles++;
                    const pole = this.pole(x, y - polePosition, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                }
            }
        }
        //Side bars
        for (let i = 0; i <= this.patioWidthCount; i++) {
            if (i !== 0 && i !== this.patioWidthCount) {
                this.windowsPerSlot = 2;
                const polePosition = ((this.patioDepth / 2 - this.patioBaseWidth / 2) * i) - this.poleWidth / 2;
                if (i % 2 === 0 && this.patioWidthCount % 2 === 0 && this.patioWidthCount % 3 !== 0) {
                    this.frontPoles++;
                    const pole = this.pole(x - polePosition, y, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                }
                else if (i % 3 == 0 && this.patioWidthCount % 3 === 0) {
                    this.frontPoles++;
                    const pole = this.pole(x - polePosition, y, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
                }
                else if (i % 3 == 0 && i % 2 == 0 && this.patioWidthCount % 3 === 0) {
                    this.frontPoles++;
                    const pole = this.pole(x - polePosition, y, this.poleHeight);
                    TerraceDesigner.scene.add(pole);
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
        const slotCount = this.frontPoles - 1;
        const frontWindowWidth = (this.patioDepth - this.frontPoles * this.poleWidth) / this.windowsPerSlot / slotCount;
        const x = this.patioDepth / 2 - this.poleWidth;
        const slotWidth = frontWindowWidth * this.windowsPerSlot;
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
        for (let i = 0; i < slotCount; i++) {
            const y = this.patioWidth / 2 - this.poleWidth / 1.5;
            slot(x - (i * (slotWidth + this.poleWidth)), y, frontWindowWidth);
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
    static fence(x, y, rot) {
        const geometry = new THREE.BoxGeometry(this.fenceDepth, this.fenceHeight, this.patioBaseWidth);
        let material = new THREE.MeshPhongMaterial({ color: this.terraceColor });
        material.color.setHSL(2.55, 2.55, 2.55);
        let fence = new THREE.Mesh(geometry, material);
        fence.castShadow = true;
        fence.receiveShadow = true;
        fence.position.set(x, this.fenceHeight / 2, y);
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
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, height / 2, y);
        PatioBuilder.patioElements.push(pole);
        return pole;
    }
    static ceilingPole(x, y, length, rot, verPlus) {
        const geometry = new THREE.BoxGeometry(this.poleWidth, this.poleWidth, length);
        let material = new THREE.MeshPhongMaterial({ color: this.terraceColor });
        material.color.setHSL(2.55, 2.55, 2.55);
        let pole = new THREE.Mesh(geometry, material);
        pole.geometry.translate(0, 0, length / 2);
        pole.castShadow = true;
        pole.receiveShadow = true;
        pole.position.set(x, this.poleHeight + this.poleWidth / 2 + (verPlus ? verPlus : 0), y);
        if (rot)
            pole.rotateY(Util.toRad(rot));
        PatioBuilder.patioElements.push(pole);
        return pole;
    }
    static window(x, y, width, rot) {
        const geometry = new THREE.BoxGeometry(this.windowDepth, this.poleHeight, width);
        let material = new THREE.MeshLambertMaterial({ color: "#80d9dd", transparent: true, opacity: 0.5 });
        let window = new THREE.Mesh(geometry, material);
        window.geometry.translate(0, 0, width / 2);
        window.castShadow = false;
        window.receiveShadow = false;
        window.position.set(x, this.poleHeight / 2, y);
        if (rot)
            window.rotateY(Util.toRad(rot));
        PatioBuilder.patioElements.push(window);
        return window;
    }
}
PatioBuilder.patioElements = [];
PatioBuilder.patioWidthCount = 3;
PatioBuilder.patioDepthCount = 3;
PatioBuilder.patioBaseWidth = 100; // cm
PatioBuilder.patioBaseHeight = 20; // cm
PatioBuilder.showFences = false;
PatioBuilder.showCanopy = true;
PatioBuilder.showWindows = true;
PatioBuilder.fenceHeight = 80; // cm
PatioBuilder.fenceDepth = 5; // cm
PatioBuilder.poleWidth = 9; // cm
PatioBuilder.poleHorHeight = 14; // cm
PatioBuilder.poleHeight = 220; // cm
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
