export const CHANGE_LANGUAGE = 'change_language' //1
export const ADD_LANGUAGE = 'add_language'

interface ChangeLanguageAction {
	//2
	type: typeof CHANGE_LANGUAGE
	payload: 'zh' | 'en'
}
interface AddLanguageAction {
	type: typeof ADD_LANGUAGE
	payload: { name: string; code: string }
}
//混合类型
export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction //3

export const changeLanguageActionCreator = (
	languageCode: 'zh' | 'en',
): ChangeLanguageAction => {
	//4
	return {
		type: CHANGE_LANGUAGE,
		payload: languageCode,
	}
}
//: AddLanguageAction   输出的类型
export const addLanguageActionCreator = (
	name: string,
	code: string,
): AddLanguageAction => {
	return {
		type: ADD_LANGUAGE,
		payload: {
			name,
			code,
		},
	}
}
