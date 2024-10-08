import { MinoCell } from "./Mino";

type Props = {
  nextMinoForm: Array<Array<MinoCell>>;
  isPlayingNow: boolean;
  deleteRowNum: number;
  isGameOver: boolean;
};

export const Guide = (props: Props) => {
  const { nextMinoForm, isPlayingNow, deleteRowNum, isGameOver } = props;

  return (
    <>
      <div className="guide-next">
        <p>Next</p>
        <div className="container">
          {nextMinoForm.map((row, i) => {
            return (
              <div className="board-row">
                {row.map((cell) => {
                  switch (cell.minoType) {
                    case 0:
                      return <div className="display"></div>;
                      break;

                    case 1:
                      return <div className="wall-display"></div>;
                      break;

                    case 2:
                      return <div className="Imino-display"></div>;
                      break;

                    case 3:
                      return <div className="Omino-display"></div>;
                      break;

                    case 4:
                      return <div className="Tmino-display"></div>;
                      break;

                    case 5:
                      return <div className="Lmino-display"></div>;
                      break;

                    case 6:
                      return <div className="LminoR-display"></div>;
                      break;

                    case 7:
                      return <div className="Smino-display"></div>;
                      break;

                    case 8:
                      return <div className="SminoR-display"></div>;
                      break;

                    case 9:
                      return <div className="field-display"></div>;
                      break;
                  }
                })}
              </div>
            );
          })}
        </div>
        {isGameOver ? (
          <>
            <div>Game Over!</div>
            <div>Your score: {deleteRowNum}</div>{" "}
          </>
        ) : (
          <div></div>
        )}
        {isPlayingNow ? (
          <div>Delete Line: {deleteRowNum}</div>
        ) : (
          <div>Press to Start</div>
        )}
      </div>
    </>
  );
};
