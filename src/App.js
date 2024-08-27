import { Route, Routes } from 'react-router-dom';
import './App.css';
import KakaoMap from './components/Kakao';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import BoardPage from './pages/BoardPage/BoardPage';
import LoginPage from './pages/Login/LoginPage';
import FindIdPage from './pages/FindPage/FindIdPage';
import FindPasswordInitPage from './pages/FindPage/FindPasswordInitPage';
import FindPasswordResetPage from './pages/FindPage/FindPasswordResetPage';
import SignUpTermsPage from './pages/SignUp/SignUpTermsPage'
import SignUpInfoPage from './pages/SignUp/SignUpInfoPage'
import NotFoundPage from './pages/ErrorPage/NotFoundPage';
import BoardDetailPage from './pages/BoardPage/BoardDetailPage';
import BoardWritePage from './pages/BoardPage/BoardWritePage';
import MyPage from './pages/MyPage/MyPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

    <Routes>

      <Route path='/' element={<AppLayout />}>
        <Route index element={<HomePage />} />
        
        <Route path="boards">
          <Route path=":boardType" element={<BoardPage />} />
          <Route path=":boardType/write" element={<BoardWritePage />} />
          <Route path=":boardType/:id" element={<BoardDetailPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
          <Route path="members/find-id" element={<FindIdPage />} />
          <Route path="members/find-pw" element={<FindPasswordInitPage />} />
          <Route path="members/find-pw/:memberId" element={<FindPasswordResetPage />} />

        <Route path="sign-up">
          <Route index element={<SignUpTermsPage />} />
          <Route path="members" element={<SignUpInfoPage />} />
        </Route>

        <Route path="mypage" element={<MyPage />} />

        <Route path="members/find-id" element={<FindIdPage />}/>
        <Route path="members/find-pw" element={<FindPasswordInitPage />}/>
        <Route path="members/find-pw/:memberId" element={<FindPasswordResetPage />}/>

        <Route path="*" element={<NotFoundPage />}/>
      </Route>
      <Route path="map" element={<KakaoMap/>} /> 
    </Routes>
  );
}
export default App;
