/*** api接口统一管理 */
import { get, post, put, axiosDelete } from './axios';

/**
 *
 * @param {string} params
 * 我们定义了一个index方法
 * 这个方法有一个参数params
 * params是我们请求接口时携带的参数对象
 * 而后调用了我们封装的post方法
 * post方法的第一个参数是我们的接口地址
 * 第二个参数是topics的params参数
 * 即请求接口时携带的参数对象
 * 最后通过export导出topics。
 */

/*
A、登录 + 侧边栏
* */
export const LoginIn = params => post('/auth/login', params); /*登录*/
export const getCodeImg = params => get('/code', params); /*获取验证图片*/


export const ApiLayoutNav = params => get('admin/Web/indexMenu', params); /*获取侧边栏 nav*/

export const ApiloginOut = params => post('admin/Web/login_out', params); /*退出*/
export const ApiChangePass = params => post('admin/Web/update_password', params); /*修改密码*/
export const ApiTopSearch = params => post('admin/Member/getMemberInfo', params); /*HeaderTop 头部搜索*/


/* ==-- B、首页 --== */

/* ==-- B22、前台 --== */
/*1、登记*/
export const checkFaceApi    = params => post('admin/Web/match', params);         /*收支趋势*/


/*店铺授权*/
export const addStoreAuth    = params => post('/storeAuth/addStoreAuth', params);     /* 新增店铺授权 */
export const updateStoreAuth    = params => put('/storeAuth/updateStoreAuth', params);     /* 修改店铺授权 */
export const selectStoreAuth    = params => get('/storeAuth/selectStoreAuth', params);     /* 查询店铺授权列表 */
export const delStoreAuth    = params => axiosDelete('/storeAuth/delStoreAuth/'+params);     /* 单个删除店铺 */
export const delStoreAuthList    = params => axiosDelete('/storeAuth/delStoreAuthList', params);     /* 批量删除店铺授权 */

export const getStoreList    = params => get('/storeAuth/getStoreList', params);     /* 查询所有店铺 */

/* 店铺授权 子账号*/
export const authSonAdd    = params => post('/storeAuth/authSon/add', params);     /* 新增子账号 */
export const authSonList    = params => get('/storeAuth/authSon/list', params);     /* 子账号列表 */
export const authSondelete    = params => axiosDelete('/storeAuth/authSon/'+params);     /* 删除 子账号列表 */
export const authSonUpdate    = params => put('/storeAuth/authSon/update', params);     /* 更新子账号列表 */


/*角色信息*/
export const addUser = params => post('/system/user/', params);     /* 新增   */
export const updateUser = params => put('/system/user/', params);     /* 修改   */
export const getUser = params => get('/system/user/'+params);     /* 获取 id下的 信息  */
export const saveUser = params => put('/system/user/'+params);     /* 获取 id下的 信息  */
export const delUser = params => axiosDelete('/system/user/'+params);     /* 删除 */
export const listUser = params => get('/system/user/list', params);     /* 查询列表   */


/* 21-02-23 菜单 */
export const addMenu = params => post('/system/menu/', params);     /* 新增 菜单  */
export const updateMenu = params => put('/system/menu/', params);     /* 修改 菜单  */
export const getMenu = params => get('/system/menu/'+params);     /* 获取 id下的 菜单信息  */
export const listMenu = params => get('/system/menu/list', params);     /* 菜单信息 */
export const menuGetRouters = params => get('/system/menu/getRouters', params);     /* 获取路由信息 */
export const menuDelRouters = params => axiosDelete('/system/menu/'+params);     /* 删除 */
export const menuRoleTree = params => get('/system/menu/roleMenuTreeselect/'+params);     /* 获取权限树 */
export const selectMenuTable = params => get('/system/menu/selectMenuTable/' +params);     /* 获取 权限树 结构*/

/* 21-02-23 字典 */
export const addDict = params => post('/system/dict/type/', params);     /* 新增   */
export const updateDict = params => put('/system/dict/type/', params);     /* 修改   */
export const listDict = params => get('/system/dict/type/list/', params);     /* 查询字典类型列表   */
export const getDict = params => get('/system/dict/type/'+params);     /* 获取 id下的 菜单信息  */
export const delDict = params => axiosDelete('/system/dict/type/'+params);     /* 删除 */

/* 21-02-23 部门 */
export const addDept = params => post('/system/dept/', params);     /* 新增   */
export const updateDept = params => put('/system/dept/', params);     /* 修改   */
export const listDept = params => get('/system/dept/list', params);     /* 查询列表   */
export const getDept = params => get('/system/dept/'+params);     /* 获取 id下的 信息  */
export const delDept = params => axiosDelete('/system/dept/'+params);     /* 删除 */

