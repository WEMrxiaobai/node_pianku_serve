
var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    ffmpeg=require('ffmpeg');
console.log(ffmpeg);
http.createServer(function (req, res) {
    if (req.url != "/v") {
        res.writeHead(200, { "Content-Type": "text/html" });
        // res.end('<video src="/v" controls style="height:80vh;width:auto;"></video>');
        res.end(`
        <link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video-js.min.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video.min.js"></script>
        <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" width="640" height="264" poster="http://vjs.zencdn.net/v/oceans.png">
            <source src="/v" type="video/mp4">
        </video>
        <script>
        var player = videojs('example_video_1',{ 
            muted: true,
            controls : true,      
            height:600, 
            width:900,
            loop : true,
            // 更多配置.....
        });
        </script>
        `)
    } else {
        //G:/phpstudy_pro/WWW/maccms/    E:/电影视频/大鱼.Big.Fish.2003.BD1080P.中英字幕.mp4

        var file = path.resolve("E:/电影视频/大鱼.Big.Fish.2003.BD1080P.中英字幕.mp4");
        fs.stat(file, function (err, stats) {
            if (err) {
                if (err.code === 'ENOENT') {   // 404 Error if file not found
                    return res.sendStatus(404);
                }
                res.end(err);
            }
            var range = req.headers.range;
            if (!range) {
                // 416 Wrong range
                return res.sendStatus(416);
            }
            var positions = range.replace(/bytes=/, "").split("-");
            var start = parseInt(positions[0], 10);
            var total = stats.size;
            var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            var chunksize = (end - start) + 1;

            res.writeHead(206, {
                "Content-Range": "bytes " + start + "-" + end + "/" + total,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": "video/mp4"
            });

            var stream = fs.createReadStream(file, { start: start, end: end })
                .on("open", function () {
                    // console.log("res；",res);
                    stream.pipe(res);
                }).on("error", function (err) {
                    res.end(err);
                });
        });
    }
}).listen(5656);
console.log("启动",5656);