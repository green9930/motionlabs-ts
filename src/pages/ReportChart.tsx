import { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { calcRem, colors } from '@styles/GlobalStyle';
import { getUsersData } from '@api/users';
import GraphType from '@containers/GraphType';
import { UserData } from 'types';

const ReportChart = () => {
  const [newUserReport, setNewUserReport] = useState<UserData[]>([]);
  const [init, setInit] = useState(false);

  const WIDTH = 556;
  const HEIGHT = 160;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(getUsersData());
        const json = await response.json();
        const userData: UserData[] = json.data;

        const userPeriod = userData.map((user) => user.period);
        const maxPeriod = Math.max(...userPeriod);
        const periodLength = userPeriod.map((period) =>
          Math.round((period / maxPeriod) * 100)
        );

        const userCycle = userData.map((user) => user.cycle);
        const MaxCycle = Math.max(...userCycle);
        const cycleY = userCycle.map(
          (cycle) => HEIGHT - Math.round((cycle / MaxCycle) * 100)
        );

        const cycleX = userData.map((_, index) => {
          return (WIDTH * (index + 1)) / (userData.length + 1);
        });

        const newUserData = userData.map((user, index) => {
          user.periodLength = periodLength[index];
          user.cycleX = cycleX[index];
          user.cycleY = cycleY[index];
          return user;
        });

        setNewUserReport(newUserData);

        // console.log(newUserData);
        setInit(true);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <UserReportContainer>
      <h2>User Report</h2>
      <ChartContainer>
        <GraphType />
        {init ? (
          <>
            <LineGraphContainer>
              <svg width={WIDTH} height={HEIGHT}>
                {newUserReport.map((data, index, arr) => {
                  const { cycle, cycleX, cycleY } = data;
                  return (
                    <Fragment key={`point-${cycle}`}>
                      {index < arr.length - 1 ? (
                        <line
                          x1={cycleX}
                          y1={cycleY}
                          x2={arr[index + 1].cycleX}
                          y2={arr[index + 1].cycleY}
                          stroke={colors.chartTypeBlack1}
                          strokeWidth="2"
                        ></line>
                      ) : null}
                      <circle
                        cx={cycleX}
                        cy={cycleY}
                        r="4.5"
                        fill={colors.chartTypeBlack1}
                      ></circle>
                    </Fragment>
                  );
                })}
              </svg>
              {newUserReport.map((data) => {
                const { cycle, cycleX, cycleY } = data;
                return (
                  <LineCycle
                    key={`line-${cycle}`}
                    top={cycleY - 30}
                    left={cycleX - 12}
                    cycle={cycle}
                  >
                    <span>{cycle}일</span>
                  </LineCycle>
                );
              })}
            </LineGraphContainer>
            <BarGraphContainer>
              {newUserReport.map((user) => {
                return (
                  <BarContainer key={user.startDate}>
                    <div className="bar-period">
                      <span>{user.period}일</span>
                    </div>
                    <BarContent periodLength={user.periodLength} />
                    <div className="bar-start-date">
                      <span>
                        {user.startDate[5]}
                        {user.startDate[6]}/{user.startDate[8]}
                        {user.startDate[9]}
                      </span>
                    </div>
                  </BarContainer>
                );
              })}
            </BarGraphContainer>
          </>
        ) : (
          <p className="loading-message">loading...</p>
        )}
      </ChartContainer>
    </UserReportContainer>
  );
};

const UserReportContainer = styled.div`
  padding: ${calcRem(20)};

  h2 {
    color: ${colors.chartBlack};
    font-size: ${calcRem(24)};
    font-weight: 700;
  }
`;

const ChartContainer = styled.div`
  border: ${calcRem(1)} solid ${colors.chartGray};
  border-radius: ${calcRem(10)};
`;

const LineGraphContainer = styled.div`
  position: relative;
`;

const LineCycle = styled.div<{ top: number; left: number; cycle: number }>`
  position: absolute;
  top: ${({ top }) => calcRem(top)};
  left: ${({ left }) => calcRem(left)};

  span {
    color: ${({ cycle }) =>
      cycle >= 100 ? colors.red : colors.chartTypeBlack3};
    font-size: ${calcRem(12)};
    font-weight: 600;
  }
`;

const BarGraphContainer = styled.div`
  display: flex;
  margin-top: ${calcRem(40)};
  padding: ${calcRem(20)} ${calcRem(46.5)};
  align-items: flex-end;
  justify-content: space-between;
`;

const BarContainer = styled.div`
  display: flex;
  width: ${calcRem(93)};
  flex-direction: column;
  align-items: center;
  font-size: ${calcRem(12)};

  .bar-period {
    margin-bottom: ${calcRem(3)};
    color: ${colors.chartTypeBlack4};
    font-weight: 700;
  }

  .bar-start-date {
    margin-top: ${calcRem(5)};
    color: ${colors.chartTypeBlack4};
  }
`;

const BarContent = styled.div<{ periodLength: number }>`
  width: ${calcRem(30)};
  height: ${({ periodLength }) => calcRem(periodLength)};
  border-radius: ${calcRem(10)};
  background: ${colors.chartTypeBlack5};
`;

export default ReportChart;
