let filtros = {};

function adicionarFiltro(campo) {
    if (filtros[campo]) {
        delete filtros[campo];
    } else {
        filtros[campo] = true;
    }

    aplicarFiltros();
}


function aplicarFiltros() {
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    const listaCadastros = document.getElementById('lista-cadastros');

    let listaFiltrada = [...cadastros];

    Object.keys(filtros).forEach(campo => {
        listaFiltrada.sort((a, b) => {
            if (campo === 'preco' || campo === 'estoque') {
                return parseFloat(a[campo]) - parseFloat(b[campo]);
            }

            return a[campo].toString().localeCompare(b[campo].toString());
        });
    });

    listaCadastros.innerHTML = '';
    listaFiltrada.forEach(tenis => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tenis.marca}</td>
            <td>${tenis.modelo}</td>
            <td>${tenis.cor}</td>
            <td>${tenis.tamanho}</td>
            <td>R$ ${parseFloat(tenis.preco).toFixed(2)}</td>
            <td>${tenis.estoque}</td>
            <td>
                <button onClick="editarCadastro(${tenis.id})">
                    <i class="fa-solid fa-pen-to-square" ></i>
                </button>
                <button onClick="deletarCadastro(${tenis.id})">
                    <i class="fa-solid fa-trash" ></i>
                </button>
            </td>
        `;
        listaCadastros.appendChild(row);
    });
}


function carregarCadastros() {
    aplicarFiltros();
}


function editarCadastro(id) {
    const cadastros = JSON.parse(localStorage.getItem('cadastros'));

    const cadastro = cadastros.find(tenis => tenis.id === id);

    document.getElementById('editar-marca').value = cadastro.marca || '';
    document.getElementById('editar-modelo').value = cadastro.modelo || '';
    document.getElementById('editar-cor').value = cadastro.cor || '';
    document.getElementById('editar-tamanho').value = cadastro.tamanho || '';
    document.getElementById('editar-preco').value = cadastro.preco || '';
    document.getElementById('editar-estoque').value = cadastro.estoque || '';

    document.getElementById('modal-editar').setAttribute('editando', id);

    const modal = new bootstrap.Modal(document.getElementById('modal-editar'));
    modal.show();
}


function salvarEdicao() {
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    const id = parseInt(document.getElementById('modal-editar').getAttribute('editando'));

    const index = cadastros.findIndex(tenis => tenis.id === id);

    if (id !== -1) {
        cadastros[index] = {
            id: id,
            marca: document.getElementById('editar-marca').value,
            modelo: document.getElementById('editar-modelo').value,
            cor: document.getElementById('editar-cor').value,
            tamanho: document.getElementById('editar-tamanho').value,
            preco: parseFloat(document.getElementById('editar-preco').value),
            estoque: parseInt(document.getElementById('editar-estoque').value, 10),
        };

        localStorage.setItem('cadastros', JSON.stringify(cadastros));

        carregarCadastros();

        const modal = bootstrap.Modal.getInstance(document.getElementById('modal-editar'));
        modal.hide();
    }
}


function deletarCadastro(id) {
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    const cadastrosAtualizados = cadastros.filter(tenis => tenis && tenis.id !== id);

    localStorage.setItem('cadastros', JSON.stringify(cadastrosAtualizados));

    carregarCadastros();
}



function pesquisar(event) {
    event.preventDefault();

    const query = document.getElementById('barra-pesquisa').value.toLowerCase();
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    const listaFiltrada = cadastros.filter(tenis => 
        tenis.marca.toLowerCase().includes(query) ||
        tenis.modelo.toLowerCase().includes(query) ||
        tenis.cor.toLowerCase().includes(query) ||
        tenis.tamanho.toLowerCase().includes(query) ||
        tenis.preco.toString().includes(query) ||
        tenis.estoque.toString().includes(query)
    );

    const listaCadastros = document.getElementById('lista-cadastros');
    listaCadastros.innerHTML = '';

    listaFiltrada.forEach(tenis => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${tenis.marca}</td>
            <td>${tenis.modelo}</td>
            <td>${tenis.cor}</td>
            <td>${tenis.tamanho}</td>
            <td>R$ ${parseFloat(tenis.preco).toFixed(2)}</td>
            <td>${tenis.estoque}</td>
            <td>
                <button onClick="editarCadastro()">
                    <i class="fa-solid fa-pen-to-square" ></i>
                </button>
                <button onClick="deletarCadastro()">
                    <i class="fa-solid fa-trash" ></i>
                </button>
            </td>
        `;

        listaCadastros.appendChild(row);
    });
}

window.onload = carregarCadastros;