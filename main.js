const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
var select = document.getElementById("semaforoInicial");

var place = document.getElementById("place");

var comecar = document.getElementById("comecar");

var image = document.querySelector("#image")

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

  image.setAttribute('src', './SVG-AUTOMATO/Site.drawio (2).svg')
  p = setInterval(() => {
    ctx.clearRect(px - 10, 430, 20, 20);

    ctx.fillStyle = "white";
    ctx.fillRect(px, 430, 20, 20);

    if(px > 400){
      primeiroSemaforo('yellow')
      image.setAttribute('src', './SVG-AUTOMATO/Site.drawio (3).svg')
    }

    if (px > 500) {
      pSemaforoAtv = true;

      if (!sSemaforoAtv) {
        segundoSemaforo("green");
        primeiroSemaforo("red");
        moveSegundo(337);
      }
      clearInterval(p);
    }


    px += 5;
  }, 100);
}

function moveSegundo(y) {
  py = y;
  image.setAttribute('src', './SVG-AUTOMATO/Site.drawio (4).svg')
  segundoSemaforo('green')
  m = setInterval(() => {
    ctx.clearRect(430, py - 5, 20, 20);
    ctx.fillStyle = "white";
    ctx.fillRect(430, py, 20, 20);

    // segundoSemaforo('yellow')

    if(py > 430){
      segundoSemaforo('yellow')
      image.setAttribute('src', './SVG-AUTOMATO/Site.drawio (5).svg')
    }
  
    if (py > 530) {
      // sSemaforoAtv = true;

      image.setAttribute('src', './SVG-AUTOMATO/Site.drawio.svg')
      segundoSemaforo("red");
      primeiroSemaforo('green')
      clearInterval(m);
    }



    py += 5;
  }, 100);
}

function iniciar() {
  if (pSemaforo == "green") {
    //primeiro carrinho anda
    movePrimeiro(350);
  } else {
    moveSegundo(337);
  }
}

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
