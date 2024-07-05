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
  padding-top: 60px;
  z-index: 1000; /* 사이드바를 가장 위에 표시 */
`;
export default function SideBar({ isVisible }: SidebarProps) {
  return (
    <SidebarWrapper isVisible={isVisible}>
      <div>Menu Item 1</div>
      <div>Menu Item 2</div>
      <div>Menu Item 3</div>
    </SidebarWrapper>
  );
}
