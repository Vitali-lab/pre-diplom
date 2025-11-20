import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";
import { Input } from "../../../../components";
import { setFilters } from "../../../../actions/set-filters";
import { categorySelector, seasonSelector } from "../../../../selectors";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const defaultFiltersState = {
  seasons: [],
  categories: [],
  minPrice: "",
  maxPrice: "",
};

const FiltrationContainer = ({
  className,
  filters = defaultFiltersState,
  productsFiltered = [],
}) => {
  const allCategories = useSelector(categorySelector);
  const allSeasons = useSelector(seasonSelector);
  const location = useLocation();
  const dispatch = useDispatch();

  // начальная установка фильтра из query-параметра
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const season = params.get("season");
    if (season) {
      const currentSeason = allSeasons.find((s) => s.name === season);
      if (currentSeason) {
        dispatch(setFilters({ seasons: [String(currentSeason.id)] }));
      }
    }
  }, [location, allSeasons, dispatch]);

  const resetFilters = () => {
    dispatch(setFilters(defaultFiltersState));
  };

  const filtersActive =
    filters.seasons.length > 0 ||
    filters.categories.length > 0 ||
    !!filters.minPrice ||
    !!filters.maxPrice;

  return (
    <aside className={className}>
      <div className="filter-card">
        <header className="filter-header">
          <p className="eyebrow">Фильтр каталога</p>
          {filtersActive && (
            <button type="button" onClick={resetFilters}>
              Сбросить
            </button>
          )}
        </header>

        <p className="filter-counter">
          Найдено товаров: {productsFiltered.length}
        </p>

        <section className="filter-section">
          <h3>Сезон</h3>
          <div className="filter-options">
            {allSeasons.map((season) => (
              <label key={season.id}>
                <input
                  type="checkbox"
                  name={season.id}
                  checked={filters.seasons?.includes(String(season.id))}
                  onChange={({ target }) =>
                    dispatch(
                      setFilters({
                        seasons: target.checked
                          ? [...(filters.seasons || []), String(season.id)]
                          : (filters.seasons || []).filter(
                              (s) => s !== String(season.id),
                            ),
                      }),
                    )
                  }
                />
                <span>{season.name}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="filter-section">
          <h3>Категории</h3>
          <div className="filter-options">
            {allCategories.map((category) => (
              <label key={category.id}>
                <input
                  type="checkbox"
                  name={category.id}
                  checked={filters.categories?.includes(String(category.id))}
                  onChange={({ target }) =>
                    dispatch(
                      setFilters({
                        categories: target.checked
                          ? [...(filters.categories || []), String(category.id)]
                          : (filters.categories || []).filter(
                              (c) => c !== String(category.id),
                            ),
                      }),
                    )
                  }
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="filter-section">
          <h3>Цена</h3>
          <div className="price-inputs">
            <Input
              text="От"
              type="number"
              width="100%"
              value={filters.minPrice}
              onChange={({ target }) =>
                dispatch(setFilters({ minPrice: target.value }))
              }
            />
            <Input
              text="До"
              type="number"
              width="100%"
              value={filters.maxPrice}
              onChange={({ target }) =>
                dispatch(setFilters({ maxPrice: target.value }))
              }
            />
          </div>
        </section>
      </div>
    </aside>
  );
};
export const Filtration = styled(FiltrationContainer)`
  width: 30%;

  & .filter-card {
    position: sticky;
    top: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 24px;
    padding: 24px;
    background: #ffffff;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 20px 35px rgba(15, 23, 42, 0.08);
    animation: ${fadeIn} 0.4s ease;
  }

  & .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;

    & button {
      border: none;
      background: rgba(126, 94, 240, 0.12);
      color: var(--purple-color);
      font-weight: 600;
      border-radius: 999px;
      padding: 6px 16px;
      cursor: pointer;
    }
  }

  & .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 12px;
    margin: 0 0 8px;
    color: rgba(15, 15, 15, 0.5);
  }

  & .filter-counter {
    margin: 0;
    font-size: 14px;
    color: rgba(15, 15, 15, 0.7);
  }

  & .filter-section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & h3 {
      margin: 0;
      font-size: 16px;
    }
  }

  & .filter-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;

    & label {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(15, 15, 15, 0.03);
      cursor: pointer;
    }
  }

  & .price-inputs {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  @media (max-width: 1600px) {
    width: 20%;
  }

  @media (max-width: 1280px) {
    & .filter-card {
      position: static;
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    & .price-inputs {
      flex-direction: column;
    }
  }
`;
