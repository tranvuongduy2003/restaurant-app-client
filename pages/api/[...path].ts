import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import { createProxyMiddleware } from 'http-proxy-middleware';

// const proxy = createProxyMiddleware({
//   target: 'http://localhost:8080',
//   pathRewrite: {
//     '^/api': '',
//   },
//   changeOrigin: true,
//   selfHandleResponse: false,
// });

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false, // enable POST requests
    externalResolver: true, // hide warning message
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  req.headers.cookie = '';

  req.url = req.url?.replace(/^\/api/, '');

  proxy.web(req, res, {
    target: 'http://localhost:8080',
    changeOrigin: true,
    selfHandleResponse: false,
  });
}
