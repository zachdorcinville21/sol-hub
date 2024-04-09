import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useScreenSize } from "../../util/hooks/useScreenSize";
import { useNavigate } from "react-router-dom";

interface StatsProps {
  price: string | null;
  change: string | null;
  balance: number | null;
  connected: boolean;
  openTransModal: () => void;
}

const Stats = ({
  price,
  change,
  balance,
  connected,
  openTransModal,
}: StatsProps) => {
  const { screenWidth } = useScreenSize();
  const navigate = useNavigate();

  const negative: boolean = change !== null && change.includes("-");
  const solPrice: string =
    price !== null ? `$${parseFloat(price!).toFixed(2)}` : "";
  const solChange: string =
    change !== null
      ? negative
        ? `${parseFloat(change!).toFixed(2)}%`
        : `+${parseFloat(change!).toFixed(2)}%`
      : "";

  const containerWidth: string = screenWidth <= 576 ? "20rem" : "24rem";

  // const statsWidth: string = 'w-8/12 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-96';

  const paperStyles = makeStyles({
    paper: {
      width: containerWidth,
      backgroundColor: "#000",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem",
    },
  });

  const classes = paperStyles();

  return (
    <Paper elevation={6} classes={{ root: classes.paper }}>
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <div className="w-full flex flex-row justify-center items-center">
          <img
            src="https://sticnuru.sirv.com/sol-hub-imgs/solana.png"
            className="w-10 h-10"
            alt="solana"
          />
          <p className="text-3xl text-white font-normal font-noto flex items-center gap-2">
            Solana <sub className="text-base text-gray-400 mb-0.5">SOL</sub>
          </p>
        </div>
        <div className="w-full flex flex-row gap-1 justify-center items-center">
          <p className="text-white text-3xl font-normal font-anek">
            {solPrice}
          </p>
          <div className="flex flex-row gap-2 items-center justify-center">
            <sup
              className={
                negative
                  ? "text-red-700 font-noto text-base flex flex-row gap-1 items-center"
                  : "text-green-600 font-noto text-sm flex flex-row gap-1 items-center"
              }
            >
              {solChange}
              <small className="text-white text-sm font-noto">(1D)</small>
            </sup>
          </div>
        </div>
      </div>

      {connected && (
        <div className="w-full flex flex-col justify-center items-center gap-3">
          <div className="w-full flex justify-center">
            <p className="text-white font-noto font-light text-lg">{`Current balance: ${
              balance ?? 0
            } SOL`}</p>
          </div>
          <div className="w-full flex gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/collectibles")}
              className="bg-blue-600 p-2 text-white font-noto w-2/4 rounded transition-colors hover:bg-blue-800"
            >
              View collectibles
            </button>
            <button
              onClick={openTransModal}
              className="bg-blue-600 p-2 text-white font-noto w-2/4 rounded transition-colors hover:bg-blue-800"
            >
              Send SOL
            </button>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Stats;
