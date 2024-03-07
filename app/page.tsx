import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("./home-container-view"),
  { ssr: false }
);

const Home = () => {
  return <DynamicComponentWithNoSSR />;
};

export default Home;
