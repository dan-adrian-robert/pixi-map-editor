import { Container, Graphics} from "pixi.js";

export class Bullet {
    container: Container;
    attackSpeed: number;
    targetPosition: {x: number, y: number};


    constructor(
        x: number,
        y: number,
        speed: number,
        targetPosition: {x: number, y: number}
    ) {
        this.container = new Container();
        this.container.name ='bullet';

        const square = new Graphics();
        square.beginFill(0xffff00); // red color
        square.drawRect(0, 0, 15, 15); // x, y, width, height
        square.endFill();

        this.container.position = {
            x, y
        }
        this.container.addChild(square);
        this.attackSpeed = speed;
        this.targetPosition = targetPosition;
    }

}