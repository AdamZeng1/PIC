const { override, fixBabelImports, addLessLoader } = require('customize-cra');

//Override the antd main theme color with mediumseagreen

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#3cb371' },
  }),
);