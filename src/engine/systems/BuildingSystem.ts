import {Building} from "../entities/Building";
import {Container, Sprite, Texture} from "pixi.js";
import {BUILDING_CONFIG, BUILDING_TYPES, CONTAINER_NAMES, LAYERS} from "../config";
import * as PIXI from "pixi.js";
import {RESOURCE} from "../../types";
import {shrinkAnimation} from "../../utils";

export class BuildingSystem {
    buildingMap: Record<string, Building>
    textureMap: Record<string, Texture>;
    containerMap: Record<string, Container>;
    resourceMap: Record<RESOURCE, number>
    mainApp: PIXI.Application;

    selectedBuilding: {
        type: any,
        container: Container,
    }| null = null;

    constructor(
        buildingMap: Record<string, Building>,
        textureMap: Record<string, Texture>,
        containerMap: Record<string, Container>,
        mainApp: PIXI.Application,
        resourceMap: Record<RESOURCE, number>
    ) {
        this.buildingMap = buildingMap;
        this.textureMap = textureMap;
        this.containerMap = containerMap;
        this.mainApp = mainApp;
        this.resourceMap = resourceMap;
    }

    init(): void {
        this.initGoldMine(BUILDING_CONFIG.GOLD);
        this.initIronMine(BUILDING_CONFIG.IRON);
        this.initHouse(BUILDING_CONFIG.WOOD);

        this.buildBuildingUI();

        console.log(this.textureMap);
    }

    buildBuildingUI() {

        BUILDING_TYPES.forEach(config => {
            const mineSprite = this.getConfiguredSprite(config.sprite)
            const container = this.getConfiguredContainer(config.container)

            container.addChild(mineSprite);
            container.onclick = () => {
                this.selectBuilding(mineSprite, config.metadata)
            }

            this.containerMap[CONTAINER_NAMES.BUILD_UI].addChild(container);
        })
    }

    canBuildingBePlaced(bx: number, by: number, bsize: number,  buildingMap:Record<string, Building>): boolean {
        const newBuildingBounds = {
            x: bx,
            y: by,
            width: bsize,
            height: bsize,
        };


        for (let buildingMapKey in buildingMap) {
            const building = buildingMap[buildingMapKey];
            const {width, height, x, y} = building.container;

            if (
                newBuildingBounds.x < x + width && // New building's left < Existing building's right
                newBuildingBounds.x + newBuildingBounds.width > x && // New building's right > Existing building's left
                newBuildingBounds.y < y + height && // New building's top < Existing building's bottom
                newBuildingBounds.y + newBuildingBounds.height > y // New building's bottom > Existing building's top
            ) {
                return false;
            }
        }


        return true;
    }

