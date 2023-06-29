import Mongoose, { Schema, Model } from "mongoose";
import { IBook } from "../../types/interfaces";

const BookSchema: Schema = new Schema<IBook>({
    title: {
        type: String,
        required: true,
        index: true,
    },
    author: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true,
    },
    dop: {
        type: Date,
        required: true,
    },
    availableCopies: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
});

BookSchema.methods.toJSON = function(): IBook {
    const book = this.toObject();

    delete book.createdAt;
    delete book.updatedAt;
    delete book.__v;

    return book;
};

const Book: Model<IBook> = Mongoose.model<IBook>('Book', BookSchema);

export default Book;