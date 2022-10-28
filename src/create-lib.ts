/*
 * @Author: wangzhisen
 * @Date: 2022-10-28 14:43:07
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2022-10-28 17:26:42
 *
 * 执行创建包的任务
 */

import validatePkgName from 'validate-npm-package-name';
import fs from 'fs';
import path from 'path';

const loggerWithExit = (message?: string) => {
	console.error(message ?? '未知错误');
	process.exit(1);
};

/** 校验需要创建的库名，是否符合npm包的规范 */
const validLibName = (libName: string) => {
	const { validForNewPackages, validForOldPackages, warnings } = validatePkgName(libName);
	if (validForNewPackages && validForOldPackages && !warnings) return true;
	return false;
};

/** 格式化包名，去除包名的 @ 和 /符号 创建对应文件夹 */
const formatDirName = (libName: string) => {
	return libName.replace(/[@\/]/g, '-').replace(/^-/, '');
};

/** 获取完整目录 */
const getFilePath = (dirName: string) => {
	const cwd = process.cwd();
	const dirPath = path.resolve(cwd, dirName);
	return path.resolve(cwd, dirPath);
};

/** 校验当前目录是否被存在 */
const isDirExisted = (dirName: string) => {
	try {
		fs.accessSync(dirName);
		return true;
	} catch {
		return false;
	}
};

/** 创建package.json */
const createPkgJSON = () => {
	fs.writeFileSync('./package.json', '111');
};

/** 创建包 */
export const createLib = (libName: string) => {
	/** 校验包名和目录是否规范 */
	const isValidLibName = validLibName(libName);
	if (!isValidLibName) {
		const message = [
			`库名[${libName}]命名不规范，请检查`,
			`命名规范：https://jdf2e.github.io/jdc_fe_guide/docs/npm/index/`
		].join('\n');

		loggerWithExit(message);
		return;
	}
	/** 格式化包名，用于创建文件夹 */
	const dirName = formatDirName(libName);
	const fullPathName = getFilePath(dirName);
	const isExisted = isDirExisted(fullPathName);

	/** 判断文件夹目录是否重复 */
	if (isExisted) {
		const message = `路径[${fullPathName}]已存在，无法创建[${libName}]库,请检查`;
		loggerWithExit(message);
		return;
	}

	/** 创建目录 */
	try {
		fs.mkdirSync(fullPathName);
	} catch (error) {
		loggerWithExit(error as string);
		return;
	}

	console.log(`路径[${fullPathName}]已创建`);

	/** 切换目录 */
	process.chdir(fullPathName);

	createPkgJSON();
};
