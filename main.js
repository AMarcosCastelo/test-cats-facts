'use strict'

const btnFact = document.querySelector('#btnFact');
const numberFacts = document.querySelector('#itemsFact');
let alertDanger = document.querySelector('.alertDanger');
let listFact = document.querySelector('.list-facts');

// Iniciando o evento de listener no botão 'Obter lista de fatos'
btnFact.addEventListener('click', e => {
  // preventDefault() para cancelar o efeito submit
  e.preventDefault();
  const valueFacts = numberFacts.value;
  listFact.innerHTML = '';
  alertDanger.innerHTML = '';
  insertLi(valueFacts);
});

// getFacts() Busca os fatos na API em questão e devolve os dados.
// No segundo parâmentro ela pede uma função de callback para que os 
// dados sejão tratados.
function getFacts(value, callback) {
  const url = `
    https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=${value}
  `;
  if (value === '0') {
    danger('O campo não foi preenchido corretamente.');
  } else {
    fetch(url)
      .then(data => data.json())
      .then(data => {
        let facts = [];

        if (value === '1') {
          facts.push(data.text);
        } else {
          data.map(fact => {
            facts.push(fact.text);
          })
        }

        callback(facts);
      })
      .catch(() => {
        danger(`Aconteceu algum erro inesperado. Porfavor, tente mais tarde.`);
      })
  }

}

// Função para alerts de erro.
function danger(text) {
  let div = `
    <div class="alert alert-danger" role="alert">
      ${text}
    </div>
  `;
  alertDanger.innerHTML = div;
}

// A getLi() cria uma li baseada nos fatos recebidos e adiciona o evento de 
// Refresh em cada li
function getLi(fact) {
  let li = document.createElement('li');

  li.className = 'list-group-item d-flex flex-column align-items-center';
  li.innerHTML = `
    <p class="text-center">${fact}</p>
    <button class='btn btn-success btnRefresh'>Atualizar Fato</button>
  `;
  // Adiciona o evento 
  addEventLi(li);

  return li;
}

// A insertLi() pega o value que é o número de itens que o usuário quer buscar
// e joga em getFacts() onde no qual é usado.
// Ela usa o getLi e recebe o li já formatado para ser enviado para o DOM.
function insertLi(value) {
  getFacts(value, facts => {
    facts.map(fact => {
      let li = getLi(fact);
      listFact.appendChild(li);
    });

  })
}

// addEventiLi é usado somente na getLi(). Ela serve para adicionar evento de 
// Refresh na li e trata-o de maneira a atualizar o item em questão.
function addEventLi(li) {

  li.querySelector('.btnRefresh').addEventListener('click', () => {
    // Aqui eu uso o getFact() novamente.
    getFacts('1', fact => {
      li.children[0].innerHTML = fact;
    })

  });

}

