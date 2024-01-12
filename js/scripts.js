//Create variable for pokemon array.
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
];

//Loop to iterate over each item in pokemonList
for (let i = 0; i < pokemonList.length; i++){
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ' )');
  if (pokemonList[i].height < 0.7){
   document.write('<br>')
  }else {
    document.write(' - Wow, that\'s big!');
    document.write('<br>')
  }
}