import { Container } from "pixi.js";
import * as PIXI from "pixi.js";
import {DIRECTION} from "../../types";
import {Enemy} from "./Enemy";

export class Portal {
    container: Container;
    spawnSpeed: number
    spawnTick: number;
    spawnMaxTick: number;

    animations: Record<string, any>;
    sprite: any;
    direction: DIRECTION;
    spawnedConfig: any;

    constructor(
        x: number,
        y: number,
        spawnSpeed: number,
        spawnTick: number,
        spawnMaxTick: number,
        source: string,
        direction: DIRECTION,
        spawnedConfig: any,
    ) {
        this.container = new Container();
        this.container.name ='portal';

        this.spawnSpeed = spawnSpeed;
        this.spawnTick = spawnTick;
        this.spawnMaxTick = spawnMaxTick;
        this.direction = direction;
        this.spawnedConfig = spawnedConfig;


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
    }

    getSpawnedEnemy(): Enemy {
        const position = this.container.position;
        const {
            source,
            animationState,
            size,
            animationSpeed,
            speed,
        } = this.spawnedConfig;

        return new Enemy(
            source, animationState, size, animationSpeed,
            position.x + 32, position.y + 12, speed,this.direction);
    }

}