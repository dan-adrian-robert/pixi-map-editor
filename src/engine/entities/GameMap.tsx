import {Container, Sprite} from "pixi.js";

export class GameMap {
    mapContainer: Container | null;
    tileContainer: Container;

    tiles: Array<Sprite> = [];

    constructor() {
        this.mapContainer = null;
        this.tileContainer = new Container();
        this.tileContainer.name ='tileContainer';
    }

    addTiles = (tiles: Array<Sprite>) => {
        this.tiles = tiles;

        this.tiles.forEach((tile, tileIndex) => {
            tile.onclick = () => {
                this.tileContainer.removeChild(tile);
                tile.destroy();
                this.tiles.splice(tileIndex, 1);
            }
            this.tileContainer.addChild(tile);
        })

        this.mapContainer?.addChild(this.tileContainer);
    }
}