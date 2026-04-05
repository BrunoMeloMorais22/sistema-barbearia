const API_URL = "http://localhost:3000";

async function carregarAgendamentos() {
  const data = document.getElementById("data").value;

  if (!data) {
    alert("Selecione uma data!");
    return;
  }

  const res = await fetch(`${API_URL}/agendamentos?data=${data}`);
  const dados = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  if (dados.length === 0) {
    lista.innerHTML = "<p>Nenhum agendamento</p>";
    return;
  }

  dados.forEach(item => {
    const div = document.createElement("div");

    div.innerHTML = `
      <hr>
      <p><strong>Nome:</strong> ${item.nome}</p>
      <p><strong>Telefone:</strong> ${item.telefone}</p>
      <p><strong>Serviço:</strong> ${item.servico}</p>
      <p><strong>Horário:</strong> ${item.horario}</p>
    `;

    lista.appendChild(div);
  });
}