// import './mixin'

class MonaddyNumber<T> {
  constructor(private data: T) {}

  isNumber(): boolean {
    return !this.isNaN(this.data)
  }

  isNaN(number: unknown): boolean {
    throw new Error('Method not implemented.')
  }
}

class MonaddyString<T> {
  constructor(private data: T) {}
}

class MonaddyObject<T extends Object> {
  constructor(public data: T) {}

  add<T>(data: T): MonaddyObject<T> {
    return new MonaddyObject<T>({
      ...this.data,
      ...data
    })
  }

  remove(key: keyof T): MonaddyObject<T> {
    delete this.data[key]
    return new MonaddyObject<T>(this.data)
  }
}

class MonaddyArray<T> {
  constructor(private data: T) {}
}

class MonaddyDate<T> {
  constructor(private data: T) {}
}

interface ModdyTrace {
  [key: symbol]: unknown
}

class Monaddy<T> {
  value: T
  trace: ModdyTrace

  constructor(value: T) {
    this.value = value
    this.trace = {}
  }

  do<T extends number>(): MonaddyObject<T>
  do<T extends string>(): MonaddyObject<T>
  do<T extends Object>(): MonaddyObject<T>
  do() {
    switch (typeof this.value) {
      case 'number':
        return new MonaddyNumber<T>(this.value)
      case 'string':
        return new MonaddyString<T>(this.value)
      case 'object':
        return new MonaddyObject<T>(this.value)
    }
  }

  private addTrace(): void {}
}

const data = new Monaddy({ a: '1', b: 1 })
  .do()
  .add({ c: 3 })
  .remove('c')
console.log(data.data)

// const { value, trace } = new Monaddy('123')
// console.log(value, trace)

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
