/**
 * @class
 */
class EventBus {
  constructor() {
    this.listeners = {};
  }

  /**
   * The method that registers listeners for custom events
   * @param {string} event - event name
   * @param {eventListener} listener - callback
   */
  on(event, listener) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(listener);
  }

  /**
   * The method that fires event
   * @param {string} event - event name
   * @param {Object} data - any data
   */
  emit(event, data) {
    if (!this.listeners[event]) return;

    for (let listener of this.listeners[event]) {
      //listener(data);  
      try {
          listener(data);
      } catch (e) {
        console.error(`Catched error ${e}`)
      }
    }
  }
}

/**
 * @callback eventListener
 * @param {Object} - data provided by emit method
 */


module.exports = EventBus;