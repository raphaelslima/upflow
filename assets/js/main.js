// initial data

const calculadora = criaCalculadora()

calculadora.start()

function criaCalculadora() {
  return {
    //Propriedades iniciais da classe
    display: document.querySelector('.display'),
    clear: document.querySelector('.btn-clear'),
    amountFields: 0,
    numbers: [],

    //Inicia a aplicação
    start: function () {
      this.clickBtn()
      this.display.value = `Digite a quantidade de campos envolvidos na operação:`
    },

    //Controla o fluxo da aplicação de acordo com as interações do usuário
    clickBtn: function () {
      document.addEventListener('click', e => {
        const el = e.target
        if (el.classList.contains('btn-num')) {
          this.controllerDisplay()
          this.btnValueDisplay(el.innerText)
          this.display.focus()
        } else if (el.classList.contains('btn-clear')) {
          this.clear()
          this.display.focus()
        } else if (el.classList.contains('btn-confirm')) {
          if (this.amountFields === 0 && this.display.value !== '') {
            if (this.display.value < 2) {
              this.display.value = `Por favor, digite um número igual ao maior a 2`
              return
            }

            this.amountFields = parseFloat(this.display.value)
            this.display.value = `Por favor, digite os ${this.amountFields} números que serão utilizados na operação em sequência:`
            return
          } else if (this.amountFields > this.numbers.length) {
            this.addNumbers(parseFloat(this.display.value))
          }

          if (this.amountFields === this.numbers.length) {
            this.display.value = 'Deseja realizar soma ou subtração ?'
          }
        } else if (el.classList.contains('btn-plus')) {
          if (this.numbers.length !== this.amountFields) {
            this.display.value =
              'Por favor, preencha e confirme todos os campos reservados para a operação'
            return
          }

          let result = 0
          if (this.amountFields !== 0) {
            for (let i = 0; i < this.amountFields; i++) {
              result = result + this.numbers[i]
            }
          }
          this.display.value = ''
          this.btnValueDisplay(`Resultado: ${result}`)
          return
        } else if (el.classList.contains('btn-less')) {
          if (this.numbers.length !== this.amountFields) {
            this.display.value =
              'Por favor, preencha e confirme todos os campos reservados para a operação'
            return
          }

          let result = this.numbers[0] ? this.numbers[0] : 0
          if (this.amountFields !== 0) {
            for (let i = 1; i < this.amountFields; i++) {
              result = result - this.numbers[i]
            }
          }
          this.display.value = ''
          this.btnValueDisplay(`Resultado: ${result}`)
          return
        } else if (el.classList.contains('btn-del')) {
          this.deleteOne()
          this.display.focus()
        }
      })
    },

    // Métodos:

    //Adiciona um número no array de números que serão usados na operação
    addNumbers: function (valor) {
      parseFloat(valor)
      this.numbers.push(valor)
      this.display.value = 'Próximo valor:'
      this.display.focus()
    },

    //Incrementa o display da calculadora
    btnValueDisplay: function (valor) {
      this.display.value += valor
    },

    //Limpa a calculadora
    clear: function () {
      this.numbers = []
      this.amountFields = 0
      this.display.value = `Digite a quantidade de campos envolvidos na operação:`
      this.display.focus()
    },

    //Apaga o último digito do display
    deleteOne: function () {
      this.display.value = this.display.value.slice(0, -1)
    },

    //Controla mensagens para o usuário
    controllerDisplay: function () {
      if (this.display.value === `Próximo valor:`) {
        this.display.value = ''
      }

      if (
        this.display.value ===
        `Digite a quantidade de campos envolvidos na operação:`
      ) {
        this.display.value = ''
      }

      if (
        this.display.value ===
        'Por favor, preencha e confirme todos os campos reservados para a operação'
      ) {
        this.display.value = ''
      }

      if (
        this.display.value ===
        `Por favor, digite os ${this.amountFields} números que serão utilizados na operação em sequência:`
      ) {
        this.display.value = ''
      }

      if (
        this.display.value === `Por favor, digite um número igual ao maior a 2`
      ) {
        this.display.value = ''
      }
    }
  }
}
