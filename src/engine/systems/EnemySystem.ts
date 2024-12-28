import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {Enemy} from "../entities/Enemy";

export class EnemySystem {
    mainApp: PIXI.Application;
    enemyList: Array<Enemy> = [];
    containerMap: Record<string, Container> = {};

    constructor(
        mainApp: PIXI.Application,
        enemyList: Array<Enemy>,
        containerMap: Record<string, Container>,
    ) {
        this.mainApp = mainApp;
        this.enemyList = enemyList;
        this.containerMap = containerMap;
    }

    init(): void {

    }

    handleMovement(): void {
        this.enemyList.forEach((enemy: Enemy) => {
            enemy.move();
        })
    }
}