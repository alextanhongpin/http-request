const fs = require("node:fs/promises");
const assert = require("node:assert");

function format(response) {
  const { prettyPrintBody, headers, protocol, statusCode, statusMessage } =
    response;

  // Save the status code and message.
  const body = [`${protocol} ${statusCode} - ${statusMessage}`];

  // Save the response headers.
  for (let key in headers) {
    body.push(`${key}: ${headers[key]}`);
  }

  // Save the response body.
  body.push("");
  body.push(prettyPrintBody);

  return body.join("\n");
}

async function save(name, response) {
  const text = format(response);

  // Create only if it doesn't exist.
  // If you want a new result, delete the file before re-running.
  try {
    await fs.writeFile(name, text, {
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
