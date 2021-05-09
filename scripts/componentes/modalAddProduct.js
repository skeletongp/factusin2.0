module.exports=`
<div class="modal fade" id="modalInsertar" tabindex="-1" aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="font-weight:bold; font-size:xx-large; text-align:center">Agregar Producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <!--Modal-->
        <div class="modal-body">
            <!--Formulario Insertar-->
            <div class="form-group">
                <form action="" method="" id="formInsertar">
                    <div class="d-flex mt-2">
                        <div class="form-group m-1 d-table-cell"
                            style="min-width: 23.5%; max-width: 23.5%; width: 23.5%;">
                            <label for="codigo">Código</label>
                            <input type="text" name="codigo" id="codigo" readonly class="form-control"
                                required>
                        </div>
                        <div class="form-group m-1 d-table-cell" style="min-width: 70%; max-width: 70%; width: 70%;">
                            <label for="nombre">Nombre del producto</label>
                            <input type="text" name="nombre" id="nombre" class="form-control" required>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div class="form-group m-1 d-table-cell" style="min-width: 46.75%; max-width: 46.75%; width: 46.75%;">
                            <label for="precio">Precio</label>
                            <input type="number" name="precio" id="precio" min="1" class="form-control"
                                required>
                        </div>
                        <div class="form-group m-1 d-table-cell" style="min-width: 46.75%; max-width: 46.75%; width: 46.75%;">
                            <label for="costo">Costo</label>
                            <input type="number" name="costo" id="costo" min="1" class="form-control"
                                required>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div class="form-group m-1 d-table-cell" style="min-width: 35%; max-width: 35%; width: 35%;">
                            <label for="categoria">Categoría</label>
                            <a role="button" class="text-info" data-toggle="modal" data-target="#modalAddCat">
                                <span class="iconify pb-1" style="font-size:large; float:left" data-icon="fluent:add-12-filled" data-inline="false"></span>
                                </a>
                        <select name="categoria" id="categoria" class="form-control"
                                required></select></div>
                        <div class="form-group m-1" style="min-width: 35%; max-width: 35%; width: 35%;">
                            <label for="proveedor">Proveedor</label>
                            <select name="proveedor" id="proveedor" class="form-control"
                                required></select>
                        </div>
                        <div class="form-group m-1"
                            style="min-width: 21.5%; max-width: 2.15%; width: 2.15%;">
                            <label for="existencia">Existencia</label>
                            <input type="number" step="0.01" name="existencia" id="existencia" min="0"
                                class="form-control" required>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div class="form-group m-1" style="min-width: 95%; max-width: 95%; width: 95%;">
                            <label for="nota">Nota</label>
                            <textarea type="text" name="nota" rows="4"  id="nota" class="form-control"
                                required></textarea>

                        </div>
                    </div>
                </form>
            </div>
            
        <div class="modal-footer">
            <a type="button" class="" data-dismiss="modal">Cerrar</a>
            <button type="submit" form="formInsertar" id="btnCerrarInsertar"
                class="text-success btn btn-secondary">Guardar</button>
        </div>
    </div>
</div>
</div>
`