## Auth

Authenticate your service.

```http
{{
  // You can access environment variable using `process.env.XYZ` or just `XYZ`
  exports.defaultHeaders = {
    'Content-Type': 'text/html',
    'Authorization': `Basic ${username} ${password}`
  };
}}
###

POST http://localhost:3000/register
...defaultHeaders

{{
  // Import statement is not supported, but you can use require.
  const fs = require('node:fs/promises')
  await fs.writeFile('.env.auth', `token=${response.parsedBody.accessToken}`, 'utf-8')

  // Exclude fields that are not useful.
  const { rawHeaders, rawBody, body, prettyPrintBody, ...rest } = response
  try {
    // Create only if it doesn't exist.
    // If you want a new result, delete the file before re-running.
    await fs.writeFile('./rest/auth.json', JSON.stringify(rest, null, 2), {flag: 'wx'})
  } catch(err) {
    if (err.code === 'EEXIST') {
      return
    }

    console.log(err)
  }
}}
```
