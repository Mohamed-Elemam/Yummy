//-----------------
// * onload spinner
//-----------------
function spin () {
  $("body").css("overflow", "hidden");
  
  $(".spinner").fadeIn();
  $(".spinner").fadeOut();
  
  $("body").css("overflow", "auto");
  
  
}

$(document).ready(spin());

//?############################################################################
//-----------------
// * side nav bar
//-----------------
let innerbarWidth = $(".innerbar").innerWidth(); //the innerbar width

$(".sidebar").css("left", -innerbarWidth); //hiding the innerbar

$(".outterbar").click(function () {
  //on click
  if ($(".sidebar").css("left") == "0px") {
    $(".sidebar").animate({ left: -innerbarWidth }); //hide the innerbar
    $(".outterbar").animate({ left: 0 }); // retutrn the outer back
    $(".xmark").removeClass("fas fa-x ");
    $(".xmark").addClass("fas fa-bars");
  
    $(".unlist").removeClass("animate__backInUp");
    $(".unlist").addClass("animate__backOutDown");
    
  } else {
    //on open
    
    $(".unlist").removeClass("animate__backOutDown");
    $(".unlist").addClass("animate__backInUp");
    $(".xmark").removeClass("fas fa-bars");
    $(".xmark").addClass("fas fa-x ");
    
    $(".sidebar").animate({ left: 0 });
    $(".outterbar").animate({ left: innerbarWidth });
  }
});

//?############################################################################
$(".sideLink")
  .eq(0)
  .click(function () {
    getContacts("d-none")
    displaySearch();
    $(".sidebar").animate({ left: -innerbarWidth });
    $(".xmark").removeClass("fas fa-x ");
    $(".xmark").addClass("fas fa-bars");
  }); //search
  $(".sideLink")
  .eq(1)
  .click(function () {
    spin()
    getContacts("d-none")
    getCategories();
    $(".sidebar").animate({ left: -innerbarWidth });
    $(".xmark").removeClass("fas fa-x ");
    $(".xmark").addClass("fas fa-bars");
  }); //categories
$(".sideLink")
  .eq(2)
  .click(function () {
    getContacts("d-none")
    spin()
    displayCities();
    $(".sidebar").animate({ left: -innerbarWidth });
    $(".xmark").removeClass("fas fa-x ");
    $(".xmark").addClass("fas fa-bars");
  }); //Area
  $(".sideLink")
  .eq(3)
  .click(function () {
    getContacts("d-none")
    spin()
    getIngredient();

    $(".sidebar").animate({ left: -innerbarWidth });
    $(".xmark").removeClass("fas fa-x ");
    $(".xmark").addClass("fas fa-bars");
  }); //ingredient
$(".sideLink")
  .eq(4)
  .click(function () {
    $(".contactUs").removeClass("d-none");
    getContacts("d-block")
    $(".sidebar").animate({ left: -innerbarWidth });
    $(".xmark").removeClass("fas fa-x ");
    $(".xmark").addClass("fas fa-bars");
  }); //contact us

//?############################################################################
//-----------------
// * index
//-----------------
// fetch 25 dish
let firstPage = document.querySelector(".firstPage");

async function getDishs() {
  let current = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let result = await current.json();
  
  let box = "";
  for (let i = 0; i < result.meals.length; i++) {
    box += `
    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3" onclick='getDesc("${result.meals[i].strMeal}")'>
    <div class="food rounded-4">

        <div class=" ottar">
            <img src="${result.meals[i].strMealThumb}" alt="food" >
            <div class=" innerself" style="color:#000;">
                <p > ${result.meals[i].strMeal} </p>
            </div>
        </div>
    </div>
</div>
    `;
  }
  firstPage.innerHTML = box;
}
getDishs();                //!<<========================== enable ====

