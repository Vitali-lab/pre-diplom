import styled from "styled-components";

const NotFoundContainer = ({ className }) => {
  return (
    <div className={className}>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
};

export const NotFound = styled(NotFoundContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 2rem;
  color: #333;
`;