/* 21-02-23 岗位  */
export const addPost = params => post('/system/post/', params);     /* 新增   */
export const updatePost = params => put('/system/post/', params);     /* 修改   */
export const listPost = params => get('/system/post/list', params);     /* 查询列表   */
export const getPost = params => get('/system/post/'+params);     /* 获取 id下的 信息  */
export const delPost = params => axiosDelete('/system/post/'+params);     /* 删除 */

/* 21-02-23 角色 */
export const addRole = params => post('/system/role/', params);     /* 新增   */
export const updateRole = params => put('/system/role/', params);     /* 修改   */
export const getRole = params => get('/system/role/'+params);     /* 获取 id下的 信息  */
export const saveRole = params => put('/system/role/'+params);     /* 获取 id下的 信息  */
export const delRole = params => axiosDelete('/system/role/'+params);     /* 删除 */
export const changeRoleStatus = params => put('/system/role/changeStatus/'+params);     /* 获取 id下的 信息  */
export const listRole = params => get('/system/role/list', params);     /* 查询列表   */
export const optionRole = params => get('/system/role/optionselect', params);     /* 查询列表选择   */
export const queryUser = params => get('/system/role/queryUser/'+params);     /* 查询列表选择   */


/* 21-02-23 国家 */
export const addState = params => post('/system/state/', params);     /* 新增   */
export const updateState = params => put('/system/state/', params);     /* 修改   */
export const listState = params => get('/system/state/list', params);     /* 查询列表   */
export const getState = params => get('/system/state/'+params);     /* 获取 id下的 信息  */
export const delState = params => axiosDelete('/system/state/'+params);     /* 删除 */

/* 21-02-23 站点 */
export const addSite= params => post('/system/site/', params);     /* 新增   */
export const updateSite = params => put('/system/site/', params);     /* 修改   */
export const listSite = params => get('/system/site/list', params);     /* 查询列表   */
export const getSite = params => get('/system/site/'+params);     /* 获取 id下的 信息  */
export const delSite = params => axiosDelete('/system/site/'+params);     /* 删除 */

/* 21-02-25 区域 */
export const addArea= params => post('/system/area/', params);     /* 新增   */
export const updateArea = params => put('/system/area/', params);     /* 修改   */
export const listArea = params => get('/system/area/list', params);     /* 查询列表   */
export const getArea = params => get('/system/area/'+params);     /* 获取 id下的 信息  */
export const delArea = params => axiosDelete('/system/area/'+params);     /* 删除 */

/* 21-02-25 应用管理 */
export const addApply= params => post('/system/apply/', params);     /* 新增   */
export const updateApply = params => put('/system/apply/', params);     /* 修改   */
export const listApply = params => get('/system/apply/list', params);     /* 查询列表   */
export const getApply = params => get('/system/apply/'+params);     /* 获取 id下的 信息  */
export const delApply = params => axiosDelete('/system/apply/'+params);     /* 删除 */

/* 21-02-25 汇率管理 */
export const addRate= params => post('/system/rate/', params);     /* 新增   */
export const updateRate = params => put('/system/rate/', params);     /* 修改   */
export const listRate = params => get('/system/rate/list', params);     /* 查询列表   */
export const getRate = params => get('/system/rate/'+params);     /* 获取 id下的 信息  */
export const delRate = params => axiosDelete('/system/rate/'+params);     /* 删除 */

/* 21-02-25 企业管理 */
export const addDetails= params => post('/system/details/', params);     /* 新增   */
export const updateDetails = params => put('/system/details/', params);     /* 修改   */
export const listDetails = params => get('/system/details/list', params);     /* 查询列表   */
export const getDetails = params => get('/system/details/'+params);     /* 获取 id下的 信息  */
export const delDetails = params => axiosDelete('/system/details/'+params);     /* 删除 */

/* 21-02-25 单位管理 */
export const addUnit= params => post('/system/unit/', params);     /* 新增   */
export const updateUnit = params => put('/system/unit/', params);     /* 修改   */
export const listUnit = params => get('/system/unit/list', params);     /* 查询列表   */
export const getUnit = params => get('/system/unit/'+params);     /* 获取 id下的 信息  */
export const delUnit = params => axiosDelete('/system/unit/'+params);     /* 删除 */



/*

staffAdd({
    userimage:userimage,
    information:2,
    zmtek_ver:2,
}).then(res => {
   console.log(res)
    if(res.status ==1){

    }
}).catch(res => {
    console.log(res);
});*/
