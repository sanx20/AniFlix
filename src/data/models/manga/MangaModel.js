import { MangaImagesModel } from "./MangaImagesModel";

export class MangaModel {
    constructor(data) {
        this.id = data.mal_id ?? "Not Found";
        this.url = data.url ?? "Not Found";
        this.images = MangaImagesModel.fromJson(data.images);
        this.approved = data.approved ?? false;
        this.title = data.title ?? "Not Found";
        this.titleEnglish = data.title_english ?? "Not Found";
        this.titleJapanese = data.title_japanese ?? "Not Found";
        this.type = data.type ?? "Not Found";
        this.chapters = data.chapters ?? 0;
        this.volumes = data.volumes ?? 0;
        this.status = data.status ?? "Not Found";
        this.publishing = data.publishing ?? false;
        this.score = data.score ?? 0;
        this.scoreBy = data.scored_by ?? 0;
        this.rank = data.rank ?? 0;
        this.popularity = data.popularity ?? 0;
        this.members = data.members ?? 0;
        this.favorites = data.favorites ?? 0;
        this.synopsis = data.synopsis ?? "Not Found";
        this.background = data.background ?? "Not Found";
    }

    static fromJson(data) {
        return new MangaModel(data).toPlainObject();
    }

    toPlainObject() {
        return {
            id: this.id,
            url: this.url,
            images: this.images.toPlainObject(),
            approved: this.approved,
            title: this.title,
            titleEnglish: this.titleEnglish,
            titleJapanese: this.titleJapanese,
            type: this.type,
            chapters: this.chapters,
            volumes: this.volumes,
            status: this.status,
            publishing: this.publishing,
            score: this.score,
            scoreBy: this.scoreBy,
            rank: this.rank,
            popularity: this.popularity,
            members: this.members,
            favorites: this.favorites,
            synopsis: this.synopsis,
            background: this.background,
        };
    }
}