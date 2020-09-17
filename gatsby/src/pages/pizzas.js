import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : `All Pizzas`
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const PIZZA_PAGE_QUERY = graphql`
  query PIZZA_PAGE_QUERY($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        id
        name
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

PizzasPage.propTypes = {
  data: PropTypes.shape({
    pizzas: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          slug: PropTypes.shape({
            current: PropTypes.string,
          }),
          toppings: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string,
              name: PropTypes.string,
            })
          ),
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
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    topping: PropTypes.string,
  }).isRequired,
};
