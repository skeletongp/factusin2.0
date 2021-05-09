module.exports=`
<div class="modal fade" id="modalEditar" data-backdrop="static" tabindex="-1"
aria-labelledby="exampleModalLabel" aria-modal="true">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar Producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <!--Modal-->
        <div class="modal-body">
            <!--Formulario Editar-->
            <div class="form-group">
                <form action="" method="" id="formEditar">
                    <div class="d-flex mt-2">
                        <div class="form-group m-1" style="min-width: 23.5%; max-width: 23.5%; width: 23.5%;">
                            <label for="ecodigo">Código</label>
                            <input type="text" name="ecodigo" id="ecodigo" readonly class="form-control"
                                required>
                        </div>
                        <div class="form-group m-1" style="min-width: 70%; max-width: 70%; width: 70%;">
                            <label for="nombre">Nombre del producto</label>
                            <input type="text" name="enombre" id="enombre" class="form-control"
                                required>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div class="form-group m-1"style="min-width: 46.75%; max-width: 46.75%; width: 46.75%;">
                            <label for="eprecio">Precio</label>
                            <input type="number" name="eprecio" id="eprecio" min="1"
                                class="form-control" required>
                        </div>
                        <div class="form-group m-1" style="min-width: 46.75%; max-width: 46.75%; width: 46.75%;">
                            <label for="ecosto">Costo</label>
                            <input type="number" name="ecosto" id="ecosto" min="1" class="form-control"
                                required>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div class="form-group m-1" style="min-width: 35%; max-width: 35%; width: 35%;">
                            <label for="ecategoria">Categoria</label>
                            <select name="ecategoria" id="ecategoria" class="form-control"
                                required></select>
                        </div>
                        <div class="form-group m-1" style="min-width: 35%; max-width: 35%; width: 35%;">
                            <label for="eproveedor">Proveedor</label>
                            <select name="eproveedor" id="eproveedor" class="form-control"
                                required></select>
                        </div>
                        <div class="form-group m-1" style="min-width: 22%; max-width: 22%; width: 22%;">
                            <label for="eexistencia">Existencia</label>
                            <input type="number" step="0.01" name="eexistencia" id="eexistencia" min="0"
                                class="form-control" required>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div class="form-group m-1" style="min-width: 35%; max-width: 35%; width: 35%;">
                            <label for="etipo">Tipo</label>
                            <select name="etipo" id="etipo" class="form-control" required>
                                <option value="Producto">Producto</option>
                                <option value="Servicio">Servicio</option>
                            </select>
                        </div>
                        <div class="form-group m-1" style="min-width: 58.5%; max-width: 58.5%; width: 58.5%;">
                            <label for="enota">Nota</label>
                            <input type="text" name="enota" id="enota" class="form-control" required>

                        </div>
                        <input type="hidden" name="eid" id="eid">

                    </div>
                </form>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btnCerrarEditar"
                data-dismiss="modal">Cerrar</button>
            <button type="submit" form="formEditar" class="btn btn-info"
                id="btnGuardarEditar">Guardar</button>
        </div>
    </div>
</div>
</div>
`