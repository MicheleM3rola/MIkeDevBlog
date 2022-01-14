import aws from "aws-sdk";
import NextCors from "nextjs-cors";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_MIKEBLOG,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MIKEBLOG,
    region: process.env.AWS_REGION,
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();

  // third snippet

  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME_MIKEBLOG,
    Key: fileName,
    ContentType: fileType,
  };

  try {
    s3.getSignedUrl("putObject", s3Params, async (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      }
      const returnData = {
        signedRequest: data,
        url: `https://${process.env.AWS_BUCKET_NAME_MIKEBLOG}.s3.ap-southeast-2.amazonaws.com/${fileName}`,
      };

      return res.status(200).json(returnData);
    });
  } catch (err) {
    return res.status(500).json(err);
  }
}
