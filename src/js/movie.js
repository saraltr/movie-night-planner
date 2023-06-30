import {displayMovieDetails} from './movieDetails.mjs';
import { getParam } from './utils.mjs';

const movieTitle = getParam("movie");
displayMovieDetails(movieTitle, "#movie-detail");