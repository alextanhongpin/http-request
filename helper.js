const fs = require("node:fs/promises");

async function save(name, response) {
  // Exclude fields that are not useful.
  const { rawHeaders, rawBody, body, prettyPrintBody, ...rest } = response;

  // Create only if it doesn't exist.
  // If you want a new result, delete the file before re-running.
  try {
    await fs.writeFile(name, JSON.stringify(rest, null, 2), {
      flag: "wx",
    });
  } catch (err) {
    if (err.code === "EEXIST") {
      return;
    }

    console.log(err);
  }
}

module.exports = {
  save,
};
