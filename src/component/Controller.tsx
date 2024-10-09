import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { MinoCell } from "./Mino";

type Props = {
  field: Array<Array<MinoCell>>;
  setField: Dispatch<SetStateAction<Array<Array<MinoCell>>>>;
  setMinoCount: Dispatch<SetStateAction<number>>;
  isPlayingNow: boolean;
  setIsPlayingNow: Dispatch<SetStateAction<boolean>>;
  setDeleteRowNum: Dispatch<SetStateAction<number>>;
  isGameOver: boolean;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  nextMino: Array<Array<MinoCell>>;
};

const space: MinoCell = {
  minoType: 0,
  isFinished: false,
  isCore: false,
};

const wall: MinoCell = {
  minoType: 1,
  isFinished: true,
  isCore: false,
};

const minoField: MinoCell = {
  minoType: 9,
  isFinished: false,
  isCore: false,
};

export const Controller = (props: Props) => {
  const {
    field,
    setField,
    setMinoCount,
    isPlayingNow,
    setIsPlayingNow,
    setDeleteRowNum,
    isGameOver,
    setIsGameOver,
    nextMino,
  } = props;

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // 動かす向き(左: 負、右: 正)、動くマスの数(絶対値)を受け取り、動かす関数
  const moveHorizontal = (moveVec: number) => {
    let nextField: Array<Array<MinoCell>> = [...field];

    const moveField: Array<[number, number, MinoCell]> = [];
    const moveCells: Array<[number, number, MinoCell]> = []; // こっちはミノの部分だけ

    nextField.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (!cell.isFinished && cell.minoType) {
          nextField[i][j] = space;
          const nowCell = { ...cell };
          moveField.push([i, j, nowCell]);
          if (nowCell.minoType !== 9) {
            moveCells.push([i, j, nowCell]);
          }
        }
      });
    });

    // 指定された方向にミノを移動できるか確認
    if (checkMovable(moveCells, moveVec, 0)) {
      // 出来たら指定された方向に移動
      moveField.forEach(([i, j, nowCell]) => {
        // 壁と重ならないセルのみ動かす
        if (!nextField[i][j + moveVec].isFinished) {
          nextField[i][j + moveVec] = nowCell;
        }
      });

      // fieldを戻す処理
      if (moveField.length !== 16) {
        let nextCell;
        for (let i = 0; i < 4; i++) {
          if (moveVec > 0) {
            nextCell = moveField[3 * i];
          } else {
            nextCell = moveField[3 * i + 2];
          }
          nextField[nextCell[0]][nextCell[1]] = minoField;
        }
      }
    } else {
      // 出来なかったら、
      // なくなっている箇所を戻す
      moveField.forEach(([i, j, nowCell]) => {
        nextField[i][j] = nowCell;
      });
    }
    setField(nextField);
  };

  const moveDown = async () => {
    let nextField: Array<Array<MinoCell>> = [...field];

    const moveField: Array<[number, number, MinoCell]> = [];
    const moveCells: Array<[number, number, MinoCell]> = [];

    nextField.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (!cell.isFinished && cell.minoType) {
          nextField[i][j] = space;
          const nowCell = { ...cell };
          moveField.push([i, j, nowCell]);
          if (nowCell.minoType !== 9) {
            moveCells.push([i, j, nowCell]);
          }
        }
      });
    });

    // 下にミノを移動できるか確認
    if (checkMovable(moveCells, 0, 1)) {
      // できたら下に移動
      moveField.forEach(([i, j, nowCell]) => {
        // 床と重ならないセルのみ動かす
        if (!nextField[i + 1][j].isFinished) {
          nextField[i + 1][j] = nowCell;
        }
      });
      setField(nextField);
      // Fieldが壁、置かれたミノと重なってしまう場合、それで上書きする
    } else {
      // 出来なかったら、
      // なくなっている箇所を戻す
      moveField.forEach(([i, j, nowCell]) => {
        nextField[i][j] = nowCell;
      });

      // そして固定する
      nextField.forEach((row, i) => {
        row.map((cell, j) => {
          if (!cell.isFinished && cell.minoType) {
            nextField[i][j].isFinished = true;
            if (cell.minoType === 9) {
              nextField[i][j].isFinished = false;
              nextField[i][j].minoType = 0;
            }
          }
        });
      });
      console.log(nextField);

      deleteCompleteRow(nextField);

      await sleep(1000);

      if (checkCanPutNextMino(nextMino)) {
        setMinoCount((n) => n + 1);
      } else {
        setIsPlayingNow(false);
        setIsGameOver(true);
      }
    }
  };
  const moveDownRapidly = async () => {
    let nextField: Array<Array<MinoCell>> = [...field];

    const moveField: Array<[number, number, MinoCell]> = [];
    const moveCells: Array<[number, number, MinoCell]> = [];

    nextField.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (!cell.isFinished && cell.minoType) {
          nextField[i][j] = space;
          const nowCell = { ...cell };
          moveField.push([i, j, nowCell]);
          if (nowCell.minoType !== 9) {
            moveCells.push([i, j, nowCell]);
          }
        }
      });
    });

    if (moveField.length === 0) {
      return;
    }

    // 下に置かれているブロックを探す
    let depth: number = 0;
    while (checkMovable(moveCells, 0, depth)) {
      depth++;
    }

    // 置くことができるもっとも下の位置にミノを置く
    moveField.forEach(([i, j, nowCell]) => {
      // 床と重ならないセルのみ動かす
      if (!nextField[i + depth - 1][j].isFinished) {
        nextField[i + depth - 1][j] = nowCell;
      }
    });

    // そして固定する
    nextField.forEach((row, i) => {
      row.map((cell, j) => {
        if (!cell.isFinished && cell.minoType) {
          nextField[i][j].isFinished = true;
          if (cell.minoType === 9) {
            nextField[i][j].isFinished = false;
            nextField[i][j].minoType = 0;
          }
        }
      });
    });
    // setField(nextField);
    deleteCompleteRow(nextField);

    await sleep(1000);

    if (checkCanPutNextMino(nextMino)) {
      setMinoCount((n) => n + 1);
    } else {
      setIsPlayingNow(false);
      setIsGameOver(true);
    }
  };

  // 回転の向きを受け取り、その方向にミノを回転させる関数
  const rotateMino = (direction: "left" | "right") => {
    let nextField: Array<Array<MinoCell>> = [...field];

    const moveSquares: Array<[number, number, MinoCell]> = [];

    nextField.forEach((row, i) => {
      row.forEach((cell, j) => {
        // 現在動かしているspaceでないブロックを取得
        if (!cell.isFinished && cell.minoType) {
          console.log(cell);

          nextField[i][j] = space;
          const nowCell = { ...cell };
          moveSquares.push([i, j, nowCell]);
        }
      });
    });

    // fieldに他ブロックが重なっているとき、処理を終了
    if (moveSquares.length !== 16) {
      // なくなっている箇所を戻す
      moveSquares.forEach(([i, j, nowCell]) => {
        nextField[i][j] = nowCell;
      });
      return;
    }

    // 現在動かすミノを取得
    let rotateField: Array<Array<MinoCell>> = [
      [space, space, space, space],
      [space, space, space, space],
      [space, space, space, space],
      [space, space, space, space],
    ];

    const corner = moveSquares[0];
    moveSquares.forEach((squares, i) => {
      rotateField[Math.floor(i / 4)][i % 4] = squares[2];
    });

    console.log(moveSquares);
    console.log(rotateField);

    // 指定された向きに90度回転
    let resultField: Array<Array<MinoCell>>;
    if (direction === "left") {
      // 左向きの場合
      resultField = rotateField.map((row, i) => {
        return row.map((square, j) => {
          return rotateField[j][rotateField.length - 1 - i];
        });
      });
    } else {
      // 右向きの場合
      resultField = rotateField.map((row, i) => {
        return row.map((square, j) => {
          return rotateField[rotateField.length - 1 - j][i];
        });
      });
    }

    // フィールドに描画;
    resultField.forEach((row, i) => {
      row.forEach((square, j) => {
        nextField[corner[0] + i][corner[1] + j] = square;
      });
    });

    setField(nextField);
  };

  // 動かすミノの場所、動かしたい方向を受け取る関数
  const checkMovable = (
    nowArea: Array<[number, number, MinoCell]>,
    x: number,
    y: number
  ): boolean => {
    let isMovable = true;
    nowArea.forEach(([i, j]) => {
      if (field[i + y][j + x].isFinished) {
        console.log("行けません");

        isMovable = false;
      }
    });

    return isMovable;
  };

  const deleteCompleteRow = (nowField: Array<Array<MinoCell>>) => {
    // const nowField: Array<Array<MinoCell>> = [...field];
    let completeRowsIndex: Array<number> = [];

    nowField.forEach((row, i) => {
      // 置かれたミノで埋まっている行を探す
      // 床を除く
      if (row.find((square) => square.minoType !== 1) !== undefined) {
        if (row.find((square) => square.isFinished === false) === undefined) {
          console.log("列消えました");
          completeRowsIndex.push(i);
        }
      }
    });

    console.log(completeRowsIndex);

    completeRowsIndex.forEach((index) => {
      for (let i = index - 1; i > 0; i--) {
        for (let j = 0; j < nowField[1].length; j++) {
          nowField[i + 1][j] = nowField[i][j];
        }
      }
    });

    console.log(nowField);

    setField(nowField);
    setDeleteRowNum((n) => n + completeRowsIndex.length);
  };

  // 次のミノが重ならず表示できるか確認する関数
  const checkCanPutNextMino = (nextMino: Array<Array<MinoCell>>) => {
    let nowField: Array<Array<MinoCell>> = [...field];
    let isCanPut: boolean = true;
    nextMino.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (nowField[i][j + 4].minoType != 0) {
          isCanPut = false;
        }
      });
    });

    return isCanPut;
  };

  // 一定時間ごとにミノを降ろしていく
  const intervalId = useRef<number | null>(null);

  const startAutoFall = () => {
    if (intervalId.current) return;
    intervalId.current = window.setInterval(moveDown, 1000);
  };

  const stopAutoFall = () => {
    if (!intervalId.current) return;
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  useEffect(() => {
    if (isGameOver) {
      stopAutoFall();
      console.log("終了しました");
    }
  }, [isGameOver]);

  return (
    <>
      <div className="buttonContainer">
        <div>
          <div>
            <button onClick={moveDownRapidly}>⬆</button>
          </div>
        </div>
        <div>
          <div>
            <button onClick={() => moveHorizontal(-1)}>⬅</button>
            <button onClick={moveDown}>⬇</button>
            <button onClick={() => moveHorizontal(1)}>⮕</button>
          </div>
        </div>
        <div>
          <div>
            <button onClick={() => rotateMino("right")}>⟳</button>
            <button onClick={() => rotateMino("left")}>⟲</button>
          </div>
        </div>
        <div>
          <div>
            {isGameOver ? (
              <button
                onClick={() => {
                  setIsGameOver(false);
                }}
              >
                restart
              </button>
            ) : isPlayingNow ? (
              <button
                onClick={() => {
                  stopAutoFall();
                  setIsPlayingNow(false);
                }}
              >
                stop
              </button>
            ) : (
              <button
                onClick={() => {
                  startAutoFall();
                  setIsPlayingNow(true);
                }}
              >
                start
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
