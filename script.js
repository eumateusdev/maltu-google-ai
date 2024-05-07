const comentariosDiv = document.getElementById('comentarios');

fetch('coments-formatado.json')
  .then(response => response.json())
  .then(comentarios => {
    comentarios.forEach(comentario => {
      const comentarioDiv = document.createElement('div');
      comentarioDiv.classList.add('comentario');

      comentarioDiv.innerHTML = `
        <p>Comentário: ${comentario.Comentário}</p>
        <p>Tipo: ${comentario.Tipo}</p>
        <p>Critério de Usabilidade: ${comentario.Usabilidade}</p>
        <p>Critério de UX: ${comentario.UX}</p>
      `; 

      comentariosDiv.appendChild(comentarioDiv);
    });
  })
  .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));


function contarItens(dados, chave) {
  return dados.reduce((acumulador, item) => {
    const valor = item[chave];
    acumulador[valor] = (acumulador[valor] || 0) + 1;
    return acumulador;
  }, {});
}

function criarGrafico(elementoCanvas, labels, dados) {
  new Chart(elementoCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Quantidade',
        data: dados,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

fetch('coments-formatado.json')
  .then(response => response.json())
  .then(comentarios => {
    const contagemTipo = contarItens(comentarios, 'Tipo');
    const contagemUsabilidade = contarItens(comentarios, 'Usabilidade');
    const contagemUX = contarItens(comentarios, 'UX');

    criarGrafico(
      document.getElementById('graficoTipo'), 
      Object.keys(contagemTipo), 
      Object.values(contagemTipo)
    );
    criarGrafico(
      document.getElementById('graficoUsabilidade'), 
      Object.keys(contagemUsabilidade), 
      Object.values(contagemUsabilidade)
    );
    criarGrafico(
      document.getElementById('graficoUX'), 
      Object.keys(contagemUX), 
      Object.values(contagemUX)
    );
  })
  .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));


  function alternarVisibilidade(elementoId, botaoId) {
    const elemento = document.getElementById(elementoId);
    const botao = document.getElementById(botaoId);
    
    elemento.classList.toggle('oculto'); 

    if (elemento.style.display === 'none') {
      elemento.style.display = 'flex';   
      elemento.style.flexDirection = 'column'; 
      elemento.style.gap = '20px';    
      botao.textContent = '▼'; 
    } else {
      elemento.style.display = 'none';
      botao.textContent = '▶'; 
    }
  }
  
  document.getElementById('btnAlternarGraficos').addEventListener('click', () => {
    alternarVisibilidade('graficos', 'btnAlternarGraficos');
  });
  
  document.getElementById('btnAlternarComentarios').addEventListener('click', () => {
    alternarVisibilidade('comentarios', 'btnAlternarComentarios');
  });