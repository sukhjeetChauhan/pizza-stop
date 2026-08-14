import { ChoiceItem } from '../client/Providers/CartProvider'
import { Combos, Combo, Choices } from '../types/deals'

export const dealsConfig: Combos = {
  'The Netflix Night': {
    choices: {
      pizzas: { type: 'any', number: 1 },
    },
    fixed: {
      sides: ['garlic bread'],
      desserts: ['chocolate mousse'],
      drinks: ['1.5 ltr drink'],
    },
  },
  'The Lunch combo': {
    choices: {
      pizzas: { type: 'Value Range', number: 1 },
    },
    fixed: {
      sides: ['chips'],
      drinks: ['can drink'],
    },
  },
  'Double combo': {
    choices: {
      pizzas: { type: 'any', number: 2 },
    },
    fixed: {
      sides: ['garlic bread'],
      drinks: ['1.5 ltr drink'],
    },
  },
  'The value deal': {
    choices: {
      pizzas: { type: 'Value Range', number: 2 },
    },
    fixed: {
      sides: ['garlic bread'],
      drinks: ['1.5 ltr drink'],
    },
  },
  'Triple combo': {
    choices: {
      pizzas: { type: 'any', number: 3 },
    },
    fixed: {
      sides: ['garlic bread'],
      drinks: ['1.5 ltr drink'],
    },
  },
  'Stuffed crust combo': {
    choices: {
      pizzas: { type: 'any', number: 2 },
      sides: { type: 'regular', number: 2 },
    },
    fixed: {},
  },
}

export function getDealConfig(dealName: string): Combo | undefined {
  return dealsConfig[dealName]
}

export function validateDealChoices(
  dealName: string,
  choices: ChoiceItem,
): string | null {
  const deal = getDealConfig(dealName)
  if (!deal) {
    return 'Unknown deal. Please try again.'
  }

  const choiceCategories = Object.keys(deal.choices) as (keyof Choices)[]

  for (const category of choiceCategories) {
    const required = deal.choices[category]?.number ?? 0
    const selected = choices[category]?.length ?? 0

    if (selected !== required) {
      const missing = required - selected
      return `Please select ${required} ${category} (${missing} more needed)`
    }
  }

  return null
}

export function mergeDealChoiceWithFixed(
  dealName: string,
  choices: ChoiceItem,
): ChoiceItem {
  const deal = getDealConfig(dealName)
  if (!deal) {
    return choices
  }

  return {
    pizzas: deal.fixed.pizzas ?? choices.pizzas,
    sides: deal.fixed.sides ?? choices.sides,
    drinks: deal.fixed.drinks ?? choices.drinks,
    desserts: deal.fixed.desserts ?? choices.desserts,
  }
}
