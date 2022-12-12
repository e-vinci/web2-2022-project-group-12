import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuthenticatedUser } from '../../utils/auths';

const html = `
div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <form style="margin-top:30px">   
          <div class="container mt-3">
              <h2>Store</h2>
              <div class="mb-3 mt-3">
                  <label for="name">Name your store!</label>
                  <input type="text" class="form-control" id="storename" placeholder="Enter the name of your store..." name="storename">
              </div>
              <div>
                  <h4>Adress</h4>
                  <div class="mb-3 mt-3">
                      <label for="name">Country</label>
                      <input type="text" class="form-control" id="country" placeholder="Enter the country you live in..." name="country">
                  </div>

                  <div class="mb-3 mt-3">
                      <label for="email">City</label>
                      <input type="email" class="form-control" id="city" placeholder="Enter the city you live in..." name="city">
                  </div>

                  <div class="mb-3 mt-3">
                      <label for="email">Zip Code</label>
                      <input type="email" class="form-control" id="zipcode" placeholder="Enter your postal code (Zip Code)..." name="zipcode">
                  </div>

                  <div class="mb-3 mt-3">
                      <label for="email">Street</label>
                      <input type="email" class="form-control" id="street" placeholder="Enter the street you live on..." name="street">
                  </div>

                  <div class="mb-3 mt-3">
                      <label for="email">Building code</label>
                      <input type="email" class="form-control" id="buildingdcode" placeholder="Enter your building's numeric code..." name="buildingcode">
                  </div>
              </div>
              <button type="submit" class="btn btn-primary" id="sell" >Start selling!</button>
          </div> 
        </form>
      </div>
    </div>
  </div>    
</div>
`;

const UpdateUser = () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = html;

  const btn = document.getElementById('sell');

  // Ajout de l'utilisateur aprés avoir appuyé sur le bouton submit
  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    // Récupération de toute les données avec les id
    const storeName = document.getElementById('storename').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const zipCode = document.getElementById('zipcode').checked;
    const street = document.getElementById('street').checked;
    const building = document.getElementById('buildingcode').checked;
  

    // Création d'un nouvel objet json
    const newData = {
      userID : getAuthenticatedUser.userId,
      storeName,
      country,
      city,
      zipCode,
      street,
      building
    };

    try {
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const reponse = await fetch('/api/users/becomeSeller', options);

      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      clearPage();
      const message = `
        <h1 class="cover-heading  " style="margin-top : 200px; text-align : center">
          Enregistré avec succès!
        </h1>
      `;
      main.innerHTML=message;
      /* const user = await reponse.json(); */
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('error: ', err);
    }
  });
}

export default UpdateUser;
