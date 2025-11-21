import { useEffect, useMemo, useState } from "react";
import { PostsList } from "./components/posts-list/PostsList";
import { useSelector } from "react-redux";
import { Filtration } from "./components/filtration/Filtration";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getProducts } from "../../bff/api/back-end/get-products";
import { scrollTop } from "../../utils/scrollTop";
import { setCurrentPage } from "../../actions/set-current-page";
import { ITEMS_PER_PAGE } from "../../constants/item-per-page";
import { Icon } from "../../components";
import { allProductsSelector } from "../../selectors/all-products-selector";

const CatalogContainer = ({ className }) => {
  const dispatch = useDispatch();
  const { products, currentPage, filters } = useSelector(allProductsSelector);
  const { seasons, categories, minPrice, maxPrice } = filters;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        await dispatch(getProducts());
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
    scrollTop();
  }, [seasons, categories, minPrice, maxPrice, dispatch]);

  const productsFiltered = useMemo(() => {
    const selectedSeasons = filters.seasons || [];
    const selectedCategories = filters.categories || [];
    const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;

    return products.filter((product) => {
      const seasonOk =
        selectedSeasons.length === 0 ||
        selectedSeasons.includes(String(product.seasonId));
      const categoryOk =
        selectedCategories.length === 0 ||
        selectedCategories.includes(String(product.categoryId));
      const minOk = minPrice === null || product.price >= minPrice;
      const maxOk = maxPrice === null || product.price <= maxPrice;

      return seasonOk && categoryOk && minOk && maxOk;
    });
  }, [products, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(productsFiltered.length / ITEMS_PER_PAGE()),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      dispatch(setCurrentPage(totalPages));
    }
  }, [currentPage, totalPages, dispatch]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE();
  const currentProducts = productsFiltered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE(),
  );

  const changePage = (page) => {
    scrollTop();
    dispatch(setCurrentPage(page));
  };

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className={className}>
      <div className="products-container">
        <Filtration
          filters={filters}
          allProducts={products}
          productsFiltered={productsFiltered}
        />
        <PostsList products={currentProducts} />
      </div>
      <div className="pagination">
        <Icon
          id="angle-left"
          className={!canGoPrev ? "disabled" : ""}
          onClick={() => canGoPrev && changePage(currentPage - 1)}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            disabled={currentPage === page}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}
        <Icon
          id="angle-right"
          className={!canGoNext ? "disabled" : ""}
          onClick={() => canGoNext && changePage(currentPage + 1)}
        />
      </div>
    </div>
  );
};

export const Catalog = styled(CatalogContainer)`
  width: 1300px;

  & .products-container {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: flex-start;
    width: 100%;
    min-height: 60vh;
  }

  & .skeleton-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
  }

  & .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 100%;
    min-height: 300px;
    margin: 0 auto;
    padding: 24px;
    text-align: center;
    font-size: clamp(18px, 3vw, 28px);
  }

  & .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: clamp(32px, 6vw, 80px) 0;
    gap: 12px;

    & button {
      cursor: pointer;
      background: var(--purple-color);
      border: none;
      border-radius: 10px;
      padding: 8px 14px;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      transition: all ease 0.3s;

      &.active {
        background: #8a898983;
      }

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }

  & .pagination .disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  @media (max-width: 1280px) {
    & .products-container {
      gap: 32px;
    }
  }

  @media (max-width: 992px) {
    & .products-container {
      gap: 32px;
    }
  }

  @media (max-width: 768px) {
    & .pagination {
      gap: 8px;
    }
  }

  @media (max-width: 576px) {
    & .products-container {
      gap: 24px;
    }

    & .pagination {
      margin: 32px 0;
    }
  }
`;
