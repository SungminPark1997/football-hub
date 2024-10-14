import dotenv from "dotenv";
import fetch from "node-fetch"; // node-fetch 패키지 필요

dotenv.config();

export const getUclMatches = async (req, res) => {
  const url =
    "https://api.football-data.org/v4/competitions/CL/matches?matchday=4";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_APIKEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();

    // 전체 경기 정보를 포함한 객체 생성
    const matchesData = {
      matches: data.matches.map((match) => ({
        id: match.id,
        utcDate: match.utcDate, // 경기 날짜 추가
        homeTeam: {
          id: match.homeTeam.id,
          name: match.homeTeam.name,
          crest: match.homeTeam.crest,
        },
        awayTeam: {
          id: match.awayTeam.id,
          name: match.awayTeam.name,
          crest: match.awayTeam.crest,
        },
      })),
    };

    res.json(matchesData); // 전체 데이터를 클라이언트로 전송
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
