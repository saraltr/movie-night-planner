import { getMoviesByTitle } from './externalServices';

export async function fetchMovieData(title) {
    try {
      const response = await getMoviesByTitle(title);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
}