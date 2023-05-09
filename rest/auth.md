## Auth

Authenticate your service. Although it can run scripts in markdown file, probably leave markdown for documentation.


1. Runs basic authentication
2. Calls the register endpoint
3. Write the access token to the environment variable
4. Save the response json to a file

```rest
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
  const { save } = require('../helper.js')
  await save('./rest/auth.json', response)
}}
```
