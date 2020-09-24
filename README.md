# lambda-function
Created a lambda function to convert mp4 into specifc resolution.

You required s3 bucket with a video in it.
(I had mov.bbbb.mp4 file in s3 bucket with name as testbucket4848)

After executing lambda function it get converted into mov_bbbb.640x360.mp4 on the same s3 bucket.

For this setup I had used serverless framework and ffmpeg for video conversion.
