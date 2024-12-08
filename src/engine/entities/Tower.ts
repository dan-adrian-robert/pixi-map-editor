import {Container, Sprite} from "pixi.js";
import * as PIXI from "pixi.js";


export class Tower {
    container: Container;
    attackSpeed: number;
    attackTickMax: number;
    tick: number;
    sprite: Sprite;
    animations: any;

    constructor(
        source: string,
        x: number,
        y: number,
        speed: number,
    ) {
        this.container = new Container();
        this.container.name = "tower_";
        this.container.position = {x,y}

        const config = PIXI.Assets.cache.get(source)

        this.animations = config.animations;

        this.sprite = new PIXI.AnimatedSprite(this.animations['tower']);
        this.sprite.setSize({height: 256, width: 120});

        this.container.addChild(this.sprite);
        this.attackSpeed = speed;
        this.attackTickMax = 15;
        this.tick = 0;


    }
}