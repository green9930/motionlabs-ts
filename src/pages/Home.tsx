import styled from 'styled-components';
import { calcRem, colors } from '@styles/GlobalStyle';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <HomeList>
      <HomeListItem key="motionlabs-report">
        <Link to="/report">
          <span>레포트</span>
        </Link>
      </HomeListItem>
      <HomeListItem key="motionlabs-passenger">
        <Link to="/passenger">
          <span>승객목록</span>
        </Link>
      </HomeListItem>
    </HomeList>
  );
};

const HomeList = styled.ul`
  padding: ${calcRem(40)};
`;

const HomeListItem = styled.li`
  margin: ${calcRem(40)};
  color: ${colors.black};
  font-size: ${calcRem(18)};
  font-weight: 700;
`;

HomeList.displayName = 'HomeList';
HomeListItem.displayName = 'HomeListItem';

export default Home;
