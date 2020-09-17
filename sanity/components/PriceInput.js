import React from 'react';
import PropTypes from 'prop-types';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)))
}

const formatMoney = Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <div>
      <h2>{type.title} - {value ? formatMoney(value / 100) : null}</h2>
      <p>{type.description}</p>
      <input type={type.name} value={value} onChange={event => onChange(createPatchFrom(event.target.value))} ref={inputComponent} />
    </div>
  )
}

PriceInput.focus = function () {
  this._inputElement.focus();
}

PriceInput.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  inputComponent: PropTypes.func.isRequired,
}
