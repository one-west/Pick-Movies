import axios from 'axios';

export async function fetchWithToken(url: string, options: any) {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
    } else {
      throw new Error('refreshToken을 재발급할 수 없습니다.');
    }
  }

  try {
    const response = await axios({
      url,
      method: options.method || 'GET',
      headers: {
        ...options.headers,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: options.body, // 요청 본문 설정
    });

    return response.data;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
}

async function refreshAccessToken() {
  try {
    const response = await axios.post('/api/token', {
      refreshToken: getCookie("refresh_token")
    }, {
      withCredentials: true
    });
    return response.data.accessToken || null;

  } catch (error) {
    console.error('리프레시 토큰 갱신 실패:', error);
    return null;
  }
}

function getCookie(key: string) {
  let result = null;
  let cookie = document.cookie.split(";");
  console.log("cookie : ", cookie);
  cookie.some(function (item) {
    item = item.replace(" ", "");
    const dic = item.split("=");
    if (key === dic[0]) {
      result = dic[1];
      return true;
    }
  });
  return result;
}