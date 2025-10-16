const API_URL = 'http://localhost:8000/carro';
const vista = document.getElementById('vista');

// Botones del menú
document.getElementById('btn-ver').addEventListener('click', mostrarCarros);
document.getElementById('btn-crear').addEventListener('click', mostrarFormularioCrear);
document.getElementById('btn-actualizar').addEventListener('click', mostrarFormularioActualizar);
document.getElementById('btn-eliminar').addEventListener('click', mostrarFormularioEliminar);

// ========== OBTENER CARROS ==========
async function mostrarCarros() {
  vista.innerHTML = "<h2> Lista de Carros</h2>";
  try {
    const res = await fetch(API_URL);
    if (res.status === 204) {
      vista.innerHTML += "<p>No hay libros en la base de datos.</p>";
      return;
    }
    const libros = await res.json();
    vista.innerHTML += libros.map(libro => `
      <div class="libro">
        <strong>${libro.titulo}</strong> - ${libro.autor} (${libro.aniodepublicacion})<br>
        Género: ${libro.genero}, Idioma: ${libro.idioma} <br>
        <small>ID: ${libro._id}</small>
      </div>
    `).join('');
  } catch (err) {
    vista.innerHTML += `<p>Error: ${err.message}</p>`;
  }
}

// ========== CREAR CARROS ==========
function mostrarFormularioCrear() {
  vista.innerHTML = `
    <h2>➕ Crear Carro</h2>
    <form id="form-crear">
      <input type="text" name="marca" placeholder="marca de carro" required />
      <input type="text" name="tipo" placeholder="tipo de carro" required />
      <input type="text" name="modelo" placeholder="modelo de carro" required />
      <input type="text" name="referencia" placeholder="referencia del carro" required />
      <input type="number" name="precio" placeholder="precio del carro" required />
      <input type="number" name="stock" placeholder="stock" required />
      <button type="submit">Guardar</button>
    </form>
  `;

  document.getElementById('form-crear').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.aniodepublicacion = parseInt(data.aniodepublicacion);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Error al crear Carro');
      alert('Carro creado correctamente');
      mostrarCarros();
    } catch (err) {
      alert(err.message);
    }
  });
}

// ========== ACTUALIZAR Carro ==========
function mostrarFormularioActualizar() {
  vista.innerHTML = `
    <h2>✏️ Actualizar Libro</h2>
    <form id="form-actualizar">
      <input type="text" name="id" placeholder="ID del carro a actualizar" required />
      <input type="text" name="marca" placeholder="Nueva marca de carro" />
      <input type="text" name="tipo" placeholder="Nuevo tipo de carror" />
      <input type="text" name="modelo" placeholder="Nuevo modelo de carro" />
      <input type="texto" name="referencia" placeholder="Nueva referencia del carro" />
      <input type="number" name="precio" placeholder="Nuevo precio" />
      <input type="number" name="stock" placeholder="Nueva cantidad en stock" />
      <button type="submit">Actualizar</button>
    </form>
  `;

  document.getElementById('form-actualizar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const { id, ...campos } = data;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campos)
      });
      if (!res.ok) throw new Error('Error al actualizar Carro');
      alert('Carro actualizado correctamente');
      mostrarCarros();
    } catch (err) {
      alert(err.message);
    }
  });
}

// ========== ELIMINAR CARROS ==========
function mostrarFormularioEliminar() {
  vista.innerHTML = `
    <h2>🗑️ Eliminar Carro</h2>
    <form id="form-eliminar">
      <input type="text" name="id" placeholder="ID del carro a eliminar" required />
      <button type="submit" style="background-color: red;">Eliminar</button>
    </form>
  `;

  document.getElementById('form-eliminar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    if (!confirm('¿Seguro que deseas eliminar este carro?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar carro');
      alert('Carro eliminado correctamente');
      mostrarCarros();
    } catch (err) {
      alert(err.message);
    }
  });
}

// Mostrar carro por defecto al cargar
mostrarCarros();