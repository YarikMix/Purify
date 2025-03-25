import { proxy } from "valtio";

export enum Actions {
  GET_STATE = "get-state",
  SET_STATE = "set-state",
}

export enum Mode {
  fullPage,
  selective
}

export const state = proxy({
  enabled: true,
  aggressionFilterEnabled: false,
  preconceptionEnabled: true,
  preconceptionMode: Mode.selective,
  agitationEnabled: true,

  mode: Mode.selective,
  showTooltip: false,
  selectedHighlightId: null
});

export type ExtensionState = {
  enabled: boolean
  aggressionFilterEnabled: boolean;
  aggressionFilterMode: Mode;
  mode: Mode
  showTooltip: boolean
  selectedHighlightId: null | number
};

export const updateState = (payload: Partial<typeof state>) => {
  chrome.runtime.sendMessage({ type: Actions.SET_STATE, payload });
};
