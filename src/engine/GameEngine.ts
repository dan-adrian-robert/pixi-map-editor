import * as PIXI from "pixi.js";
import {GameCamera} from "./entities/Camera";
import {CameraSystem} from "./systems/CameraSystem";
import {CANVAS_OPTION} from "./config";
import {Container, Texture} from "pixi.js";
import {GameMap} from "./entities/GameMap";
import {KeySystem} from "./systems/KeySystem";
import {ContainerSystem} from "./systems/ContainerSystem";
import {TextureSystem} from "./systems/TextureSystem";
import {Building} from "./entities/Building";
import {BuildingSystem} from "./systems/BuildingSystem";
import {UISystem} from "./systems/UISystem";
import {RESOURCE} from "../types";
import {ResourceSystem} from "./systems/ResourceSystem";
import {EnemySystem} from "./systems/EnemySystem";
import {TowerSystem} from "./systems/TowerSystem";
import {Tower} from "./entities/Tower";
import {Enemy} from "./entities/Enemy";
import {Bullet} from "./entities/Bullet";
import {Portal} from "./entities/Portal";
import {PortalSystem} from "./systems/PortalSystem";

export class GameEngine {
    mainApp: PIXI.Application;
    camera: GameCamera;
    keysPressed: Record<string, any> = {};
    containerMap: Record<string, Container> = {};
    textureMap: Record<string, Texture> = {};
    gameMap: GameMap;
    buildingMap: Record<string, Building> = {};
    resourceMap: Record<RESOURCE, number> = {FOOD: 10, IRON: 20, WOOD: 155};

    enemyList: Array<Enemy> = [];
    towerList: Array<Tower> = [];
    bulletList: Array<Bullet> = [];
    portalList: Array<Portal> = [];

    keySystem: KeySystem;
    containerSystem: ContainerSystem;
    cameraSystem: CameraSystem;
    textureSystem: TextureSystem;
    buildingSystem: BuildingSystem;
    resourceSystem: ResourceSystem;
    enemySystem: EnemySystem;
    towerSystem: TowerSystem;
    portalSystem: PortalSystem;
    uiSystem: UISystem;


    constructor() {
        this.mainApp = new PIXI.Application();
        this.camera = new GameCamera({x: 0, y: 0});
        this.gameMap = new GameMap();

        this.containerSystem = new ContainerSystem(this.containerMap, this.mainApp, this.textureMap);
        this.keySystem = new KeySystem(this.keysPressed);
        this.cameraSystem = new CameraSystem(this.camera, this.containerMap, this.keysPressed, this.mainApp, this.textureMap);

        this.textureSystem = new TextureSystem(this.textureMap);
        this.buildingSystem = new BuildingSystem(
            this.buildingMap,
            this.textureMap,
            this.containerMap,
            this.mainApp,
            this.resourceMap,
        )
        this.uiSystem = new UISystem(this.containerMap, this.resourceMap, this.textureMap);
        this.resourceSystem = new ResourceSystem(this.resourceMap);
        this.enemySystem = new EnemySystem(this.mainApp, this.enemyList, this.containerMap)
        this.towerSystem = new TowerSystem(this.mainApp, this.enemyList, this.towerList, this.bulletList, this.containerMap);
        this.portalSystem = new PortalSystem(this.containerMap, this.mainApp, this.enemyList, this.portalList);
    }

    async initGameCanvas() {
        await this.mainApp.init(CANVAS_OPTION);
        this.mainApp.ticker.maxFPS = 32;
    }

    initSystems() {
        this.keySystem.initKeyListeners();
        this.containerSystem.init();
        this.cameraSystem.initCameraEventListeners();
        this.cameraSystem.initBGSprite();
        this.buildingSystem.init();
        this.uiSystem.init();

        this.enemySystem.init();
        this.towerSystem.init();
        this.portalSystem.init();

        this.mainApp.ticker.add(() => {
            this.cameraSystem.handleCameraMovement();
            this.uiSystem.updateResources();
            this.enemySystem.handleMovement()
            this.towerSystem.handleShooting();
            this.towerSystem.handleBulletMovement();
            this.towerSystem.handleBulletCollision();
            this.portalSystem.handleSpawnEnemy();
        })
    }

    handleStateChange(state: string) {
        this.enemyList.forEach(e => {e.changeAnimationState(state)});
    }
}