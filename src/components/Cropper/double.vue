<template>
    <div>
        <!-- 多图片上传 -->
        <el-upload v-if="multiple" action='string' list-type="picture-card" accept="image/*" :on-preview="handlePreview"
                   :auto-upload="false" :on-remove="handleRemove"
                   :http-request="upload" :on-change="consoleFL" :file-list="uploadList">
            <i class="el-icon-plus"></i>
        </el-upload>


        <!-- 多图片预览弹窗 -->
        <el-dialog  :append-to-body="true" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <!-- 剪裁组件弹窗 -->
        <el-dialog  :append-to-body="true" :visible.sync="cropperModel" width="1100px" :before-close="beforeClose">
            <Cropper :img-file="file" ref="vueCropper" :fixedNumber="fixedNumber" @upload="upload">
            </Cropper>
        </el-dialog>
    </div>
</template>

<script>
    import Cropper from '@/components/cropper/cropper';
    // import Api from '@/js/api.js' //接口url配置文件

    export default {
        name:'Receptionindex',

        props: {
            targetUrl: {
                // 上传地址
                type: String,
                // default: '/storage/upload'
                default: `${process.env.API_ROOT}/sys/oss/upload`
            },
            multiple: {
                // 多图开关
                type: Boolean,
                default: true
            },
            initUrl: {
                // 初始图片链接
                default: ''
            },
            fixedNumber: {
                // 剪裁框比例设置
                default: function () {
                    return [1.5, 1];
                }
            },
            width: {
                // 单图剪裁框宽度
                type: Number,
                default: 178
            },
            height: {
                // 单图剪裁框高度
                type: Number,
                default: 178
            }
        },
        data () {
            return {
                file: '', // 当前被选择的图片文件
                imageUrl: '', // 单图情况框内图片链接
                dialogImageUrl: '', // 多图情况弹窗内图片链接
                uploadList: [], // 上传图片列表
                reupload: true, // 控制"重新上传"开关
                dialogVisible: false, // 展示弹窗开关
                cropperModel: false, // 剪裁组件弹窗开关
                reuploadWidth: this.height * 0.7, // 动态改变”重新上传“大小
            };
        },
        updated () {
            if (this.$refs.vueCropper) {
                this.$refs.vueCropper.Update();
            }
        },
        watch: {
            initUrl: function (val) {
                console.log(val);
                // 监听传入初始化图片
                // console.info('watch');
                if (val) {
                    if (typeof this.initUrl === 'string') {
                        this.imageUrl = val;
                    } else {
                        this.uploadList = this.formatImgArr(val);
                        // this.$emit('imgupload', this.uploadList);
                    }
                }
            }
        },
        mounted () {
            if (typeof this.initUrl === 'string') {
                this.imageUrl = this.initUrl;
            } else {
                this.uploadList = this.formatImgArr(this.initUrl);
            }
        },
        methods: {
            /** **************************** multiple多图情况 **************************************/
            handlePreview (file) {
                console.log(file);
                // 点击进行图片展示
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove (file, fileList) {
                // 删除图片后更新图片文件列表并通知父级变化
                this.uploadList = fileList;
                this.$emit('imgupload', this.uploadList);
                // this.$emit('imgupload', this.formatImgArr(this.uploadList));
            },
            consoleFL (file, fileList) {
                console.log(file);
                // 弹出剪裁框，将当前文件设置为文件
                this.cropperModel = true;
                this.file = file;
                // this.uploadList = fileList;
            },
            /************************************************************************************/


            async upload (data) {
                // 自定义upload事件
                if (!this.multiple) {
                    // 如果单图，则显示正在上传
                    this.$refs.uploading.style.display = 'block';
                }
                let img = new Image();
                img.src = data;
                img.onload = async () => {
                    // let _data = this.compress(img);
                    let blob = this.dataURItoBlob(data);
                    let formData = new FormData();
                    formData.append('file', blob, this.file.name); // 有的后台需要传文件名，不然会报错
                    this.imgUpload(formData);
                };
            },
            async imgUpload(formData) {
                const res = await this.$http({
                    url: 'sys/oss/upload',
                    method: 'post',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (!this.multiple) {
                    // 上传完成后隐藏正在上传
                    this.$refs.uploading.style.display = 'none';
                }
                if (res.data.code === 0) {
                    // 上传成功将照片传回父组件
                    const currentPic = res.data.url;
                    if (this.multiple) {
                        this.uploadList.push({
                            url: currentPic,
                            uid: '111'
                        });
                        this.$emit('imgupload', this.uploadList);// 根据自己实际项目需要将照片返回给父组件
                        // this.uploadList.pop();
                        // this.$emit('imgupload', this.formatImgArr(this.uploadList));
                    } else {
                        this.$emit('imgupload', currentPic);
                    }
                    this.$refs.vueCropper.isDisabled = false;
                } else {
                    // 上传失败则显示上传失败，如多图则从图片列表删除图片
                    if (!this.multiple) {
                        this.$refs.failUpload.style.display = 'block';
                    } else {
                        this.uploadList.pop();
                    }
                    this.$refs.vueCropper.isDisabled = false;
                }
                this.cropperModel = false;
            },

            formatImgArr (arr) {
                const result = arr.map((item, index) => {
                    if (typeof item === 'string') {
                        return {
                            url: item,
                            uid: `index${index}`
                        };
                    } else {
                        return item.url;
                    }
                });
                return result;
            },

            beforeClose () {
                // this.uploadList.pop();
                console.log(this.uploadList);
                this.cropperModel = false;
            },

            // 压缩图片
            compress(img) {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                // let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                canvas.width = width;
                canvas.height = height;
                // 铺底色
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);
                // 进行压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.8);
                return ndata;
            },

            // base64转成bolb对象
            dataURItoBlob(base64Data) {
                let byteString;
                if (base64Data.split(',')[0].indexOf('base64') >= 0) { byteString = atob(base64Data.split(',')[1]); } else { byteString = unescape(base64Data.split(',')[1]); }
                let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
                let ia = new Uint8Array(byteString.length);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ia], { type: mimeString });
            }
        },
        components: {
            Cropper
        },

    }
</script>


<style>
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
    #uploadIcon{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
    }
</style>