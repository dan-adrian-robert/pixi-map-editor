import {WORLD} from "./commons";
import {Sprite} from "pixi.js";
import {Player} from "./engine/entities/Player";

export const buildMap = (tileTextureMap: any, tileSize: number): Array<Sprite> => {
    const tileList = WORLD.terrain;
    const result = [];

    for (let i = 0; i < tileList.length; i++) {
        const row = tileList[i];

        for (let j = 0; j< row.length; j++) {
            const value = tileList[i][j];
            if (value >= 0) {

                const tile = new Sprite(tileTextureMap[value]);
                tile.position.x = j*tileSize;
                tile.position.y = i*tileSize;
                tile.setSize(tileSize, tileSize);
                tile.interactive = true;
                tile.zIndex = 20;
                tile.cursor = 'crosshair';
                result.push(tile);
            }
        }
    }

    return result;
}

export const getNearbyTiles = (list: Array<Sprite>, player: Player, range: number):Array<Sprite> => {

    const result = list.filter((tile, spriteIndex) => {
        if (!tile){
            return false;
        }
        try {
            const dx = tile.x - player.container.x;
            const dy = tile.y - player.container.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            return distance <= range;
        } catch(e) {
            return false;
        }

    });

    return result;

}

export const checkCollision = (list: Array<Sprite>, player: {x: number, y: number, size: number}): Sprite | null => {
    for (const sprite of list) {
        if (
            player.x < sprite.x + sprite.width &&
            player.x + player.size > sprite.x &&
            player.y < sprite.y + sprite.height &&
            player.y + player.size > sprite.y
        ) {
            return sprite;
        }
    }

    return null;
}