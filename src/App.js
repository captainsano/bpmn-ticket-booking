import React from 'react';
import { MOVIE_BOOKING_BPMN } from './BpmnXml';
import './App.css';
import useBpmnProcess from './useBpmnProcess';
import { renderStart, renderEnd, renderSelectShowtime, renderSelectPaymentMethod, renderSelectSeats, renderSelectMovie } from './screens';

function App() {
  const [process, processInstance, instanceState, userTask] = useBpmnProcess('MovieBookingProcess', MOVIE_BOOKING_BPMN);

  switch (userTask && userTask.id) {
    case 'SelectShowtime': return renderSelectShowtime(process, processInstance, instanceState, userTask);
    case 'SelectMovie': return renderSelectMovie(process, processInstance, instanceState, userTask);
    case 'SelectSeats': return renderSelectSeats(process, processInstance, instanceState, userTask);
    case 'SelectPaymentMethod': return renderSelectPaymentMethod(process, processInstance, instanceState, userTask);
    default: {
      if (!processInstance) return renderStart(process, processInstance, instanceState, userTask);
      if (instanceState && instanceState.status.isEnded) return renderEnd(process, processInstance, instanceState, userTask);

      return (
        <div className="App">
          <h5>Unknown state</h5>
          <textarea rows="20" cols="80" defaultValue={JSON.stringify(instanceState, null, 2)} />
        </div>
      );
    }
  }
}

export default App;
