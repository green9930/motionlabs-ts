import styled from 'styled-components';
import { calcRem, colors } from '@styles/GlobalStyle';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <StyledUl>
      <StyledLi key="motionlabs-report">
        <Link to="/report">
          <span>레포트</span>
        </Link>
      </StyledLi>
      <StyledLi key="motionlabs-passenger">
        <Link to="/passenger">
          <span>승객목록</span>
        </Link>
      </StyledLi>
    </StyledUl>
  );
};

const StyledUl = styled.ul`
  padding: ${calcRem(40)};
`;

const StyledLi = styled.li`
  margin: ${calcRem(40)};
  color: ${colors.black};
  font-size: ${calcRem(18)};
  font-weight: 700;
`;

StyledUl.displayName = 'StyledUl';
StyledLi.displayName = 'StyledLi';

export default Home;
