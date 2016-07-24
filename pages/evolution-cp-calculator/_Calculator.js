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
    options.push({ value: `${pokemonObj.pokemon}-${uniqueId()}`, label: pokemonObj.pokemon })
  }
}

function saveInfo (data) {
  pokemonArray = data
  setSelectOptions()
  console.log(options)
}

Tabletop.init(
  { key: publicUrl,
    callback: saveInfo,
    simpleSheet: true,
    parseNumbers: true,
  }
)

const Calculator = React.createClass({
  getInitialState () {
    return {
      pokemon: '',
      cp: null,
      evolvedCP: null,
    }
  },

  onPokemonChange (value) {
    this.setState({ pokemon: value.split('-')[0] })
    console.log(this.state.pokemon)
  },

  onCPChange (event) {
    this.setState({ cp: event.target.value })
    console.log('cp', event.target.value)
    this.setCPResult()
  },

  getPokemon () {
    return map(pokemonArray, 'pokemon')
  },

  getMultiplier (pokemonToFind) {
    console.log(this.state.pokemon, pokemonToFind)
    const pokemonObj = find(pokemonArray, { pokemon: pokemonToFind })
    console.log(pokemonObj)
    return pokemonObj.multiplier
  },

  calculateCP (inputCP, multiplier) {
    return inputCP * multiplier
  },

  setCPResult () {
    console.log('testing')
    const pokemon = this.state.pokemon
    const evolvedCP = this.calculateCP(this.state.cp, this.getMultiplier(pokemon))
    this.setState({evolvedCP})
    console.log(evolvedCP)
  },

  render () {
    return (
      <div>
        <Select
          name="pokemon"
          placeholder="Select a Pokemon"
          options={options}
          value={this.state.pokemon}
          onChange={this.onPokemonChange}
        />
        <div>
          <input type="text" name="cp" onChange={this.onCPChange} />
        </div>
        <h1 className="evolved-cp">
          {this.state.evolvedCP || ""}
        </h1>
      </div>
    )
  },
})

export default Calculator
