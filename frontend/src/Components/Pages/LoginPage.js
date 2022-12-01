import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';

  const formLogin = `
    <form class="form-horizontal" action="/action_page.php">
    <div class="form-group">
      <label class="control-label col-sm-2" for="email">Email:</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="email" placeholder="Enter email">
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="pwd">Password:</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="pwd" placeholder="Enter password">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="checkbox">
          <label><input type="checkbox"> Remember me</label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default" id="login">Submit</button>
      </div>
    </div>
  </form> `;
  

  const LoginPage = () => {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = formLogin;

    const btn = document.getElementById('login');

    btn.addEventListener('click',async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('pwd').value;

      const newData = {
        email,
        password
      }
      try {

        const options = {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        const reponse = await fetch("/api/users/login",options);
  
        if (!reponse.ok) {
          throw new Error(
            // eslint-disable-next-line no-irregular-whitespace
            `fetch error : ${  reponse.status  } : ${  reponse.statusText}`
          );
        }
        const user = await reponse.json();
      } catch (err) {
        console.error("error: ", err);
      }
    });
  };
export default LoginPage;
