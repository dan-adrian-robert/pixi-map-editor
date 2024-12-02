import * as PIXI from "pixi.js";
import { Container } from "pixi.js";
import {Enemy} from "../entities/Enemy";
import {Tower} from "../entities/Tower";
import {CONTAINER_NAMES} from "../config";
import {Bullet} from "../entities/Bullet";

export class TowerSystem {
    mainApp: PIXI.Application;
    enemyList: Array<Enemy>;
    towerList: Array<Tower>;
    bulletList: Array<Bullet>;
    containerMap: Record<string, Container>;

    constructor(
        mainApp: PIXI.Application,
        enemyList: Array<Enemy>,
        towerList: Array<Tower>,
        bulletList: Array<Bullet>,
        containerMap: Record<string, Container>,
    ) {
        this.mainApp = mainApp;
        this.enemyList = enemyList;
        this.towerList = towerList;
        this.bulletList = bulletList;
        this.containerMap = containerMap;
    }

    init () {
        const tower: Tower = new Tower(300, 350, 5);

        this.towerList.push(tower);
        this.containerMap[CONTAINER_NAMES.ENEMIES].addChild(tower.container);
    }

    handleShooting() {
        this.towerList.forEach((tower) => {
            tower.tick += 1;

            if (tower.tick >= tower.attackTickMax) {
                tower.tick = 0;

                const position = tower.container.position;

                const enemy = this.enemyList[0];

                if(enemy) {
                    const bullet = new Bullet(position.x, position.y, 15, enemy.container.position)

                    this.containerMap[CONTAINER_NAMES.ENEMIES].addChild(bullet.container);
                    this.bulletList.push(bullet);
                }
            }
        })
    }

    handleBulletMovement() {
        this.bulletList.forEach((bullet) => {
            const dx = bullet.targetPosition.x - bullet.container.x;
            const dy = bullet.targetPosition.y - bullet.container.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            const stepX = (dx / distance) * bullet.attackSpeed;
            const stepY = (dy / distance) * bullet.attackSpeed;
            bullet.container.x += stepX;
            bullet.container.y += stepY;
        })
    }

    handleBulletCollision() {
        this.enemyList.forEach((enemy, enemyIndex)=> {
            this.bulletList.forEach((bullet, bulletIndex) => {
                const pEnemy = enemy.container.position;
                const bBullet = bullet.container.position;

                const dx = Math.abs(pEnemy.x - bBullet.x);
                const dy = Math.abs(pEnemy.y - bBullet.y);

                // Calculate the distance to the target
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < bullet.attackSpeed) {
                    this.containerMap[CONTAINER_NAMES.ENEMIES].removeChild(bullet.container);
                    this.bulletList.splice(bulletIndex, 1)
                    enemy.hp -=1;

                    if(enemy.hp <= 0) {
                        this.containerMap[CONTAINER_NAMES.ENEMIES].removeChild(enemy.container);
                        this.enemyList.splice(enemyIndex, 1)
                    }
                }
            })
        })
    }
}