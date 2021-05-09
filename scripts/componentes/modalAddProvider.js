module.exports=`
<div class="modal fade" id="modalInsertar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Registrar Proveedor</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!--Modal-->
                <div class="modal-body">
                    <!--Formulario Insertar-->
                    <div class="form-group">
                        <form action="" method="" id="formInsertar">
                            <div class="d-flex">
                                <div class="form-group m-1" style="min-width: 23.5%; max-width: 23.5%; width: 23.5%;">
                                    <label for="codigo">Código</label>
                                    <input type="text" name="codigo" id="codigo" readonly class="form-control" required>
                                </div>
                                <div class="form-group m-1" style="min-width: 70%; max-width: 70%; width: 70%;">
                                    <label for="nombre">Nombre del proveedor</label>
                                    <input type="text" name="nombre" id="nombre" class="form-control" required>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="form-group m-1"
                                    style="min-width: 30.75%; max-width: 30.75%; width: 30.75%;">
                                    <label for="telefono">Teléfono</label>
                                    <input type="tel" name="telefono" id="telefono" placeholder="809-765-4321"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxlength="12" class="form-control"
                                        required>
                                </div>
                                <div class="form-group m-1"
                                    style="min-width: 62.75%; max-width: 62.75%; width: 62.75%;">
                                    <label for="correo">Correo Electrónico</label>
                                    <input type="email" name="correo" id="correo" min="1" class="form-control" required>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="form-group m-1"
                                    style="min-width: 30.75%; max-width: 30.75%; width: 30.75%;">
                                    <label for="fecha">Fecha de registro</label>
                                    <input type="date" name="fecha" id="fecha" class="form-control">
                                </div>
                                <div class="form-group m-1"
                                    style="min-width: 62.25%; max-width: 62.25%; width: 62.25%;">
                                    <label for="categoria">Dirección</label>
                                    <input type="text" name="direccion" id="direccion" class="form-control"
                                        maxlength="45">
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="form-group m-1" style="min-width: 95%; max-width: 95%; width: 95%;">
                                    <label for="nota">Nota</label>
                                    <textarea type="text" name="nota" rows="4" id="nota" class="form-control"
                                        required></textarea>

                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" form="formInsertar" id="btnCerrarInsertar"
                            class="btn btn-info">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `