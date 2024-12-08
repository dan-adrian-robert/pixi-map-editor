
import * as PIXI from 'pixi.js'
import {Assets, Container, Sprite} from "pixi.js";
import {loadAsset, loadTexture} from "./assetLoaders/loaders";
import {AssetPaths, ConfigMap} from "./Images";

export const getContainerByName = (container: PIXI.Container, name: string): PIXI.Container => {
    const result = container.getChildByName(name);

    if (!result) {
        throw new Error(`Could not find container with name ${name}'`);
    }

    return result;
}

export const createGraphics = (width: number, height: number): PIXI.Graphics => {
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill('#AF1414');
    rectangle.drawRect(0, 0, width, height);
    rectangle.endFill();
    rectangle.alpha = 0;
    rectangle.interactive = true;
    rectangle.cursor ='crosshair'
    rectangle.x = 0;
    rectangle.y = 0;
    rectangle.zIndex = 1000;

    return rectangle;
}


export const buildContainersStructure = (config: any, name: string) => {
    const nameList = Object.keys(config);

    if (nameList.length === 0) {
        const container = new Container();
        container.name = name;

       return container;
    }

    const containerList: Array<Container> = nameList.map(item => {
        return buildContainersStructure(config[item], item);
    })

    const container = new Container();
    container.name = name;

    containerList.forEach(item => {
        container.addChild(item);
    })

    return container;

}

export const loadAllTextures = async ():Promise<Array<{name: string, texture: any}>> => {
    const bg =  await loadTexture(AssetPaths.BACKGROUND)
    const mine =  await loadTexture(AssetPaths.MINE)
    const topbar =  await loadTexture(AssetPaths.TOPBAR)

    const buildingTextures = await loadAsset(AssetPaths.BASE_BUILDINGS, ConfigMap.BASE_BUILDINGS);
    const resourceTextures = await loadAsset(AssetPaths.RESOURCES, ConfigMap.RESOURCES);

    const ogre = await loadTexture(AssetPaths.OGRE)

    await Assets.load([
        '/assets/mobs/ogre.png',
        '/assets/mobs/ogre.json',
    ]);

    await Assets.load([
        '/assets/portal/portal.png',
        '/assets/portal/portal.json',
    ]);

    await Assets.load([
        '/assets/towers/tower1.png',
        '/assets/towers/tower1.json',
    ]);

    await Assets.load([
        '/assets/projectiles/projectiles.png',
        '/assets/projectiles/projectiles.json',
    ]);

    return [
        {name: "bg", texture: bg},
        {name: "mine", texture: mine},
        {name: "topbar", texture: topbar},
        {name: "ironMine", texture: buildingTextures[2]},
        {name: "goldMine", texture: buildingTextures[0]},
        {name: "house", texture: buildingTextures[1]},
        {name:"foodIcon", texture: resourceTextures[0]},
        {name:"ironIcon", texture: resourceTextures[2]},
        {name:"goldIcon", texture: resourceTextures[1]},
        {name:"woodIcon", texture: resourceTextures[3]},
        {name:"ogre", texture: ogre},
    ];
}

export const shrinkAnimation = (text:PIXI.Text, mainApp: any, container: Container) => {
    text.style.fontSize = text.style.fontSize - 2.5;
    text.position.y -= 3;

    if (text.style.fontSize <= 5) {
        text.visible = false;
        mainApp.ticker.remove(shrinkAnimation);
        container.removeChild(text)
    }
};