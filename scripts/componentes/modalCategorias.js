module.exports = `
<button type="button" id="btnModalCat" class="btn btn-primary" style="display:none" data-toggle="modal" data-target="#modalCategorie">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="modalCategorie" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"  style="max-height: 2rem;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="font-weight:bold; font-size:x-large">Categorías</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="bodyCategoria">
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-info ml-2" data-toggle="modal" data-target="#modalAddCat">Nueva Categoría</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="modalAddCat" tabindex="-1" aria-labelledby="modalAddCatLabel" aria-hidden="true">
<div class="modal-dialog" style="max-width: 30rem;">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="modalAddCatLabel">Nueva categoría</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">

            <form id="formAddCat" name="formAddCat">
                <div class="form-group">
                    <label for="ncategoria">Nombre de la categoría</label>
                    <input type="text" class="form-control" name="ncategoria" id="ncategoria" required>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-secondary text-success font-weight-bold"
                form="formAddCat">Guardar</button>
        </div>
    </div>
</div>
</div>
`;
