import styled from "styled-components";

export const StyledCardWrapper = styled.div`
    display: grid;
    justify-content: center;
    justify-items: center;
    gap: 1rem;
    grid-auto-rows: 22rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); 
    width: 100%;
    height: 100%
`;

export const StyledComponentWrapper = styled.div`
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export const Button = styled.button`
  all: unset;
  cursor: pointer;
  padding: 1rem;
  text-align: left;
  color: ${(props) => (props.selected ? "#f7e479" : props.isDarkMode ? "#bbb" : "#444")};
  background: ${(props) =>
    props.selected
      ? props.isDarkMode
        ? "#333"
        : "#f7e47933"
      : "transparent"};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.isDarkMode ? "#444" : "#ddd")};
  }
`;


export const IconContainer = styled.button`
  position: relative;
  background: #eee;
  border: 2px solid #f7e479;
  padding: 0.2rem;
  font-size: 1rem;
  max-height: 40px;
  max-width: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222;
  transition: all 0.3s ease;

  &:hover {
    background: #ddd;
  }
`;