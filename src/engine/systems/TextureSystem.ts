

export class TextureSystem {
    textureMap: Record<string, any>

    constructor(textureMap:  Record<string, any>) {
       this.textureMap = textureMap;
    }

    addTexture(list: Array<any>) {
        list.forEach((item) => {
            const {name, texture} = item;
            this.textureMap[name] = texture;
        })
    }

}