var agendamentoBotao = document.querySelector(".agendamento__botao");
var agendamentoCard = document.querySelector(".agendamento__card");

agendamentoBotao.addEventListener("click", function() {
    agendamentoCard.classList.toggle("apagado");
});

document.addEventListener('DOMContentLoaded', function() {
    var nomeInput = document.getElementById('nome');
    var enderecoInput = document.getElementById('endereco');
    var complementoInput = document.getElementById('complemento');
    var dataInput = document.getElementById('data');
    var textArea = document.getElementById('comentario');
    var enviarBtn = document.getElementById('botao_enviar');

    const cria = document.querySelector(".elemento");

    function criarElemento(agendamento, index) {
        const elementoHTML = document.createElement('div');
        elementoHTML.classList.add('agendamento__elemento');
        elementoHTML.setAttribute('data-index', index);
        elementoHTML.innerHTML = `
            <p class="comentario_agendamento">${agendamento.endereco}</p>
            <div class="agendamento__func">
                <i class="bi bi-pencil editar" title="Editar"></i>
                <i class="bi bi-check-circle validar" title="Marcar como concluído"></i>
                <i class="bi bi-trash excluir" title="Excluir"></i>
            </div>`;

        const validar = elementoHTML.querySelector(".validar");
        if (validar) {
            validar.addEventListener('click', function() {
                marcarComoConcluido(elementoHTML);
            });
        } else {
            console.error('Elemento .validar não encontrado após a criação.');
        }

        const excluir = elementoHTML.querySelector(".excluir");
        if (excluir) {
            excluir.addEventListener('click', function() {
                excluirElemento(elementoHTML);
            });
        } else {
            console.error('Elemento .excluir não encontrado após a criação.');
        }

        const editar = elementoHTML.querySelector(".editar");
        if (editar) {
            editar.addEventListener('click', function() {
                editarElemento(elementoHTML, agendamento);
            });
        } else {
            console.error('Elemento .editar não encontrado após a criação.');
        }

        cria.appendChild(elementoHTML);
    }

   
    function marcarComoConcluido(elemento) {
        console.log('Agendamento marcado como concluído!');
        elemento.classList.toggle("concluido");
    }

    function excluirElemento(elemento) {
        const index = elemento.getAttribute('data-index');
        agendamentosSalvos.splice(index, 1);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentosSalvos));
        elemento.remove();
        alert('Agendamento excluído com sucesso!');
        atualizarIndices();
    }

    function editarElemento(elemento, agendamento) {
        const index = elemento.getAttribute('data-index');

        nomeInput.value = agendamento.nome;
        enderecoInput.value = agendamento.endereco;
        complementoInput.value = agendamento.complemento;
        dataInput.value = agendamento.data;
        textArea.value = agendamento.comentario;

        agendamentoCard.classList.remove("apagado");

        enviarBtn.removeEventListener('click', salvarNovoAgendamento);
        enviarBtn.addEventListener('click', function salvarEdicao() {
            const agendamentoEditado = {
                nome: nomeInput.value,
                endereco: enderecoInput.value,
                complemento: complementoInput.value,
                data: dataInput.value,
                comentario: textArea.value
            };

            agendamentosSalvos[index] = agendamentoEditado;
            localStorage.setItem('agendamentos', JSON.stringify(agendamentosSalvos));

            elemento.querySelector('.comentario_agendamento').innerText = agendamentoEditado.endereco;

            agendamentoCard.classList.add("apagado");
            nomeInput.value = '';
            enderecoInput.value = '';
            complementoInput.value = '';
            dataInput.value = '';
            textArea.value = '';

            enviarBtn.removeEventListener('click', salvarEdicao);
            enviarBtn.addEventListener('click', salvarNovoAgendamento);

            elemento.classList.remove("concluido");
        });
    }

    function atualizarIndices() {
        const elementos = document.querySelectorAll('.agendamento__elemento');
        elementos.forEach((el, idx) => {
            el.setAttribute('data-index', idx);
        });
    }

    const agendamentosSalvos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentosSalvos.forEach((agendamento, index) => criarElemento(agendamento, index));

    function salvarNovoAgendamento() {
        const novoAgendamento = {
            nome: nomeInput.value,
            endereco: enderecoInput.value,
            complemento: complementoInput.value,
            data: dataInput.value,
            comentario: textArea.value
        };

        agendamentosSalvos.push(novoAgendamento);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentosSalvos));

        agendamentoCard.classList.add("apagado");
        criarElemento(novoAgendamento, agendamentosSalvos.length - 1);
        alert('Agendamento feito com sucesso!');
    }

    enviarBtn.addEventListener('click', salvarNovoAgendamento);
});

