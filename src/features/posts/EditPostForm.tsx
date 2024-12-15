import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { postUpdated, selectPostById } from './postsSlice';

import { useGetPostQuery, useEditPostMutation } from '../api/apiSlice';

export default function EditPostForm() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data: post } = useGetPostQuery(postId!);
  const [updatePost, { isLoading }] = useEditPostMutation();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onSavePostClicked = async (e: React.FormEvent<EditPostFormElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const title = elements.postTitle.value;
    const content = elements.postContent.value;

    if (title && content) {
      await updatePost({ id: post.id, title, content }).unwrap();
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue={post.title} required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue={post.content} required />

        <button>Save Post</button>
      </form>
    </section>
  );
}
