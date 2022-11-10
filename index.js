import { lookup } from 'mime-types';
import axios from 'axios';

/**
 * @param {object} input
 * @param {object} input.event
 * @param {string} input.prefix
 * @returns {Promise<{
 *   isBase64Encoded?: boolean
 *   statusCode: number
 *   headers: object
 *   body: string
 * }>}
 */
export async function corsHandler({ event, prefix }) {
  const url = event.path.split(prefix)[1];

  return axios
    .get(url, { responseType: 'arraybuffer' })
    .then(({ status, headers, data }) => ({
      isBase64Encoded: true,
      statusCode: status,
      headers: {
        'Content-Type': lookup(url) || headers['content-type'],
      },
      body: headers['content-type'].includes('json')
        ? JSON.stringify(data)
        : data,
    }))
    .catch(({ message }) => ({
      statusCode: message === 'Invalid URL' ? 404 : 500,
      headers: { 'Content-Type': 'application/json' },
      body: message === 'Invalid URL' ? 'Not Found' : message,
    }));
}
