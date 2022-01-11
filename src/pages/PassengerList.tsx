import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPassengersData } from '@api/passengers';
import { calcRem, colors } from '@styles/GlobalStyle';
import { PassengersData } from 'types';

const PassengerList = () => {
  const [newPassengersData, setNewPassengersData] = useState<PassengersData[]>(
    []
  );
  const [page, setPage] = useState<number>(0);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const loadData = async (page: number) => {
      try {
        const response = await fetch(getPassengersData(page));
        const json = await response.json();
        const newData = [...newPassengersData, ...json.data];

        setNewPassengersData(newData);

        setInit(true);
      } catch (error) {
        console.error(error);
      }
    };

    loadData(page);
  }, [page]);

  const onScrollHandler = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    clientHeight + scrollTop >= scrollHeight - 150 && setPage(page + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);
    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    };
  });

  return (
    <PassengerListContainer>
      <h2>Passenger List</h2>
      {init ? (
        <PassengersList>
          {newPassengersData.map((data) => {
            const airlineData = { ...data.airline[0] };
            const { name, trips, _id } = data;
            return (
              <PassengersListItem key={`passengers-${_id}`}>
                <PassengerContainer>
                  <span className="passenger">{name ? name : ''}</span>
                  <span className="trip-count">{trips ? trips : 0} trips</span>
                </PassengerContainer>
                <AirlineContainer>
                  <StyledLogo>
                    <img src={airlineData.logo} alt="airline logo" />
                  </StyledLogo>
                  <span>{airlineData.slogan}</span>
                </AirlineContainer>
                <PassengerId>{_id}</PassengerId>
              </PassengersListItem>
            );
          })}
        </PassengersList>
      ) : (
        <p className="loading-message">loading...</p>
      )}
    </PassengerListContainer>
  );
};

const PassengerListContainer = styled.div`
  min-height: 100%;
  padding: 0 ${calcRem(20)};

  h2 {
    margin: ${calcRem(20)} 0;
    color: ${colors.chartBlack};
    font-size: ${calcRem(24)};
  }
`;

const PassengersList = styled.ul`
  padding: 0;
`;

const PassengersListItem = styled.li`
  list-style: none;
  padding: ${calcRem(20)} 0;
  border-top: ${calcRem(1)} solid ${colors.lightGray};
  text-align: right;
`;

const PassengerContainer = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    display: inline-block;
    margin: 0;
  }

  .passenger {
    font-size: ${calcRem(16)};
    font-weight: 700;
  }

  .trip-count {
    font-size: ${calcRem(12)};
    font-weight: 600;
  }
`;

const AirlineContainer = styled.div`
  display: flex;
  margin-top: 10px;
  padding: ${calcRem(20)};
  background: ${colors.lightGray};
  align-items: center;

  span {
    margin-left: ${calcRem(10)};
    font-size: ${calcRem(14)};
  }
`;

const StyledLogo = styled.div`
  width: 80px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const PassengerId = styled.span`
  display: inline-block;
  margin-top: ${calcRem(20)};
  color: ${colors.darkGray};
  font-size: ${calcRem(12)};
  font-weight: 700;
`;

PassengerListContainer.displayName = 'PassengerListContainer';
PassengersList.displayName = 'PassengersList';
PassengersListItem.displayName = 'PassengersListItem';
PassengerContainer.displayName = 'PassengerContainer';
AirlineContainer.displayName = 'AirlineContainer';
StyledLogo.displayName = 'StyledLogo';
PassengerId.displayName = 'PassengerId';

export default PassengerList;
