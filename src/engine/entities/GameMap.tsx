import {Container, Sprite} from "pixi.js";

export class GameMap {
    mapContainer: Container;
    tileContainer: Container;

    tiles: Array<Sprite> = [];

    constructor(mapContainer: Container, tiles: Array<Sprite>) {
        this.mapContainer = mapContainer;
        this.tileContainer = new Container();
        this.tileContainer.name ='tileContainer';
        this.tiles = tiles;

        this.tiles.forEach((tile, tileIndex) => {
            tile.onclick = () => {
                this.tileContainer.removeChild(tile);
                tile.destroy();
                this.tiles.splice(tileIndex, 1);
            }
            this.tileContainer.addChild(tile);
        })

        this.mapContainer.addChild(this.tileContainer);

    }

    getTiles = () => {
        return this.tiles;
    }
}