import { ImageModel } from '../image/ImageModel';
export class MangaImagesModel {
    constructor(data) {
        this.jpg = ImageModel.fromJson(data.jpg);
        this.webp = ImageModel.fromJson(data.webp);
    }

    static fromJson(data) {
        return new MangaImagesModel(data);
    }

    toPlainObject() {
        return {
            jpg: this.jpg.toPlainObject(),
            webp: this.webp.toPlainObject(),
        };
    }
}
