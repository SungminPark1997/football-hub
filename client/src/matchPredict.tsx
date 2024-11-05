import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface PredictBarProps {
  percentage: number;
}

interface LogoProps {
  bgColor: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DataContainer = styled.div`
  border: 2px solid rgb(155, 89, 182);
  width: 70%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.img<LogoProps>`
  width: 150px;
  height: 150px;
  object-fit: contain;
  background-color: ${(props) => props.bgColor};
  padding: 10px;
  border-radius: ${(props) =>
    props.bgColor === "#ff4d4d" ? "10px 0 0 10px" : "0 10px 10px 0"};
`;

const PredictionBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  background-color: #ddd;

  overflow: hidden;
`;

const PredictionBar = styled.div<PredictBarProps>`
  height: 100%;
  transition: width 0.3s ease;
  background: ${(props) =>
    props.color === "red"
      ? "linear-gradient(90deg, #ff4d4d, #ff9999)"
      : "linear-gradient(90deg, #9999ff, #4d4dff)"};
  width: ${(props) => props.percentage}%;
`;

export default function MatchPredict() {
  const matchData = useLocation().state;

  const homePercentage = 40;
  const awayPercentage = 60;

  return (
    <Wrapper>
      <DataContainer>
        <Logo
          src={matchData.homeTeam.crest}
          bgColor="#ff4d4d"
          alt="Home Team Logo"
        />
        <PredictionBarContainer>
          <PredictionBar color="red" percentage={homePercentage} />
          <PredictionBar color="blue" percentage={awayPercentage} />
        </PredictionBarContainer>
        <Logo
          src={matchData.awayTeam.crest}
          bgColor="#4d4dff"
          alt="Away Team Logo"
        />
      </DataContainer>
    </Wrapper>
  );
}
