import * as PIXI from 'pixi.js'
import {loadAsset, loadTexture} from "./assetLoaders/loaders";
import {AssetPaths, ConfigMap} from "./Images";
import {Application, Container, Sprite} from "pixi.js";
import { getContainerByName } from "./utils";
import {buildMap, getNearbyTiles} from "./map.utils";
import {Player} from "./engine/entities/Player";
import {GameCamera} from "./engine/entities/Camera";
import {CameraSystem} from "./engine/systems/CameraSystem";
import {GameMap} from "./engine/entities/GameMap";


export namespace Engine {
    let mainApp: PIXI.Application;
    let WORLD_SETTINGS = {
        width: 6400,
        height: 3200,
    }

    let CANVAS_OPTION = {
        width: 1536,
        height: 768,
        backgroundColor: 0x1099bb,
    }

    let camera: GameCamera =  new GameCamera({x: 0, y: 0});

    let cameraSystem: CameraSystem =  new CameraSystem();


    const ZOOM_SETTINGS = {
        scale: 1,
        step: 0.1,
        maxZoomIn: 0.7,
        maxZoomOut: 0.5,
    }
    const TILE_SIZE = 64;

    const keys:Record<string, any> = {};

    let gameMap: GameMap;

    const player: Player = new Player(100, {x: 1600, y: 1000});

    export const initMainApp = async () => {

        if (mainApp) {
            return;
        }

        mainApp = new Application();
        await mainApp.init(CANVAS_OPTION);
        mainApp.ticker.maxFPS  = 32;


        document.getElementById('gameCanvas')?.appendChild(mainApp.canvas);

        await initContainers();

        await initCamera();

        await initWorldMap();

        await initPlayers();

    };

    export const initContainers = async () => {
        const world =  new PIXI.Container();
        world.name = 'world';
        world.eventMode = 'static'
        world.width = WORLD_SETTINGS.width;
        world.height = WORLD_SETTINGS.height;
        world.interactive = true;
        world.zIndex = 10;

        mainApp.stage.addChild(world);
    }

    export const initCamera = async () => {
        const world = mainApp.stage.getChildByName('world');

        if (!world) {
            return;
        }

        window.addEventListener("keydown", (e) => {
            keys[e.code] = true;
        });
        window.addEventListener("keyup", (e) => {
            keys[e.code] = false;
        });

        const bgSprite = new Sprite();
        bgSprite.width = WORLD_SETTINGS.width;
        bgSprite.height = WORLD_SETTINGS.height;
        bgSprite.name = 'bgSprite';

        const texture = await loadTexture(AssetPaths.BACKGROUND);

        bgSprite.texture = texture;

        world.addChild(bgSprite)

        world.addEventListener("pointerdown", (event) => {
            camera.onPointerDown(event);
        });

        world.addEventListener("pointermove", (event: PIXI.FederatedPointerEvent) => {
            if (camera.dragging) {
                camera.onPointerMove(event);
                world.cursor = 'grabbing';
            }
        });

        world.addEventListener("pointerup", () => {
            camera.resetDragging();
            world.cursor = 'grab';
        });

        world.addEventListener("pointerleave", () => {
            camera.resetDragging();
            world.cursor = 'grab';
        });

        world.addEventListener("wheel", (event) => {
            if (event.deltaY < 0) {
                ZOOM_SETTINGS.scale += ZOOM_SETTINGS.step;
                ZOOM_SETTINGS.scale  = Math.min(ZOOM_SETTINGS.maxZoomIn, ZOOM_SETTINGS.scale)
            } else if (event.deltaY > 0) {
                ZOOM_SETTINGS.scale = Math.max(ZOOM_SETTINGS.maxZoomOut, ZOOM_SETTINGS.scale - ZOOM_SETTINGS.step);
            }

            world.scale.set(ZOOM_SETTINGS.scale, ZOOM_SETTINGS.scale);
        });

        mainApp.ticker.add(() => {
            cameraSystem.handleCameraMovement(keys, camera, world, mainApp);
        });
    };

    export const initWorldMap = async () => {
        const world = getContainerByName(mainApp.stage, 'world');
        const bgSprite = world.children.find(child => child.name === 'bgSprite');

        const tileTextureMap = await loadAsset(AssetPaths.TILE_MAP_1, ConfigMap.TILE_MAP_1);

        gameMap = new GameMap(world, buildMap(tileTextureMap, TILE_SIZE));

        const buildTexture = await loadTexture(AssetPaths.TOOLBAR);

        if (bgSprite) {
            bgSprite.addChild(gameMap.tileContainer)
        }

        const toolBar = new Sprite(buildTexture);
        toolBar.name = 'toolbar'
        toolBar.zIndex = 100;
        toolBar.x = 0;
        toolBar.y = CANVAS_OPTION.height - 180;

        world.scale.set(0.3, 0.3);

        // mainApp.stage.addChild(toolBar)
    }

    export const getMainApp = (): PIXI.Application => {
        return mainApp;
    }

    export const initPlayers = () => {
        const world = getContainerByName(mainApp.stage, 'world');

        world.addChild(player.container);

        mainApp.ticker.add(({deltaTime}  ) => {
            player.move(keys, deltaTime);

            const nearbyTiles = getNearbyTiles(gameMap.getTiles(), player, 100);

            if (nearbyTiles.length === 0) {
                player.container.y += Math.floor(player.speed * deltaTime);
                // console.log(player.container.y);
            }
            //
            // const collided = checkCollision(nearbyTiles, {x:player.x, y:player.y, size:TILE_SIZE});
            //
            // if (!collided) {
            //     player.y += 5 * deltaTime;
            // }
            //
            // if(collided) {
            //     player.y = (collided.y - TILE_SIZE + 1);
            // }

        });
    }
}