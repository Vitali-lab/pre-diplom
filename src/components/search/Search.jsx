import { useSelector } from 'react-redux';
import { Icon } from '../icon/Icon';
import { Input } from '../input/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { productsSelector } from '../../selectors';
import { useProductLabels } from '../../hooks/use-product-labels';

const SearchContainer = ({ className }) => {
  const [search, setSearch] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const navigate = useNavigate();
  const { getCategoryName, getSeasonName } = useProductLabels();

  const products = useSelector(productsSelector);

  const onSearch = () => {
    setResultSearch(
      products.filter((product) => {
        return (
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          getCategoryName(product.categoryId).toLowerCase().includes(search.toLowerCase()) ||
          getSeasonName(product.seasonId).toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  };

  return (
    <div className={className}>
      <div className="search-input">
        <Input
          text="Поиск"
          width="200px"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch();
          }}
        />
        <div className="search-icon">
          <Icon id="search" color="#050505ff" size="18" />
        </div>
      </div>
      {resultSearch.length > 0 && search && (
        <div className="search-result">
          {resultSearch.map((product) => (
            <div
              className="search-list"
              key={product.id}
              onClick={() => {
                setSearch('');
                setResultSearch([]);
                navigate(`/catalog/${product.id}`);
              }}
            >
              <div className="search-item">
                <p>{product.name}</p>
                <img src={product.images[0]} alt="" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Search = styled(SearchContainer)`
  & .search-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 500px;
    height: 120px;
    border-radius: 10px;
    border: 1px solid #ccccccff;
    padding: 0px 10px;
    cursor: pointer;
    margin: 10px 0;
    & img {
      width: 70px;
      height: 100px;
      border-radius: 10px;
    }
  }

  & .search-result {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    top: 110px;
    left: 70px;
    width: 550px;
    height: auto;
    max-height: 500px;
    overflow-y: scroll;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    z-index: 10;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    & p {
      width: 100px;
      margin: 0;
      cursor: pointer;
    }
  }

  & .search-input {
    position: relative;
    top: 0px;
    width: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .search-icon {
    position: absolute;
    right: 120px;
    bottom: 8px;
    z-index: 10;
  }
`;
