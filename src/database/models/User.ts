import Mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../../types/interfaces";
import { hash } from "../../utils/encrypt";

const UserSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        index: true,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    loggedInWithGoogle: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

UserSchema.methods.toJSON = function(): IUser {
    const user = this.toObject();

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;

    return user;
};

UserSchema.pre('save', function(next) {
    if (!this.password || !this.isModified('password')) {
        return next();
    }

    this.password = hash(this.password as string);
    next();
});

const User: Model<IUser> = Mongoose.model<IUser>('User', UserSchema);

export default User;