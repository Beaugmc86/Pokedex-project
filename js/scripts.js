//Create variable for pokemon repository.
let pokemonList = [
  { 
    name: 'Bulbasaur', 
    type: ['grass', 'poison'], 
    height: 0.7 
  },
  { 
    name: 'Charmander', 
    type: 'fire', 
    height: 0.6 
  },
  { 
    name: 'Squirtle', 
    type: 'water', 
    height: 0.5
  },
  { 
    name: 'Mr. Mime', 
    type: ['psychic', 'fairy'], 
    height: 1.3 
  },
  { 
    name: 'Jynx', 
    type: ['psychic', 'ice'], 
    height: 1.4 
  },
  { 
    name: 'Snorlax', 
    type: 'normal', 
    height: 2.1
  },
];

//Loop to iterate over each item in pokemonList
// NOTE this is the old code to be replaced in Task 1.5
// function printArrayDetails(list){
//   for (let i = 0; i < list.length; i++){
//     document.write('<p>' + list[i].name + ' (height: ' + list[i].height + ' )');
//     if (list[i].height < 1.0){
//     }else {
//       document.write(' - Wow, that\'s big!');
//     }
//   }
// }

// printArrayDetails(pokemonList); // executes the function using ‘pokemonList‘ as its input

// printArrayDetails(pokemonList2); // executes the function using ‘pokemonList2‘ as its input

//forEach Loop to iterate over pokemonList in task 1.5
pokemonList.forEach(function(pokemon) {
  document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ' )' )
  if (pokemon.height > 1.0){
    document.write(' - Wow, that\'s big!');
    }
  }
)