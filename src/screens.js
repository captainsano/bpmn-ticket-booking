import React from 'react';

export function renderStart(process, _processInstance, _instanceState, _userTask) {
  function startInstance() {
    process.start();
  }

  return (
    <div className="App">
      <br /><br />
      <button onClick={startInstance}>Start Booking</button>
    </div>
  );
}

export function renderEnd(process, processInstance, instanceState, _userTask) {
  const { selectedMovie, selectedSeat, selectedShowtime } = processInstance.getVariables();

  function startInstance() {
    process.start();
  }

  return (
    <div className="App">
      <h1>Enjoy your movie!</h1>
      <br />
      <h2><span style={{ color: 'gray'}}>Movie:</span> {selectedMovie} <span style={{ color: 'gray'}}>Seat:</span> {selectedSeat}</h2>
      <h2>{selectedShowtime}</h2>
      <hr />
      <div>
        <div>{processInstance.getId()}</div>
      </div>
      <hr />
      <br />
      <button onClick={startInstance}>Start a new booking</button>
      <hr />
      <textarea rows="20" cols="80" defaultValue={JSON.stringify(instanceState, null, 2)} />
    </div>
  );
}

export function renderSelectShowtime(_process, processInstance, _instanceState, userTask) {
  function selectShowtime(date) {
    return () => {
      processInstance.completeUserTask(userTask.id, userTask.tokenId, { selectedShowtime: date });
    }
  }

  return (
    <div className="App">
      <h1>Select Date:</h1>
      <button onClick={selectShowtime('27-Nov-2019 6:15 PM')}>27-Nov-2019 6:15 PM</button>
      <br />
      <button onClick={selectShowtime('28-Nov-2019 6:15 PM')}>28-Nov-2019 6:15 PM</button>
      <br />
      <button onClick={selectShowtime('29-Nov-2019 6:15 PM')}>29-Nov-2019 6:15 PM</button>
      <br />
    </div>
  );
}

export function renderSelectMovie(_process, processInstance, _instanceState, userTask) {
  function selectMovie(movie) {
    return () => {
      processInstance.completeUserTask(userTask.id, userTask.tokenId, { selectedMovie: movie });
    }
  }

  return (
    <div className="App">
      <h1>Select a Movie:</h1>
      <button onClick={selectMovie('Batman')}>Batman</button>
      <button onClick={selectMovie('Superman')}>Superman</button>
      <button onClick={selectMovie('Avengers')}>Avengers</button>
    </div>
  );
}

export function renderSelectSeats(_process, processInstance, _instanceState, userTask) {
  function selectSeat(number) {
    return () => {
      processInstance.completeUserTask(userTask.id, userTask.tokenId, { selectedSeat: number });
    }
  }

  return (
    <div className="App">
      <h1>Select a Seat:</h1>
      <br />
      <hr width="50%" />
      <h6>Screen is here</h6>
      <button onClick={selectSeat('a1')}>a1</button>
      <button onClick={selectSeat('a2')}>a2</button>
      <button onClick={selectSeat('a3')}>a3</button>
      <button onClick={selectSeat('a4')}>a4</button>
      <button onClick={selectSeat('a5')}>a5</button>
      <button onClick={selectSeat('a6')}>a6</button>
      <br />
      <button onClick={selectSeat('b1')}>b1</button>
      <button onClick={selectSeat('b2')}>b2</button>
      <button onClick={selectSeat('b3')}>b3</button>
      <button onClick={selectSeat('b4')}>b4</button>
      <button onClick={selectSeat('b5')}>b5</button>
      <button onClick={selectSeat('b6')}>b6</button>
    </div>
  );
}

export function renderSelectPaymentMethod(_process, processInstance, _instanceState, userTask) {
  function selectPaymentMethod(method) {
    return () => {
      processInstance.completeUserTask(userTask.id, userTask.tokenId, { selectedPaymentMethod: method });
    }
  }

  return (
    <div className="App">
      <h1>How do you want to pay?</h1>
      <br />
      <h3>Cost: 6 EUR</h3>
      <br />
      <button onClick={selectPaymentMethod('Cash')}>Cash</button>
      <button onClick={selectPaymentMethod('VISA')}>VISA</button>
      <button onClick={selectPaymentMethod('MASTER_CARD')}>Master card</button>
      <button onClick={selectPaymentMethod('SEPA')}>SEPA</button>
    </div>
  );
}