function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    let max = 1000000;

    const marca = document.getElementById('marca');
    if (!marca.value.trim()) {
        isValid = false;
        marca.classList.add('is-invalid');
    } else {
        marca.classList.remove('is-invalid');
    }

    const modelo = document.getElementById('modelo');
    if (!modelo.value.trim()) {
        isValid = false;
        modelo.classList.add('is-invalid');
    } else {
        modelo.classList.remove('is-invalid');
    }

    const cor = document.getElementById('cor');
    if (!cor.value.trim()) {
        isValid = false;
        cor.classList.add('is-invalid');
    } else {
        cor.classList.remove('is-invalid');
    }

    const tamanho = document.getElementById('tamanho');
    if (!tamanho.value || tamanho.value <= 0) {
        isValid = false;
        tamanho.classList.add('is-invalid');
    } else {
        tamanho.classList.remove('is-invalid');
    }

    const preco = document.getElementById('preco');
    if (!preco.value || preco.value <= 0) {
        isValid = false;
        preco.classList.add('is-invalid');
    } else {
        preco.classList.remove('is-invalid');
    }

    const estoque = document.getElementById('estoque');
    if (!estoque.value || estoque.value <= 0) {
        isValid = false;
        estoque.classList.add('is-invalid');
    } else {
        estoque.classList.remove('is-invalid');
    }

    if (isValid) {
        alert("Formulário válido! Enviando dados...");

        const id = Math.floor(Math.random() * max);
        const marca = document.getElementById('marca').value;
        const modelo = document.getElementById('modelo').value;
        const cor = document.getElementById('cor').value;
        const tamanho = document.getElementById('tamanho').value;
        const preco = document.getElementById('preco').value;
        const estoque = document.getElementById('estoque').value;

        const tenis = {
            id,
            marca,
            modelo,
            cor,
            tamanho,
            preco,
            estoque
        };

        const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

        cadastros.push(tenis);

        localStorage.setItem('cadastros', JSON.stringify(cadastros));

        window.location.href = 'cadastros.html';
    }

    else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

document.getElementById('cadastroForm').addEventListener('submit', validateForm);