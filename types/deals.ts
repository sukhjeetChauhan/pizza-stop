export interface Choices {
  pizzas?: { type: string; number: number }
  sides?: { type: string; number: number }
  desserts?: { type: string; number: number }
}

export interface FixedItems {
  pizzas?: string[]
  sides?: string[]
  desserts?: string[]
  drinks?: string[]
}

export interface Combo {
  choices: Choices
  fixed: FixedItems
}

export interface Combos {
  'The Netflix Night': Combo
  'The Lunch combo': Combo
  'Double combo': Combo
  'The value deal': Combo
  'Triple combo': Combo
  'Stuffed crust combo': Combo
  [key: string]: Combo // Add a string index signature
}
