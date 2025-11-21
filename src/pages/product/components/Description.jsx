import styled from "styled-components";

const DescriptionContainer = ({ className, product }) => {
  if (!product?.description) {
    return (
      <div className={className}>
        <h2>Описание</h2>
        <div className="description empty">Описание отсутствует</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2>Описание</h2>
      <div className="description">{product.description}</div>
    </div>
  );
};

export const Description = styled(DescriptionContainer)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 40px 0;
  padding: 24px;
  border-radius: 12px;
  background: #fff;
  box-shadow: var(--box-shadow);
  border: 1px solid rgba(15, 23, 42, 0.06);

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
    align-self: flex-start;
    color: #333;
  }

  .description {
    border-radius: 8px;
    padding: 16px;
    width: 95%;
    min-height: 100px;
    font-size: 16px;
    line-height: 1.5;
    color: #444;
    background: #fafafa;
    transition: background 0.3s ease;
    white-space: pre-line;
    word-break: break-word;
    font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;

    &:hover {
      background: #f5f5f5;
    }

    &.empty {
      color: #999;
      font-style: italic;
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    .description {
      font-size: 14px;
      width: 100%;
    }
  }
`;