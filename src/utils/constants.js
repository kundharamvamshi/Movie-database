export const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export const PROFILE_URL = 'https://image.tmdb.org/t/p/w300'

export const POPULAR_MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`

export const TOP_RATED_MOVIES_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`

export const UPCOMING_MOVIES_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`

export const SEARCH_MOVIES_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`

export const MOVIE_DETAILS_API = `https://api.themoviedb.org/3/movie`
