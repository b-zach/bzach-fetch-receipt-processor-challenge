## Instructions
1. Download the docker image from: https://hub.docker.com/repository/docker/bzach43/fetch-receipt-processor-challenge/general, e.g. `docker pull bzach43/fetch-receipt-processor-challenge`.
2. Run the docker image, e.g. `docker run bzach43/fetch-receipt-processor-challenge`.
3. The server should start and you should see the message: `server is listening on 3000`. If it doesn't start for some reason, you can try the command `npm run serve`.
4. It should be ready to go! I've already installed `curl` on the docker image as well as some examples I used during testing, so you can see that it's working by running commands like the example below. Happy testing!

  ```
  curl -X POST -H "Content-Type: application/json" -d @examples/simple-receipt.json localhost:3000/receipts/process
  ```
