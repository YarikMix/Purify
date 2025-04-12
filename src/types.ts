export type T_AggressionState = {
	aggressionEnabled: boolean
	aggressionFilterText: boolean
	aggressionFilterImages: boolean
	aggressionReplacementText: boolean
	aggressionShowOriginalText: boolean
}

export const DEFAULT_AGGRESSION_STATE:T_AggressionState = {
	"aggressionEnabled": false,
	"aggressionFilterText": false,
	"aggressionFilterImages": false,
	"aggressionReplacementText": false,
	"aggressionShowOriginalText": false,
}

export type T_SimplifyState = {
	simplifyEnabled: boolean
	simplifyDynamic: boolean
}

export const DEFAULT_SIMPLIFY_STATE:T_SimplifyState = {
	"simplifyEnabled": false,
	"simplifyDynamic": false
}

export type T_AppState = T_AggressionState & T_SimplifyState

export const DEFAULT_APP_STATE:T_AppState = {...DEFAULT_AGGRESSION_STATE, ...DEFAULT_SIMPLIFY_STATE}