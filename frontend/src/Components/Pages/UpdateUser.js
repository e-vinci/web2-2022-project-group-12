
import { clearPage } from '../../utils/render';

const html = `<h1>yo</hi>`;

const UpdateUser = () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = html;
};

export default UpdateUser;
