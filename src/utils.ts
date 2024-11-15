
import * as PIXI from 'pixi.js'

export const getContainerByName = (container: PIXI.Container, name: string): PIXI.Container => {
    const result = container.getChildByName(name);

    if (!result) {
        throw new Error(`Could not find container with name ${name}'`);
    }

    return result;
}

export const createGraphics = (width: number, height: number): PIXI.Graphics => {
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, width, height);
    rectangle.endFill();
    rectangle.alpha = 0;
    rectangle.interactive = true;
    rectangle.cursor ='crosshair'
    rectangle.x = 0;
    rectangle.y = 0;

    return rectangle;
}