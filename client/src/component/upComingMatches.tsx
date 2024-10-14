import React from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Team {
  id: number;
  name: string;
  crest: string;
}

interface UpcomingUclMatch {
  id: number;
  utcDate: string;
  homeTeam: Team;
  awayTeam: Team;
}

interface UpcomingUclMatchResponse {
  matches: UpcomingUclMatch[];
}
const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;
const UpcommingMatchesWrapper = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  align-items: center;
  overflow: hidden;
`;
const UpcommingMatchTitle = styled.div`
  width: 100%;
  padding-bottom: 10px;
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
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;

  .slick-slide {
    margin: 0 10px; /* 슬라이드 간격 */
    transition: transform 0.3s; /* 슬라이드 애니메이션 효과 */
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

  .slick-prev::after {
    content: "◀"; /* 왼쪽 화살표 아이콘 */
    font-size: 20px;
    color: black; /* 기본 색상 */
  }

  .slick-next::after {
    content: "▶"; /* 오른쪽 화살표 아이콘 */
    font-size: 20px;
    color: black; /* 기본 색상 */
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

  img {
    width: 30px;
    height: 30px;
    margin: 5px 0;
  }
`;

const MatchTime = styled.span`
  font-size: 0.8rem;
  color: #495057;
`;

const fetchUpcomingMatches = async () => {
  const response = await fetch("http://localhost:5000/api/match/cl");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function UpcomingMatches() {
  const { data, isLoading, isError } = useQuery<UpcomingUclMatchResponse>({
    queryKey: ["upcomingMatches"],
    queryFn: fetchUpcomingMatches,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // 화면에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한번에 스크롤할 슬라이드 수
    arrows: true,
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching matches</div>;

  return (
    <Wrapper>
      <UpcommingMatchTitle>챔피언스리그 일정</UpcommingMatchTitle>
      <UpcommingMatchesWrapper>
        <StyledSlider {...settings}>
          {data?.matches?.map((match) => (
            <MatchItem key={match.id}>
              <MatchDate>
                {new Date(match.utcDate).toLocaleDateString()}
              </MatchDate>
              <Teams>
                <img src={match.homeTeam.crest} alt={match.homeTeam.name} />
                {match.homeTeam.name} vs{" "}
                <img src={match.awayTeam.crest} alt={match.awayTeam.name} />
                {match.awayTeam.name}
              </Teams>
              <MatchTime>
                {new Date(match.utcDate).toLocaleTimeString()}
              </MatchTime>
            </MatchItem>
          ))}
        </StyledSlider>
      </UpcommingMatchesWrapper>
    </Wrapper>
  );
}
