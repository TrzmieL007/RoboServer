This is a simple server to be run on Rasbery Pi 3 with NodeJS installed.

You should be able to do

    sudo apt-get update
    curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
    sudo apt-get install -y nodejs

And verify nodeJS version by

    node -v

Then you can run the server by npm start from root directory (directory containing package.json).

You can use the server to execute commands over TCP connection, eg. by sending a request to

    http://<rasberyIP>:8184/cmd?spawn=<ProgramName>[&arguments=<arg>]

You can send multiple arguments under same name, it will be converted to an array.
To test this out try `http://<rasberyIP>:8184/`, fill in form and click Send button. The response will be displayed below the form.

The execution of a command is limited to a list of commands specified in `./src/constants.js` under Commands prop. other commands will not be executed to prevent harmful request by unauthorized users.
#REMEMBER!
This is not safe way of executing commands on the system. This is simple HTTP server without any transfer encryption or user authentication. This is just a demo tool.