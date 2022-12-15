import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  return new Promise((resolve) => {
    req.headers.cookie = '';

    req.url = req.url?.replace(/^\/api/, '');

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';
      proxyRes.on('data', function (chunk) {
        body += chunk;
      });
      proxyRes.on('end', function () {
        try {
          const { accessToken, refreshToken, userId } = JSON.parse(body);

          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== 'development',
          });

          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date('10m'),
          });
          cookies.set('refresh_token', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
          });
          cookies.set('userId', userId, {
            httpOnly: true,
            sameSite: 'lax',
          });

          (res as NextApiResponse)
            .status(200)
            .send({ message: 'login successfully' });
        } catch (error: any) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: 'something went wrong' });
        }

        resolve(true);
      });
    };

    proxy.once('proxyRes', handleLoginResponse);
    proxy.web(req, res, {
      target: 'http://localhost:8080',
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
