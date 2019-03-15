// ! Can .map() be used for growUp() by accessing the age property directly?
// ! How to destructure and keep reference to whole obj? ie. starsByColor()
// ! .sort() mutates original array? How to solve without using .sort()?

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

    return kitties.filter(({ color }) => color === 'orange').map(cat => cat.name);

    // Annotation:
    // I first began by using Array.filter() to find only the orage cats, then intead of using .forEach() to loop through all the cats and add only the names to a new Array to return, I used map on the result of filter on the same line.
  },

  sortByAge() {

    return kitties.sort((a, b) => b.age - a.age);

    // Annotation:
    // I initially wrote a comparison function, which took 2 arguments, a & b. These represent two consecutive objects in the array, in this case cats. The return 1 and -1 statements tell the sort function that if a.age < b.age, then the sort order of a should be increased by 1, otherwise decreased. This continues for all cats a, b until the entire array has been sorted.
  },

  // ! Does this mutate the original data?
  growUp() {

    return kitties.reduce((cats, cat) => {
      cat.age += 2;
      cats.push(cat);
      return cats;
    }, []);
  }

  // Annotation:
  // I used .reduce() on the `kitties` array, and then added 2 to the age of each cat. From there, the cats were added to the accumulator `cats` array. Cats is returned after each loop.
};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: clubs from ./datasets/clubs
const clubPrompts = {

  membersBelongingToClubs() {

    return clubs.reduce((total, { club, members }) => {
      members.forEach(member => {
        if(!total[member]) {
          total[member] = [];
        }
        total[member].push(club);
      });
      return total;
    }, {});


    // Annotation:
    // Here `reduce` is called on the clubs, and is passed 2 arguments: `clubs` and a destructured current value object `{ club, members }`. Members is an array, so `forEach` is called on it. If there is no key in `total` matched `member`, it is initialized to an empty array. After that, `club` is pushed to the corresponding array for that `member`. After the members are looped through, `total` is returned for `reduce`.
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

    return mods.map(({ mod, students, instructors }) => ({
      mod: mod,
      studentsPerInstructor: students / instructors
    }));

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
    return cakes.map(({ cakeFlavor, inStock }) => ({
      flavor: cakeFlavor,
      inStock: inStock
    }));

    // Annotation:
    // Similar to the above algorithm, I used .map() to output new objects with the specified key/value pairs in a new array. `flavor` is assigned the value of `cake.cakeFlavor` and inStock is assigned `cake.inStock`
  },

  onlyInStock() {

    return cakes.filter(cake => cake.inStock > 0);

    // Annotation:
    // This is a simple case for the .filter() method, just use inStock > 0 as the condition.
  },

  totalInventory() {

    return cakes.reduce((total, { inStock }) => total + inStock, 0);

    // Annotation:
    // Array.reduce is perfect anytime an array needs to be 'reduced' to a single data type, in this case the sum of all the `cake.inStock`. The first parameter of the anon. function is the accumulator, the variable we are reducing to. The second is the current item, in this case a cake, destructured to just the stock amount. The 0 after the comma is the initial value of total.
  },

  allToppings() {

    return cakes.reduce((total, { toppings }) => {
      toppings.forEach(topping => {
        if(!total.includes(topping)) {
          total.push(topping);
        }
      });
      return total;
    }, []);

    // Annotation:
    // `reduce` is called on cakes, accepting `total` and `{ toppings }` as arguments. Toppings is then looped through, and each topping is checked to see if the cumulative list `toppings` already contains that `toppins` because we are looking for unique values. At the end of the loop, `total` is returned.
  },

  groceryList() {

    return cakes.reduce((ingredients, { toppings }) => {
      toppings.forEach(topping => {
        if(!ingredients[topping]) {
          ingredients[topping] = 0;
        }
        ingredients[topping]++;
      });
      return ingredients;
    }, {});

    // Annotation:
    // Here `reduce` is called on `cakes`, accepting the accumulator `ingredients` and `{ toppings }` as arguments. `ingredients` is initialized as an empty object. Toppings is then looped through, and a check is performed to see if `ingredients` has a key for that `topping`. If not, we want to initialize that key to 0. This will short circuit if the key already exists, then the corresponding key is incremented. At the end of the each iteration, `ingredients` is returned to continue.
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

    return classrooms.filter(room => room.program === 'FE');

    // Annotation:
    // Another simple .filter() function, just returning the rooms where room.program === 'FE' will return what we want;
  },

  totalCapacities() {

    // ! Not the most dynamic

    return classrooms.reduce((total, { program, capacity }) => {
      if(program === 'FE' ) {
        total.feCapacity += capacity; 
      } else {
        total.beCapacity += capacity;
      }
      return total;
    }, { feCapacity: 0, beCapacity: 0 });

    // Annotation:
    // We use `reduce` here because our output needs to be an object, and `reduce` can do that. The accumulator `total` is initalized as an object with keys for each capacity and 0 for each value. Then each `program` is checked to be `FE`, and the corresponding capactiy is updated with the `capacity` for that room.
  },

  sortByCapacity() {

    return classrooms.sort((a, b) => a.capacity - b.capacity);

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

    return breweries.reduce((total, { beers }) => total + beers.length, 0);

    // Annotation:
    // I used .reduce() to sum the length of all the beers for each brewery, defaulting it to 0.
  },

  getBreweryBeerCount() {

    return breweries.map(({ name, beers }) => ({
      name: name,
      beerCount: beers.length
    }));

    // Annotation:
    // I used map to output an array of objects where each object contains the name and number of beers of the brewery.
  },

  findHighestAbvBeer() {

    return breweries.reduce((highest, { beers }) => {
      beers.forEach(beer => {
        if(beer.abv > highest.abv) {
          highest = beer;
        }
      });
      return highest;
    }, breweries[0].beers[0]);

    // Annotation:
    // We want to find the highest abv of all beers. We can use reduce, because we want to output a single beer. Here the accumulator is initialized to the first beer in the first brewery, from which all subsequent beers are compared. If the abv is higher, `highest` is reassigned to that beer. Then `highest` is returned to continue.
  }
};


