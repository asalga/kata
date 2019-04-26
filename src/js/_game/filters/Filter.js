'use strict';

/*
 * Base class for filters
 */
export default class Filter {
  /*
    derived classes must implement this
  */
  execute() {
    console.error('filter: execute not implemented');
  }
}