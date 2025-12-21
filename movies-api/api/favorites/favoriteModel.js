import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FavoriteScheme = new Schema({
    username: { type: String, required: true },
    movieId: { type: Number, required: true},
});
export default mongoose.model("Favorite", FavoriteScheme);