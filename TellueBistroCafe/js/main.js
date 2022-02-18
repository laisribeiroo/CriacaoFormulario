import dataset from './model/dataset.js';
import foods from './model/foods.js';

function loadFoods() {
  if (localStorage.getItem('foods-app:loaded') !== 'ok') {
    foods.load(dataset);
    localStorage.setItem('foods-app:loaded', 'ok');
  }

  for (const food of foods.readAll()) {
    createFoodView(food);
  }
}

function createFoodView(food) {
  const foodsView = 

    `<div class="col-md-3 col-sm-12 my-2" id="food-${food.id}">
            
            <div class="card">
              <div class="card-header font-weight-bold">
                <span class="food-name">
                <big>${food.name}</big>
                </span>
                <span class="food-actions float-right">
                  ${createFoodActions(food)}
                </span>
              </div>
              <div class="card-body p-0">
                <img src="${food.image}" alt="${food.nome}" class="food-image w-100">
              </div>
              <div class="card-header text-monospace text-justify">
              <small>${food.descri}</small>
              </div> 
                <center><a href="preco.html" class="btn btn-danger w-100"><h5>${food.preco}</h5></a></center>
              </div>
            </div>
   
    </div>`;

  const foodsDeck = document.querySelector('.card-deck');

  foodsDeck.insertAdjacentHTML('beforeend', foodsView);
}
function funcao1(){
  alert("Minhas desculpas :D !!.")
}

function createFoodActions(food) {
  return `
        <i
          class="far fa-trash-alt"
          onclick="loadFormDeleteFood(${food.id}, '${food.name}')"
          data-toggle="modal"
          data-target="#deleteFoodModal">
        </i>
        <i
          class="fas fa-pencil-alt"
          onclick="loadFormUpdateFood(${food.id}, '${food.name}', '${food.image}', '${food.descri}', '${food.preco}')"
          data-toggle="modal"
          data-target="#formFoodModal">
        </i>
      `;
}

function loadFormValues(title, foodName, foodImage, foodDescri, foodPreco) {
  const formLabel = document.querySelector('#formFoodLabel');
  const foodNameInput = document.querySelector('#food-name');
  const foodImageInput = document.querySelector('#food-image');
  const foodDescriInput = document.querySelector('#food-descri');
  const foodPrecoInput = document.querySelector('#food-preco');



  formLabel.innerHTML = title;
  foodNameInput.value = foodName;
  foodImageInput.value = foodImage;
  foodDescriInput.value = foodDescri;
  foodPrecoInput.value = foodPreco;


}

function loadFormCreateFood() {
  const formFood = document.querySelector('#formFood');

  loadFormValues('Novo prato', '', '');

  formFood.onsubmit = (e) => {
    e.preventDefault();

    let food = Object.fromEntries(new FormData(formFood));

    const newFood = foods.create(food);

    createFoodView(newFood);

    $('#formFoodModal').modal('toggle');

    document.querySelector('#newBtnFood').blur();
  };
}

function loadFormUpdateFood(id, name, image, descri, preco) {
  const formFood = document.querySelector('#formFood');

  loadFormValues('Atualizar Comida', name, image, descri, preco);

  formFood.onsubmit = (e) => {
    e.preventDefault();

    const food = Object.fromEntries(new FormData(formFood));

    foods.update(id, food);

    updateFoodView({ id, ...food });

    $('#formFoodModal').modal('toggle');
  };
}

function updateFoodView(food) {
  const foodName = document.querySelector(`#food-${food.id} .food-name`);
  const foodImage = document.querySelector(`#food-${food.id} .food-image`);
  const foodDescri = document.querySelector(`#food-${food.id} .food-descri`);
  const foodPreco = document.querySelector(`#food-${food.id} .food-preco`);
  const foodActions = document.querySelector(`#food-${food.id} .food-actions`);

  foodName.innerText = food.name;
  foodImage.src = food.image;
  foodDescri.innerText = food.descri;
  foodPreco.innerText = food.preco;
  foodActions.innerHTML = createFoodActions(food);
}

function loadFormDeleteFood(foodId, foodName) {
  document.querySelector('#modal-name-food').innerHTML = foodName;

  document.querySelector('#deleteFoodBtn').onclick = (e) => {
    e.preventDefault();

    foods.destroy(foodId);

    document.querySelector(`#food-${foodId}`).remove();

    $('#deleteFoodModal').modal('toggle');
  };
}

window.loadFormCreateFood = loadFormCreateFood;
window.loadFormUpdateFood = loadFormUpdateFood;
window.loadFormDeleteFood = loadFormDeleteFood;

loadFoods();
