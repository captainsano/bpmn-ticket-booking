import BpmnViewer from 'bpmn-js';
import React, { useEffect, useRef } from 'react';
import { MOVIE_BOOKING_BPMN, MOVIE_BOOKING_BPMN_TIMER } from './BpmnXml';
import './App.css';
import useBpmnProcess from './useBpmnProcess';
import { renderStart, renderEnd, renderSelectShowtime, renderSelectPaymentMethod, renderSelectSeats, renderSelectMovie } from './screens';

function App() {
  const canvas = useRef();
  const [process, processInstance, instanceState, userTask] = useBpmnProcess('MovieBookingProcess', MOVIE_BOOKING_BPMN_TIMER);

  const currentScreen = (() => {
    switch (userTask && userTask.id) {
      case 'SelectShowtime': return renderSelectShowtime(process, processInstance, instanceState, userTask);
      case 'SelectMovie': return renderSelectMovie(process, processInstance, instanceState, userTask);
      case 'SelectSeats': return renderSelectSeats(process, processInstance, instanceState, userTask);
      case 'SelectPaymentMethod': return renderSelectPaymentMethod(process, processInstance, instanceState, userTask);
      default: {
        if (!processInstance) return renderStart(process, processInstance, instanceState, userTask);
        if (instanceState && instanceState.status.isEnded) return renderEnd(process, processInstance, instanceState, userTask);

        return (
          <>
            <h5>Unknown state</h5>
            <textarea rows="20" cols="80" defaultValue={JSON.stringify(instanceState, null, 2)} />
          </>
        );
      }
    }
  })();

  useEffect(() => {
    const viewer = new BpmnViewer();
    let currentTokenOverlayId = null;
    let stateSub = null

    if (canvas.current) {
      viewer.attachTo(canvas.current);
      viewer.importXML(MOVIE_BOOKING_BPMN, undefined, () => {
        viewer.get('canvas').zoom('fit-viewport');
        if (processInstance) {
          const drawToken = (activities) => {
            const active = activities.filter(a => a.phase === 'ACTIVE'); 
            if (active.length > 0) {
              currentTokenOverlayId = viewer.get('overlays').add(active[0].id, {
                position: { bottom: 0, right: 0 },
                html: '<svg width="30" height="30"><circle cx="10" cy="10" r="10" fill="#ff0000" /></svg>'
              });
            }
          }

          stateSub = processInstance.getState$().subscribe((newState) => {
            currentTokenOverlayId && viewer.get('overlays').remove(currentTokenOverlayId)
            drawToken(newState.activities);
          });

          drawToken(processInstance.getState().activities);
        }
      });
    }

    return () => {
      currentTokenOverlayId && viewer.get('overlays').remove(currentTokenOverlayId)
      stateSub && stateSub.unsubscribe();
      viewer.detach();
    }
  }, [canvas, processInstance]);

  return (
    <div className="App">
      <div className="debugger">
        <div style={{ width: '100%', height: '300px' }} className="canvas" ref={canvas}></div>
        <hr />
      </div>
      {currentScreen}
    </div>
  )
}

export default App;
