type Constructor = new (...args: any[]) => {}

function applyMixins(
  derivedCtor: Constructor,
  constructors: Constructor[]
) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(
      (name) => {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(
            baseCtor.prototype,
            name
          ) || Object.create(null)
        )
      }
    )
  })
}

// function applyMixins(cls: Constructor, constructors: Constructor[]) {
//   constructors.forEach(ctr => {
//     Object.getOwnPropertyNames(ctr.prototype).forEach(name => {
//       if (name !== 'constructor') {
//         // eslint-disable-next-line
//         cls.prototype[name] = ctr.prototype[name]
//       }
//     })
//   })
// }

class Flies {
  fly() {
    alert('Is it a bird? Is it a plane?')
  }
}

class Climbs {
  climb() {
    alert('My spider-sense is tingling.')
  }
}

class Bulletproof {
  deflect() {
    alert('My wings are a shield of steel.')
  }
}

class BeetleGuy implements Climbs, Bulletproof {
  climb!: () => void
  deflect!: () => void
}
applyMixins(BeetleGuy, [Climbs, Bulletproof])

class HorseflyWoman implements Climbs, Flies {
  climb!: () => void
  fly!: () => void
}
applyMixins(HorseflyWoman, [Climbs, Flies])

const superHero = new HorseflyWoman()
console.log(superHero)
// superHero.climb()
// superHero.fly()
