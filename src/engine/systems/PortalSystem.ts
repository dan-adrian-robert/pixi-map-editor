import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {Enemy} from "../entities/Enemy";
import {Portal} from "../entities/Portal";
import {CONTAINER_NAMES} from "../config";
import {DIRECTION} from "../../types";


export class PortalSystem {
    containerMap: Record<string, Container>;
    mainApp: PIXI.Application;
    enemyList: Array<Enemy>;
    portalList: Array<Portal>;

    constructor(
        containerMap: Record<string, Container>,
        mainApp: PIXI.Application,
        enemyList: Array<Enemy>,
        portalList: Array<Portal>,
    ) {
        this.containerMap = containerMap;
        this.mainApp = mainApp;
        this.enemyList = enemyList;
        this.portalList = portalList;
    }


    init() {
        const portal1 = new Portal(
            10, 505,
            5, 1, 300,
            '/assets/portal/portal.json',
            DIRECTION.RIGHT,
        );

        const portal2 = new Portal(
            1300, 505,
            5, 1, 300,
            '/assets/portal/portal.json',
            DIRECTION.LEFT,
        );

        this.containerMap[CONTAINER_NAMES.ENEMIES].addChild(portal1.container);
        this.containerMap[CONTAINER_NAMES.ENEMIES].addChild(portal2.container);
        this.portalList.push(portal1);
        this.portalList.push(portal2);
    }

    handleSpawnEnemy() {
        this.portalList.forEach((portal) => {
            portal.spawnTick += portal.spawnSpeed;

            if (portal.spawnTick >= portal.spawnMaxTick) {

                const position = portal.container.position;

                const enemy = new Enemy(
                    '/assets/mobs/ogre.json',
                    'walk_2', 48, 1/8,
                    position.x + 32, position.y + 12,
                    1,portal.direction);
                this.containerMap[CONTAINER_NAMES.ENEMIES].addChild(enemy.container);
                this.enemyList.push(enemy);


                portal.spawnTick = 0;
            }
        })
    }
}