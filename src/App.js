
import React from 'react';
import PropTypes from "prop-types"
import styled from "@emotion/styled"

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

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

function App() {
  const [pokemon, pokemonSet] = React.useState([])
  const [filter, filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);

  React.useEffect(() => {
    fetch("/starting-react/pokemon.json").then(response => response.json()).then(data => pokemonSet(data))
  }, []);

  return (
    <Container>
      <Title>Pokemon Search</Title>

      <TwoColumnLayout>
        <div>
          <Input value ={filter} onChange={(event) => filterSet(event.target.value)} />
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
                  onSelect={(pokemon) => selectedItemSet(pokemon)} />
              ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
