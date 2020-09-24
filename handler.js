const { spawnSync } = require("child_process");
const { readFileSync, writeFileSync, unlinkSync } = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

module.exports.makeVideoFormat = async (event, context) => {

     if(event.queryStringParameters.id){
      const s3Object = await s3
      .getObject({
        Bucket: 'testbucket4848',
        Key: event.queryStringParameters.id
      })
      .promise();
      //write video to disk
      writeFileSync(`/tmp/${event.queryStringParameters.id}`, s3Object.Body);
      
    spawnSync(
      "/opt/ffmpeg/ffmpeg",
      [
        "-i",
        '/tmp/${event.queryStringParameters.id}',
        "-vf",
        'scale=480*360',
        '/tmp/${event.queryStringParameters.id}.480x360.mp4'
      ],
      { stdio: "inherit" }
    );
    
      // read video from disk
    const file = readFileSync('/tmp/${event.queryStringParameters.id}.480x360.mp4');
      // delete the temp files
    unlinkSync('/tmp/${event.queryStringParameters.id}.480x360.mp4');
    unlinkSync('/tmp/${event.queryStringParameters.id}.mp4');
      // upload vidoe to s3
    await s3
      .putObject({
        Bucket: 'testbucket4848',
        Key: `${event.queryStringParameters.id}.480x360.mp4`,
        Body: file
      })
      .promise();
        
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event
      },
      null,
      2
    ),
  };
};
