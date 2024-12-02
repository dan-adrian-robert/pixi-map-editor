import {AnimatedSprite, Container, Texture} from "pixi.js";
import * as PIXI from "pixi.js";
import {CONTAINER_NAMES} from "../config";


export class Enemy {
    container: Container;
    animations: Record<string, Array<Texture>>;
    characterSprite: AnimatedSprite;

    constructor(source: string, animationState: string, containerMap:any, enemyList: Array<any>) {
        this.container = new Container();

        const config = PIXI.Assets.cache.get(source)
        this.animations = config.animations;

        this.characterSprite = new PIXI.AnimatedSprite(this.animations[animationState]);
        this.characterSprite.setSize(48)
        this.characterSprite.animationSpeed = 1 / 8;
        this.characterSprite.position.set(100, 530);
        this.characterSprite.play();

        this.container.addChild(this.characterSprite)


        containerMap[CONTAINER_NAMES.ENEMIES].addChild(this.container);
        enemyList.push(this);
    }

    changeAnimationState(newState: string): void {
        if (this.animations[newState]) {
            this.characterSprite.stop();

            this.characterSprite.textures = this.animations[newState];

            this.characterSprite.animationSpeed = 1 / 12;

            this.characterSprite.gotoAndPlay(0);
        } else {
            console.error(`Animation state "${newState}" not found!`);
        }
    }
}