//the get descrebtion function
async function getDesc(strMeal) {
  let current = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${strMeal}`
  );
  let result = await current.json();

  console.log(result.meals[0]);

  firstPage.innerHTML = `

  <div class="col-md-4">
  <div class=" rounded-4">

      <div class=" ottar">
          <img src="${result.meals[0].strMealThumb}" class="w-75 my-3" >

              <h1 >${result.meals[0].strMeal}  </h1>
      </div>
  </div>
  </div>
  <div class="col-md-8">
  <h2>Instructions
  </h2>
  <p>  ${result.meals[0].strInstructions}</p>
  <div>
      <span class="h2">Area :</span>
      <span class="h4">${result.meals[0].strArea}</span>
  </div>
  <div>
      <span class="h2">Category :</span>
      <span class="h4">${result.meals[0].strCategory}</span>
  </div>
  <h2>Recipes  :</h2>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
      <li class="alert alert-info m-2 p-1">${result.meals[0].strMeasure1} ${result.meals[0].strIngredient1} </li>
      <li class="alert alert-info m-2 p-1">${result.meals[0].strMeasure2} ${result.meals[0].strIngredient2} </li>
      <li class="alert alert-info m-2 p-1">${result.meals[0].strMeasure3} ${result.meals[0].strIngredient3} </li>
      <li class="alert alert-info m-2 p-1">${result.meals[0].strMeasure4} ${result.meals[0].strIngredient4} </li>
      <li class="alert alert-info m-2 p-1">${result.meals[0].strMeasure5} ${result.meals[0].strIngredient5} </li>
      <li class="alert alert-info m-2 p-1">${result.meals[0].strMeasure6} ${result.meals[0].strIngredient6} </li>
      <li class="alert alert-info m-2 p-1">${result.meals[0].strMeasure7} ${result.meals[0].strIngredient7} </li>
      <li class="alert alert-info m-2 p-1">${result.meals[0].strMeasure8} ${result.meals[0].strIngredient8} </li>
    

  </ul>
  <h2>Tags :</h2>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
      <li class="alert alert-danger m-2 p-1">${result.meals[0].strTags} </li>
  </ul>
  <a href="${result.meals[0].strSource}" class="btn btn-success">Source</a>
  <a href="${result.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
  </div>

  `;
}

// getDesc("Arrabiata")

//todo####################################
//countries

async function displayCities(county) {
  var api =
    await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list/
`);
  var result = await api.json();
  console.log(result.meals);
  box = "";
  for (let i = 0; i < result.meals.length; i++) {
    box += `
    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 text-center"style="cursor:pointer;" onclick='getCityInfo("${result.meals[i].strArea}")'>
    <div class="county"> 
        <i class="fas fa-house-laptop"style="font-size:64px" ></i>
        <p style="font-size:24.784px;font-weight:500;">${result.meals[i].strArea}</p>
    </div>
</div>
</div>
    `;
  }
  firstPage.innerHTML = box;
}
// displayCities();

async function getCityInfo(country) {
  var api =
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}
`);
  var result = await api.json();
  console.log(result.meals[0]);
  box = "";
  for (let i = 0; i < result.meals.length; i++) {
    box += `
    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3" onclick='getDesc("${result.meals[i].strMeal}")'>
    <div class="food rounded-4">

        <div class=" ottar">
            <img src="${result.meals[i].strMealThumb}" alt="food" >
            <div class=" innerself" style="color:#000;">
                <p > ${result.meals[i].strMeal} </p>
            </div>
        </div>
    </div>
</div>
    `;
  }
  firstPage.innerHTML = box;
  console.log(firstPage.innerHTML);
}
// getCityInfo(country)
//?---------------------------------
//*ingredient

async function getIngredient() {
  var api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list
`);
  var result = await api.json();
  console.log(result.meals);

  box = "";

  for (let i = 0; i < result.meals.length; i++) {
    box += `
    <div style="overflow:hidden; cursor:pointer;" class="col-sm-12 col-md-6 col-lg-4 col-xl-3  my-2 text-center" onclick='chooseIngredient("${result.meals[i].strIngredient}")'>
    <div class="county"> 
    <i class="fas fa-drumstick-bite"style="font-size:64px" ></i>
    <p style="font-size:24.784px;font-weight:500;">${result.meals[i].strIngredient}</p>
    <p  style="max-height:50px;font-weight:500;font-size:18px;overflow:hidden;">${result.meals[i].strDescription}</p>
    
    </div>
    </div>
    </div>
    `;
  }

  firstPage.innerHTML = box;
}
// getIngredient();

// filter by ingredient

