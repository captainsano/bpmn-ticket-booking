import BpmnViewer from 'bpmn-js';
import React, { useEffect, useRef, useState } from 'react';
import { MOVIE_BOOKING_BPMN, MOVIE_BOOKING_BPMN_TIMER } from './BpmnXml';
import './App.css';
import useBpmnProcess from './useBpmnProcess';
import { renderStart, renderEnd, renderSelectShowtime, renderSelectPaymentMethod, renderSelectSeats, renderSelectMovie, renderDebugger } from './screens';

function App() {
  const BPMN_XML = MOVIE_BOOKING_BPMN
  const canvas = useRef();
  const [showDebugger, setShowDebugger] = useState(false);
  const [stepWaiter, setStepWaiter] = useState(null);

  const waiterHook = async (_, __, from, to) => {
    return true;
    // return new Promise((resolve) => setStepWaiter({ from, to, resolve }));
  }

  /**
   * Use the engine, adapted for ReactJS
   */
  const [process, processInstance, instanceState, userTask] = useBpmnProcess('MovieBookingProcess', BPMN_XML, waiterHook);

  /**
   * Render screens based on the current user task or state
   */
  const currentScreen = (() => {
    if (stepWaiter) return renderDebugger(instanceState, stepWaiter.from, stepWaiter.to, nextStep);

    switch (userTask && userTask.id) {
      case 'SelectShowtime': return renderSelectShowtime(process, processInstance, instanceState, userTask);
      case 'SelectMovie': return renderSelectMovie(process, processInstance, instanceState, userTask);
      case 'SelectSeats': return renderSelectSeats(process, processInstance, instanceState, userTask);
      case 'SelectPaymentMethod': return renderSelectPaymentMethod(process, processInstance, instanceState, userTask);
      default: {
        if (!processInstance) return renderStart(process, processInstance, instanceState, userTask);
        if (instanceState && instanceState.status.isEnded) return renderEnd(process, processInstance, instanceState, userTask);

        return null;
        // For error handling
        // return (
        //   <>
        //     <h5>Unknown state</h5>
        //     <textarea rows="20" cols="80" defaultValue={JSON.stringify(instanceState, null, 2)} />
        //   </>
        // );
      }
    }
  })();


  /**
   * --------------- Debugger ------------------
   */
  useEffect(() => {
    const viewer = new BpmnViewer();
    let currentTokenOverlayId = null;
    let stateSub = null

    if (canvas.current) {
      viewer.attachTo(canvas.current);
      viewer.importXML(BPMN_XML, undefined, () => {
        viewer.get('canvas').zoom('fit-viewport');
        if (processInstance) {
          const drawToken = (activities) => {
            const active = activities.filter(a => a.phase === 'ACTIVE' || a.phase === 'READY'); 
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
  }, [canvas, BPMN_XML, processInstance]);

  function toggleDebugger() {
    setShowDebugger(!showDebugger);
  }

  function nextStep() {
    if (stepWaiter) {
      stepWaiter.resolve(true);
      setStepWaiter(null);
    }
  }

  return (
    <div className={`App ${showDebugger ? 'Debug' : ''}`}>
      <div className="Debugger">
        <div style={{ width: '100%', height: '300px' }} className="canvas" ref={canvas}></div>
        <hr />
      </div>
      {currentScreen}
      <div className="BottomBar">
        <button onClick={toggleDebugger}>Toggle Debugger</button>
      </div>
    </div>
  );
}

export default App;
