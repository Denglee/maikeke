import axios from 'axios';
import Qs from 'qs'; //post 的 序列化
import {Message, Loading} from 'element-ui';

/*引用qs*/
/*Vue.prototype.$qs = qs
this.$qs.stringify*/

// 设置请求超时时间
axios.defaults.timeout = 5000;

// 设置post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截
axios.interceptors.request.use(config => {
	// 在发送请求之前做些什么 验证token之类的
	// Loading.service(true);
	let token = localStorage.getItem('accessToken')
	if (token) {
		config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
	}

	return config;
}, error => {
	// 对请求错误做些什么
	return Promise.error(error);
});

// 响应拦截
axios.interceptors.response.use(response => {
	// console.log(response.data);
	// 对响应数据做点什么
	return response;

	// if (response.data.code == 401) {
	// 	Message.error(response.data.msg);
	// 	return response;
	// } else if (response.data.code == 500) {
	// 	Message.error(response.data.msg);
	// 	return response;
	// } else {
	// 	return response;
	// }
}, error => {
	// 对响应错误做点什么
	// console.log(error);
	return Promise.reject(error);
});


export function tansParams(params) {
	let result = ''
	Object.keys(params).forEach((key) => {
		if (!Object.is(params[key], undefined) && !Object.is(params[key], null) && !Object.is(JSON.stringify(params[key]), '{}')) {
			result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
		}
	})
	return result
}
/*下载方式1 */
export function downPost(url, params) {
	const res = new Promise((resolve, reject) => {
		axios.post(url, params, {
			transformRequest: [(params) => {
				console.log(tansParams(params))
				return tansParams(params)
			}],
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			responseType: 'blob'
		}).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err.data);
			console.log(url, err);
		})
	});
	return res
}

// 通用下载方法
// export function download(url, params, filename) {
// 	return axios.post(url, params, {
// 		transformRequest: [(params) => {
// 			console.log(tansParams(params))
// 			return tansParams(params);
// 		}],
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded'
// 		},
// 		responseType: 'blob'
// 	}).then((data) => {
// 		console.log(data.data);
//
// 		const content = data.data
// 		const blob = new Blob([content])
// 		if ('download' in document.createElement('a')) {
// 			const elink = document.createElement('a')
// 			elink.download = filename
// 			elink.style.display = 'none'
// 			elink.href = URL.createObjectURL(blob)
// 			document.body.appendChild(elink)
// 			elink.click()
// 			URL.revokeObjectURL(elink.href)
// 			document.body.removeChild(elink)
// 		} else {
// 			navigator.msSaveBlob(blob, filename)
// 		}
// 	}).catch((r) => {
// 		console.error(r)
// 	})
// }

// 封装get方法和post方法
/**
 *出处： https://www.cnblogs.com/hs610/p/10842866.html
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function get(url, params) {
	const res = new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {

			if(res.data.code == 200){
				resolve(res.data);
			}else{
				resolve(res.data);
				Message.error(res.data.msg || res.data.message || '抱歉，出错了' );
			}
			// Loading.service(true).close();
			//  Message({message: '请求成功', type: 'success'});
		}).catch(err => {
			reject(err.data);
			console.log(url, err);
			// Loading.service(true).close();
			// Message({message: '加载失败', type: 'error'});
		})
	});
	return res
}

/**用法
 *
 api.js
 export  const loginApi = params => get('/login', params);

 // 页面
 import {recRegister,loginApi} from "@/assets/js/api"

 loginApi({
    name:'xiaoming',
}).then((res) =>{
    console.log(res);
})

 */
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
	const res = new Promise((resolve, reject) => {
		// axios.post(url, Qs.stringify(params))
		axios.post(url, params)
			.then(res => {
				// resolve(res.data);

				if(res.data.code == 200){
					resolve(res.data);
				}else{
					resolve(res.data);
					Message.error(res.data.msg || res.data.message || '抱歉，出错了' );
				}
				// Loading.service(true).close();
				//  Message({message: '请求成功', type: 'success'});
			})
			.catch(err => {
				reject(err.data);
				console.log(url, err);
				// Loading.service(true).close();
				// Message({message: '加载失败', type: 'error'});
			})
	});
	return res
}

export function post2(url,data,params) {
	return new Promise((resolve, reject) => {
		axios.post(
			url,
			data,
			params,
		).then(res => {
			resolve(res.data);
			// Loading.service(true).close();
			//  Message({message: '请求成功', type: 'success'});
		})
			.catch(err => {
				Message.error(res.data.msg || res.data.message || '抱歉，出错了' );
				reject(err.data);
				console.log(url,err);
				// Loading.service(true).close();
				// Message({message: '加载失败', type: 'error'});
			})
	});
}

export function put(url, params) {
	const res = new Promise((resolve, reject) => {
		// axios.put(url, Qs.stringify(params))
		axios.put(url, params)
			.then(res => {
				// resolve(res.data);
				if(res.data.code == 200){
					resolve(res.data);
				}else{
					resolve(res.data);
					Message.error(res.data.msg || res.data.message || '抱歉，出错了');
				}

				// Loading.service(true).close();
				//  Message({message: '请求成功', type: 'success'});
			})
			.catch(err => {
				reject(err.data);
				console.log(url, err);
				// Loading.service(true).close();
				// Message({message: '加载失败', type: 'error'});
			})
	});
	return res
}

export function axiosDelete(url, params) {
	const res = new Promise((resolve, reject) => {
		axios.delete(url, {
			data: params
		}).then(res => {
			// resolve(res.data);

			if(res.data.code == 200){
				resolve(res.data);
			}else{
				resolve(res.data);
				Message.error(res.data.msg || res.data.message || '抱歉，出错了');
			}
		})
			.catch(err => {
				reject(err.data);
			})
	});
	return res
}
