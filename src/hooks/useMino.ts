import { useEffect } from "react";
import {
  Imino,
  Lmino,
  LminoR,
  Omino,
  Smino,
  SminoR,
  Tmino,
  MinoCell,
  MinoType,
} from "../component/Mino";

export const useMino = () => {
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

  let minoOrder: Array<number>;
  useEffect(() => {
    minoOrder = shuffleArray([...Array(7)].map((_, i) => i + 1));
  }, []);

  const appearMino = (
    minoNum: number
  ): { cell: MinoCell; form: Array<Array<MinoCell>> } => {
    switch (minoNum) {
      case 1:
        return new Imino();
        break;

      case 2:
        return new Omino();
        break;

      case 3:
        return new Tmino();
        break;

      case 4:
        return new Lmino();
        break;

      case 5:
        return new LminoR();
        break;

      case 6:
        return new Smino();
        break;

      case 7:
        return new SminoR();
        break;

      default:
        return new Imino();
    }
  };

  return { appearMino };
};
