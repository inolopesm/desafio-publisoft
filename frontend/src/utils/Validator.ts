export default class Validator {
  // https://emailregex.com/
  // eslint-disable-next-line no-useless-escape
  private static readonly emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  private readonly validators: ((value: string) => void)[] = []

  isRequired(): Validator {
    this.validators.push(value => {
      if (value === undefined || value === '') {
        throw new Error('Este campo é obrigatório')
      }
    })

    return this
  }

  onlyNumbers(): Validator {
    this.validators.push(value => {
      if (/\d+/.test(value) === false) {
        throw new Error('Este campo deve conter apenas números')
      }
    })

    return this
  }

  minLength(minLength: number): Validator {
    this.validators.push(value => {
      if (value.length < minLength) {
        throw new Error(`Este campo deve ter no mínimo ${minLength} caracteres`)
      }
    })

    return this
  }

  maxLength(maxLength: number): Validator {
    this.validators.push(value => {
      if (value.length > maxLength) {
        throw new Error(`Este campo deve ter no máximo ${maxLength} caracteres`)
      }
    })

    return this
  }

  onlyLength(length: number): Validator {
    this.validators.push(value => {
      if (value.length !== length) {
        throw new Error(`Este campo deve ter ${length} caracteres`)
      }
    })

    return this
  }

  onlyLengths(lengths: number[]): Validator {
    this.validators.push(value => {
      if (!lengths.includes(value.length)) {
        const lengthList: string = new (Intl as any).ListFormat('pt-BR', { style: 'short', type: 'disjunction' }).format(lengths.map(String))
        throw new Error(`Este campo deve ter ${lengthList} caracteres`)
      }
    })

    return this
  }

  isEmail(): Validator {
    this.validators.push(value => {
      if (!Validator.emailRegex.test(value)) {
        throw new Error('Este campo deve ter um e-mail válido')
      }
    })

    return this
  }

  build = async (_: any, value: string): Promise<void> => {
    try {
      this.validators.forEach(validator => validator(value))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error.message)
    }
  }
}
