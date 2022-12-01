import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../img/produit1.png';
// import img2 from '../../img/produit2.png';

// HTML CODE

const html = `
<div class="text-center">
  <h1 class="display-1"> Vinci Store </h1>
</div>
<div class = "carousselContainer ">
  <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="carousel-buttons">

  </div>
  <div class="carousel-inner" id = "carousel-items">

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>`;

const HomePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = html;

  // Homepage Title
  const carrouselListItem = document.getElementById('carousel-items');
  let i = 0;
  let items = ``;
  while (i < 10) {
    if (i === 0) {
      items += `<div class="carousel-item active" data-bs-interval="10000">
    <img src="${img}" id="item-${i}" class="d-block w-100" alt="img">
   </div>`;
    } else {
      items += `<div class="carousel-item" data-bs-interval="10000">
    <img src="${img}" class="d-block w-100" alt="img">
   </div>`;
    }

    i += 1;
  }
  carrouselListItem.innerHTML = items;

  i = 0;
  items = ``;
  const carouselButtons = document.getElementById('carousel-buttons');
  while (i < 10) {
    if (i === 0) {
      items += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i +
        1}"></button>
      `;
    } else {
      items += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" aria-label="Slide ${i +
        1}"></button>`;
    }

    i += 1;
  }
  carouselButtons.innerHTML = items;

  // Création d'un caroussel
};

export default HomePage;
