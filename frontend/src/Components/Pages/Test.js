import { clearPage } from "../../utils/render";
import 'bootstrap/dist/css/bootstrap.min.css';

const TestPage = () =>{
    clearPage();
    const main = document.querySelector('main');
    const test = `
    <div class="container mt-3">
    <h2>Table Test User</h2>
    
    <table class="table">
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>john@example.com</td>
        </tr>
        <tr>
          <td>Mary</td>
          <td>Moe</td>
          <td>mary@example.com</td>
        </tr>
        <tr>
          <td>July</td>
          <td>Dooley</td>
          <td>july@example.com</td>
        </tr>
      </tbody>
    </table>
  </div>`
    main.innerHTML = test;

}
export default TestPage;