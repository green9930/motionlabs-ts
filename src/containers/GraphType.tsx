import styled from 'styled-components';
import { calcRem, colors } from '@styles/GlobalStyle';

const GraphType = () => {
  return (
    <GraphTypeContainer>
      <LineType />
      <span>활동 주기</span>
      <BarType />
      <span>활동 기간 시작일 </span>
    </GraphTypeContainer>
  );
};

const GraphTypeContainer = styled.div`
  display: flex;
  margin-bottom: ${calcRem(20)};
  padding: ${calcRem(10)};
  align-items: center;
  justify-content: right;

  div {
    margin-right: ${calcRem(6)};
    color: ${colors.chartTypeBlack1};
  }

  span {
    color: ${colors.chartTypeBlack2};
  }
`;

const LineType = styled.div`
  width: ${calcRem(9)};
  height: ${calcRem(9)};
  border-radius: 50%;
  background: ${colors.chartBlack};
`;

const BarType = styled.div`
  width: ${calcRem(30)};
  height: ${calcRem(9)};
  margin-left: ${calcRem(18)};
  border-radius: ${calcRem(10)};
  background: ${colors.chartBlack};
`;

GraphTypeContainer.displayName = 'GraphTypeContainer';
LineType.displayName = 'LineType';
BarType.displayName = 'BarType';

export default GraphType;
