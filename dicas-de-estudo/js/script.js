const frases = [
 "Bora estudar para ter futuro",
 "Organize seu local de estudo",
 "Desligue as notificações do celular",
 "Revise suas aotações no dia seguinte",
 "Sempre mantenha o foco, e a persistência",
 
];

const botao = document.querySelector(`#botao`);
const frase = document.querySelector(`#frase`);

botao.addEventListener(`click`, function(e) {
    e.preventDefault();
    const fraseMotivacao = Math.floor(Math.random() * frases.length);
    frase.textContent = frases[fraseMotivacao];
});