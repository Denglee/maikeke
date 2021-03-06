<template>

  <div style="display: flex;align-items: center;">
    <el-avatar :src='imageUrl' :size="70" class='marR10' v-if="isAvater"></el-avatar>
    <el-image v-else
              :src="imageUrl" :style="{width:imgWidth +'px',height:imgHeight +'px' }"
              class='marR10'
              :preview-src-list="imageUrlArr"></el-image>
    <el-upload
        action="string"
        list-type="picture"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleCrop">
      <el-button size="small" type="primary">上传</el-button>
    </el-upload>

    <!-- 剪裁组件弹窗 -->
    <el-dialog :append-to-body="true" :visible.sync="cropperModel"
               width="1100px" :before-close="beforeClose">
      <cropper :img-file="file" ref="vueCropper"
               @upload="FnSingleUpload"
               :isAvater = 'isAvater'
               v-bind="$attrs"></cropper>
    </el-dialog>
  </div>

</template>
<script>
import cropper from '@/components/cropper/cropper';

import {upload,uploadUserAvatar} from '@/assets/js/api'

export default {
  name: 'uploader',
  // inject:['uploadPage'],
  props: {
    isAvater: {
      type: Boolean,
      default: false,
    },
    imgWidth: {
      // 单图显示宽度
      type: Number,
      default: 420,
    },
    imgHeight: {
      // 单图显示高度
      type: Number,
      default: 220,
    },

    targetUrl: {
      // 上传地址
      type: String,
      // default: '/storage/upload'
      default: `${process.env.API_ROOT}/upload/`
    },

    initUrl: {
      // 初始图片链接
      default: ''
    },


  },
  data() {
    return {
      file: '', // 当前被选择的图片文件
      imageUrl: '', // 单图情况框内图片链接
      uploadList: [], // 上传图片列表
      dialogVisible: false, // 展示弹窗开关
      cropperModel: false, // 剪裁组件弹窗开关

      imageUrlArr:[],
    };
  },
  updated() {
    if (this.$refs.vueCropper) {
      this.$refs.vueCropper.Update();
    }
  },

  watch: {
    initUrl: function (val) {
      // 监听传入初始化图片
      // console.info('watch');
      if (val) {
        if (typeof this.initUrl === 'string') {
          this.imageUrl = val;
        }
        // else {
        //     this.uploadList = this.formatImgArr(val);
        //     // this.$emit('imgupload', this.uploadList);
        // }
      }
    }
  },
  mounted() {
    if (typeof this.initUrl === 'string') {
      this.imageUrl = this.initUrl;
      this.imageUrlArr.push(this.initUrl);
    }
    // else {
    //     this.uploadList = this.formatImgArr(this.initUrl);
    // }
  },
  methods: {

    /** ***************** single单图情况 ******************/
    handlePreviewSingle(file) { // 点击进行图片展示
      this.dialogImageUrl = this.file.url;
      this.dialogVisible = true;
    },

    beforeClose() {
      console.log(this.uploadList);
      this.cropperModel = false;
    },
    handleCrop(file, files) {
      // console.log(file);
      // 点击弹出剪裁框
      this.cropperModel = true;
      this.file = file;
      // this.imageUrl = file.url
    },

    FnSingleUpload(data) {
      this.$emit('FnUploadPage',data);
    },
  },
  components: {
    cropper,
  },
};
</script>
<style>
.marR10 {
  margin-right: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  color: #8c939d;
  text-align: center;
}

.avatar {
  display: block;
}

.reupload {
  border-radius: 50%;
  position: absolute;
  color: #fff;
  background-color: #000000;
  opacity: 0.6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}

#uploadIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
</style>
