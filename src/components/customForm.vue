<script setup lang="tsx">
import { computed, ref } from "vue"
import {
	ElForm,
	ElFormItem,
	ElInput,
	ElSelect,
	ElOption,
	ElDatePicker,
	ElCascader,
	FormInstance,
	ElUpload,
	ElButton
} from "element-plus"
const props = withDefaults(
	defineProps<{
		formItems: ICustomFormItem[]
		rules?: any
		labelPoistion?: "left" | "right" | "top"
		formStyle?: string
		inline?: boolean
	}>(),
	{
		labelPoistion: "left",
		inline: false
	}
)
const my_ruleForm = defineModel("ruleForm", {
	type: Object
})
// const customFormRef = ref<{ elFormRef: FormInstance }>() 外面用的ts实例
const elFormRef = ref<FormInstance>()
defineExpose({ elFormRef })

// 渲染单个表单控件
const renderFormItem = (item: ICustomFormItem) => {
	switch (item.type) {
		case "input":
			const inputCfg = item.input
			return (
				<ElInput
					v-model={my_ruleForm.value[item.prop]}
					placeholder={inputCfg?.placeholder || "请输入"}
					style={inputCfg?.style}
					clearable={inputCfg?.clearable}
				/>
			)
		case "textarea":
			const textareaCfg = item.textarea
			return (
				<ElInput
					v-model={my_ruleForm.value[item.prop]}
					type="textarea"
					resize={textareaCfg?.resize || "none"}
					rows={textareaCfg?.rows || 2}
					show-word-limit={textareaCfg?.showWordLimit}
					maxlength={textareaCfg?.maxlength}
					clearable={textareaCfg?.clearable}
					placeholder={textareaCfg?.placeholder || "请输入"}
					style={textareaCfg?.style}
				/>
			)
		case "select":
			const selectCfg = item.select
			return (
				<ElSelect
					v-model={my_ruleForm.value[item.prop]}
					popperClass="mapSelect"
					placeholder={selectCfg?.placeholder || "请选择"}
					style={selectCfg?.style}
					clearable={selectCfg?.clearable}
					// 基础配置
					multiple={selectCfg?.multiple}
					multiple-limit={selectCfg?.multipleLimit ?? 0}
					collapse-tags={selectCfg?.collapseTags}
					max-collapse-tags={selectCfg?.maxCollapseTags}
					collapse-tags-tooltip={selectCfg?.collapseTagsTooltip}
					// 远程搜索相关
					filterable={selectCfg?.filterable}
					remote={selectCfg?.remote}
					remote-method={selectCfg?.remoteMethod} // 搜索回调
					loading={selectCfg?.loading} // 必须绑定 loading 状态，否则没有加载动画
					remote-show-suffix={true} // 远程搜索时是否显示后缀图标
					v-slots={{
						// 只有在加载中且没有选项时才显示自定义 empty 插槽
						empty: () =>
							selectCfg?.loading ? (
								<p style="padding: 10px; text-align: center; color: #999;">
									加载中...
								</p>
							) : (
								<p style="padding: 10px; text-align: center; color: #999;">
									无数据
								</p>
							)
					}}
				>
					{selectCfg?.options?.map((option) => (
						<ElOption
							key={option.value}
							value={option.value}
							label={option.label}
						>
							{/* 如果配置了自定义渲染则执行，否则渲染默认 label */}
							{selectCfg?.renderOption ? (
								selectCfg?.renderOption(option)
							) : (
								<span>{option.label}</span>
							)}
						</ElOption>
					))}
				</ElSelect>
			)
		case "datepicker":
			const datepickerCfg = item.datepicker
			return (
				<ElDatePicker
					v-model={my_ruleForm.value[item.prop]}
					type={datepickerCfg?.pickerType || "datetime"}
					format={datepickerCfg?.format}
					placeholder={datepickerCfg?.placeholder || "请选择"}
					valueFormat={datepickerCfg?.valueFormat || "YYYY-MM-DD HH:mm:ss"}
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					style={datepickerCfg?.style}
				/>
			)
		case "cascader":
			const cascaderCfg = item.cascader
			return (
				<ElCascader
					class="cascader-cus"
					disabled={cascaderCfg?.disabled}
					v-model={my_ruleForm.value[item.prop]}
					clearable={cascaderCfg?.clearable}
					placeholder={cascaderCfg?.placeholder || "请选择"}
					options={cascaderCfg?.options}
					props={cascaderCfg?.props}
					show-all-levels={cascaderCfg?.showAllLevels}
					onChange={cascaderCfg?.change ? cascaderCfg?.change : () => {}}
					style={[{ width: "100%" }, cascaderCfg?.style]}
					collapse-tags={cascaderCfg?.collapseTags}
					max-collapse-tags={cascaderCfg?.maxCollapseTags}
					collapse-tags-tooltip={cascaderCfg?.collapseTagsTooltip}
				/>
			)
		case "upload":
			const uploadCfg = item.upload
			return (
				<ElUpload
					action={uploadCfg?.action}
					autoUpload={uploadCfg?.autoUpload}
					listType={uploadCfg?.listType || "picture"}
					multiple={uploadCfg?.multiple}
					limit={uploadCfg?.limit || 3}
					v-model:fileList={my_ruleForm.value[item.prop]} // 假设 ruleForm 中存的是文件列表
					onPreview={uploadCfg?.handlePictureCardPreview}
					onRemove={uploadCfg?.handleRemove}
					beforeRemove={uploadCfg?.beforeRemove}
					onExceed={uploadCfg?.handleExceed}
					onSuccess={uploadCfg?.handleSuccess}
					// 在 TSX 中，插槽通过 v-slots 传入
					v-slots={{
						default: () => <ElButton type="primary">点击上传</ElButton>,
						tip: () => (
							<div class="el-upload__tip">
								{uploadCfg?.tipText || "只能上传jpg/png文件，且不超过500kb"}
							</div>
						)
					}}
				/>
			)
		case "text":
			const textCfg = item.text
			return (
				<span class="text" style={[{ width: "100%" }, textCfg?.style]}>
					{textCfg?.custom
						? textCfg?.custom(my_ruleForm.value[item.prop])
						: my_ruleForm.value[item.prop]}
				</span>
			)
		case "custom": //自定义渲染
			return item.custom
				? item.custom(my_ruleForm.value[item.prop], item)
				: null
		default:
			return null
	}
}
// 自动从 formItems 中提取 rules 并合并
const computedRules = computed(() => {
	const rulesObj = { ...props.rules } // 继承外部传入的 rules
	props.formItems.forEach((item) => {
		if (item.rules) {
			rulesObj[item.prop] = item.rules
		}
	})
	return rulesObj
})
// 整个表单渲染
const renderForm = () => {
	return (
		<ElForm
			ref={elFormRef}
			rules={computedRules.value}
			label-position={props.labelPoistion}
			model={my_ruleForm.value}
			label-width="auto"
			style={props.formStyle}
			inline={props.inline}
		>
			{props.formItems.map((item) => (
				<ElFormItem
					prop={item.prop}
					class={item.class}
					v-slots={{
						label: () =>
							typeof item.label === "string" ? (
								<span>{item.label}</span>
							) : typeof item.label === "function" ? (
								item.label()
							) : (
								item.label
							),
						default: () => renderFormItem(item)
					}}
				/>
			))}
		</ElForm>
	)
}
</script>

<template>
	<!-- 渲染整个 JSX 表单 主要是为了自定义label -->
	<renderForm />
</template>
