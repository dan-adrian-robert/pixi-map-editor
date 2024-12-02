import {Container} from "pixi.js";
import * as PIXI from "pixi.js";
import {Enemy} from "../entities/Enemy";
import {Portal} from "../entities/Portal";
import {CONTAINER_NAMES} from "../config";


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
        const portal = new Portal(
            10, 505,
            5, 1, 300,
            '/assets/portal/portal.json'
        );

        this.containerMap[CONTAINER_NAMES.ENEMIES].addChild(portal.container);
        this.portalList.push(portal);
    }

    handleSpawnEnemy() {
        this.portalList.forEach((portal) => {
            portal.spawnTick += portal.spawnSpeed;

            console.log(portal.spawnTick);

            if (portal.spawnTick >= portal.spawnMaxTick) {

                const position = portal.container.position;

                const enemy = new Enemy(
                    '/assets/mobs/ogre.json',
                    'walk_2', 48, 1/8, position.x + 32, position.y + 12,1);
                this.containerMap[CONTAINER_NAMES.ENEMIES].addChild(enemy.container);
                this.enemyList.push(enemy);


                portal.spawnTick = 0;
            }
        })
    }
}