async function chooseIngredient(ingredient) {
  var api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  var result = await api.json();
  console.log(result);
  var box = "";
  for (let i = 0; i < result.meals.length; i++) {
    box += `
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3" onclick='getDesc("${result.meals[i].strMeal}")'>
        <div class="food rounded-4">
          <div class="ottar">
            <img src="${result.meals[i].strMealThumb}" alt="food">
            <div class="innerself" style="color:#000;">
              <p>${result.meals[i].strMeal}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  firstPage.innerHTML = box;
}

//* dispaly search
var field;

function displaySearch() {
  firstPage.innerHTML = `
    <div class="col-md-6 my-2">
      <input type="text" class="form-control bg-transparent rounded-2 text-white" placeholder="Search By Name" id="searchName">
    </div>
    <div class="col-md-6 my-2">
      <input type="text" class="form-control bg-transparent rounded-2 text-white" placeholder="Search By First Letter" id="searchLetter">
    </div>

    <div class="row" id="field">
    
    </div>
  `;

  let searchName = document.getElementById("searchName");
  let searchLetter = document.getElementById("searchLetter");
  field = document.getElementById("field");

  searchLetter.addEventListener("keyup", () => {
    searchByLetter(searchLetter.value);
  });

  searchName.addEventListener("keyup", () => {
    searchByWord(searchName.value);
  });
}

// displaySearch();

//*search by first letter
async function searchByLetter(searchLetter) {
  var api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`
  );
  var result = await api.json();
  console.log(result);
  var box = "";
  for (let i = 0; i < result.meals.length; i++) {
    box += `
    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3" onclick='getDesc("${result.meals[i].strMeal}")'>
        <div class="food rounded-4">
          <div class="ottar">
            <img src="${result.meals[i].strMealThumb}" alt="food">
            <div class="innerself" style="color:#000;">
              <p>${result.meals[i].strMeal}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  field.innerHTML = box;
}

//*search by word
async function searchByWord(searchName) {
  var api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`
  );
  var result = await api.json();
  console.log(result);
  var box = "";
  for (let i = 0; i < result.meals.length; i++) {
    box += `
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3" onclick='getDesc("${result.meals[i].strMeal}")'>
        <div class="food rounded-4">
          <div class="ottar">
            <img src="${result.meals[i].strMealThumb}" alt="food">
            <div class="innerself" style="color:#000;">
              <p>${result.meals[i].strMeal}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  field.innerHTML = box;
}
//categories menu
async function getCategories() {
  var api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  var result = await api.json();
  console.log(result.categories);
  var box = "";
  for (let i = 0; i < result.categories.length; i++) {
    box += `
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3"  onclick='chooseCategory("${result.categories[i].strCategory}")'>
        <div class="food rounded-4">
          <div class="ottar">
            <img src="${result.categories[i].strCategoryThumb}" alt="food">
            <div class="innerself d-flex  align-items-center justify-content-center flex-column" style="color:#000; overflow:hidden;">
              <p >${result.categories[i].strCategory}</p>
              <p style="font-size:16px;display: -webkit-box;
              -webkit-line-clamp: 3; 
              -webkit-box-orient: vertical;
              overflow: hidden;">${result.categories[i].strCategoryDescription}</p>
              
            </div>
          </div>
        </div>
      </div>
    `;
  }
  firstPage.innerHTML = box;
}
// getCategories();

//*filter categoery

async function chooseCategory(Category) {
  var api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`
  );
  var result = await api.json();
  console.log(result);
  var box = "";
  for (let i = 0; i < result.meals.length; i++) {
    box += `
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3" onclick='getDesc("${result.meals[i].strMeal}")'>
        <div class="food rounded-4">
          <div class="ottar">
            <img src="${result.meals[i].strMealThumb}" alt="food">
            <div class="innerself" style="color:#000;">
              <p>${result.meals[i].strMeal}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  firstPage.innerHTML = box;
}
// chooseCategory("Seafood");

//contact us
//regex
let nameRegex = /[a-zA-Z]+/gm;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let phoneRegex = /^\d{10,12}$/;
let ageRexgex = /^(?!0)\d{1,2}$/;
let passwordRegex = /\w{8,}\d{1,}/;

//input
let nameVal = document.querySelector(".nameVal");
let emailVal = document.querySelector(".emailVal");
let phoneVal = document.querySelector(".phoneVal");
let ageVal = document.querySelector(".ageVal");
let password1Val = document.querySelector(".password1Val");
let password2Val = document.querySelector(".password2Val");
//alerts
let nalert = document.querySelector(".nalert"); //name
let ealert = document.querySelector(".ealert"); //email
let palert = document.querySelector(".palert"); //phone
let aalert = document.querySelector(".aalert"); //age
let p1alert = document.querySelector(".p1alert"); //pass1
let p2alert = document.querySelector(".p2alert"); //pass2
let submitBtn = document.querySelector("#submitBtn"); //pass2
let contactUs = document.querySelector(".contactUs")


//name valdition
nameVal.addEventListener("input", () => {
  nameRegex.test(nameVal.value)
    ? nalert.classList.add("d-none")
    : nalert.classList.remove("d-none");
});

emailVal.addEventListener("input", () => {
  emailRegex.test(emailVal.value)
    ? ealert.classList.add("d-none")
    : ealert.classList.remove("d-none");
});

ageVal.addEventListener("input", () => {
  ageRexgex.test(ageVal.value)
    ? aalert.classList.add("d-none")
    : aalert.classList.remove("d-none");
});

phoneVal.addEventListener("input", () => {
  phoneRegex.test(phoneVal.value)
    ? palert.classList.add("d-none")
    : palert.classList.remove("d-none");
});

password1Val.addEventListener("input", () => {
  passwordRegex.test(password1Val.value)
    ? p1alert.classList.add("d-none")
    : p1alert.classList.remove("d-none");
});

//password validation
password2Val.addEventListener("input", () => {
  password1Val.value === password2Val.value
    ? p2alert.classList.add("d-none")
    : p2alert.classList.remove("d-none");
});

$("input").on("input", function checkRegex() {
  if (
    nameRegex.test(nameVal.value) &&
    emailRegex.test(emailVal.value) &&
    phoneRegex.test(phoneVal.value) &&
    ageRexgex.test(ageVal.value) &&
    passwordRegex.test(password1Val.value) &&
    password1Val.value === password2Val.value
  ) {
    submitBtn.classList.remove("disabled");
  } else {
    submitBtn.classList.add("disabled");
  }
});
// checkRegex()
function getContacts(word){
  
firstPage.innerHTML=``
contactUs.classList.add(word)}
  // 
  // else{
  //   contactUs.classList.remove(word)
  // }

 