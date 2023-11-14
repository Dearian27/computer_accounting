type parserParams = {
  cpu: string,
  motherboard: string,
  gpu: string,
  case: string,
  ram: string,
  disk: string,
  mouse: string,
  keyboard: string,
  power_supply: string,
  monitor: string,
}

export const parser: parserParams = {
  cpu: 'Процесор',
  motherboard: 'Мат. плата',
  gpu: 'Відеокарта',
  case: 'Корпус',
  ram: 'ОЗП',
  disk: 'Жорсткий диск',
  mouse: 'Миша',
  keyboard: 'Клавіатура',
  power_supply: 'Блок живлення',
  monitor: 'Монітор',
}
export type typeVariants = 'case' | 'gpu' | 'cpu' | 'motherboard' | 'monitor' | 'ram' | 'disk' | 'mouse' | 'keyboard' | 'power_supply';
export type typeVariantsUkr = 'Монітор' | 'Блок живлення' | 'Клавіатура' | 'Миша' | 'Жорсткий диск' | 'ОЗП' | 'Корпус' | 'Відеокарта' | 'Мат. плата' | 'Процесор';