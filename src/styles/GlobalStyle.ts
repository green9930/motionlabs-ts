import { createGlobalStyle } from 'styled-components';

export const calcRem = (size: number) => `${size / 10}rem`;

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  chartBlack: '#242424',
  chartTypeBlack1: '#222222',
  chartTypeBlack2: '#606060',
  chartTypeBlack3: '#707070',
  chartTypeBlack4: '#555555',
  chartTypeBlack5: '#333333',
  bgGray: '#F1F3F9',
  darkGray: '#D3D3D3',
  lightGray: '#F2F2F2',
  chartGray: '#EAEAEA',
  red: '#FF0000',
};

const GlobalStyle = createGlobalStyle`
html {
  font-size: 10px;
  background: ${colors.bgGray};
}

body {
  background: ${colors.white};
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 600px;
  height: 100%;
  min-height: 100vh;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
}

h1 {
  margin: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

.loading-message {
    text-align: center;
    font-size: ${calcRem(24)};
    font-weight: 700;
  }
`;

export default GlobalStyle;
