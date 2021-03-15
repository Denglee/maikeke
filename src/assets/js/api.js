/*** api接口统一管理 */
import { get, post, post2, put, axiosDelete,downPost } from './axios';

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
export const LoginOut = params => axiosDelete('/auth/logout', params); /*退出*/
export const getCodeImg = params => get('/code', params); /*获取验证图片*/

// export const ApiLayoutNav = params => get('admin/Web/indexMenu', params); /*获取侧边栏 nav*/

/*文件上传*/
export const upload = params => post('/system/upload/',params);     /* 上传 */

/*个人信息*/
export const userProfile = params => get('system/user/profile', params); /*获取个人信息*/
export const updateUserProfile = params => put('system/user/profile', params); /*获取个人信息*/
export const uploadUserAvatar = params => post('system/user/profile/avatar/', params); /* 头像上传 */
export const updatePwd = params => put('/system/user/profile/updatePwd/', params);  /*重置密码*/


/*店铺授权*/
export const addStoreAuth        = params => post('/system/storeAuth/addStoreAuth', params);     /* 新增店铺授权 */
export const updateStoreAuth      = params => put('/system/storeAuth/updateStoreAuth', params);     /* 修改店铺授权 */
export const delStoreAuth = params => axiosDelete('/system/storeAuth/delStoreAuth/'+params);     /* 单个删除店铺 */
export const delStoreAuthList = params => axiosDelete('/system/storeAuth/delStoreAuthList', params);     /* 批量删除店铺授权 */
export const getStoreList         = params => get('/system/storeAuth/getStoreList', params);     /* 查询所有店铺 */
export const selectStoreAuth      = params => get('/system/storeAuth/selectStoreAuth', params);     /* 查询店铺授权列表 */
export const selectTreeAuth      = params => get('/system/storeAuth/selectTree/'+params);     /* 查询店铺授权树状结构 */
export const selectListByUserId      = params => get('/system/storeAuth/selectListByUserId/');     /* 查询店铺授权树状结构 */


/* 店铺授权 子账号*/
export const authSonAdd    = params => post('/system/storeAuth/authSon/add', params);     /* 新增子账号 */
export const authSonList    = params => get('/system/storeAuth/authSon/list', params);     /* 子账号列表 */
export const authSondelete    = params => axiosDelete('/system/storeAuth/authSon/'+params);     /* 删除 子账号列表 */
export const authSonUpdate    = params => put('/system/storeAuth/authSon/update', params);     /* 更新子账号列表 */

/* 21-02-23 菜单 */
export const addMenu = params => post('/system/menu/', params);     /* 新增 菜单  */
export const updateMenu = params => put('/system/menu/', params);     /* 修改 菜单  */
export const getMenu = params => get('/system/menu/'+params);     /* 获取 id下的 菜单信息  */
export const listMenu = params => get('/system/menu/list', params);     /* 菜单信息 */
export const menuGetRouters = params => get('/system/menu/getRouters', params);     /* 获取路由信息 */
export const menuDelRouters = params => axiosDelete('/system/menu/'+params);     /* 删除 */
export const menuRoleTree = params => get('/system/menu/roleMenuTreeselect/'+params);     /* 获取权限树 */
export const selectMenuTable = params => get('/system/menu/selectMenuTable/' +params);     /* 加载对应角色菜单列表树*/
export const getMenuTable = params => get('/system/menu/treeselect/', +params);     /* 加载对应角色菜单列表树*/

/* 21-02-23 部门 */
export const addDept = params => post('/system/dept/', params);     /* 新增   */
export const updateDept = params => put('/system/dept/', params);     /* 修改   */
export const listDept = params => get('/system/dept/list', params);     /* 查询列表   */
export const getDept = params => get('/system/dept/'+params);     /* 获取 id下的 信息  */
export const delDept = params => axiosDelete('/system/dept/'+params);     /* 删除 */
export const treeSelDept = params => get('/system/dept/treeselect');     /* 获取树状 */

/* 21-02-23 岗位  */
export const addPost = params => post('/system/post/', params);     /* 新增   */
export const updatePost = params => put('/system/post/', params);     /* 修改   */
export const listPost = params => get('/system/post/list', params);     /* 查询列表   */
export const getPost = params => get('/system/post/'+params);     /* 获取 id下的 信息  */
export const delPost = params => axiosDelete('/system/post/'+params);     /* 删除 */

/* 21-02-23 角色 */
export const addRole = params => post('/system/role/', params);     /* 新增   */
export const updateRole = params => put('/system/role/', params);     /* 修改 创建的角色 和 角色权限  */
export const getRole = params => get('/system/role/'+params);     /*根据角色编号获取详细信息  */
export const saveRoleRelation = (params,params2) => put('/system/role/'+params,params2);     /* 修改保存角色关联用户信息   */
export const delRole = params => axiosDelete('/system/role/'+params);     /* 删除 */
export const changeRoleStatus = params => put('/system/role/changeStatus/'+params);     /* 获取 id下的 信息  */
export const listRole = params => get('/system/role/list', params);     /* 查询列表   */
export const optionRole = params => get('/system/role/optionselect', params);     /* 查询列表选择   */
export const queryUser = params => get('/system/role/queryUser/'+params);     /* 根据角色编号获取所关联人员详情   */

