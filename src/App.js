import React, { useEffect, useState } from 'react';
import * as Engine from 'neo-bpmn-engine';
import { MOVIE_BOOKING_BPMN } from './BpmnXml';
import './App.css';

function App() {
  const [process, setProcess] = useState(null);
  const [processInstance, setProcessInstance] = useState(null);
  const [state, setState] = useState(null);
  const [userTask, setUserTask] = useState(null);

  useEffect(() => {
    let instanceSub = null;
    let newStateSub = null;
    let userTaskSub = null;

    /// Initialize the engine with movie booking bpmn and attach listeners
    const init = async () => {
      const _process = await Engine.BpmnProcess.fromXml('MovieBookingProcess', MOVIE_BOOKING_BPMN);

      instanceSub = _process.getInstance$().subscribe((newInstance) => {
        setProcessInstance(newInstance);
        newStateSub && newStateSub.unsubscribe();
        newStateSub = newInstance.getState$().subscribe((newState) => setState(newState));

        userTaskSub && userTaskSub.unsubscribe();
        userTaskSub = newInstance.getUserTask$().subscribe((userTask) => setUserTask(userTask));
      });

      setProcess(_process);

      _process.deploy();
    }

    init();

    // Unsubscribe when react unmounts
    return () => {
      newStateSub && newStateSub.unsubscribe();
      userTaskSub && userTaskSub.unsubscribe();
      instanceSub && instanceSub.unsubscribe();
    }
  }, []);


  function startInstance() {
    process.start({
      availableSeats: 10,
    });
  }

  if (!processInstance) {
    return (
      <div className="App">
        <button onClick={startInstance}>Start Booking</button>
      </div>
    );
  }

  if (state && state.status.isEnded) {
    const { selectedMovie, selectedSeat, selectedShowtime } = processInstance.getVariables();

    return (
      <div className="App">
        <h1>Enjoy your movie!</h1>
        <br/>
        <h2>{selectedMovie}</h2>
        <h2>{selectedSeat}</h2>
        <h2>{selectedShowtime}</h2>
        <br/><br/>
        <button onClick={startInstance}>Start a new booking</button>
      </div>
    );
  }

  if (userTask && userTask.id === 'SelectShowtime') {
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

  if (userTask && userTask.id === 'SelectMovie') {
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

  if (userTask && userTask.id === 'SelectSeats') {
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

  if (userTask && userTask.id === 'SelectPaymentMethod') {
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
        <br/>
        <button onClick={selectPaymentMethod('Cash')}>Cash</button>
        <button onClick={selectPaymentMethod('VISA')}>VISA</button>
        <button onClick={selectPaymentMethod('MASTER_CARD')}>Master card</button>
        <button onClick={selectPaymentMethod('SEPA')}>SEPA</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h5>Unknown activity!</h5>
    </div>
  );
}

export default App;
