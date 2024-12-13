import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Card = styled.div`
  --white: hsl(0, 0%, 100%);
  --black: hsl(240, 15%, 9%);
  --paragraph: hsl(0, 0%, 83%);
  --line: hsl(240, 9%, 17%);
  --primary: hsl(189, 92%, 58%);

  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 19rem;
  background-color: hsla(240, 15%, 9%, 1);
  background-image: radial-gradient(
      at 88% 40%,
      hsla(240, 15%, 9%, 1) 0px,
      transparent 85%
    ),
    radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
    radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
    radial-gradient(at 0% 64%, hsl(189, 99%, 26%) 0px, transparent 85%),
    radial-gradient(at 41% 94%, hsl(189, 97%, 36%) 0px, transparent 85%),
    radial-gradient(at 100% 99%, hsl(188, 94%, 13%) 0px, transparent 85%);
  border-radius: 1rem;
  box-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.25) inset;
`;

const Border = styled.div`
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: -10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background-image: linear-gradient(
    0deg,
    hsl(0, 0%, 100%) -50%,
    hsl(0, 0%, 40%) 100%
  );
  border-radius: 1rem;

  &::before {
    content: "";
    pointer-events: none;
    position: fixed;
    z-index: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    transform-origin: left;
    width: 200%;
    height: 10rem;
    background-image: linear-gradient(
      0deg,
      hsla(0, 0%, 100%, 0) 0%,
      hsl(189, 100%, 50%) 40%,
      hsl(189, 100%, 50%) 60%,
      hsla(0, 0%, 40%, 0) 100%
    );
    animation: ${rotate} 8s linear infinite;
  }
`;

const TitleContainer = styled.div`
  .card_title {
    font-size: 1rem;
    color: var(--white);
  }

  .card_paragraph {
    margin-top: 0.25rem;
    width: 65%;
    font-size: 0.5rem;
    color: var(--paragraph);
  }
`;

const Line = styled.hr`
  width: 100%;
  height: 0.1rem;
  background-color: var(--line);
  border: none;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .card__list_item {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .check {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1rem;
      height: 1rem;
      background-color: var(--primary);
      border-radius: 50%;

      .check_svg {
        width: 0.75rem;
        height: 0.75rem;
        fill: var(--black);
      }
    }

    .list_text {
      font-size: 0.75rem;
      color: var(--white);
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  padding: 0.5rem;
  width: 100%;
  background-image: linear-gradient(
    0deg,
    hsl(189, 92%, 58%),
    hsl(189, 99%, 26%) 100%
  );
  font-size: 0.75rem;
  color: var(--white);
  border: 0;
  border-radius: 9999px;
  box-shadow: inset 0 -2px 25px -4px var(--white);
`;

const StyledCard = ({ title, paragraph, items }) => {
  return (
    <Card>
      <Border />
      <TitleContainer>
        <span className="card_title">{title}</span>
        <p className="card_paragraph">{paragraph}</p>
      </TitleContainer>
      <Line />
      <List>
        {items.map((item, index) => (
          <li className="card__list_item" key={index}>
            <span className="check">
              <svg
                className="check_svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="list_text">{item}</span>
          </li>
        ))}
      </List>
      <Button>Get Your Success</Button>
    </Card>
  );
};

export default StyledCard;
