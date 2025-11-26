const selecaoPersona = document.querySelector('#personagens');
const btnVotar = document.querySelector('#btnVotar');
const rankingLista = document.querySelector('#lista-ranking');
const msgErro = document.querySelector('#erro');

const votos = {
    Rodrygo: 0,
    Vinicius: 0,
    Neymar: 0,
    Estevao: 0,
}

function atualizarRanking(){
    rankingLista.innerHTML = "";
    const rankingOrganizado = Object.entries(votos).sort((a, b) => b[1] - a[1]);
    const maiorVoto = rankingOrganizado[0][1];

    rankingOrganizado.forEach(personagem => {
        const li = document.createElement('li');
        li.textContent = `${personagem[0]} - ${personagem[1]} voto(s).`;

        if(personagem[1] === maiorVoto && maiorVoto !== 0){
            li.classList.add('lider');
        }

        rankingLista.appendChild(li);
    });
}

function votar(e){

    e.preventDefault();
    const escolhido = selecaoPersona.value;

    if (escolhido === ""){
        msgErro.innerText = "Por favor, selecione um personagem antes de votar.";
        return;
    }

    msgErro.textContent = "";
    votos[escolhido]++;
    atualizarRanking();
}
btnVotar.addEventListener('click', votar);
atualizarRanking();