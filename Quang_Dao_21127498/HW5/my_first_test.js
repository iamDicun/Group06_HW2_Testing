import http from 'k6/http'
import {sleep} from 'k6'

export const options = {
    /*
    stages: [
        {duration: '30s', target: 20},
        {duration: '1m', target: 100},
        {duration: '30s', target: 0}
    ],
    */

    cloud: {
        name: 'Eshop k6 test',
        projectID: 8387848,
    },
}
export default function () {
    http.get('http://localhost:3000')
    sleep(1)
}
