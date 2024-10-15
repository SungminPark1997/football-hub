// src/@types/react-slick.d.ts
declare module "react-slick" {
  import * as React from "react";

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    // 추가 설정이 필요하면 여기에 정의
  }

  export class Slider extends React.Component<Settings, any> {}

  export default Slider;
}
