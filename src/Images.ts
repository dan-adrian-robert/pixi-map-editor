import {ASSET_NAMES, ImageMap, JSONConfig} from "./assetLoaders/types";

export const AssetPaths : ImageMap = {
    [ASSET_NAMES.TILE_MAP]: require('./assets/tiles/tiles.png'),
    [ASSET_NAMES.TILE_MAP_1]: require('./assets/tiles/tiles_1.png'),
    [ASSET_NAMES.UI]: require('./assets/tiles/ui.png'),
    [ASSET_NAMES.OGRE]: require('./assets/mobs/ogre.png'),
    [ASSET_NAMES.TOWERS]: require('./assets/towers/towers.png'),
    [ASSET_NAMES.BUILD_UI]: require('./assets/tiles/buildUI.png'),
    [ASSET_NAMES.BACKGROUND]: require('./assets/background/background2.png'),
    [ASSET_NAMES.CLOUD]: require('./assets/background/clouds.png'),
    [ASSET_NAMES.TOOLBAR]: require('./assets/tiles/toolbar.png'),
    [ASSET_NAMES.MINE]: require('./assets/buildings/mine.png'),
    [ASSET_NAMES.TOPBAR]: require('./assets/ui/topBar.png'),
    [ASSET_NAMES.BASE_BUILDINGS]: require('./assets/buildings/buildings.png'),
    [ASSET_NAMES.RESOURCES]: require('./assets/items/resources.png'),
}

export const ConfigMap: JSONConfig = {
    [ASSET_NAMES.TILE_MAP]: require('./assets/tiles/tiles.json'),
    [ASSET_NAMES.TILE_MAP_1]: require('./assets/tiles/tiles_1.json'),
    [ASSET_NAMES.UI]: require('./assets/tiles/ui.json'),
    [ASSET_NAMES.OGRE]: require('./assets/mobs/ogre.json'),
    [ASSET_NAMES.TOWERS]: require('./assets/towers/towers.json'),
    [ASSET_NAMES.BUILD_UI]: require('./assets/tiles/buildUI.json'),
    [ASSET_NAMES.BACKGROUND]: require('./assets/tiles/buildUI.json'),
    [ASSET_NAMES.CLOUD]: require('./assets/tiles/buildUI.json'),
    [ASSET_NAMES.TOOLBAR]: require('./assets/tiles/toolbar.json'),
    [ASSET_NAMES.MINE]: require('./assets/tiles/toolbar.json'),
    [ASSET_NAMES.TOPBAR]: require('./assets/tiles/toolbar.json'),
    [ASSET_NAMES.BASE_BUILDINGS]: require('./assets/buildings/buildings.json'),
    [ASSET_NAMES.RESOURCES]: require('./assets/items/resources.json'),
}