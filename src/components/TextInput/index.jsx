import './styles.css';
import { Component } from 'react';
import P from 'prop-types';

export class TextInput extends Component {
  render() {
    const { searchValue, onChange } = this.props;

    return (
      <input
        className="input-search"
        placeholder="Type your search"
        onChange={onChange}
        value={searchValue}
        type="search"
      />
    );
  }
}

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  onChange: P.func.isRequired,
};
