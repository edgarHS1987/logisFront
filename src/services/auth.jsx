import {fetchRequest} from '../libs/functions';

export const logout = ()=>{
	return fetchRequest({
		url:'/auth/logout'
	});
};

export const login = (obj)=>{
	return fetchRequest({
		url:'/auth/login',
		method:'POST',
		body:obj
	});
};