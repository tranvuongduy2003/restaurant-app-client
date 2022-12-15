import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve) => {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('access_token');
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    req.headers.cookie = '';

    req.url = req.url?.replace(/^\/api/, '');

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.once('proxyRes', () => {
      resolve(true);
    });
  });
}
