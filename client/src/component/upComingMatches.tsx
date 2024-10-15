import React from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  fetchUpcomingClMatches,
  fetchUpcomingPlMatches,
} from "../api/footballApi";

interface Team {
  id: number;
  name: string;
  crest: string;
}

interface UpcomingMatch {
  id: number;
  utcDate: string;
  homeTeam: Team;
  awayTeam: Team;
}

interface UpcomingMatchResponse {
  matches: UpcomingMatch[];
}
const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;
const UpcommingMatchesWrapper = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 30px;
`;
const UpcommingMatchTitle = styled.div`
  width: 100%;
  padding-bottom: 10px;
  font-size: 1.5em;
`;
const MatchItem = styled.div`
  height: 200px;
  border: 1px solid #dee2e6;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;

  .slick-slide {
    transition: transform 0.3s; /* 슬라이드 애니메이션 효과 */
    padding: 0 10px;
  }

  .slick-prev,
  .slick-next {
    z-index: 3; /* 버튼을 앞으로 이동 */
    border-radius: 50%; /* 버튼 모양을 원형으로 */
    width: 50px; /* 버튼 폭 설정 */
    height: 50px; /* 버튼 높이 설정 */
    display: flex; /* Flexbox 사용 */
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */

    background-color: white; /* 기본 배경색 */
    cursor: pointer; /* 커서 포인터로 변경 */
    transition: background-color 0.3s, color 0.3s; /* 부드러운 전환 효과 */
  }

  .slick-prev {
    left: 10px; /* 왼쪽 버튼 위치 조정 */
  }

  .slick-next {
    right: 10px; /* 오른쪽 버튼 위치 조정 */
  }

  .slick-prev::before,
  .slick-next::before {
    display: none; /* 기본 화살표 아이콘 숨김 */
  }
  .slick-list {
    margin: 0 -10px; /* 전체 슬라이더의 여백 보정을 위해 좌우 마이너스 마진 설정 */
  }
  .slick-prev::after {
    content: "◀"; /* 왼쪽 화살표 아이콘 */
    font-size: 20px;
    color: black; /* 기본 색상 */
    line-width: 50px;
    line-height: 50px;
  }

  .slick-next::after {
    content: "▶"; /* 오른쪽 화살표 아이콘 */
    font-size: 20px;
    color: black; /* 기본 색상 */
    line-height: 50px;
  }

  .slick-prev:hover,
  .slick-next:hover {
    background-color: #343a40; /* hover 시 배경색 */
    color: white; /* hover 시 글자 색상 */
  }
`;

const MatchDate = styled.span`
  font-size: 0.9rem;
  color: #868e96;
`;

const Teams = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #343a40;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  img {
    width: 30px;
    height: 30px;
    margin: 5px 0;
  }
`;
const Team = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const MatchTime = styled.div`
  font-size: 0.8rem;
  color: #495057;

  position: absolute;
  bottom: 5px;

  align-items: flex-end;
`;

export default function UpcomingMatches() {
  const {
    data: uclData,
    isLoading: isLoadingUclData,
    isError: idErrorUclData,
  } = useQuery<UpcomingMatchResponse>({
    queryKey: ["upcomingClMatches"],
    queryFn: fetchUpcomingClMatches,
  });
  const {
    data: eplData,
    isLoading: isLoadingEplData,
    isError: isErrorEplData,
  } = useQuery<UpcomingMatchResponse>({
    queryKey: ["upcomingPlMatches"],
    queryFn: fetchUpcomingPlMatches,
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
  };

  if (isLoadingUclData) return <div>Loading...</div>;
  if (idErrorUclData) return <div>Error fetching matches</div>;

  return (
    <Wrapper>
      <UpcommingMatchTitle>챔피언스리그 일정</UpcommingMatchTitle>
      <UpcommingMatchesWrapper>
        <StyledSlider {...settings}>
          {uclData?.matches?.map((match) => (
            <MatchItem key={match.id}>
              <MatchDate>
                {new Date(match.utcDate).toLocaleDateString()}
              </MatchDate>
              <Teams>
                <Team>
                  {" "}
                  <img src={match.homeTeam.crest} alt={match.homeTeam.name} />
                  {match.homeTeam.name + "(Home)"}
                </Team>
                <Team>
                  {" "}
                  <img src={match.awayTeam.crest} alt={match.awayTeam.name} />
                  {match.awayTeam.name + "(Away)"}
                </Team>
              </Teams>
              <MatchTime>
                {new Date(match.utcDate).toLocaleTimeString().slice(0, -3)}
              </MatchTime>
            </MatchItem>
          ))}
        </StyledSlider>
      </UpcommingMatchesWrapper>
      <UpcommingMatchTitle>프리미어리그 일정</UpcommingMatchTitle>
      <UpcommingMatchesWrapper>
        <StyledSlider {...settings}>
          {eplData?.matches?.map((match) => (
            <MatchItem key={match.id}>
              <MatchDate>
                {new Date(match.utcDate).toLocaleDateString()}
              </MatchDate>
              <Teams>
                <Team>
                  {" "}
                  <img src={match.homeTeam.crest} alt={match.homeTeam.name} />
                  {match.homeTeam.name + "(Home)"}
                </Team>
                <Team>
                  {" "}
                  <img src={match.awayTeam.crest} alt={match.awayTeam.name} />
                  {match.awayTeam.name + "(Away)"}
                </Team>
              </Teams>
              <MatchTime>
                {new Date(match.utcDate).toLocaleTimeString().slice(0, -3)}
              </MatchTime>
            </MatchItem>
          ))}
        </StyledSlider>
      </UpcommingMatchesWrapper>
    </Wrapper>
  );
}
