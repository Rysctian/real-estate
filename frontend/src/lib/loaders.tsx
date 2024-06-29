import { defer } from 'react-router-dom';
import apiRequest from './apiService';

export const singlePageLoader = async ({ params }: { params: { id: string } }) => {
  try {
    const response = await apiRequest.get(`/posts/${params.id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error; 
  }
};

// export const fetchProperties = async ({ request }: { request: Request }) => {
//   const query = new URL(request.url).searchParams.toString();
//   const response = await apiRequest.get(`/posts?${query}`);
//   return defer({
//     postResponse: response.data,
//   });
// };
