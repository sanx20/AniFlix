export class ImageModel {
    constructor(data) {
        this.imageUrl = data.image_url ?? "Not Found";
        this.smallImageUrl = data.small_image_url ?? "Not Found";
        this.largeImageUrl = data.large_image_url ?? "Not Found";
    }

    static fromJson(data) {
        return new ImageModel(data);
    }

    toPlainObject() {
        return {
            imageUrl: this.imageUrl,
            smallImageUrl: this.smallImageUrl,
            largeImageUrl: this.largeImageUrl,
        };
    }
}