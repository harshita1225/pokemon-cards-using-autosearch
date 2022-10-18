const search = document.getElementById("search");
const submit = document.getElementById("submit");

const pokemonName = document.getElementById("pokemon-name");
const abilitiesHTML = document.getElementById("ability-list");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defence = document.getElementById("defence");
const specialAttack = document.getElementById("special-attack");
const specialDefence = document.getElementById("special-defence");
const speed = document.getElementById("speed");
const img = document.querySelector("img");

const cardContainer = document.querySelector(".card-container");

//reset display

search.addEventListener("change", () => {
  abilitiesHTML.textContent = "";
  cardContainer.style.display = "none";
});

//click to display card
submit.addEventListener("click", fetchPokemon);

//functionto generate pokemon card

async function fetchPokemon(e) {
  e.preventDefault();

  const name = search.value.toLowerCase();
  //const name = "wartortle";
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (response.status == 200) {
      const data = await response.json();
      console.log(response);
      console.log(data);

      pokemonName.textContent = `${name}`.toLocaleUpperCase();

      //adding abilities to pokemon card
      const pokemonabilities = data.abilities;

      for (let i of pokemonabilities) {
        if (!abilitiesHTML.innerText.includes(i.ability.name)) {
          abilitiesHTML.appendChild(document.createElement("li")).textContent =
            i.ability.name;
          //console.log(abilitiesHTML.innerText.includes(i.ability.name));
        }
      }
      //console.log(data.abilities[0].ability.name);

      // adding stats to pokemon card
      const pokemonstats = data.stats;
      //console.log(pokemonstats);
      hp.innerText = pokemonstats[0].base_stat;
      attack.innerText = pokemonstats[1].base_stat;
      defence.innerText = pokemonstats[2].base_stat;
      specialAttack.innerText = pokemonstats[3].base_stat;
      specialDefence.innerText = pokemonstats[4].base_stat;
      speed.innerText = pokemonstats[5].base_stat;

      // adding image to pokemon card

      img.src = data.sprites.back_default;

      cardContainer.style.display = "block";
    } else {
      alert("Check Pokemon name!!");
      cardContainer.style.display = "none";
    }
  } catch (error) {
    alert(`something went wrong ${error.message}`);
  }
}

//////////////// function to fetct data to create pokemon name List //////////////////////
let list = [];
async function pokemonList(url) {
  search.focus();
  fetch(url, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => {
      if (response.status !== 200) {
        console.log(`There is a problem. Status Code: ${response.status}.`);
        return;
      }
      return response.json();
    })
    .then((data) => {
      data.results.forEach((key) => {
        list.push(key.name);
      });
    })
    .catch((error) => {
      console.log(error.statusText);
    });
  console.log(list);
}

const URL = `https://pokeapi.co/api/v2/pokemon/`;
pokemonList(URL);

/////////////////////////////////////////////////////////////////////

// autosearch using w3school code
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  //////////////// w3 school code///////////////

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(search, list);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
