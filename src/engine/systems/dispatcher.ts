

export class Dispatcher {

    tasks: Array<any>;

    constructor() {
        this.tasks = [];
    }

    addTask(task: any) {
        this.tasks.push(task);
    }


}