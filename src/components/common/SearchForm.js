import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Input } from 'antd';

const ColStyle = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative',
  top: '20rem',
  zIndex: 99999,
};

const SearchStyle = {
  width: '55vw',
  minWidth: '24rem',
  maxWidth: '80rem',
  padding: '1rem',
};

const SearchForm = ({ onSearchSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  // Split search value right by the common
  const splitSearchValue = searchValue.toLowerCase().split(', ');

  // Set the split value to city and state
  const cityAndState = {
    city: splitSearchValue[0],
    state: splitSearchValue[1],
  };

  const { Search } = Input;
  const { push } = useHistory();

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const onSubmit = e => {
    localStorage.setItem('cityAndState', JSON.stringify(cityAndState));
    onSearchSubmit(cityAndState);
    push(`/${cityAndState.state}/${cityAndState.city}`);
    setSearchValue('');
  };

  return (
    <Row>
      <Col span={12} offset={6} style={ColStyle}>
        <div>
          <Search
            placeholder="Ex. New York, NY"
            allowClear
            onSearch={() => onSubmit()}
            size="large"
            style={SearchStyle}
            value={searchValue.city}
            onChange={handleChange}
          />
        </div>
      </Col>
    </Row>
  );
};

export default SearchForm;
