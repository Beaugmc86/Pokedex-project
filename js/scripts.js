//Create variable for pokemon repository.
// Wrap list array in an IIFE to avoid accidentally accessing global state
let pokemonRepository = (function () {

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
  ]

  //Return array of pokemon
  function getAll () {
    return pokemonList;
  }
  //Add a pokemon item to a list
  function add (pokemon) {
    pokemonList.push(pokemon);
  }

  //Create pokemon button list
  function addListItem(pokemon) {
    let repository = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    repository.appendChild(listpokemon);

    //add click function to button
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    }
  
  function showDetails(pokemon) {
    console.log(pokemon)
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  }
})()

//Add pikachu to array of pokemon
pokemonRepository.add({ name: 'Pikachu', height: 0.3, type: '[electric]'});

console.log(pokemonRepository.getAll());

//forEach Loop to iterate over pokemonList in task 1.5
//Updated from 'pokemonList' to 'pokemonRepository.getAll()' to call function within IIFE.
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);

  }
);