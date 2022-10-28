import { version } from '../package.json';
import sade from 'sade';
import { createLib } from './create-lib';
// import {parseTpl} from './parse-tpl';

const program = sade('ts-run');

program.version(version).option('-c, --config', '提供ts-run命令行所需的配置文件', 'ts-run.config.js');

program
	.command('create <libName>')
	.describe('创建一个ts库')
	.example('create myLib')
	.action((libName: string) => {
		createLib(libName);
	});

program.parse(process.argv);
