import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import styles from "../styles/Home.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface Post {
  id: number;
  title: string;
  body: string;
}

const Home: NextPage = () => {
  const { data, error } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts/",
    fetcher
  );

  if (error) {
    return <>Error</>;
  }

  const isLoading = !data;

  const posts = data?.slice(0, 3) ?? [];
  const renderPosts = posts.map((p) => <PostCard post={p} key={p.id} />);

  return (
    <div className={styles.container}>
      <Head>
        <title>Render Next Example</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Render Next Example</h1>

        <p className={styles.description}>Here are some random posts:</p>

        {isLoading ? (
          <>Loading</>
        ) : (
          <div className={styles.grid}>{renderPosts}</div>
        )}
      </main>
    </div>
  );
};

export default Home;

interface PostCardProps {
  post: Post;
}
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/post/${post.id}`}>
      <a className={styles.card}>
        <h2>Post #{post.id} &rarr;</h2>
        <p>{post.title}</p>
      </a>
    </Link>
  );
};
