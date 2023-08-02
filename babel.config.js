module.exports = function(api) {
    api.cache(true);
    return {
		presets: ["babel-preset-expo"],
		plugins: [
			"transform-inline-environment-variables",
			[
				"module-resolver",
				{
					root: ["./src"],
					alias: {
						"^@ui": "./src/components/ui",
						"^@context": "./src/context",
						"^@utils": "./src/utils",
						"^@types": "./src/utils/types.js",
						"^@api": "./src/api",
						"^@hooks": "./src/hooks",
						"^@api/(.*)": "./src/api/\\1",
						"^@screens/(.*)": "./src/screens/\\1",
						"^@assets/(.*)": "./src/assets/\\1",
						"^@components/(.*)": "./src/components/\\1",
						"^@/(.*)": "./\\1",
					},
				},
			],
			"expo-router/babel",
			"nativewind/babel",
			"@babel/plugin-proposal-export-namespace-from",
			"react-native-reanimated/plugin",
		],
	};
};
