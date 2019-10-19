#### start the project

1. download docker from link
   1. windows: https://docs.docker.com/docker-for-windows/install/
   2. mac: https://docs.docker.com/docker-for-mac/install/

2. in root directory using command line:

   docker-compose up —build

3. Technical Stack

   * Deploy:

     * Nginx

     * Vultr-Cloud instance

     * Docker
     * docker-compose

   * Frontend main dependencies:
     * antd (Ant Design)
     * axios
     * emoji-mart
     * moment
     * qiniu-js (For uploading image)
     * react-router-dom
   * Backend:
     * express
     * jwt
     * bcrypt
     * redis
     * mongodb
   * Test:
     * mocha
     * supertest
     * chai