import React from 'react';
import PropTypes from 'prop-types'
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Link } from 'gatsby';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;

  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }

  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;

  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>
        {pizza.toppings.map(topping => topping.name).join(', ')}
      </p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  )
}

export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map(pizza => <SinglePizza key={pizza.id} pizza={pizza} />)}
    </PizzaGridStyles>
  )
}

SinglePizza.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.shape({
    current: PropTypes.string,
  }),
  toppings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  image: PropTypes.shape({
    asset: PropTypes.shape({
      fluid: PropTypes.shape({
        aspectRatio: PropTypes.number,
        base64: PropTypes.string,
        sizes: PropTypes.string,
        src: PropTypes.string,
        srcSet: PropTypes.string,
        srcSetWebp: PropTypes.string,
        srcWebp: PropTypes.string,
      }),
    }),
  }),
}

PizzaList.propTypes = {
  pizzas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
}
