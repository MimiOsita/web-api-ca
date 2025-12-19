import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenre, getGenres } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";


const GenreMoviesPage = (props) => {
    const { genreId } = useParams();

    const { data: moviesData, error, isPending, isError } = useQuery({
        queryKey: ["genreMovies", { genreId }],
        queryFn: getMoviesByGenre,
    });

    const { data: genresData, isPending: isGenresPending } = useQuery ({
        queryKey: ["genres"],
        queryFn: getGenres,
    })

    if (isPending)
        return <Spinner/>;

    if (isError)
        return <h1>{error.message}</h1>

    const movies = moviesData.results;
    const genreName = genresData.genres.find((g) => g.id === parseInt(genreId))?.name || "Unknown";

    return (
        <PageTemplate
        title={`Genre: ${genreName}`}
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} /> }
        />
    );
};

export default GenreMoviesPage;