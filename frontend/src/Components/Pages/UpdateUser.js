import { getAuthenticatedUser, setAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const html = `
        <form style="margin-top:30px">   
          <div class="container mt-3">
              <div>
                  <h4>Your informations</h4>
                  <div class="mb-3 mt-3">
                      <label for="name">Lastname</label>
                      <input type="text" class="form-control" id="last_name" placeholder="Enter your lastname" name="last_name">
                  </div>

                  <div class="mb-3 mt-3">
                      <label for="email">Firstname</label>
                      <input type="email" class="form-control" id="first_name" placeholder="Enter your firstname" name="first_name">
                  </div>

                  <div class ="mb-3 mt-3">
                <label for="sex">Sex</label>
                </br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="homme" value="option1">
                        <label class="form-check-label" for="inlineCheckbox1">M</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="femme" value="option2">
                        <label class="form-check-label" for="inlineCheckbox2">F</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="autre" value="option3" >
                        <label class="form-check-label" for="inlineCheckbox3">Don't specify</label>
                    </div>

                </div>
              </div>
              <button type="submit" class="btn btn-primary" id="sell" >Start selling!</button>
          </div> 
        </form>
`;

const UpdateUser = () => {
  clearPage();
  const user = getAuthenticatedUser();
  const { email } = user;
  console.log(email);
  if (user === undefined) {
    Navigate('login');
  }
  const main = document.querySelector('main');
  main.innerHTML = html;

  const btn = document.getElementById('sell');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('last_name').value;
    const lastName = document.getElementById('first_name').value;
    const homme = document.getElementById('homme').checked;
    const femme = document.getElementById('femme').checked;
    const autre = document.getElementById('autre').checked;
    let sex;

    if (homme === true) {
      sex = 'M';
    }
    if (femme === true) {
      sex = 'F';
    }
    if (autre === true) {
      sex = 'A';
    }

    const newData = {
      email,
      firstName,
      lastName,
      sex,
    };

    try {
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      console.log('logloglog');
      const reponse = await fetch('/api/users/updateUser', options);
      console.log('logfgfdgfdgdgloglog: ', reponse);
      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      const newUser = {
        id: user.userId,
        email,
        firstName,
        lastName,
        sex,
      }
      if (firstName !== undefined) {
        newUser.firstName = firstName
      }
      if (lastName !== undefined) {
        newUser.lastName = lastName
      }
      if (sex !== undefined) {
        newUser.sex = sex;
      }
      setAuthenticatedUser(newUser);
      console.log("Userdsdsd: ", user);
      alert('Update reussi');
      Navigate('/user');
      /* const user = await reponse.json(); */
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
  });
};

export default UpdateUser;
