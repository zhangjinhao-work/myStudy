<template>
  <div>
    <h2>使用cropperjs插件实现可以回显裁剪框并获取裁剪后的数据</h2>
    <!-- element 上传图片按钮 -->
    <el-upload
      class="upload-demo"
      action="#"
      drag
      :auto-upload="false"
      :show-file-list="false"
      :on-change="changeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">点击上传</div>
      <div class="el-upload__tip">
        支持绝大多数图片格式，单张图片最大支持2MB
      </div>
    </el-upload>
    <el-row>
      <el-col :span="12">
        <div class="rc-cropper__canvasCrop2">
          <img :src="imageUrl" v-if="!cropper" />
          <canvas :id="imageUrl" ref="canvas" />
          <div class="rc-cropper__iconCrop">
            <el-tooltip content="确认裁剪" placement="right" v-if="cropper">
              <el-button type="success" size="mini" @click="sureCropper()">
                <i class="el-icon-check"></i>
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="rc-cropper__previewImg">
          <img :src="previewImg" id="previewImg" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

export default {
  data() {
    return {
      imageUrl: "",
      cropper: null,
      croppShow: false,
      previewImg: "",
      cropOption: {
        offset_x: 30,
        offset_y: 40,
        width: 600,
        height: 400,
      },
      cropData: null,
    };
  },
  mounted() {},
  methods: {
    // 在canvas上绘制图片
    drawImg() {
      const _this = this;
      this.$nextTick(() => {
        let canvas = document.getElementById(this.imageUrl);

        if (canvas) {
          canvas.width = 720;
          canvas.height = 480;
          let ctx = canvas.getContext("2d"); //创建2D画布
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          let img = new Image();
          img.crossOrigin = "Anonymous"; //https://www.jianshu.com/p/a82b491ec566
          img.src = this.imageUrl;
          img.onload = function () {
            //图片加载完成后立即执行
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height); //在画布上定位图像，并规定图像的宽度和高度：
            _this.initCropper();
          };
        }
      });
    },
    // 显示裁剪框
    initCropper() {
      this.croppShow = true;
      this.cropper = new Cropper(this.$refs.canvas, {
        checkCrossOrigin: true, //检查当前图像是否是跨源图像 https://blog.csdn.net/qq_41389920/article/details/87967539
        viewMode: 0, //- 视图模式
        zoomOnWheel: true, // 是否可以通过移动鼠标来放大图像
        // aspectRatio: 3 / 2, //- 宽高比
        ready: () => {
          this.cropper.setData({
            // 传递一个同 'getData()' 返回的对象，来设置图像的裁剪区域 ,此方法仅在 'viewMode' 选项大于或等于1时可用。
            x: this.cropOption.offset_x,
            y: this.cropOption.offset_y,
            width: this.cropOption.width,
            height: this.cropOption.height,
          });
        },
      });
      // this.cropper = cropper
    },
    changeUpload(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 2;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 2MB!");
        return false;
      }
      this.fileinfo = file;
      console.log(file.raw);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      this.drawImg();
    },
    // 确认裁剪
    sureCropper() {
      console.log("裁剪");
      let _this = this;
      const cropParam = this.cropper.getData(); //输出最终裁剪区域的位置和大小数据
      this.cropper.getCroppedCanvas().toBlob(function (blob) {
        let oFileReader = new FileReader();
        oFileReader.onloadend = function (e) {
          //读取完成触发，无论成功或失败  https://www.jianshu.com/p/cde728c4e334
          let base64 = e.target.result;
          _this.getCropImg(base64, cropParam);
        };
        oFileReader.readAsDataURL(blob); //给FileReader对象一个读取完成的方法,使用 readAsDataURL 会返回一个url,这个值就保存在事件对象的result里,img通过加载这个地址,完成图片的加载
      }, "image/jpeg");
    },
    getCropImg(base64, cropParam) {
      this.previewImg = base64;
      this.cropData = cropParam;
      console.log(this.previewImg);
      console.log(this.cropData);
    },
  },
};
</script>

<style>
</style>