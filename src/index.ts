import './mixin'

class MonaddyNumber<T> {
  constructor(private data: T) {}

  isNumber(): boolean {
    return !this.isNaN(this.data)
  }

  isNaN(number: unknown): boolean {
    throw new Error('Method not implemented.')
  }
}

class MonaddyString {}

class MonaddyObject {}

class MonaddyArray {}

class MonaddyDate {}

interface ModdyTrace {
  [key: symbol]: unknown
}

class Monaddy<T> {
  value: T
  trace: ModdyTrace

  constructor(value: T) {
    this.value = value
    this.trace = {}

    switch (typeof value) {
      case 'number':
        return new MonaddyNumber(value)
      // case 'string':
    }
  }

  private addTrace(): void {}
}

const { value, trace } = new Monaddy('123')
console.log(value, trace)

// const { value, trace } = new Monaddy([1, 2, 3])
//   .map((v) => v + 1)
//   .reduce((a, b) => summ(a, b, initialValue))
//   .do(console.log)
// console.log(value, trace)

// const uniqKey = (name: string) => Symbol(name)
// const trace = {
//   initial: [1, 2, 3],
//   [uniqKey('map')]: [2, 3, 4],
//   [uniqKey('map')]: [],
//   reduce: 9
// }
// console.log(trace)
