import { Container } from "pixi.js";
import * as PIXI from "pixi.js";

export class Portal {
    container: Container;
    spawnSpeed: number
    spawnTick: number;
    spawnMaxTick: number;

    animations: Record<string, any>;
    sprite: any;

    constructor(
        x: number,
        y: number,
        spawnSpeed: number,
        spawnTick: number,
        spawnMaxTick: number,
        source: string,
    ) {
        this.container = new Container();
        this.container.name ='portal';

        this.spawnSpeed = spawnSpeed;
        this.spawnTick = spawnTick;
        this.spawnMaxTick = spawnMaxTick;


        this.container.position = {
            x, y
        }

        const config = PIXI.Assets.cache.get(source)

        this.animations = config.animations;

        this.sprite = new PIXI.AnimatedSprite(this.animations['idle']);

        this.sprite.setSize(64)
        this.sprite.animationSpeed = 1/8;

        this.sprite.play();

        this.container.addChild(this.sprite);

        console.log('config', config);
    }

}