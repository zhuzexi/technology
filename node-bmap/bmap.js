var request = require('request') // 用于请求瓦片地图
var fs = require("fs");  // 文件操作
var bagpipe = require('bagpipe')  //  用于异步请求数量控制
var TileLnglatTransform = require('tile-lnglat-transform'); //  用于经纬度转换为瓦片坐标
var x1 = 120.128465, y1 = 30.393577 // 起始点坐标（左上角）
var x2 = 120.708555, y2 = 29.914415 // 终点坐标（右下角）
 
// 根据地图平台使用转换类
var TileLnglatTransformBaidu = TileLnglatTransform.TileLnglatTransformBaidu;
var all = [] // 保存所有层级瓦片坐标等信息
for(i = 3; i <= 18; i++){
  all[i] = {}
  p1 = TileLnglatTransformBaidu.lnglatToTile(x1, y1, i)
  p2 = TileLnglatTransformBaidu.lnglatToTile(x2, y2, i)
  all[i].t = i // 层级
  all[i].x = [p1.tileX, p2.tileX] // 瓦片横坐标范围（左至右）
  all[i].y = [p2.tileY, p1.tileY] // 瓦片纵坐标范围（下至上）
}
// console.log(all)
var bag = new bagpipe(100, {timeout: 1000}) //限制请求数，此处为100，可根据网络情况修改
var path = './tiles' // 瓦片目录
fs.access(path, fs.constants.F_OK, err => {
  // 创建tiles文件夹
  if (err) fs.mkdir(path, err => {})
  for (let z = 3; z <= all.length - 1; z++) {
    fs.access(`${path}/${z}`, fs.constants.F_OK, err => {
      // 创建tiles/Z文件夹 ,Z是层级
      if (err) fs.mkdir(`${path}/${z}`, err => {})
      for (let x = all[z].x[0]; x <= all[z].x[1]; x++) {
        fs.access(`${path}/${z}/${x}`, fs.constants.F_OK, err => {
          // 创建tiles/Z/X文件夹 ,X是瓦片横坐标
          if (err) fs.mkdir(`${path}/${z}/${x}`, err => {})
        })
      }
    })
  }
  // 文件夹可能较多，等待1s开始下载
  setTimeout(() => {
    task()
  }, 1000)
})
function task() {
  for (let z = 3; z <= all.length - 1; z++) {
    for (let x = all[z].x[0]; x <= all[z].x[1]; x++) {
      for (let y = all[z].y[0]; y <= all[z].y[1]; y++) {
        // 将下载任务推入队列，bag会以100张为单位批量下载
        bag.push(download, x, y, z)
      }
    }
  }
}
//let url = `http://online0.map.bdimg.com/tile/?qt=tile&x=${i}&y=${j}&z=${z}&styles=pl&scaler=1&udt=20180711`//普通地图瓦片
function download(i, j, z) {
  // url是百度服务器上的图片资源，尾部时间可根据需要修改，最好下载最新的
  //这是有背景的地图瓦片
  let url = `http://api0.map.bdimg.com/customimage/tile?&x=${i}&y=${j}&z=${z}&udt=20190314&scale=1&customid=midnight`
  request({url, timeout: 4000}, (err, res, body) => {
    if (err) {console.log(err)}
  }).pipe(fs.createWriteStream(`${path}/${z}/${i}/${j}.png`));
}