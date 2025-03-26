import { proxy } from "valtio";

export enum Actions {
  GET_STATE = "get-state",
  SET_STATE = "set-state",
}

export const state = proxy({
  enabled: true,

  aggressionEnabled: true,
  aggressionFilterEnabled: false,
  aggressionReplacementEnabled: true,
  aggressionShowOriginalText: true,

  showTooltip: false,
  selectedHighlightId: null
});

export type ExtensionState = {
  enabled: boolean

  aggressionEnabled: boolean;
  aggressionFilterEnabled: boolean;
  aggressionReplacementEnabled: boolean;
  aggressionShowOriginalText: boolean;

  showTooltip: boolean
  selectedHighlightId: null | number
};

export const updateState = (payload: Partial<typeof state>) => {
  chrome.runtime.sendMessage({ type: Actions.SET_STATE, payload });
};
