import {Container, Sprite, Texture} from "pixi.js";
import * as PIXI from "pixi.js";
import {CONTAINER_NAMES, LAYERS, WORLD_SETTINGS} from "../config";

export class ContainerSystem {
    containerMap: Record<string, Container>
    textureMap: Record<string, Texture>
    mainApp: PIXI.Application;

    constructor(
        containerMap:  Record<string, Container>,
        mainApp: PIXI.Application,
        textureMap: Record<string, Texture>
    ) {
        this.containerMap = containerMap;
        this.mainApp = mainApp;
        this.textureMap = textureMap;
    }

    init() {
        const world= new PIXI.Container();
        world.name = CONTAINER_NAMES.WORLD;
        world.eventMode = 'static'
        world.width = WORLD_SETTINGS.width;
        world.height = WORLD_SETTINGS.height;
        world.interactive = true;
        world.zIndex = LAYERS.WORLD;

        const UIContainer= new PIXI.Container();
        UIContainer.name = CONTAINER_NAMES.UI;
        UIContainer.zIndex = LAYERS.UI;

        const toolbarSprite = new Sprite();
        toolbarSprite.name = CONTAINER_NAMES.TOP_BAR;
        toolbarSprite.texture = this.textureMap["topbar"];
        toolbarSprite.setSize({width: 1024, height: 64});

        UIContainer.addChild(toolbarSprite);

        const enemyContainer = new Container();
        enemyContainer.name = CONTAINER_NAMES.ENEMIES;
        enemyContainer.zIndex = LAYERS.ENEMIES;
        world.addChild(enemyContainer)


        this.mainApp.stage.addChild(world);
        this.mainApp.stage.addChild(UIContainer);

        this.addContainer(world, CONTAINER_NAMES.WORLD);
        this.addContainer(UIContainer, CONTAINER_NAMES.UI);
        this.addContainer(toolbarSprite, CONTAINER_NAMES.TOP_BAR);
        this.addContainer(enemyContainer, CONTAINER_NAMES.ENEMIES);
    }

    addContainer = (container: Container, name: string) => {
        this.containerMap[name]= container;
    }
}