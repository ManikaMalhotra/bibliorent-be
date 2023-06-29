import Mongoose, { Schema, Model } from "mongoose";
import { IGenre } from "../../types/interfaces";

const GenreSchema: Schema = new Schema<IGenre>({
    name: {
        type: String,
        required: true,
        index: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
    }
}, {
    timestamps: true,
});

GenreSchema.methods.toJSON = function(): IGenre {
    const genre = this.toObject();

    delete genre.createdAt;
    delete genre.updatedAt;
    delete genre.__v;

    return genre;
};

const Genre: Model<IGenre> = Mongoose.model<IGenre>('Genre', GenreSchema);

export default Genre;