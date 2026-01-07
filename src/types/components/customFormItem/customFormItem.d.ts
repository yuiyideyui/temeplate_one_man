export {}
declare global {
	/**
	 * 基础属性定义formItem
	 */
	interface IBaseFormItem {
		prop: string
		//Item外层class
		class?: string
		//规则
		rules?: any[]
		label?: string | (() => JSX.Element) // label 可以是字符串或 JSX
		custom?: any
	}
	interface IInputItem extends IBaseFormItem {
		type: "input"
		input?: {
			clearable?: boolean
			placeholder?: string
			style?: string | any
		}
	}
	interface ITextareaItem extends IBaseFormItem {
		type: "textarea"
		textarea?: {
			resize?: "none" | "both" | "horizontal" | "vertical"
			rows?: number
			maxlength?: number | string
			style?: string | any
			showWordLimit?: boolean
			clearable?: boolean
			placeholder?: string
		}
	}
	interface ISelectItem extends IBaseFormItem {
		type: "select"
		select?: {
			placeholder?: string
			multiple?: boolean
			style?: string | any
			clearable?: boolean
			remoteMethod?: (keyword: string) => void //远程搜索Select
			filterable?: boolean //远程搜索Select
			remote?: boolean //远程搜索Select
			multipleLimit?: number //select的多选限制默认是0
			loading?: boolean //loading
			renderOption?: (option: any) => JSX.Element //远程搜索选项label自定义
			collapseTags?: boolean
			maxCollapseTags?: number
			collapseTagsTooltip?: boolean | string
			options?: {
				label: string
				value: any
			}[]
		}
	}
	interface IDatePickerItem extends IBaseFormItem {
		type: "datepicker"
		datepicker?: {
			pickerType?: any
			format?: string
			valueFormat?: string
			placeholder?: string
			style?: object
		}
	}
	interface ICascaderItem extends IBaseFormItem {
		type: "cascader"
		cascader?: {
			disabled?: boolean
			clearable?: boolean
			placeholder?: string
			options: any[]
			props?: any
			showAllLevels?: boolean
			change?: () => void
			style?: object
			collapseTags?: boolean
			maxCollapseTags?: number
			collapseTagsTooltip?: boolean | string
		}
	}
	interface IUploadItem extends IBaseFormItem {
		type: "upload"
		upload?: {
			//上传地址
			action?: string
			//开启自动上传
			autoUpload?: boolean
			listType?: "picture" | "text" | "picture-card"
			limit?: number
			handlePictureCardPreview?: any
			handleRemove?: any
			handleExceed?: any
			//上传成功回调
			handleSuccess?: any
			beforeRemove?: any
			tipText?: string
			multiple?: boolean
		}
	}
	interface ITextItem extends IBaseFormItem {
		type: "text"
		text?: {
			style?: string | any
			custom?: (value: any) => JSX.Element
		}
	}
	interface ICustomItem extends IBaseFormItem {
		type: "custom"
	}

	/**
	 * 具体参数等同于elementPlus
	 */
	export type ICustomFormItem =
		| IInputItem
		| ITextareaItem
		| ISelectItem
		| IDatePickerItem
		| ICascaderItem
		| IUploadItem
		| ITextItem
		| ICustomItem
}
