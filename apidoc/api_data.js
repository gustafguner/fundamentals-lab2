define({ "api": [
  {
    "type": "get",
    "url": "/build/:commitId",
    "title": "Display specific build log",
    "name": "getBuild",
    "group": "Build",
    "description": "<p>Create a HTML representation of a specific build's log and send it to browser for display</p>",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commitId",
            "description": "<p>Unique commit ID for a build</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The response message for a build</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>The success response or a build</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>The type of error</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>The timestamp of a build</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Sends specific log information to display in browser</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "String",
            "optional": false,
            "field": "BuildError",
            "description": "<p>Returns an error response if it is unable to fetch builds from the database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error fetching builds from database",
          "type": "String"
        }
      ]
    },
    "filename": "src/index.ts",
    "groupTitle": "Build"
  },
  {
    "type": "get",
    "url": "/builds",
    "title": "Display log for all builds",
    "name": "getBuilds",
    "group": "Build",
    "description": "<p>Create a HTML representation of all the build's logs and send it to browser for display</p>",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>The build's success response</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commitId",
            "description": "<p>The build's unique commit ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Sends all log information of the builds to display in browser</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "String",
            "optional": false,
            "field": "BuildError",
            "description": "<p>Returns an error response if it is unable to fetch a build from the database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error fetching builds from database",
          "type": "String"
        }
      ]
    },
    "filename": "src/index.ts",
    "groupTitle": "Build"
  },
  {
    "type": "post",
    "url": "/ci",
    "title": "Compile and execute test for repository",
    "name": "postCI",
    "group": "Server",
    "description": "<p>Request compilation and test execution from CI-server for a specific repository.</p>",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commitId",
            "description": "<p>A unique commit ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>The URL to clone repository</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the repository</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullRepoName",
            "description": "<p>Full name of the repository</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "branchName",
            "description": "<p>Name of the repository's branch</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "GITHUB_TOKEN",
            "description": "<p>The token for a github repository</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "202 Accepted": [
          {
            "group": "202 Accepted",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>The server accepts the request if the build was created succesfully. However, it will also accept requests that are missing the <code>ci-config.json</code> file or if there are compilation and/or test execution error (the <code>message</code> describes what type of error; <code>test</code> or <code>compilation</code>)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{ state: 'success' }",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "{\n    state: 'failure',\n    description: 'Cannot find ci-config.json file',\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "{ state: 'failure', message: 'Type: test' }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "json",
            "optional": false,
            "field": "MissingGithubToken",
            "description": "<p>GitHub token missing</p>"
          },
          {
            "group": "500 Internal Server Error",
            "type": "json",
            "optional": false,
            "field": "SaveError",
            "description": "<p>Error when saving to database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ state: 'failure' }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{ state: 'failure', messsage: 'Internal server error' }",
          "type": "json"
        }
      ]
    },
    "filename": "src/index.ts",
    "groupTitle": "Server"
  }
] });
