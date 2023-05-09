const path = require("path");
const { save } = require("./helper");

module.exports = {
  configureHooks: function (api) {
    api.hooks.responseLogging.addHook(
      "save_response_to_file",
      function (response, processContext) {
        const { httpFile } = processContext;
        const { name, dir } = path.parse(httpFile.fileName);
        console.info(response);
        save(path.join(dir, name + ".txt"), response);
      }
    );
  },
};
