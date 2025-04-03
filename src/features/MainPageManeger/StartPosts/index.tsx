// useEffect(() => {
//     const getPost = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/auctions/getAllPosts", {
//           params: { status: "before" },
//         });
//         setPosts(res.data);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     getPost();
//   }, []);
