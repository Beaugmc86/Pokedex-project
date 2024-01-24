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

  //Create pokemon button list
  function addListItem(pokemon) {
    let repository = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('listItemPokemon');
    repository.appendChild(listPokemon);
    listPokemon.classList.add('list-group-item','col-sm-6','col-md-3','col-lg-3');
    listPokemon.id = pokemon.name

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', 'modal-container'); 
    button.classList.add('btn','btn-lg');
    listPokemon.appendChild(button);
    repository.appendChild(listPokemon);

    //add click function to button
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    }
  
  // Create modal for details of pokemon
  let modalContainer = document.querySelector('#modal-container');
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h2>' + pokemon.name + '</h2>');

    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrlFront);

    let heightElement = $('<p>' + 'height : ' + pokemon.height + '</p>');

    let weightElement = $('<p>' + 'weight : ' + pokemon.weight + '</p>');

    let typesElement = $('<p>' + 'types : ' + pokemon.types + '</p>');

    let abilitiesElement = $('<p>' + 'abilities : ' + pokemon.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  // Add Event Listeners
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //Load list of pokemon from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  
  //Load details of pokemon from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})()

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!

//Updated from 'pokemonList' to 'pokemonRepository.getAll()' to call function within IIFE.
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
});