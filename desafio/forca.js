class Forca {
  /**
   * 
   * @param {string} gabarito palavra que será utilizada na forca
   */
  constructor(gabarito) {
    this.gabarito = gabarito                          // Palavra original
    this.palavra = Array(gabarito.length).fill("_");  // Palavra com máscara: "_"
    this.letrasChutadas = [];

    this.vidas = 6;

    this.estadoAtual = "aguardando chute";
  }

  /**
   * 
   * @param {string} letra letra para ser verificada
   * @returns {boolean} true se ela é uma letra alfabética, false caso contrário
   */
  ehAlfabetica(letra) {
    // Se ela é alfabética retorne true, caso contrário false
    return (/^[a-z]/i.test(letra));
  }

  /**
   * 
   * @param {string} letra chute do usuário
   * @returns {boolean} true se o chute for válido, false caso contrário
   */
  chutar(letra) {
    letra = letra.toLowerCase();
    // Verifica a quantidade de letras, se possui erro na letra e se ela já foi chutada
    if (letra.length != 1 || !this.ehAlfabetica(letra) || this.letrasChutadas.includes(letra)) 
      return false;
    this.letrasChutadas.push(letra);

    // Se ela não existe no gabarito
    if (!this.gabarito.includes(letra)) {
      this.vidas -= 1;
      return false;
    }

    // Adiciona ela na this.palavra nos lugares em que ela existe no gabarito
    for (let i = 0; i < this.gabarito.length; i++) {
      if (this.gabarito[i] === letra) 
        this.palavra[i] = letra;
    }

    return true;
  }

  /**
   * 
   * @returns {string} "aguardando chute", "ganhou" ou "perdeu",
   * estado atual do jogo
   */
  buscarEstado() {
    if (this.vidas <= 0) this.estadoAtual = "perdeu";
    else if (!this.palavra.includes("_")) this.estadoAtual = "ganhou";
    else this.estadoAtual = "aguardando chute";

    return this.estadoAtual; 
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  /**
   * 
   * @returns {object} letras chutadas, vidas e a palavra atual
   */
  buscarDadosDoJogo() {
      return {
          letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
          vidas: this.vidas, // Quantidade de vidas restantes
          palavra: this.palavra // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      }
  }
}

module.exports = Forca;
