export type T_Stats = {
	wordsReplaced: number;
	wordsAnalyzed: number;
};

export type T_AggressionState = {
	agreement: boolean;
	aggressionEnabled: boolean;
	aggressionFilterText: boolean;
	aggressionFilterImages: boolean;
	aggressionReplacementText: boolean;
	aggressionShowOriginalText: boolean;
	aggressionStats: T_Stats;
	aggressionQueue: {
		sended: number;
		processed: number;
	};
};

export type T_SimplifyState = {
	simplifyEnabled: boolean;
	simplifyDynamic: boolean;
	simplifyProcessing: boolean;
	simplifyStats: T_Stats;
	simplifyQueue: {
		sended: number;
		processed: number;
	};
};

export type T_VideoState = {
	videoEnabled: boolean;
};

export type T_AppState = {
	ignoreList: string[];
} & T_AggressionState &
	T_SimplifyState &
	T_VideoState;
