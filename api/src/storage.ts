import { Client } from "minio"
import { Readable } from 'stream'

const MINIO_ENDPOINT = process.env['MINIO_ENDPOINT'] ?? 'minio.local'
const MINIO_ACCESSKEY = process.env['MINIO_ACCESSKEY'] ?? 'user'
const MINIO_SECRETKEY = process.env['MINIO_SECRETKEY'] ?? 'password'

class ObjectStorage {

    private client: Client

    constructor(endPoint: string, accessKey: string, secretKey: string) {
        this.client = new Client({
            endPoint: endPoint,
            port: 443,
            useSSL: true,
            accessKey: accessKey,
            secretKey: secretKey
        });
    }

    async bucketExists(name: string) {
        return new Promise((resole, reject) => {
            this.client.bucketExists(name, (err, exists) => {
                if (err) {
                    reject(err)
                }
                resole(exists)
            })
        })
    }

    async makeBucket(name: string, region: string = 'us-east-1') {
        return new Promise((resole, reject) => {
            this.client.makeBucket(name, region, (err) => {
                if (err) {
                    reject(err)
                }
                resole(true)
            })
        })
    }

    async streamObject(bucketName: string, objectName: string): Promise<Readable> {
        return new Promise((resolve, reject) => {
            this.client.getObject(bucketName, objectName, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }
}


export default new ObjectStorage(MINIO_ENDPOINT, MINIO_ACCESSKEY, MINIO_SECRETKEY)

