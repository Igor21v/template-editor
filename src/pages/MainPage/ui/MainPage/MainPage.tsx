import { memo } from "react";
import cls from "./MainPage.module.css";

interface MainPageProps {}

export const MainPage = memo((props: MainPageProps) => {
  const {} = props;
  return <div className={cls.MainPage}></div>;
});
