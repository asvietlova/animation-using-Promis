import EventBus from '1.js';

const eventBus = new EventBus();

eventBus.on('stateUpdated', (state) => {
  console.log('first state listener'); // first state listener
  console.log(state); // { newState: 'is here' }
  // throw new Error('Error')
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
