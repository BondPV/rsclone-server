import { Request, Response } from 'express';
import { telegram } from '../../config/default';

async function sendMessageToTelegram(message: string) {
  const url = `${telegram.url}/bot${telegram.token}/sendMessage?chat_id=${telegram.chat}&parse_mode=html&text=${message}`;

  try {
    const response = await fetch(url, { method: 'POST' });

    if (!response.ok) {
      console.log(`Message server error Error! status: ${response.status}`);
      return {
        status: response.status,
        message: 'Message server error',
      };
    }

    return {
      status: response.status,
      message: 'Message sent successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 403,
      message: 'Message server error',
    };
  }
}

export async function sendMessage(req: Request, res: Response) {
  try {
    const { email, username, message } = req.body;
    
    const fields: string[] = [
      '<b>Name</b>: ' + username,
      '<b>Email</b>: ' + email,
      '<b>Message</b>: ' + message,
    ];

    let msg = '';
    fields.forEach(field => {
      msg += field + '\n';
    });
    msg = encodeURI(msg);

    const telegramResponse = await sendMessageToTelegram(msg);

    return res.status(telegramResponse.status).json({ message: telegramResponse.message });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Message server error' });
  }
}


