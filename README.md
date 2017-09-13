# 9Digital-Code-Challenge

[![Build Status](https://travis-ci.org/Dan-Wood/9Digital-Code-Challenge.svg?branch=master)](https://travis-ci.org/Dan-Wood/9Digital-Code-Challenge)

A code challenge set by 9Digital for a NodeJS JSON web service.

<h3>Technical Specifications</h3>

Build a JSON based web service that takes a specific payload (see tests/api/payload.json) in JSON format and returns specific elements based on the criteria of<br> 
drm = true<br>
episodeCount > 0

The response must include the following from the payload and be returned in JSON format<br>
image<br>
slug<br>
title

There must be error handling for invalid JSON with the key or "error" and the HTTP status code of 400 (Bad Request).



<h3>Requirements</h3>

Linux machine with internet access.

NodeJS 6 ( tested on v6.11.0 & v6.11.3 )<br>

<u>Global dependencies</u><br>
forever<br>
forever-service


<h3>Setup</h3>

This small service requires that forever and forever-service are installed as global packages, this may require sudo.

    sudo npm install -g forever forever-service
    
Please note forever-service is not supported on MacOS, at least at the time of writing..

<h4>Environment Variables</h4>

The .env file holds the WEBSERVER_PORT config along with NODE_ENV

If no port is supplied the default of 3000 will be applied.

<h4>Production</h4>

    npm install --production
    
Production setup options are as follows; <br>
You can start/stop/restart the service using the commands below, which will use forever to keep the service running in the background.
Forever also 

    npm start
    
    npm stop
    
    npm restart
    
If forever-service is installed as suggested you can install the service to run on boot using

    npm run-script install_service
    
You may also remove the service by running
    
    npm run-script remove_service
    
<h4>Dev</h4>

    npm install --devDependencies
    
Dev has two npm run-script's dev_start and test, you can use the normal start, stop, restart options.

dev_start will give you full debug output with the help from the debug npm module.

    npm run-script dev_start

test runs mocha with chai for assertions, excepts etc. all tests are under the test folder.

    npm test
    
    
    
<h4>Current setup on server</h4>

The current setup for testing used by 9Digital is running on a VPS in America with OS -  Debian 7 64bit

Linux HOSTNAME 2.6.32-042stab120.19 #1 SMP Mon Feb 20 20:05:53 MSK 2017 x86_64 GNU/Linux

NGINX is running in front of the application as a reverse proxy and using Let's Encrypt to supply the SSL certificate by using CertBot ( certbot-auto --nginx -d 9digital.DOMAIN ).

<h5>Default NGINX config</h5>

This is the default config used before using CertBot to apply an SSL certificate.
    
    server {
            server_name 9digital.DOMAIN;
    
            location ~ /.well-known {
                    allow all;
            }
         location / {
              client_max_body_size 20M;
              access_log on;
              proxy_pass   http://127.0.0.1:8109;
         }
    
        listen 80;
    }

