import { useEffect, useRef, useState } from "react";
import { Controller } from "./component/Controller";
import { Field } from "./component/Field";
import { useMino } from "./hooks/useMino";
import { MinoCell } from "./component/Mino";

import "./styles.css";
import { Guide } from "./component/Guide";
import { useBeginningField } from "./hooks/useBeginningField";

export default function App() {
  const [testNum, setTestNum] = useState<number>(0);
  const [isPlayingNow, setIsPlayingNow] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [deleteRowNum, setDeleteRowNum] = useState<number>(0);
  const [gameOverNum, setGameOverNum] = useState<number>(0);

  const { beginningField } = useBeginningField();
  const [field, setField] = useState<Array<Array<MinoCell>>>(beginningField);

  const shuffleArray = (array: Array<number>): Array<number> => {
    const cloneArray = [...array];

    for (let i = cloneArray.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      let tmpStorage = cloneArray[i];
      cloneArray[i] = cloneArray[rand];
      cloneArray[rand] = tmpStorage;
    }

    return cloneArray;
  };

  let { appearMino } = useMino();

  let minoOrder = useRef(shuffleArray([...Array(7)].map((_, i) => i + 1)));

  const [nextMinoForm, setNextMinoForm] = useState<Array<Array<MinoCell>>>(
    appearMino(minoOrder.current[1]).form
  );

  // ゲーム開始時の処理
  useEffect(() => {
    setField(beginningField);
    setIsGameOver(false);
    setDeleteRowNum(0);
    setTestNum((n) => n + 1);
  }, [gameOverNum]);

  // ミノがランダムで発生しつつも、どのミノも一週に一度は発生するように
  useEffect(() => {
    if (testNum === 7) {
      setTestNum(0);
      return;
    }
    setMino(appearMino(minoOrder.current[testNum]).form, 4, 0);

    if (testNum < 6) {
      setNextMinoForm(appearMino(minoOrder.current[testNum + 1]).form);
    } else {
      minoOrder.current = shuffleArray([...Array(7)].map((_, i) => i + 1));
      setNextMinoForm(appearMino(minoOrder.current[0]).form);
    }
  }, [testNum]);

  // 受け取ったミノを表示させる。
  const setMino = (mino: Array<Array<MinoCell>>, x: number, y: number) => {
    let nowField: Array<Array<MinoCell>> = [...field];
    mino.forEach((row, i) => {
      row.forEach((cell, j) => {
        nowField[i + y][j + x] = cell;
      });
    });

    setField(nowField);
  };

  return (
    <div className="App">
      <div>
        <Field field={field} setField={setField} />
      </div>
      <div className="container">
        <Guide
          nextMinoForm={nextMinoForm}
          isPlayingNow={isPlayingNow}
          deleteRowNum={deleteRowNum}
          isGameOver={isGameOver}
        />
        <Controller
          field={field}
          setField={setField}
          setTestNum={setTestNum}
          isPlayingNow={isPlayingNow}
          setIsPlayingNow={setIsPlayingNow}
          setDeleteRowNum={setDeleteRowNum}
          isGameOver={isGameOver}
          setIsGameOver={setIsGameOver}
          nextMino={nextMinoForm}
          gameOverNum={gameOverNum}
          setGameOverNum={setGameOverNum}
        />
      </div>
    </div>
  );
}
