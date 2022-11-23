
import React from 'react';
import PropTypes from "prop-types"
import './App.css';

const PokemonRow = ({pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
    </td>
  </tr>

);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape( {
      english: PropTypes.string
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  }),
  onSelect: PropTypes.func
};


const PokemonInfo = ({name, base}) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      <tbody>
        {
          Object.keys(base).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>{base[key]}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);


PokemonRow.propTypes = {
  name: PropTypes.shape( {
    english: PropTypes.string
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Special Attack": PropTypes.number.isRequired,
    "Special Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  })
};

function App() {
  const [pokemon, pokemonSet] = React.useState([])
  const [filter, filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);

  React.useEffect(() => {
    fetch("pokemon.json").then(response => response.json()).then(data => pokemonSet(data))
  }, []);

  return (
    <div className="main">
      <h1 className="title">Pokemon Search</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '70% 30%',
        gridColumnGap: "1rem"
      }}>
        <div>
          <input value ={filter} onChange={(event) => filterSet(event.target.value)}/>
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
              .slice(0, 20).map(pokemon => (
                <PokemonRow
                  key={pokemon.id}
                  pokemon={pokemon}
                  onSelect={(pokemon) => selectedItemSet(pokemon)}/>
              ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </div>
    </div>
  );
}

export default App;
