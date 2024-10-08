import { MinoCell } from "../component/Mino";

const spc: MinoCell = {
  minoType: 0,
  isFinished: false,
  isCore: false,
};

const wall: MinoCell = {
  minoType: 1,
  isFinished: true,
  isCore: false,
};

export const useBeginningField = () => {
  const beginningField: Array<Array<MinoCell>> = [
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, spc, spc, spc, spc, spc, spc, spc, spc, spc, spc, wall],
    [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
  ];

  return { beginningField };
};
