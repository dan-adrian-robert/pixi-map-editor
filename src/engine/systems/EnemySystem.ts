import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {Enemy} from "../entities/Enemy";
import {CONTAINER_NAMES} from "../config";
import {DIRECTION} from "../../types";


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
        const enemy = new Enemy(
            '/assets/mobs/ogre.json',
            'walk_2', 48, 1/8, 100, 530,1, DIRECTION.RIGHT);
        this.containerMap[CONTAINER_NAMES.ENEMIES].addChild(enemy.container);
        this.enemyList.push(enemy);
    }

    handleMovement() {
        this.enemyList.forEach((enemy: Enemy) => {
            enemy.move();
        })
    }
}