// js/registry.js
import * as vectors from './generators/vectors.js';
import * as momentcofg from './generators/momentcofg.js';
import * as pressure from './generators/pressure.js';
import * as linmot from './generators/linmot.js';
import * as angmot from './generators/angmot.js';
import * as machines from './generators/machines.js';
import * as energy from './generators/energy.js';
import * as friction from './generators/friction.js';

export const registry = {
  vectors,
  momentcofg,
  pressure,
  linmot,
  angmot,
  machines,
  energy,
  friction,

  get(topic) {
    const gen = this[topic];
    if (!gen || typeof gen.generate !== 'function') {
      throw new Error(`No generator for: ${topic}`);
    }
    return gen;
  }
};

window.registry = registry;
