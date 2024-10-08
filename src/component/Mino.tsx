export interface MinoCell {
  minoType: number;
  isFinished: boolean;
  isCore: boolean;
}

export interface MinoType {
  cell: MinoCell;
  form: Array<Array<MinoCell>>;
}

// const space: MinoCell = {
//   minoType: 0,
//   isFinished: false,
//   isCore: false,
// };

const minoField: MinoCell = {
  minoType: 9,
  isFinished: false,
  isCore: false,
};

export class Mino {
  // core:　回転の中心
  // private core: Array<number> = [0, 0];
  // private depth: number = 0;
}

export class Imino extends Mino {
  cell: MinoCell = {
    minoType: 2,
    isFinished: false,
    isCore: false,
  };

  core: MinoCell = {
    minoType: 2,
    isFinished: false,
    isCore: true,
  };

  form: Array<Array<MinoCell>> = [
    [minoField, this.cell, minoField, minoField],
    [minoField, this.core, minoField, minoField],
    [minoField, this.cell, minoField, minoField],
    [minoField, this.cell, minoField, minoField],
  ];
}

export class Omino extends Mino {
  cell: MinoCell = {
    minoType: 3,
    isFinished: false,
    isCore: false,
  };

  core: MinoCell = {
    minoType: 3,
    isFinished: false,
    isCore: true,
  };

  form: Array<Array<MinoCell>> = [
    [minoField, minoField, minoField, minoField],
    [minoField, this.cell, this.cell, minoField],
    [minoField, this.cell, this.cell, minoField],
    [minoField, minoField, minoField, minoField],
  ];
}

export class Tmino extends Mino {
  cell: MinoCell = {
    minoType: 4,
    isFinished: false,
    isCore: false,
  };

  core: MinoCell = {
    minoType: 4,
    isFinished: false,
    isCore: true,
  };

  form: Array<Array<MinoCell>> = [
    [minoField, minoField, minoField, minoField],
    [minoField, minoField, this.cell, minoField],
    [minoField, this.cell, this.core, this.cell],
    [minoField, minoField, minoField, minoField],
  ];
}

export class Lmino extends Mino {
  cell: MinoCell = {
    minoType: 5,
    isFinished: false,
    isCore: false,
  };

  core: MinoCell = {
    minoType: 5,
    isFinished: false,
    isCore: true,
  };

  form: Array<Array<MinoCell>> = [
    [minoField, this.cell, minoField, minoField],
    [minoField, this.core, minoField, minoField],
    [minoField, this.cell, this.cell, minoField],
    [minoField, minoField, minoField, minoField],
  ];
}

export class LminoR extends Mino {
  cell: MinoCell = {
    minoType: 6,
    isFinished: false,
    isCore: false,
  };

  core: MinoCell = {
    minoType: 6,
    isFinished: false,
    isCore: true,
  };

  form: Array<Array<MinoCell>> = [
    [minoField, minoField, this.cell, minoField],
    [minoField, minoField, this.core, minoField],
    [minoField, this.cell, this.cell, minoField],
    [minoField, minoField, minoField, minoField],
  ];
}

export class Smino extends Mino {
  cell: MinoCell = {
    minoType: 7,
    isFinished: false,
    isCore: false,
  };

  core: MinoCell = {
    minoType: 7,
    isFinished: false,
    isCore: true,
  };

  form: Array<Array<MinoCell>> = [
    [minoField, minoField, minoField, minoField],
    [this.cell, this.core, minoField, minoField],
    [minoField, this.cell, this.cell, minoField],
    [minoField, minoField, minoField, minoField],
  ];
}

export class SminoR extends Mino {
  cell: MinoCell = {
    minoType: 8,
    isFinished: false,
    isCore: false,
  };

  core: MinoCell = {
    minoType: 8,
    isFinished: false,
    isCore: true,
  };

  form: Array<Array<MinoCell>> = [
    [minoField, minoField, minoField, minoField],
    [minoField, minoField, this.core, this.cell],
    [minoField, this.cell, this.cell, minoField],
    [minoField, minoField, minoField, minoField],
  ];
}
