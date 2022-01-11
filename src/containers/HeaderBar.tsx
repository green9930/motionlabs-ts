import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { calcRem, colors } from '@styles/GlobalStyle';

const HeaderBar = () => {
  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <h2>Motionlabs</h2>
        </Link>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding: ${calcRem(20)};
  background: ${colors.black};

  h2 {
    margin: 0;
    color: ${colors.white};
    font-size: ${calcRem(24)};
  }
`;

StyledHeader.displayName = 'StyledHeader';

export default HeaderBar;
