module.exports=`
<div class="modal fade" id="modalEditar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <form action="" method="" id="formEditar">
                            <div class="d-flex">
                                <div class="form-group m-1" style="min-width: 23.5%; max-width: 23.5%; width: 23.5%;">
                                    <label for="ecodigo">Código</label>
                                    <input type="text" name="ecodigo" id="ecodigo" readonly class="form-control" required>
                                </div>
                                <div class="form-group m-1" style="min-width: 70%; max-width: 70%; width: 70%;">
                                    <label for="enombre">Nombre del proveedor</label>
                                    <input type="text" name="enombre" id="enombre" class="form-control" required>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="form-group m-1"
                                    style="min-width: 30.75%; max-width: 30.75%; width: 30.75%;">
                                    <label for="etelefono">Teléfono</label>
                                    <input type="tel" name="etelefono" id="etelefono" placeholder="809-765-4321"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxlength="12" class="form-control"
                                        required>
                                </div>
                                <div class="form-group m-1"
                                    style="min-width: 62.75%; max-width: 62.75%; width: 62.75%;">
                                    <label for="ecorreo">Correo Electrónico</label>
                                    <input type="email" name="ecorreo" id="ecorreo" min="1" class="form-control" required>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="form-group m-1"
                                    style="min-width: 92.25%; max-width: 92.25%; width: 92.25%;">
                                    <label for="edireccion">Dirección</label>
                                    <input type="text" name="edireccion" id="edireccion" class="form-control"
                                        maxlength="45">
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="form-group m-1" style="min-width: 95%; max-width: 95%; width: 95%;">
                                    <label for="enota">Nota</label>
                                    <textarea type="text" name="enota" rows="4" id="enota" class="form-control"
                                        required></textarea>

                                </div>
                            </div>
                            <input type="hidden" id="eid" >
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" form="formEditar" id="btnCerrarInsertar"
                            class="btn btn-info">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

`