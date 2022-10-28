export const errorHandler = (fn: (...args: any[]) => any) => {
	try {
		return fn();
	} catch (error) {
		console.error(error ?? '未知错误');
		process.exit(1);
	}
};
