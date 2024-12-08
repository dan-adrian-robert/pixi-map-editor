import {AnimatedSprite, Container, Graphics, Sprite, Texture} from "pixi.js";
import * as PIXI from "pixi.js";

export class Bullet {
    container: Container;
    attackSpeed: number;
    targetPosition: {x: number, y: number};
    sprite: Sprite;

    constructor(
        source: string,
        x: number,
        y: number,
        speed: number,
        targetPosition: {x: number, y: number}
    ) {
        this.container = new Container();
        this.container.name ='bullet';
        this.container.position = {x, y}

        const config = PIXI.Assets.cache.get(source)

        const texture = config.textures['arrow_01a'];

        this.sprite = new PIXI.Sprite(texture);
        this.sprite.setSize(24)

        const px = x - (targetPosition.x + 16);
        const py = y - (targetPosition.y - 16);

        this.sprite.rotation = Math.atan2(py, px)- Math.PI/ 4;

        this.container.addChild(this.sprite);
        this.attackSpeed = speed;
        this.targetPosition = targetPosition;
    }

}