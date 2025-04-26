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

export type T_SimplifyState = {
	simplifyEnabled: boolean;
	simplifyDynamic: boolean;
	simplifyProcessing: boolean;
	simplifyStats: T_Stats;
};

export type T_AppState = T_AggressionState & T_SimplifyState;
