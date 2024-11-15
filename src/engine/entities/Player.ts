import {Container} from "pixi.js";

import * as PIXI from "pixi.js";
const {v4 : UUID} = require('uuid');

export class Player {
    container: Container;
    speed: number;
    id: string;

    constructor(size: number, startPoz: {x: number, y: number}) {
        const playerBox = new PIXI.Graphics();
        playerBox.beginFill(0x0000ff);
        playerBox.drawRect(0, 0, size, size);
        playerBox.endFill();
        playerBox.zIndex = 30;

        this.container = new Container();
        this.container.name = "Player";
        this.container.addChild(playerBox);
        this.container.x = startPoz.x;
        this.container.y = startPoz.y;

        this.speed = 5;
        this.id = UUID();
    }

    move(keys: Record<string, any>, deltaTime: number) {

        if (keys["KeyW"]) {
            this.container.y -= this.speed * deltaTime;
        }
        if (keys["KeyA"]) {
            this.container.x -= this.speed * deltaTime;
        }
        if (keys["KeyS"]) {
            this.container.y += this.speed * deltaTime;
        }
        if (keys["KeyD"]) {
            this.container.x += this.speed * deltaTime;
        }
    }
}

