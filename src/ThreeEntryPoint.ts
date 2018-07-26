import { SceneManager } from "./SceneManager";

export class ThreeEntryPoint {
    static init(container: HTMLDivElement) {
        const canvas: HTMLCanvasElement = createCanvas(document, container);
        const sceneManager: SceneManager = new SceneManager(canvas);

        let canvasHalfWidth: number;
        let canvasHalfHeight: number;

        bindEventListeners();
        render();

        function createCanvas(document: Document, container: HTMLElement) {
            const canvas = document.createElement("canvas");
            container.appendChild(canvas);
            return canvas;
        }

        function bindEventListeners() {
            window.onresize = resizeCanvas;
            window.onmousemove = mouseMove;
            resizeCanvas();
        }

        function resizeCanvas() {
            canvas.style.width = "100%";
            canvas.style.height = "100%";

            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            canvasHalfWidth = Math.round(canvas.offsetWidth / 2);
            canvasHalfHeight = Math.round(canvas.offsetHeight / 2);

            sceneManager.onWindowResize();
        }

        function mouseMove({ screenX, screenY }: { screenX: number; screenY: number }) {
            sceneManager.onMouseMove(screenX - canvasHalfWidth, screenY - canvasHalfHeight);
        }

        function render(time?: number) {
            requestAnimationFrame(render);
            sceneManager.update();
        }
    }
}
