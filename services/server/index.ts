import * as http from 'http'

import {Config} from '@libs/config'

// For k8s health checks
http
  .createServer((_req, res) => res.writeHead(200).end('Anagular Render Emails Server'))
  .listen(8080)
