const {
  kitties
} = require('./datasets/kitties');
const {
  clubs
} = require('./datasets/clubs');
const {
  mods
} = require('./datasets/mods');
const {
  cakes
} = require('./datasets/cakes');
const {
  classrooms
} = require('./datasets/classrooms');
const {
  breweries
} = require('./datasets/breweries');
const {
  instructors,
  cohorts
} = require('./datasets/turing');
const {
  bosses,
  sidekicks
} = require('./datasets/bosses');
const {
  constellations,
  stars
} = require('./datasets/astronomy');
const {
  weapons,
  characters
} = require('./datasets/ultima');
const {
  dinosaurs,
  humans,
  movies
} = require('./datasets/dinosaurs');






// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangeKittyNames() {
    const result = kitties.filter(cat => cat.color === 'orange').map(cat => cat.name);
    return result;

    // Annotation:
    // I first began by using Array.filter() to find only the orage cats, then intead of using .forEach() to loop through all the cats and add only the names to a new Array to return, I used map on the result of filter on the same line.
  },

  sortByAge() {
    // Sort the kitties by their age

    const result = kitties.sort((a, b) => (a.age < b.age) ? 1 : -1);
    return result;

    // Annotation:
    // I initially wrote a comparison function, which took 2 arguments, a & b. These represent two consecutive objects in the array, in this case cats. The return 1 and -1 statements tell the sort function that if a.age < b.age, then the sort order of a should be increased by 1, otherwise decreased. This continues for all cats a, b until the entire array has been sorted.
  },

  growUp() {
    const result = kitties.map(cat => cat);
    result.forEach(cat => cat.age += 2)
    return result;
  }

  // Annotation:
  // This solution works, but I decided to make an exact copy of the original Array using .map() because I didn't want to mutate the original data. I read about Object.assign(), but I wasn't quite sure how to use it so I stuck with this method.
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {
    // Create an object whose keys are the names of people, and whose values are
    // arrays that include the names of the clubs that person is a part of. e.g. 
    // {
    //   Louisa: ['Drama', 'Art'],
    //   Pam: ['Drama', 'Art', 'Chess'],
    //   ...etc
    // }

    const result = 'test';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: mods from ./datasets/mods
const modPrompts = {

  studentsPerMod() {
    const result = mods.map(module => ({
      mod: module.mod,
      studentsPerInstructor: module.students / module.instructors
    }));

    return result;

    // Annotation:
    // I used .map() to take each object in the original Array and output them to a new array with a key of the mod and calculated studentsPerInstructor with division. The extra set of parentheses is to tell the compiler that I am returning an object instead of denoting a multiline function because I am using ES6 arrow syntax
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes
const cakePrompts = {

  stockPerCake() {
    const result = cakes.map(cake => ({
      flavor: cake.cakeFlavor,
      inStock: cake.inStock
    }));

    return result;

    // Annotation:
    // Similar to the above algorithm, I used .map() to output new objects with the specified key/value pairs in a new array. Once again the extra set of parentheses is to tell the compiler that I am returning an object instead of denoting a multiline function because I am using ES6 arrow syntax
  },

  onlyInStock() {
    const result = cakes.filter(cake => cake.inStock > 0);
    return result;

    // Annotation:
    // This is a simple case for the .filter() method, just use inStock > 0 as the condition.
  },

  totalInventory() {
    const result = cakes.reduce((total, cake) => total + cake.inStock, 0);
    return result;

    // Annotation:
    // Array.reduce is perfect anytime an array needs to be 'reduced' to a single thing, in this case the sum of all the cake.inStock. The first parameter of the anon. function is the accumulator, the variable we are reducing to. The second is the current item, in this case a cake. The 0 after the comma is the initial value of total.
  },

  allToppings() {

    const result = []
    cakes.map(cake => cake.toppings)
      .forEach(topping => {
        topping.forEach(item => {
          result.push(item)
        })
      })
    return Array.from(new Set(result));

    // Annotation:
    // I first started by filtering out all the ingredients. However,the ingredients were in arrays themselves, so that required me to then loop through those arrays and add each ingredient to the results array. Whenever I need unique items, I like to use a Set, which accepts an iterable as an argument and keeps only the unique items. I then used Array.from() to conver that to an array. 
  },

  groceryList() {

    const result = {}
    const toppings = cakes.map(cake => cake.toppings)

    toppings.forEach(topping => {
        topping.forEach(item => {
          result[item] = 0;
        });
      })
    toppings.forEach(topping => {
        topping.forEach(item => {
          result[item]++;
        });
      });

    return result;

    // Annotation:
    // First I separated the toppings out and the looped through them, creating a key for each one in the result object and initializing it to 0. I then looped through it again, this time incrementing each one for each occurance.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {

    const result = classrooms.filter(room => room.program === 'FE');
    return result;

    // Annotation:
    // Another simple .filter() function, just returning the rooms where room.program === 'FE';
  },

  totalCapacities() {

    const result = {
      feCapacity: 0, 
      beCapacity: 0
    };

    const fe = classrooms.filter(room => room.program === 'FE')
    const be = classrooms.filter(room => room.program === 'BE')

    result['feCapacity'] = fe.reduce((total, room) => total + room.capacity, 0)
    result['beCapacity'] = be.reduce((total, room) => total + room.capacity, 0)

    return result;

    // Annotation:
    // I simply separated the rooms by program. I then summed the capactiy all the rooms to a single total and assigned that sum to the corresponding key in the result object.
  },

  sortByCapacity() {

    const result = classrooms.sort((a, b) => (a.capacity < b.capacity) ? -1 : 1)
    return result;

    // Annotation:
    // Similar to the kittens sort, I passed a function that took two classrooms a, b and compared their capactiy. If the capacity of a is less than b, then a is sorted lower than b. This continues for the whole array until it is sorted.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {

    const result = breweries.reduce((total, brewery) => total + brewery.beers.length, 0);
    return result;

    // Annotation:
    // I used .reduce() to sum the length of all the beers for each brewery, defaulting it to 0.
  },

  getBreweryBeerCount() {

    const result = breweries.map(brewery => ({
      name: brewery.name,
      beerCount: brewery.beers.length
    }));
    return result;

    // Annotation:
    // I used map to output an array of objects where each object contains the name and number of beers of the brewery.
  },

  findHighestAbvBeer() {

    const result = [];
    breweries.map(brewery => brewery.beers)
    .forEach(beerList => {
      beerList.forEach(beer => {
        result.push(beer)
      })
    })
    return result.reduce((a,b) => Math.max(a.abv, b.abv) === a.abv ? a : b);

    // Annotation:
    // I used the same method as the cakes to create a single array of all beers. Then I used reduce to compare two beers a, b and return either based on the max of their respective abv. This ultimately returns 1 value, the single beer with the highest abv.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {

    const result = instructors.map(instructor => ({
      name: instructor.name,
      studentCount: cohorts[instructor.module - 1].studentCount
    }));
    return result;

    // Annotation:
    // I mapped each instructor to a new array of objects with the key/value pairs of name and sudentCount. I could simply use instructor.name for the name but I had to bring in the cohorts array to get the student count. I accessed that data by using bracket notation and subtracting one from instructor.teaches because of array 0-indexing
  },

  studentsPerInstructor() {

    const numTeachers = {1: 0, 2: 0, 3: 0, 4: 0}
    const result = {}

    instructors.forEach(instructor => numTeachers[instructor.module]++);
    cohorts.forEach(cohort => {
      result[`cohort${cohort.cohort}`] = cohort.studentCount / numTeachers[cohort.module]
    });
    return result;

    // Annotation:
    // I choose to create an object with a key for each mod and initialized all to 0. I then looped through the instructors array and incremented the appropriate value in the numTeachers object. I then looped through the cohorts and added a key for each cohort and then divided the student count with the number of teachers for the mod as the value.
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [4, 2],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // { 
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {

    const result = Object.values(bosses).map(boss => ({
      bossName: boss.name,
      sidekickLoyalty: sidekicks.reduce((total, sidekick) => {
        boss.sidekicks.forEach(bossSidekick => {
          if(bossSidekick.name === sidekick.name) {
            total += sidekick.loyaltyToBoss;
          }
        })
        return total;
      }, 0)
    }))

    return result;

    // Annotation:
    // I wanted to loop through the values of the bosses object, which would return an array of all the individual boss object.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [ 
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.
    // [ 'Canis Major',
    //   'Carina',
    //   'Boötes',
    //   'Lyra',
    //   'Auriga',
    //   'Orion',
    //   'Canis Minor',
    //   'Eridanus',
    //   'Orion',
    //   'Centaurus' ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object. 
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the 
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      { 
        'Steven Spielberg': 
          { 
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37 
          },
        'Joe Johnston': 
          { 
            'Jurassic Park III': 44 
          },
        'Colin Trevorrow': 
          { 
            'Jurassic World': 56
           },
        'J. A. Bayona': 
          { 
            'Jurassic World: Fallen Kingdom': 59 
          } 
      }
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.

    [ { name: 'Justin Duncan', nationality: 'Alien', imdbStarMeterRating: 0 },
      { name: 'Tom Wilhoit', nationality: 'Kiwi', imdbStarMeterRating: 1 },
      { name: 'Jeo D', nationality: 'Martian', imdbStarMeterRating: 0 },
      { name: 'Karin Ohman', nationality: 'Swedish', imdbStarMeterRating: 0 } ]
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  dinosaurPrompts
};