import { is } from '@magic/test'

import { mergeConfig } from '../../src/lib/mergeConfig.js'

const root = {
  overwrite: 'overwritten value',
}

const sub = {
  overwrite: 'notoverwritten value',
  leaveasis: 'leaveasis value',
}

const expect = {
  overwrite: 'overwritten value',
  leaveasis: 'leaveasis value',
}

const deepDeepRoot = {
  root: {
    firstLevel: {
      secondLevel: {
        thirdLevel: 'works',
      },
    },
    uniforms: {
      name: { value: true },
      name2: { value: false },
    },
  },
}

const deepDeepSub = {
  root: {
    firstLevel: {
      secondLevel: {
        thirdLevel: 'broken',
        thirdLevel2: 2,
      },
    },
    uniforms: {
      name: { value: false },
      name2: { value: true },
    },
  },
}

const deepDeepExpect = {
  root: {
    firstLevel: {
      secondLevel: {
        thirdLevel: 'works',
        thirdLevel2: 2,
      },
    },
    uniforms: {
      name: { value: true },
      name2: { value: false },
    },
  },
}

export default [
  {
    fn: mergeConfig(),
    expect: is.objectNative,
    info: 'called without args, should return a nativeObject',
  },
  {
    fn: mergeConfig(),
    expect: is.empty,
    info: 'called without args, should return an empty object',
  },
  { fn: mergeConfig(root, sub), expect: is.deep.equal(expect), info: 'root overwrites sub' },
  {
    fn: mergeConfig(deepDeepRoot, deepDeepSub),
    expect: is.deep.equal(deepDeepExpect),
    info: 'root overwrites sub in deep deep objects',
  },
]
