import styled from "styled-components";

interface SidebarProps {
  isVisible: boolean;
}
const SidebarWrapper = styled.div<SidebarProps>`
  width: 250px;
  height: 100vh;
  background-color: #444;
  color: white;
  position: fixed;
  left: ${(props) => (props.isVisible ? "0" : "-250px")};
  transition: left 0.3s ease;
  padding-top: 10%
  z-index: 1000; /* 사이드바를 가장 위에 표시 */
`;

const MenuItem = styled.div`
  padding: 10px;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;
export default function SideBar({ isVisible }: SidebarProps) {
  return (
    <SidebarWrapper isVisible={isVisible}>
      <MenuItem>국내축구</MenuItem>
      <MenuItem>해외축구</MenuItem>
      <MenuItem>국가대항</MenuItem>
      <MenuItem>기사</MenuItem>
      <MenuItem>기록</MenuItem>
      <MenuItem></MenuItem>
    </SidebarWrapper>
  );
}
