interface TriggerNativeEventProps {
  element: HTMLElement;
  value: unknown;
  eventType: string;
  senderObject: unknown;
  propertyName: string;
}

export const triggerNativeEvent = ({
  element,
  value,
  eventType,
  senderObject,
  propertyName,
}: TriggerNativeEventProps) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    senderObject,
    propertyName,
  )?.set;
  nativeInputValueSetter?.call(element, value);

  const event = new Event(eventType, { bubbles: true });
  element.dispatchEvent(event);
};
