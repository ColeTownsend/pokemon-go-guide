import React from 'react'
import Tabletop from 'tabletop'
import { uniqueId, map, find } from 'lodash'
import Select from 'react-select'

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css'
const options = []

const publicUrl = 'https://docs.google.com/spreadsheets/d/16T63-89NR_vuyjufxXKg-oQqzu5768T7tVRWo5DIfR4/pubhtml'
let pokemonArray

function setSelectOptions () {
  for (const pokemonObj of pokemonArray) {
    console.log(pokemonObj.pokemon)
    options.push({ value: `${pokemonObj.pokemon}-${uniqueId()}`, label: pokemonObj.pokemon })
  }
  console.log('options', options)
}

class Calculator extends React.Component {
  constructor () {
    super()
    this.onPokemonChange = this.onPokemonChange.bind(this)
    this.onCPChange = this.onCPChange.bind(this)
  }

  getInitialState () {
    return {
      pokemon: null,
      cp: null,
      level: null,
    }
  }
  componentWillMount () {
    Tabletop.init(
      { key: publicUrl,
        callback: this.saveInfo,
        simpleSheet: true,
        parseNumbers: true,
      }
    )
  }

  getMultiplier (pokemonToFind) {
    const pokemonObj = find(pokemonArray, { pokemon: pokemonToFind.toLowerCase() })
    return pokemonObj.multiplier
  }

  saveInfo (data, tabletop) {
    pokemonArray = data
    setSelectOptions()
  }

  onPokemonChange (value) {
    const pokemon = value ? value.split('-')[0] : ''
    this.setState({pokemon})
    console.log('pokemon selected', pokemon)
  }

  onCPChange (event) {
    console.log(event.target.value)
    this.setState({ cp: event.target.value })
    console.log('cp', this.state.cp)
  }

  calculateCP (inputCP, multiplier) {
    return inputCP * multiplier
  }

  getPokemon () {
    return map(pokemonArray, 'pokemon')
  }

  renderResult () {
    const pokemon = this.state.pokemon
    return (
      <h1>{this.calculateCP(this.state.cp, this.getMultiplier(pokemon))}</h1>
    )
  }

  render () {
    return (
      <div>
        <Select
          name="pokemon"
          options={options}
          onChange={this.onPokemonChange}
        />
        <div>
          <input type="text" name="cp" onChange={this.onCPChange} />
        </div>
        <h1>{this.renderResult}</h1>
      </div>
    )
  }
}

export default Calculator
