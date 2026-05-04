// c8 ignore file
export type RandomSource = () => number;

export type GeneratorOptions = {
  random?: RandomSource;
};
