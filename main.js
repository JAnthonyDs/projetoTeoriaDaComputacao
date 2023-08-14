const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
var select = document.getElementById("semaforoInicial");

var place = document.getElementById("place");

var comecar = document.getElementById("comecar");

//Guardar o estado dos semaforos
let pSemaforo = "";
let sSemaforo = "";

let pSemaforoAtv = false;
let sSemaforoAtv = false;

function desenhaPistas() {
  //ctx.clearRect(0,0,canvas.width,canvas.height)

  //Pista horizontal
  ctx.fillStyle = "white";

  ctx.fillRect(400, 0, 15, 1000);
  ctx.fillRect(470, 0, 15, 1000);

  ctx.fillRect(0, 400, 1000, 15);
  ctx.fillRect(0, 470, 1000, 15);

  ctx.clearRect(400, 415, 15, 55);
  ctx.clearRect(470, 415, 15, 55);

  ctx.clearRect(415, 400, 55, 55);
  ctx.clearRect(415, 430, 55, 55);
}

function primeiroSemaforo(color) {
  ctx.fillStyle = color;

  //semaforo pista vertical
  ctx.fillRect(378, 420, 10, 10);
}

function segundoSemaforo(color) {
  ctx.fillStyle = color;

  //semaforo pista horizontal
  ctx.fillRect(420, 375, 10, 10);
}

function colocarPrimeiroCarrinho(x, y) {
  ctx.fillStyle = "white";

  ctx.fillRect(x, y, 20, 20);
}

function colocarSegundoCarrinho(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, 20, 20);
}

function movePrimeiro(x) {
  px = x;
  p = setInterval(() => {
    ctx.clearRect(px - 15, 430, 20, 20);

    ctx.fillStyle = "white";
    ctx.fillRect(px, 430, 20, 20);

    if (px > 500) {
      pSemaforoAtv = true;

      if (!sSemaforoAtv) {
        segundoSemaforo("green");
        primeiroSemaforo("red");
        moveSegundo(337);
      }
      clearInterval(p);
    }

    px += 15;
  }, 100);
}

function moveSegundo(y) {
  py = y;
  m = setInterval(() => {
    ctx.clearRect(430, py - 15, 20, 20);
    ctx.fillStyle = "white";
    ctx.fillRect(430, py, 20, 20);

    if (py > 530) {
      sSemaforoAtv = true;
      if (!pSemaforoAtv) {
        primeiroSemaforo("green");
        segundoSemaforo("red");
        movePrimeiro(340);
      }
      clearInterval(m);
    }

    py += 15;
  }, 100);
}

function iniciar() {
  if (pSemaforo == "green") {
    //primeiro carrinho anda
    console.log("SIM");
    movePrimeiro(350);
  } else {
    moveSegundo(337);
  }
}

function redraw() {}

place.addEventListener("click", () => {
  colocarPrimeiroCarrinho(340, 430);
  colocarSegundoCarrinho(430, 337);
  primeiroSemaforo("yellow");
  segundoSemaforo("yellow");
});

select.addEventListener("click", () => {
  let color = select.options[select.selectedIndex].value;
  primeiroSemaforo(select.options[select.selectedIndex].value);
  pSemaforo = color;
  if (color == "green") {
    segundoSemaforo("red");
    sSemaforo = "red";
  } else {
    segundoSemaforo("green");
    sSemaforo = "green";
  }
});

comecar.addEventListener("click", () => {
  iniciar();
});

desenhaPistas();
