import * as AWS from "aws-sdk"

AWS.config.update({
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID_CAROOSEL,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY_CAROOSEL,
  'region': process.env.AWS_REGION_CAROOSEL,
  'bucketname': process.env.AWS_BUCKET_NAME_CAROOSEL
})

const s3 = new AWS.S3({apiVersion: "2006-03-01"})

export default function uploadAudio(req, res) {
  // const filter = req.query.q ? new RegExp(req.query.q, "i") : /.*/;
  // const bucket = s3.getObject({Bucket: "caroosel-bucket", Key: ""})
  s3.listObjects({Bucket: "caroosel-bucket"}, (e, d) => {
    if (e)  console.log(e, e.stack);
    else    res.end(JSON.stringify(d))
  })
}