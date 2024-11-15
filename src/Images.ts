import {ASSET_NAMES, ImageMap, JSONConfig} from "./assetLoaders/types";

export const AssetPaths : ImageMap = {
    [ASSET_NAMES.TILE_MAP]: require('./assets/tiles/tiles.png'),
    [ASSET_NAMES.TILE_MAP_1]: require('./assets/tiles/tiles_1.png'),
    [ASSET_NAMES.UI]: require('./assets/tiles/ui.png'),
    [ASSET_NAMES.OGRE]: require('./assets/mobs/ogre.png'),
    [ASSET_NAMES.TOWERS]: require('./assets/towers/towers.png'),
    [ASSET_NAMES.BUILD_UI]: require('./assets/tiles/buildUI.png'),
    [ASSET_NAMES.BACKGROUND]: require('./assets/background/grid_bg.png'),
    [ASSET_NAMES.CLOUD]: require('./assets/background/clouds.png'),
    [ASSET_NAMES.TOOLBAR]: require('./assets/tiles/toolbar.png'),
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
}