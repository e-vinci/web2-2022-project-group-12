const HomePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  // Homepage Title
  const containerTitleHomepage = document.createElement("div");
  containerTitleHomepage.className = "container-fluid my-5 text-center text-danger";
  const titleHomepage= document.createElement("h1");
  titleHomepage.innerHTML = 'Vinci Store';
  containerTitleHomepage.appendChild(titleHomepage);
  main.appendChild(containerTitleHomepage);

  


};

export default HomePage;
