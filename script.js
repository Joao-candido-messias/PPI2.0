var agendamentoBotao = document.querySelector(".agendamento__botao");
var agendamentoCard = document.querySelector(".agendamento__card");

document.addEventListener('DOMContentLoaded', function() {
    var nomeInput = document.getElementById('nome');
    var enderecoInput = document.getElementById('endereco');
    var complementoInput = document.getElementById('complemento');
    var dataInput = document.getElementById('data');
    var lixoCheckbox = document.getElementById('lixo');
    var pilhasCheckbox = document.getElementById('pilhas');
    var lampadasCheckbox = document.getElementById('lampadas');
    var enviarBtn = document.getElementById('botao_enviar');

   
    nomeInput.value = localStorage.getItem('nome') || '';
    enderecoInput.value = localStorage.getItem('endereco') || '';
    complementoInput.value = localStorage.getItem('complemento') || '';
    dataInput.value = localStorage.getItem('data') || '';
    lixoCheckbox.checked = localStorage.getItem('lixo') === 'true';
    pilhasCheckbox.checked = localStorage.getItem('pilhas') === 'true';
    lampadasCheckbox.checked = localStorage.getItem('lampadas') === 'true';

    
    enviarBtn.addEventListener('click', function() {
        
        localStorage.setItem('nome', nomeInput.value);
        localStorage.setItem('endereco', enderecoInput.value);
        localStorage.setItem('complemento', complementoInput.value);
        localStorage.setItem('data', dataInput.value);
        localStorage.setItem('lixo', lixoCheckbox.checked);
        localStorage.setItem('pilhas', pilhasCheckbox.checked);
        localStorage.setItem('lampadas', lampadasCheckbox.checked);
        agendamentoCard.classList.add("apagado");
        alert('Agedamento feito com sucesso!');
    });
});


agendamentoBotao.addEventListener("click", function(){
    agendamentoCard.classList.toggle("apagado")
})

