document.addEventListener('DOMContentLoaded', () => {

    const select = document.querySelector('#alimento-select');
    const inputQtd = document.querySelector('#quantidade-input');
    const lista = document.querySelector('#lista-pedido');
    const totalSpan = document.querySelector('#valor-total');
    const erroDiv = document.querySelector('#erro-div');
    const addBtn = document.querySelector('#adicionar-btn');
    const calcularBtn = document.querySelector('#calcular-total-btn'); 
    
    function atualizarTotal() {
        const itens = lista.querySelectorAll('li');
        let totalGeral = 0;
        
        for (const li of itens) {
            // Soma o valor armazenado no data-total de cada item
            totalGeral += parseFloat(li.dataset.total);
        }

        // Formata o valor final 
        totalSpan.textContent = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
    }

    /**
     * Valida a entrada do usuário, calcula o valor do item
     * e adiciona um novo elemento <li> à lista.
     */
    function adicionarItem() { 
        // Oculta erros anteriores
        erroDiv.style.display = 'none';
        
        const alimento = select.value;
        const quantidade = parseInt(inputQtd.value);

        // Validação
        if (!alimento || quantidade < 1 || quantidade > 9 || isNaN(quantidade)) {
            erroDiv.textContent = '❌ Por favor, selecione um alimento e defina a quantidade (1-9).';
            erroDiv.style.display = 'block';
            return;
        }
        
        // Obtenção de dados e cálculo
        const precoUnitario = parseFloat(select.options[select.selectedIndex].dataset.preco);
        const nomeAlimento = select.options[select.selectedIndex].textContent.split('(')[0].trim();
        const precoTotal = precoUnitario * quantidade;

        // Criação do Elemento <li>
        const novoItem = document.createElement('li');
        
        // Armazena o valor para o cálculo posterior data-attribute
        novoItem.dataset.total = precoTotal.toFixed(2); 
        
        // Conteúdo do item incluindo o botão de remove
        novoItem.innerHTML = `
            <div class="item-info">
                <span>${nomeAlimento}</span> 
                <span>
                    ${quantidade}x (R$ ${precoUnitario.toFixed(2).replace('.', ',')}) 
                    = <strong>R$ ${precoTotal.toFixed(2).replace('.', ',')}</strong>
                </span>
            </div>
            <button class="remover-btn">Remover</button>
        `;

        // Adiciona o novo item à lista
        lista.appendChild(novoItem);
        
        // Reseta os campos de entrada e o display do total
        select.selectedIndex = 0;
        inputQtd.value = 1;
        totalSpan.textContent = `R$ 0,00`; // Indica que o total precisa ser recalculado
    }

    /**
     * Lida com o clique no botão "Remover" de um item.
     * Utiliza delegação de eventos.
     * @param {Event} event - O objeto de evento de clique.
     */
    function removerItem(event) {
        if (event.target.classList.contains('remover-btn')) {
            // Encontra e remove o elemento <li> pai do botão clicado
            event.target.closest('li').remove();
            // Zera o total para forçar o clique no botão "Calcular Total"
            totalSpan.textContent = `R$ 0,00`; 
        }
    }

    // 3. Configuração de Event Listeners
    
    // Adicionar item ao clique no botão "Adicionar"
    addBtn.addEventListener('click', adicionarItem);
    
    // Delegação de evento: Lida com a remoção de itens, mesmo os adicionados dinamicamente
    lista.addEventListener('click', removerItem);

    // NOVO: Executa o cálculo total ao clique no botão "Calcular Total"
    calcularBtn.addEventListener('click', atualizarTotal);

    // Limpa a mensagem de erro quando o usuário interage com o formulário
    select.addEventListener('change', () => { erroDiv.style.display = 'none'; });
    inputQtd.addEventListener('input', () => { erroDiv.style.display = 'none'; });
});
