import 'reflect-metadata'
import * as express from 'express'
import axios from 'axios'
import {Container} from 'inversify'
import * as inlineCss from 'inline-css'

import {Config} from '@libs/config'
import {MailingAdapter} from './mailing.adapter'

const app = express()
const container = new Container()

container.bind(MailingAdapter).toSelf().inSingletonScope()
container.bind(Config).toSelf().inSingletonScope()

const mailingAdapter = container.get(MailingAdapter)
const config = container.get(Config)
const clientHost = config.get('mailClient')

// http://localhost:3000/welcome?name=Someone&email=someone@example.com
app.get('/welcome', async (req, res) => {
  const {name, email} = req.query
  if (!(name && email)) return res.send('Please provide a name and an email!')
  const {data} = await axios.get(`${clientHost}/emails/welcome?name=${name}&email=${email}`)
  const inlined = await inlineCss(data, {url: __dirname})
  const bodyStartIndex = inlined.indexOf('<are-root>')
  const bodyEndIndex = inlined.indexOf('</are-root>')
  const extracted = inlined.substring(bodyStartIndex, bodyEndIndex + 11)
  await mailingAdapter.send(email!.toString(), 'Welcome', extracted, 'mail text version')
  res.send(extracted)
})

app.listen(3000)
