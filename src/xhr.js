import axios from 'axios'
import axiosRetry from 'axios-retry'

/**
 * @param {String} URL The url to make the ajax request on
 * @param {String} Type Type of data to response with
 * @param {Number} Timeout The amount of seconds before failing
 * @param {Number} Maxtries The amount of failures allowed
 * @returns {Promise} Axios promise object
 */
export default function (url, type, timeout, maxtries) {
  axiosRetry(axios, {
    retries: maxtries,
    retryDelay: axiosRetry.exponentialDelay
  })
  return axios({
    method: 'get',
    url: url,
    timeout: timeout * 1000,
    responseType: type
  })
}
