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
    let listpokemon = document.createElement('listItemPokemon');
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
  
  // Create modal for details of pokemon
  let modalContainer = document.querySelector('#modal-container');
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    // Clear existing content
    modalContainer.innerHTML = ' ';

    // Add modal content
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let modalContent = document.createElement('div');
    modalContent.classList.add('modal.content');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    let heightElement = document.createElement('p');
    heightElement.innerText = `Height: ${pokemon.height} m`;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    imageElement.alt = pokemon.name

    // Append elements to modal content
    modalContent.appendChild(closeButtonElement);
    modalContent.appendChild(nameElement);
    modalContent.appendChild(heightElement);
    modalContent.appendChild(imageElement);

    // Append modal content to modal
    modal.appendChild(modalContent);

    // Append modal to modal container
    modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
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