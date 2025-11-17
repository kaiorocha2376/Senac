const form = document.getElementById('metaForm');
const lista = document.getElementById('lista-metas');
const erro = document.querySelector('.erro');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const prioridade = document.getElementById('prioridade').value;
  const data = document.getElementById('data').value;
  erro.textContent = '';

  if (!titulo) {
    erro.textContent = "Digite um título válido";
    return;
  }
  if (!descricao) {
    erro.textContent = "Digite uma descrição válida";
    return;
  }
  if (!prioridade) {
    erro.textContent = "Selecione uma prioridade válida";
    return;
  }
  if (!data) {
    erro.textContent = "Selecione uma data válida";
    return;
  }
  const hoje = new Date().setHours(0,0,0,0);
  const dataMeta = new Date(data).setHours(0,0,0,0);
  if (dataMeta < hoje) {
    erro.textContent = "A data não pode ser anterior ao dia atual";
    return;
  }
  const li = document.createElement('li');
  li.classList.add(prioridade);
  li.innerHTML = `
    <strong>${titulo}</strong> - ${descricao} - ${data}
    <button class="concluir">Concluir</button>
    <button class="remover">Remover</button>
  `;
  li.querySelector('.concluir').addEventListener('click', () => {
    if(li.classList.contains('concluida')) {
      li.classList.remove('concluida');
      li.querySelector('.concluir').textContent = 'Concluir';
    } else {
      li.classList.add('concluida');
      li.querySelector('.concluir').textContent = 'Desfazer';
    }
  });
  li.querySelector('.remover').addEventListener('click', () => {
    lista.removeChild(li);
  });
  lista.appendChild(li);
  form.reset();
});

