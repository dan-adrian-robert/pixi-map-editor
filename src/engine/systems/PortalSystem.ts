import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {Enemy} from "../entities/Enemy";
import {Portal} from "../entities/Portal";
import {CONTAINER_NAMES, PORTAL_CONFIG} from "../config";

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
        PORTAL_CONFIG.forEach((config) => {
            const {
                x,y,spawnSpeed,spawnTick,
                spawnMaxTick, source, direction, spawnedConfig
            } = config;

            const portal = new Portal(
                x, y, spawnSpeed, spawnTick,
                spawnMaxTick, source, direction,
                spawnedConfig,
            );
            this.containerMap[CONTAINER_NAMES.ENEMIES].addChild(portal.container);
            this.portalList.push(portal);
        })
    }

    handleSpawnEnemy() {
        this.portalList.forEach((portal) => {
            portal.spawnTick += portal.spawnSpeed;

            if (portal.spawnTick >= portal.spawnMaxTick) {
                const enemy = portal.getSpawnedEnemy();
                this.containerMap[CONTAINER_NAMES.ENEMIES].addChild(enemy.container);
                this.enemyList.push(enemy);

                portal.spawnTick = 0;
            }
        })
    }
}