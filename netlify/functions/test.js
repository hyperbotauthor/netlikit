const { Octokit } = require("octokit")

const octokit = new Octokit({ auth: process.env["GIT_TOKEN"] })

exports.handler = async function(event, context) {
  const result = await octokit.rest.users.getAuthenticated()
  
  return {
      statusCode: 200,
      body: JSON.stringify(result)
  }
}
