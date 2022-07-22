class Forca {
  constructor(gabarito) {
    this.gabarito = gabarito                          // Palavra original
    this.palavra = Array(gabarito.length).fill("_");  // Palavra com máscara: "_"
    this.letrasChutadas = [];

    this.vidas = 6;

    this.estadoAtual = "aguardando chute";
  }

  erroLetra(letra) {
    // Se ela não é alfabética retorne true, caso contrário false
    return !(/^[a-z]/i.test(letra));
  }

  chutar(letra) {
    letra = letra.toLowerCase();
    // Verifica a quantidade de letras, se possui erro na letra e se ela já foi chutada
    if (letra.length != 1 || this.erroLetra(letra) || this.letrasChutadas.includes(letra)) 
      return;
    this.letrasChutadas.push(letra);

    // Se ela não existe no gabarito
    if (!this.gabarito.includes(letra)) {
      this.vidas -= 1;
      return;
    }

    // Adiciona ela na this.palavra nos lugares em que ela existe no gabarito
    for (let i = 0; i < this.gabarito.length; i++) {
      if (this.gabarito[i] === letra) 
        this.palavra[i] = letra;
    }
  }

  buscarEstado() {
    if (this.vidas <= 0) this.estadoAtual = "perdeu";
    else if (!this.palavra.includes("_")) this.estadoAtual = "ganhou";
    else this.estadoAtual = "aguardando chute";

    return this.estadoAtual; 
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
          vidas: this.vidas, // Quantidade de vidas restantes
          palavra: this.palavra // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      }
  }
}

module.exports = Forca;
