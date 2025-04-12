export type T_AggressionState = {
	aggressionEnabled: boolean
	aggressionFilterText: boolean
	aggressionFilterImages: boolean
	aggressionReplacementText: boolean
	aggressionShowOriginalText: boolean
}

export type T_SimplifyState = {
	simplifyEnabled: boolean
	simplifyDynamic: boolean
}

export type T_AppState = T_AggressionState & T_SimplifyState