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
    req.url = req.url?.replace(/^\/api/, '');

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      proxyRes.on('end', function () {
        try {
          const cookies = new Cookies(req, res);
          cookies.set('access_token');
          cookies.set('refresh_token');
          cookies.set('userId');

          (res as NextApiResponse)
            .status(200)
            .send({ message: 'logout successfully' });
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
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
