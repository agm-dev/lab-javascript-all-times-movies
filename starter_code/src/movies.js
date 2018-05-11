/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes

const durationToMinutes = durationString => durationString.split(' ').map(section => section.includes('h') ? Number(section.replace('h', '')) * 60 : Number(section.replace('min', ''))).reduce((result, minutes) => result + minutes);

const turnHoursToMinutes = movies => movies.map(movie => Object.assign({}, movie, { duration: durationToMinutes(movie.duration) }));

// Get the average of all rates with 2 decimals

const ratesAverage = movies => !movies.length ? undefined : parseFloat((movies.reduce((total, movie) => movie.rate ? total + parseFloat(movie.rate) : total, 0) / movies.length).toFixed(2));

// Get the average of Drama Movies

const dramaMoviesRate = movies => ratesAverage(movies.filter(movie => movie.genre.includes('Drama')));

// Order by time duration, in growing order

const orderByDuration = movies => movies.sort((a, b) => a.duration === b.duration ? a.title > b.title ? 1 : a.title < b.title ? -1 : 0 : a.duration > b.duration ? 1 : a.duration < b.duration ? -1 : 0);

// How many movies did STEVEN SPIELBERG
const stevenDramaMovies = movies => movies.filter(movie => movie.genre.includes('Drama') && movie.director === 'Steven Spielberg').length;

const howManyMovies = movies => !movies.length ? undefined : `Steven Spielberg directed ${stevenDramaMovies(movies)} drama movies!`;

// Order by title and print the first 20 titles

const orderAlphabetically = movies => movies.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0).slice(0, 20).map(movie => movie.title);

// Best yearly rate average

const bestYearAvg = movies => {
  if (!movies.length) return undefined;
  const moviesByYear = movies.reduce((result, movie) => { // returns structure kind of { 2007: [...2007Movies], 2000: [...2000Movies] }
    if (typeof result[movie.year] === 'undefined') {
      result[movie.year] = [movie];
    } else {
      result[movie.year].push(movie);
    }
    return result;
  }, {});
  // returns an array with objects kind of { year: 2007, average: 8.45 }
  const averageByYear = Object.entries(moviesByYear).map(([year, movies]) => {
    const average = movies.reduce((total, movie) => movie.rate ? total + parseFloat(movie.rate) : total, 0) / movies.length;
    return { year, average };
  });
  // sorts the array by average
  const bestYear = averageByYear.sort((a, b) => a.average > b.average ? -1 : a.average < b.average ? 1 : 0);
  return `The best year was ${bestYear[0].year} with an average rate of ${bestYear[0].average}`;
};
