//Create variable for pokemon repository.
// Wrap list array in an IIFE to avoid accidentally accessing global state
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Return array of pokemon
  function getAll () {
    return pokemonList;
  }
  //Add a pokemon item to a list
  function add (pokemon) {
    pokemonList.push(pokemon);
  }

  //Create Search bar and search function
  const searchBar = document.getElementById('searchBar');

  searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
 
    const filteredPokemon = pokemonRepository.getAll().filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(searchString);
    });

    // Clear the current list
    let repository = document.querySelector('.pokemon-list');
    repository.innerHTML = '';

    // Re-render the filtered list
    filteredPokemon.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

  //Create pokemon button list
  function addListItem(pokemon) {
    let repository = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    repository.appendChild(listPokemon);
    listPokemon.classList.add('list-group-item','col-12','col-sm-6','col-md-3','col-lg-3');
    listPokemon.id = pokemon.name

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container'); 
    button.classList.add('btn','btn-md','btn-block');

    listPokemon.appendChild(button);
    repository.appendChild(listPokemon);

    //add click function to button
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    }
  
  //Load list of pokemon from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            imageUrl: null, // Initialize imageUrl to null
            height: null, // Initialize height to null
            weight: null, // Initialize weight to null
            type: null, // Initialize type to null
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
  
  //Load details of pokemon from API
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.type = details.types.map(type => type.type.name).join(', '); // Extract and join types
      }).catch(function (e) {
        console.error(e);
      });
    }

  // Create modal for details of pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    // Create name element
    let nameElement = $('<h2>' + pokemon.name + '</h2>');
    // Create image element
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr('src', pokemon.imageUrl);
    // Create height element
    let heightElement = $('<p>' + 'height : ' + pokemon.height + ' m' + '</p>');
    // Create weight element
    let weightElement = $('<p>' + 'weight : ' + pokemon.weight + ' kg' + '</p>');
    // Create type element
    let typeElement = $('<p>' + 'type : ' + pokemon.type + '</p>');

    // Append elements
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!

  //Updated from 'pokemonList' to 'pokemonRepository.getAll()' to call function within IIFE.
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});