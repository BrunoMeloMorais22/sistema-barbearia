const API_URL = "http://localhost:3000";

const horariosDiv = document.getElementById("horarios");
const form = document.getElementById("form");

let horarioSelecionado = null;


async function carregarHorarios() {
  const data = document.getElementById("data").value;

  if (!data) return;

  const res = await fetch(`${API_URL}/horarios?data=${data}`);
  const horarios = await res.json();

  horariosDiv.innerHTML = "";

  horarios.forEach(horario => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerText = horario;

    btn.onclick = () => selecionarHorario(horario, btn);

    horariosDiv.appendChild(btn);
  });
}


function selecionarHorario(horario, elemento) {
  horarioSelecionado = horario;

  document.querySelectorAll("#horarios button")
    .forEach(btn => btn.style.background = "");

  elemento.style.background = "lightgreen";
}


document.getElementById("data").addEventListener("change", carregarHorarios);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;

  if (!horarioSelecionado) {
    alert("Selecione um horário!");
    return;
  }

  const res = await fetch(`${API_URL}/agendar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome,
      telefone,
      servico,
      data,
      horario: horarioSelecionado
    })
  });

  const result = await res.json();

  if (result.erro) {
    alert(result.erro);
  } else {
    alert(result.sucesso);

    form.reset();
    horariosDiv.innerHTML = "";
    horarioSelecionado = null;
  }
});