    selectBuilding(building: Sprite, metadata: any) {

        const {type} = metadata;

        const blueprintContainer = new Container();

        const graphics = new PIXI.Graphics();

        graphics.beginFill(0xFF0000); // Red color in hex
        graphics.drawRect(0, 0, 100, 100); // x, y, width, height
        graphics.endFill();
        graphics.alpha = 0.5

        const blueprint = new PIXI.Sprite();
        blueprint.name = 'blueprint';
        blueprint.alpha = 0.8;
        blueprint.width = 100;
        blueprint.height = 100;
        blueprint.texture = building.texture
        blueprint.zIndex = 210;

        blueprintContainer.addChild(blueprint);
        blueprintContainer.addChild(graphics);


        this.selectedBuilding = {
            container: blueprintContainer,
            type,
        }

        this.containerMap[CONTAINER_NAMES.WORLD].addChild(blueprintContainer);


        const handleBuildingMovement = (event: any) => {
            const { x, y } = event.data.global;

            const canBePlaced = this.canBuildingBePlaced(x, y, 100, this.buildingMap);

            blueprintContainer.position.set(x, y);

            if(canBePlaced) {
                graphics.beginFill(0x00FFFF); // Red color in hex
                graphics.drawRect(0, 0, 100, 100);
                graphics.endFill();
                graphics.alpha = 0.5
            }

            if (!canBePlaced || Math.abs(y - 475) > 10){
                graphics.beginFill(0xFF0000); // Red color in hex
                graphics.drawRect(0, 0, 100, 100); // x, y, width, height
                graphics.endFill();
                graphics.alpha = 0.5
            }
        }

        const handlePlaceBuild = (event: any) => {
            const { x, y } = event.data.global;
            const canBePlaced = this.canBuildingBePlaced(x, y, 100, this.buildingMap);
            console.log(canBePlaced, x, y, this.buildingMap)

            if (canBePlaced) {
                console.log('place it plz')
            }
            const spriteConfig = {
                width: 128,
                height: 128,
                name: `${type}Sprite`,
                textureName: type,
                size: {width: 128, height: 128},

            }
            const mineSprite = this.getConfiguredSprite(spriteConfig)

            const container = new Container();
            container.position = blueprintContainer.position;
            container.name = 'goldMine'
            container.addChild(mineSprite);
            container.zIndex = LAYERS.IRON;
            container.interactive = true;
            container.onclick = () => {
                this.resourceMap[RESOURCE.WOOD] += 1;
            }

            const newBuilding = new Building(container);

            this.containerMap[CONTAINER_NAMES.WORLD].addChild(container);
            this.buildingMap[`${x}_${y}`] = newBuilding;

            this.containerMap[CONTAINER_NAMES.WORLD].off('pointerdown',handlePlaceBuild)
            this.containerMap[CONTAINER_NAMES.WORLD].off('pointermove',handleBuildingMovement)

            this.selectedBuilding?.container.destroy()
        }

        this.containerMap[CONTAINER_NAMES.WORLD].on('pointermove', handleBuildingMovement);

        this.containerMap[CONTAINER_NAMES.WORLD].on('pointerdown',handlePlaceBuild)
    }

    initGoldMine(config: any): void {
        const mineSprite = this.getConfiguredSprite(config.sprite)
        const container = this.getConfiguredContainer(config.container)

        container.addChild(mineSprite);
        container.onclick = () => {
            this.resourceMap[RESOURCE.WOOD] += 1;
        }

        this.containerMap[CONTAINER_NAMES.WORLD].addChild(container);
        this.buildingMap[container.name] = new Building(container);
    }

    initIronMine(config: any): void {
        const mineSprite = this.getConfiguredSprite(config.sprite)
        const container = this.getConfiguredContainer(config.container)

        container.addChild(mineSprite);
        container.onclick = () => {
            this.resourceMap[RESOURCE.IRON] += 1;
        }

        this.containerMap[CONTAINER_NAMES.WORLD].addChild(container);
        this.buildingMap[container.name] = new Building(container);
    }

    initHouse(config: any): void {
        const mineSprite = this.getConfiguredSprite(config.sprite)
        const container = this.getConfiguredContainer(config.container)

        container.addChild(mineSprite);
        container.onclick = () => {
            this.resourceMap[RESOURCE.FOOD] += 1;
            const text1 = new PIXI.Text('+1 food', {
                fontSize: 36,
                fill: '#ffffff'
            });
            text1.anchor.set(0.5);
            text1.x = mineSprite.position.x + 50;
            text1.y = mineSprite.position.y;
            this.containerMap[CONTAINER_NAMES.WORLD].addChild(text1);

            this.mainApp.ticker.add(()=> {
                shrinkAnimation(text1, this.mainApp, this.containerMap[CONTAINER_NAMES.WORLD]);
            });
        }

        this.containerMap[CONTAINER_NAMES.WORLD].addChild(container);
        this.buildingMap[container.name] = new Building(container);
    }

    getConfiguredSprite(config: any): Sprite {
        const {width, height, name, textureName, size, position} = config;

        const sprite = new Sprite();
        sprite.width = width;
        sprite.height = height;
        sprite.name = name;
        sprite.texture = this.textureMap[textureName];
        sprite.setSize(size);

        return sprite;
    }

    getConfiguredContainer(configContainer: any): Container {
        const {width, height, name, zIndex, position} = configContainer;
        const container = new Container();
        container.name = name

        container.zIndex = zIndex;
        container.interactive = true;
        container.position = position;
        container.width = width;
        container.height = height;

        return container;
    }
}