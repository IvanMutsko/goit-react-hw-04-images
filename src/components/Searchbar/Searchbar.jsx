import { useState } from 'react';
import { GoSearch } from 'react-icons/go';

import {
  SearchbarBox,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeInput = evt => {
    const { value } = evt.currentTarget;

    setSearchQuery(value);
  };

  const onSearch = evt => {
    evt.preventDefault();

    setSearchQuery('');

    onSubmit(searchQuery);
  };

  return (
    <SearchbarBox>
      <SearchForm onSubmit={onSearch}>
        <SearchFormButton type="submit">
          <GoSearch size="50%" />
        </SearchFormButton>

        <SearchFormInput
          id="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeInput}
        />
      </SearchForm>
    </SearchbarBox>
  );
};