/*用户 信息*/
export const addUser = params => post('/system/user/', params);     /* 新增   */
export const updateUser = params => put('/system/user/', params);     /* 修改   */
export const getUser = params => get('/system/user/'+params);     /* 获取 id下的 信息  */
export const saveUser = params => put('/system/user/'+params);     /* 更新 信息  */
export const changeUserStatus = params => axiosDelete('/system/user/changeStatus/'+params);     /* 修改状态 */
export const delUser = params => axiosDelete('/system/user/'+params);     /* 删除 */

export const listUser = params => get('/system/user/list', params);     /* 查询列表   */
export const listByRole = (params,params2) => get('/system/user/listByRoleId/'+params);     /* 根据角色编号获取所关联人员详情   */
export const exportUser = params => downPost('/system/user/export/', params);     /* 导出   */
export const saveUserStore = (params,params2) => post('/system/user/addUserStore/'+params,params2);     /* 新增用户 和店铺关联   */

/* 21-02-23 字典 */
export const addDict = params => post('/system/dict/type/', params);     /* 新增   */
export const updateDict = params => put('/system/dict/type/', params);     /* 修改   */
export const listDict = params => get('/system/dict/type/list/', params);     /* 查询字典类型列表   */
export const getDict = params => get('/system/dict/type/'+params);     /* 获取 id下的 菜单信息  */
export const delDict = params => axiosDelete('/system/dict/type/'+params);     /* 删除 */

/* 21-02-23 字典数据 */
export const addDictData = params => post('/system/dict/data/', params);     /* 新增   */
export const updateDictData = params => put('/system/dict/data/', params);     /* 修改   */
export const listDictData = params => get('/system/dict/data/list/', params);     /* 查询字典类型列表   */
export const getDictData = params => get('/system/dict/data/'+params);     /* 获取 id下的 信息  */
export const getDictType = params => get('/system/dict/data/type/'+params);     /* type下拉  */
export const delDictData = params => axiosDelete('/system/dict/data/'+params);     /* 删除 */

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
export const getSite = params => get('/system/site/'+params);     /* 获取 id下的 详细信息  */
export const delSite = params => axiosDelete('/system/site/'+params);     /* 删除 */
export const siteTreeSel = (params,params2) => get('/system/site/treeSelect/'+params,params2);     /* 查询列表 左边传0，店铺授权传1  */


/* 21-02-25 区域 */
export const addArea= params => post('/system/area/', params);     /* 新增   */
export const updateArea = params => put('/system/area/', params);     /* 修改   */
export const listArea = params => get('/system/area/list', params);     /* 查询列表   */
export const getArea = params => get('/system/area/'+params);     /* 获取 id下的 信息  */
export const delArea = params => axiosDelete('/system/area/'+params);     /* 删除 */
export const areaTreeSelect = params => get('/system/area/treeSelect',params);     /* 上区域查找 */

/* 21-02-25 应用管理 */
export const addApply= params => post('/system/apply/', params);     /* 新增   */
export const updateApply = params => put('/system/apply/', params);     /* 修改   */
export const listApply = params => get('/system/apply/list', params);     /* 查询列表   */
export const getApply = params => get('/system/apply/'+params);     /* 获取 id下的 信息  */
export const delApply = params => axiosDelete('/system/apply/'+params);     /* 删除 */
export const listApplyTree = params => get('/system/apply/selectSysApplyTree', params);     /* 平台列表   */
export const applyExport = params => downPost('/sell/apply/export/',params);     /* 导出  */

/* 21-02-25 汇率管理 */
export const addRate= params => post('/system/rate/', params);     /* 新增   */
export const updateRate = params => put('/system/rate/', params);     /* 修改   */
export const listRate = params => get('/system/rate/list', params);     /* 查询列表   */
export const getRate = params => get('/system/rate/'+params);     /* 获取 id下的 信息  */
export const delRate = params => axiosDelete('/system/rate/'+params);     /* 删除 */

/* 21-02-25 公告管理 */
export const addNotice= params => post('/system/notice/', params);     /* 新增   */
export const updateNotice = params => put('/system/notice/', params);     /* 修改   */
export const listNotice = params => get('/system/notice/list', params);     /* 查询列表   */
export const getNotice = params => get('/system/notice/'+params);     /* 获取 id下的 信息  */
export const delNotice = params => axiosDelete('/system/notice/'+params);     /* 删除 */

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

/* 21-02-29 消息管理 */
export const addMessage= params => post('/system/message/', params);     /* 新增   */
export const updateMessage = params => put('/system/message/', params);     /* 修改   */
export const listMessage = params => get('/system/message/list', params);     /* 查询列表   */
export const getMessage = params => get('/system/message/'+params);     /* 获取 id下的 信息  */
export const delMessage = params => axiosDelete('/system/message/'+params);     /* 删除 */

/*日志管理*/
export const loginInfoList = params => get('/system/logininfor/list/',params);     /* 查询操作日志记录  */


/*配送货单*/
export const listOrder   = (params,params2) =>       post2('/sell/order/list/',params,params2);     /* 查询列表   */
export const exportOrder = params => downPost('/sell/order/export/',params);     /* 导出  */
