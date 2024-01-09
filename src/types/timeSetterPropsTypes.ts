export interface TimeSetterPropsTypes {
    onAddTimer: (totalTimeInSeconds: number) => void;
    actualTimeSeconds: number;
    isDisabled: boolean;
}