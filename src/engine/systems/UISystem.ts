import {Container, Sprite, Text, Texture} from "pixi.js";
import {CONTAINER_NAMES} from "../config";
import {RESOURCE} from "../../types";
import type {PointData} from "pixi.js/lib/maths/point/PointData";
import {Size} from "pixi.js/lib/maths/misc/Size";


export class UISystem {
    containerMap: Record<string, any> = {};
    resourceMap: Record<RESOURCE, number>
    textureMap: Record<string, Texture>

    constructor(
        containerMap: Record<string, Container>,
        resourceMap: Record<RESOURCE, number>,
        textureMap: Record<string, Texture>,
    ) {
        this.containerMap = containerMap;
        this.resourceMap = resourceMap;
        this.textureMap = textureMap;
    }

    init() {
        // IRON CONTAINER
        const ironContainer = this.buildResourceContainer(
            CONTAINER_NAMES.IRON, {x:20, y:20}, `${this.resourceMap.IRON}`,
            this.textureMap['ironIcon'],{width: 32, height: 32}
        );
        this.containerMap[CONTAINER_NAMES.IRON] = ironContainer;
        this.containerMap[CONTAINER_NAMES.UI].addChild(ironContainer);

        // FOOD CONTAINER
        const foodContainer = this.buildResourceContainer(
            CONTAINER_NAMES.FOOD, {x:100, y:20}, `${this.resourceMap.FOOD}`,
            this.textureMap['foodIcon'],{width: 32, height: 32}
        )

        this.containerMap[CONTAINER_NAMES.FOOD] = foodContainer;
        this.containerMap[CONTAINER_NAMES.UI].addChild(foodContainer);

        // WOOD CONTAINER
        const woodContainer = this.buildResourceContainer(
            CONTAINER_NAMES.WOOD, {x:180, y:20}, `${this.resourceMap.WOOD}`,
            this.textureMap['woodIcon'],{width: 32, height: 32}
        )

        this.containerMap[CONTAINER_NAMES.WOOD] = woodContainer;
        this.containerMap[CONTAINER_NAMES.UI].addChild(woodContainer);
    }

    updateResources() {
        const IronText = this.containerMap[CONTAINER_NAMES.IRON].children[1];
        const FoodText = this.containerMap[CONTAINER_NAMES.FOOD].children[1];
        const WoodText = this.containerMap[CONTAINER_NAMES.WOOD].children[1];

        IronText.text = `${this.resourceMap.IRON}`
        FoodText.text = `${this.resourceMap.FOOD}`
        WoodText.text = `${this.resourceMap.WOOD}`
    }

    buildResourceContainer(containerName: string, position:PointData, text: string, texture:Texture, spriteSize:Size): Container {
        const style = {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xffffff,
        }
        const container = new Container();
        container.name = `${containerName}Container`;
        container.position=position;

        const resourceText = new Text(text, style);
        resourceText.name = `${containerName}Text`;
        resourceText.x = 32;
        resourceText.y = 8;

        const resourceSprite = new Sprite();
        resourceSprite.name = `${containerName}Sprite`;
        resourceSprite.texture = texture;
        resourceSprite.setSize(spriteSize);

        container.addChild(resourceSprite)
        container.addChild(resourceText)

        return container;
    }
}