
const EventBus = require('./1.js');

test('One subsribtion - one event sent', () => {
    const EVENT_NAME = 'test event1';
    const TEST_STATE = "testdata";
    const callback = jest.fn((state) => { _ = state; })
    
    let eventBus = new EventBus();
    eventBus.on(EVENT_NAME, callback); 
    eventBus.emit(EVENT_NAME, TEST_STATE);

    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls[0][0]).toBe(TEST_STATE);
});

test('Two subribtion on same event - one event sent', () => {
    const EVENT_NAME = 'test event1';
    const TEST_STATE = 'testdata';
    const callback1 = jest.fn((state) => { _ == state; })
    const callback2 = jest.fn((state) => { _ == state; })

    let eventBus = new EventBus();
    eventBus.on(EVENT_NAME, callback1);
    eventBus.on(EVENT_NAME, callback2);
    eventBus.emit(EVENT_NAME, TEST_STATE);

    expect(callback1.mock.calls.length).toBe(1);
    expect(callback1.mock.calls[0][0]).toBe(TEST_STATE);
    expect(callback2.mock.calls.length).toBe(1);
    expect(callback2.mock.calls[0][0]).toBe(TEST_STATE);
});

test('Two subribtion on same event - two event sent', () => {
    const EVENT_NAME = 'test event1';
    const TEST_STATE = 'testdata';
    const callback1 = jest.fn((state) => { _ == state; })
    const callback2 = jest.fn((state) => { _ == state; })

    let eventBus = new EventBus();
    eventBus.on(EVENT_NAME, callback1);
    eventBus.on(EVENT_NAME, callback2);
    eventBus.emit(EVENT_NAME, TEST_STATE);
    eventBus.emit(EVENT_NAME, TEST_STATE);

    expect(callback1.mock.calls.length).toBe(2);
    expect(callback1.mock.calls[0][0]).toBe(TEST_STATE);
    expect(callback1.mock.calls[1][0]).toBe(TEST_STATE);
    
    expect(callback2.mock.calls.length).toBe(2);
    expect(callback2.mock.calls[0][0]).toBe(TEST_STATE);
    expect(callback2.mock.calls[1][0]).toBe(TEST_STATE);
});

test('Two subribtion on different events - one event sent', () => {
    const EVENT_NAME_1= 'test event1';
    const EVENT_NAME_2 = 'test event2';
    const TEST_STATE = 'testdata';
    const callback1 = jest.fn((state) => { _ == state; })
    const callback2 = jest.fn((state) => { _ == state; })

    let eventBus = new EventBus();
    eventBus.on(EVENT_NAME_1, callback1);
    eventBus.on(EVENT_NAME_2, callback2);
    eventBus.emit(EVENT_NAME_1, TEST_STATE);

    expect(callback1.mock.calls.length).toBe(1);
    expect(callback1.mock.calls[0][0]).toBe(TEST_STATE);
      
    expect(callback2.mock.calls.length).toBe(0);

});

test('Two subribtion on different events - two events sent', () => {
    const EVENT_NAME_1= 'test event1';
    const EVENT_NAME_2 = 'test event2';
    const TEST_STATE_1 = 'testdata 1';
    const TEST_STATE_2 = 'testdata 2';
    const callback1 = jest.fn((state) => { _ == state; })
    const callback2 = jest.fn((state) => { _ == state; })

    let eventBus = new EventBus();
    eventBus.on(EVENT_NAME_1, callback1);
    eventBus.on(EVENT_NAME_2, callback2);
    eventBus.emit(EVENT_NAME_1, TEST_STATE_1);
    eventBus.emit(EVENT_NAME_2, TEST_STATE_2);

    expect(callback1.mock.calls.length).toBe(1);
    expect(callback1.mock.calls[0][0]).toBe(TEST_STATE_1);
      
    expect(callback2.mock.calls.length).toBe(1);
    expect(callback2.mock.calls[0][0]).toBe(TEST_STATE_2);
});