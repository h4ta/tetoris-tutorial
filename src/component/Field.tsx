import { Dispatch, SetStateAction } from "react";
import { MinoCell } from "./Mino";

type Props = {
  field: Array<Array<MinoCell>>;
  setField: Dispatch<SetStateAction<Array<Array<MinoCell>>>>;
};

export const Field = (props: Props) => {
  const { field } = props;

  return (
    <>
      {field.map((row, i) => {
        if (i < 2) {
          // 描写しない部分
          return;
        } else {
          return (
            <div className="board-row">
              {row.map((cell) => {
                switch (cell.minoType) {
                  case 0:
                    return <div className="space"></div>;
                    break;

                  case 1:
                    return <div className="wall"></div>;
                    break;

                  case 2:
                    return <div className="Imino"></div>;
                    break;

                  case 3:
                    return <div className="Omino"></div>;
                    break;

                  case 4:
                    return <div className="Tmino"></div>;
                    break;

                  case 5:
                    return <div className="Lmino"></div>;
                    break;

                  case 6:
                    return <div className="LminoR"></div>;
                    break;

                  case 7:
                    return <div className="Smino"></div>;
                    break;

                  case 8:
                    return <div className="SminoR"></div>;
                    break;

                  case 9:
                    return <div className="field"></div>;
                    break;
                }
              })}
            </div>
          );
        }
      })}
    </>
  );
};
