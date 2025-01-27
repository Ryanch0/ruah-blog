import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.scss'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import RootLayout, { loader as RootLoader } from './components/2.templates/RootLayout/RootLayout';
import MainPage from './components/3.pages/MainPage/MainPage';
import PostPage from './components/3.pages/PostPage/PostPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} loader={RootLoader} errorElement={<>에러페이지</>}>
      <Route
        index={true}
        element={<MainPage />}
      />
      <Route path=":title" element={<PostPage />} />
    </Route>
  )
  // {
  //   basename: "/ruah-blog/",
  // }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
