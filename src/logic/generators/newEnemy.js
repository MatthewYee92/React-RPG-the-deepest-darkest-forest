import { rollDice } from '../helpers'

class EnemyState {
  constructor(playerLvl) {
    this.desc = generateEnemyDescription()
    this.lvl = generateEnemyLevel(playerLvl)
    this.hp = generateEnemyHp(this.lvl)
    this.loot = generateEnemyLoot()
  }
}


import { potentialEnemyDescriptions } from '../enemies/enemies'

const generateEnemyDescription = () => {
  const idx = rollDice(potentialEnemyDescriptions.length)
  return potentialEnemyDescriptions[idx]
}


import { enemyLvlChances } from '../enemies/enemies'

const generateEnemyLevel = (playerLvl) => {
  const { isLower, isSame } = enemyLvlChances
  const diceRoll = rollDice(100)
  if (diceRoll <= isLower) return playerLvl > 1 ? playerLvl - 1 : playerLvl
  if (diceRoll > isLower && diceRoll <= isLower + isSame) return playerLvl
  if (diceRoll > isLower + isSame) return playerLvl + 1
}


import { enemyBaseHealth } from '../enemies/enemies'

const generateEnemyHp = (lvl) => {
  let incrementor = lvl * 5
  incrementor = Math.round(incrementor / 2.5)
  return enemyBaseHealth + incrementor
}


import { allItems } from '../items/all'

const generateEnemyLoot = () => {
  const items = Object.keys(allItems)
  const idx = rollDice(items.length)
  return allItems[items[idx]]
}

export { EnemyState } 