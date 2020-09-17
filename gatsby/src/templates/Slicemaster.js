import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

export default function SlicemasterPage({ data: { slicemaster } }) {
  return (
    <>
      <SEO
        title={slicemaster.name}
        image={slicemaster.image?.asset?.fluid?.src}
      />
      <div className="center">
        <Img fluid={slicemaster.image.asset.fluid} />
        <div>
          <h2>
            <span className="mark">{slicemaster.name}</span>
          </h2>
          <p>{slicemaster.description}</p>
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query SINGLE_SLICEMASTER_PAGE($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

SlicemasterPage.propTypes = {
  data: PropTypes.shape({
    slicemaster: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
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
    }).isRequired,
  }).isRequired,
};
