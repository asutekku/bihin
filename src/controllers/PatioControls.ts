import {Patio} from "../sceneComponents/Patio";

export class PatioControls {
    static setTerraceValueControls(patio: Patio): void {
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
            patio.width = parseInt(terraceWidthDom.value);
        });
        terraceDepthDom.addEventListener("input", () => {
            patio.length = parseInt(terraceDepthDom.value);
        });
        terraceHeightInput.addEventListener("input", () => {
            fenceHeightFront.max = terraceHeightInput.value;
            fenceHeightLeft.max = terraceHeightInput.value;
            fenceHeightRight.max = terraceHeightInput.value;
            fenceHeight.max = terraceHeightInput.value;
            if (patio.fenceHeight > parseInt(terraceHeightInput.value)) {
                patio.fenceHeight = parseInt(terraceHeightInput.value);
            }
            if (patio.fenceHeightLeft > parseInt(terraceHeightInput.value)) {
                patio.fenceHeightLeft = parseInt(terraceHeightInput.value);
            }
            if (patio.fenceHeightFront > parseInt(terraceHeightInput.value)) {
                patio.fenceHeightFront = parseInt(terraceHeightInput.value);
            }
            if (patio.fenceHeightRight > parseInt(terraceHeightInput.value)) {
                patio.fenceHeightRight = parseInt(terraceHeightInput.value);
            }
            if (patio.poleHeightBack < parseInt(terraceHeightInput.value) + 20) {
                patio.poleHeightBack = parseInt(terraceHeightInput.value) + 20;
            }
            patio.poleHeight = parseInt(terraceHeightInput.value);
            terraceHeightBackInput.min = (parseInt(terraceHeightInput.value) + 20).toString();
        });
        terraceHeightBackInput.addEventListener("input", () => {
            patio.poleHeightBack = parseInt(terraceHeightBackInput.value);
        });
        terraceShowFences.addEventListener("change", () => {
            const fenceVisDIV = document.getElementById("showFenceOptions")!;
            const hidden = terraceShowFences.checked;
            if (hidden) {
                fenceVisDIV.classList.remove("hidden");
                patio.evenFenceHeight = false;
            } else {
                fenceVisDIV.classList.add("hidden");
                patio.evenFenceHeight = true;
            }
            patio.showFences = terraceShowFences.checked;
            patio.update();
        });
        showFenceLeft.addEventListener("change", () => {
            patio.showFencesLeft = showFenceLeft.checked;
            patio.update();
        });
        showFenceFront.addEventListener("change", () => {
            patio.showFencesFront = showFenceFront.checked;
            patio.update();
        });
        showFenceRight.addEventListener("change", () => {
            patio.showFencesRight = showFenceRight.checked;
            patio.update();
        });
        terraceShowCanopy.addEventListener("change", () => {
            patio.showCanopy = terraceShowCanopy.checked;
            if (patio.showCanopy == false) {
                patio.showWindows = false;
                terraceShowWindows.checked = false;
            }
        });
        terraceShowWindows.addEventListener("change", () => {
            patio.showWindows = terraceShowWindows.checked;
            patio.update();
        });
        fenceHeight.addEventListener("input", () => {
            patio.fenceHeight = parseInt(fenceHeight.value);
            patio.update();
        });
        evenFenceHeight.addEventListener("change", () => {
            const visDiv = document.getElementById("fenceHeightStrict")!;
            const vidDivSingle = document.getElementById("optionFenceHeight")!;
            const hidden = evenFenceHeight.checked;
            if (!hidden) {
                visDiv.classList.remove("hidden");
                vidDivSingle.classList.add("hidden");
                patio.evenFenceHeight = false;
            } else {
                visDiv.classList.add("hidden");
                vidDivSingle.classList.remove("hidden");
                patio.evenFenceHeight = true;
            }
            patio.update();
        });
        fenceHeightLeft.addEventListener("input", () => {
            patio.fenceHeightLeft = parseInt(fenceHeightLeft.value);
            patio.update();
        });
        fenceHeightFront.addEventListener("input", () => {
            patio.fenceHeightFront = parseInt(fenceHeightFront.value);
            patio.update();
        });
        fenceHeightRight.addEventListener("input", () => {
            patio.fenceHeightRight = parseInt(fenceHeightRight.value);
            patio.update();
        });
    }
}