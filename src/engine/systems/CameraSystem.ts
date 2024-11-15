import {GameCamera} from "../entities/Camera";

export class CameraSystem {

    handleCameraMovement = (keys: Record<string, any>, camera: GameCamera, world: any, mainApp: any) => {

        if (keys["ArrowRight"]) {
            camera.poz.x -= camera.speed;
        }
        if (keys["ArrowLeft"]) {
            camera.poz.x += camera.speed;
        }
        if (keys["ArrowUp"]) {
            camera.poz.y += camera.speed;
        }
        if (keys["ArrowDown"]) {
            camera.poz.y -= camera.speed;
        }
        //
        // if (keys["KeyL"]) {
        //     camera.poz.x -= 2 * camera.speed;
        // }
        // if (keys["KeyJ"]) {
        //     camera.poz.x += 2 * camera.speed;
        // }
        // if (keys["KeyI"]) {
        //     camera.poz.y += 2 * camera.speed;
        // }
        // if (keys["KeyK"]) {
        //     camera.poz.y -= 2 * camera.speed;
        // }
        if (camera.poz.x > 0) {
            camera.poz.x = 0;
        }
        if (camera.poz.x < -world.width + mainApp.screen.width) {
            camera.poz.x = -world.width + mainApp.screen.width;
        }
        if (camera.poz.y > 0) {
            camera.poz.y = 0;
        }
        if (camera.poz.y < -world.height + mainApp.screen.height) {
            camera.poz.y = -world.height + mainApp.screen.height;
        }

        world.x = camera.poz.x;
        world.y = camera.poz.y;

    }
}