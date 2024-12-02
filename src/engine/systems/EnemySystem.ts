import * as PIXI from "pixi.js";
import { Container } from "pixi.js";
import {Enemy} from "../entities/Enemy";


export class EnemySystem {
    mainApp: PIXI.Application;
    enemyList: Array<any> = [];
    containerMap: Record<string, Container> = {};

    constructor(
        mainApp: PIXI.Application,
        enemyList: Array<any>,
        containerMap: Record<string, Container>,
    ) {
        this.mainApp = mainApp;
        this.enemyList = enemyList;
        this.containerMap = containerMap;
    }

    init () {
        const enemy = new Enemy('/assets/mobs/ogre.json', 'walk_2', this.containerMap, this.enemyList);
    }

    handleMovement() {
        this.enemyList.forEach((enemy) => {
            enemy.container.position.x += 1;
        })
    }
}