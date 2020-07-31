const db = require('./db');
const {Movie, Person} = db.models;
const {Op} = db.Sequelize;

(async () => {
  await db.sequelize.sync({force: true});
  try {
    const movieInstances = await Promise.all([
      Movie.create({
        title: 'Toy Story',
        runtime: 81,
        releaseDate: '1995-11-22',
        isAvailableOnVHS: true,
      }),
      Movie.create({
        title: 'The Incredibles',
        runtime: 115,
        releaseDate: '2004-04-14',
        isAvailableOnVHS: true,
      }),
      Movie.create({
        title: 'Toy Story 3',
        runtime: 103,
        releaseDate: '2010-06-18',
        isAvailableOnVHS: true,
      }),
    ]);
    const moviesJSON = movieInstances.map(movie => movie.toJSON());
    console.log(moviesJSON);
    const person = await Person.create({
      firstName: 'Tom',
      lastName: 'Hanks',
    });
    console.log(person.toJSON());
    const movieById = await Movie.findByPk(1);
    console.log(movieById.toJSON());
    const movieByRuntime = await Movie.findOne({where: {runtime: 115}});
    console.log(movieByRuntime.toJSON());
    const people = await Person.findAll({
      where: {lastName: 'Hanks'}
    });
    console.log(people.map(person => person.toJSON()));
    const movies = await Movie.findAll({
      attributes: ['id', 'title'], // return only id and title
      where: {
        releaseDate: {
          [Op.gte]: '2004-01-01'
        },
        runtime: {[Op.gte]: 95},
      },
    });
    console.log( movies.map(movie => movie.toJSON()) );
    const toyStory3 = await Movie.findByPk(3);
    await toyStory3.update({
      isAvailableOnVHS: true,
    });
    console.log(toyStory3.get({plain: true}));
    const toyStory = await Movie.findByPk(1);
    await toyStory.destroy();
    console.log('ASHMAN99');
    console.log( movies.map(movie => movie.toJSON()) );
  }
  catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    }
    else {
      throw error;
    }
  }
})();