// `DOUBLE` DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  
  studentsForEachInstructor() {

    return instructors.map(({ name, module }) => ({
      name: name,
      studentCount: cohorts[module - 1].studentCount
    }));

    // Annotation:
    // I mapped each instructor to a new array of objects with the key/value pairs of name and sudentCount. I could simply use instructor.name for the name but I had to bring in the cohorts array to get the student count. I accessed that data by using bracket notation and subtracting one from instructor.teaches because of array 0-indexing
  },

  // ! Can be improved?
  studentsPerInstructor() {

    const result = {};

    const numTeachers = instructors.reduce((total, { module }) => {
      if(!total[module]) {
        total[module] = 0;
      }
      total[module]++;
      return total;
    }, {});

    cohorts.forEach(({ cohort, studentCount, module }) => {
      result[`cohort${cohort}`] = studentCount / numTeachers[module];
    });
    return result;

    // Annotation:
    // First we create an object numTeachers that is assigned to the output of `reduce` with key/value pairs for each mod. Inside `reduce`, if `total` does not have a key for that `module` one is initialized to zero. Then the value for that `module` is incremented before `total` is returned. In the second loop, the `result` object is updated using string iterpolation for the key name, and the value is the average students per teacher, calculated using the `studentCount` and `numTeachers` for that module.
  },

  modulesPerTeacher() {

    return instructors.reduce((total, { name, teaches }) => {
      if(!total[name]) {
        total[name] = [];
      }
      cohorts.forEach(({ module, curriculum }) => {
        if(teaches.some(subject => curriculum.includes(subject))) {
          total[name].push(module);
        }
      });
      return total;
    }, {});

    // Annotation:
    // Calling `reduce` on instructors and passing `total` and `{ name, teaches }` as arugments. We then check if `name` is a 
  },

  curriculumPerTeacher() {

    return instructors.reduce((total, { name, teaches }) => {
      teaches.forEach(subject => {
        if(!total[subject]) {
          total[subject] = [];
        }
        total[subject].push(name);
      });
      return total;
    }, {});

    // Annotation:
    // 
  }
};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {

  // ! .includes() intead of === ?
  // ! .reduce()?
  // ! Can't destructure because of shared var names?

  bossLoyalty() {

    return Object.values(bosses).map(boss => ({
      bossName: boss.name,
      sidekickLoyalty: sidekicks.reduce((total, sidekick) => {
        boss.sidekicks.forEach(bossSidekick => {
          if (bossSidekick.name === sidekick.name) {
            total += sidekick.loyaltyToBoss;
          }
        });
        return total;
      }, 0)
    }));

    // Annotation:
    // I wanted to loop through the values of the bosses object, which would return an array of all the individual boss object. I then wanted to loop through the sidekicks object and compare the names of each with the names in the boss sidekicks array. I then reduced their loyalty value to a single sum and assign that to sidekickLoyalty.
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

    // ! Does not allow for 'The Plow' or 'The Little Dipper'
    // ! Should work with .includes(), does not accept ^
    // ! Can't destructure because of shared var names?

    return stars.reduce((total, star) => {
      Object.values(constellations).forEach((constellation) => {
        if(constellation.names[0] === star.constellation) {
          total.push(star);
        }
      });
      return total;
    }, []);

    // TODO
    // Annotation:
    // Write your annotation here as a comment
  },

  // ! How to destructure and keep reference to whole object?

  starsByColor() {

    return stars.reduce((total, star) => {
      if(!total[star.color]) {
        total[star.color] = [];
      }
      total[star.color].push(star);
      return total;
    }, {});

    // TODO
    // Annotation:
    // Write your annotation here as a comment
  },

  constellationsStarsExistIn() {

    return stars.sort((a,b) => a.visualMagnitude - b.visualMagnitude)
      .reduce((total, { constellation }) => {
        total.push(constellation);
        return total;
      }, []);

    // TODO
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

    // ! Can't destructure because of overlapping var names (weapons)?

    return Object.values(characters).reduce((total, character) => {
      character.weapons.forEach(weapon => {
        total += weapons[weapon].damage;
      });
      return total;
    }, 0);

    // TODO
    // Annotation:
    // Write your annotation here as a comment
  },

  // ! Help
  charactersByTotal() {

    const result = [];

    for(let i = 0; i < characters.length; i++) {
      result.push({});
      result[i][characters[i].name] = {};
    }
    
    for(let i = 0; i < characters.length; i++) {
      result[i][characters[i].name] = {
        damage: characters[i].weapons.reduce((total, weapon) => total + weapons[weapon].damage, 0),
        range: characters[i].weapons.reduce((total, weapon) => total + weapons[weapon].range, 0)
      };
    }

    return result;

    // TODO
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

    return movies.reduce((total, { title, dinos }) => {
      total[title] = dinos.reduce((sum, dino) => {
        if(dinosaurs[dino].isAwesome) sum++;
        return sum;
      }, 0);
      return total;
    }, {});

    // TODO
    // Annotation:
    // Write your annotation here as a comment
  },

  averageAgePerMovie() {

    return movies.reduce((total, { title, director, cast, yearReleased }) => {
      if(!total[director]) {
        total[director] = {};
      }
      total[director][title] = Math.floor(cast.reduce((ageSum, actor) => {
        return ageSum + (yearReleased - humans[actor].yearBorn);
      }, 0) / cast.length);
      return total;
    }, {});

    // TODO
    // Annotation:
    // Write your annotation here as a comment
  },

  uncastActors() {

    // ! ???????

    const result = [];
    const allActors = movies.reduce((total, movie) => {
      movie.cast.forEach(actor => total.push(actor));
      return total;
    }, []);

    Object.keys(humans).forEach(human => {
      if(!allActors.includes(human)) {
        result.push({
          name: human,
          nationality: humans[human].nationality,
          imdbStarMeterRating: humans[human].imdbStarMeterRating
        });
      }
    });

    return result.sort((a,b) => a.nationality < b.nationality ? -1 : 1);

    // Annotation:
    // Write your annotation here as a comment
  },

  actorsAgesInMovies() {

    const result = [];
    const allActors = movies.reduce((total, movie) => {
      movie.cast.forEach(actor => total.push(actor));
      return total;
    }, []);

    Object.keys(humans).forEach(human => {
      if(allActors.includes(human)) {
        result.push({
          name: human,
          ages: movies.reduce((total, movie) => {
            if(movie.cast.includes(human)) {
              total.push(movie.yearReleased - humans[human].yearBorn);
            }
            return total;
          }, [])
        });
      }
    });

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