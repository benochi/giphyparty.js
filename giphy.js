const $gifDiv = $("#gifs");
const $searchInput = $("#search");


function createGif(res){
    let numResults = res.data.length; //comes up with a number based on user input
    if(numResults) { //makes sure the number isn't 0 - 0 X _ = 0, need a positive. 
      let randomIdx = Math.floor(Math.random() * numResults); //random number to randomize return image vlaues. 
      let $newCol = $("<div>", { class: "col-md-4 mb-4" });
      let $newImg = $("<img>", { //makes a new image, using the random number index of the type entered by user
        src: res.data[randomIdx].images.original.url,
        class: "w-100" //bootstrap width modifier to = 100% 
      });
      $newCol.append($newImg);
      $gifDiv.append($newCol);
    }  
}

$("form").on("submit", async function(e) {
    e.preventDefault();
    let userInput = $searchInput.val(); //assign user input use .val() not .value
    $searchInput.val("");  //clear user input use .VAL not .VALUE
  // need http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=Zgi89eWVleDIYsx6n4sB6V0n5QwRB2IN
    const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
       params: { //feedback from TA is that using a long string literal = bug prone.  
         q: userInput,
         api_key: "Zgi89eWVleDIYsx6n4sB6V0n5QwRB2IN"
       }
       });  
    createGif(response.data); //run function createGif with response.data as ARG
    });
  /* remove gif */
  
$("#remove").on("click", function() {
    $("#gifs").empty(); //empty ALL children from div parent "gif"
  });

//useful notes on ASYNC for images from API. 
/*async function getRandomDog (){
    const res = await axios.get('http://api.giphy.com/v1/gifs/search');
    console.log(res.data);
    const img = document.querySelector("#dog");
    img.src = res.data.message;
}

async function getDogByBreed(breed){
    try {
        const url = `https:dog.ceo/api/breed/${breed}/images/random`;
        const res = await axios.get(url);
        const img = document.querySelector("#dog");
        img.src = res.data.message;
    } catch(e) {
        alert('Breed not found!');
        getRandomDog(); //if you can't get breed runs this function. 
    }
}

const form = document.querySelector('#searchForm');
const input = document.querySelector('#search')
form.addEventListener('submit', function(e){
    e.preventDefault();
    getDogByBreed(input.value);
    input.value ='';
} */
