module.exports = function(api) {
  api.cache(true)

  const presets = [
    [
      "@babel/preset-env", {
        "modules": false
      }
    ],
    [
      "@babel/preset-react", {
        "modules": false
      }
    ]
  ]

  const plugins = [
    [
      "@babel/transform-runtime"
    ],
    [
      "@babel/plugin-proposal-class-properties",
    ]
  ]

  return {
    presets,
    plugins
  }
}
