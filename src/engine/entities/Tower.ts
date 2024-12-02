import { Container, Graphics} from "pixi.js";


export class Tower {
    container: Container;
    attackSpeed: number;
    attackTickMax: number;
    tick: number;

    constructor(
        x: number,
        y: number,
        speed: number,
    ) {
        this.container = new Container();
        this.container.name = "tower_";

        const square = new Graphics();
        square.beginFill(0xff0000); // red color
        square.drawRect(0 ,0, 50, 50); // x, y, width, height
        square.endFill();
        this.container.position = {x,y}

        this.container.addChild(square);
        this.attackSpeed = speed;
        this.attackTickMax = 25;
        this.tick = 0;


    }
}