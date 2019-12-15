import * as Engine from 'neo-bpmn-engine';
import { useState, useEffect } from 'react';

export default function useBpmnProcess(processId, bpmnXml, shouldPassTokenHook) {
  const [process, setProcess] = useState(null);
  const [processInstance, setProcessInstance] = useState(null);
  const [instanceState, setInstanceState] = useState(null);
  const [userTask, setUserTask] = useState(null);

  useEffect(() => {
    let instanceSub = null;
    let newStateSub = null;
    let userTaskSub = null;

    // Initialize the engine with bpmn xml and attach listeners
    const init = async () => {
      Engine.provideService('myCustomService', { 
        hello() {
          console.log('hello');
        }
      });

      const _process = await Engine.BpmnProcess.fromXml(processId, bpmnXml, { shouldPassTokenHook });

      instanceSub = _process.getInstance$().subscribe((newInstance) => {
        setProcessInstance(newInstance);
        newStateSub && newStateSub.unsubscribe();
        newStateSub = newInstance.getState$().subscribe((newState) => {
          setInstanceState(newState);
          if (newState.status.isEnded) setUserTask(null);
        });

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
  }, [processId, bpmnXml]);

  return [
    process,
    processInstance,
    instanceState,
    userTask,
  ];
}