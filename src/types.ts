export type T_Stats = {
	wordsReplaced: number;
	wordsAnalyzed: number;
};

export type T_AggressionState = {
	aggressionEnabled: boolean;
	aggressionFilterText: boolean;
	aggressionFilterImages: boolean;
	aggressionReplacementText: boolean;
	aggressionShowOriginalText: boolean;
	aggressionStats: T_Stats;
};

export const DEFAULT_AGGRESSION_STATE: T_AggressionState = {
	aggressionEnabled: false,
	aggressionFilterText: false,
	aggressionFilterImages: false,
	aggressionReplacementText: false,
	aggressionShowOriginalText: false,
	aggressionStats: {
		wordsReplaced: 0,
		wordsAnalyzed: 0,
	},
};

export type T_SimplifyState = {
	simplifyEnabled: boolean;
	simplifyDynamic: boolean;
	simplifyStats: T_Stats;
};

export const DEFAULT_SIMPLIFY_STATE: T_SimplifyState = {
	simplifyEnabled: false,
	simplifyDynamic: false,
	simplifyStats: {
		wordsReplaced: 0,
		wordsAnalyzed: 0,
	},
};

export type T_AppState = T_AggressionState & T_SimplifyState;

export const DEFAULT_APP_STATE: T_AppState = {
	...DEFAULT_AGGRESSION_STATE,
	...DEFAULT_SIMPLIFY_STATE,
};
