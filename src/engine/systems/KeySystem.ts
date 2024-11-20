
export class KeySystem {
    keysPressed: Record<string, any>;

    constructor(keysPressed: Record<string, any>) {
        this.keysPressed = keysPressed;
    }

    initKeyListeners = () => {
        window.addEventListener("keydown", (e) => {
            this.keysPressed[e.code] = true;
        });
        window.addEventListener("keyup", (e) => {
            this.keysPressed[e.code] = false;
        });
    }
}