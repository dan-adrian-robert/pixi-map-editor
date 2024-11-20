import {RESOURCE} from "../../types";

export class ResourceSystem {
    resourceMap: Record<RESOURCE, number>;

    constructor(resourceMap: Record<RESOURCE, number>) {
        this.resourceMap = resourceMap;
    }

}