/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/*
 * @Author: wangzhisen
 * @Date: 2022-10-28 14:43:02
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2022-10-28 17:15:05
 *
 * 解析tpl文件，替换数据源，生成新的文件
 */
import fs from 'fs';
import { errorHandler } from './utils/error-handler';

type ConfigType = Record<string, any>;
interface ParseOptions {
	config: ConfigType;
	dir: string;
	output: string;
}

/** 替换模板内容 */
const replaceTpl = (content: string, config: ConfigType) => {
	let copyContent = content;
	if (config) {
		for (const key in config) {
			if (Object.hasOwn(config, key)) {
				const value = config[key];
				if (typeof value !== 'undefined' && config[key] !== null) {
					const reg = new RegExp(`{{${key}}}`, 'g');
					copyContent = copyContent.replace(reg, () => value);
				}
			}
		}
	}
	return copyContent;
};

/** 解析，替换，生成 */
export const parseTpl = ({ config, dir, output }: ParseOptions) => {
	const content = errorHandler(() => fs.readFileSync(dir, { encoding: 'utf-8' }));
	const text = replaceTpl(content, config);
	errorHandler(() => fs.writeFileSync(output, text, { encoding: 'utf-8' }));
};
