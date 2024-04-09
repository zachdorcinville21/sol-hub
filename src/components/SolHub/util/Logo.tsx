import { useScreenSize } from "../../util/hooks/useScreenSize";

export const Logo = () => {
  const { screenWidth } = useScreenSize();

  const logoWidth = "w-24 sm:w-36 md:w-44 lg:w-44 xl:w-48 2xl:w-52";

  return (
    <div
      className={`absolute ${logoWidth} top-6 left-6 rounded bg-gradient-to-r p-1.5 text-center from-green-400 via-blue-300 to-purple-500`}
      style={{ boxShadow: "0px 0px 16px #a855f7" }}
    >
      <div className="text-4xl" style={{ fontFamily: "Barlow Condensed" }}>
        {screenWidth <= 640 ? "$SH" : "$SOLhub"}
      </div>
    </div>
  );
};
