import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('token') !== null;
    });
    const [user, setUser] = useState(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // 로컬 스토리지에서 사용자 정보 불러오기
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
            queryClient.setQueryData(['user'], JSON.parse(storedUser));
        }
    }, [queryClient]);

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await axios.post('http://localhost:8080/login', credentials);
            const userDataResponse = await axios.get('http://localhost:8080/member', {
                headers: { "Authorization": response.headers['authorization'] }
            });
            return {
                token: response.headers['authorization'],
                user: userDataResponse.data.data,
                email: userDataResponse.data.data.email
            };
        },
        onSuccess: (data) => {
            const { token, user, email } = data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user)); // 사용자 정보를 로컬 스토리지에 저장
            localStorage.setItem('email', email);

            // 펫 정보도 로컬 스토리지에 저장
            if (user.pets) {
                localStorage.setItem('pets', JSON.stringify(user.pets));
            }

            setUser(user);
            setIsLoggedIn(true);
            queryClient.setQueryData(['user'], user);
            navigate('/'); // 로그인 성공 후 홈으로 리다이렉트
        },
        onError: (error) => {
            console.error('로그인 실패:', error);
            alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        }
    });

    const login = useCallback(async (credentials) => {
        await loginMutation.mutateAsync(credentials);
    }, [loginMutation]);

    const logout = useCallback(async () => {
    try {
        await axios.post('http://localhost:8080/auth/logout');
    } catch (error) {
        console.error('로그아웃 요청 실패:', error);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        localStorage.removeItem('pets');
        localStorage.clear();
        setUser(null);
        setIsLoggedIn(false);
        queryClient.setQueryData(['user'], null);
        navigate('/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
    }
}, [navigate, queryClient]);


    const getToken = useCallback(() => {
        return localStorage.getItem('token');
    }, []);

    return {
        user,
        isLoading: loginMutation.isPending,
        isError: loginMutation.isError,
        isLoggedIn,
        login,
        logout,
        getToken,
    };
};
