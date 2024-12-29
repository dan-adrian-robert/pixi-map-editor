import {DIRECTION} from "../types";

export const CANVAS_OPTION = {
    width: 1024,
    height: 756,
    backgroundColor: 0x1099bb,
}

export const ZOOM_SETTINGS = {
    scale: 1,
    step: 0.1,
    maxZoomIn: 1,
    maxZoomOut: 1,
}

export const WORLD_SETTINGS = {
    width: 2048,
    height: 756,
}

export enum CONTAINER_NAMES {
    WORLD = 'WORLD',
    UI = 'UI',
    TOP_BAR = 'TOP_BAR',
    IRON = 'IRON',
    FOOD = 'FOOD',
    WOOD = 'WOOD',
    ENEMIES = 'ENEMIES',
    BUILD_UI = 'BUILD_UI'
}

export const LAYERS: Record<CONTAINER_NAMES, number> = {
    WORLD: 100,
    UI: 200,
    ENEMIES: 120,
    FOOD: 110,
    IRON: 110,
    WOOD: 110,
    TOP_BAR: 0,
    BUILD_UI: 200,
}

export const BUILDING_CONFIG = {
    IRON: {
        sprite: {
            width : 128,
            height : 128,
            name: 'ironMineSprite',
            textureName: 'ironMine',
            position: {
                x: 0,
                y: 0,
            },
        },
        container: {
            width : 128,
            height : 128,
            name: 'ironMineContainer',
            position: {
                x: 800,
                y: 450,
            },
            zIndex:LAYERS.IRON,
        }
    },
    GOLD: {
        sprite: {
            width : 128,
            height : 128,
            name: 'goldMineSprite',
            textureName: 'goldMine',
        },
        container: {
            width : 128,
            height : 128,
            name: 'goldContainer',
            position: {
                x: 1000,
                y: 450,
            },
            zIndex:LAYERS.IRON
        }
    },
    WOOD: {
        sprite: {
            width : 128,
            height : 128,
            name: 'houseSprite',
            textureName: 'house',
        },
        container: {
            width : 128,
            height : 128,
            name: 'houseContainer',
            position: {
                x: 600,
                y: 450,
            },
            zIndex:LAYERS.IRON,
        }
    }
}

export const BUILDING_TYPES = [
    {
        sprite: {
            width : 96,
            height : 96,
            name: 'goldMineBuildingSprite',
            textureName: 'goldMine',
        },
        container: {
            width : 96,
            height : 96,
            name: 'goldMineBuildingContainer',
            position: {
                x: 35,
                y: 0,
            },
            zIndex:201,
        },
        metadata:{
            type: 'goldMine',
            cost: 100,
        }
    },
    {
        sprite: {
            width : 96,
            height : 96,
            name: 'ironMineBuildingSprite',
            textureName: 'ironMine',
        },
        container: {
            width : 96,
            height : 96,
            name: 'ironMineBuildingContainer',
            position: {
                x: 135,
                y: 0,
            },
            zIndex:201,
        },
        metadata:{
            type: 'ironMine',
            cost: 80,
        }
    },
    {
        sprite: {
            width : 86,
            height : 75,
            name: 'foodBuildingSprite',
            textureName: 'house',
        },
        container: {
            width : 86,
            height : 75,
            name: 'foodBuildingContainer',
            position: {
                x: 235,
                y: 25,
            },
            zIndex:201,
        },
        metadata:{
            type: 'house',
            cost: 60,
        }
    }
]


export const ENEMY_CONFIG = {
    OGRE: {

    }
}

export const PORTAL_CONFIG =  [
    {
        x: 10,
        y: 505,
        spawnSpeed: 5,
        spawnTick: 1,
        spawnMaxTick: 300,
        source: '/assets/portal/portal.json',
        direction:  DIRECTION.RIGHT,
        spawnedConfig: {
            source: '/assets/mobs/ogre.json',
            animationState: 'walk_2',
            size: 48,
            animationSpeed: 1/8,
            speed: 1,
        }
    },
    {
        x: 1300,
        y: 505,
        spawnSpeed: 5,
        spawnTick: 1,
        spawnMaxTick: 300,
        source: '/assets/portal/portal.json',
        direction:  DIRECTION.LEFT,
        spawnedConfig: {
            source: '/assets/mobs/ogre.json',
            animationState: 'walk_2',
            size: 48,
            animationSpeed: 1/8,
            speed: 1,
        }
    },
]

export const TOWER_CONFIG = [
    {
        source: '/assets/towers/tower1.json',
        x: 300,
        y: 320,
        speed: 7,
    },
    {
        source: '/assets/towers/tower1.json',
        x: 700,
        y: 320,
        speed: 7,
    },
]