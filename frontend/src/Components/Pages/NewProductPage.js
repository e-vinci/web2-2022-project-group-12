import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewProductPage = () =>{
    
    clearPage();
    const main = document.querySelector('main');

    const formNewProduct = `  
    <div class="container">
    <section class="panel panel-default">
    
        <div class="panel-heading"> 
            <h3 class="panel-title">Add new product</h3> 
        </div> 

        <div class="panel-body">

        <form action="designer-finish.html" class="form-horizontal" role="form">

        </div> <!-- form-group // -->
        <div class="form-group">
            <label for="name" class="col-sm-3 control-label">Product name</label>
            <div class="col-sm-9">
            <input type="text" class="form-control" name="name" id="name" >
        </div>
        </div> <!-- form-group // -->

        <div class="form-group">
            <label for="about" class="col-sm-3 control-label">Description</label>
            <div class="col-sm-9">
            <textarea class="form-control"></textarea>
            </div>
        </div> <!-- form-group // -->

        <div class="form-group">
            <label for="qty" class="col-sm-3 control-label">Quantity</label>
            <div class="col-sm-3">
        <input type="text" class="form-control" name="quantity" id="qty" >
            </div>
        </div> <!-- form-group // -->

        <div class="form-group">
        <label for="price" class="col-sm-3 control-label">Price</label>
            <div class="col-sm-3">
        <input type="number" min="0.00" max="10000.00" step="0.1" class="form-control" name="price" id="price" />
        </div>
        </div> <!-- form-group // -->
        
        <div class="form-group">
            <div class="col-sm-3">
            <label class="control-label small" for="file_img">Add image(jpg/png):</label> <input type="file" name="file_img">
            </div>
        </div> <!-- form-group // -->

        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Different colors?</label>
        </div>

        <div class="form-group">
            <label for="tech" class="col-sm-3 control-label">Colour</label>
            <div class="col-sm-3">
        <select class="form-control">
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="orange">Orange</option>
            <option value="pink">Pink</option>
        </select>
            </div>
        </div> <!-- form-group // -->

        <hr>
        <div class="form-group">
            <div class="col-sm-offset-3 col-sm-9">
            <button type="submit" class="btn btn-primary">Add</button>
            </div>
        </div> <!-- form-group // -->
        </form>

        </div><!-- panel-body // -->
    </section><!-- panel// -->

    </div>
    `;

    main.innerHTML = formNewProduct;
}

export default NewProductPage;