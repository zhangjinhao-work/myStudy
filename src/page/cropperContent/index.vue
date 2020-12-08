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
              <el-button type="success" size="mini" @click="sureCropper()"
                ><i class="el-icon-check"></i
              ></el-button>
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
import Cropper from 'cropperjs'
export default {
  data() {
    return {
      imageUrl: "",
        cropper: null,
      croppShow: false,
      previewImg:"",
      cropOption: {
        offset_x: 30,
        offset_y: 40,
        width: 600,
        height: 400
      },
      cropData:null
    };
  },
  mounted(){
    this.drawImg()
  },
  methods: {
    // 在canvas上绘制图片
    drawImg () {
      const _this = this
      this.$nextTick(() => {
        let canvas = document.getElementById(this.imageUrl)
        if (canvas) {
          canvas.width = 720
          canvas.height = 480
          let ctx = canvas.getContext('2d')
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          let img = new Image()
          img.crossOrigin = 'Anonymous'
          img.src = this.imageUrl
          img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            _this.initCropper()
          }
        }
      })
    },
    // 显示裁剪框
    initCropper () {
      this.croppShow = true
      this.cropper = new Cropper(this.$refs.canvas, {
        checkCrossOrigin: true,
        viewMode: 0,
        zoomOnWheel: true, // 是否可以通过移动鼠标来放大图像
        // aspectRatio: 3 / 2,
        ready: () => {
          this.cropper.setData({
            x: this.cropOption.offset_x,
            y: this.cropOption.offset_y,
            width: this.cropOption.width,
            height: this.cropOption.height
          })
        }
      })
      // this.cropper = cropper
    },
    changeUpload(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 2;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 2MB!");
        return false;
      }
      this.fileinfo = file;
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      // 上传成功后将图片地址赋值给裁剪框显示图片
      // this.$nextTick(() => {
      //   this.option.img = file.url
      //   this.dialogVisible = true
      // })
    },
    // 确认裁剪
    sureCropper () {
      console.log("裁剪")
      let _this = this
      const cropParam = this.cropper.getData()
      this.cropper.getCroppedCanvas().toBlob(function (blob) {
        let oFileReader = new FileReader()
        oFileReader.onloadend = function (e) {
          let base64 = e.target.result
          _this.$emit('getCropImg', base64, cropParam)
        }
        oFileReader.readAsDataURL(blob)
      }, 'image/jpeg')
    },
    getCropImg(base64,cropParam){
       this.previewImg = base64
        this.cropData = cropParam
    }
  },
};
</script>

<style>
</style>