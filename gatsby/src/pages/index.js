import React from 'react';
import PropTypes from 'prop-types';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters on</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothin' in the case</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}

CurrentlySlicing.propTypes = {
  slicemasters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.shape({
        asset: PropTypes.shape({
          url: PropTypes.string.isRequired,
          metadata: PropTypes.shape({
            lqip: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    })
  ),
};

HotSlices.propTypes = {
  hotSlices: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.shape({
        asset: PropTypes.shape({
          url: PropTypes.string.isRequired,
          metadata: PropTypes.shape({
            lqip: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    })
  ),
};
