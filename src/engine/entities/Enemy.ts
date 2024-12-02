import {AnimatedSprite, Container, Texture} from "pixi.js";
import * as PIXI from "pixi.js";


export class Enemy {
    container: Container;
    animations: Record<string, Array<Texture>>;
    characterSprite: AnimatedSprite;
    speed: number;
    hp: number;

    constructor(
        source: string,
        animationState: string,
        size: number,
        animationSpeed: number,
        x: number,
        y: number,
        speed: number,
    ) {
        this.container = new Container();
        this.container.position = {x,y}

        const config = PIXI.Assets.cache.get(source)
        this.animations = config.animations;

        this.characterSprite = new PIXI.AnimatedSprite(this.animations[animationState]);
        this.characterSprite.setSize(size)
        this.characterSprite.animationSpeed = animationSpeed;

        this.characterSprite.play();

        this.container.addChild(this.characterSprite);
        this.speed = speed;
        this.hp = 5;
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

    move(): void {
        this.container.position.x += this.speed;
    }
}