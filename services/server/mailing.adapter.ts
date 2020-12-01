import {injectable} from 'inversify'
import {connect} from 'node-mailjet'

import {Config} from '@libs/config'

@injectable()
export class MailingAdapter {
  private readonly from = this.config.get('mailing.from')
  private readonly fromName = this.config.get('mailing.fromName')
  private readonly publicKey = this.config.get('secrets.mailjet.publicKey')
  private readonly privateKey = this.config.get('secrets.mailjet.privateKey')
  private mailjet = connect(this.publicKey, this.privateKey)

  constructor(private readonly config: Config) {}

  async send(to: string, subject: string, html: string, text: string) {
    const options = {
      Messages: [
        {
          From: {Email: this.from, Name: this.fromName},
          To: [{Email: to}],
          Subject: subject,
          TextPart: text,
          HTMLPart: html,
        },
      ],
    }
    const result = await this.mailjet.post('send', {version: 'v3.1'}).request(options)
    return result
  }
}
