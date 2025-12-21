import express from "express";
import asyncHandler from "express-async-handler";
import Favorite from "./favoriteModel";

const router = express.Router();

router.get("/:username", asyncHandler(async (req, res) => {
    const username = req.params.username;
    const favorites = await Favorite.find({ username: username });
    res.status(200).json(favorites);
}));

router.post("/", asyncHandler(async (req, res) => {
const { username, movieId} = req.body;

if (!username || !movieId) {
    return res.status(400).json({
        success: false, msg: "username and movieId are required",
    });
}
const favorite = await Favorite.create({
    username,
    movieId,
});
res.status(201).json({
    success: true, favorite,
});
}));
export default router;