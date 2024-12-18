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
    ENEMIES = 'ENEMIES'
}

export const LAYERS: Record<CONTAINER_NAMES, number> = {
    WORLD: 100,
    UI: 200,
    ENEMIES: 120,
    FOOD: 110,
    IRON: 110,
    WOOD: 110,
    TOP_BAR: 0,
}