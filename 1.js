/**
 * @class
 */
class EventBus {
  constructor() {
    //this.listeners = {};
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
      listener(data);  //TODO:  
    }
  }
}

/**
 * @callback eventListener
 * @param {Object} - data provided by emit method
 */

const eventBus = new EventBus();

eventBus.on('stateUpdated', (state) => {
  console.log('first state listener'); // first state listener
  console.log(state); // { newState: 'is here' }
});

eventBus.on('stateUpdated', (state) => {
  console.log('second state listener'); // second state listener
  console.log(state); // { newState: 'is here' }
});

eventBus.on('requestFulfilled', (data) => {
  console.log('first request listener'); // first request listener
  console.log(data); // { request: 'data' }
});

eventBus.on('foo', () => {
  console.log("this message won't be shown");
});

eventBus.emit('stateUpdated', { newState: 'is here' });
eventBus.emit('requestFulfilled', { request: 'data' });
eventBus.emit('bar', { foo: 'bar' });
