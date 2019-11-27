export const MOVIE_BOOKING_BPMN = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1caku5x" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.4.1">
  <bpmn:process id="Process_01q7ylb" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>SequenceFlow_1yo5pfs</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="SelectMovie" name="Select Movie">
      <bpmn:incoming>SequenceFlow_1yo5pfs</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0mfinw0</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="SelectSeats" name="Select Seats">
      <bpmn:incoming>SequenceFlow_0yawdlr</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1kthr50</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="SelectPaymentMethod" name="Select Payment Method">
      <bpmn:incoming>SequenceFlow_1kthr50</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1tm4yxx</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>SequenceFlow_1tm4yxx</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_1yo5pfs" sourceRef="StartEvent_1" targetRef="SelectMovie" />
    <bpmn:sequenceFlow id="SequenceFlow_1tm4yxx" sourceRef="SelectPaymentMethod" targetRef="EndEvent_1" />
    <bpmn:sequenceFlow id="SequenceFlow_1kthr50" sourceRef="SelectSeats" targetRef="SelectPaymentMethod" />
    <bpmn:sequenceFlow id="SequenceFlow_0mfinw0" sourceRef="SelectMovie" targetRef="SelectShowtime" />
    <bpmn:sequenceFlow id="SequenceFlow_0yawdlr" sourceRef="SelectShowtime" targetRef="SelectSeats" />
    <bpmn:userTask id="SelectShowtime" name="Select Showtime">
      <bpmn:incoming>SequenceFlow_0mfinw0</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0yawdlr</bpmn:outgoing>
    </bpmn:userTask>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_01q7ylb">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="179" y="99" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_0q5c1mx_di" bpmnElement="SelectMovie">
        <dc:Bounds x="320" y="77" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_1fyfnqz_di" bpmnElement="SelectSeats">
        <dc:Bounds x="740" y="77" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_1pkciuk_di" bpmnElement="SelectPaymentMethod">
        <dc:Bounds x="950" y="77" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_0ie8v08_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="1162" y="99" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1yo5pfs_di" bpmnElement="SequenceFlow_1yo5pfs">
        <di:waypoint x="215" y="117" />
        <di:waypoint x="320" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1tm4yxx_di" bpmnElement="SequenceFlow_1tm4yxx">
        <di:waypoint x="1050" y="117" />
        <di:waypoint x="1162" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1kthr50_di" bpmnElement="SequenceFlow_1kthr50">
        <di:waypoint x="840" y="117" />
        <di:waypoint x="950" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0mfinw0_di" bpmnElement="SequenceFlow_0mfinw0">
        <di:waypoint x="420" y="117" />
        <di:waypoint x="530" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0yawdlr_di" bpmnElement="SequenceFlow_0yawdlr">
        <di:waypoint x="630" y="117" />
        <di:waypoint x="740" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_033ahyr_di" bpmnElement="SelectShowtime">
        <dc:Bounds x="530" y="77" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;