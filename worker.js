self.addEventListener('message', e => {
  const imageBitmap = e.data.imageBitmap; // 获取到了主线程的图片资源
  console.log('imageBitmap', imageBitmap);

  const processImageBitmap = processImage(imageBitmap); // processImage就是取到进程中的资源处理成canvas需要的格式
  // console.log('processImageBitmap', processImageBitmap);
  // createImageBitmap(processImageBitmap);
  createImageBitmap(processImageBitmap).then(processImageBitmapRes => {
    // processImage就是取到进程中的资源处理成canvas需要的格式
    console.log('processImageBitmapRes', processImageBitmapRes);
    self.postMessage({ processImageBitmap: processImageBitmapRes }, [processImageBitmapRes]); // 触发主线程的onmessage
  });
});

function processImage(inputImageBitmap) {
  const canvas = new OffscreenCanvas(inputImageBitmap.width, inputImageBitmap.height); // 实例化一个画布

  const ctx = canvas.getContext('2d');
  ctx.drawImage(inputImageBitmap, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const inputData = new Uint8Array(imageData.data.buffer);
  // console.log(inputData); // 每四个一组，一组表示一个16进制像素点
  const outputData = new Uint8Array(inputData.length); // 创建一个大小相同的容器

  // 变黑白
  for (let i = 0; i < inputData.length; i += 4) {
    const avg = (inputData[i] + inputData[i + 1] + inputData[i + 2]) / 3;
    outputData[i] = avg; // 取平均值，颜色就不会很深或者很浅
    outputData[i + 1] = avg;
    outputData[i + 2] = avg;
    outputData[i + 3] = inputData[i + 3]; // 保留颜色饱和度
  }

  return new ImageData(new Uint8ClampedArray(outputData.buffer), canvas.width, canvas.height);
}
