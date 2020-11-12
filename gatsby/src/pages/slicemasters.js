import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SlicemasterGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function SlicemastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;

  console.log(pageContext);

  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGrid>
        {slicemasters.map((person) => (
          <SlicemasterStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemasterGrid>
    </>
  );
}

export const query = graphql`
  query ALL_SLICEMASTERS($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

SlicemastersPage.propTypes = {
  data: PropTypes.shape({
    slicemasters: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          slug: PropTypes.shape({
            current: PropTypes.string.isRequired,
          }).isRequired,
          description: PropTypes.string.isRequired,
          image: PropTypes.shape({
            asset: PropTypes.shape({
              fluid: PropTypes.shape({
                aspectRatio: PropTypes.number.isRequired,
                base64: PropTypes.string.isRequired,
                sizes: PropTypes.string.isRequired,
                src: PropTypes.string.isRequired,
                srcSet: PropTypes.string.isRequired,
                srcSetWebp: PropTypes.string.isRequired,
                srcWebp: PropTypes.string.isRequired,
              }).isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    skip: PropTypes.number,
  }).isRequired,
};
