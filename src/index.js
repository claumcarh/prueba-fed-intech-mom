let tarjetas = document.getElementById('js-tarjetas');

/**
 * Crea todos los elementos de la lista no ordenada de usuarios
 */
function crearTarjetas(usuarios) {
  tarjetas.innerHTML = null;

  for (let index = 0; index < usuarios.length; index++) {
    const usuario = usuarios[index];

    let elTarjeta = document.createElement('li');
    elTarjeta.classList.add('tarjetas__elemento');

    let elUsuario = document.createElement('article');
    elUsuario.classList.add('tarjeta');

    let elFotoUsuario = document.createElement('img');
    elFotoUsuario.classList.add('tarjeta__img');
    elFotoUsuario.src = usuario.picture.medium;

    let elCuerpo = document.createElement('div');
    elCuerpo.classList.add('tarjeta__cuerpo');

    let elTitulo = document.createElement('p');
    elTitulo.classList.add('tarjeta__titulo');
    elTitulo.innerText = `${usuario.name.first} ${usuario.name.last}`;

    let elPestana = document.createElement('p');
    elPestana.classList.add('tarjeta__pestana');
    elPestana.innerText = usuario.gender;

    let elMedio = document.createElement('p');
    elMedio.classList.add('tarjeta__medio');

    let elInfo1 = document.createElement('span');
    elInfo1.innerText = `${usuario.location.street.number} ${usuario.location.street.name}`;

    let elInfo2 = document.createElement('span');
    elInfo2.innerText = `${usuario.location.city}, ${usuario.location.state} ${usuario.location.postcode}`;

    let elInfo3 = document.createElement('span');
    elInfo3.innerText = usuario.location.country;

    let elPie = document.createElement('a');
    elPie.classList.add('tarjeta__pie');
    elPie.href = `mailto:${usuario.email}`;
    elPie.innerText = usuario.email;

    elMedio.appendChild(elInfo1);
    elMedio.appendChild(elInfo2);
    elMedio.appendChild(elInfo3);
    elCuerpo.appendChild(elTitulo);
    elCuerpo.appendChild(elPestana);
    elCuerpo.appendChild(elMedio);
    elCuerpo.appendChild(elPie);
    elUsuario.appendChild(elFotoUsuario);
    elUsuario.appendChild(elCuerpo);
    elTarjeta.appendChild(elUsuario);
    tarjetas.appendChild(elTarjeta);
  }
}

// Obtener usuarios cuando todos los elementos y recursos estén cargados
window.addEventListener('load', async () => {
  // Solo incluir información no sensible en la lista de usuarios
  let respuesta = await fetch(
    'https://randomuser.me/api/?results=25&inc=name,gender,dob,location,email,picture',
  );

  if (respuesta.ok) {
    let usuarios = await respuesta.json();
    tarjetas.dataset.usuarios = JSON.stringify(usuarios.results);

    crearTarjetas(usuarios.results);
  }
});

let buscarBoton = document.getElementById('js-buscar-boton');

buscarBoton.addEventListener('click', () => {
  let buscarEntrada = document.getElementById('js-buscar-entrada');
  let textoBuscar = buscarEntrada.value;
  let usuarios = JSON.parse(tarjetas.dataset.usuarios);

  // Se filtra solo si la entrada tiene texto, de lo contrario se refresca la lista con todos los usuario
  if (textoBuscar !== null) {
    // Filtra los usuarios obtenidos en el API teniendo en cuenta el nombre escrito
    let usuariosFiltrados = usuarios.filter(usuario => `${usuario.name.first} ${usuario.name.last}`.includes(textoBuscar));

    if  (usuariosFiltrados.length > 0) {
      crearTarjetas(usuariosFiltrados);
    }
  } else {
    crearTarjetas(usuarios);
  }
});
