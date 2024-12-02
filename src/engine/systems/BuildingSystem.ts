import {Building} from "../entities/Building";
import {Container, Sprite, Texture} from "pixi.js";
import {CONTAINER_NAMES, LAYERS} from "../config";
import * as PIXI from "pixi.js";
import {RESOURCE} from "../../types";
import {shrinkAnimation} from "../../utils";


export class BuildingSystem {
    buildingMap: Record<string, Building>
    textureMap: Record<string, Texture>;
    containerMap: Record<string, Container>;
    resourceMap: Record<RESOURCE, number>
    mainApp: PIXI.Application;

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


    init() {
        this.initGoldMine();
        this.initIronMine();
        this.initHouse();
    }

    initGoldMine() {
        const mineSprite = new Sprite();
        mineSprite.width = 128;
        mineSprite.height = 128;
        mineSprite.name = 'goldMineSprite';
        mineSprite.texture = this.textureMap['goldMine'];
        mineSprite.setSize({width: 128, height: 128});
        mineSprite.position = {
            x: 1000,
            y: 450,
        }

        const container = new Container();
        container.name = 'goldMine'
        container.addChild(mineSprite);
        container.zIndex = LAYERS.IRON;
        container.interactive = true;
        container.onclick = () => {
            this.resourceMap[RESOURCE.WOOD] += 1;
        }

        this.containerMap[CONTAINER_NAMES.WORLD].addChild(container);
    }

    initIronMine() {
        const mineSprite = new Sprite();
        mineSprite.width = 128;
        mineSprite.height = 128;
        mineSprite.name = 'ironMineSprite';
        mineSprite.texture = this.textureMap['ironMine'];
        mineSprite.setSize({width: 128, height: 128});
        mineSprite.position = {
            x: 800,
            y: 450,
        }

        const container = new Container();
        container.name = 'ironMine'
        container.addChild(mineSprite);
        container.zIndex = LAYERS.IRON;
        container.interactive = true;
        container.onclick = () => {
            this.resourceMap[RESOURCE.IRON] += 1;
        }

        this.containerMap[CONTAINER_NAMES.WORLD].addChild(container);
    }

    initHouse() {
        const mineSprite = new Sprite();
        mineSprite.width = 128;
        mineSprite.height = 128;
        mineSprite.name = 'houseSprite';
        mineSprite.texture = this.textureMap['house'];
        mineSprite.setSize({width: 128, height: 128});
        mineSprite.position = {
            x: 600,
            y: 450,
        }

        const container = new Container();
        container.name = 'house'
        container.addChild(mineSprite);
        container.zIndex = LAYERS.IRON;
        container.interactive = true;

        this.containerMap[CONTAINER_NAMES.WORLD].addChild(container);

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
    }
}